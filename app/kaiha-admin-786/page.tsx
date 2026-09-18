"use client";
import {useEffect,useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function Admin(){
const [orders,setOrders]:any=useState([]); const [riders,setRiders]:any=useState([]); const [tab,setTab]=useState("orders");
const [stats,setStats]=useState({total:0,today:0,online:0,revenue:0});

useEffect(()=>{
 fetchAll();
 const ch=supabase.channel("admin").on("postgres_changes",{event:"*",schema:"public",table:"orders"},()=>fetchAll()).subscribe();
 return()=>{supabase.removeChannel(ch);}
},[]);

const fetchAll=async()=>{
 const {data:o}=await supabase.from("orders").select("*").order("created_at",{ascending:false}).limit(100);
 const {data:r}=await supabase.from("riders").select("*");
 if(o){setOrders(o); const today=o.filter((x:any)=> new Date(x.created_at).toDateString()===new Date().toDateString()).length; const rev=o.reduce((s:any,v:any)=>s+(v.total||0),0); setStats({total:o.length,today,online:r?.filter((x:any)=>x.status==="ONLINE").length||0,revenue:rev});}
 if(r)setRiders(r);
};

const updateOrder=async(id:number,s:string, rider_id?:string)=>{
 await supabase.from("orders").update({status:s, rider_id}).eq("id",id);
 fetchAll();
};

return(
<div style={{background:"#000",minHeight:"100vh",color:"#fff",padding:12}}>
<div style={{maxWidth:1100,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0a0a0a",padding:"14px 18px",borderRadius:14,border:"1px solid #D4B78F33",marginBottom:14}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><img src="/k-logo.png" style={{height:32,width:32,borderRadius:6}}/><div><div style={{color:"#D4B78F",letterSpacing:".3em",fontSize:12,fontWeight:800}}>KAIHA ADMIN</div><div style={{fontSize:10,color:"#666"}}>SUKKUR 2026 • {new Date().toLocaleDateString()}</div></div></div>
<div style={{fontSize:10,color:"#888"}}>Admin: 786</div>
</div>

<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
{[
 {l:"TOTAL ORDERS",v:stats.total,c:"#D4B78F"},
 {l:"TODAY",v:stats.today,c:"#00C851"},
 {l:"ONLINE RIDERS",v:stats.online,c:"#00BFFF"},
 {l:"REVENUE",v:`Rs.${stats.revenue}`,c:"#fff"},
].map((x:any)=><div key={x.l} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:12}}><div style={{fontSize:9,color:"#666",letterSpacing:".2em"}}>{x.l}</div><div style={{fontSize:18,fontWeight:800,color:x.c,marginTop:4}}>{x.v}</div></div>)}
</div>

<div style={{display:"flex",gap:8,marginBottom:12,overflowX:"auto"}}>
{["orders","riders","shops","map"].map(t=><button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#D4B78F":"#111",color:tab===t?"#000":"#888",border:"1px solid #222",padding:"8px 16px",borderRadius:999,fontSize:10,fontWeight:800,textTransform:"uppercase"}}>{t}</button>)}
</div>

{tab==="orders"&&<div>
{orders.map((o:any)=>(
<div key={o.id} style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:14,padding:12,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
<div><div style={{fontSize:12,color:"#D4B78F"}}>#{o.id} • {o.status?.toUpperCase()} • Rs.{o.total}</div><div style={{fontSize:11,color:"#aaa",marginTop:2}}>{o.customer_name} • {o.customer_phone}</div><div style={{fontSize:10,color:"#666"}}>{o.location_text}</div></div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{o.status==="pending"&&riders.filter((r:any)=>r.status==="ONLINE").map((r:any)=><button key={r.id} onClick={()=>updateOrder(o.id,"assigned",r.id)} style={{background:"#D4B78F",color:"#000",border:"none",padding:"6px 10px",borderRadius:999,fontSize:9,fontWeight:800}}>Assign {r.name}</button>)}
{o.status==="assigned"&&<button onClick={()=>updateOrder(o.id,"on_the_way")} style={{background:"#00BFFF",color:"#fff",border:"none",padding:"6px 10px",borderRadius:999,fontSize:9}}>ON WAY</button>}
{o.status!=="delivered"&&<button onClick={()=>updateOrder(o.id,"delivered")} style={{background:"#00C851",color:"#fff",border:"none",padding:"6px 10px",borderRadius:999,fontSize:9}}>DELIVERED</button>}
<button onClick={()=>updateOrder(o.id,"cancelled")} style={{background:"#111",border:"1px solid #333",color:"#666",padding:"6px 10px",borderRadius:999,fontSize:9}}>CANCEL</button>
</div>
</div>
))}
</div>}

{tab==="riders"&&<div>
{riders.map((r:any)=>(
<div key={r.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:12,padding:12,marginBottom:8,display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontSize:12}}>{r.name} • {r.phone} • <span style={{color:r.status==="ONLINE"?"#00C851":"#888"}}>{r.status}</span></div><div style={{fontSize:10,color:"#666"}}>Earnings: Rs.{r.earnings||0} • ID: {r.id?.slice(0,8)}</div></div>
<div style={{display:"flex",gap:6}}><a href={`tel:${r.phone}`} style={{background:"#111",border:"1px solid #333",color:"#fff",padding:"6px 10px",borderRadius:999,fontSize:9,textDecoration:"none"}}>CALL</a></div>
</div>
))}
</div>}

{tab==="map"&&<div style={{background:"#0a0a0a",border:"1px dashed #D4B78F44",borderRadius:14,padding:40,textAlign:"center",color:"#666",fontSize:11}}>Live Map - Riders: {riders.filter((r:any)=>r.lat).length} online with location<br/>Google Maps Embed yahan ayega</div>}

{tab==="shops"&&<div style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:14,padding:20,textAlign:"center",color:"#666",fontSize:11}}>Shops Management - Connect with shops table</div>}
</div>
</div>
);
                                                                                                                                                                                              }
