"use client";
import {useState} from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function SellerLogin(){
const [shop,setShop]=useState(""); 
const [form,setForm]=useState({owner:"",phone:"",whatsapp:"",gmail:"",easypaisa:"",jazzcash:"",address:"",password:""});
const [loading,setLoading]=useState(false);

const reg=async()=>{
 if(!shop||!form.owner||!form.phone||!form.gmail||!form.password) return alert("Shop Name, Owner, Phone, Gmail, Password zaruri!");
 if(!form.easypaisa && !form.jazzcash) return alert("Easypaisa ya JazzCash ek zaruri!");
 setLoading(true);
 const {error}=await supabase.from("sellers").upsert({
   shop_name:shop.trim(), 
   owner_name:form.owner, 
   phone:form.phone, 
   whatsapp:form.whatsapp||form.phone, 
   gmail:form.gmail, 
   easypaisa:form.easypaisa, 
   jazzcash:form.jazzcash, 
   address:form.address, 
   password:form.password,
   created_at: new Date().toISOString()
 },{onConflict:"shop_name"});
 if(error){ alert(error.message); setLoading(false); return; }
 setLoading(false);
 location.href="/seller?shop="+encodeURIComponent(shop.trim());
};

return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",padding:"18px",color:"#fff"}}>
<h3 style={{color:"#D4B78F",textAlign:"center",fontWeight:"900",letterSpacing:"0.1em"}}>SELLER REGISTER / LOGIN</h3>
<p style={{fontSize:"10px",color:"#888",textAlign:"center",marginTop:"4px"}}>Har seller ki apni alag shop - filter laga hua hai</p>

<input value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop Name * Real name" style={{width:"100%",marginTop:"14px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} placeholder="Owner Name *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone * 03XX" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp (optional)" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.easypaisa} onChange={e=>setForm({...form,easypaisa:e.target.value})} placeholder="Easypaisa No + Title *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.jazzcash} onChange={e=>setForm({...form,jazzcash:e.target.value})} placeholder="JazzCash No + Title" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>
<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Shop Address" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff",outline:"none"}}/>

<button onClick={reg} disabled={loading} style={{width:"100%",marginTop:"14px",background:loading?"#222":"#D4B78F",color:"#000",padding:"14px",borderRadius:"999px",border:"none",fontWeight:"900",cursor:"pointer"}}>{loading?"REGISTERING...":"REGISTER SHOP →"}</button>

<div style={{marginTop:"14px",background:"#111",border:"1px solid #222",borderRadius:"10px",padding:"10px"}}>
<div style={{fontSize:"9px",color:"#D4B78F",fontWeight:"800"}}>INFO:</div>
<div style={{fontSize:"9px",color:"#888",marginTop:"4px",lineHeight:"1.4"}}>
• Shop Name = tumhari unique ID hai<br/>
• Dusre phone pe same Shop Name likh ke login karo, tumhare products/orders aa jayenge<br/>
• No localStorage - 100% cloud
</div>
</div>

</div></div>
)
 }
