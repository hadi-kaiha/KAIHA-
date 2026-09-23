"use client"; import {useState,useEffect} from "react"; import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png"; const OWNER_NUMBER="03320821575"; const LIMIT=3000;
export default function Rider(){
const [orders,setOrders]=useState<any[]>([]); const [status,setStatus]=useState("OFFLINE"); const [earning,setEarning]=useState(0); const [activeOrder,setActiveOrder]=useState<any>(null); const [rider,setRider]=useState<any>(null); const [isBlocked,setIsBlocked]=useState(false); const [blockedAmount,setBlockedAmount]=useState(0); const [deadline,setDeadline]=useState<any>(null); const [timeLeft,setTimeLeft]=useState(""); const [uploading,setUploading]=useState(false);

useEffect(()=>{ const p=new URLSearchParams(window.location.search); let phone=p.get("phone")||""; if(!phone) phone=window.prompt("Rider Phone likho - e.g 0300...")||""; if(!phone){location.href="/rider/login"; return;} loadRider(phone);},[]);

const loadRider=async(phone:string)=>{ const {data}=await supabase.from("riders").select("*").eq("phone",phone).single(); if(!data){alert("Rider not found "+phone); location.href="/rider/login"; return;} setRider(data); setEarning(data.earnings||0); setStatus(data.status||"OFFLINE"); checkBlockStatus(phone); loadRealOrders(phone); };

const checkBlockStatus=async(phone:string)=>{ const {data}=await supabase.from("rider_payments").select("*").eq("rider_phone",phone).eq("status","PENDING").order("created_at",{ascending:false}).limit(1); if(data&&data.length>0){setIsBlocked(true); setBlockedAmount(data[0].amount); setDeadline(data[0].deadline);} const {data:rd}=await supabase.from("riders").select("*").eq("phone",phone).single(); if(rd?.is_blocked || (rd?.wallet||0)>LIMIT){setIsBlocked(true); setBlockedAmount(rd?.wallet||0);} };

useEffect(()=>{ if(!deadline) return; const iv=setInterval(()=>{ const diff=new Date(deadline).getTime()-Date.now(); if(diff<=0){setTimeLeft("TIME OVER - CALL ADMIN 03320821575"); return;} setTimeLeft(`${Math.floor(diff/3600000)}h ${Math.floor(diff%3600000/60000)}m LEFT`); },1000); return()=>clearInterval(iv); },[deadline]);

const loadRealOrders=async(phone:string)=>{ const {data}=await supabase.from("orders").select("*").or("status.eq.NEW,status.eq.PENDING,status.eq.PACKED").is("rider_id",null).limit(20); if(data) setOrders(data.map((o:any)=>({id:o.id,customer_name:o.buyer_name||"Customer",total:o.total||o.price,location_text:o.buyer_location||o.location_text||"Sukkur",customer_phone:o.buyer_phone||"03XX",items:o.product_name||"Order",raw:o}))); };

const toggleStatus=async()=>{ if(isBlocked) return alert(`BLOCKED! Rs.${blockedAmount} transfer karo ${OWNER_NUMBER} pe!`); const ns=status==="OFFLINE"?"ONLINE":"OFFLINE"; let lat=0,lng=0; if(ns==="ONLINE"&&navigator.geolocation){await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1)));} if(rider) await supabase.from("riders").update({status:ns,lat,lng}).eq("phone",rider.phone); setStatus(ns); if(ns==="ONLINE") loadRealOrders(rider.phone); };

const acceptOrder=async(o:any)=>{ await supabase.from("orders").update({status:"on_the_way",rider_id:rider.phone}).eq("id",o.raw.id); setActiveOrder(o); setOrders(orders.filter((x:any)=>x.id!==o.id)); setStatus("DELIVERING"); };

const completeOrder=async()=>{ const amount=activeOrder.raw.price||activeOrder.total; await supabase.from("orders").update({status:"delivered"}).eq("id",activeOrder.raw.id); await supabase.from("riders").update({wallet:(rider.wallet||0)+amount,earnings:earning+150,is_blocked:((rider.wallet||0)+amount)>LIMIT}).eq("phone",rider.phone); await supabase.from("rider_payments").insert({rider_phone:rider.phone,order_id:String(activeOrder.raw.id),amount,status:"PENDING",owner_number:OWNER_NUMBER,deadline:new Date(Date.now()+7*60*60*1000).toISOString()}); setIsBlocked(((rider.wallet||0)+amount)>LIMIT); setBlockedAmount((rider.wallet||0)+amount); setActiveOrder(null); alert(`Delivered! Wallet Rs.${(rider.wallet||0)+amount} - ${OWNER_NUMBER} pe bhejo!`); };

// 80KB COMPRESS + UPLOAD - ADMIN SE DELETE HOGA
const handleReceiptUpload=async(e:any)=>{
 const f=e.target.files?.[0]; if(!f) return;
 if(f.size>5*1024*1024) return alert("5MB se kam image");
 setUploading(true);
 try{
   const compressed=await new Promise((res)=>{
     const img=new Image(); img.src=URL.createObjectURL(f);
     img.onload=()=>{
       const c=document.createElement("canvas"); const maxW=800; const sc=maxW/img.width;
       c.width=maxW; c.height=img.height*sc;
       c.getContext("2d")?.drawImage(img,0,0,c.width,c.height);
       c.toBlob((b:any)=>res(b),"image/jpeg",0.6);
     };
   });
   const fileName=`${rider.phone}_${Date.now()}.jpg`;
   const {error}=await supabase.storage.from("receipts").upload(fileName,compressed as any);
   if(error) throw error;
   const {data:urlData}=supabase.storage.from("receipts").getPublicUrl(fileName);
   await supabase.from("rider_payments").update({screenshot_url:urlData.publicUrl}).eq("rider_phone",rider.phone).eq("status","PENDING").order("created_at",{ascending:false}).limit(1);
   alert("✅ Receipt 80KB upload ho gayi - Admin verify karke delete karega");
 }catch(err:any){ alert("Upload error: "+err.message); }
 setUploading(false);
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",borderRadius:"28px",overflow:"hidden",color:"#fff",position:"relative"}}>

{isBlocked&&<div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.98)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",overflowY:"auto"}}>
<div style={{background:"#141414",border:"2px solid #FF2222",borderRadius:"20px",padding:"18px",width:"100%",textAlign:"center"}}>
<div style={{fontSize:"40px"}}>⛔</div><div style={{color:"#FF2222",fontWeight:"900",marginTop:"8px",fontSize:14}}>BLOCKED - Rs.{blockedAmount}</div><div style={{fontSize:10,color:"#888",marginTop:2}}>{timeLeft}</div>
<div style={{background:"#000",border:"1px solid #D4B78F",borderRadius:12,padding:10,marginTop:12}}>
<div style={{fontSize:"10px",color:"#D4B78F",fontWeight:800}}>TRANSFER SAME NUMBER - 03320821575</div>
<div style={{fontSize:"22px",fontWeight:"900",color:"#4CAF50",marginTop:4}}>{OWNER_NUMBER}</div>
<div style={{display:"flex",gap:8,marginTop:10}}>
<a href={`https://wa.me/923320821575?text=JazzCash Rs.${blockedAmount} ${rider?.phone}`} style={{flex:1,background:"#d32f2f",color:"#fff",padding:"12px 6px",borderRadius:10,fontWeight:800,textDecoration:"none",fontSize:11,textAlign:"center"}}>🔴 JazzCash<br/>{OWNER_NUMBER}</a>
<a href={`https://wa.me/923320821575?text=Easypaisa Rs.${blockedAmount} ${rider?.phone}`} style={{flex:1,background:"#00a651",color:"#fff",padding:"12px 6px",borderRadius:10,fontWeight:800,textDecoration:"none",fontSize:11,textAlign:"center"}}>🟢 Easypaisa<br/>{OWNER_NUMBER}</a>
</div>
</div>
<div style={{background:"#111",border:"1px solid #333",borderRadius:12,padding:12,marginTop:12,textAlign:"left"}}>
<div style={{fontSize:11,fontWeight:800,color:"#D4B78F"}}>⬇️ Receipt Upload (80KB Auto Compress)</div>
<div style={{fontSize:9,color:"#888"}}>Admin verify karke delete karega - 4 din storage khali</div>
<input type="file" accept="image/*" onChange={handleReceiptUpload} style={{width:"100%",marginTop:8,background:"#000",padding:10,borderRadius:8,color:"#fff",border:"1px solid #333",fontSize:11}}/>
<div style={{fontSize:9,color:uploading?"#D4B78F":"#666",marginTop:6}}>{uploading?"Uploading 80KB...":"Auto compress - Admin panel se delete hoga"}</div>
</div>
<button onClick={async()=>{await supabase.from("rider_payments").update({status:"PAID"}).eq("rider_phone",rider.phone).eq("status","PENDING"); alert("Request bheji! Admin check karega "+OWNER_NUMBER);}} style={{width:"100%",marginTop:12,background:"#4CAF50",color:"#fff",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"900"}}>I TRANSFERRED - VERIFY KARO</button>
<div style={{fontSize:8,color:"#666",marginTop:10}}>Receipt 4 din baad Admin delete - {OWNER_NUMBER}</div>
</div></div>}

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,zIndex:20,background:"#0a0a0a"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={LOGO} style={{height:"42px",width:"42px",borderRadius:"10px",background:"#D4B78F"}}/><div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"13px"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:status==="ONLINE"?"#4CAF50":"#ff4444"}}>● {status} {isBlocked?"🚫 BLOCKED Rs."+blockedAmount:""} - {rider?.phone}</div></div></div>
</div>

<div style={{padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",justifyContent:"space-between",border:"1px solid #222"}}><div><div style={{fontSize:"10px",color:"#888"}}>WALLET / LIMIT</div><div style={{fontWeight:"800",color:(rider?.wallet||0)>LIMIT?"red":"#D4B78F"}}>Rs.{rider?.wallet||0} / Rs.{LIMIT}</div></div><button onClick={toggleStatus} style={{background:status==="OFFLINE"?"#D4B78F":"#222",color:status==="OFFLINE"?"#000":"#fff",border:"none",padding:"10px 18px",borderRadius:"999px",fontWeight:"800",fontSize:11}}>{status==="OFFLINE"?"GO ONLINE":"OFFLINE"}</button></div>
{activeOrder&&<div style={{marginTop:"14px",background:"#1A1A1A",border:"1px solid #D4B78F66",borderRadius:"14px",padding:"14px"}}><b style={{color:"#D4B78F",fontSize:"12px"}}>ACTIVE: #{activeOrder.id}</b><div style={{marginTop:"8px",fontSize:"11px"}}>👤 {activeOrder.customer_name} - Rs.{activeOrder.total}<br/>📍 {activeOrder.location_text}<br/>📞 {activeOrder.customer_phone}</div><button onClick={completeOrder} style={{width:"100%",marginTop:"10px",background:"#4CAF50",color:"#fff",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>✅ DELIVERED - ADD TO WALLET</button></div>}
<div style={{marginTop:"16px"}}><b style={{fontSize:"12px"}}>New Orders ({orders.length})</b>{orders.map((o:any)=><div key={o.id} style={{background:"#141414",borderRadius:"12px",padding:"12px",marginTop:"8px",border:"1px solid #222"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"11px",fontWeight:"700"}}>#{o.id} {o.customer_name}</span><span style={{fontSize:"9px",color:"#888"}}>📞 {o.customer_phone}</span></div><div style={{fontSize:"11px",color:"#D4B78F",marginTop:"4px"}}>Rs.{o.total} - {o.items} - 📍 {o.location_text}</div><button onClick={()=>acceptOrder(o)} style={{width:"100%",marginTop:"8px",background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontWeight:"800",fontSize:"10px"}}>ACCEPT - EARN Rs.150</button></div>)}{orders.length===0&&<div style={{background:"#111",padding:20,borderRadius:12,marginTop:8,textAlign:"center",color:"#666",fontSize:11}}>No orders - GO ONLINE rakho</div>}</div>
</div>
</div></div>
);
  }
