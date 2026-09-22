(() => {
  const token = () => localStorage.getItem('rota_token') || '';
  const api = async (path, options = {}) => {
    const t = token();
    if (!t) throw Error('Faça login para usar o GPS do ROTA.');
    const r = await fetch(path, {
      ...options,
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+t,...(options.headers||{})}
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw Error(d.error || 'Não foi possível consultar o GPS.');
    return d;
  };

  const style = document.createElement('style');
  style.textContent = `
    #rotaGpsFab{position:fixed;right:16px;bottom:202px;z-index:9000;padding:11px 14px;border-radius:14px;background:linear-gradient(135deg,#063d68,#087cff);border:1px solid #39d7ff;color:#fff;font-weight:900;box-shadow:0 12px 30px #0008}
    #rotaGpsModal{position:fixed;inset:0;z-index:10003;display:none;place-items:center;padding:12px;background:#010713ee}
    #rotaGpsModal.open{display:grid}
    .rg-card{width:min(760px,100%);max-height:94vh;overflow:auto;padding:18px;border-radius:24px;background:linear-gradient(145deg,#082448,#041427);border:1px solid #25c8ff88;box-shadow:0 24px 80px #000b}
    .rg-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.rg-head h2{margin:0}.rg-sub{color:#9fb8d3;font-size:12px;margin-top:4px}
    .rg-row{padding:12px;margin:8px 0;border-radius:14px;background:#071a35;border:1px solid #173f69}
    .rg-actions{display:flex;gap:6px;flex-wrap:wrap}.rg-btn{padding:10px 13px;border-radius:12px;background:#09264b;border:1px solid #28577e;color:#fff;font-weight:900}.rg-btn.primary{background:linear-gradient(135deg,#087cff,#00d9ff)}.rg-btn.green{background:linear-gradient(135deg,#00b96b,#22e89b);color:#052016}.rg-btn.red{background:#4a1827;border-color:#a23b55}
    #rgMap{height:340px;border-radius:18px;overflow:hidden;border:1px solid #1e6aa0;margin-top:12px;background:#06162d}
    .rg-status{font-size:12px;color:#91afd0}.rg-live{color:#4ff0ad;font-weight:900}.rg-warn{color:#ffd16a;font-weight:800}
    @media(max-width:600px){#rgMap{height:300px}.rg-card{padding:14px}}
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.id='rotaGpsFab'; fab.textContent='📡 GPS ROTA';
  document.body.appendChild(fab);

  const modal=document.createElement('div');
  modal.id='rotaGpsModal';
  modal.innerHTML='<div class="rg-card"><div class="rg-head"><div><h2>📍 GPS em tempo real</h2><div class="rg-sub">Localização do entregador durante a entrega.</div></div><button class="rg-btn" id="rgClose">×</button></div><div id="rgBody" style="margin-top:14px"></div></div>';
  document.body.appendChild(modal);
  const body=modal.querySelector('#rgBody');

  let watchId=null, activeDelivery=null, map=null, marker=null, routeLine=null, routeTimer=null, leafletLoaded=false;

  function stopWatch(){
    if(watchId!==null && navigator.geolocation) navigator.geolocation.clearWatch(watchId);
    watchId=null;
  }
  function stopPolling(){if(routeTimer)clearInterval(routeTimer);routeTimer=null}

  function loadLeaflet(){
    if(leafletLoaded && window.L) return Promise.resolve();
    return new Promise((resolve,reject)=>{
      if(window.L){leafletLoaded=true;return resolve();}
      const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
      const js=document.createElement('script');js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';js.onload=()=>{leafletLoaded=true;resolve()};js.onerror=()=>reject(Error('Não foi possível carregar o mapa.'));document.head.appendChild(js);
    });
  }

  function setMap(lat,lng,accuracy,history=[]){
    if(!window.L)return;
    if(!map){
      map=L.map('rgMap',{zoomControl:true}).setView([lat,lng],16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
      marker=L.marker([lat,lng]).addTo(map).bindPopup('📍 Entregador').openPopup();
    }else{
      marker.setLatLng([lat,lng]);
      map.setView([lat,lng],Math.max(map.getZoom(),15));
    }
    if(Array.isArray(history)&&history.length>1){const pts=history.slice().reverse().map(x=>[Number(x.latitude),Number(x.longitude)]);if(map._rotaRoute)map.removeLayer(map._rotaRoute);map._rotaRoute=L.polyline(pts,{color:'#00d9ff',weight:5,opacity:.78}).addTo(map)}
    if(accuracy){
      if(map._rotaAccuracy)map.removeLayer(map._rotaAccuracy);
      map._rotaAccuracy=L.circle([lat,lng],{radius:accuracy,color:'#00d9ff',fillColor:'#00d9ff',fillOpacity:.10,weight:1}).addTo(map);
    }
    setTimeout(()=>map.invalidateSize(),80);
  }

  async function getMe(){const d=await api('/api/auth/me');return d.user}

  async function driverMode(){
    const d=await api('/api/deliveries/available');
    const mine=await api('/api/deliveries');
    const active=(mine.deliveries||[]).filter(x=>x.driver_id && ['ACCEPTED','PICKED_UP','IN_TRANSIT'].includes(x.status));
    const all=[...active,...(d.deliveries||[])];
    body.innerHTML='<div class="rg-row"><strong>Entregador</strong><div class="rg-status">Escolha uma entrega atribuída para transmitir sua posição.</div></div>'+
      (all.length?all.slice(0,12).map(x=>'<div class="rg-row"><strong>'+esc(x.origin)+' → '+esc(x.destination)+'</strong><div class="rg-status">'+esc(x.status)+' · '+esc(x.id)+'</div><div class="rg-actions">'+(x.driver_id?'<button class="rg-btn green" data-start="'+x.id+'">📡 Ativar GPS</button>':'<button class="rg-btn primary" data-accept="'+x.id+'">Aceitar entrega</button>')+'</div></div>').join(''):'<div class="rg-row">Nenhuma entrega disponível.</div>');
    body.querySelectorAll('[data-accept]').forEach(b=>b.onclick=async()=>{try{await api('/api/deliveries/'+b.dataset.accept+'/accept',{method:'POST'});driverMode()}catch(e){alert(e.message)}});
    body.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startGPS(b.dataset.start));
  }

  async function startGPS(id){
    if(!navigator.geolocation){alert('Este aparelho/navegador não oferece geolocalização.');return}
    activeDelivery=id;stopWatch();stopPolling();
    body.innerHTML='<div class="rg-row"><strong>📡 GPS ativo</strong><div class="rg-status rg-live">Aguardando localização do aparelho…</div><div id="rgLast" class="rg-status"></div></div><div id="rgMap"></div><div class="rg-actions"><button class="rg-btn red" id="rgStop">Parar GPS</button></div>';
    await loadLeaflet().catch(e=>{body.innerHTML+='<div class="rg-row rg-warn">'+esc(e.message)+'</div>'});
    const opts={enableHighAccuracy:true,maximumAge:5000,timeout:15000};
    watchId=navigator.geolocation.watchPosition(async pos=>{
      const p=pos.coords;
      try{
        const r=await api('/api/deliveries/'+id+'/location',{method:'POST',body:JSON.stringify({latitude:p.latitude,longitude:p.longitude,accuracy:p.accuracy,speed:p.speed,heading:p.heading})});
        setMap(p.latitude,p.longitude,p.accuracy);
        const el=document.getElementById('rgLast');if(el)el.textContent='Enviado às '+new Date().toLocaleTimeString('pt-BR')+' · precisão ±'+Math.round(p.accuracy||0)+' m';
      }catch(e){const el=document.getElementById('rgLast');if(el)el.textContent='⚠️ '+e.message}
    },err=>{const el=document.querySelector('.rg-status');if(el)el.innerHTML='<span class="rg-warn">⚠️ GPS: '+esc(err.message)+'</span>'},opts);
    document.getElementById('rgStop').onclick=()=>{stopWatch();activeDelivery=null;driverMode()};
  }

  async function customerMode(){
    const d=await api('/api/deliveries');
    const active=(d.deliveries||[]).filter(x=>x.driver_id&&['ACCEPTED','PICKED_UP','IN_TRANSIT'].includes(x.status));
    body.innerHTML=active.length?'<div class="rg-row"><strong>🚚 Entregas em andamento</strong><div class="rg-status">Toque em uma para acompanhar o entregador no mapa.</div></div>'+active.map(x=>'<div class="rg-row"><strong>'+esc(x.origin)+' → '+esc(x.destination)+'</strong><div class="rg-status">'+esc(x.status)+'</div><button class="rg-btn primary" data-track="'+x.id+'">📍 Ver no mapa</button></div>').join(''):'<div class="rg-row">Nenhuma entrega com entregador em rota no momento.</div>';
    body.querySelectorAll('[data-track]').forEach(b=>b.onclick=()=>trackDelivery(b.dataset.track));
  }

  async function trackDelivery(id){
    activeDelivery=id;stopWatch();stopPolling();
    body.innerHTML='<div class="rg-row"><strong>📍 Localização do entregador</strong><div id="rgLive" class="rg-status">Consultando…</div></div><div id="rgMap"></div><div class="rg-actions"><button class="rg-btn primary" id="rgRefresh">Atualizar agora</button><button class="rg-btn" id="rgBack">Voltar</button></div>';
    await loadLeaflet().catch(e=>{body.innerHTML+='<div class="rg-row rg-warn">'+esc(e.message)+'</div>';return});
    async function refresh(){
      try{
        const d=await api('/api/deliveries/'+id+'/location');
        if(d.location){setMap(d.location.latitude,d.location.longitude,d.location.accuracy,d.history||[]);document.getElementById('rgLive').innerHTML='<span class="rg-live">● GPS recebido</span> · '+new Date(d.location.recorded_at).toLocaleTimeString('pt-BR')+' · precisão ±'+Math.round(d.location.accuracy||0)+' m'}
        else document.getElementById('rgLive').textContent='Aguardando o entregador ativar o GPS.';
      }catch(e){document.getElementById('rgLive').textContent=e.message}
    }
    document.getElementById('rgRefresh').onclick=refresh;document.getElementById('rgBack').onclick=customerMode;
    await refresh();routeTimer=setInterval(refresh,10000);
  }

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function open(){
    try{const u=await getMe();modal.classList.add('open');if(u.role==='Entregador')await driverMode();else await customerMode()}
    catch(e){alert(e.message)}
  }
  fab.onclick=open;
  modal.querySelector('#rgClose').onclick=()=>{stopWatch();stopPolling();activeDelivery=null;modal.classList.remove('open')};
  modal.addEventListener('click',e=>{if(e.target===modal){stopWatch();stopPolling();activeDelivery=null;modal.classList.remove('open')}});
})();
