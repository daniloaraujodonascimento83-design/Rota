// ROTA opening build 2026-09-16
(()=>{ 
  const hasToken=()=>!!localStorage.getItem('rota_token');
  const style=document.createElement('style');
  style.textContent=`
  #rotaOpening{position:fixed;inset:0;z-index:20000;overflow:auto;color:#fff;background:#020817;font-family:Inter,system-ui,Arial,sans-serif}
  #rotaOpening *{box-sizing:border-box}
  .ro-bg{position:absolute;inset:0;overflow:hidden;background:
    radial-gradient(circle at 50% 28%,rgba(28,154,255,.30),transparent 28%),
    radial-gradient(circle at 14% 68%,rgba(0,211,255,.18),transparent 25%),
    radial-gradient(circle at 88% 70%,rgba(255,184,45,.16),transparent 24%),
    linear-gradient(145deg,#02132f 0%,#06335e 46%,#020817 100%)}
  .ro-bg:before{content:"";position:absolute;inset:-20%;background:
    linear-gradient(125deg,transparent 42%,rgba(22,172,255,.16) 43%,transparent 44%),
    linear-gradient(12deg,transparent 55%,rgba(36,110,255,.13) 56%,transparent 57%),
    linear-gradient(168deg,transparent 68%,rgba(255,177,45,.10) 69%,transparent 70%);
    transform:rotate(-3deg);filter:blur(1px)}
  .ro-stars{position:absolute;inset:0;background-image:radial-gradient(#fff8 1px,transparent 1px);background-size:90px 90px;opacity:.12}
  .ro-scene{position:absolute;inset:0;pointer-events:none}
  .ro-plane{position:absolute;right:7%;top:5%;font-size:clamp(54px,9vw,110px);transform:rotate(-8deg);filter:drop-shadow(0 15px 22px #0009);animation:roPlane 7s ease-in-out infinite}
  .ro-bike{position:absolute;left:2%;bottom:8%;font-size:clamp(74px,13vw,170px);transform:rotate(-8deg);filter:drop-shadow(0 22px 28px #000b);animation:roBike 5s ease-in-out infinite}
  .ro-truck{position:absolute;right:0;bottom:17%;font-size:clamp(62px,11vw,145px);filter:drop-shadow(0 20px 28px #000b);animation:roTruck 6s ease-in-out infinite}
  .ro-ship{position:absolute;right:4%;bottom:0;font-size:clamp(70px,12vw,150px);filter:drop-shadow(0 16px 25px #000a);animation:roShip 6s ease-in-out infinite}
  .ro-road{position:absolute;left:-5%;right:-5%;bottom:8%;height:24%;background:linear-gradient(165deg,transparent 20%,rgba(0,185,255,.16) 21%,rgba(0,185,255,.03) 38%,transparent 39%);transform:skewY(-5deg)}
  .ro-card{position:relative;z-index:3;width:min(530px,calc(100% - 28px));margin:0 auto;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:28px 0}
  .ro-brand{text-align:center;margin-bottom:18px}
  .ro-logo{font-size:clamp(58px,13vw,100px);line-height:.8;font-weight:950;letter-spacing:-5px;text-shadow:0 0 35px #008dff55}
  .ro-logo .o{color:#18a9ff}.ro-logo .rest{color:#f3f6fb}.ro-tag{margin-top:14px;font-size:clamp(13px,2.8vw,18px);font-weight:900;letter-spacing:4px}
  .ro-line{color:#dceafa;text-align:center;font-size:clamp(17px,4vw,25px);font-weight:800;margin:18px auto 16px}.ro-line b{color:#13a8ff}
  .ro-shortcuts{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:0 0 16px}
  .ro-shortcuts button{padding:10px 5px;border-radius:15px;background:#061a35d9;border:1px solid #1b6095;color:#fff;font-weight:850;font-size:11px;box-shadow:0 8px 22px #0005}
  .ro-shortcuts button span{display:block;font-size:27px;margin-bottom:5px}
  .ro-form{padding:22px;border-radius:26px;background:linear-gradient(145deg,rgba(5,27,58,.93),rgba(2,13,31,.94));border:1px solid #1baeffaa;box-shadow:0 25px 75px #000b,0 0 45px #008cff22;backdrop-filter:blur(14px)}
  .ro-form h1{text-align:center;font-size:32px;margin:0}.ro-form h1 b{color:#1aaeff}.ro-form p{text-align:center;color:#b5cde5;margin:7px 0 17px;font-size:13px}
  .ro-input{display:flex;align-items:center;gap:10px;padding:12px 14px;margin:8px 0;border-radius:15px;border:1px solid #24639a;background:#04152c;color:#8eaaca}.ro-input span{font-size:21px}.ro-input input{width:100%;border:0;outline:0;background:transparent;color:#fff;font-size:14px}.ro-input input::placeholder{color:#7f9bbb}
  .ro-primary{width:100%;padding:14px;border-radius:15px;background:linear-gradient(135deg,#078cff,#16caff);color:#fff;font-weight:950;font-size:15px;margin-top:5px;box-shadow:0 10px 25px #008cff33}
  .ro-google{width:100%;padding:12px;border-radius:15px;background:#061a35;border:1px solid #1baeff;color:#d9edff;font-weight:850;margin-top:9px}
  .ro-or{text-align:center;color:#7e9ab8;font-size:12px;margin:10px}.ro-enter{text-align:center;margin-top:12px;color:#b8cde2;font-size:13px}.ro-enter button{background:none;color:#2dc1ff;font-weight:900}
  .ro-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.ro-benefit{text-align:center;padding:10px 6px;border-top:1px solid #24547c;color:#c7dbef;font-size:10px}.ro-benefit b{display:block;color:#fff;font-size:12px;margin-bottom:3px}
  .ro-slogan{text-align:center;color:#1cb9ff;font-size:22px;font-style:italic;font-weight:900;margin-top:16px}
  .ro-small{font-size:9px;color:#6f8eae;text-align:center;margin-top:6px}
  @keyframes roPlane{0%,100%{transform:translate(0,0) rotate(-8deg)}50%{transform:translate(-35px,18px) rotate(-4deg)}}@keyframes roBike{0%,100%{transform:translate(0,0) rotate(-8deg)}50%{transform:translate(20px,-8px) rotate(-5deg)}}@keyframes roTruck{0%,100%{transform:translate(0,0)}50%{transform:translate(-12px,-4px)}}@keyframes roShip{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-5px)}}
  @media(max-width:650px){.ro-card{padding:20px 0}.ro-shortcuts button{font-size:9px}.ro-shortcuts button span{font-size:23px}.ro-form{padding:18px}.ro-form h1{font-size:28px}.ro-benefits{grid-template-columns:1fr 1fr 1fr}.ro-plane{right:-5%;top:4%}.ro-bike{left:-8%;bottom:6%}.ro-truck{right:-7%;bottom:18%}.ro-ship{right:-4%;bottom:1%}}
  `;
  document.head.appendChild(style);
  const root=document.createElement('div');root.id='rotaOpening';
  root.innerHTML=`
    <div class="ro-bg"></div><div class="ro-stars"></div><div class="ro-road"></div>
    <div class="ro-scene"><div class="ro-plane">✈️</div><div class="ro-bike">🏍️</div><div class="ro-truck">🚛</div><div class="ro-ship">🚢</div></div>
    <main class="ro-card">
      <div class="ro-brand"><div class="ro-logo"><span class="rest">R</span><span class="o">O</span><span class="rest">TA</span></div><div class="ro-tag">TUDO EM UM SÓ LUGAR</div></div>
      <div class="ro-line">Conectando pessoas, <b>serviços e oportunidades.</b></div>
      <div class="ro-shortcuts">
        <button data-open="passagens"><span>✈️</span>Passagens</button><button data-open="cargas"><span>🚚</span>Cargas</button><button data-open="compras"><span>🛒</span>Compras</button><button data-open="entregas"><span>🏍️</span>Entregas</button><button data-open="vip"><span>👑</span>Área VIP</button>
      </div>
      <section class="ro-form">
        <h1>Crie sua conta<br>no <b>ROTA</b></h1><p>Tenha acesso a todas as funcionalidades<br>e aproveite o melhor da plataforma.</p>
        <div class="ro-input"><span>♙</span><input id="roName" placeholder="Nome completo" autocomplete="name"></div>
        <div class="ro-input"><span>✉</span><input id="roEmail" placeholder="E-mail" type="email" autocomplete="email"></div>
        <div class="ro-input"><span>☎</span><input id="roPhone" placeholder="Telefone (com DDD)" autocomplete="tel"></div>
        <div class="ro-input"><span>🔒</span><input id="roPass" placeholder="Senha" type="password" autocomplete="new-password"></div>
        <div class="ro-input"><span>🔒</span><input id="roPass2" placeholder="Confirmar senha" type="password" autocomplete="new-password"></div>
        <button class="ro-primary" id="roCreate">Criar acesso →</button><div class="ro-or">ou</div><button class="ro-google" id="roGoogle">🌈 &nbsp; Cadastrar com Google</button>
        <div class="ro-enter">Já tem uma conta? <button id="roLogin">Entrar →</button></div>
      </section>
      <div class="ro-benefits"><div class="ro-benefit">🛡️<b>Seus dados estão seguros</b>Proteção das informações.</div><div class="ro-benefit">⚡<b>Rápido e fácil</b>Crie sua conta em poucos minutos.</div><div class="ro-benefit">🎧<b>Suporte 24h</b>Estamos sempre prontos.</div></div>
      <div class="ro-slogan">ROTA é movimento!</div><div class="ro-small">ROTA • Tudo em um só lugar</div>
    </main>`;
  document.body.appendChild(root);
  const openAuth=(mode)=>{
    const m=document.getElementById('rotaAuthModal');
    if(!m){alert('A tela de acesso ainda está carregando.');return}
    m.classList.add('open');
    const login=mode==='login';
    const lb=document.getElementById('rotaLoginBox'), rb=document.getElementById('rotaRegBox');
    if(lb&&rb){lb.style.display=login?'block':'none';rb.style.display=login?'none':'block'}
    const t=document.getElementById('rotaAuthTitle');if(t)t.textContent=login?'Entrar no ROTA':'Criar acesso no ROTA';
    root.remove();
  };
  document.getElementById('roLogin').onclick=()=>openAuth('login');
  document.getElementById('roCreate').onclick=()=>{
    const n=document.getElementById('roName').value.trim(),e=document.getElementById('roEmail').value.trim(),p=document.getElementById('roPhone').value.trim(),a=document.getElementById('roPass').value,b=document.getElementById('roPass2').value;
    if(!n||!e||!p||!a||!b){alert('Preencha todos os campos para criar seu acesso.');return}
    if(a!==b){alert('As senhas não conferem.');return}
    openAuth('register');
    setTimeout(()=>{const x=id=>document.getElementById(id); if(x('rotaName'))x('rotaName').value=n;if(x('rotaRegEmail'))x('rotaRegEmail').value=e;if(x('rotaPhone'))x('rotaPhone').value=p;if(x('rotaRegPassword'))x('rotaRegPassword').value=a},30);
  };
  root.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{
    const a=b.dataset.open;
    if(a==='vip'&&window.openVipFlow){root.remove();window.openVipFlow();return}
    if(a==='cargas'&&window.openTruckFlow){root.remove();window.openTruckFlow();return}
    if(a==='entregas'&&window.openClientFlow){root.remove();window.openClientFlow('Nova entrega');return}
    if(a==='compras'&&window.openClientFlow){root.remove();window.openClientFlow('Comprar');return}
    if(a==='passagens'&&window.openClientFlow){root.remove();window.openClientFlow('Passagens');return}
  });
})();