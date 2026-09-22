// ROTA opening — exact cinematic reference cover with real interactive controls
(()=>{const COVER="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAIcAWgDASIAAhEBAxEB/8QAGwAAAgMBAQAAAAAAAAAAAAAA...REPLACE...";const s=document.createElement("style");s.textContent=`
#rotaOpening{position:fixed;inset:0;z-index:20000;background:#010817;overflow:hidden}
#rotaOpening .cover{position:absolute;inset:0;background:#010817 url("${COVER}") center/cover no-repeat}
#rotaOpening .shade{position:absolute;inset:0;background:transparent}
#rotaOpening .hit{position:absolute;border:0;background:transparent;z-index:3}
#rotaOpening input{position:absolute;z-index:4;border:0;outline:0;background:transparent;color:transparent;caret-color:#20b7ff;font:600 14px Inter,Arial,sans-serif}
#rotaOpening input::placeholder{color:transparent}
#rotaOpening .msg{position:absolute;z-index:10;left:50%;top:45%;transform:translate(-50%,-50%);display:none;background:#061a35;color:#fff;border:1px solid #20b7ff;border-radius:14px;padding:12px 16px;font-weight:800}
@media(max-width:650px){#rotaOpening .cover{background-position:center top}#rotaOpening input{font-size:13px}}
`;document.head.appendChild(s);
const root=document.createElement("div");root.id="rotaOpening";root.innerHTML='<div class="cover"></div><div class="shade"></div><div class="msg" id="roMsg"></div>';
document.body.appendChild(root);
const add=(tag,cls,css,attrs={})=>{const e=document.createElement(tag);e.className=cls;e.style.cssText=css;Object.entries(attrs).forEach(([k,v])=>e[k]=v);root.appendChild(e);return e};
const inp=(id,top,type)=>{const e=add("input","field","left:28%;width:44%;top:"+top+"%;height:3.6%;padding:0 10px;",{id,type,autocomplete:type==="email"?"email":type==="tel"?"tel":"off"});return e};
const name=inp("roName",50.7,"text"),email=inp("roEmail",55.2,"email"),phone=inp("roPhone",59.7,"tel"),pass=inp("roPass",64.2,"password"),pass2=inp("roPass2",68.7,"password");
const click=(top,left,width,height,fn)=>{const e=add("button","hit","top:"+top+"%;left:"+left+"%;width:"+width+"%;height:"+height+"%;",{});e.onclick=fn;return e};
const msg=t=>{const m=document.getElementById("roMsg");m.textContent=t;m.style.display="block";setTimeout(()=>m.style.display="none",2200)};
const openAuth=mode=>{const m=document.getElementById("rotaAuthModal");if(!m){msg("A tela de acesso ainda está carregando.");return}m.classList.add("open");const login=mode==="login",lb=document.getElementById("rotaLoginBox"),rb=document.getElementById("rotaRegBox");if(lb&&rb){lb.style.display=login?"block":"none";rb.style.display=login?"none":"block"}const t=document.getElementById("rotaAuthTitle");if(t)t.textContent=login?"Entrar no ROTA":"Criar acesso no ROTA";root.remove()};
click(34,24,13,8,()=>window.openClientFlow&&window.openClientFlow("Passagens"));
click(34,38,13,8,()=>window.openTruckFlow&&window.openTruckFlow());
click(34,51,13,8,()=>window.openClientFlow&&window.openClientFlow("Comprar"));
click(34,64,13,8,()=>window.openClientFlow&&window.openClientFlow("Nova entrega"));
click(34,77,13,8,()=>window.openVipFlow&&window.openVipFlow());
click(74,28,44,5,()=>{const n=name.value.trim(),e=email.value.trim(),p=phone.value.trim(),a=pass.value,b=pass2.value;if(!n||!e||!p||!a||!b)return msg("Preencha todos os campos.");if(a!==b)return msg("As senhas não conferem.");openAuth("register");setTimeout(()=>{const x=id=>document.getElementById(id);if(x("rotaName"))x("rotaName").value=n;if(x("rotaRegEmail"))x("rotaRegEmail").value=e;if(x("rotaPhone"))x("rotaPhone").value=p;if(x("rotaRegPassword"))x("rotaRegPassword").value=a},40)});
click(79,28,44,5,()=>msg("Cadastro com Google será conectado ao provedor seguro."));
click(83,39,22,4,()=>openAuth("login"));
})();