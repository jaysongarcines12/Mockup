var P=[
{t:"Mangrove Monitoring System",i:"🌿",g:["#1f8a5b","#2fb7a3"],cat:["web"],tags:["Laravel"],d:"A website for monitoring and managing mangrove reforestation.",pts:["Web-based monitoring","Reforestation management"],st:"Built"},
{t:"Mt. Denor Tourism System",i:"⛰️",g:["#2f6f9f","#5aa6c9"],cat:["web"],tags:["Laravel"],d:"A trail map and guide tracker for a local trail in Santa Cruz, Davao del Sur.",pts:["Admin dashboard","Trail map","Guide tracker","Analytics"],st:"Client project"},
{t:"Brew ni Jay",i:"☕",g:["#8a5a3c","#c08a5a"],cat:["mobile"],tags:["Flutter","GetX"],d:"A mobile app made with Flutter using the GetX architecture.",pts:["GetX controllers and bindings","Forms with flutter_form_builder","API calls with http"],st:"Built"},
{t:"Grocery Thermal Printer",i:"🧾",g:["#6b4fb3","#a07be0"],cat:["iot","web"],tags:["Arduino","ESP32","Laravel"],d:"A receipt printer for a small grocery store, connected to a website.",pts:["Thermal printer hardware","Laravel website side"],st:"Built"},
{t:"AquaZone",i:"🐟",g:["#0f6e8c","#2fb7d3"],cat:["proposal"],tags:["GIS","Proposal"],d:"Capstone proposal: a map-based decision support system to help choose fish cage locations for BFAR Santa Cruz, Davao del Sur.",pts:["Cage siting","Carrying capacity"],st:"Capstone proposal"},
{t:"RouteTrack",i:"🚌",g:["#c2552d","#e8894f"],cat:["proposal","iot"],tags:["GIS","Thermal printer","Proposal"],d:"Capstone proposal: records passenger destinations on minibuses and maps drop-offs on the Santa Cruz to Digos City route.",pts:["Destination recording with a thermal printer","Drop-off mapping"],st:"Capstone proposal"}
];
var F=[["all","All"],["web","Web"],["mobile","Mobile"],["iot","IoT"],["proposal","Proposals"]];
var cur="all";
function card(p,idx){
  return '<button class="card rv" data-i="'+idx+'"><div class="shot" style="background:linear-gradient(135deg,'+p.g[0]+','+p.g[1]+')">'+p.i+'</div><div class="pad"><h3>'+p.t+'</h3><p>'+p.d+'</p>'+p.tags.map(function(x){return '<span class="tag">'+x+'</span>'}).join('')+'<div class="hint">View details →</div></div></button>';
}
function renderGrid(){
  var h="";P.forEach(function(p,i){if(cur==="all"||p.cat.indexOf(cur)>-1)h+=card(p,i)});
  var g=document.getElementById("grid");g.innerHTML=h;reveal();
  document.querySelectorAll("#chips .chip").forEach(function(c){c.classList.toggle("on",c.dataset.f===cur)});
}
document.getElementById("chips").innerHTML=F.map(function(f){return '<button class="chip" data-f="'+f[0]+'">'+f[1]+'</button>'}).join('');
document.getElementById("chips").addEventListener("click",function(e){var b=e.target.closest(".chip");if(b){cur=b.dataset.f;renderGrid()}});
document.getElementById("featured").innerHTML=[0,3,1].map(function(i){return card(P[i],i)}).join('');
renderGrid();

var dlg=document.getElementById("dlg");
document.addEventListener("click",function(e){
  var c=e.target.closest(".card");
  if(c){var p=P[+c.dataset.i];
    document.getElementById("mhead").style.background="linear-gradient(135deg,"+p.g[0]+","+p.g[1]+")";
    document.getElementById("mhead").textContent=p.i;
    document.getElementById("mbody").innerHTML='<h3>'+p.t+'</h3><p class="mute">'+p.st+'</p><p>'+p.d+'</p><ul>'+p.pts.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+p.tags.map(function(x){return '<span class="tag">'+x+'</span>'}).join('');
    dlg.showModal();return;}
  if(e.target===dlg||e.target.id==="mclose")dlg.close();
});

var pages=["home","projects","about","contact"];
function route(){
  var h=(location.hash||"#home").slice(1);if(pages.indexOf(h)<0)h="home";
  pages.forEach(function(p){document.getElementById(p).classList.toggle("show",p===h)});
  document.querySelectorAll("#nav a").forEach(function(a){a.classList.toggle("active",a.dataset.p===h)});
  window.scrollTo(0,0);reveal();if(h==="home")count();
}
window.addEventListener("hashchange",route);

var io=("IntersectionObserver" in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1}):null;
function reveal(){document.querySelectorAll(".rv:not(.in)").forEach(function(el,i){el.style.transitionDelay=(i%3)*80+"ms";if(io)io.observe(el);else el.classList.add("in")})}

var counted=false;
function count(){
  if(counted)return;counted=true;
  document.querySelectorAll("[data-n]").forEach(function(el){
    var n=+el.dataset.n,k=0;var t=setInterval(function(){k++;el.textContent=k;if(k>=n)clearInterval(t)},260);
  });
}

var roles=["BSIT student","Aspiring web developer","Laravel and Flutter builder"],ri=0,ci=0,del=false,ty=document.getElementById("typed");
var still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function type(){
  var r=roles[ri];
  if(still){ty.textContent=roles[0]+" and "+roles[1].toLowerCase();return}
  ci+=del?-1:1;ty.textContent=r.slice(0,ci);
  var wait=del?35:70;
  if(!del&&ci===r.length){del=true;wait=1400}
  else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;wait=300}
  setTimeout(type,wait);
}
type();

document.getElementById("theme").addEventListener("click",function(){
  var r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==="dark":(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme=dark?"light":"dark";
});

document.getElementById("send").addEventListener("click",function(){
  var n=document.getElementById("n"),e=document.getElementById("e"),m=document.getElementById("m"),err=document.getElementById("err"),ok=document.getElementById("ok");
  [n,e,m].forEach(function(x){x.classList.remove("bad")});ok.style.display="none";
  var msg="";
  if(!n.value.trim()){n.classList.add("bad");msg="Please enter your name."}
  else if(!/^\S+@\S+\.\S+$/.test(e.value)){e.classList.add("bad");msg="Please enter a valid email."}
  else if(m.value.trim().length<5){m.classList.add("bad");msg="Please write a short message."}
  err.textContent=msg;if(msg)return;
  ok.textContent="Thank you, "+n.value.trim()+". Your email app should open with the message ready to send.";
  ok.style.display="block";
  location.href="mailto:jay@example.com?subject="+encodeURIComponent("Portfolio message from "+n.value.trim())+"&body="+encodeURIComponent(m.value+"\n\n"+n.value+" ("+e.value+")");
});
route();
