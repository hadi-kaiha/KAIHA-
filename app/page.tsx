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
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);const [form,setForm]=useState({name:"",gmail:"",phone:""});const [otp,setOtp]=useState("");const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);const [q,setQ]=useState("");const [mainCat,setMainCat]=useState("FASHION");const [subCat,setSubCat]=useState("ALL");
useEffect(()=>{const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));const s=localStorage.getItem("kaiha_user");if(s)setUser(JSON.parse(s));else setShowLogin(true);},[]);
const sendOtp=async()=>{
if(!form.name||!form.gmail)return alert("fill all");
setLoading(true);
try{
const {error}=await supabase.auth.signInWithOtp({email:form.gmail,options:{data:{full_name:form.name}}});
if(error)throw error;
setLoading(false);setStep(2);alert("OTP sent to "+form.gmail);
}catch(e:any){
const localOtp=Math.floor(100000+Math.random()*900000).toString();
localStorage.setItem("kaiha_local_otp",localOtp);
localStorage.setItem("kaiha_local_email",form.gmail);
setLoading(false);setStep(2);
alert("OTP (Local): "+localOtp);
}
};
const verifyOtp=async()=>{
setLoading(true);
try{
const localOtp=localStorage.getItem("kaiha_local_otp");
const localEmail=localStorage.getItem("kaiha_local_email");
if(localOtp && otp===localOtp && form.gmail===localEmail){
const u={...form,id:Date.now()};const n=[...accounts,u];
setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));
localStorage.setItem("kaiha_user",JSON.stringify(u));
localStorage.removeItem("kaiha_local_otp");
setUser(u);setShowLogin(false);setLoading(false);return;
}
if(otp==="123456"){
const u={...form,id:Date.now()};const n=[...accounts,u];
setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));
localStorage.setItem("kaiha_user",JSON.stringify(u));
setUser(u);setShowLogin(false);setLoading(false);return;
}
const {error}=await supabase.auth.verifyOtp({email:form.gmail,token:otp,type:'email'});
if(error)throw error;
const u={...form,id:Date.now()};const n=[...accounts,u];
setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));
localStorage.setItem("kaiha_user",JSON.stringify(u));
setUser(u);setShowLogin(false);setLoading(false);
}catch(err:any){
setLoading(false);
if(otp==="123456" || otp===localStorage.getItem("kaiha_local_otp")){
const u={...form,id:Date.now()};const n=[...accounts,u];
setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));
localStorage.setItem("kaiha_user",JSON.stringify(u));
localStorage.removeItem("kaiha_local_otp");
setUser(u);setShowLogin(false);
}else{alert("Wrong! Use: "+(localStorage.getItem("kaiha_local_otp")||"123456"));}
}
};
const add=(p:any)=>setCart(c=>[...c,{...p,aid:Date.now()}]);const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);const PKR=(d:number)=>`Rs. ${(d*280).toLocaleString()}`;
const filtered=P.filter(p=>{if(q){return p.n.toLowerCase().includes(q.toLowerCase());}if(mainCat==="FASHION"){if(subCat==="ALL")return p.cat==="FASHION";return p.cat==="FASHION"&&p.sub===subCat;}return p.cat===mainCat;});
return(<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');@keyframes kaihaIn{0%{max-width:0;opacity:0}100%{max-width:135px;opacity:1}}.kaihaOnce{animation:kaihaIn 0.9s forwards;display:inline-block;overflow:hidden;white-space:nowrap;max-width:0;opacity:0}`}</style>
  <div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/>
<span className={pg==="home"?"kaihaOnce":""} style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px",fontFamily:"Montserrat"}}>KAIHA</span>
</div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"all 0.3s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1,transition:"all 0.25s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"all 0.3s ease"}}></span>
</button>
</div>
{pg==="home"&&<div>
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/>{q&&<span onClick={()=>setQ("")} style={{color:"#888"}}>✕</span>}</div></div>
<div style={{margin:"12px 16px",borderRadius:"14px",height:"155px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222"}}><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"60%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 60%,transparent)"}}/><div style={{position:"relative",padding:"16px",width:"65%"}}><div style={{color:"#D4B78F",fontSize:"9px",letterSpacing:"0.2em"}}>NEW ARRIVALS</div><div style={{fontSize:"22px",fontFamily:"serif",marginTop:"4px"}}>Fall Collection 2026</div></div></div>
<div style={{display:"flex",gap:"10px",padding:"6px 16px 10px",overflowX:"auto"}}>{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>{setMainCat(c);setQ("");}} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #2a241b",borderRadius:"999px",padding:"10px 18px",fontSize:"11px",fontWeight:"700",whiteSpace:"nowrap"}}>{c}</button>)}</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"8px",padding:"0 16px 14px",overflowX:"auto"}}>{["ALL","MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>setSubCat(s)} style={{background:subCat===s?"#fff":"#111",color:subCat===s?"#000":"#aaa",border:"1px solid #222",borderRadius:"999px",padding:"8px 14px",fontSize:"10px",whiteSpace:"nowrap",fontWeight:subCat===s?"800":"400"}}>{s}</button>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>{filtered.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"120px",borderRadius:"8px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",border:"1px solid #D4B78F88",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"7px",fontSize:"9px"}}>ADD TO BAG</button></div>)}</div>
</div>}
{pg==="bag"&&<div style={{padding:"16px"}}><b>Bag ({cart.length})</b>{cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",marginTop:"10px"}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px"}}/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(c.pr)}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>✕</button></div>)}</div>}
{pg==="profile"&&<div style={{padding:"18px"}}><div style={{textAlign:"center"}}><div style={{width:"64px",height:"64px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center"}}>{user?.name?.[0]||"H"}</div><div style={{marginTop:"8px"}}>{user?.name||"Guest"}</div></div><div style={{display:"flex",gap:"8px",marginTop:"16px"}}><button onClick={()=>{setShowLogin(true);setStep(1)}} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>+ ADD ACCOUNT</button><button onClick={()=>{localStorage.removeItem("kaiha_user");setUser(null);setShowLogin(true)}} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>Logout</button></div></div>}
<div style={{textAlign:"center",padding:"24px 0 10px",borderTop:"1px solid #1a1a1a",marginTop:"24px"}}><div style={{color:"#D4B78F",fontSize:"10px",letterSpacing:"0.32em"}}>KAIHA</div><div style={{color:"#666",fontSize:"8.5px",marginTop:"6px"}}>© KAIHA - HADI SUKKUR 2026</div></div>
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",position:"relative"}}><span style={{fontSize:"9px"}}>Bag {cart.length>0?`(${cart.length})`:""}</span></div>
<div onClick={()=>setPg("profile")} style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Profile</span></div>
</div>
{mn&&<div style={{position:"fixed",inset:0,zIndex:99,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"78%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#D4B78F"}}>KAIHA</span><button onClick={()=>setMn(false)} style={{width:"32px",height:"32px",border:"1px solid #D4B78F44",borderRadius:"999px",background:"none",color:"#D4B78F"}}>✕</button></div>{[{l:"Home",v:"home"},{l:"Shop",v:"shop"},{l:"Bag",v:"bag"},{l:"Profile",v:"profile"}].map((it:any)=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}} style={{padding:"14px",borderRadius:"10px",border:"1px solid #222",marginTop:"10px",color:pg===it.v?"#D4B78F":"#ccc"}}>{it.l}</div>)}</div></div>}
{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",maxWidth:"320px",border:"1px solid #D4B78F44"}}>{step===1?<><div style={{textAlign:"center",color:"#D4B78F",fontSize:"12px"}}>KAIHA SECURE</div><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/><input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/><button onClick={sendOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button></>:<><div style={{textAlign:"center",color:"#D4B78F"}}>OTP: {typeof window!=="undefined"?localStorage.getItem("kaiha_local_otp")||"123456":""}</div><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center",letterSpacing:"0.3em"}}/><button onClick={verifyOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>VERIFY OTP</button></>}</div></div>}
</div></div>
);
  }
