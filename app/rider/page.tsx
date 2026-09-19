"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const OWNER_NUMBER = "03320821575";

export default function Rider(){
const [mn,setMn]=useState(false);
const [orders,setOrders]=useState<any[]>([]);
const [status,setStatus]=useState("OFFLINE");
const [earning,setEarning]=useState(0);
const [activeOrder,setActiveOrder]=useState<any>(null);
const [rider,setRider]=useState<any>(null);
const [isBlocked,setIsBlocked]=useState(false);
const [blockedAmount,setBlockedAmount]=useState(0);
const [deadline,setDeadline]=useState<any>(null);
const [timeLeft,setTimeLeft]=useState("");

useEffect(()=>{
 const r=localStorage.getItem("kaiha_rider");
 if(!r){location.href="/rider/login"; return;}
 const rd=JSON.parse(r); setRider(rd); setEarning(rd.earnings||0); setStatus(rd.status||"OFFLINE");
 checkBlockStatus(rd.phone);
 loadRealOrders(rd.phone);
 const ch=supabase.channel("live-orders").on("postgres_changes",{event:"*",schema:"public",table:"orders"},()=>{loadRealOrders(rd.phone); checkBlockStatus(rd.phone);}).subscribe();
 return()=>{supabase.removeChannel(ch);}
},[]);

// BLOCK CHECK - 7 HOURS LOGIC
const checkBlockStatus = async (riderId: string) => {
  const {data} = await supabase.from("rider_payments").select("*").eq("rider_id",riderId).eq("status","PENDING").order("created_at",{ascending:false}).limit(1);
  if(data && data.length>0){
    const pay = data[0];
    const dead = new Date(pay.deadline);
    const now = new Date();
    if(now > dead){
      // 7 hours over - JOB KHATAM
      setIsBlocked(true); setBlockedAmount(pay.amount); setDeadline(pay.deadline);
      await supabase.from("riders").update({is_blocked:true}).eq("phone",riderId);
    } else {
      // Abhi bhi pending - BLOCKED
      setIsBlocked(true); setBlockedAmount(pay.amount); setDeadline(pay.deadline);
    }
  } else {
    setIsBlocked(false);
  }
};

// TIMER UPDATE
useEffect(()=>{
  if(!deadline) return;
  const interval = setInterval(()=>{
    const diff = new Date(deadline).getTime() - new Date().getTime();
    if(diff <=0){ setTimeLeft("TIME OVER - JOB LOST"); return; }
    const h = Math.floor(diff/1000/60/60);
    const m = Math.floor((diff/1000/60)%60);
    const s = Math.floor((diff/1000)%60);
    setTimeLeft(`${h}h ${m}m ${s}s LEFT`);
  },1000);
  return ()=>clearInterval(interval);
},[deadline]);

const loadRealOrders=async(id:string)=>{
 if(isBlocked) return;
 const {data} = await supabase.from("orders").select("*").is("rider_id",null).eq("status","PENDING").order("created_at",{ascending:false});
 // Nearest rider logic - Filhal sabko dikhega, baad me PostGIS distance se filter karenge
 if(data){ setOrders(data.slice(0,5).map((o:any)=>({id:o.id, customer_name:o.buyer_name, total:o.price, location_text:o.location_text, items:o.product_name+" x"+o.quantity, dist:"1.2 km", raw:o}))); }
 const {data:mine} = await supabase.from("orders").select("*").eq("rider_id",id).eq("status","on_the_way").limit(1);
 if(mine && mine.length>0) setActiveOrder({id:mine[0].id, customer_name:mine[0].buyer_name, total:mine[0].price, location_text:mine[0].location_text, items:mine[0].product_name, raw:mine[0]});
};

const toggleStatus=async()=>{
 if(isBlocked) return alert(`⛔ BLOCKED! Pehle Rs.${blockedAmount} transfer karo ${OWNER_NUMBER} pe!`);
 const newStatus=status==="OFFLINE"?"ONLINE":"OFFLINE";
 let lat=0,lng=0;
 if(newStatus==="ONLINE" && navigator.geolocation){
  await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1)));
 }
 if(rider){
  await supabase.from("riders").upsert({phone:rider.phone, name:rider.name, status:newStatus, lat, lng, earnings:earning});
  const nr={...rider, status:newStatus}; localStorage.setItem("kaiha_rider", JSON.stringify(nr));
 }
 setStatus(newStatus);
 if(newStatus==="ONLINE") loadRealOrders(rider.phone);
};

const acceptOrder=async(o:any)=>{
 if(isBlocked) return;
 await supabase.from("orders").update({status:"on_the_way", rider_id:rider.phone}).eq("id",o.id);
 setActiveOrder(o); setStatus("DELIVERING"); setOrders(orders.filter((x:any)=>x.id!==o.id));
};

const completeOrder=async()=>{
 if(!activeOrder) return;
 await supabase.from("orders").update({status:"delivered"}).eq("id",activeOrder.raw?.id || activeOrder.id);
 // CREATE MONEY BLOCK - Rider must transfer to owner
 const amount = activeOrder.raw?.price || activeOrder.total;
 const {error} = await supabase.from("rider_payments").insert({rider_id:rider.phone, order_id:activeOrder.raw?.id || activeOrder.id, amount:amount, status:"PENDING", deadline: new Date(Date.now()+7*60*60*1000).toISOString()});
 const newEarn=earning+150;
 setEarning(newEarn);
 if(rider){
  await supabase.from("riders").update({earnings:newEarn, is_blocked:true, blocked_amount:amount}).eq("phone",rider.phone);
 }
 setIsBlocked(true); setBlockedAmount(amount);
 setActiveOrder(null); setStatus("ONLINE");
 alert(`✅ Delivered! AB ${OWNER_NUMBER} pe Rs.${amount} transfer karo! Tabhi next order milega!`);
};

const confirmTransfer = async () => {
  // Rider ne transfer ka proof diya
  await supabase.from("rider_payments").update({status:"PAID"}).eq("rider_id",rider.phone).eq("status","PENDING");
  await supabase.from("riders").update({is_blocked:false, blocked_amount:0}).eq("phone",rider.phone);
  setIsBlocked(false); setBlockedAmount(0);
  alert("✅ Transfer Received! Ab next orders milenge! Admin verify karega!");
  loadRealOrders(rider.phone);
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%{box-shadow:0 0 0 0 #D4B78F66}70%{box-shadow:0 0 0 10px #D4B78F00}100%{box-shadow:0 0 0 0 #D4B78F00}}.page{animation:fadeUp 0.45s ease}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>

{/* MONEY BLOCK OVERLAY - YE HATAEGA NAHI JAB TAK PAISE TRANSFER NA KARE */}
{isBlocked && (
<div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.96)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
<div style={{background:"#141414",border:"2px solid #FF2222",borderRadius:"20px",padding:"20px",width:"100%",textAlign:"center"}}>
<div style={{fontSize:"50px"}}>⛔</div>
<div style={{color:"#FF2222",fontWeight:"900",fontSize:"18px",marginTop:"10px"}}>ACCOUNT BLOCKED</div>
<div style={{color:"#fff",fontSize:"13px",marginTop:"12px"}}>Aapne Order Delivered kiya hai<br/>Ab <b style={{color:"#D4B78F"}}>Rs. {blockedAmount}</b> transfer karna hai</div>
<div style={{background:"#000",border:"1px solid #D4B78F",borderRadius:"12px",padding:"12px",marginTop:"14px"}}>
<div style={{fontSize:"11px",color:"#D4B78F"}}>TRANSFER ON THIS NUMBER</div>
<div style={{fontSize:"20px",fontWeight:"900",color:"#4CAF50",marginTop:"4px"}}>{OWNER_NUMBER}</div>
<div style={{fontSize:"10px",color:"#888",marginTop:"4px"}}>Easypaisa / JazzCash</div>
</div>
<div style={{background:"#FF222211",border:"1px solid #FF2222",borderRadius:"10px",padding:"10px",marginTop:"12px"}}>
<div style={{fontSize:"11px",color:"#FF2222",fontWeight:"700"}}>⏰ {timeLeft}</div>
<div style={{fontSize:"9px",color:"#888",marginTop:"4px"}}>7 hours me transfer karo warna job khatam!</div>
</div>
<button onClick={confirmTransfer} style={{width:"100%",marginTop:"14px",background:"#4CAF50",color:"#fff",border:"none",padding:"14px",borderRadius:"999px",fontWeight:"900"}}>I HAVE TRANSFERRED - Rs.{blockedAmount}</button>
<div style={{fontSize:"9px",color:"#555",marginTop:"10px"}}>Jab tak transfer nahi karoge, ye screen nahi hategi aur next order nahi milega!</div>
</div>
</div>
)}

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"12px"}}><img src={LOGO} style={{height:"48px",width:"48px",borderRadius:"10px"}}/><div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"14px"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:status==="OFFLINE"?"#ff4444":status==="ONLINE"?"#4CAF50":"#D4B78F"}}>● {status} {isBlocked?"⛔ BLOCKED":""}</div></div></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"all 0.3s"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"all 0.3s"}}></span>
</button></div>

<div className="page" style={{padding:"16px"}}>
<div style={{background:status==="OFFLINE"?"#1A1A1A":status==="ONLINE"?"#0F1F0F":"#1F1A0F",border:`1px solid ${status==="OFFLINE"?"#333":status==="ONLINE"?"#4CAF5033":"#D4B78F33"}`,borderRadius:"16px",padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:"11px",color:"#888"}}>RIDER STATUS</div><div style={{fontSize:"18px",fontWeight:"800",marginTop:"4px",color:status==="OFFLINE"?"#888":status==="ONLINE"?"#4CAF50":"#D4B78F"}}>{isBlocked?"BLOCKED":status}</div></div>
<button onClick={toggleStatus} style={{background:isBlocked?"#FF2222":status==="OFFLINE"?"#D4B78F":"#222",color:isBlocked?"#fff":status==="OFFLINE"?"#000":"#fff",border:"none",borderRadius:"999px",padding:"12px 20px",fontWeight:"800",fontSize:"11px"}}>{isBlocked?"BLOCKED":status==="OFFLINE"?"GO ONLINE":"GO OFFLINE"}</button></div>

<div style={{display:"flex",gap:"10px",marginTop:"14px"}}>
<div style={{flex:1,background:"#141414",borderRadius:"12px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"9px",color:"#888"}}>Today Earning</div><div style={{fontSize:"16px",fontWeight:"800",color:"#D4B78F"}}>Rs. {earning}</div></div>
<div style={{flex:1,background:"#141414",borderRadius:"12px",padding:"12px",border:"1px solid #222"}}><div style={{fontSize:"9px",color:"#888"}}>Deliveries</div><div style={{fontSize:"16px",fontWeight:"800"}}>{Math.floor(earning/150)}</div></div></div>

{activeOrder&&<div style={{marginTop:"16px",background:"linear-gradient(135deg,#1A1A1A,#111)",border:"1px solid #D4B78F66",borderRadius:"16px",padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"13px"}}>ACTIVE DELIVERY</b><span style={{background:"#D4B78F",color:"#000",fontSize:"9px",padding:"4px 8px",borderRadius:"999px",fontWeight:"800"}}>#{activeOrder.id}</span></div>
<div style={{marginTop:"12px",fontSize:"12px"}}><div>👤 {activeOrder.customer_name}</div><div style={{marginTop:"4px",color:"#D4B78F",fontWeight:"700"}}>Rs. {activeOrder.total}</div><div style={{marginTop:"8px",background:"#0a0a0a",borderRadius:"8px",padding:"8px",fontSize:"10px"}}>📍 {activeOrder.location_text}</div></div>
<div style={{display:"flex",gap:"8px",marginTop:"14px"}}><button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.location_text)}`,"_blank")} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>🗺️ Navigate</button><button onClick={completeOrder} style={{flex:1,background:"#4CAF50",border:"none",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>✅ Delivered - Paise Liye</button></div>
</div>}

<div style={{marginTop:"18px"}}><b style={{fontSize:"13px"}}>New Orders ({orders.length}) - Nearest First</b>
{orders.map((o:any)=><div key={o.id} style={{background:"#141414",borderRadius:"14px",padding:"14px",marginTop:"10px",border:"1px solid #222"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:"700",fontSize:"12px"}}>#{o.id} - {o.customer_name}</span><span style={{fontSize:"9px",background:"#1a1a1a",border:"1px solid #333",padding:"4px 8px",borderRadius:"999px"}}>{o.dist}</span></div>
<div style={{fontSize:"11px",marginTop:"8px",color:"#D4B78F",fontWeight:"700"}}>Rs. {o.total} - {o.items}</div>
<div style={{fontSize:"10px",marginTop:"6px",color:"#777",background:"#0a0a0a",padding:"6px 8px",borderRadius:"6px"}}>📍 {o.location_text}</div>
<button onClick={()=>acceptOrder(o)} style={{width:"100%",marginTop:"10px",background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>ACCEPT - Earn Rs.150</button>
</div>)}
</div>
</div></div></div>
);
          }
