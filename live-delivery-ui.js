(() => {
  const token = () => localStorage.getItem('rota_token') || '';
  const api = async (path, options={}) => {
    const r = await fetch(path, {
      ...options,
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+token(), ...(options.headers||{})}
    });
    const d = await r.json().catch(()=>({}));
    if(!r.ok) throw Error(d.error || 'Não foi possível concluir a ação.');
    return d;
  };

  function findButton(){
    return [...document.querySelectorAll('button')].find(b => b.textContent.trim().toLowerCase() === 'solicitar entrega');
  }

  async function submit(button){
    const box = button.closest('.card') || button.parentElement;
    const inputs = [...box.querySelectorAll('input')];
    const origin = inputs[0]?.value.trim() || '';
    const destination = inputs[1]?.value.trim() || '';
    if(!origin || !destination){ alert('Informe origem e destino.'); return; }
    button.disabled = true;
    button.textContent = 'Criando entrega...';
    try{
      const d = await api('/api/deliveries',{method:'POST',body:JSON.stringify({origin,destination,amount_cents:0})});
      const x = d.delivery;
      const root = document.querySelector('.screen.active') || document.querySelector('.screen');
      if(root){
        root.innerHTML = `
          <div class="hero">
            <h1>📦 Entrega criada</h1>
            <p>O pedido foi registrado no ROTA e agora está disponível para um entregador aceitar.</p>
            <button class="btn gold" onclick="location.reload()">Voltar</button>
          </div>
          <div class="card" style="margin-top:16px">
            <h2>Pedido #${String(x.id).slice(0,8)}</h2>
            <div class="list">
              <div class="row"><span>📍 Origem</span><strong>${escapeHtml(x.origin)}</strong></div>
              <div class="row"><span>🏁 Destino</span><strong>${escapeHtml(x.destination)}</strong></div>
              <div class="row"><span>📦 Status</span><strong class="greenText">Pedido criado</strong></div>
            </div>
            <p class="muted" style="margin-top:14px">A entrega está gravada no banco de dados. O próximo passo é um entregador aceitá-la.</p>
          </div>`;
      }
    }catch(e){
      button.disabled = false;
      button.textContent = 'Solicitar entrega';
      alert(e.message);
    }
  }

  function escapeHtml(v){
    return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function bind(){
    const b=findButton();
    if(b && !b.dataset.liveBound){
      b.dataset.liveBound='1';
      b.addEventListener('click',e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        submit(b);
      }, true);
    }
  }

  bind();
  new MutationObserver(bind).observe(document.documentElement,{subtree:true,childList:true});
})();