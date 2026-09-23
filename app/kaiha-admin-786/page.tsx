"use client"; import {useEffect,useState} from "react"; import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const ADMIN_PASS="KAIHA#Sukkur@786!$%_X9zQ7-L2mK8^pW4"; const OWNER_NUMBER="03320821575";
export default function Admin(){
const [auth,setAuth]=useState(false); const [p,setP]=useState(""); const [err,setErr]=useState(""); const [tab,setTab]=useState("payments");
const [orders,setOrders]:any=useState([]); const [riders,setRiders]:any=useState([]); const [shops,setShops]:any=useState([]); const [customers,setCustomers]:any=useState([]); const [complaints,setComplaints]:any=useState([]); const [payments,setPayments]:any=useState([]); const [products,setProducts]:any=useState([]);
const [stats,setStats]=useState({total:0,today:0,online:0,revenue:0,commission:0,users:0,shops:0});
const login=()=>{ if(p===ADMIN_PASS){setAuth(true); loadAll();} else setErr("Wrong Password!"); };
const loadAll=async()=>{
 const {data:o}=await supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(200);
 const {data:r}=await supabase.from("riders").select("*");
 const {data:s}=await supabase.from("sellers").select("*");
 const {data:c}=await supabase.from("customers").select("*");
 const {data:comp}=await supabase.from("complaints").select("*").order("created_at",{ascending:false}).limit(50);
 const {data:pay}=await supabase.from("rider_payments").select("*").order("created_at",{ascending:false}).limit(100);
 const {data:prod}=await supabase.from("products").select("*").limit(100);
 if(o){const today=o.filter((x:any)=>new Date(x.created_at).toDateString()===new Date().toDateString()).length; const rev=o.reduce((a:any,b:any)=>a+(b.total||0),0); setStats({total:o.length,today,online:r?.filter((x:any)=>x.status==="ONLINE").length||0,revenue:rev,commission:Math.floor(rev*0.15),users:c?.length||0,shops:s?.length||0}); setOrders(o);}
 if(r)setRiders(r); if(s)setShops(s); if(c)setCustomers(c); if(comp)setComplaints(comp); if(pay)setPayments(pay); if(prod)setProducts(prod);
};
const updateOrder=async(id:number,s:string)=>{ await supabase.from("orders").update({status:s}).eq("id",id); loadAll(); };

const verifyPayment=async(pay:any)=>{
 if(!confirm(`Rs.${pay.amount} - ${pay.rider_phone} ka ${OWNER_NUMBER} pe aaya? VERIFY + DELETE karna hai?`)) return;
 try{
   if(pay.screenshot_url){
     try{
       const parts = pay.screenshot_url.split("/receipts/");
       const fileName = parts[1]?.split("?")[0];
       if(fileName){
         const {error: delError} = await supabase.storage.from("receipts").remove([fileName]);
         if(delError) console.log("Delete error:", delError.message);
       }
     }catch(e){ console.log("Delete skip"); }
   }
   await supabase.from("rider_payments").update({status:"VERIFIED"}).eq("id",pay.id);
   await supabase.from("riders").update({is_blocked:false,wallet:0}).eq("phone",pay.rider_phone);
   loadAll(); alert(`✅ VERIFIED + DELETED + UNBLOCKED\nRider: ${pay.rider_phone}\nWallet: 0\nReceipt: Deleted from Storage`);
 }catch(e:any){ alert("Error: "+e.message); loadAll(); }
};

const deleteReceiptOnly=async(pay:any)=>{
  if(!confirm(`Sirf receipt delete karni hai? ${pay.rider_phone}`)) return;
  try{
    const fileName = pay.screenshot_url.split("/receipts/")[1]?.split("?")[0];
    if(fileName){
      await supabase.storage.from("receipts").remove([fileName]);
      alert("🗑️ Receipt Delete Ho Gayi - Storage Khali!");
    }
  }catch(e:any){ alert(e.message); }
};

const unblockRiderNow=async(phone:string)=>{ await supabase.from("riders").update({is_blocked:false,wallet:0}).eq("phone",phone); loadAll(); alert("Unblocked Wallet 0!"); };
const toggleRider=async(id:string,status:string)=>{ await supabase.from("riders").update({status:status==="BANNED"?"OFFLINE":"BANNED"}).eq("id",id); loadAll(); };
const toggleShop=async(id:string,status:string)=>{ await supabase.from("sellers").update({status:status==="BANNED"?"ACTIVE":"BANNED"}).eq("id",id); loadAll(); };
const removeProduct=async(id:string)=>{ if(!confirm("Remove product?"))return; await supabase.from("products").delete().eq("id",id); loadAll(); };

if(!auth){
return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<div style={{background:"#0a0a0a",width:360,padding:28,borderRadius:20,border:"1px solid #D4B78F44",textAlign:"center"}}>
<div style={{fontSize:40}}>🔒</div><div style={{color:"#D4B78F",letterSpacing:".3em",fontSize:12,fontWeight:800,marginTop:8}}>KAIHA SECURE ADMIN</div>
<input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" style={{width:"100%",marginTop:16,background:"#111",border:"1px solid #333",padding:12,borderRadius:10,color:"#fff"}}/>
{err&&<div style={{color:"red",fontSize:11,marginTop:8}}>{err}</div>}
<button onClick={login} style={{width:"100%",background:"#D4B78F",color:"#000",padding:12,borderRadius:999,marginTop:12,fontWeight:800,border:"none"}}>UNLOCK</button>
</div></div>
);
}

return(
<div style={{background:"#000",minHeight:"100vh",color:"#fff",padding:10}}>
<div style={{maxWidth:1200,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",background:"#0a0a0a",padding:12,borderRadius:14,border:"1px solid #D4B78F33",marginBottom:10}}>
<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{height:32,width:32,borderRadius:6,background:"#D4B78F",display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontWeight:900}}>K</div><div><div style={{color:"#D4B78F",fontSize:12,fontWeight:800}}>KAIHA ADMIN - {OWNER_NUMBER} - DELETE FROM ADMIN</div><div style={{fontSize:9,color:"#00C851"}}>● LIVE {stats.online} ONLINE • Rs.{stats.revenue} SALE • {payments.filter((p:any)=>p.status==="PENDING").length} PENDING</div></div></div>
<button onClick={()=>{setAuth(false); setP("");}} style={{background:"#111",border:"1px solid #333",color:"#666",padding:"6px 12px",borderRadius:999,fontSize:9}}>LOGOUT</button>
</div>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
{[{l:"TOTAL ORDERS",v:stats.total},{l:"TODAY",v:stats.today},{l:"ONLINE",v:stats.online},{l:"TOTAL SALE",v:`Rs.${stats.revenue}`},{l:"COMM 15%",v:`Rs.${stats.commission}`},{l:"CUSTOMERS",v:stats.users},{l:"SHOPS",v:stats.shops},{l:"PENDING "+OWNER_NUMBER,v:payments.filter((p:any)=>p.status==="PENDING").length}].map((x:any)=><div key={x.l} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:10,padding:10}}><div style={{fontSize:7,color:"#666"}}>{x.l}</div><div style={{fontSize:13,fontWeight:800,color:"#D4B78F"}}>{x.v}</div></div>)}
</div>

<div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:10}}>
{["payments","orders","riders","products","shops","customers","map","complaints"].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#D4B78F":"#111",color:tab===t?"#000":"#888",border:"1px solid #222",padding:"7px 12px",borderRadius:999,fontSize:9,fontWeight:800}}>{t.toUpperCase()}{t==="payments"&&payments.filter((p:any)=>p.status==="PENDING").length>0?` (${payments.filter((p:any)=>p.status==="PENDING").length})`:""}</button>)}
</div>

{tab==="payments"&&<div>
<div style={{background:"#ff000022",border:"1px solid #ff0000",padding:12,borderRadius:10,marginBottom:10}}>
<div style={{fontSize:12,fontWeight:900,color:"#ff4444"}}>⚠️ PAYMENT + DELETE - {OWNER_NUMBER} JazzCash/Easypaisa</div>
<div style={{fontSize:10,color:"#aaa",marginTop:4}}>VERIFY dabate hi: 1) Rider Unblock + Wallet 0, 2) Receipt Admin se Delete ho jayegi - Storage kabhi full nahi hoga - 4 din wala masla khatam</div>
</div>
{payments.length===0&&<div style={{background:"#0a0a0a",padding:20,borderRadius:12,textAlign:"center",color:"#666",fontSize:11}}>Koi payment nahi</div>}
{payments.map((p:any)=><div key={p.id} style={{background:p.status==="PENDING"?"#ff000022":"#0a0a0a",border:p.status==="PENDING"?"1px solid #ff0000":"1px solid #222",borderRadius:12,padding:12,marginBottom:8}}>
<div style={{display:"flex",justifyContent:"space-between",gap:10}}>
<div style={{flex:1}}><div style={{fontSize:12,fontWeight:800}}>{p.rider_phone} - Rs.{p.amount} - <span style={{color:p.status==="PENDING"?"#ff4444":"#00C851"}}>{p.status}</span></div>
<div style={{fontSize:9,color:"#888",marginTop:4}}>Owner: {p.owner_number||OWNER_NUMBER} • Order #{p.order_id||"-"} • {new Date(p.created_at).toLocaleString()}</div>
{p.screenshot_url&&<a href={p.screenshot_url} target="_blank" style={{fontSize:10,color:"#00BFFF",display:"inline-block",marginTop:6,background:"#000",padding:"4px 8px",borderRadius:999,border:"1px solid #222"}}>📸 Full Screenshot</a>}</div>
{p.screenshot_url?<img src={p.screenshot_url} style={{width:100,height:100,objectFit:"cover",borderRadius:10,border:"1px solid #444"}}/>:<div style={{width:100,height:100,background:"#111",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#666",border:"1px solid #222"}}>No Img</div>}
</div>
{p.status==="PENDING"&&<div style={{display:"flex",gap:6,marginTop:10}}><button onClick={()=>verifyPayment(p)} style={{flex:2,background:"#4CAF50",color:"#fff",padding:"12px",borderRadius:999,border:"none",fontSize:11,fontWeight:900}}>✓ VERIFY + DELETE RECEIPT + UNBLOCK</button><button onClick={()=>deleteReceiptOnly(p)} style={{flex:1,background:"#222",color:"#ff4444",border:"1px solid #ff444444",padding:"12px",borderRadius:999,fontSize:9}}>🗑️ ONLY DELETE</button></div>}
{p.status==="VERIFIED"&&<div style={{marginTop:8,fontSize:10,color:"#00C851",background:"#00C85111",padding:6,borderRadius:8}}>✅ Verified + Receipt Deleted + Wallet 0 - 4 din auto delete ho gaya</div>}
</div>)}
</div>}

{tab==="orders"&&orders.map((o:any)=>(<div key={o.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:8,display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:11,color:"#D4B78F"}}>ORDER #{o.id} • {o.status} • Rs.{o.total}</div></div><button onClick={()=>updateOrder(o.id,"delivered")} style={{background:"#00C851",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>DELIVERED</button></div>))}
{tab==="riders"&&riders.map((r:any)=>(<div key={r.id} style={{background:"#0a0a0a",border:r.is_blocked?"1px solid red":"1px solid #222",borderRadius:12,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}><div style={{fontSize:11}}>{r.name} • {r.phone} • {r.status} {r.is_blocked&&<span style={{color:"red"}}> BLOCKED Rs.{r.wallet}</span>}</div><button onClick={()=>unblockRiderNow(r.phone)} style={{background:"#00C851",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>UNBLOCK 0</button></div>))}
</div></div>
);
 }
