"use client";
import {useEffect,useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";

export default function Rider(){
const [rider,setRider]:any=useState(null);
const [orders,setOrders]:any=useState([]);
const [online,setOnline]=useState(false);

useEffect(()=>{
const r=localStorage.getItem("kaiha_rider");
if(!r){location.href="/rider/login";return;}
const rd=JSON.parse(r);setRider(rd);
setOnline(rd.status==="ONLINE");
fetchOrders(rd.phone || rd.id); // FIX 1 - phone bhi check
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
if(newStatus==="ONLINE"&&navigator.geolocation){
await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude;lng=p.coords.longitude;res(1);},()=>res(1)));
}
// FIX 2 - upsert use kiya taake rider create bhi ho jaye
await supabase.from("riders").upsert({id:rider.phone, phone:rider.phone, name:rider.name, status:newStatus,lat,lng, earnings:rider.earnings||0});
setOnline(newStatus==="ONLINE");
const nr={...rider,status:newStatus,lat,lng};setRider(nr);localStorage.setItem("kaiha_rider",JSON.stringify(nr));
};

const updateStatus=async(id:number,s:string)=>{
await supabase.from("orders").update({status:s}).eq("id",id);
setOrders((o:any)=>o.map((x:any)=>x.id===id?{...x,status:s}:x));
if(s==="delivered"){
const newEarn=(rider.earnings||0)+150;
await supabase.from("riders").update({earnings:newEarn}).eq("phone",rider.phone);
const nr={...rider,earnings:newEarn}; setRider(nr); localStorage.setItem("kaiha_rider",JSON.stringify(nr)); // FIX 3 - earning screen pe foran update
}
};

if(!rider)return null;
return(
<div style={{background:"#000",minHeight:"100vh",color:"#fff",padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",maxWidth:"420px",margin:"0 auto 16px",background:"#0a0a0a",padding:"12px 16px",borderRadius:"14px",border:"1px solid #D4B78F33"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<img src={LOGO} style={{height:"32px",width:"32px",borderRadius:"6px"}}/>
<div><div style={{color:"#D4B78F",letterSpacing:"0.2em",fontSize:"12px",fontWeight:"700"}}>KAIHA RIDER</div><div style={{fontSize:"10px",color:"#aaa"}}>{rider.name} • Rs.{rider.earnings||0}</div></div>
</div>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}>
<button onClick={toggleOnline} style={{background:online?"#00C851":"#333",color:online?"#fff":"#888",border:"none",padding:"8px 14px",borderRadius:"999px",fontSize:"10px",fontWeight:"800"}}>{online?"ONLINE":"OFFLINE"}</button>
<button onClick={()=>{localStorage.removeItem("kaiha_rider");location.href="/rider/login";}} style={{background:"#111",border:"1px solid #333",color:"#888",padding:"6px 10px",borderRadius:"999px",fontSize:"10px"}}>LOGOUT</button>
</div>
</div>
<div style={{maxWidth:"420px",margin:"0 auto"}}>
{!online&&<div style={{background:"#D4B78F11",border:"1px dashed #D4B78F44",padding:"12px",borderRadius:"12px",textAlign:"center",fontSize:"11px",color:"#D4B78F",marginBottom:"12px"}}>GO ONLINE karo - tab hi orders ayenge</div>}
{orders.length===0&&<div style={{textAlign:"center",color:"#555",fontSize:"12px",marginTop:"40px"}}>No orders yet.<br/>Online raho.</div>}
{orders.map((o:any)=>(
<div key={o.id} style={{background:"#0a0a0a",border:"1px solid #222",borderRadius:"16px",padding:"14px",marginBottom:"12px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}><span style={{fontSize:"12px",color:"#D4B78F"}}>ORDER #{o.id}</span><span style={{fontSize:"10px",background:o.status==="delivered"?"#00C85133":"#D4B78F22",color:o.status==="delivered"?"#00C851":"#D4B78F",padding:"4px 8px",borderRadius:"999px"}}>{o.status.toUpperCase()}</span></div>
<div style={{fontSize:"13px"}}>{o.customer_name} • {o.customer_phone}</div>
<div style={{fontSize:"11px",color:"#888",marginTop:"4px"}}>{o.location_text}</div>
<div style={{fontSize:"11px",color:"#aaa",marginTop:"6px"}}>{o.items?.map((i:any)=>`${i.name} x${i.qty}`).join(", ")} • Rs.{o.total}</div>
<div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
{o.status==="assigned"&&<button onClick={()=>updateStatus(o.id,"on_the_way")} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>PICK UP</button>}
{o.status==="on_the_way"&&<button onClick={()=>updateStatus(o.id,"delivered")} style={{flex:1,background:"#00C851",color:"#fff",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>DELIVERED - Rs.150</button>}
<a href={`https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}`} target="_blank" style={{flex:1,background:"#111",border:"1px solid #333",color:"#fff",textAlign:"center",padding:"10px",borderRadius:"999px",fontSize:"11px",textDecoration:"none"}}>MAP</a>
<a href={`tel:${o.customer_phone}`} style={{flex:1,background:"#111",border:"1px solid #333",color:"#fff",textAlign:"center",padding:"10px",borderRadius:"999px",fontSize:"11px",textDecoration:"none"}}>CALL</a>
</div>
</div>
))}
</div>
<div style={{textAlign:"center",marginTop:"20px",fontSize:"9px",color:"#444",letterSpacing:"0.2em"}}>KAIHA - SUKKUR 2026</div>
</div>
);
 }
