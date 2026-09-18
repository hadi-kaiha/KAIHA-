"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
"https://rlsmcomxugstuoerdam.supabase.co",
"sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const PKR=(d:number)=>`Rs. ${(d*280).toLocaleString()}`;
const ALL=[
{id:1,n:"Silk Blazer",pr:189,cat:"FASHION",sub:"MALE",
brand:"KAIHA GENZ",
im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,cat:"FASHION",sub:"FEMALE",
brand:"KAIHA WOMAN",
im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Male T-Shirt",pr:45,cat:"FASHION",sub:"MALE",
brand:"KAIHA GENZ",
im:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
{id:4,n:"Male Cap",pr:25,cat:"FASHION",sub:"MALE",
im:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"},
{id:5,n:"Male Slippers",pr:35,cat:"FASHION",sub:"MALE",
im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:6,n:"Men Perfume",pr:85,cat:"FASHION",sub:"MALE",
im:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"},
{id:7,n:"Pants",pr:65,cat:"FASHION",sub:"MALE",
im:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
{id:8,n:"Shorts",pr:40,cat:"FASHION",sub:"MALE",
im:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400"},
{id:9,n:"Female Top",pr:55,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
{id:10,n:"Bra",pr:30,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1620799139507-715043871744?w=400"},
{id:11,n:"Inner Wear",pr:28,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400"},
{id:12,n:"Earrings",pr:40,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"},
{id:13,n:"Chain",pr:70,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"},
{id:14,n:"Bracelet",pr:35,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"},
{id:15,n:"Sandals",pr:50,cat:"FASHION",sub:"FEMALE",
im:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"},
{id:16,n:"Boy T-Shirt",pr:25,cat:"FASHION",sub:"BOY",
im:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400"},
{id:17,n:"Boy Jeans",pr:40,cat:"FASHION",sub:"BOY",
im:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"},
{id:18,n:"Girl Dress",pr:45,cat:"FASHION",sub:"GIRL",
im:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"},
{id:19,n:"Girl Top",pr:30,cat:"FASHION",sub:"GIRL",
im:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400"},
{id:20,n:"Hoodie Unisex",pr:89,cat:"FASHION",sub:"UNISEX",
im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
{id:21,n:"Sneakers Unisex",pr:120,cat:"FASHION",sub:"UNISEX",
im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:22,n:"Lipstick",pr:25,cat:"BEAUTY",sub:"MAKEUP",
im:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"},
{id:23,n:"Makeup Kit",pr:95,cat:"BEAUTY",sub:"MAKEUP",
im:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"},
{id:24,n:"Foundation",pr:40,cat:"BEAUTY",sub:"MAKEUP",
im:"https://images.unsplash.com/photo-1557205465-f3768edea7d6?w=400"},
{id:25,n:"Decor Lamp",pr:75,cat:"HOME",sub:"DECOR",
im:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"},
{id:26,n:"Vase Decor",pr:55,cat:"HOME",sub:"DECOR",
im:"https://images.unsplash.com/photo-1578500351865-d6c3706f46a4?w=400"},
{id:27,n:"Wall Art",pr:65,cat:"HOME",sub:"DECOR",
im:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400"},
];
const REELS=[
{id:1,shop:"Hadi Luxury",likes:234,
im:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
desc:"New Fall Drop",role:"Seller"},
{id:2,shop:"Sukkur Fashion",likes:189,
im:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
desc:"Luxury Blazer",role:"Rider"},
{id:3,shop:"KAIHA Official",likes:542,
im:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
desc:"Evening Collection",role:"Customer"},
];
export default function Home(){
const [pg,setPg]=useState("home");
const [mn,setMn]=useState(false);
const [cart,setCart]=useState<any[]>([]);
const [user,setUser]=useState<any>(null);
const [accounts,setAccounts]=useState<any[]>([]);
const [showLogin,setShowLogin]=useState(false);
const [form,setForm]=useState({name:"",gmail:"",phone:""});
const [otp,setOtp]=useState("");
const [step,setStep]=useState(1);
const [loading,setLoading]=useState(false);
const [mainCat,setMainCat]=useState("FASHION");
const [subCat,setSubCat]=useState("MALE");
const [q,setQ]=useState("");
const [sellerProds,setSellerProds]=useState<any[]>([]);
const [reels,setReels]=useState<any[]>(REELS);
const [wish,setWish]=useState<any[]>([]);
const [coins,setCoins]=useState(120);
const [isBlackCard,setIsBlackCard]=useState(false);
const [showBell,setShowBell]=useState(false);
const [showProfile,setShowProfile]=useState(false);
const [selSize,setSelSize]=useState("M");
const [selColor,setSelColor]=useState("Black");
const [userRole,setUserRole]=useState("Customer");
const [voice,setVoice]=useState(false);
const [comment,setComment]=useState("");
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");
if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");
if(s)setUser(JSON.parse(s));
else setShowLogin(true);
const sp=localStorage.getItem("kaiha_all_products");
if(sp){const p=JSON.parse(sp);
setSellerProds(p.filter((x:any)=>x.isOpen!==false));}
const c=localStorage.getItem("kaiha_coins");
if(c)setCoins(Number(c));
const b=localStorage.getItem("kaiha_black");
if(b)setIsBlackCard(b==="1");
const w=localStorage.getItem("kaiha_wish");
if(w)setWish(JSON.parse(w));
const rl=localStorage.getItem("kaiha_reels");
if(rl)setReels(JSON.parse(rl));
},[]);
const saveCoins=(n:number)=>{
setCoins(n);
localStorage.setItem("kaiha_coins",n.toString());};
const requireLogin=(fn:any)=>{
if(!user){setShowLogin(true);setStep(1);return;}fn();};
const sendOtp=async()=>{
if(!form.name||!form.gmail)return alert("fill all");
setLoading(true);
const lo=Math.floor(100000+Math.random()*900000).toString();
localStorage.setItem("kaiha_local_otp",lo);
setLoading(false);setStep(2);
alert("OTP: "+lo+" or 123456");};
const verifyOtp=async()=>{
const lo=localStorage.getItem("kaiha_local_otp");
if(otp===lo||otp==="123456"){
const u={...form,id:Date.now()};
const n=[...accounts,u];setAccounts(n);
localStorage.setItem("kaiha_acc",JSON.stringify(n));
localStorage.setItem("kaiha_user",JSON.stringify(u));
setUser(u);setShowLogin(false);
saveCoins(coins+20);return;
}else alert("Wrong OTP");};
const add=(p:any)=>requireLogin(()=>{
setCart(c=>[...c,{...p,aid:Date.now(),
size:selSize,color:selColor,qty:1}]);saveCoins(coins+5);});
const updateQty=(aid:number,d:number)=>{
setCart(c=>c.map(i=>i.aid===aid?
{...i,qty:Math.max(1,(i.qty||1)+d)}:i));};
const toggleWish=(p:any)=>{
const ex=wish.find((x:any)=>x.id===p.id);
const nw=ex?wish.filter((x:any)=>x.id!==p.id):[...wish,p];
setWish(nw);
localStorage.setItem("kaiha_wish",JSON.stringify(nw));};
const likeReel=(id:number)=>{
setReels(reels.map(r=>r.id===id?{...r,likes:r.likes+1}:r));};
const allProducts=[...ALL,...sellerProds];
const filtered=allProducts.filter(p=>{
if(q)return p.n.toLowerCase().includes(q.toLowerCase());
if(p.shopCat&&p.shopCat!==mainCat)return false;
if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;
return p.cat===mainCat;});
const tot=cart.reduce((s:any,i:any)=>s+i.pr*(i.qty||1),0);
const discount=isBlackCard?Math.floor(tot*0.1):0;
const finalTot=tot-discount;
return(<div style={{background:"#000",display:"flex",
justifyContent:"center",minHeight:"100vh"}}>
<style>{`.page{animation:fadeUp 0.4s ease}
@keyframes fadeUp{from{opacity:0;
transform:translateY(12px)}to{opacity:1;
transform:translateY(0)}}`}</style>

<div style={{background:"#0a0a0a",width:"100%",
maxWidth:"390px",minHeight:"100vh",
paddingBottom:"90px",position:"relative",
borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",
justifyContent:"space-between",alignItems:"center",
padding:"10px 18px",borderBottom:"1px solid #1a1a1a",
position:"sticky",top:0,
background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div onClick={()=>setPg("home")}
style={{display:"flex",alignItems:"center",gap:"10px"}}>
<img src={LOGO} style={{height:"64px",width:"64px",
objectFit:"contain",borderRadius:"12px"}}/>
<span style={{color:"#D4B78F",
letterSpacing:"0.35em",fontSize:"18px",
fontWeight:"300"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)}
style={{background:"#1A1A1A",
border:"1px solid #D4B78F44",borderRadius:"8px",
width:"38px",height:"34px",display:"flex",
flexDirection:"column",gap:"4px",
justifyContent:"center",alignItems:"center"}}>
<span style={{width:"18px",height:"2px",
background:"#D4B78F"}}></span>
<span style={{width:"18px",height:"2px",
background:"#D4B78F"}}></span>
<span style={{width:"18px",height:"2px",
background:"#D4B78F"}}></span></button></div>
  {mn&&<div style={{position:"fixed",inset:0,zIndex:999,
display:"flex",justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,
background:"rgba(0,0,0,0.75)"}}
onClick={()=>setMn(false)}/>
<div style={{position:"relative",width:"80%",
background:"#0E0E0E",height:"100%",padding:"20px",
borderLeft:"1px solid #D4B78F22",overflowY:"auto"}}>
<div style={{display:"flex",
justifyContent:"space-between",alignItems:"center"}}>
<span style={{color:"#D4B78F",fontWeight:"700",
fontSize:"13px",letterSpacing:"0.1em"}}>KAIHA MENU</span>
<button onClick={()=>setMn(false)}
style={{width:"30px",height:"30px",border:"1px solid #333",
borderRadius:"999px",background:"none",color:"#D4B78F"}}>X</button></div>

<div style={{marginTop:"18px",background:"#121212",
border:"1px solid #D4B78F22",borderRadius:"14px",
padding:"14px",display:"flex",gap:"12px",
alignItems:"center"}}>
<div style={{width:"38px",height:"38px",
borderRadius:"999px",
background:"linear-gradient(135deg,#D4B78F,#9C7A4A)",
display:"flex",alignItems:"center",justifyContent:"center",
color:"#000",fontWeight:"900",fontSize:"18px"}}>K</div>
<div><div style={{fontSize:"13px",fontWeight:"800",
color:"#D4B78F"}}>{coins} Coins</div>
<div style={{fontSize:"9px",color:"#777"}}>+5 order, +20 refer</div></div>
<button onClick={()=>saveCoins(coins+20)}
style={{marginLeft:"auto",background:"#D4B78F",
color:"#000",border:"none",borderRadius:"999px",
padding:"7px 12px",fontSize:"10px",fontWeight:"800"}}>+20</button></div>

<button onClick={()=>{setShowBell(true);setMn(false)}}
style={{width:"100%",marginTop:"10px",background:"#141414",
border:"1px solid #222",borderRadius:"12px",padding:"14px",
display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{display:"flex",gap:"10px",alignItems:"center",
fontSize:"12px"}}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
stroke="#D4B78F" strokeWidth="1.6">
<path d="M6 9a6 6 0 0 1 12 0c0 7 6 7 6 11H0c0-4 6-4 6-11"/>
<path d="M9 21a3 3 0 0 0 6 0"/></svg>
Notifications</span>
<span style={{background:"#ff3040",color:"#fff",
fontSize:"9px",padding:"3px 8px",borderRadius:"999px"}}>3</span></button>

<button onClick={()=>{setPg("wishlist");setMn(false)}}
style={{width:"100%",marginTop:"10px",background:"#141414",
border:"1px solid #222",borderRadius:"12px",padding:"14px",
display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:"12px"}}>Wishlist ({wish.length})</span>
<span style={{color:"#666",fontSize:"10px"}}>
{wish.length>0?"Active":"Empty"}</span></button>

<button onClick={()=>{setShowProfile(true);setMn(false)}}
style={{width:"100%",marginTop:"10px",
background:"linear-gradient(135deg,#0A0A0A,#1A1A1A)",
border:"1px solid #D4B78F33",borderRadius:"12px",padding:"14px",
display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:"12px",color:"#D4B78F"}}>
Black Card {isBlackCard?"ON":"OFF"}</span>
<span style={{fontSize:"10px",color:"#666"}}>10% OFF</span></button>

<div style={{marginTop:"12px",background:"#111",
border:"1px solid #222",borderRadius:"12px",padding:"12px"}}>
<div style={{fontSize:"10px",color:"#D4B78F"}}>ROLE</div>
<div style={{display:"flex",gap:"6px",marginTop:"8px"}}>
{["Customer","Seller","Rider"].map(r=><button key={r}
onClick={()=>setUserRole(r)}
style={{background:userRole===r?"#D4B78F":"#1E1E1E",
color:userRole===r?"#000":"#777",border:"none",
borderRadius:"999px",padding:"7px 12px",
fontSize:"9px",fontWeight:"700"}}>{r}</button>)}</div></div>

<div style={{marginTop:"14px"}}>
{[{l:"Home",v:"home"},{l:"Shop - All",v:"category"},
{l:"KAIHA TV",v:"reels"},{l:"Bag",v:"bag"}].map((it:any)=>
<div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}}
style={{padding:"14px",borderRadius:"10px",
border:"1px solid #1E1E1E",marginTop:"8px",
color:pg===it.v?"#D4B78F":"#999",fontSize:"12px",
background:pg===it.v?"#141414":"transparent"}}>{it.l}</div>)}</div>

<div style={{marginTop:"14px",display:"flex",gap:"8px"}}>
<a href="https://wa.me/923000000000" target="_blank"
style={{flex:1,background:"#25D366",color:"#fff",
borderRadius:"999px",padding:"10px",textAlign:"center",
fontSize:"11px",fontWeight:"700",textDecoration:"none"}}>
WhatsApp</a>
<button onClick={()=>{navigator.clipboard.writeText(
"kaiha.vercel.app/?ref="+user?.name);saveCoins(coins+20)}}
style={{flex:1,background:"#1E1E1E",
border:"1px solid #D4B78F33",
color:"#D4B78F",borderRadius:"999px",padding:"10px",
fontSize:"11px",fontWeight:"700"}}>Refer +20</button></div>
</div></div>}

{showBell&&<div style={{position:"fixed",inset:0,zIndex:900,
display:"flex",justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,
background:"rgba(0,0,0,0.55)"}}
onClick={()=>setShowBell(false)}/>
<div style={{position:"relative",width:"86%",
background:"#121212",height:"100%",padding:"20px",
borderLeft:"1px solid #D4B78F22"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b style={{color:"#D4B78F",fontSize:"13px"}}>Notifications</b>
<button onClick={()=>setShowBell(false)}
style={{background:"none",border:"1px solid #333",
color:"#888",borderRadius:"999px",padding:"5px 12px"}}>X</button></div>
<div style={{marginTop:"16px",display:"flex",
flexDirection:"column",gap:"10px"}}>
<div style={{background:"#1A1A1A",borderRadius:"10px",
padding:"12px",border:"1px solid #222"}}>
<div style={{fontSize:"11px"}}>Black Card 10% OFF Active</div></div>
<div style={{background:"#1A1A1A",borderRadius:"10px",
padding:"12px",border:"1px solid #222"}}>
<div style={{fontSize:"11px"}}>Coins +20 Refer Success</div></div>
</div></div></div>}

{showProfile&&<div style={{position:"fixed",inset:0,zIndex:900,
background:"rgba(0,0,0,0.88)",display:"flex",
alignItems:"center",justifyContent:"center",padding:"18px"}}>
<div style={{background:"#141414",borderRadius:"20px",
padding:"20px",width:"100%",maxWidth:"350px",
border:"1px solid #D4B78F33"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b style={{color:"#D4B78F",fontSize:"13px"}}>Black Card</b>
<button onClick={()=>setShowProfile(false)}
style={{border:"1px solid #333",background:"none",
color:"#888",borderRadius:"999px",width:"30px",height:"30px"}}>X</button></div>
<div style={{marginTop:"16px",
background:"radial-gradient(ellipse at top left,#1E1E1E,#000)",
border:"1px solid #D4B78F33",borderRadius:"16px",padding:"18px",
position:"relative",height:"190px",overflow:"hidden"}}>
<div style={{position:"absolute",top:"14px",right:"14px",
width:"44px",height:"30px",
background:"linear-gradient(135deg,#D4B78F,#9C7A4A)",
borderRadius:"4px",display:"flex",alignItems:"center",
justifyContent:"center",fontSize:"7px",color:"#000",
fontWeight:"800"}}>CHIP</div>
<div style={{fontSize:"48px",fontWeight:"900",color:"#7B4FFF",
letterSpacing:"-2px",marginTop:"22px",fontFamily:"serif"}}>K</div>
<div style={{position:"absolute",bottom:"38px",left:"50%",
transform:"translateX(-50%)",color:"#D4B78F",fontSize:"10px",
letterSpacing:"0.3em",fontWeight:"600"}}>BLACK CARD</div>
<div style={{position:"absolute",bottom:"12px",left:"18px",
right:"18px",display:"flex",justifyContent:"space-between",
fontSize:"8px",color:"#666"}}>
<span>{user?.name||"HADI"}</span>
<span>{isBlackCard?"ACTIVE 10% OFF":"TAP TO ACTIVATE"}</span></div>
<div onClick={()=>{setIsBlackCard(!isBlackCard);
localStorage.setItem("kaiha_black",!isBlackCard?"1":"0")}}
style={{position:"absolute",inset:0,cursor:"pointer"}}/></div>
</div></div>}

{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}>
<div style={{background:"#141414",borderRadius:"12px",
height:"44px",display:"flex",alignItems:"center",
padding:"0 14px",gap:"10px",border:"1px solid #D4B78F44"}}>
<input value={q} onChange={e=>setQ(e.target.value)}
placeholder="Search luxury..."
style={{background:"transparent",border:"none",
outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/>
<button onClick={()=>setVoice(!voice)}
style={{background:voice?"#D4B78F":"#222",border:"none",
borderRadius:"999px",width:"32px",height:"32px"}}>V</button>
{q&&<button onClick={()=>setQ("")}
style={{background:"none",border:"none",color:"#666"}}>X</button>}</div></div>
<div onClick={()=>setPg("category")}
style={{margin:"14px 16px",borderRadius:"22px",height:"185px",
position:"relative",overflow:"hidden",background:"#111",
border:"1px solid #222"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
style={{position:"absolute",right:0,top:0,width:"58%",
height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,
background:"linear-gradient(90deg,#0a0a0a 70%,transparent)"}}/>
<div style={{position:"relative",padding:"20px 22px",width:"60%",
height:"100%",display:"flex",flexDirection:"column",
justifyContent:"center"}}>
<div style={{color:"#D4B78F",fontSize:"10px",
letterSpacing:"0.35em",fontWeight:"700"}}>NEW ARRIVALS</div>
<div style={{fontSize:"26px",fontFamily:"serif",
marginTop:"6px",lineHeight:"1.1"}}>Fall Collection<br/>2026</div>
<div style={{marginTop:"14px"}}>
<button style={{background:"#D4B78F",color:"#000",
border:"none",padding:"9px 18px",borderRadius:"999px",
fontSize:"10px",fontWeight:"800"}}>SHOP NOW</button></div></div></div>
<div style={{display:"flex",gap:"8px",
padding:"8px 16px",overflowX:"auto"}}>
{["FASHION","BEAUTY","HOME"].map(c=><button key={c}
onClick={()=>{setMainCat(c);setPg("category")}}
style={{background:mainCat===c?"#D4B78F":"#141414",
color:mainCat===c?"#000":"#fff",border:"1px solid #D4B78F33",
borderRadius:"999px",padding:"9px 18px",fontSize:"10px",
fontWeight:"800",whiteSpace:"nowrap"}}>{c}</button>)}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
gap:"12px",padding:"0 16px 16px"}}>
{filtered.slice(0,6).map((p:any)=><div key={p.id}
style={{background:"#141414",borderRadius:"18px",
padding:"8px",border:"1px solid #222"}}>
<div style={{position:"relative",aspectRatio:"3/4",
overflow:"hidden",borderRadius:"14px",background:"#0a0a0a"}}>
<img src={p.im} style={{width:"100%",height:"100%",
objectFit:"cover",objectPosition:"top"}}/>
<div style={{position:"absolute",top:"7px",left:"7px",
background:"#D4B78F",color:"#000",fontSize:"7px",
padding:"4px 8px",borderRadius:"999px",fontWeight:"800"}}>
{p.brand||p.sub}</div>
<button onClick={()=>toggleWish(p)}
style={{position:"absolute",bottom:"6px",left:"6px",
background:"rgba(0,0,0,0.75)",border:"none",
color:wish.find((x:any)=>x.id===p.id)?"#ff3040":"#fff",
borderRadius:"999px",padding:"5px 8px",fontSize:"12px"}}>
{wish.find((x:any)=>x.id===p.id)?"♥":"♡"}</button></div>
<div style={{fontSize:"12px",marginTop:"10px",
fontWeight:"700"}}>{p.n}</div>
<div style={{display:"flex",gap:"5px",marginTop:"7px"}}>
{["S","M","L","XL"].map(sz=><button key={sz}
onClick={()=>setSelSize(sz)}
style={{background:selSize===sz?"#D4B78F":"#1E1E1E",
color:selSize===sz?"#000":"#777",border:"1px solid #2A2A2A",
borderRadius:"6px",padding:"4px 7px",fontSize:"8px"}}>{sz}</button>)}</div>
<div style={{fontSize:"11px",color:"#D4B78F",
marginTop:"7px"}}>{PKR(p.pr)}</div>
<button onClick={()=>add(p)}
style={{width:"100%",marginTop:"9px",
border:"1px solid #D4B78F66",background:"none",
color:"#D4B78F",borderRadius:"999px",padding:"10px",
fontSize:"10px",fontWeight:"700"}}>ADD {selSize} {selColor}</button>
</div>)}</div></div>
  {pg==="category"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b>{mainCat} {mainCat==="FASHION"?`- ${subCat}`:""} ({filtered.length})</b>
<span onClick={()=>setPg("home")}
style={{color:"#D4B78F",fontSize:"12px"}}>Back</span></div>
<div style={{display:"flex",gap:"8px",marginTop:"14px",
overflowX:"auto"}}>
{["FASHION","BEAUTY","HOME"].map(c=><button key={c}
onClick={()=>setMainCat(c)}
style={{background:mainCat===c?"#D4B78F":"#141414",
color:mainCat===c?"#000":"#fff",border:"1px solid #333",
borderRadius:"999px",padding:"8px 16px",
fontSize:"10px",fontWeight:"700"}}>{c}</button>)}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
gap:"12px",marginTop:"16px"}}>
{filtered.map((p:any)=><div key={p.id}
style={{background:"#141414",borderRadius:"18px",
padding:"8px",border:"1px solid #222"}}>
<div style={{position:"relative",aspectRatio:"3/4",
borderRadius:"12px",overflow:"hidden",background:"#0a0a0a"}}>
<img src={p.im} style={{width:"100%",height:"100%",
objectFit:"cover",objectPosition:"top"}}/>
<button onClick={()=>toggleWish(p)}
style={{position:"absolute",bottom:"6px",left:"6px",
background:"rgba(0,0,0,0.7)",border:"none",
color:wish.find((x:any)=>x.id===p.id)?"#ff3040":"#fff",
borderRadius:"999px",padding:"4px 8px",fontSize:"10px"}}>
{wish.find((x:any)=>x.id===p.id)?"♥":"♡"}</button></div>
<div style={{fontSize:"11px",marginTop:"8px",
fontWeight:"700"}}>{p.n}</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)}</div>
<button onClick={()=>add(p)}
style={{width:"100%",marginTop:"8px",background:"#D4B78F",
border:"none",borderRadius:"999px",padding:"8px",
fontSize:"10px",fontWeight:"800"}}>ADD TO BAG</button></div>)}</div></div>}

{pg==="reels"&&<div className="page" style={{padding:"0"}}>
<div style={{padding:"12px 16px",display:"flex",
justifyContent:"space-between",alignItems:"center"}}>
<b style={{color:"#D4B78F",fontSize:"18px"}}>KAIHA TV</b>
<label style={{background:"#D4B78F",color:"#000",
borderRadius:"999px",padding:"8px 14px",fontSize:"10px",
fontWeight:"800"}}> + UPLOAD REEL
<input type="file" accept="image/*,video/*"
style={{display:"none"}}
onChange={(e:any)=>{const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=()=>{
const newReel={id:Date.now(),shop:user?.name||"You",
likes:0,im:r.result as string,desc:"My New Reel",
role:userRole};const upd=[newReel,...reels];setReels(upd);
localStorage.setItem("kaiha_reels",JSON.stringify(upd));
saveCoins(coins+10);};r.readAsDataURL(f);}}/></label></div>
<div style={{height:"72vh",overflowY:"scroll",
scrollSnapType:"y mandatory",padding:"0 8px"}}>
{reels.map((reel:any)=><div key={reel.id}
style={{height:"68vh",scrollSnapAlign:"start",
position:"relative",margin:"8px 6px",
borderRadius:"20px",overflow:"hidden",background:"#111"}}>
<img src={reel.im} style={{width:"100%",height:"100%",
objectFit:"cover"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,
background:"linear-gradient(transparent,rgba(0,0,0,0.9))",
padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontWeight:"800",fontSize:"13px"}}>
@{reel.shop} - {reel.role}</div>
<div style={{fontSize:"11px",marginTop:"4px"}}>{reel.desc}</div></div>
<button onClick={()=>likeReel(reel.id)}
style={{background:"rgba(255,255,255,0.15)",border:"none",
borderRadius:"999px",width:"44px",height:"44px",
color:"#fff"}}>♥ {reel.likes}</button></div></div></div>)}
</div></div>}

{pg==="bag"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b>Bag ({cart.reduce((s:any,i:any)=>s+(i.qty||1),0)}) {PKR(finalTot)}</b>
<span style={{fontSize:"10px",color:"#D4B78F"}}>
{isBlackCard?"Black Card 10% ON":""}</span></div>
{cart.length===0?<div style={{color:"#888",marginTop:"30px",
textAlign:"center"}}>Your bag is empty</div>:
cart.map((c:any)=><div key={c.aid}
style={{background:"#141414",borderRadius:"12px",
padding:"12px",display:"flex",gap:"12px",marginTop:"10px",
border:"1px solid #222"}}>
<img src={c.im} style={{width:"54px",height:"54px",
borderRadius:"10px",objectFit:"cover"}}/>
<div style={{flex:1}}>
<div style={{fontSize:"12px"}}>{c.n}</div>
<div style={{fontSize:"9px",color:"#777"}}>
Size:{c.size} | Color:{c.color} | Qty:{c.qty}</div>
<div style={{display:"flex",gap:"6px",marginTop:"6px"}}>
<button onClick={()=>updateQty(c.aid,-1)}
style={{background:"#222",border:"1px solid #333",
color:"#fff",borderRadius:"6px",padding:"4px 8px"}}>-</button>
<span style={{fontSize:"11px",padding:"4px"}}>{c.qty}</span>
<button onClick={()=>updateQty(c.aid,1)}
style={{background:"#D4B78F",border:"none",color:"#000",
borderRadius:"6px",padding:"4px 8px"}}>+</button>
</div></div>
<button onClick={()=>setCart(cart.filter((x:any)=>x.aid!==c.aid))}
style={{border:"1px solid #333",background:"none",color:"#888",
borderRadius:"999px",width:"28px",height:"28px"}}>X</button></div>)}
{cart.length>0&&<div style={{marginTop:"16px",background:"#111",
border:"1px solid #D4B78F33",borderRadius:"12px",padding:"12px"}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:"12px"}}>
<span>Subtotal</span><span>{PKR(tot)}</span></div>
{isBlackCard&&<div style={{display:"flex",justifyContent:"space-between",
fontSize:"12px",color:"#4CAF50",marginTop:"4px"}}>
<span>Black Card -10%</span><span>-{PKR(discount)}</span></div>}
<div style={{display:"flex",justifyContent:"space-between",
fontSize:"14px",fontWeight:"800",color:"#D4B78F",marginTop:"8px",
borderTop:"1px solid #222",paddingTop:"8px"}}>
<span>Total</span><span>{PKR(finalTot)}</span></div>
<button style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",
border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>
CHECKOUT {PKR(finalTot)}</button>
</div>}</div>}

{pg==="wishlist"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
<b>Wishlist ({wish.length})</b>
<span onClick={()=>setPg("home")}
style={{color:"#D4B78F",fontSize:"12px"}}>Back</span></div>
{wish.length===0?<div style={{color:"#666",marginTop:"30px",
textAlign:"center"}}>No items</div>:
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
gap:"12px",marginTop:"14px"}}>
{wish.map((p:any)=><div key={p.id}
style={{background:"#141414",borderRadius:"14px",
padding:"8px",border:"1px solid #222"}}>
<img src={p.im} style={{width:"100%",height:"120px",
borderRadius:"10px",objectFit:"cover"}}/>
<div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)}</div>
<button onClick={()=>add(p)}
style={{width:"100%",marginTop:"6px",background:"#D4B78F",
border:"none",borderRadius:"999px",padding:"7px",
fontSize:"9px"}}>ADD TO BAG</button>
<button onClick={()=>toggleWish(p)}
style={{width:"100%",marginTop:"6px",background:"none",
border:"1px solid #ff444433",color:"#ff4444",
borderRadius:"999px",padding:"6px",fontSize:"9px"}}>Remove</button>
</div>)}</div>}</div>}

{pg==="profile"&&<div className="page" style={{padding:"18px"}}>
<div style={{textAlign:"center"}}>
<div style={{width:"64px",height:"64px",borderRadius:"999px",
background:"#222",margin:"0 auto",display:"flex",
alignItems:"center",justifyContent:"center",fontSize:"22px",
border:"1px solid #D4B78F44"}}>{user?.name?.[0]||"H"}</div>
<div style={{marginTop:"8px",fontWeight:"700"}}>{user?.name||"Guest"}</div>
<div style={{color:"#888",fontSize:"10px"}}>{user?.gmail||""}</div>
<div style={{marginTop:"8px",display:"flex",gap:"8px",
justifyContent:"center",alignItems:"center"}}>
<div style={{width:"18px",height:"18px",borderRadius:"999px",
background:"#D4B78F",display:"flex",alignItems:"center",
justifyContent:"center",color:"#000",fontWeight:"900",
fontSize:"10px"}}>K</div>
<span style={{fontSize:"11px",color:"#D4B78F"}}>{coins} Coins</span>
<span style={{fontSize:"9px",color:"#666"}}>| {userRole}</span></div></div>
<div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
<button onClick={()=>{setShowLogin(true);setStep(1)}}
style={{flex:1,background:"#D4B78F",color:"#000",border:"none",
padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>
+ ADD ACCOUNT</button>
<button onClick={()=>{localStorage.removeItem("kaiha_user");
setUser(null);setShowLogin(true)}}
style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",
padding:"10px",borderRadius:"999px",fontSize:"11px"}}>Logout</button></div>
</div>}

<div style={{position:"fixed",bottom:0,left:"50%",
transform:"translateX(-50%)",width:"100%",maxWidth:"390px",
background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",
borderRadius:"24px 24px 0 0",display:"flex",
justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")}
style={{color:pg==="home"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Home</div>
<div onClick={()=>setPg("category")}
style={{color:pg==="category"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Shop</div>
<div onClick={()=>setPg("reels")}
style={{color:pg==="reels"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Reels</div>
<div onClick={()=>setPg("bag")}
style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Bag {cart.length>0?`(${cart.reduce((s:any,i:any)=>s+(i.qty||1),0)})`:""}</div>
<div onClick={()=>setPg("profile")}
style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Profile</div></div>

{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,
background:"rgba(0,0,0,0.92)",display:"flex",
alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"16px",
padding:"18px",width:"100%",maxWidth:"320px",
border:"1px solid #D4B78F44"}}>
{step===1?<><div style={{textAlign:"center",color:"#D4B78F",
letterSpacing:"0.3em",fontSize:"12px"}}>KAIHA SECURE</div>
<input value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
placeholder="Full Name"
style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",
borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/>
<input value={form.gmail}
onChange={e=>setForm({...form,gmail:e.target.value})}
placeholder="Gmail"
style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",
borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/>
<button onClick={sendOtp} disabled={loading}
style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",
border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>
{loading?"SENDING...":"SEND OTP"}</button></>:
<><div style={{textAlign:"center",color:"#D4B78F"}}>
OTP: {typeof window!=="undefined"?
localStorage.getItem("kaiha_local_otp")||"123456":""}</div>
<input value={otp} onChange={e=>setOtp(e.target.value)}
placeholder="6-digit OTP" maxLength={6}
style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",
borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",
textAlign:"center",letterSpacing:"0.3em"}}/>
<button onClick={verifyOtp} disabled={loading}
style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",
border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>
VERIFY +20</button>
<button onClick={()=>setStep(1)}
style={{width:"100%",marginTop:"8px",background:"none",
border:"1px solid #333",color:"#888",padding:"9px",
borderRadius:"999px"}}>Back</button></>}</div></div>}

</div></div>
);
  }
