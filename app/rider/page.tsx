"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";

export default function Rider(){
const [mn,setMn]=useState(false);
const [orders,setOrders]=useState<any[]>([]);
const [status,setStatus]=useState("OFFLINE");
const [earning,setEarning]=useState(0);
const [activeOrder,setActiveOrder]=useState<any>(null);
const [rider,setRider]=useState<any>(null);

useEffect(()=>{
 const r=localStorage.getItem("kaiha_rider");
 if(!r){location.href="/rider/login"; return;}
 const rd=JSON.parse(r); setRider(rd); setEarning(rd.earnings||0); setStatus(rd.status||"OFFLINE");
 loadRealOrders(rd.phone || rd.id);
 const ch=supabase.channel("live-orders").on("postgres_changes",{event:"*",schema:"public",table:"orders"},()=>loadRealOrders(rd.phone || rd.id)).subscribe();
 return()=>{supabase.removeChannel(ch);}
},[]);

const loadRealOrders=async(id:string)=>{
 const {data}=await supabase.from("orders").select("*").eq("rider_id",id).order("created_at",{ascending:false});
 if(data && data.length>0){
  setOrders(data.filter((o:any)=>o.status==="assigned"));
  const active=data.find((o:any)=>o.status==="on_the_way");
  if(active) setActiveOrder(active);
 } else {
  // Agar koi real order nahi, to aapka mock dikhao taake design khali na lage
  setOrders([
   {id:1001,customer_name:"Hadi - Sukkur",items:[{name:"Male T-Shirt x2"}],total:14000,location_text:"Sukkur, Sindh",payment:"Cash - Hand to Hand", dist:"2.3 km", status:"assigned", isMock:true},
  ]);
 }
};

const toggleStatus=async()=>{
 const newStatus=status==="OFFLINE"?"ONLINE":"OFFLINE";
 let lat=0,lng=0;
 if(newStatus==="ONLINE" && navigator.geolocation){
  await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1)));
 }
 if(rider){
  await supabase.from("riders").upsert({id:rider.phone, phone:rider.phone, name:rider.name, status:newStatus, lat, lng, earnings:earning});
  const nr={...rider, status:newStatus}; localStorage.setItem("kaiha_rider", JSON.stringify(nr));
 }
 setStatus(newStatus);
 if(newStatus==="ONLINE") loadRealOrders(rider.phone || rider.id);
};

const acceptOrder=async(o:any)=>{
 if(o.isMock){ setActiveOrder(o); setStatus("DELIVERING"); return; }
 await supabase.from("orders").update({status:"on_the_way"}).eq("id",o.id);
 setActiveOrder(o); setStatus("DELIVERING"); setOrders(orders.filter((x:any)=>x.id!==o.id));
};

const completeOrder=async()=>{
 if(!activeOrder) return;
 if(!activeOrder.isMock){
  await supabase.from("orders").update({status:"delivered"}).eq("id",activeOrder.id);
 }
 const newEarn=earning+150;
 setEarning(newEarn);
 if(rider){
  await supabase.from("riders").update({earnings:newEarn}).eq("phone",rider.phone);
  const nr={...rider, earnings:newEarn}; localStorage.setItem("kaiha_rider", JSON.stringify(nr));
 }
 setOrders(orders.filter((x:any)=>x.id!==activeOrder.id));
 setActiveOrder(null); setStatus("ONLINE");
 alert(`✅ Delivered! Rs. 150 earned. Total: Rs.${newEarn}`);
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%{box-shadow:0 0 0 0 #D4B78F66}70%{box-shadow:0 0 0 10px #D4B78F00}100%{box-shadow:0 0 0 0 #D4B78F00}}.page{animation:fadeUp 0.45s ease}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",backdropFilter:"blur(12px)",zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}><img src={LOGO} style={{height:"48px",width:"48px",borderRadius:"10px"}}/><div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"14px",fontFamily:"Montserrat"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:status==="OFFLINE"?"#ff4444":status==="ONLINE"?"#4CAF50":"#D4B78F"}}>● {status}</div></div></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"all 0.3s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1,transition:"all 0.25s ease"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"all 0.3s ease"}}></span>
</button></div>
{mn&&<div style={{position:"fixed",inset:0,zIndex:99,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"78%",background:"#0E0E0E",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33"}}><div style={{color:"#D4B78F"}}>KAIHA RIDER MENU</div><div style={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"10px"}}><div style={{background:"#141414",padding:"12px",borderRadius:"10px",border:"1px solid #222"}}>Earnings: Rs. {earning.toLocaleString()}</div><div style={{background:"#141414",padding:"12px",borderRadius:"10px",border:"1px solid #222"}}>Name: {rider?.name}</div><a href="/" style={{background:"#D4B78F",color:"#000",padding:"12px",borderRadius:"999px",textAlign:"center",textDecoration:"none",fontWeight:"800"}}>Back to Shop</a></div></div></div>}
<div className="page" style={{padding:"16px"}}>
<div style={{background:status==="OFFLINE"?"#1A1A1A":status==="ONLINE"?"#0F1F0F":"#1F1A0F",border:`1px solid ${status==="OFFLINE"?"#333":status==="ONLINE"?"#4CAF5033":"#D4B78F33"}`,borderRadius:"16px",padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:"11px",color:"#888"}}>RIDER STATUS</div><div style={{fontSize:"18px",fontWeight:"800",marginTop:"4px",color:status==="OFFLINE"?"#888":status==="ONLINE"?"#4CAF50":"#D4B78F"}}>{status}</div><div style={{fontSize:"9px",color:"#666",marginTop:"2px"}}>{status==="OFFLINE"?"Go online to get orders":status==="ONLINE"?"Waiting for orders...":"Delivering to customer"}</div></div>
<button onClick={toggleStatus} style={{background:status==="OFFLINE"?"#D4B78F":"#222",color:status==="OFFLINE"?"#000":"#fff",border:`1px solid ${status==="OFFLINE"?"#D4B78F":"#333"}`,borderRadius:"999px",padding:"12px 20px",fontWeight:"800",fontSize:"11px",animation:status==="OFFLINE"?"pulse 2s infinite":"none"}}>{status==="OFFLINE"?"GO ONLINE":"GO OFFLINE"}</button></div>
<div style={{display:"flex",gap:"10px",marginTop:"14px"}}>
<div style={{flex:1,background:"#141414",borderRadius:"12px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"9px",color:"#888"}}>Today Earning</div><div style={{fontSize:"16px",fontWeight:"800",color:"#D4B78F",marginTop:"4px"}}>Rs. {earning}</div></div>
<div style={{flex:1,background:"#141414",borderRadius:"12px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"9px",color:"#888"}}>Deliveries</div><div style={{fontSize:"16px",fontWeight:"800",marginTop:"4px"}}>{Math.floor(earning/150)}</div></div></div>
{activeOrder&&<div style={{marginTop:"16px",background:"linear-gradient(135deg,#1A1A1A,#111)",border:"1px solid #D4B78F66",borderRadius:"16px",padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"13px"}}>ACTIVE DELIVERY</b><span style={{background:"#D4B78F",color:"#000",fontSize:"9px",padding:"4px 8px",borderRadius:"999px",fontWeight:"800"}}>#{activeOrder.id}</span></div>
<div style={{marginTop:"12px",fontSize:"12px"}}><div>👤 {activeOrder.customer_name || activeOrder.customer}</div><div style={{marginTop:"4px",color:"#aaa"}}>📦 {activeOrder.items?.map ? activeOrder.items.map((i:any)=>`${i.name} x${i.qty}`).join(", ") : activeOrder.items}</div><div style={{marginTop:"4px",color:"#D4B78F",fontWeight:"700"}}>Rs. {activeOrder.total}</div><div style={{marginTop:"8px",background:"#0a0a0a",borderRadius:"8px",padding:"8px",border:"1px solid #222",fontSize:"10px"}}>📍 {activeOrder.location_text || activeOrder.location}<br/><span style={{color:"#4CAF50"}}>Tap for GPS</span></div></div>
<div style={{display:"flex",gap:"8px",marginTop:"14px"}}><button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.location_text||activeOrder.location)}`,"_blank")} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>🗺️ Navigate</button><button onClick={completeOrder} style={{flex:1,background:"#4CAF50",border:"none",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>✅ Delivered</button></div>
</div>}
<div style={{marginTop:"18px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:"13px"}}>New Orders ({orders.length})</b><span style={{fontSize:"10px",color:"#666"}}>{status==="OFFLINE"?"Go online to see":"Live"}</span></div>
{status==="OFFLINE"?<div style={{background:"#111",borderRadius:"12px",padding:"20px",textAlign:"center",marginTop:"10px",border:"1px dashed #333",color:"#666"}}>You are offline<br/><span style={{fontSize:"10px"}}>Go online to get delivery requests</span></div>:
orders.length===0?<div style={{background:"#111",borderRadius:"12px",padding:"20px",textAlign:"center",marginTop:"10px",border:"1px solid #222",color:"#666"}}>No new orders - Online raho</div>:
orders.map((o:any)=><div key={o.id} style={{background:"#141414",borderRadius:"14px",padding:"14px",marginTop:"10px",border:"1px solid #222"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:"700",fontSize:"12px"}}>#{o.id} - {o.customer_name || o.customer}</span><span style={{fontSize:"9px",background:"#1a1a1a",border:"1px solid #333",padding:"4px 8px",borderRadius:"999px"}}>{o.dist||"2 km"}</span></div>
<div style={{fontSize:"11px",marginTop:"8px",color:"#ccc"}}>📦 {o.items?.map ? o.items.map((i:any)=>`${i.name} x${i.qty}`).join(", ") : o.items}</div><div style={{fontSize:"11px",marginTop:"4px",color:"#D4B78F",fontWeight:"700"}}>Rs. {o.total}</div>
<div style={{fontSize:"10px",marginTop:"6px",color:"#777",background:"#0a0a0a",padding:"6px 8px",borderRadius:"6px",border:"1px solid #1a1a1a"}}>📍 {o.location_text||o.location}</div>
<div style={{display:"flex",gap:"8px",marginTop:"10px"}}><button onClick={()=>acceptOrder(o)} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>ACCEPT - Earn Rs.150</button></div></div>)}
</div>
<div style={{textAlign:"center",padding:"24px 0",color:"#444",fontSize:"9px",letterSpacing:"0.2em"}}>KAIHA RIDER - HADI SUKKUR 2026</div>
</div></div></div>
);
    }
