"use client";
import {useEffect,useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const ADMIN_PASS = "KAIHA#Sukkur@786!$%_X9zQ7-L2mK8^pW4";

export default function Admin(){
const [auth,setAuth]=useState(false); const [p,setP]=useState(""); const [err,setErr]=useState("");
const [tab,setTab]=useState("orders");
const [orders,setOrders]:any=useState([]); const [riders,setRiders]:any=useState([]); const [shops,setShops]:any=useState([]); const [customers,setCustomers]:any=useState([]); const [complaints,setComplaints]:any=useState([]);
const [stats,setStats]=useState({total:0,today:0,online:0,revenue:0,commission:0,users:0,shops:0});

useEffect(()=>{
 if(localStorage.getItem("kaiha_admin_secure")==="OK"){setAuth(true); loadAll();}
},[]);

const login=()=>{ if(p===ADMIN_PASS){localStorage.setItem("kaiha_admin_secure","OK"); setAuth(true); loadAll();} else setErr("Wrong Password!"); };

const loadAll=async()=>{
 const {data:o}=await supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(200);
 const {data:r}=await supabase.from("riders").select("*");
 const {data:s}=await supabase.from("shops").select("*");
 const {data:c}=await supabase.from("customers").select("*");
 const {data:comp}=await supabase.from("complaints").select("*").order("created_at",{ascending:false}).limit(50);
 if(o){const today=o.filter((x:any)=>new Date(x.created_at).toDateString()===new Date().toDateString()).length; const rev=o.reduce((a:any,b:any)=>a+(b.total||0),0); setStats({total:o.length,today,online:r?.filter((x:any)=>x.status==="ONLINE").length||0,revenue:rev,commission:Math.floor(rev*0.15),users:c?.length||0,shops:s?.length||0}); setOrders(o);}
 if(r)setRiders(r); if(s)setShops(s); if(c)setCustomers(c); if(comp)setComplaints(comp);
};

const updateOrder=async(id:number,s:string)=>{ await supabase.from("orders").update({status:s}).eq("id",id); loadAll(); };
const toggleRider=async(id:string,status:string)=>{ await supabase.from("riders").update({status:status==="BANNED"?"OFFLINE":"BANNED"}).eq("id",id); loadAll(); };
const toggleShop=async(id:string,status:string)=>{ await supabase.from("shops").update({status:status==="BANNED"?"ACTIVE":"BANNED"}).eq("id",id); loadAll(); };

if(!auth){
return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<div style={{background:"#0a0a0a",width:360,padding:28,borderRadius:20,border:"1px solid #D4B78F44",textAlign:"center"}}>
<div style={{fontSize:40}}>🔒</div><div style={{color:"#D4B78F",letterSpacing:".3em",fontSize:12,fontWeight:800,marginTop:8}}>KAIHA SECURE ADMIN</div>
<input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password" style={{width:"100%",marginTop:16,background:"#111",border:"1px solid #333",padding:12,borderRadius:10,color:"#fff"}}/>
{err&&<div style={{color:"red",fontSize:11,marginTop:8}}>{err}</div>}
<button onClick={login} style={{width:"100%",background:"#D4B78F",color:"#000",padding:12,borderRadius:999,marginTop:12,fontWeight:800,border:"none"}}>UNLOCK</button>
</div>
</div>
);
}

return(
<div style={{background:"#000",minHeight:"100vh",color:"#fff",padding:10}}>
<div style={{maxWidth:1200,margin:"0 auto"}}>

<div style={{display:"flex",justifyContent:"space-between",background:"#0a0a0a",padding:12,borderRadius:14,border:"1px solid #D4B78F33",marginBottom:10}}>
<div style={{display:"flex",gap:10,alignItems:"center"}}><img src="/k-logo.png" style={{height:32,width:32,borderRadius:6}}/><div><div style={{color:"#D4B78F",fontSize:12,fontWeight:800,letterSpacing:".2em"}}>KAIHA ADMIN - FULL CONTROL</div><div style={{fontSize:9,color:"#00C851"}}>● LIVE • {stats.online} ONLINE • Rs.{stats.revenue} SALE • Rs.{stats.commission} COMMISSION</div></div></div>
<button onClick={()=>{localStorage.removeItem("kaiha_admin_secure"); location.reload();}} style={{background:"#111",border:"1px solid #333",color:"#666",padding:"6px 12px",borderRadius:999,fontSize:9}}>LOGOUT</button>
</div>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
{[{l:"TOTAL ORDERS",v:stats.total},{l:"TODAY",v:stats.today},{l:"ONLINE RIDERS",v:stats.online},{l:"TOTAL SALE",v:`Rs.${stats.revenue}`},{l:"KAIHA COMMISSION 15%",v:`Rs.${stats.commission}`},{l:"CUSTOMERS",v:stats.users},{l:"SHOPS",v:stats.shops},{l:"COMPLAINTS",v:complaints.length}].map((x:any)=><div key={x.l} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:10,padding:10}}><div style={{fontSize:7,color:"#666"}}>{x.l}</div><div style={{fontSize:13,fontWeight:800,color:"#D4B78F"}}>{x.v}</div></div>)}
</div>

<div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:10}}>
{["orders","riders","shops","revenue","customers","map","complaints","settings"].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#D4B78F":"#111",color:tab===t?"#000":"#888",border:"1px solid #222",padding:"7px 12px",borderRadius:999,fontSize:9,fontWeight:800}}>{t.toUpperCase()}</button>)}
</div>

{tab==="orders"&&orders.map((o:any)=>(
<div key={o.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:8,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
<div><div style={{fontSize:11,color:"#D4B78F"}}>ORDER #{o.id} • {o.status?.toUpperCase()} • Rs.{o.total} • {o.location_text}</div><div style={{fontSize:10,color:"#aaa"}}>{o.customer_name} • {o.customer_phone} • {new Date(o.created_at).toLocaleString()}</div></div>
<div style={{display:"flex",gap:5}}><button onClick={()=>updateOrder(o.id,"on_the_way")} style={{background:"#00BFFF",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>ON WAY</button><button onClick={()=>updateOrder(o.id,"delivered")} style={{background:"#00C851",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>DELIVERED</button><button onClick={()=>updateOrder(o.id,"cancelled")} style={{background:"#111",border:"1px solid #333",color:"#888",padding:"5px 8px",borderRadius:999,fontSize:8}}>CANCEL</button></div>
</div>
))}

{tab==="riders"&&riders.map((r:any)=>(
<div key={r.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontSize:11}}>{r.name} • {r.phone} • <span style={{color:r.status==="ONLINE"?"#00C851":r.status==="BANNED"?"red":"#888"}}>{r.status}</span></div><div style={{fontSize:9,color:"#666"}}>Earn: Rs.{r.earnings||0} • {r.lat?`📍 ${r.lat.toFixed(3)},${r.lng?.toFixed(3)}`:"No location"}</div></div>
<div style={{display:"flex",gap:5}}><a href={`tel:${r.phone}`} style={{background:"#111",border:"1px solid #333",color:"#fff",padding:"5px 8px",borderRadius:999,fontSize:8,textDecoration:"none"}}>CALL</a><button onClick={()=>toggleRider(r.id,r.status)} style={{background:r.status==="BANNED"?"#00C851":"#ff4444",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>{r.status==="BANNED"?"UNBAN":"BAN"}</button></div>
</div>
))}

{tab==="shops"&&shops.map((s:any)=>(
<div key={s.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontSize:11}}>{s.name} • {s.phone} • <span style={{color:s.status==="BANNED"?"red":"#00C851"}}>{s.status||"ACTIVE"}</span></div><div style={{fontSize:9,color:"#666"}}>Sale: Rs.{s.total_sale||0}</div></div>
<button onClick={()=>toggleShop(s.id,s.status)} style={{background:s.status==="BANNED"?"#00C851":"#ff4444",color:"#fff",border:"none",padding:"5px 8px",borderRadius:999,fontSize:8}}>{s.status==="BANNED"?"UNBAN":"BAN SHOP"}</button>
</div>
))}

{tab==="revenue"&&<div style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:14,padding:16}}><div style={{fontSize:12,color:"#D4B78F"}}>TOTAL SALE: Rs.{stats.revenue}</div><div style={{fontSize:12,color:"#00C851",marginTop:6}}>KAIHA COMMISSION (15%): Rs.{stats.commission}</div><div style={{fontSize:10,color:"#666",marginTop:10}}>Riders ko 85% jata hai: Rs.{stats.revenue - stats.commission}</div></div>}

{tab==="customers"&&customers.map((c:any)=>(
<div key={c.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:6}}><div style={{fontSize:11}}>{c.name} • {c.phone}</div><div style={{fontSize:9,color:"#666"}}>{c.email||"No email"} • Orders: {orders.filter((o:any)=>o.customer_phone===c.phone).length}</div></div>
))}

{tab==="map"&&<div style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:14,padding:16}}><div style={{fontSize:11,color:"#D4B78F",marginBottom:8}}>LIVE RIDERS MAP - {riders.filter((r:any)=>r.lat).length} Riders with location</div>{riders.filter((r:any)=>r.lat).map((r:any)=><div key={r.id} style={{fontSize:10,marginBottom:4}}><a href={`https://www.google.com/maps?q=${r.lat},${r.lng}`} target="_blank" style={{color:"#00BFFF"}}>📍 {r.name} - {r.lat.toFixed(4)},{r.lng?.toFixed(4)} - {r.status}</a></div>)} </div>}

{tab==="complaints"&&complaints.map((c:any)=>(
<div key={c.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:10,marginBottom:6}}><div style={{fontSize:11,color:"#ffaa00"}}>{c.type} - Order #{c.order_id}</div><div style={{fontSize:10,color:"#aaa"}}>{c.message}</div><div style={{fontSize:9,color:"#666"}}>{new Date(c.created_at).toLocaleString()}</div></div>
))}

{tab==="settings"&&<div style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:14,padding:16}}><div style={{fontSize:11,color:"#D4B78F"}}>SETTINGS</div><div style={{fontSize:10,color:"#aaa",marginTop:8}}>• Change Admin Password: ADMIN_PASS variable<br/>• Delivery Charge: Rs.150<br/>• Commission: 15%<br/>• Support: kaiha.com<br/>• Version: KAIHA 2026 v2.0</div></div>}

</div>
</div>
);
  }
