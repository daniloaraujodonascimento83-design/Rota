// ROTA opening build 2026-09-16 — cinematic reference-style cover
(()=>{ 
  const style=document.createElement('style');
  style.textContent=`
  #rotaOpening{position:fixed;inset:0;z-index:20000;overflow:auto;color:#fff;background:#010817;font-family:Inter,system-ui,Arial,sans-serif}
  #rotaOpening *{box-sizing:border-box}
  .ro-bg{position:fixed;inset:0;background-color:#010817;background-image:url("/rota-cover.jpg");background-size:cover;background-position:center top;background-repeat:no-repeat}
  .ro-bg:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,10,25,.05),rgba(0,8,20,.42) 62%,rgba(1,8,23,.86));filter:blur(1px)}
  .ro-stars{position:absolute;inset:0;background-image:radial-gradient(#fff9 1px,transparent 1px);background-size:82px 82px;opacity:.14}
  .ro-cover{position:relative;z-index:2;min-height:610px;height:54vh;min-height:560px;overflow:hidden;display:flex;align-items:flex-start;justify-content:center;padding-top:42px}
  .ro-cover:after{content:"";position:absolute;left:0;right:0;bottom:0;height:35%;background:linear-gradient(transparent,#010817)}
  .ro-sun{position:absolute;width:170px;height:170px;border-radius:50%;right:17%;bottom:13%;background:radial-gradient(circle,#ffd36b 0,#ff9b2f 24%,rgba(255,154,47,.22) 55%,transparent 72%);filter:blur(1px);opacity:.85}
  .ro-city{position:absolute;left:0;right:0;bottom:0;height:24%;opacity:.7;background:
    linear-gradient(to top,rgba(0,0,0,.88),transparent),
    repeating-linear-gradient(90deg,transparent 0 34px,rgba(12,42,75,.9) 35px 52px,transparent 53px 78px)}
  .ro-plane,.ro-bike,.ro-truck,.ro-ship{display:none}.ro-plane{position:absolute;right:7%;top:2%;font-size:clamp(62px,12vw,150px);transform:rotate(-8deg);filter:drop-shadow(0 18px 28px #000c);animation:roPlane 7s ease-in-out infinite}
  .ro-bike{position:absolute;left:-2%;bottom:5%;font-size:clamp(105px,18vw,230px);transform:rotate(-8deg);filter:drop-shadow(0 25px 32px #000d);animation:roBike 5s ease-in-out infinite}
  .ro-truck{position:absolute;right:-2%;bottom:8%;font-size:clamp(95px,16vw,220px);filter:drop-shadow(0 24px 32px #000d);animation:roTruck 6s ease-in-out infinite}
  .ro-ship{position:absolute;right:8%;bottom:-2%;font-size:clamp(88px,15vw,200px);filter:drop-shadow(0 18px 28px #000c);animation:roShip 6s ease-in-out infinite}
  .ro-cover-brand{position:relative;z-index:5;text-align:center;margin-top:70px}
  .ro-logo{font-size:clamp(72px,15vw,130px);line-height:.8;font-weight:950;letter-spacing:-7px;text-shadow:0 0 40px #008dff66}
  .ro-logo .o{color:#18a9ff}.ro-logo .rest{color:#f7f9fc}
  .ro-tag{margin-top:16px;font-size:clamp(13px,2.8vw,20px);font-weight:950;letter-spacing:5px}
  .ro-line{position:relative;z-index:5;color:#f0f7ff;text-align:center;font-size:clamp(18px,4vw,28px);font-weight:900;margin:20px auto 14px;text-shadow:0 3px 18px #000}
  .ro-line b{color:#18b4ff}
  .ro-shortcuts{position:relative;z-index:8;display:grid;grid-template-columns:repeat(5,1fr);gap:9px;width:min(720px,calc(100% - 28px));margin:0 auto 24px}
  .ro-shortcuts button{padding:9px 4px;border-radius:16px;background:rgba(3,23,50,.72);border:1px solid #3d9bd8;color:#fff;font-weight:900;font-size:11px;box-shadow:0 10px 25px #0007;backdrop-filter:blur(7px)}
  .ro-shortcuts button span{display:block;font-size:29px;margin-bottom:4px}
  .ro-main{position:relative;z-index:10;width:min(530px,calc(100% - 28px));margin:-12px auto 0;padding-bottom:30px}
  .ro-form{padding:22px;border-radius:28px;background:linear-gradient(145deg,rgba(4,28,60,.97),rgba(2,13,31,.98));border:1px solid #20b7ff;box-shadow:0 25px 80px #000d,0 0 55px #008cff2a;backdrop-filter:blur(16px)}
  .ro-form h1{text-align:center;font-size:32px;line-height:1.05;margin:0}.ro-form h1 b{color:#1aaeff}.ro-form p{text-align:center;color:#b8cfe7;margin:8px 0 17px;font-size:13px}
  .ro-input{display:flex;align-items:center;gap:10px;padding:12px 14px;margin:8px 0;border-radius:16px;border:1px solid #2b6fa8;background:#03162e;color:#a4c0de;box-shadow:inset 0 0 18px #0005}
  .ro-input span{font-size:21px}.ro-input input{width:100%;border:0;outline:0;background:transparent;color:#fff;font-size:14px}.ro-input input::placeholder{color:#7898b9}
  .ro-primary{width:100%;padding:14px;border-radius:16px;background:linear-gradient(135deg,#078cff,#16caff);color:#fff;border:0;font-weight:950;font-size:15px;margin-top:5px;box-shadow:0 12px 28px #008cff40}
  .ro-google{width:100%;padding:12px;border-radius:16px;background:#061a35;border:1px solid #20b7ff;color:#d9edff;font-weight:850;margin-top:9px}
  .ro-or{text-align:center;color:#7e9ab8;font-size:12px;margin:10px}.ro-enter{text-align:center;margin-top:12px;color:#b8cde2;font-size:13px}.ro-enter button{background:none;border:0;color:#2dc1ff;font-weight:900}
  .ro-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:15px}.ro-benefit{text-align:center;padding:10px 6px;border-top:1px solid #24547c;color:#c7dbef;font-size:10px}.ro-benefit b{display:block;color:#fff;font-size:12px;margin-bottom:3px}
  .ro-slogan{text-align:center;color:#1cb9ff;font-size:23px;font-style:italic;font-weight:900;margin-top:16px}.ro-small{font-size:9px;color:#6f8eae;text-align:center;margin-top:6px}
  @keyframes roPlane{0%,100%{transform:translate(0,0) rotate(-8deg)}50%{transform:translate(-35px,18px) rotate(-4deg)}}@keyframes roBike{0%,100%{transform:translate(0,0) rotate(-8deg)}50%{transform:translate(20px,-8px) rotate(-5deg)}}@keyframes roTruck{0%,100%{transform:translate(0,0)}50%{transform:translate(-12px,-4px)}}@keyframes roShip{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-5px)}}
  @media(max-width:650px){
    .ro-cover{height:54vh;min-height:520px;padding-top:18px}.ro-cover-brand{margin-top:48px}
    .ro-logo{font-size:clamp(62px,17vw,96px)}.ro-tag{letter-spacing:3px}
    .ro-plane{right:-9%;top:1%}.ro-bike{left:-15%;bottom:5%}.ro-truck{right:-12%;bottom:8%}.ro-ship{right:-9%;bottom:-2%}
    .ro-shortcuts{gap:6px}.ro-shortcuts button{font-size:9px;padding:8px 2px}.ro-shortcuts button span{font-size:23px}
    .ro-form{padding:18px}.ro-form h1{font-size:28px}
  }
  `;
  document.head.appendChild(style);
  const root=document.createElement('div');root.id='rotaOpening';
  root.innerHTML=`
    <div class="ro-bg"></div><div class="ro-stars"></div>
    <section class="ro-cover">
      <div class="ro-sun"></div><div class="ro-city"></div>
      <div class="ro-plane">✈️</div><div class="ro-bike">🏍️</div><div class="ro-truck">🚛</div><div class="ro-ship">🚢</div>
      <div class="ro-cover-brand">
        <div class="ro-logo"><span class="rest">R</span><span class="o">O</span><span class="rest">TA</span></div>
        <div class="ro-tag">TUDO EM UM SÓ LUGAR</div>
        <div class="ro-line">Conectando pessoas, <b>serviços e oportunidades.</b></div>
      </div>
    </section>
    <div class="ro-shortcuts">
      <button data-open="passagens"><span>✈️</span>Passagens</button><button data-open="cargas"><span>🚚</span>Cargas</button><button data-open="compras"><span>🛒</span>Compras</button><button data-open="entregas"><span>🏍️</span>Entregas</button><button data-open="vip"><span>👑</span>Área VIP</button>
    </div>
    <main class="ro-main">
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
    const login=mode==='login',lb=document.getElementById('rotaLoginBox'),rb=document.getElementById('rotaRegBox');
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
    setTimeout(()=>{const x=id=>document.getElementById(id);if(x('rotaName'))x('rotaName').value=n;if(x('rotaRegEmail'))x('rotaRegEmail').value=e;if(x('rotaPhone'))x('rotaPhone').value=p;if(x('rotaRegPassword'))x('rotaRegPassword').value=a},30);
  };
  root.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{
    const a=b.dataset.open;
    if(a==='vip'&&window.openVipFlow){root.remove();window.openVipFlow();return}
    if(a==='cargas'&&window.openTruckFlow){root.remove();window.openTruckFlow();return}
    if(window.openClientFlow){root.remove();window.openClientFlow(a==='entregas'?'Nova entrega':a==='compras'?'Comprar':'Passagens');}
  });
})();