"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const P=[
{id:1,n:"Silk Blazer",pr:189,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
];
export default function Home(){
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);
const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);
const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);
const [form,setForm]=useState({name:"",gmail:"",phone:"",address:""});const [otp,setOtp]=useState("");
const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);
const [q,setQ]=useState("");const [mainCat,setMainCat]=useState("FASHION");
const [subCat,setSubCat]=useState("MALE");const [coins,setCoins]=useState(120);
const [isBlackCard,setIsBlackCard]=useState(false);const [wish,setWish]=useState<any[]>([]);
const [showBell,setShowBell]=useState(false);const [showProfile,setShowProfile]=useState(false);
const [userRole,setUserRole]=useState("Customer");
const [dbProducts,setDbProducts]=useState<any[]>([]);
const [showCheckout,setShowCheckout]=useState(false);
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");if(s)setUser(JSON.parse(s));else setShowLogin(true);
const c=localStorage.getItem("kaiha_coins");if(c)setCoins(Number(c));
const b=localStorage.getItem("kaiha_black");if(b)setIsBlackCard(b==="1");
const w=localStorage.getItem("kaiha_wish");if(w)setWish(JSON.parse(w));
fetchProducts();
const ch=supabase.channel("prod-live").on("postgres_changes",{event:"*",schema:"public",table:"products"},fetchProducts).subscribe();
return()=>{supabase.removeChannel(ch);}
},[]);
const fetchProducts=async()=>{
  const {data}=await supabase.from("products").select("*").eq("is_active",true).order("created_at",{ascending:false});
  if(data) setDbProducts(data);
};
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
const allProducts = [...dbProducts.map((d:any)=>({id:d.id, n:d.name, pr:d.price||d.pr||100, cat:d.category||"FASHION", sub:d.subcategory||d.sub_category||"MALE", im:d.image_url||d.image||d.im, colors:d.colors||[]})),...P];
const filtered=allProducts.filter(p=>{if(q)return p.n.toLowerCase().includes(q.toLowerCase());
if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;return p.cat===mainCat;});
const placeOrderPro=async()=>{
 if(!form.name||!form.phone||!form.address) return alert("Name Phone Address likho");
 setLoading(true);
 let lat=0,lng=0;
 await new Promise(r=>navigator.geolocation.getCurrentPosition((pos:any)=>{lat=pos.coords.latitude; lng=pos.coords.longitude; r(1);},()=>r(1)));
 const {data:riders}=await supabase.from("riders").select("*").eq("status","ONLINE");
 let nearest=null; let min=Infinity;
 riders?.forEach((rd:any)=>{ const d=Math.sqrt(((rd.lat||0)-lat)**2+((rd.lng||0)-lng)**2); if(d<min){min=d; nearest=rd;}});
 const {error}=await supabase.from("orders").insert({
  customer_name:form.name, customer_phone:form.phone, items:cart, total:tot, location_text:form.address, lat,lng,
  status: nearest?"assigned":"pending", rider_id: nearest?.id||null
 });
 setLoading(false);
 if(error) alert(error.message);
 else { alert(nearest?`✅ Assigned to ${nearest.name}`:"Order Placed - Searching Rider"); setCart([]); setShowCheckout(false); }
};
  return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes kaihaIn{0%{max-width:0;opacity:0}100%{max-width:135px;opacity:1}}
@keyframes slideMenu{from{transform:translateX(100%)}to{transform:translateX(0)}}
.page{animation:fadeUp 0.45s ease}.kaihaOnce{animation:kaihaIn 0.9s forwards;display:inline-block;overflow:hidden;white-space:nowrap;max-width:0;opacity:0}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} alt="K" style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/>
<span className={pg==="home"?"kaihaOnce":""} style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px",fontFamily:"Montserrat"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
</button></div>
{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/></div></div>
<div style={{display:"flex",gap:"10px",padding:"6px 16px 10px",overflowX:"auto"}}>{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>setMainCat(c)} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #2a241b",borderRadius:"999px",padding:"10px 18px",fontSize:"11px",fontWeight:"700"}}>{c}</button>)}</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"8px",padding:"0 16px 14px",overflowX:"auto"}}>{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>setSubCat(s)} style={{background:subCat===s?"#fff":"#111",color:subCat===s?"#000":"#aaa",border:"1px solid #222",borderRadius:"999px",padding:"8px 14px",fontSize:"10px"}}>{s}</button>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>
{filtered.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}>
<div style={{position:"relative"}}><img src={p.im} style={{width:"100%",height:"120px",borderRadius:"8px",objectFit:"cover"}}/>
{p.colors?.length>0&&<div style={{position:"absolute",top:"6px",right:"6px",display:"flex",gap:"3px"}}>{p.colors.slice(0,4).map((c:any)=><div key={c} style={{width:10,height:10,borderRadius:999,background:c, border:"1px solid #fff"}}/>)}</div>}</div>
<div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)}</div>
<button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",border:"1px solid #D4B78F88",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"7px",fontSize:"9px"}}>ADD TO BAG</button></div>)}</div></div>}
{pg==="bag"&&<div className="page" style={{padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>Bag ({cart.length}) {PKR(tot)}</b></div>
{cart.length===0?<div style={{color:"#888",marginTop:"30px",textAlign:"center"}}>Empty</div>:
<>{cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",marginTop:"10px",border:"1px solid #222"}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px",objectFit:"cover"}}/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(c.pr)}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>X</button></div>)}
<button onClick={()=>setShowCheckout(true)} style={{width:"100%",marginTop:"16px",background:"#D4B78F",color:"#000",border:"none",padding:"14px",borderRadius:"999px",fontWeight:"800"}}>CHECKOUT →</button></>}</div>}
{showCheckout&&<div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<div style={{background:"#141414",borderRadius:16,padding:18,width:"100%",maxWidth:340,border:"1px solid #D4B78F44"}}>
<b style={{color:"#D4B78F"}}>Checkout - Nearest Rider</b>
<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",padding:10,borderRadius:8,color:"#fff",marginTop:12}}/>
<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="03xx-xxxxxxx" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",padding:10,borderRadius:8,color:"#fff",marginTop:8}}/>
<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Full Address" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",padding:10,borderRadius:8,color:"#fff",marginTop:8}}/>
<button onClick={placeOrderPro} disabled={loading} style={{width:"100%",background:"#D4B78F",color:"#000",border:"none",padding:12,borderRadius:999,fontWeight:800,marginTop:12}}>{loading?"Finding Rider...":"PLACE ORDER"}</button>
<button onClick={()=>setShowCheckout(false)} style={{width:"100%",background:"none",border:"1px solid #333",color:"#888",padding:10,borderRadius:999,marginTop:8}}>Cancel</button>
</div></div>}
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Home</div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",fontSize:"11px"}}>Bag {cart.length>0?`(${cart.length})`:""}</div>
</div>
</div></div>
);
                   }
