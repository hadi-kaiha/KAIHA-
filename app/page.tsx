"use client";
import {useState,useEffect} from "react";
import { createClient } from 
"@supabase/supabase-js";
const supabase = createClient(
"https://rlsmcomxugstuoerdam.supabase.co",
"sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122"
);
const LOGO="/k-logo.png";
const PKR=(d:number)=>`Rs. ${(d*280)
.toLocaleString()}`;
const ALL=[
{id:1,n:"Silk Blazer",pr:189,
cat:"FASHION",sub:"MALE",
brand:"KAIHA GENZ",
im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,
cat:"FASHION",sub:"FEMALE",
brand:"KAIHA WOMAN",
im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"T-Shirt",pr:45,
cat:"FASHION",sub:"MALE",
brand:"KAIHA GENZ",
im:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
];
const REELS=[
{id:1,shop:"Hadi Luxury",likes:234,
im:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
desc:"New Fall Drop",role:"Seller"},
{id:2,shop:"Sukkur Fashion",likes:189,
im:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
desc:"Luxury Blazer",role:"Rider"},
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
const [rotate,setRotate]=useState(false);
const [userRole,setUserRole]=useState("Customer");
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");
if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");
if(s)setUser(JSON.parse(s));
else setShowLogin(true);
const sp=localStorage.getItem("kaiha_all_products");
if(sp){
const parsed=JSON.parse(sp);
const live=parsed.filter((p:any)=>
p.isOpen!==false);
setSellerProds(live);
}
},[]);
const requireLogin=(fn:any)=>{
if(!user){setShowLogin(true);setStep(1);return;}
fn();
};
const sendOtp=async()=>{
if(!form.name||!form.gmail)
return alert("fill all");
setLoading(true);
const localOtp=Math.floor(100000+
Math.random()*900000).toString();
localStorage.setItem("kaiha_local_otp",localOtp);
setLoading(false);setStep(2);
alert("OTP: "+localOtp+" or 123456");
};
const verifyOtp=async()=>{
const localOtp=localStorage.getItem("kaiha_local_otp");
if(otp===localOtp||otp==="123456"){
const u={...form,id:Date.now()};
const n=[...accounts,u];
setAccounts(n);
localStorage.setItem("kaiha_acc",
JSON.stringify(n));
localStorage.setItem("kaiha_user",
JSON.stringify(u));
setUser(u);setShowLogin(false);return;
}else alert("Wrong OTP");
};
const add=(p:any)=>requireLogin(()=>{
const item={...p,aid:Date.now(),
size:selSize,color:selColor,qty:1};
setCart(c=>[...c,item]);
});
const updateQty=(aid:number,d:number)=>{
setCart(c=>c.map(i=>i.aid===aid?
{...i,qty:Math.max(1,(i.qty||1)+d)}:i));
};
const toggleWish=(p:any)=>{
const ex=wish.find((x:any)=>x.id===p.id);
const nw=ex?wish.filter((x:any)=>x.id!==p.id):
[...wish,p];
setWish(nw);
localStorage.setItem("kaiha_wish",
JSON.stringify(nw));
};
const tot=cart.reduce((s:any,i:any)=>
s+i.pr*(i.qty||1),0);
const discount=isBlackCard?
Math.floor(tot*0.1):0;
const finalTot=tot-discount;
return(<div style={{background:"#000",
display:"flex",justifyContent:"center",
minHeight:"100vh"}}>
  <div style={{background:"#0a0a0a",
width:"100%",maxWidth:"390px",
minHeight:"100vh",paddingBottom:"90px",
position:"relative",borderRadius:"28px",
overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",
justifyContent:"space-between",
alignItems:"center",padding:"10px 18px",
borderBottom:"1px solid #1a1a1a",
position:"sticky",top:0,
background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div onClick={()=>setPg("home")}
style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} style={{height:"72px",
width:"72px",objectFit:"contain",
borderRadius:"16px"}}/>
<span style={{color:"#D4B78F",
letterSpacing:"0.38em",fontSize:"19px"}}>
KAIHA</span></div>
<div style={{display:"flex",gap:"10px",
alignItems:"center"}}>
<div style={{background:"#111",
border:"1px solid #D4B78F44",
borderRadius:"999px",padding:"5px 10px",
fontSize:"10px",color:"#D4B78F"}}>
🪙 {coins}</div>
<button onClick={()=>setShowBell(!showBell)}
style={{background:"none",border:"none",
color:"#D4B78F",fontSize:"18px"}}>
🔔</button>
<button onClick={()=>setMn(!mn)}
style={{background:"#222",
border:"1px solid #D4B78F55",
borderRadius:"8px",display:"flex",
flexDirection:"column",gap:"5px",
width:"40px",height:"36px",
justifyContent:"center",alignItems:"center"}}>
<span style={{width:"20px",height:"2.5px",
background:"#D4B78F",display:"block"}}></span>
<span style={{width:"20px",height:"2.5px",
background:"#D4B78F",display:"block",
opacity:mn?0:1}}></span>
<span style={{width:"20px",height:"2.5px",
background:"#D4B78F",display:"block"}}></span>
</button></div></div>

{/* MENU */}
{mn&&<div style={{position:"fixed",inset:0,
zIndex:999,display:"flex",
justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,
background:"rgba(0,0,0,0.75)"}}
onClick={()=>setMn(false)}/>
<div style={{position:"relative",width:"78%",
background:"#0a0a0a",height:"100%",
padding:"18px"}}>
<div style={{display:"flex",
justifyContent:"space-between"}}>
<span style={{color:"#D4B78F",
fontWeight:"800"}}>KAIHA MENU</span>
<button onClick={()=>setMn(false)}
style={{width:"32px",height:"32px",
border:"1px solid #D4B78F44",
borderRadius:"999px",background:"none",
color:"#D4B78F"}}>✕</button></div>
{[{l:"Home",v:"home"},{l:"Shop",v:"category"},
{l:"KAIHA TV",v:"reels"},{l:"Bag",v:"bag"},
{l:"Wishlist",v:"wishlist"}].map((it:any)=>
<div key={it.l} onClick={()=>{setPg(it.v);
setMn(false)}}
style={{padding:"14px",borderRadius:"10px",
border:"1px solid #222",marginTop:"10px",
color:pg===it.v?"#D4B78F":"#ccc"}}>
{it.l}</div>)}</div></div>}

{/* FALL 185px SAME - FIXED */}
{pg==="home"&&<div>
<div style={{padding:"12px 16px"}}>
<div style={{background:"#141414",
borderRadius:"10px",height:"42px",
display:"flex",alignItems:"center",
padding:"0 14px",gap:"10px",
border:"1px solid #D4B78F55"}}>
<span style={{color:"#D4B78F"}}>⌕</span>
<input value={q}
onChange={e=>setQ(e.target.value)}
placeholder="Search luxury..."
style={{background:"transparent",
border:"none",outline:"none",
color:"#ccc",flex:1,fontSize:"12px"}}/>
</div></div>

<div style={{margin:"14px 16px",
borderRadius:"22px",height:"185px",
position:"relative",overflow:"hidden",
background:"#111",border:"1px solid #222"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
style={{position:"absolute",right:0,top:0,
width:"58%",height:"100%",
objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,
background:"linear-gradient(90deg,#0a0a0a 68%,transparent)"}}/>
<div style={{position:"relative",
padding:"18px 20px",width:"60%",
height:"100%",display:"flex",
flexDirection:"column",
justifyContent:"center"}}>
<div style={{color:"#D4B78F",fontSize:"10px",
letterSpacing:"0.35em",fontWeight:"700"}}>
NEW ARRIVALS</div>
<div style={{fontSize:"26px",
fontFamily:"serif",marginTop:"6px",
lineHeight:"1.1"}}>
Fall Collection<br/>2026</div>
<div style={{marginTop:"14px"}}>
<button style={{background:"#D4B78F",
color:"#000",border:"none",
padding:"9px 16px",borderRadius:"999px",
fontSize:"10px",fontWeight:"800"}}>
SHOP NOW →</button></div></div></div>
  <div style={{display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"12px",padding:"8px 16px 16px"}}>
{ALL.slice(0,6).map((p:any)=><div key={p.id}
style={{background:"#141414",
borderRadius:"18px",padding:"8px",
border:"1px solid #222"}}>
<div style={{position:"relative",
aspectRatio:"3/4",overflow:"hidden",
borderRadius:"14px",background:"#0a0a0a"}}>
<img src={p.im} style={{width:"100%",
height:"100%",objectFit:"cover",
objectPosition:"top"}}/>
<div style={{position:"absolute",top:"7px",
left:"7px",background:"#D4B78F",
color:"#000",fontSize:"7px",
padding:"4px 8px",borderRadius:"999px",
fontWeight:"800"}}>{p.brand}</div>
<button onClick={()=>toggleWish(p)}
style={{position:"absolute",bottom:"6px",
left:"6px",background:"rgba(0,0,0,0.7)",
border:"none",color:wish.find((x:any)=>
x.id===p.id)?"#ff3040":"#fff",
borderRadius:"999px",padding:"4px 8px"}}>
{wish.find((x:any)=>x.id===p.id)?"♥":"♡"}</button>
</div>
<div style={{fontSize:"12px",marginTop:"10px",
fontWeight:"700"}}>{p.n}</div>
<div style={{display:"flex",gap:"6px",
marginTop:"6px"}}>
{["S","M","L","XL"].map(sz=><button key={sz}
onClick={()=>setSelSize(sz)}
style={{background:selSize===sz?"#D4B78F":"#222",
color:selSize===sz?"#000":"#888",
border:"1px solid #333",borderRadius:"6px",
padding:"4px 7px",fontSize:"8px"}}>{sz}</button>)}
</div>
<div style={{display:"flex",gap:"6px",
marginTop:"6px"}}>
{[{c:"Black",v:"#000"},{c:"White",v:"#fff"},
{c:"Purple",v:"#7B4FFF"},
{c:"Beige",v:"#D4B78F"}].map(col=>
<div key={col.c}
onClick={()=>setSelColor(col.c)}
style={{width:"18px",height:"18px",
background:col.v,borderRadius:"999px",
border:selColor===col.c?
"2px solid #D4B78F":"1px solid #333"}}></div>)}
</div>
<div style={{fontSize:"11px",color:"#D4B78F",
marginTop:"6px"}}>{PKR(p.pr)}
{isBlackCard&&<span style={{color:"#4CAF50",
fontSize:"8px"}}> -10%</span>}</div>
<button onClick={()=>add(p)}
style={{width:"100%",marginTop:"8px",
border:"1px solid #D4B78F99",
background:"none",color:"#D4B78F",
borderRadius:"999px",padding:"10px",
fontSize:"10px",fontWeight:"700"}}>
ADD {selSize}/{selColor}</button>
</div>)}
</div></div>}

{/* BAG WITH QTY */}
{pg==="bag"&&<div style={{padding:"16px"}}>
<b>Bag ({cart.length}) - {PKR(tot)}
{isBlackCard?` → ${PKR(finalTot)}`:""}</b>
{cart.map((c:any)=><div key={c.aid}
style={{background:"#141414",
borderRadius:"12px",padding:"12px",
display:"flex",gap:"12px",marginTop:"10px",
border:"1px solid #222"}}>
<img src={c.im} style={{width:"54px",
height:"54px",borderRadius:"10px"}}/>
<div style={{flex:1}}>
<div style={{fontSize:"12px"}}>{c.n}</div>
<div style={{fontSize:"9px",color:"#888"}}>
Size:{c.size} | Color:{c.color} | Qty:{c.qty}
</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>
{PKR(c.pr)} x {c.qty}</div>
<div style={{display:"flex",gap:"6px",
marginTop:"6px"}}>
<button onClick={()=>updateQty(c.aid,-1)}
style={{background:"#222",border:"1px solid #333",
color:"#fff",borderRadius:"6px",
padding:"4px 8px"}}>-</button>
<span style={{fontSize:"11px",padding:"4px"}}>
{c.qty}</span>
<button onClick={()=>updateQty(c.aid,1)}
style={{background:"#D4B78F",border:"none",
color:"#000",borderRadius:"6px",
padding:"4px 8px",fontWeight:"800"}}>+</button>
</div></div></div>)}
<div style={{marginTop:"16px",background:"#111",
border:"1px solid #D4B78F33",
borderRadius:"12px",padding:"12px"}}>
<div style={{display:"flex",
justifyContent:"space-between",fontSize:"12px"}}>
<span>Subtotal</span><span>{PKR(tot)}</span></div>
{isBlackCard&&<div style={{display:"flex",
justifyContent:"space-between",fontSize:"12px",
color:"#4CAF50",marginTop:"4px"}}>
<span>Black Card -10%</span>
<span>-{PKR(discount)}</span></div>}
<div style={{display:"flex",
justifyContent:"space-between",fontSize:"14px",
fontWeight:"800",color:"#D4B78F",
marginTop:"8px",borderTop:"1px solid #222",
paddingTop:"8px"}}>
<span>Total (20)</span><span>{PKR(finalTot)}</span></div>
<button style={{width:"100%",marginTop:"12px",
background:"#D4B78F",color:"#000",
border:"none",padding:"12px",
borderRadius:"999px",fontWeight:"800"}}>
CHECKOUT + COD OTP + QR (61)</button>
</div></div>}

{/* BOTTOM NAV */}
<div style={{position:"fixed",bottom:0,
left:"50%",transform:"translateX(-50%)",
width:"100%",maxWidth:"390px",
background:"rgba(15,15,15,0.96)",
borderTop:"1px solid #222",
borderRadius:"24px 24px 0 0",
display:"flex",justifyContent:"space-around",
padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")}
style={{color:pg==="home"?"#D4B78F":"#6B6B6B"}}>
<span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("category")}
style={{color:pg==="category"?"#D4B78F":"#6B6B6B"}}>
<span style={{fontSize:"9px"}}>Shop</span></div>
<div onClick={()=>setPg("reels")}
style={{color:pg==="reels"?"#D4B78F":"#6B6B6B"}}>
<span style={{fontSize:"9px"}}>Reels</span></div>
<div onClick={()=>setPg("bag")}
style={{color:pg==="bag"?"#D4B78F":"#6B6B6B"}}>
<span style={{fontSize:"9px"}}>Bag ({cart.length})</span></div>
<div onClick={()=>setShowProfile(true)}
style={{color:"#6B6B6B"}}>
<span style={{fontSize:"9px"}}>Profile</span></div>
</div>

{showLogin&&<div style={{position:"fixed",inset:0,
zIndex:200,background:"rgba(0,0,0,0.92)",
display:"flex",alignItems:"center",
justifyContent:"center",padding:"16px"}}>
<div style={{background:"#141414",
borderRadius:"16px",padding:"18px",
width:"100%",maxWidth:"320px",
border:"1px solid #D4B78F44"}}>
<input value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
placeholder="Full Name"
style={{width:"100%",background:"#0a0a0a",
border:"1px solid #333",borderRadius:"8px",
padding:"10px",color:"#fff",marginTop:"12px"}}/>
<input value={form.gmail}
onChange={e=>setForm({...form,gmail:e.target.value})}
placeholder="Gmail for OTP"
style={{width:"100%",background:"#0a0a0a",
border:"1px solid #333",borderRadius:"8px",
padding:"10px",color:"#fff",marginTop:"8px"}}/>
<button onClick={sendOtp}
style={{width:"100%",marginTop:"12px",
background:"#D4B78F",color:"#000",
border:"none",padding:"11px",
borderRadius:"999px",fontWeight:"800"}}>
SEND OTP</button></div></div>}

</div></div>
);
  }
