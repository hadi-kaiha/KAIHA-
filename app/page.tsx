"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const P=[
{id:1,n:"Silk Blazer",pr:189,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Denim Jacket",pr:120,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"},
{id:4,n:"Evening Dress",pr:320,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
{id:5,n:"Hoodie Unisex",pr:89,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
{id:6,n:"Lipstick Set",pr:45,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"},
{id:7,n:"Face Cream",pr:35,cat:"BEAUTY",sub:"SKIN",im:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400"},
{id:8,n:"Sofa Luxury",pr:599,cat:"HOME",sub:"LIVING",im:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"},
];
export default function Home(){
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);
const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);
const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);
const [form,setForm]=useState({name:"",gmail:"",phone:""});const [otp,setOtp]=useState("");
const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);
const [q,setQ]=useState("");const [mainCat,setMainCat]=useState("FASHION");
const [subCat,setSubCat]=useState("MALE");const [coins,setCoins]=useState(120);
const [isBlackCard,setIsBlackCard]=useState(false);const [wish,setWish]=useState<any[]>([]);
const [showBell,setShowBell]=useState(false);const [showProfile,setShowProfile]=useState(false);
const [userRole,setUserRole]=useState("Customer");
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");if(s)setUser(JSON.parse(s));else setShowLogin(true);
const c=localStorage.getItem("kaiha_coins");if(c)setCoins(Number(c));
const b=localStorage.getItem("kaiha_black");if(b)setIsBlackCard(b==="1");
const w=localStorage.getItem("kaiha_wish");if(w)setWish(JSON.parse(w));
},[]);
const saveCoins=(n:number)=>{setCoins(n);localStorage.setItem("kaiha_coins",n.toString());};
const sendOtp=async()=>{if(!form.name||!form.gmail)return alert("fill all");setLoading(true);
const {error}=await supabase.auth.signInWithOtp({email:form.gmail,options:{data:{full_name:form.name}}});
setLoading(false);if(error)return alert(error.message);setStep(2);};
const verifyOtp=async()=>{setLoading(true);
const {error}=await supabase.auth.verifyOtp({email:form.gmail,token:otp,type:'email'});
setLoading(false);if(error)return alert(error.message);
const u={...form,id:Date.now()};const n=[...accounts,u];setAccounts(n);
localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));
setUser(u);setShowLogin(false);saveCoins(coins+20);};
const add=(p:any)=>{setCart(c=>[...c,{...p,aid:Date.now()}]);saveCoins(coins+5);};
const toggleWish=(p:any)=>{const ex=wish.find((x:any)=>x.id===p.id);
const nw=ex?wish.filter((x:any)=>x.id!==p.id):[...wish,p];setWish(nw);
localStorage.setItem("kaiha_wish",JSON.stringify(nw));};
const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);const PKR=(d:number)=>`Rs. ${(d*280).toLocaleString()}`;
const filtered=P.filter(p=>{if(q)return p.n.toLowerCase().includes(q.toLowerCase());
if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;return p.cat===mainCat;});
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes kaihaIn{0%{max-width:0;opacity:0}100%{max-width:135px;opacity:1}}
@keyframes slideMenu{from{transform:translateX(100%)}to{transform:translateX(0)}}
.page{animation:fadeUp 0.45s ease}.kaihaOnce{animation:kaihaIn 0.9s forwards;display:inline-block;overflow:hidden;white-space:nowrap;max-width:0;opacity:0}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
  {/* HEADER - PERFECT 3 LINES - SCREENSHOT WALA - NO BOX */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",backdropFilter:"blur(12px)",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} alt="K" style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/>
<span className={pg==="home"?"kaihaOnce":""} style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px",fontFamily:"Montserrat"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center",cursor:"pointer"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"all 0.3s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1,transition:"all 0.25s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"all 0.3s ease"}}></span>
</button></div>

{/* MENU - COIN + BELL + BLACK CARD INSIDE - HEADER CLEAN */}
{mn&&<div style={{position:"fixed",inset:0,zIndex:99,display:"flex",justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)"}} onClick={()=>setMn(false)}/>
<div style={{position:"relative",width:"78%",background:"#0E0E0E",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",animation:"slideMenu 0.3s ease",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={LOGO} style={{height:"40px",width:"40px",borderRadius:"10px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"13px"}}>KAIHA MENU</span></div>
<button onClick={()=>setMn(false)} style={{width:"32px",height:"32px",border:"1px solid #D4B78F44",borderRadius:"999px",background:"none",color:"#D4B78F"}}>X</button></div>
<div style={{marginTop:"18px",background:"#121212",border:"1px solid #D4B78F22",borderRadius:"14px",padding:"14px",display:"flex",gap:"12px",alignItems:"center"}}>
<div style={{width:"38px",height:"38px",borderRadius:"999px",background:"linear-gradient(135deg,#D4B78F,#9C7A4A)",display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontWeight:"900"}}>K</div>
<div><div style={{fontSize:"13px",fontWeight:"800",color:"#D4B78F"}}>{coins} Coins</div><div style={{fontSize:"9px",color:"#777"}}>+5 order +20 refer</div></div>
<button onClick={()=>saveCoins(coins+20)} style={{marginLeft:"auto",background:"#D4B78F",color:"#000",border:"none",borderRadius:"999px",padding:"7px 12px",fontSize:"10px",fontWeight:"800"}}>+20</button></div>
<button onClick={()=>{setShowBell(true);setMn(false)}} style={{width:"100%",marginTop:"10px",background:"#141414",border:"1px solid #222",borderRadius:"12px",padding:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{display:"flex",gap:"10px",alignItems:"center",fontSize:"12px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4B78F" strokeWidth="1.6"><path d="M6 9a6 6 0 0 1 12 0c0 7 6 7 6 11H0c0-4 6-4 6-11"/><path d="M9 21a3 3 0 0 0 6 0"/></svg> Notifications</span><span style={{background:"#ff3040",color:"#fff",fontSize:"9px",padding:"3px 8px",borderRadius:"999px"}}>3</span></button>
<button onClick={()=>{setShowProfile(true);setMn(false)}} style={{width:"100%",marginTop:"10px",background:"linear-gradient(135deg,#0A0A0A,#1A1A1A)",border:"1px solid #D4B78F33",borderRadius:"12px",padding:"14px",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"12px",color:"#D4B78F"}}>Black Card {isBlackCard?"ON":"OFF"}</span><span style={{fontSize:"10px",color:"#666"}}>10% OFF</span></button>
<div style={{marginTop:"10px",background:"#111",border:"1px solid #222",borderRadius:"12px",padding:"12px"}}><div style={{fontSize:"10px",color:"#D4B78F"}}>ROLE</div><div style={{display:"flex",gap:"6px",marginTop:"8px"}}>{["Customer","Seller","Rider"].map(r=><button key={r} onClick={()=>setUserRole(r)} style={{background:userRole===r?"#D4B78F":"#1E1E1E",color:userRole===r?"#000":"#777",border:"none",borderRadius:"999px",padding:"7px 12px",fontSize:"9px"}}>{r}</button>)}</div></div>
{[{l:"Home",v:"home"},{l:"Shop",v:"shop"},{l:"KAIHA TV - Reels",v:"reels"},{l:"Bag",v:"bag"},{l:"Profile",v:"profile"}].map((it)=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}} style={{padding:"14px",borderRadius:"10px",background:pg===it.v?"#1a1a1a":"transparent",border:"1px solid #222",marginTop:"10px",color:pg===it.v?"#D4B78F":"#ccc"}}>{it.l}</div>)}</div></div>}

{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/>{q&&<span onClick={()=>setQ("")} style={{color:"#888"}}>X</span>}</div></div>
<div onClick={()=>setPg("shop")} style={{margin:"12px 16px",borderRadius:"14px",height:"155px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222"}}><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"60%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 60%,transparent)"}}/><div style={{position:"relative",padding:"16px",width:"65%"}}><div style={{color:"#D4B78F",fontSize:"9px",letterSpacing:"0.2em"}}>NEW ARRIVALS</div><div style={{fontSize:"22px",fontFamily:"serif",marginTop:"4px"}}>Fall Collection 2026</div><button style={{marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"8px 14px",borderRadius:"999px",fontSize:"9px",fontWeight:"800"}}>SHOP NOW →</button></div></div>
  <div style={{display:"flex",gap:"10px",padding:"6px 16px 10px",overflowX:"auto"}}>
{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>setMainCat(c)} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #2a241b",borderRadius:"999px",padding:"10px 18px",fontSize:"11px",fontWeight:"700"}}>{c}</button>)}</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"8px",padding:"0 16px 14px",overflowX:"auto"}}>
{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>setSubCat(s)} style={{background:subCat===s?"#fff":"#111",color:subCat===s?"#000":"#aaa",border:"1px solid #222",borderRadius:"999px",padding:"8px 14px",fontSize:"10px"}}>{s}</button>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>
{filtered.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}>
<div style={{position:"relative"}}><img src={p.im} style={{width:"100%",height:"120px",borderRadius:"8px",objectFit:"cover"}}/>
<button onClick={()=>toggleWish(p)} style={{position:"absolute",bottom:"6px",left:"6px",background:"rgba(0,0,0,0.7)",border:"none",color:wish.find((x:any)=>x.id===p.id)?"#ff3040":"#fff",borderRadius:"999px",padding:"4px 8px",fontSize:"10px"}}>{wish.find((x:any)=>x.id===p.id)?"♥":"♡"}</button></div>
<div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)} {isBlackCard&&<span style={{color:"#4CAF50",fontSize:"8px"}}>-10%</span>}</div>
<button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",border:"1px solid #D4B78F88",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"7px",fontSize:"9px"}}>ADD TO BAG</button></div>)}</div></div>}

{pg==="shop"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>Shop - {mainCat} {mainCat==="FASHION"?`- ${subCat}`:""}</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px"}}>Back</span></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"12px"}}>
{filtered.map(p=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"110px",borderRadius:"8px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div><div style={{fontSize:"9px",color:"#D4B78F"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",background:"#D4B78F",border:"none",borderRadius:"999px",padding:"6px",fontSize:"9px"}}>ADD</button></div>)}</div></div>}

{pg==="reels"&&<div className="page" style={{height:"70vh",overflowY:"scroll",scrollSnapType:"y mandatory"}}>
{P.map((p:any)=><div key={p.id} style={{height:"65vh",scrollSnapAlign:"start",position:"relative",margin:"8px 12px",borderRadius:"18px",overflow:"hidden",background:"#111"}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",bottom:"20px",left:"18px"}}><b>{p.n}</b><div style={{color:"#D4B78F",fontSize:"12px"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{marginTop:"8px",background:"#fff",color:"#000",border:"none",padding:"8px 16px",borderRadius:"999px",fontSize:"11px",fontWeight:"700"}}>Add to Bag</button></div></div>)}</div>}

{pg==="bag"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>Bag ({cart.length}) {PKR(tot)}</b><span style={{fontSize:"10px",color:"#D4B78F"}}>{isBlackCard?"Black Card 10% ON":""}</span></div>
{cart.length===0?<div style={{color:"#888",marginTop:"30px",textAlign:"center"}}>Your bag is empty</div>:
cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",marginTop:"10px",border:"1px solid #222"}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px",objectFit:"cover"}}/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(c.pr)}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>X</button></div>)}
</div>}

{pg==="profile"&&<div className="page" style={{padding:"18px"}}>
<div style={{textAlign:"center"}}><div style={{width:"64px",height:"64px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"1px solid #D4B78F44"}}>{user?.name?.[0]||"H"}</div><div style={{marginTop:"8px",fontWeight:"700"}}>{user?.name||"Guest"}</div><div style={{color:"#888",fontSize:"10px"}}>{user?.gmail||"Login required"}</div>
<div style={{marginTop:"8px",display:"flex",gap:"8px",justifyContent:"center",alignItems:"center"}}><div style={{width:"18px",height:"18px",borderRadius:"999px",background:"#D4B78F",display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontWeight:"900",fontSize:"10px"}}>K</div><span style={{fontSize:"11px",color:"#D4B78F"}}>{coins} Coins</span><span style={{fontSize:"9px",color:"#666"}}>| {userRole}</span></div></div>
<div style={{display:"flex",gap:"8px",marginTop:"16px"}}><button onClick={()=>{setShowLogin(true);setStep(1)}} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>+ ADD ACCOUNT</button><button onClick={()=>{localStorage.removeItem("kaiha_user");setUser(null);setShowLogin(true)}} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>Logout</button></div></div>}

{showBell&&<div style={{position:"fixed",inset:0,zIndex:900,display:"flex",justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}} onClick={()=>setShowBell(false)}/>
<div style={{position:"relative",width:"86%",background:"#121212",height:"100%",padding:"20px",borderLeft:"1px solid #D4B78F22"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"13px"}}>Notifications</b><button onClick={()=>setShowBell(false)} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:"999px",padding:"5px 12px"}}>X</button></div>
<div style={{marginTop:"16px",display:"flex",flexDirection:"column",gap:"10px"}}>
<div style={{background:"#1A1A1A",borderRadius:"10px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"11px"}}>Black Card 10% OFF Active</div></div>
<div style={{background:"#1A1A1A",borderRadius:"10px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"11px"}}>Coins +20 Refer Success</div></div></div></div></div>}

{showProfile&&<div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",padding:"18px"}}>
<div style={{background:"#141414",borderRadius:"20px",padding:"20px",width:"100%",maxWidth:"350px",border:"1px solid #D4B78F33"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"13px"}}>Black Card</b><button onClick={()=>setShowProfile(false)} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"30px",height:"30px"}}>X</button></div>
<div style={{marginTop:"16px",background:"radial-gradient(ellipse at top left,#1E1E1E,#000)",border:"1px solid #D4B78F33",borderRadius:"16px",padding:"18px",position:"relative",height:"190px",overflow:"hidden"}}>
<div style={{position:"absolute",top:"14px",right:"14px",width:"44px",height:"30px",background:"linear-gradient(135deg,#D4B78F,#9C7A4A)",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"7px",color:"#000",fontWeight:"800"}}>CHIP</div>
<div style={{fontSize:"48px",fontWeight:"900",color:"#7B4FFF",letterSpacing:"-2px",marginTop:"22px",fontFamily:"serif"}}>K</div>
<div style={{position:"absolute",bottom:"38px",left:"50%",transform:"translateX(-50%)",color:"#D4B78F",fontSize:"10px",letterSpacing:"0.3em"}}>BLACK CARD</div>
<div style={{position:"absolute",bottom:"12px",left:"18px",right:"18px",display:"flex",justifyContent:"space-between",fontSize:"8px",color:"#666"}}><span>{user?.name||"HADI"}</span><span>{isBlackCard?"ACTIVE 10% OFF":"TAP"}</span></div>
<div onClick={()=>{setIsBlackCard(!isBlackCard);localStorage.setItem("kaiha_black",!isBlackCard?"1":"0")}} style={{position:"absolute",inset:0,cursor:"pointer"}}/></div></div></div>}

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Home</div>
<div onClick={()=>setPg("shop")} style={{color:pg==="shop"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Shop</div>
<div onClick={()=>setPg("reels")} style={{color:pg==="reels"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Reels</div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Bag {cart.length>0?`(${cart.length})`:""}</div>
<div onClick={()=>setPg("profile")} style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Profile</div></div>

{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",maxWidth:"320px",border:"1px solid #D4B78F44"}}>{step===1?<><div style={{textAlign:"center",color:"#D4B78F",letterSpacing:"0.3em",fontSize:"12px"}}>KAIHA SECURE</div>
<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/>
<input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail for OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/>
<button onClick={sendOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button></>:
<><div style={{textAlign:"center",color:"#D4B78F"}}>Enter OTP</div>
<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" maxLength={6} style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center",letterSpacing:"0.3em"}}/>
<button onClick={verifyOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>VERIFY</button>
<button onClick={()=>setStep(1)} style={{width:"100%",marginTop:"8px",background:"none",border:"1px solid #333",color:"#888",padding:"9px",borderRadius:"999px"}}>Back</button></>}</div></div>}

</div></div>
);
                                            }
