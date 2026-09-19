"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png"; const OWNER_NUMBER="03320821575";

export default function Rider(){
const [mn,setMn]=useState(false); const [orders,setOrders]=useState<any[]>([]);
const [status,setStatus]=useState("OFFLINE"); const [earning,setEarning]=useState(0);
const [activeOrder,setActiveOrder]=useState<any>(null); const [rider,setRider]=useState<any>(null);
const [isBlocked,setIsBlocked]=useState(false); const [blockedAmount,setBlockedAmount]=useState(0);
const [deadline,setDeadline]=useState<any>(null); const [timeLeft,setTimeLeft]=useState("");

useEffect(()=>{
 const r=localStorage.getItem("kaiha_rider"); if(!r){location.href="/rider/login"; return;}
 const rd=JSON.parse(r); setRider(rd); setEarning(rd.earnings||0); setStatus(rd.status||"OFFLINE");
 checkBlockStatus(rd.phone); loadRealOrders(rd.phone);
},[]);

const checkBlockStatus=async(id:string)=>{
 const {data}=await supabase.from("rider_payments").select("*").eq("rider_id",id).eq("status","PENDING").order("created_at",{ascending:false}).limit(1);
 if(data&&data.length>0){ setIsBlocked(true); setBlockedAmount(data[0].amount); setDeadline(data[0].deadline); }
};
useEffect(()=>{
 if(!deadline) return; const iv=setInterval(()=>{
  const diff=new Date(deadline).getTime()-Date.now();
  if(diff<=0){setTimeLeft("TIME OVER - JOB LOST"); return;}
  setTimeLeft(`${Math.floor(diff/3600000)}h ${Math.floor(diff%3600000/60000)}m LEFT`);
 },1000); return()=>clearInterval(iv);
},[deadline]);

const loadRealOrders=async(id:string)=>{
 const {data}=await supabase.from("orders").select("*").is("rider_id",null).eq("status","PENDING").limit(5);
 if(data) setOrders(data.map((o:any)=>({id:o.id, customer_name:o.buyer_name||"Customer", total:o.price, location_text:o.location_text, customer_phone:o.buyer_phone||"03XX", items:o.product_name, raw:o, dist:"1.5 km"})));
};

const toggleStatus=async()=>{
 if(isBlocked) return alert(`BLOCKED! Rs.${blockedAmount} transfer karo ${OWNER_NUMBER} pe!`);
 const ns=status==="OFFLINE"?"ONLINE":"OFFLINE"; let lat=0,lng=0;
 if(ns==="ONLINE"&&navigator.geolocation){ await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1))); }
 if(rider){ await supabase.from("riders").upsert({phone:rider.phone, status:ns, lat, lng, earnings:earning}); localStorage.setItem("kaiha_rider", JSON.stringify({...rider,status:ns})); }
 setStatus(ns); if(ns==="ONLINE") loadRealOrders(rider.phone);
};
const acceptOrder=async(o:any)=>{ await supabase.from("orders").update({status:"on_the_way", rider_id:rider.phone}).eq("id",o.raw.id); setActiveOrder(o); setOrders(orders.filter((x:any)=>x.id!==o.id)); setStatus("DELIVERING"); };
const completeOrder=async()=>{
 const amount=activeOrder.raw.price||activeOrder.total;
 await supabase.from("orders").update({status:"delivered"}).eq("id",activeOrder.raw.id);
 await supabase.from("rider_payments").insert({rider_id:rider.phone, order_id:activeOrder.raw.id, amount, status:"PENDING", deadline:new Date(Date.now()+7*60*60*1000).toISOString()});
 await supabase.from("riders").update({earnings:earning+150, is_blocked:true, blocked_amount:amount}).eq("phone",rider.phone);
 setIsBlocked(true); setBlockedAmount(amount); setActiveOrder(null); alert(`Delivered! AB ${OWNER_NUMBER} pe Rs.${amount} transfer karo!`);
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>

{isBlocked&&<div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.96)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
<div style={{background:"#141414",border:"2px solid #FF2222",borderRadius:"20px",padding:"20px",width:"100%",textAlign:"center"}}>
<div style={{fontSize:"40px"}}>⛔</div><div style={{color:"#FF2222",fontWeight:"900",marginTop:"8px"}}>BLOCKED - Rs.{blockedAmount}</div>
<div style={{background:"#000",border:"1px solid #D4B78F",borderRadius:"10px",padding:"10px",marginTop:"10px"}}><div style={{fontSize:"10px",color:"#D4B78F"}}>TRANSFER HERE</div><div style={{fontSize:"18px",fontWeight:"900",color:"#4CAF50"}}>{OWNER_NUMBER}</div><div style={{fontSize:"9px",color:"#888"}}>Easypaisa/JazzCash - {timeLeft}</div></div>
<button onClick={async()=>{await supabase.from("rider_payments").update({status:"PAID"}).eq("rider_id",rider.phone).eq("status","PENDING"); await supabase.from("riders").update({is_blocked:false}).eq("phone",rider.phone); setIsBlocked(false);}} style={{width:"100%",marginTop:"12px",background:"#4CAF50",color:"#fff",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"900"}}>I TRANSFERRED</button>
</div></div>}

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",background:"rgba(10,10,10,0.96)",position:"sticky",top:0,zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={LOGO} style={{height:"42px",width:"42px",borderRadius:"10px"}}/><div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"13px"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:status==="ONLINE"?"#4CAF50":"#ff4444"}}>● {status}</div></div></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px"}}><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none"}}></span><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1}}></span><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none"}}></span></button>
</div>

{mn&&<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"82%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",overflowY:"auto"}}>
<div style={{color:"#D4B78F",fontWeight:"800"}}>RIDER MENU - Chat & More</div>
<div style={{marginTop:"14px"}}>
{[
{l:"🏠 Dashboard",a:()=>setMn(false)},
{l:`📞 Call Customer ${activeOrder?`- ${activeOrder.customer_phone}`:""}`,a:()=>{const num=activeOrder?.customer_phone||prompt("Customer number:"); if(num) window.open(`tel:${num}`);}},
{l:"💬 WhatsApp Customer",a:()=>{const num=activeOrder?.customer_phone||prompt("Customer WhatsApp:"); if(num) window.open(`https://wa.me/${num.replace(/[^0-9]/g,"")}?text=Salam, Kaiha Rider bol raha hun, apka order leke araha hun`);}},
{l:"💬 Chat with Admin - Hadi",a:()=>window.open(`https://wa.me/923320821575?text=Rider ${rider?.name} bol raha`)},
{l:"📍 Share My Live Location",a:()=>navigator.geolocation.getCurrentPosition(p=>{const u=`https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`; window.open(`https://wa.me/?text=My Live Location: ${u}`);})},
{l:"🗺️ Customer Location on Map",a:()=>{const loc=activeOrder?.location_text||prompt("Customer address:"); if(loc) window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`);}},
{l:"📅 Chutti / Off Request",a: async()=>{const t=prompt("Wajah: PERSONAL/FAMILY/EMERGENCY?"); const r=prompt(`${t} detail:`); if(r){await supabase.from("rider_leaves").insert({rider_id:rider.phone,rider_name:rider.name,leave_type:t,reason:r}); alert("Admin ko bhej di!"); setMn(false);}}},
{l:"📊 My Leaves History",a: async()=>{const {data}=await supabase.from("rider_leaves").select("*").eq("rider_id",rider.phone).limit(5); alert(data?.length?data.map((d:any)=>`${d.leave_type}:${d.reason}`).join("\n"):"No leaves");}},
{l:"💰 Earnings - Rs."+earning,a:()=>{}},
{l:"🛍️ Back to Shop",a:()=>location.href="/"},
{l:"🚪 Logout",a:()=>{localStorage.removeItem("kaiha_rider"); location.href="/rider/login";}},
].map((it:any,i)=><div key={i} onClick={it.a} style={{padding:"12px",borderRadius:"10px",border:"1px solid #222",marginTop:"8px",background:"#141414",display:"flex",justifyContent:"space-between",cursor:"pointer"}}><span style={{fontSize:"12px",color:"#ccc"}}>{it.l}</span><span style={{color:"#D4B78F"}}>→</span></div>)}
</div></div></div>}

<div style={{padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",justifyContent:"space-between",border:"1px solid #222"}}><div><div style={{fontSize:"10px",color:"#888"}}>STATUS</div><div style={{fontWeight:"800",color:status==="ONLINE"?"#4CAF50":"#888"}}>{status}</div></div><button onClick={toggleStatus} style={{background:status==="OFFLINE"?"#D4B78F":"#222",color:status==="OFFLINE"?"#000":"#fff",border:"none",padding:"10px 18px",borderRadius:"999px",fontWeight:"800"}}>{status==="OFFLINE"?"GO ONLINE":"GO OFFLINE"}</button></div>

{activeOrder&&<div style={{marginTop:"14px",background:"#1A1A1A",border:"1px solid #D4B78F66",borderRadius:"14px",padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"12px"}}>ACTIVE: #{activeOrder.id}</b><span style={{fontSize:"10px",background:"#D4B78F",color:"#000",padding:"4px 8px",borderRadius:"999px"}}>{activeOrder.customer_phone}</span></div>
<div style={{marginTop:"8px",fontSize:"11px"}}>👤 {activeOrder.customer_name} - Rs.{activeOrder.total}<br/>📍 {activeOrder.location_text}</div>
<div style={{display:"flex",gap:"6px",marginTop:"10px"}}>
<button onClick={()=>window.open(`tel:${activeOrder.customer_phone}`)} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>📞 CALL</button>
<button onClick={()=>window.open(`https://wa.me/${activeOrder.customer_phone.replace(/[^0-9]/g,"")}`)} style={{flex:1,background:"#25D366",border:"none",color:"#fff",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>💬 WHATSAPP</button>
<button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.location_text)}`)} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>🗺️ MAP</button>
</div>
<button onClick={completeOrder} style={{width:"100%",marginTop:"10px",background:"#4CAF50",color:"#fff",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>✅ DELIVERED - Paise Liye</button>
</div>}

<div style={{marginTop:"16px"}}><b style={{fontSize:"12px"}}>New Orders ({orders.length})</b>
{orders.map((o:any)=><div key={o.id} style={{background:"#141414",borderRadius:"12px",padding:"12px",marginTop:"8px",border:"1px solid #222"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"11px",fontWeight:"700"}}>#{o.id} {o.customer_name}</span><span style={{fontSize:"9px",background:"#1a1a1a",padding:"4px 6px",borderRadius:"999px"}}>📞 {o.customer_phone}</span></div>
<div style={{fontSize:"11px",color:"#D4B78F",marginTop:"4px"}}>Rs.{o.total} - {o.items}</div>
<div style={{fontSize:"9px",color:"#777",marginTop:"4px"}}>📍 {o.location_text}</div>
<div style={{display:"flex",gap:"6px",marginTop:"8px"}}><button onClick={()=>acceptOrder(o)} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"9px",borderRadius:"999px",fontWeight:"800",fontSize:"10px"}}>ACCEPT Rs.150</button><button onClick={()=>window.open(`tel:${o.customer_phone}`)} style={{background:"#222",border:"1px solid #333",color:"#fff",padding:"9px 12px",borderRadius:"999px",fontSize:"10px"}}>📞</button></div>
</div>)}
</div>
</div></div></div>
);
   }
