"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png"; const OWNER_NUMBER="03320821575"; const LIMIT=3000;

export default function Rider(){
const [mn,setMn]=useState(false); const [orders,setOrders]=useState<any[]>([]);
const [status,setStatus]=useState("OFFLINE"); const [earning,setEarning]=useState(0);
const [activeOrder,setActiveOrder]=useState<any>(null); const [rider,setRider]=useState<any>(null);
const [isBlocked,setIsBlocked]=useState(false); const [blockedAmount,setBlockedAmount]=useState(0);
const [deadline,setDeadline]=useState<any>(null); const [timeLeft,setTimeLeft]=useState("");
const [uploading,setUploading]=useState(false);

useEffect(()=>{
  const params = new URLSearchParams(window.location.search);
  let phone = params.get("phone") || "";
  if(!phone) phone = window.prompt("Rider Phone likho (ex: 0332XXXXXXX)") || "";
  if(!phone){ location.href="/rider/login"; return; }
  loadRider(phone);
},[]);

const loadRider = async (phone:string) => {
  const {data} = await supabase.from("riders").select("*").eq("phone",phone).single();
  if(!data){ alert("Rider not found - pehle rider login karo"); location.href="/rider/login?phone="+phone; return; }
  setRider(data); setEarning(data.earnings||0); setStatus(data.status||"OFFLINE");
  checkBlockStatus(phone); loadRealOrders(phone);
};

const checkBlockStatus=async(phone:string)=>{
 const {data}=await supabase.from("rider_payments").select("*").eq("rider_phone",phone).eq("status","PENDING").order("created_at",{ascending:false}).limit(1);
 if(data&&data.length>0){ setIsBlocked(true); setBlockedAmount(data[0].amount); setDeadline(data[0].deadline); }
 const {data:rd}=await supabase.from("riders").select("*").eq("phone",phone).single();
 if(rd?.is_blocked || (rd?.wallet||0) > LIMIT){ setIsBlocked(true); setBlockedAmount(rd?.wallet||0); }
};

useEffect(()=>{
 if(!deadline) return; const iv=setInterval(()=>{
  const diff=new Date(deadline).getTime()-Date.now();
  if(diff<=0){setTimeLeft("TIME OVER - JOB LOST - CALL ADMIN 03320821575"); return;}
  setTimeLeft(`${Math.floor(diff/3600000)}h ${Math.floor(diff%3600000/60000)}m LEFT`);
 },1000); return()=>clearInterval(iv);
},[deadline]);

const loadRealOrders=async(phone:string)=>{
 const {data:ordersData}=await supabase.from("orders").select("*").or("status.eq.NEW,status.eq.PENDING,status.eq.PACKED").is("rider_id",null).limit(20);
 const {data:riderNotes}=await supabase.from("rider_notifications").select("*").eq("status","PENDING").limit(20);
 let all:any[]=[];
 if(ordersData){
   all = ordersData.map((o:any)=>({
     id:o.id, customer_name:o.buyer_name||"Customer", total:o.total||o.price,
     location_text:o.buyer_location||o.location_text||"Sukkur",
     customer_phone:o.buyer_phone||"03XX", items:o.product_name||"Order", raw:o
   }));
 }
 if(riderNotes && riderNotes.length>0){
   riderNotes.forEach((rn:any)=>{
     if(!all.find((x:any)=>x.id===rn.order_id)){
       all.push({
         id:rn.order_id, customer_name:rn.buyer_name, total:rn.total,
         location_text:rn.buyer_location, customer_phone:rn.buyer_phone||"03XX",
         items: rn.message, raw:{id:rn.order_id, buyer_name:rn.buyer_name, total:rn.total, buyer_location:rn.buyer_location, buyer_phone:rn.buyer_phone}
       });
     }
   });
 }
 setOrders(all);
};

const toggleStatus=async()=>{
 if(isBlocked) return alert(`BLOCKED! Rs.${blockedAmount} transfer karo ${OWNER_NUMBER} pe!`);
 const ns=status==="OFFLINE"?"ONLINE":"OFFLINE"; let lat=0,lng=0;
 if(ns==="ONLINE"&&navigator.geolocation){ await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1))); }
 if(rider){ await supabase.from("riders").update({status:ns, lat, lng, earnings:earning}).eq("phone",rider.phone); }
 setStatus(ns); if(ns==="ONLINE") loadRealOrders(rider.phone);
};

const acceptOrder=async(o:any)=>{
  await supabase.from("orders").update({status:"on_the_way", rider_id:rider.phone}).eq("id",o.raw.id);
  await supabase.from("rider_notifications").update({status:"ACCEPTED"}).eq("order_id",o.id);
  setActiveOrder(o); setOrders(orders.filter((x:any)=>x.id!==o.id)); setStatus("DELIVERING");
};

const completeOrder=async()=>{
 const amount=activeOrder.raw.price||activeOrder.total;
 await supabase.from("orders").update({status:"delivered"}).eq("id",activeOrder.raw.id);
 await supabase.from("rider_notifications").update({status:"DELIVERED"}).eq("order_id",activeOrder.id);
 await supabase.from("rider_payments").insert({rider_phone:rider.phone, order_id:String(activeOrder.raw.id), amount, status:"PENDING", owner_number:OWNER_NUMBER, deadline:new Date(Date.now()+7*60*60*1000).toISOString()});
 const newWallet = (rider?.wallet||0)+amount;
 await supabase.from("riders").update({earnings:earning+150, wallet:newWallet, is_blocked: newWallet > LIMIT}).eq("phone",rider.phone);
 setIsBlocked(newWallet > LIMIT); setBlockedAmount(newWallet); setActiveOrder(null);
 alert(`Delivered! Wallet Rs.${newWallet} - AB ${OWNER_NUMBER} pe Rs.${amount} transfer karo!`);
};

// === YE NAYA ADD KIYA - 80KB COMPRESS + UPLOAD - ADMIN SE DELETE HOGA ===
const handleReceiptUpload=async(e:any)=>{
  const f=e.target.files?.[0]; if(!f) return;
  if(f.size>5*1024*1024) return alert("5MB se kam image lo");
  setUploading(true);
  try{
    const compressed:any = await new Promise((res)=>{
      const img=new Image(); img.src=URL.createObjectURL(f);
      img.onload=()=>{
        const c=document.createElement("canvas"); const maxW=800; const sc=maxW/img.width;
        c.width=maxW; c.height=img.height*sc;
        c.getContext("2d")?.drawImage(img,0,0,c.width,c.height);
        c.toBlob((b:any)=>res(b),"image/jpeg",0.6);
      };
    });
    const fileName=`${rider.phone}_${Date.now()}.jpg`;
    const {error}=await supabase.storage.from("receipts").upload(fileName, compressed);
    if(error) throw error;
    const {data:urlData}=supabase.storage.from("receipts").getPublicUrl(fileName);
    await supabase.from("rider_payments").update({screenshot_url:urlData.publicUrl}).eq("rider_phone",rider.phone).eq("status","PENDING").order("created_at",{ascending:false}).limit(1);
    alert("✅ Receipt 80KB upload - Admin "+OWNER_NUMBER+" verify karke delete karega");
  }catch(err:any){ alert(err.message); }
  setUploading(false);
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>

{isBlocked&&<div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.96)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",overflowY:"auto"}}>
<div style={{background:"#141414",border:"2px solid #FF2222",borderRadius:"20px",padding:"20px",width:"100%",textAlign:"center"}}>
<div style={{fontSize:"40px"}}>⛔</div><div style={{color:"#FF2222",fontWeight:"900",marginTop:"8px"}}>BLOCKED - Rs.{blockedAmount}</div>
<div style={{background:"#000",border:"1px solid #D4B78F",borderRadius:"10px",padding:"10px",marginTop:"10px"}}><div style={{fontSize:"10px",color:"#D4B78F"}}>TRANSFER HERE - Easypaisa/JazzCash SAME {OWNER_NUMBER}</div><div style={{fontSize:"18px",fontWeight:"900",color:"#4CAF50",marginTop:4}}>{OWNER_NUMBER}</div><div style={{fontSize:"9px",color:"#888",marginTop:4}}>{timeLeft} - 7 Hours Only!</div>
<div style={{display:"flex",gap:6,marginTop:10}}><a href={`https://wa.me/923320821575?text=JazzCash Rs.${blockedAmount}`} style={{flex:1,background:"#d32f2f",color:"#fff",padding:"10px",borderRadius:"8px",fontSize:"10px",textDecoration:"none",fontWeight:"800"}}>🔴 JazzCash<br/>{OWNER_NUMBER}</a><a href={`https://wa.me/923320821575?text=Easypaisa Rs.${blockedAmount}`} style={{flex:1,background:"#00a651",color:"#fff",padding:"10px",borderRadius:"8px",fontSize:"10px",textDecoration:"none",fontWeight:"800"}}>🟢 Easypaisa<br/>{OWNER_NUMBER}</a></div>
</div>

{/* UPLOAD ADDED HERE - SAME BLOCK SCREEN MEIN */}
<div style={{background:"#111",border:"1px solid #333",borderRadius:"10px",padding:"10px",marginTop:"12px",textAlign:"left"}}>
<div style={{fontSize:"10px",color:"#D4B78F",fontWeight:"800"}}>⬇️ Receipt Upload (80KB Auto)</div>
<input type="file" accept="image/*" onChange={handleReceiptUpload} style={{width:"100%",marginTop:"8px",background:"#000",padding:"8px",borderRadius:"6px",color:"#fff",border:"1px solid #333",fontSize:"10px"}}/>
<div style={{fontSize:"8px",color:uploading?"#D4B78F":"#666",marginTop:4}}>{uploading?"Uploading...":"Auto compress 80KB - Admin delete karega"}</div>
</div>

<button onClick={async()=>{await supabase.from("rider_payments").update({status:"PAID"}).eq("rider_phone",rider.phone).eq("status","PENDING"); alert("Request bheji!");}} style={{width:"100%",marginTop:"12px",background:"#4CAF50",color:"#fff",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"900"}}>I TRANSFERRED - VERIFY KARO</button>
<button onClick={()=>window.open(`https://wa.me/923320821575?text=Rider ${rider.phone} ne Rs.${blockedAmount} bhej diya ${OWNER_NUMBER} pe - Verify karo`)} style={{width:"100%",marginTop:"8px",background:"#111",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>WhatsApp Proof Bhejo</button>
</div></div>}

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",background:"rgba(10,10,10,0.96)",position:"sticky",top:0,zIndex:20}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={LOGO} style={{height:"42px",width:"42px",borderRadius:"10px"}}/><div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"13px"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:status==="ONLINE"?"#4CAF50":"#ff4444"}}>● {status} {isBlocked?"🚫 BLOCKED Rs."+blockedAmount:""} - {rider?.phone} | Wallet Rs.{rider?.wallet||0}/{LIMIT}</div></div></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px"}}><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none"}}></span><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1}}></span><span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none"}}></span></button>
</div>

{mn&&<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"82%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",overflowY:"auto"}}>
<div style={{color:"#D4B78F",fontWeight:"800"}}>RIDER MENU - {OWNER_NUMBER}</div>
<div style={{marginTop:"14px"}}>
{[
{l:"🏠 Dashboard",a:()=>setMn(false)},
{l:`📞 Call Customer ${activeOrder?`- ${activeOrder.customer_phone}`:""}`,a:()=>{const num=activeOrder?.customer_phone||prompt("Customer number:"); if(num) window.open(`tel:${num}`);}},
{l:"💬 WhatsApp Customer",a:()=>{const num=activeOrder?.customer_phone||prompt("Customer WhatsApp:"); if(num) window.open(`https://wa.me/${num.replace(/[^0-9]/g,"")}?text=Salam, Kaiha Rider bol raha hun`);}},
{l:"💬 Chat Admin - Hadi 03320821575",a:()=>window.open(`https://wa.me/923320821575?text=Rider ${rider?.name} bol raha`)},
{l:"🗺️ Customer Map",a:()=>{const loc=activeOrder?.location_text||prompt("Address:"); if(loc) window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`);}},
{l:"💰 Earnings Rs."+earning+` | Wallet Rs.${rider?.wallet||0}/${LIMIT}`,a:()=>{}},
{l:"🛍️ Back to Shop",a:()=>location.href="/"},
{l:"🚪 Logout",a:()=>{ location.href="/rider/login"; }},
].map((it:any,i)=><div key={i} onClick={it.a} style={{padding:"12px",borderRadius:"10px",border:"1px solid #222",marginTop:"8px",background:"#141414",display:"flex",justifyContent:"space-between",cursor:"pointer"}}><span style={{fontSize:"12px",color:"#ccc"}}>{it.l}</span><span style={{color:"#D4B78F"}}>→</span></div>)}
</div></div></div>}

<div style={{padding:"16px"}}>
<div style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",justifyContent:"space-between",border:"1px solid #222"}}><div><div style={{fontSize:"10px",color:"#888"}}>STATUS / WALLET</div><div style={{fontWeight:"800",color:status==="ONLINE"?"#4CAF50":"#888"}}>{status} - Rs.{rider?.wallet||0}/{LIMIT}</div></div><button onClick={toggleStatus} style={{background:status==="OFFLINE"?"#D4B78F":"#222",color:status==="OFFLINE"?"#000":"#fff",border:"none",padding:"10px 18px",borderRadius:"999px",fontWeight:"800"}}>{status==="OFFLINE"?"GO ONLINE":"GO OFFLINE"}</button></div>

{activeOrder&&<div style={{marginTop:"14px",background:"#1A1A1A",border:"1px solid #D4B78F66",borderRadius:"14px",padding:"14px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4B78F",fontSize:"12px"}}>ACTIVE: #{activeOrder.id}</b><span style={{fontSize:"10px",background:"#D4B78F",color:"#000",padding:"4px 8px",borderRadius:"999px"}}>{activeOrder.customer_phone}</span></div>
<div style={{marginTop:"8px",fontSize:"11px"}}>👤 {activeOrder.customer_name} - Rs.{activeOrder.total}<br/>📍 {activeOrder.location_text}</div>
<div style={{display:"flex",gap:"6px",marginTop:"10px"}}>
<button onClick={()=>window.open(`tel:${activeOrder.customer_phone}`)} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>📞 CALL</button>
<button onClick={()=>window.open(`https://wa.me/${activeOrder.customer_phone.replace(/[^0-9]/g,"")}`)} style={{flex:1,background:"#25D366",border:"none",color:"#fff",padding:"9px",borderRadius:"999px",fontSize:"10px"}}>💬 WA</button>
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
