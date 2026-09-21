"use client";
import {useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
export default function SellerLogin(){
const [shop,setShop]=useState(""); 
const [form,setForm]=useState({owner:"",phone:"",whatsapp:"",gmail:"",easypaisa:"",jazzcash:"",address:"",password:""});
const reg=async()=>{
 if(!shop||!form.owner||!form.phone||!form.gmail||!form.password) return alert("Shop Name, Owner, Phone, Gmail, Password zaruri!");
 if(!form.easypaisa && !form.jazzcash) return alert("Easypaisa ya JazzCash ek zaruri!");
 await supabase.from("sellers").upsert({shop_name:shop, owner_name:form.owner, phone:form.phone, whatsapp:form.whatsapp||form.phone, gmail:form.gmail, easypaisa:form.easypaisa, jazzcash:form.jazzcash, address:form.address, password:form.password});
 localStorage.setItem("my_shop_name",shop);
 localStorage.setItem("my_shop_data",JSON.stringify(form));
 location.href="/seller";
};
return(<div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",padding:"18px",color:"#fff"}}>
<h3 style={{color:"#D4B78F",textAlign:"center"}}>SELLER REGISTER / LOGIN</h3>
<input value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop Name * (Real shop name)" style={{width:"100%",marginTop:"12px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} placeholder="Owner Name *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone * 03XX" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.easypaisa} onChange={e=>setForm({...form,easypaisa:e.target.value})} placeholder="Easypaisa No + Title *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.jazzcash} onChange={e=>setForm({...form,jazzcash:e.target.value})} placeholder="JazzCash No + Title" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Shop Address" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<button onClick={reg} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",padding:"14px",borderRadius:"999px",border:"none",fontWeight:"900"}}>REGISTER SHOP →</button>
</div></div>)
    }
