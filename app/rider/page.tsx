"use client";
import {useEffect,useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function Rider(){
const [rider,setRider]:any=useState(null);
const [orders,setOrders]:any=useState([]);
const [online,setOnline]=useState(false);

useEffect(()=>{
const r=localStorage.getItem("kaiha_rider");
if(!r){location.href="/rider/login";return;}
const rd=JSON.parse(r);setRider(rd);
setOnline(rd.status==="ONLINE");
fetchOrders(rd.phone || rd.id);
const ch=supabase.channel("orders").on("postgres_changes",{event:"*",schema:"public",table:"orders"},(p:any)=>{
 if(p.new && (p.new.rider_id===rd.phone || p.new.rider_id===rd.id)){
  fetchOrders(rd.phone || rd.id);
  try{ new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_62b4a0b9d3.mp3").play(); }catch{}
 }
}).subscribe();
return()=>{supabase.removeChannel(ch);};
},[]);

const fetchOrders=async(id:string)=>{
const {data}=await supabase.from("orders").select("*").or(`rider_id.eq.${id}`).order("created_at",{ascending:false});
if(data)setOrders(data);
};

const toggleOnline=async()=>{
if(!rider)return;
const newStatus=online?"OFFLINE":"ONLINE";
let lat=0,lng=0;
if(newStatus==="ONLINE" && navigator.geolocation){
await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude;lng=p.coords.longitude;res(1);},()=>res(1)));
}
await supabase.from("riders").upsert({id:rider.phone, phone:rider.phone, name:rider.name, status:newStatus, lat, lng, earnings:rider.earnings||0});
setOnline(newStatus==="ONLINE");
const nr={...rider,status:newStatus,lat,lng};setRider(nr);localStorage.setItem("kaiha_rider",JSON.stringify(nr));
};

const updateStatus=async(id:number,s:string)=>{
await supabase.from("orders").update({status:s}).eq("id",id);
setOrders((o:any)=>o.map((x:any)=>x.id===id?{...x,status:s}:x));
if(s==="delivered"){
const newEarn=(rider.earnings||0)+150;
await supabase.from("riders").update({earnings:newEarn}).eq("phone",rider.phone);
const nr={...rider,earnings:newEarn}; setRider(nr); localStorage.setItem("kaiha_rider",JSON.stringify(nr));
}
};

if(!rider)return null;
return(
<div style={{background:"#000",minHeight:"100vh",color:"#fff",padding:16}}>
<div style={{display:"flex",justifyContent:"space-between",maxWidth:420,margin:"0 auto 16px",background:"#0a0a0a",padding:12,borderRadius:14,border:"1px solid #D4B78F33"}}>
<div><div style={{color:"#D4B78F",fontSize:12,fontWeight:800}}>KAIHA RIDER - {rider.name}</div><div style={{fontSize:10,color:online?"#00C851":"#888"}}>● {online?"ONLINE":"OFFLINE"} • Rs.{rider.earnings||0}</div></div>
<button onClick={toggleOnline} style={{background:online?"#ff4444":"#00C851",color:"#fff",border:"none",padding:"8px 14px",borderRadius:999,fontSize:10,fontWeight:800}}>{online?"OFFLINE":"GO ONLINE"}</button>
</div>
<div style={{maxWidth:420,margin:"0 auto"}}>
{orders.map((o:any)=>(
<div key={o.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:16,padding:14,marginBottom:12}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#D4B78F"}}>ORDER #{o.id}</span><span style={{fontSize:10,background:"#D4B78F22",color:"#D4B78F",padding:"4px 8px",borderRadius:999}}>{o.status.toUpperCase()}</span></div>
<div style={{fontSize:13,marginTop:6}}>{o.customer_name} • {o.customer_phone}</div>
<div style={{fontSize:11,color:"#888"}}>{o.location_text}</div>
<div style={{display:"flex",gap:8,marginTop:12}}>
{o.status==="assigned"&&<button onClick={()=>updateStatus(o.id,"on_the_way")} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:10,borderRadius:999,fontWeight:800,fontSize:11}}>PICK UP</button>}
{o.status==="on_the_way"&&<button onClick={()=>updateStatus(o.id,"delivered")} style={{flex:1,background:"#00C851",color:"#fff",border:"none",padding:10,borderRadius:999,fontWeight:800,fontSize:11}}>DELIVERED +150</button>}
<a href={`https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}`} target="_blank" style={{flex:1,background:"#111",border:"1px solid #333",color:"#fff",textAlign:"center",padding:10,borderRadius:999,fontSize:11,textDecoration:"none"}}>MAP</a>
<a href={`tel:${o.customer_phone}`} style={{flex:1,background:"#111",border:"1px solid #333",color:"#fff",textAlign:"center",padding:10,borderRadius:999,fontSize:11,textDecoration:"none"}}>CALL</a>
</div>
</div>
))}
{orders.length===0&&<div style={{textAlign:"center",color:"#555",marginTop:40,fontSize:12}}>No orders - Go ONLINE raho</div>}
</div>
</div>
);
  }
