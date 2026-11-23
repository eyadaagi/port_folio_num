
(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* Mode sombre */
const root=document.documentElement,tb=$('#theme');
function setTheme(t){root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){};if(tb){tb.textContent=t==='dark'?'☀️':'🌙';tb.setAttribute('aria-label',t==='dark'?'Passer en mode clair':'Passer en mode sombre')}}
setTheme(root.dataset.theme||'light');
tb&&tb.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
/* Menu mobile */
const bg=$('#burger'),nav=$('#nav');
bg&&bg.addEventListener('click',()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
$$('li.group>button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
/* Apparition au scroll */
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null;
$$('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
/* Machine à écrire */
const tw=$('#typed');
if(tw){const w=JSON.parse(tw.dataset.words);let i=0,j=0,del=false;
(function tick(){const cur=w[i];tw.textContent=cur.slice(0,j);
if(!del&&j===cur.length){del=true;return setTimeout(tick,1600)}
if(del&&j===0){del=false;i=(i+1)%w.length}
j+=del?-1:1;setTimeout(tick,del?40:90)})()}
/* Boutons copier */
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const t=$(b.dataset.copy).innerText;navigator.clipboard&&navigator.clipboard.writeText(t);const o=b.textContent;b.textContent='Copié ✓';setTimeout(()=>b.textContent=o,1500)}));
/* Quiz cybersécurité */
const q=$('#quiz');
if(q){const Q=[
['Un mail de ta « banque » te demande de confirmer ton mot de passe via un lien. Que fais-tu ?',['Je clique et je me connecte vite','Je supprime le mail et j\'ouvre le site de la banque moi-même','Je réponds au mail'],1,'C\'est du phishing : ne jamais se connecter depuis un lien reçu, passe par le site officiel.'],
['Quel mot de passe est le plus robuste ?',['azerty123','Prenom2006','Une phrase de passe longue et unique : « Mon-chat-boit-du-thé-à-7h ! »'],2,'La longueur et l\'unicité comptent plus que la complexité apparente.'],
['À quoi sert l\'authentification à deux facteurs (2FA) ?',['À aller plus vite','À protéger le compte même si le mot de passe est volé','À supprimer les virus'],1,'Un second facteur (code, appli) bloque l\'accès même si ton mot de passe a fuité.'],
['Quel logiciel malveillant chiffre tes fichiers et demande une rançon ?',['Un spyware','Un ransomware','Un ver'],1,'Le ransomware bloque tes données : la meilleure parade reste les sauvegardes.'],
['Sur un Wi-Fi public (gare, café), il vaut mieux…',['Éviter les connexions sensibles ou utiliser un VPN','Faire ses achats en ligne','Désactiver les mises à jour'],0,'Un réseau public peut être espionné : évite banque et achats, ou utilise un VPN.'],
['Pourquoi faire les mises à jour ?',['Pour changer le design','Pour corriger des failles de sécurité','Pour ralentir le PC'],1,'Les mises à jour corrigent des failles que les pirates exploitent.']];
let n=0,sc=0;const bar=$('.progress i',q),box=$('#qbox');
function show(){bar.style.width=(n/Q.length*100)+'%';
if(n>=Q.length){const m=sc>=5?'Excellent, tu es bien protégé·e ! 🛡️':sc>=3?'Pas mal, encore quelques réflexes à prendre.':'Relis le chapitre, tu vas vite progresser !';
box.innerHTML='<h3>Score : '+sc+' / '+Q.length+'</h3><p>'+m+'</p><button class="btn" id="again">Rejouer</button>';$('#again').onclick=()=>{n=0;sc=0;show()};return}
const [t,o,a,e]=Q[n];box.innerHTML='<h3>'+(n+1)+'. '+t+'</h3>';
o.forEach((x,k)=>{const b=document.createElement('button');b.className='opt';b.textContent=x;b.onclick=()=>{$$('.opt',box).forEach((y,z)=>{y.disabled=true;if(z===a)y.classList.add('ok')});if(k===a)sc++;else b.classList.add('ko');
const p=document.createElement('p');p.textContent=e;const nx=document.createElement('button');nx.className='btn';nx.textContent=n+1<Q.length?'Question suivante':'Voir mon score';nx.onclick=()=>{n++;show()};box.append(p,nx)};box.append(b)})}
show()}
/* Checklist */
const ck=$('#checklist');
if(ck){const out=$('#ckscore'),all=$$('input',ck);const up=()=>{const c=all.filter(i=>i.checked).length;out.textContent=c+' / '+all.length+' bonnes pratiques adoptées';$('#ckbar').style.width=(c/all.length*100)+'%'};all.forEach(i=>i.addEventListener('change',up));up()}
/* Visualisation d'un tri */
const bars=$('#bars');
if(bars){let run=false;const N=28;const draw=a=>{bars.innerHTML='';a.forEach(v=>{const i=document.createElement('i');i.style.height=v+'%';bars.append(i)})};
let arr=[];const mix=()=>{arr=Array.from({length:N},()=>10+Math.floor(Math.random()*90));draw(arr)};mix();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
$('#mix').onclick=()=>{if(!run)mix()};
$('#sort').onclick=async()=>{if(run)return;run=true;const b=bars.children;
for(let i=0;i<N-1;i++)for(let j=0;j<N-i-1;j++){b[j].classList.add('act');b[j+1].classList.add('act');
if(arr[j]>arr[j+1]){[arr[j],arr[j+1]]=[arr[j+1],arr[j]];b[j].style.height=arr[j]+'%';b[j+1].style.height=arr[j+1]+'%'}
await sleep(18);b[j].classList.remove('act');b[j+1].classList.remove('act')}run=false}}
/* Convertisseur de bases */
const cv=$('#conv');
if(cv){const d=$('#dec'),b=$('#bin'),h=$('#hex');
const set=n=>{if(isNaN(n)||n<0){d.value=b.value=h.value='';return}d.value=n;b.value=n.toString(2);h.value=n.toString(16).toUpperCase()};
d.oninput=()=>set(parseInt(d.value,10));b.oninput=()=>set(parseInt(b.value,2));h.oninput=()=>set(parseInt(h.value,16));d.value=42;set(42)}
/* Portes logiques */
const gt=$('#gates');
if(gt){const G={AND:(a,b)=>a&b,OR:(a,b)=>a|b,XOR:(a,b)=>a^b,NAND:(a,b)=>+!(a&b),NOR:(a,b)=>+!(a|b),NOT:(a)=>+!a};
let g='AND',A=0,B=0;const tab=$('#truth'),lamp=$('#lamp'),res=$('#res');
function render(){const u=g==='NOT';let h='<tr><th>A</th>'+(u?'':'<th>B</th>')+'<th>Sortie</th></tr>';
(u?[[0],[1]]:[[0,0],[0,1],[1,0],[1,1]]).forEach(r=>{h+='<tr><td>'+r[0]+'</td>'+(u?'':'<td>'+r[1]+'</td>')+'<td><b>'+G[g](r[0],r[1])+'</b></td></tr>'});tab.innerHTML=h;
const o=G[g](A,B);lamp.classList.toggle('on',!!o);res.textContent=g+'('+A+(u?'':', '+B)+') = '+o;$('#tb').style.display=u?'none':''}
$$('[data-gate]').forEach(x=>x.onclick=()=>{g=x.dataset.gate;$$('[data-gate]').forEach(y=>y.setAttribute('aria-pressed',y===x));render()});
$('#ta').onclick=e=>{A^=1;e.target.setAttribute('aria-pressed',!!A);e.target.textContent='A = '+A;render()};
$('#tb').onclick=e=>{B^=1;e.target.setAttribute('aria-pressed',!!B);e.target.textContent='B = '+B;render()};render()}
})();
