"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const PKR=(d:number)=>`Rs. ${(d*280).toLocaleString()}`;
const ALL=[
{id:1,n:"Silk Blazer",pr:189,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Male T-Shirt",pr:45,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
{id:4,n:"Male Cap",pr:25,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"},
{id:5,n:"Male Slippers",pr:35,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:6,n:"Men Perfume",pr:85,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"},
{id:7,n:"Pants",pr:65,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
{id:8,n:"Shorts",pr:40,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400"},
{id:9,n:"Female Top",pr:55,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
{id:10,n:"Bra",pr:30,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1620799139507-715043871744?w=400"},
{id:11,n:"Earrings",pr:40,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"},
{id:12,n:"Chain",pr:70,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"},
{id:13,n:"Bracelet",pr:35,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"},
{id:14,n:"Sandals",pr:50,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"},
{id:15,n:"Boy T-Shirt",pr:25,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400"},
{id:16,n:"Boy Jeans",pr:40,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"},
{id:17,n:"Girl Dress",pr:45,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"},
{id:18,n:"Girl Top",pr:30,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400"},
{id:19,n:"Hoodie Unisex",pr:89,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
{id:20,n:"Sneakers Unisex",pr:120,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:21,n:"Lipstick",pr:25,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"},
{id:22,n:"Makeup Kit",pr:95,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"},
{id:23,n:"Decor Lamp",pr:75,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"},
{id:24,n:"Vase Decor",pr:55,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1578500351865-d6c3706f46a4?w=400"},
];
export default function Home(){
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);const [form,setForm]=useState({name:"",gmail:"",phone:""});const [otp,setOtp]=useState("");const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);
const [mainCat,setMainCat]=useState("FASHION");const [subCat,setSubCat]=useState("MALE");const [q,setQ]=useState("");
useEffect(()=>{const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));const s=localStorage.getItem("kaiha_user");if(s)setUser(JSON.parse(s));else setShowLogin(true)},[]);
const sendOtp=async()=>{if(!form.name||!form.gmail)return alert("fill all");setLoading(true);const{error}=await supabase.auth.signInWithOtp({email:form.gmail,options:{data:{full_name:form.name}}});setLoading(false);if(error)return alert(error.message);setStep(2);};
const verifyOtp=async()=>{setLoading(true);const{error}=await supabase.auth.verifyOtp({email:form.gmail,token:otp,type:'email'});setLoading(false);if(error)return alert(error.message);const u={...form,id:Date.now()};const n=[...accounts,u];setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setShowLogin(false);};
const add=(p:any)=>setCart(c=>[...c,{...p,aid:Date.now()}]);const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);
const filtered=ALL.filter(p=>{if(q)return p.n.toLowerCase().includes(q.toLowerCase());if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;return p.cat===mainCat;});
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`.page{animation:fadeUp 0.45s ease}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"110px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}><img src={LOGO} style={{height:"72px",width:"72px",borderRadius:"16px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"0.3s"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",display:"block",opacity:mn?0:1,transition:"0.3s"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"0.3s"}}></span>
</button>
</div>
{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"44px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#fff",flex:1,fontSize:"12px"}}/>{q&&<span onClick={()=>setQ("")} style={{color:"#888"}}>✕</span>}</div></div>
<div onClick={()=>setPg("category")} style={{margin:"14px 16px",borderRadius:"22px",minHeight:"230px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"56%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 65%,rgba(10,10,10,0.3))"}}/>
<div style={{position:"relative",padding:"28px 22px",width:"68%"}}>
<div style={{color:"#D4B78F",fontSize:"10px",letterSpacing:"0.35em",fontWeight:"700"}}>NEW ARRIVALS</div>
<div style={{fontSize:"30px",fontFamily:"serif",marginTop:"10px",lineHeight:"1.1"}}>Fall Collection<br/>2026</div>
<div style={{marginTop:"22px",background:"#D4B78F",color:"#000",display:"inline-block",padding:"12px 22px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>SHOP NOW →</div>
</div>
</div>
<div style={{display:"flex",gap:"8px",padding:"8px 16px",overflowX:"auto"}}>
{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>{setMainCat(c);setQ("");setPg("category")}} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #D4B78F44",borderRadius:"999px",padding:"9px 18px",fontSize:"10px",fontWeight:"800",whiteSpace:"nowrap"}}>{c}</button>)}
</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"7px",padding:"0 16px 12px",overflowX:"auto"}}>
{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>{setSubCat(s);setQ("");setPg("category")}} style={{background:subCat===s?"#fff":"#0a0a0a",color:subCat===s?"#000":"#aaa",border:"1px solid #333",borderRadius:"999px",padding:"7px 14px",fontSize:"9px",whiteSpace:"nowrap"}}>{s}</button>)}
</div>}
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>
{filtered.slice(0,6).map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"18px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"155px",borderRadius:"14px",objectFit:"cover"}}/><div style={{fontSize:"12px",marginTop:"10px",fontWeight:"700"}}>{p.n}</div><div style={{fontSize:"11px",color:"#D4B78F"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"10px",border:"1px solid #D4B78F99",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"10px",fontSize:"10px",fontWeight:"700"}}>ADD TO BAG</button></div>)}
</div>
<div style={{padding:"0 16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:"13px"}}>KAIHA TV</b><span onClick={()=>setPg("reels")} style={{color:"#D4B78F",fontSize:"10px"}}>See All →</span></div><div style={{display:"flex",gap:"10px",overflowX:"auto",marginTop:"12px"}}>
{ALL.slice(0,4).map((p:any)=><div key={p.id} onClick={()=>setPg("reels")} style={{minWidth:"120px",height:"160px",borderRadius:"14px",overflow:"hidden",position:"relative",background:"#111",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"28px",height:"28px",borderRadius:"999px",background:"#D4B78F",display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontSize:"12px"}}>▶</div></div>)}
</div></div>
</div>}

{pg==="category"&&<div className="page" style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>{mainCat}-{subCat}</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px"}}>← Back</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"16px"}}>{filtered.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"16px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"145px",borderRadius:"12px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"8px"}}>{p.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"8px",background:"#D4B78F",border:"none",borderRadius:"999px",padding:"8px",fontWeight:"800"}}>ADD TO BAG</button></div>)}</div></div>}

{pg==="reels"&&<div className="page"><div style={{padding:"16px",display:"flex",justifyContent:"space-between"}}><b>KAIHA TV - Reels</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px"}}>← Back</span></div>{ALL.slice(0,4).map((p:any)=><div key={p.id} style={{height:"60vh",margin:"0 12px 12px",borderRadius:"20px",overflow:"hidden",position:"relative",background:"#111"}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",bottom:"20px",left:"16px"}}><b>{p.n}</b><div style={{color:"#D4B78F"}}>{PKR(p.pr)}</div></div></div>)}</div>}

{pg==="bag"&&<div className="page" style={{padding:"16px"}}><b>Bag ({cart.length}) {PKR(tot)}</b>{cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",marginTop:"10px"}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px"}}/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(c.pr)}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>✕</button></div>)}</div>}

{pg==="profile"&&<div className="page" style={{padding:"18px",textAlign:"center"}}><div style={{width:"64px",height:"64px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"1px solid #D4B78F44"}}>{user?.name?.[0]||"H"}</div><div style={{marginTop:"8px",fontWeight:"700"}}>{user?.name||"Guest"}</div><button onClick={()=>{setShowLogin(true);setStep(1)}} style={{marginTop:"16px",background:"#D4B78F",color:"#000",border:"none",padding:"10px 20px",borderRadius:"999px",fontWeight:"800"}}>+ ADD ACCOUNT</button></div>}

<div style={{textAlign:"center",padding:"24px 0 10px",borderTop:"1px solid #1a1a1a",marginTop:"24px"}}><div style={{color:"#D4B78F",fontSize:"10px",letterSpacing:"0.32em"}}>KAIHA</div><div style={{color:"#666",fontSize:"8.5px",marginTop:"6px"}}>© KAIHA - HADI SUKKUR 2026</div></div>

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.98)",backdropFilter:"blur(16px)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/></svg><span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("category")} style={{color:pg==="category"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span style={{fontSize:"9px"}}>Shop</span></div>
<div onClick={()=>setPg("reels")} style={{color:pg==="reels"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style={{fontSize:"9px"}}>Reels</span></div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",position:"relative"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>{cart.length>0&&<span style={{position:"absolute",top:"-7px",right:"2px",background:"#D4B78F",color:"#000",fontSize:"8px",minWidth:"15px",height:"15px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center"}}>{cart.length}</span>}<span style={{fontSize:"9px"}}>Bag</span></div>
<div onClick={()=>setPg("profile")} style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.2"/><path d="M5 19a7 7 0 0 1 14 0"/></svg><span style={{fontSize:"9px"}}>Profile</span></div>
</div>

{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",maxWidth:"320px",border:"1px solid #D4B78F44"}}>{step===1?<><div style={{textAlign:"center",color:"#D4B78F",letterSpacing:"0.3em"}}>KAIHA SECURE</div><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/><input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/><button onClick={sendOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button></>:<><div style={{textAlign:"center",color:"#D4B78F"}}>OTP sent</div><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center"}}/><button onClick={verifyOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>VERIFY</button></>}</div></div>}
</div></div>
);
  }
