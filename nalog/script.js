/* PODACI: pomoćne funkcije, početni podaci (igrači, treneri, proizvodi, utakmice, škola, novosti), stanje aplikacije i čuvanje u pregledaču */
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const lorem="Igrač koji svojim radom i borbenošću predstavlja duh kluba. Odrastao u Nišu, uvek spreman za maksimalan učinak na terenu i van njega.";
const names=["Marko Jovanović","Nikola Stojanović","Stefan Ilić","Luka Petrović","Filip Nikolić","Miloš Đorđević","Uroš Radić","Vuk Mitić","Đorđe Pavlović","Aleksa Kostić"],pos=["PG","SG","SF","PF","C"];
function seed(){return{
players:names.map((n,i)=>({name:n,pos:pos[i%5],num:i+4,ppg:(8+i*1.3).toFixed(1),rpg:(2+i*.6).toFixed(1),apg:(5-i*.3).toFixed(1),desc:lorem})),
coaches:[["Dragan Milovanović","Prvi trener"],["Saša Ristić","Pomoćni trener"],["Zoran Janković","Kondicioni trener"],["Ivan Todorović","Trener golmana"],["Bojan Savić","Fizioterapeut"]].map((c,i)=>({name:c[0],role:c[1],titles:i+2,years:8+i*3,wins:(62-i*3)+"%",desc:"Dugogodišnji član stručnog štaba KK Radnički. Gradi tim na disciplini, odbrani i timskom duhu."})),
products:[["Domaći dres","Dresovi",5900,"S,M,L,XL",20],["Gostujući dres","Dresovi",5900,"S,M,L,XL",0],["Trening dres","Dresovi",4500,"M,L,XL",8],["Retro dres 1945","Dresovi",6900,"S,M,L",5],["Dečiji dres","Dresovi",4200,"S,M",9],["Šorts","Dresovi",3200,"S,M,L,XL",14],
["Majica Ponos Čaira","Majice",2800,"S,M,L,XL",30],["Majica Tvrđava Jug","Majice",2800,"M,L,XL",0],["Duks sa kapuljačom","Majice",5400,"S,M,L,XL",12],["Polo majica","Majice",3600,"M,L,XL",7],["Jakna","Majice",8900,"M,L,XL",3],
["Šal navijača","Dodaci","1500","Uni",50],["Kačket","Dodaci",1900,"Uni",25],["Lopta KK Radnički","Dodaci",4800,"6,7",10],["Ranac","Dodaci",3900,"Uni",0],["Flaša","Dodaci",900,"Uni",40],["Privezak","Dodaci",500,"Uni",100]].map(p=>({name:p[0],cat:p[1],price:+p[2],sizes:p[3],stock:p[4]})),
matches:[["2026-10-24","KK Pirot",0,"7. MLS"],["2026-10-31","KK Vršac",1,"4. MLS"],["2026-11-07","KK Sloboda",0,"9. MLS"],["2026-11-14","KK Zlatibor",1,"3. MLS"],["2026-11-21","KK Mladost",0,"6. MLS"],["2026-11-28","KK Dunav",1,"8. MLS"],["2026-12-05","KK Tamiš",0,"5. MLS"],["2026-12-12","KK Borac",1,"2. MLS"],["2026-12-19","KK Jagodina",0,"10. MLS"]].map(m=>({d:m[0],o:m[1],h:m[2]?1:0,pos:m[3]})),
school:[["U10 (2016–2017)","Marija Stanković","Pon, Sre 16:00–17:00","Hala SC Čair"],["U12 (2014–2015)","Nemanja Ćirić","Uto, Čet 17:00–18:30","Hala SC Čair"],["U14 (2012–2013)","Petar Vasić","Pon, Sre, Pet 18:00–19:30","OŠ Vožd Karađorđe"],["U16 (2010–2011)","Dragan Milovanović","Uto, Čet, Pet 19:30–21:00","Hala SC Čair"]],
news:[["Pobeda u derbiju","Radnički savladao rivala pred rasprodatim Čairom i učvrstio drugu poziciju na tabeli.","Radnički je u subotu savladao rivala pred rasprodatim Čairom i učvrstio drugo mesto na tabeli 2. Muške lige Srbije.\nTribine Tvrđave Jug bile su od prvog minuta na nogama, a ekipa je odgovorila disciplinovanom odbranom i preciznim šutom za tri poena u poslednjoj četvrtini.\nTrener je nakon meča pohvalio atmosferu i poručio da je ovo tek početak sezone. Sledeći meč igra se u hali SC Čair, a ulaznice su dostupne putem sajta.","20. oktobar 2026."],["Upis u školu košarke","Otvoren je upis novih članova za sve uzrasne kategorije. Prijavite se putem forme.","Škola košarke KK Radnički otvorila je upis novih članova za sve uzrasne kategorije, od U10 do U16.\nTreninzi se održavaju u hali SC Čair i školskim salama, pod vođstvom iskusnih trenera kluba. Cilj škole je da kroz igru, disciplinu i timski rad odgajimo nove generacije niških košarkaša.\nPrijavu možete poslati putem forme na stranici Škola košarke, a termini i trenere po kategorijama nalaze se u tabeli pored forme.","15. oktobar 2026."],["Nova kolekcija u shopu","Stigli su novi dresovi i navijački program za novu sezonu.","U klupskom shopu stigla je nova kolekcija za sezonu 2026/27: domaći i gostujući dresovi, majice Ponos Čaira, duksevi i navijački dodaci.\nSvi artikli dostupni su u više veličina, a pojedini komadi proizvedeni su u ograničenoj seriji. Artikli koji su rasprodati ostaju vidljivi i biće dopunjeni čim stignu nove količine.\nPorudžbinu možete poslati direktno sa stranice artikla, uz plaćanje kešom ili karticom.","10. oktobar 2026."]]}}
let D,cart=0,page="pocetna",mo=[2026,9],adm="players",ed=null,sel={},done="",tk=0;
try{D=JSON.parse(localStorage.getItem("kkr"))}catch(e){}D=D||seed();
const save=()=>{try{localStorage.setItem("kkr",JSON.stringify(D))}catch(e){}};
/* NALOG, ČUVANJE PODATAKA I PROVERA FORMI: nalozi, porudžbine, ulaznice i prijave se čuvaju u pregledaču (localStorage) i ostaju posle osvežavanja */
let A;try{A=JSON.parse(localStorage.getItem("kkr_a"))}catch(e){}A=A||{};["users","orders","tickets","enroll"].forEach(k=>A[k]=A[k]||[]);
const saveA=()=>{try{localStorage.setItem("kkr_a",JSON.stringify(A))}catch(e){}};
const ADM="adminadmin@gmail.com",hs=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return"h"+h};
const em=()=>{try{return localStorage.getItem("kkr_u")||""}catch(e){return""}};
const me=()=>{const e=em();if(!e)return null;if(e==ADM)return{admin:1,ime:"Admin",prezime:"",email:ADM,tel:""};return A.users.find(u=>u.email==e)||null};
const isAdmin=()=>!!(me()&&me().admin),mine=o=>o.user==em();
const pre=k=>{const u=me();return u&&u[k]?esc(u[k]):""};
const fd=d=>new Date(d).toLocaleString("sr-Latn-RS");
const okW=w=>/^\p{L}{2,30}$/u.test(w)&&!/(\p{L})\1\1/iu.test(w)&&!/asdf|qwer|zxcv|sdfg|xxx|test/i.test(w)&&/[aeiouаеиоуrр]/i.test(w)&&!/[^aeiouаеиоуrр]{4,}/i.test(w);
const okName=s=>{const t=s.trim();return/^\p{L}+([ '’-]\p{L}+)?$/u.test(t)&&t.split(/[ '’-]/).every(okW)};
const okFull=s=>{const p=s.trim().split(/\s+/);return p.length>1&&p.length<5&&p.every(w=>w.split(/['’-]/).every(okW))};
const okEmail=s=>{const t=s.trim();return/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(t)&&!/\.\./.test(t)};
const okTel=s=>/^(\+381|0)[1-9]\d{7,9}$/.test(s.replace(/[\s\-\/()]/g,""));
const okAdr=s=>{const t=s.trim();return t.length>=5&&/\p{L}{2}/u.test(t)};
const okGrad=s=>/^\p{L}[\p{L} .'-]*[ ,]+\d{5}$/u.test(s.trim());
const okCard=s=>{const d=s.replace(/[\s-]/g,"");if(!/^\d{16}$/.test(d))return 0;let t=0;for(let i=0;i<16;i++){let n=+d[15-i];if(i%2){n*=2;if(n>9)n-=9}t+=n}return t%10==0};
const okExp=s=>{const m=s.trim().match(/^(0[1-9]|1[0-2])\/?(\d{2})$/);if(!m)return 0;const y=2000+ +m[2],mo=+m[1],n=new Date();return y>n.getFullYear()||(y==n.getFullYear()&&mo>=n.getMonth()+1)};
const claim=e=>{["orders","tickets","enroll"].forEach(k=>A[k].forEach(o=>{if(!o.user&&o.email==e)o.user=e}));saveA()};
const cap=s=>s.trim().replace(/(^|[ '’-])(\p{L})/gu,(m,a,b)=>a+b.toUpperCase());
function showEr(el,msg){const d=document.createElement("div");d.className="er";d.textContent=msg;el.insertAdjacentElement("afterend",d)}
function chk(f,rules){let ok=1;f.querySelectorAll(".er").forEach(x=>x.remove());for(const r of rules){const el=f.elements[r[0]];if(el&&!r[1](el.value)){ok=0;showEr(el,r[2])}}return ok}
const mN=["Unesite ispravno ime (samo slova, najmanje 2)","Unesite ispravno prezime (samo slova, najmanje 2)"],mE="Unesite ispravnu email adresu (npr. ime@gmail.com)",mT="Unesite ispravan broj telefona (npr. 0641234567 ili +381641234567)";
const V=(f,n)=>f.elements[n].value.trim();
const FORMS={
up(f){if(!chk(f,[["n",okName,mN[0]],["p",okName,mN[1]],["t",okTel,mT],["g",s=>/^\d{1,2}$/.test(s.trim())&&+s>=5&&+s<=18,"Godine: broj od 5 do 18"],["e",okEmail,mE]]))return;
A.enroll.push({user:em(),ime:cap(V(f,"n")),prezime:cap(V(f,"p")),tel:V(f,"t"),godine:V(f,"g"),email:V(f,"e").toLowerCase(),date:new Date().toISOString()});saveA();done="up";render()},
kup(f){if(!chk(f,[["n",okFull,"Unesite ispravno ime i prezime (npr. Marko Jovanović)"],["e",okEmail,mE],["t",okTel,mT],["a",okAdr,"Unesite ispravnu adresu (ulica i broj)"],["g",okGrad,"Unesite grad i poštanski broj od 5 cifara (npr. Niš, 18000)"]].concat(f.elements.pl.value=="Kartica"?[["cn",okCard,"Unesite ispravan broj kartice (16 cifara)"],["cm",okFull,"Unesite ime kao što piše na kartici"],["ce",okExp,"Unesite važeći datum isteka (MM/GG)"],["cc",s=>/^\d{3,4}$/.test(s.trim()),"CVV ima 3 ili 4 cifre"]]:[])))return;
const i=f.dataset.i,p=D.products[i];if(!p||!p.stock)return;const sz=sel[i]||p.sizes.split(",")[0];
A.orders.push({user:em(),proizvod:p.name,velicina:sz,cena:p.price,placanje:f.elements.pl.value,kartica:f.elements.pl.value=="Kartica"?f.elements.cn.value.replace(/\D/g,"").slice(-4):"",ime:cap(V(f,"n")),email:V(f,"e").toLowerCase(),tel:V(f,"t"),adresa:V(f,"a"),grad:cap(V(f,"g")),date:new Date().toISOString()});
p.stock--;save();saveA();done="kup";render()},
tk(f){if(!chk(f,[["n",okName,mN[0]],["p",okName,mN[1]],["e",okEmail,mE],["t",okTel,mT],["q",s=>/^\d{1,2}$/.test(s.trim())&&+s>=1&&+s<=10,"Broj ulaznica: od 1 do 10"]]))return;
const q=+V(f,"q");A.tickets.push({user:em(),utakmica:f.elements.m.value,qty:q,total:q*500,ime:cap(V(f,"n")),prezime:cap(V(f,"p")),email:V(f,"e").toLowerCase(),tel:V(f,"t"),date:new Date().toISOString()});saveA();done="tk";render()},
sign(f){if(!chk(f,[["n",okName,mN[0]],["p",okName,mN[1]],["e",okEmail,mE],["t",okTel,mT],["l",s=>s.length>=6,"Lozinka mora imati najmanje 6 znakova"],["l2",s=>s.length>0&&s==f.elements.l.value,"Lozinke se ne poklapaju"]]))return;
const e=V(f,"e").toLowerCase();if(e==ADM||A.users.some(u=>u.email==e)){showEr(f.elements.e,"Nalog sa ovim emailom već postoji");return}
A.users.push({ime:cap(V(f,"n")),prezime:cap(V(f,"p")),email:e,tel:V(f,"t"),pass:hs(f.elements.l.value)});claim(e);try{localStorage.setItem("kkr_u",e)}catch(x){}render()},
login(f){if(!chk(f,[["e",okEmail,mE],["l",s=>s.length>0,"Unesite lozinku"]]))return;
const e=V(f,"e").toLowerCase(),l=f.elements.l.value;
if((e==ADM&&l=="admin")||A.users.some(u=>u.email==e&&u.pass==hs(l))){claim(e);try{localStorage.setItem("kkr_u",e)}catch(x){}render()}else showEr(f.elements.l,"Pogrešan email ili lozinka")}};
/* POMOĆNE FUNKCIJE: logo, ilustracije hale/igrača/novosti, datumi, sledeća utakmica */
const LG=s=>`<svg width="${s}" height="${s}" viewBox="0 0 40 40" fill="none" stroke="#FF4D4D" stroke-width="2.4"><circle cx="20" cy="20" r="15"/><path d="M5 20h30M20 5v30M9 9c8 6 8 16 0 22M31 9c-8 6-8 16 0 22"/></svg>`;
const sv=b=>`<svg viewBox="0 0 300 170" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${b}</svg>`;
const HI=[sv(`<rect width="300" height="170" fill="#16181D"/>`+[0,1,2,3,4,5].map(r=>`<rect y="${30+r*22}" width="300" height="18" fill="${r%2?"#7a2227":"#b3202c"}"/>`+Array.from({length:14},(_,c)=>`<circle cx="${12+c*21+(r%2)*8}" cy="${28+r*22}" r="5" fill="#ffb3a8" opacity=".75"/>`).join("")).join("")),sv(`<rect width="300" height="170" fill="#c98b4e"/><g fill="none" stroke="#fff" stroke-width="2"><rect x="15" y="15" width="270" height="140"/><path d="M150 15v140"/><circle cx="150" cy="85" r="22"/><rect x="15" y="55" width="50" height="60"/><rect x="235" y="55" width="50" height="60"/><path d="M15 30a60 60 0 0 1 0 110M285 30a60 60 0 0 0 0 110"/></g>`),sv(`<rect width="300" height="170" fill="#1b1e26"/><rect x="40" y="40" width="220" height="130" fill="#2a2d36"/><rect x="40" y="40" width="220" height="22" fill="#FF4D4D"/><text x="150" y="56" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">HALA ČAIR</text><rect x="115" y="90" width="70" height="80" fill="#0B0C10"/><path d="M150 90v80" stroke="#FF4D4D" stroke-width="2"/><rect x="60" y="85" width="40" height="40" fill="#3a3e49"/><rect x="200" y="85" width="40" height="40" fill="#3a3e49"/>`)];
const AV=(p,k)=>{if(p.img)return `<img src="${p.img}" alt="" style="width:100%;height:100%;object-fit:cover">`;const w=b=>`<svg viewBox="0 0 200 250" width="100%" height="100%">${b}</svg>`;
if(k=="products"){const c=p.cat=="Majice"?"#3a3e49":"#FF4D4D";return p.cat=="Dodaci"?w(`<circle cx="100" cy="125" r="70" fill="#d9622b"/><path d="M30 125h140M100 55v140M52 75c28 30 28 70 0 100M148 75c-28 30-28 70 0 100" stroke="#2a120a" stroke-width="4" fill="none"/>`):w(`<path d="M60 50l-40 30 20 30 20-12v122h100V98l20 12 20-30-40-30c-10 14-20 20-40 20s-30-6-40-20z" fill="${c}"/><text x="100" y="130" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">RADNIČKI</text><text x="100" y="170" text-anchor="middle" font-size="36" font-weight="800" fill="#fff">1945</text>`)}
const pl=k=="players";return w(`<circle cx="100" cy="82" r="38" fill="#d9a88a"/><path d="M62 74c0-34 76-34 76 0c-12-16-64-16-76 0z" fill="#2a1a14"/><path d="M20 250c0-60 30-100 80-100s80 40 80 100z" fill="${pl?"#FF4D4D":"#2d313b"}"/>`+(pl?`<text x="100" y="222" text-anchor="middle" font-size="40" font-weight="800" fill="#fff">${p.num}</text>`:`<path d="M82 152l18 30 18-30z" fill="#eee"/><path d="M96 170h8l4 50-8 8-8-8z" fill="#FF4D4D"/>`))};
const NS=i=>{const s=b=>`<svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="320" height="180" fill="#2a1519"/>${b}</svg>`,t=(x,y)=>`<text x="160" y="${y}" text-anchor="middle" font-size="15" font-weight="800" fill="#ffb3a8">${x}</text>`;
return [s(`<circle cx="160" cy="76" r="46" fill="#FF4D4D"/><path d="M114 76h92M160 30v92M130 44c20 20 20 52 0 64M190 44c-20 20-20 52 0 64" stroke="#0B0C10" stroke-width="4" fill="none"/>`+t("POBEDA U DERBIJU",160)),s([70,160,250].map(x=>`<circle cx="${x}" cy="62" r="20" fill="#d9a88a"/><path d="M${x-32} 135c0-40 20-50 32-50s32 10 32 50z" fill="#FF4D4D"/>`).join("")+t("ŠKOLA KOŠARKE",160)),s(`<path d="M120 22l-40 24 16 26 14-8v70h100V64l14 8 16-26-40-24c-8 10-16 14-30 14s-22-4-30-14z" fill="#FF4D4D"/>`+t("NOVA KOLEKCIJA",166))][i%3]};
const bg=n=>`<span class="bg">${esc(n.replace("KK ","").slice(0,2).toUpperCase())}</span>`;
const dt=(m,o)=>new Date(m.d+"T19:30").toLocaleDateString("sr-Latn-RS",o||{weekday:"short",day:"numeric",month:"short"});
const ini=n=>n.split(" ").map(x=>x[0]).join("");
const nextM=()=>D.matches.find(m=>new Date(m.d+"T19:30")>new Date())||D.matches[D.matches.length-1];
/* PRIKAZ UTAKMICE: logoi klubova, pozicija u ligi, ikonica domaćin/gost */
const mrow=m=>`<div class="mr" data-go="utakmica-${D.matches.indexOf(m)}" style="cursor:pointer"><span>${dt(m)} • 19:30</span><div class="tm">${m.h?LG(30)+" Radnički":bg(m.o)+" "+m.o}</div><b>VS</b><div class="tm">${m.h?bg(m.o)+" "+m.o:LG(30)+" Radnički"}</div><span class="pos">${m.pos}</span><span class="ha ${m.h?"h":"a"}">${m.h?"🏠 Domaćin":"🚌 Gost"}</span></div>`;
/* NAVBAR: Početna, Škola košarke, Lista igrača, Lista trenera, Kalendar utakmica, Shop + dugme Kupi ulaznice, korpa, admin */
const links=[["pocetna","Početna"],["skola","Škola košarke"],["igraci","Lista igrača"],["treneri","Lista trenera"],["kalendar","Kalendar utakmica"],["shop","Shop"]];
const tpg=()=>page.split("-")[0];
function nav(){const t=tpg(),t2={igrac:"igraci",trener:"treneri",artikal:"shop",vest:"pocetna",utakmica:"kalendar"}[t]||t,u=me(),NL=isAdmin()?links.concat([["admin","Admin panel"]]):links,oc=A.orders.filter(mine).length;
$("#nv").innerHTML=`<div class="lg" data-go="pocetna">${LG(40)}<div>RADNIČKI<small>NIŠ • 1945</small></div></div><div class="l">${NL.map(l=>`<a data-go="${l[0]}" class="${t2==l[0]?"on":""}">${l[1]}</a>`).join("")}</div><button class="btn" data-tk="1">Kupi ulaznice</button><button class="ic" data-go="nalog" title="Moje porudžbine">🛍${oc?`<i>${oc}</i>`:""}</button><button class="ic us" data-go="nalog" title="${u?esc(u.email):"Prijava / registracija"}">${u?esc((u.ime||"A")[0].toUpperCase()):"👤"}</button><button class="ic hb" data-hb="1" title="Meni">☰</button>`}
/* FOOTER: društvene mreže, sponzori, kontakt, logo */
function foot(){$("#ft").innerHTML=`<div><div class="lg">${LG(36)}<div>RADNIČKI<small>NIŠ • 1945</small></div></div><p>Ponos Čaira od 1945.</p></div><div><h4>Društvene mreže</h4><a>Instagram</a><a>Facebook</a><a>YouTube</a><a>TikTok</a></div><div><h4>Sponzori</h4><span class="sp">NIŠ-TEL</span><span class="sp">GRAD NIŠ</span><span class="sp">ČAIR-SPORT</span><span class="sp">NS-BANK</span></div><div><h4>Kontakt</h4>Hala SC Čair, Niš<br>+381 18 000 000<br>info@kkradnicki.rs</div>`}
/* KUPOVINA ULAZNICA: forma i izbor utakmice */
function tkm(){if(!tk)return"";const hm=D.matches.filter(m=>m.h&&new Date(m.d+"T19:30")>new Date()),L=hm.length?hm:D.matches.filter(m=>m.h);return `<div class="mdl"><form data-f="tk" novalidate><h3 style="margin-top:0">Kupovina ulaznica</h3>${done=="tk"?`<div class="ok2">✔ Ulaznice su sačuvane. ${me()?"Vidite ih na stranici Moj nalog.":"Niste prijavljeni, ali su sačuvane na ovom računaru i vidite ih na stranici Moj nalog."} Hvala!</div><br><button type="button" class="btn" data-go="nalog">Moj nalog</button> <button type="button" class="btn g" data-xt="1">Zatvori</button>`:`<label>Utakmica</label><select name="m">${L.map(m=>`<option>Radnički vs ${m.o} — ${dt(m)}, 19:30 • Hala SC Čair</option>`).join("")}</select>${[["n","Ime","text",pre("ime")],["p","Prezime","text",pre("prezime")],["e","Email","email",pre("email")],["t","Broj telefona","tel",pre("tel")]].map(f=>`<label>${f[1]}</label><input required type="${f[2]}" name="${f[0]}" value="${f[3]}">`).join("")}<label>Broj ulaznica</label><input type="number" min="1" max="10" value="1" name="q"><p style="color:var(--mu)">Cena: 500 RSD po ulaznici</p><button class="btn">Kupi</button> <button type="button" class="btn g" data-xt="1">Otkaži</button>`}</form></div>`}
/* ZAJEDNIČKO: cena i odbrojavanje */
const price=p=>p.price.toLocaleString("sr-Latn-RS")+" RSD";
function cdt(){const e=$("#cd");if(!e)return;let s=Math.max(0,(new Date(nextM().d+"T19:30")-new Date())/1000|0);const v=[s/86400|0,s/3600%24|0,s/60%60|0],l=["DANA","SATI","MIN"];e.innerHTML=v.map((x,i)=>`<div>${String(x).padStart(2,"0")}<small>${l[i]}</small></div>`).join("")}
/* PRIKAZ I PRELAZAK NA DRUGE STRANICE (svaka stranica je u svom folderu) */
function render(){const[t,i]=page.split("-");const R={nalog:nalog};
$("#mn").innerHTML=(R[t]||R.nalog)()+tkm();nav();foot();cdt()}
function go(t){const a=t.split("-"),b=a[1];try{localStorage.setItem("kkr_s",JSON.stringify({sel}))}catch(e){}location.href="../"+a[0]+"/index.html"+(b!==undefined?"?id="+b:"")}
/* NALOG: prijava, registracija, moj nalog (porudžbine, ulaznice, prijave), odjava */
let ntab="in";
const tbl=(h,rows)=>rows.length?`<div style="overflow-x:auto"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`:`<p style="color:var(--mu)">Još nema unosa.</p>`;
const inp=f=>`<label>${f[1]}</label><input required type="${f[2]}" name="${f[0]}">`;
const lists=()=>`<h2>Moje porudžbine</h2>${tbl(["Artikal","Veličina","Cena (RSD)","Plaćanje","Datum"],A.orders.filter(mine).map(o=>[o.proizvod,o.velicina,o.cena,o.placanje+(o.kartica?" (**** "+o.kartica+")":""),fd(o.date)]))}
<h2>Moje ulaznice</h2>${tbl(["Utakmica","Broj ulaznica","Ukupno (RSD)","Datum"],A.tickets.filter(mine).map(o=>[o.utakmica,o.qty,o.total,fd(o.date)]))}
<h2>Moje prijave u školu košarke</h2>${tbl(["Ime i prezime","Godine","Email","Datum"],A.enroll.filter(mine).map(o=>[o.ime+" "+o.prezime,o.godine,o.email,fd(o.date)]))}`;
function nalog(){const u=me();
if(!u)return `<h2>Nalog</h2><div class="card fm" style="margin:0 auto"><div style="display:flex;gap:8px"><button class="btn ${ntab=="in"?"":"g"}" data-nt="in">Prijava</button><button class="btn ${ntab=="sg"?"":"g"}" data-nt="sg">Registracija</button></div>${ntab=="in"?`<form data-f="login" novalidate>${[["e","Email","email"],["l","Lozinka","password"]].map(inp).join("")}<br><button class="btn">Prijavi se</button></form>`:`<form data-f="sign" novalidate>${[["n","Ime","text"],["p","Prezime","text"],["e","Email","email"],["t","Broj telefona","tel"],["l","Lozinka (najmanje 6 znakova)","password"],["l2","Ponovite lozinku","password"]].map(inp).join("")}<br><button class="btn">Napravi nalog</button></form>`}</div>`+(A.orders.some(mine)||A.tickets.some(mine)||A.enroll.some(mine)?`<p style="color:var(--mu);margin-top:28px">Sačuvano na ovom računaru bez naloga. Kada se prijavite ili registrujete sa istim emailom, ovi unosi postaju deo vašeg naloga.</p>`+lists():"");
return `<h2>Moj nalog</h2><div class="card fm"><h3 style="margin-top:0">${esc(u.ime)} ${esc(u.prezime)}</h3><div class="r"><span>Email</span><b>${esc(u.email)}</b></div>${u.tel?`<div class="r"><span>Telefon</span><b>${esc(u.tel)}</b></div>`:""}<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">${u.admin?`<button class="btn" data-go="admin">Admin panel</button>`:""}<button class="btn g" data-logout="1">Odjavi se</button></div></div>`+lists()}
/* DOGAĐAJI: skrolovanje redova mišem, klikovi, slanje formi */
let drag=0,sx,sl,rw;
document.addEventListener("mousedown",e=>{rw=e.target.closest(".rw");if(rw){drag=1;sx=e.pageX;sl=rw.scrollLeft;rw._m=0}});
document.addEventListener("mousemove",e=>{if(drag&&rw){const d=e.pageX-sx;if(Math.abs(d)>5)rw._m=1;rw.scrollLeft=sl-d}});
document.addEventListener("mouseup",()=>{drag=0});
document.addEventListener("click",e=>{const t=e.target,r=t.closest(".rw");if(r&&r._m){r._m=0;e.preventDefault();return}
const q=a=>t.closest("["+a+"]");let x;
if(x=q("data-add")){const i=x.dataset.add;go("artikal-"+i);return}
if(x=t.closest("[data-sz]")){const c=t.closest(".pc");sel[c.dataset.i]=x.dataset.sz;c.classList.add("ok");c.querySelectorAll(".sb").forEach(b=>b.classList.toggle("on",b==x));return}
if(x=q("data-ps")){sel[x.dataset.i]=x.dataset.ps;render();return}
if(q("data-hb")){$("#nv .l").classList.toggle("open");return}
if(x=q("data-nt")){ntab=x.dataset.nt;render();return}
if(q("data-logout")){try{localStorage.removeItem("kkr_u")}catch(e){}go("pocetna");return}
if(q("data-tk")){tk=1;done="";render();return}
if(q("data-xt")){tk=0;done="";render();return}
if(x=q("data-go")){go(x.dataset.go);return}
if(x=q("data-m")){mo[1]+=+x.dataset.m;if(mo[1]<0){mo[1]=11;mo[0]--}if(mo[1]>11){mo[1]=0;mo[0]++}render();return}
if(x=q("data-ad")){adm=x.dataset.ad;ed=null;render();return}
if(x=q("data-ed")){ed=+x.dataset.ed;render();return}
if(x=q("data-del")){if(D[adm]){D[adm].splice(+x.dataset.del,1);save()}else{A[adm].splice(+x.dataset.del,1);saveA()}render();return}
if(q("data-x")){ed=null;render()}});
document.addEventListener("change",e=>{if(e.target.name=="pl"){const k=$(".kf");if(k)k.style.display=e.target.value=="Kartica"?"block":"none"}});
document.addEventListener("submit",e=>{e.preventDefault();const f=e.target.dataset.f;
if(f=="ed"){const o={},fl=e.target.elements._f.files[0];new FormData(e.target).forEach((v,k)=>{if(k!="_f")o[k]=["price","stock","num","titles","years"].includes(k)?+v:v});
const fin=()=>{ed<0?D[adm].push(o):Object.assign(D[adm][ed],o);ed=null;save();render()};
if(!fl){fin();return}
const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,480/im.width),c=document.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);o.img=c.toDataURL("image/jpeg",.8);fin()};im.src=r.result};r.readAsDataURL(fl);return}
if(FORMS[f]){FORMS[f](e.target);return}
done=f;render()});
/* START: Nalog (prijava i registracija) */
try{const s=JSON.parse(localStorage.getItem("kkr_s")||"{}");sel=s.sel||{}}catch(e){}
setInterval(cdt,30000);
const _id=new URLSearchParams(location.search).get("id");
page="nalog";
render();
