"use client"; import {useState} from "react"; import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
export default function SellerLogin(){
const [mode,setMode]=useState("LOGIN");
const [shop,setShop]=useState(""); const [pass,setPass]=useState("");
const [form,setForm]=useState({owner:"",phone:"",whatsapp:"",gmail:"",easypaisa:"",jazzcash:"",address:"",password:""});
const [loading,setLoading]=useState(false);

const doLogin=async()=>{
  if(!shop||!pass) return alert("Shop + Password likho!");
  setLoading(true);
  const {data,error}=await supabase.from("sellers").select("*").eq("shop_name",shop.trim()).eq("password",pass).single();
  setLoading(false);
  if(error||!data) return alert("❌ Wrong Shop/Password");
  localStorage.setItem("shop_name", data.shop_name);
  localStorage.setItem("seller_auth", "true");
  localStorage.setItem("seller_phone", data.phone);
  alert("✅ Login Success - Ab shop khul rahi hai...");
  window.location.href = "/seller?shop="+encodeURIComponent(data.shop_name);
};

const doRegister=async()=>{
 if(!shop||!form.owner||!form.phone||!form.gmail||!form.password) return alert("Star * wale zaruri!");
 if(!form.easypaisa && !form.jazzcash) return alert("Easypaisa ya JazzCash ek zaruri!");
 setLoading(true);
 try{
   const {data:exists}=await supabase.from("sellers").select("shop_name").eq("shop_name",shop.trim()).single();
   if(exists){ setLoading(false); return alert("❌ Ye Shop pehle se hai! Login karo"); }
   const {error}=await supabase.from("sellers").insert({ shop_name:shop.trim(), owner_name:form.owner, phone:form.phone, whatsapp:form.whatsapp||form.phone, gmail:form.gmail, easypaisa:form.easypaisa, jazzcash:form.jazzcash, address:form.address, password:form.password, created_at:new Date().toISOString() });
   if(error) throw error;
   localStorage.setItem("shop_name", shop.trim());
   localStorage.setItem("seller_auth", "true");
   localStorage.setItem("seller_phone", form.phone);
   alert("✅ Register ho gaya - Shop khul rahi hai...");
   window.location.href="/seller?shop="+encodeURIComponent(shop.trim());
 }catch(e:any){ alert(e.message); } setLoading(false);
};

return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",padding:"18px",color:"#fff"}}>
<h3 style={{color:"#D4B78F",textAlign:"center",fontWeight:"900"}}>KAIHA SELLER</h3>
<div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
<button onClick={()=>setMode("LOGIN")} style={{flex:1,background:mode==="LOGIN"?"#D4B78F":"#141414",color:mode==="LOGIN"?"#000":"#888",padding:"10px",borderRadius:"10px",border:"1px solid #333",fontWeight:"800"}}>LOGIN</button>
<button onClick={()=>setMode("REGISTER")} style={{flex:1,background:mode==="REGISTER"?"#D4B78F":"#141414",color:mode==="REGISTER"?"#000":"#888",padding:"10px",borderRadius:"10px",border:"1px solid #333",fontWeight:"800"}}>REGISTER</button>
</div>
{mode==="LOGIN"?(
<div><input value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop Name" style={{width:"100%",marginTop:"16px",padding:"12px",background:"#141414",border:"1px solid #D4B78F66",borderRadius:"8px",color:"#fff"}}/>
<input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width:"100%",marginTop:"10px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<button onClick={doLogin} disabled={loading} style={{width:"100%",marginTop:"14px",background:loading?"#222":"#D4B78F",color:"#000",padding:"14px",borderRadius:"999px",border:"none",fontWeight:"900"}}>{loading?"CHECKING...":"LOGIN SECURE →"}</button>
<div style={{fontSize:"9px",color:"#666",marginTop:"10px",textAlign:"center"}}>Sirf Shop Owner jiska password sahi hai wo hi login kar sakta hai. Owner: 03320821575</div></div>
):(
<div><input value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop Name * Unique" style={{width:"100%",marginTop:"14px",padding:"12px",background:"#141414",border:"1px solid #D4B78F66",borderRadius:"8px",color:"#fff"}}/>
<input value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} placeholder="Owner Name *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" placeholder="Password * Strong rakho" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.easypaisa} onChange={e=>setForm({...form,easypaisa:e.target.value})} placeholder="Easypaisa *" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.jazzcash} onChange={e=>setForm({...form,jazzcash:e.target.value})} placeholder="JazzCash" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Address" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<button onClick={doRegister} disabled={loading} style={{width:"100%",marginTop:"14px",background:loading?"#222":"#D4B78F",color:"#000",padding:"14px",borderRadius:"999px",border:"none",fontWeight:"900"}}>{loading?"REGISTERING...":"REGISTER →"}</button></div>
)}
</div></div>
)
  }
