"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rlsmcomxugstuoerdam.supabase.co",
  "sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122"
);

const LOGO="/k-logo.png";
const P=[
{id:1,n:"Silk Blazer",pr:189,im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Denim Jacket",pr:120,im:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"},
{id:4,n:"Evening Dress",pr:320,im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
];

export default function Home(){
const [pg,setPg]=useState("home"),[mn,setMn]=useState(false),[cart,setCart]=useState<any[]>([]),[user,setUser]=useState<any>(null),[accounts,setAccounts]=useState<any[]>([]),[showLogin,setShowLogin]=useState(false),[form,setForm]=useState({name:"",gmail:"",contact:""}),[otp,setOtp]=useState(""),[step,setStep]=useState(1),[loading,setLoading]=useState(false);

useEffect(()=>{
const acc=localStorage.getItem("kaiha_accounts");if(acc)setAccounts(JSON.parse(acc));
const s=localStorage.getItem("kaiha_user");if(s){setUser(JSON.parse(s))}else setShowLogin(true);
},[]);

const sendOtp=async()=>{
if(!form.name||!form.gmail||!form.contact)return alert("All fields required");
setLoading(true);
const { error } = await supabase.auth.signInWithOtp({
  email: form.gmail,
  options:{ data:{ full_name:form.name, contact:form.contact }, emailRedirectTo: window.location.href }
});
setLoading(false);
if(error) return alert("Error: "+error.message);
setStep(2);
alert(`✅ SECURE OTP sent to ${form.gmail} via Supabase!\nCheck Gmail inbox - KAIHA © HADI 2026`);
};

const verifyOtp=async()=>{
if(otp.length!==6)return alert("Enter 6-digit OTP");
setLoading(true);
const { data, error } = await supabase.auth.verifyOtp({ email: form.gmail, token: otp, type: 'email' });
setLoading(false);
if(error) return alert("Wrong OTP: "+error.message);
const u={...form,id:Date.now(),coins:120};const newAccs=[...accounts,u];setAccounts(newAccs);
localStorage.setItem("kaiha_accounts",JSON.stringify(newAccs));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setShowLogin(false);setStep(1);setOtp("");
alert("🎉 Secure Login Success! © KAIHA - HADI SUKKUR 2026");
};

const need=()=>{if(!user){setShowLogin(true);return false}return true};
const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"#0a0a0a",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={LOGO} style={{height:"56px",width:"56px",borderRadius:"12px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.35em",fontFamily:"Montserrat"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"4px",width:"26px"}}><span style={{height:"2px",background:"#D4B78F",display:"block",transform:mn?"rotate(45deg) translate(4px,4px)":"none"}}/><span style={{height:"2px",background:"#D4B78F",display:"block",opacity:mn?0:1}}/><span style={{height:"2px",background:"#D4B78F",display:"block",transform:mn?"rotate(-45deg) translate(4px,-4px)":"none"}}/></button>
</div>

{pg==="home"&&<div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",padding:"16px"}}>{P.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"120px",borderRadius:"8px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"5px"}}>{p.n} ${p.pr}</div><button onClick={()=>{if(!need())return;setCart(c=>[...c,{...p,aid:Date.now()}])}} style={{width:"100%",marginTop:"6px",border:"1px solid #D4B78F88",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"6px",fontSize:"9px"}}>ADD TO BAG</button></div>)}</div></div>}

{pg==="profile"&&<div style={{padding:"18px"}}><div style={{textAlign:"center"}}><div style={{width:"64px",height:"64px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"1px solid #D4B78F44"}}>{user?.name?.[0]||"H"}</div><div style={{marginTop:"8px",fontWeight:"700"}}>{user?.name||"Guest"}</div><div style={{color:"#888",fontSize:"10px"}}>{user?.gmail}</div><div style={{color:"#666",fontSize:"10px"}}>{user?.contact}</div><div style={{color:"#D4B78F",fontSize:"8px",marginTop:"4px"}}>✓ Verified via Supabase OTP</div></div>
<div style={{marginTop:"16px"}}><b style={{fontSize:"12px"}}>Your Accounts ({accounts.length}) - Multi Login</b>{accounts.map((a:any,i:number)=><div key={i} onClick={()=>{localStorage.setItem("kaiha_user",JSON.stringify(a));setUser(a);setMn(false)}} style={{background:user?.id===a.id?"#1a1a1a":"#141414",border:`1px solid ${user?.id===a.id?"#D4B78F66":"#222"}`,borderRadius:"10px",padding:"10px",marginTop:"8px",display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:"12px",fontWeight:"600"}}>{a.name}</div><div style={{fontSize:"9px",color:"#888"}}>{a.gmail}</div></div><div style={{fontSize:"10px",color:user?.id===a.id?"#D4B78F":"#666"}}>{user?.id===a.id?"Active":"Switch"}</div></div>)}</div>
<div style={{display:"flex",gap:"8px",marginTop:"14px"}}><button onClick={()=>{setShowLogin(true);setStep(1)}} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>+ ADD ACCOUNT</button><button onClick={()=>{localStorage.removeItem("kaiha_user");setUser(null);setShowLogin(true)}} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>Logout</button></div>
<div style={{marginTop:"12px",textAlign:"center",color:"#444",fontSize:"7px"}}>© KAIHA - HADI SUKKUR 2026 • Secure via Supabase</div></div>}

{pg==="bag"&&<div style={{padding:"14px"}}><b>Bag {cart.length} - ${tot}</b>{cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"10px",padding:"10px",display:"flex",gap:"10px",marginTop:"8px"}}><img src={c.im} style={{width:"40px",height:"40px",borderRadius:"8px"}}/><div style={{flex:1,fontSize:"11px"}}>{c.n}</div><button onClick={()=>setCart(cart.filter((_:any,j:number)=>j!==i))} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:"999px",width:"24px",height:"24px"}}>✕</button></div>)}</div>}

<div style={{textAlign:"center",padding:"16px 0 8px",borderTop:"1px solid #1a1a1a",marginTop:"16px"}}><div style={{color:"#D4B78F",fontSize:"9px",letterSpacing:"0.3em",fontFamily:"Montserrat"}}>KAIHA</div><div style={{color:"#666",fontSize:"7px",marginTop:"4px"}}>© KAIHA - HADI SUKKUR 2026 • Secure OTP</div></div>

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-around",padding:"12px 0 16px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/></svg><span style={{fontSize:"8px"}}>Home</span></div>
<div onClick={()=>{if(!need())return;setPg("profile")}} style={{color:pg==="profile"?"#D4B78F":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="3"/><path d="M5 19a7 7 0 0 1 14 0"/></svg><span style={{fontSize:"8px"}}>Profile</span></div>
<div onClick={()=>{if(!need())return;setPg("bag")}} style={{color:pg==="bag"?"#D4B78F":"#666",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg><span style={{fontSize:"8px"}}>Bag</span></div>
</div>

{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",maxWidth:"320px",border:"1px solid #D4B78F44"}}>
{step===1?<>
<div style={{textAlign:"center"}}><div style={{color:"#D4B78F",letterSpacing:"0.3em"}}>KAIHA SECURE</div><div style={{color:"#888",fontSize:"9px",marginTop:"3px"}}>Supabase OTP Login • © HADI 2026</div></div>
<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"10px",fontSize:"12px"}}/>
<input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail (OTP will be sent)" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px",fontSize:"12px"}}/>
<input value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} placeholder="Contact Number" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px",fontSize:"12px"}}/>
<button onClick={sendOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800",fontSize:"11px",opacity:loading?0.6:1}}>{loading?"SENDING...":"SEND OTP to Gmail (Secure)"}</button>
<div style={{marginTop:"8px",color:"#666",fontSize:"8px",textAlign:"center"}}>OTP via Supabase - Real Gmail verification<br/>Secure customer accounts</div>
</>:<>
<div style={{textAlign:"center"}}><div style={{color:"#D4B78F"}}>Enter OTP</div><div style={{color:"#888",fontSize:"9px",marginTop:"4px"}}>Sent to {form.gmail}</div></div>
<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP from Gmail" maxLength={6} style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",fontSize:"16px",textAlign:"center",letterSpacing:"0.3em"}}/>
<button onClick={verifyOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>{loading?"VERIFYING...":"VERIFY OTP & LOGIN"}</button>
<button onClick={()=>setStep(1)} style={{width:"100%",marginTop:"8px",background:"none",border:"1px solid #333",color:"#888",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>← Change Email</button>
</>}
</div></div>}

</div></div>
);
                          }
