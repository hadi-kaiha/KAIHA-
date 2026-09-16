"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STRONG_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "Kaiha@Hadi_99$ecure!Sukkur_2026";

export default function Admin(){
  const [orders,setOrders]=useState<any[]>([]);
  const [live,setLive]=useState<any[]>([]);
  const [pass,setPass]=useState(""); const [ok,setOk]=useState(false);
  const [tries,setTries]=useState(0); const [locked,setLocked]=useState(false);

  useEffect(()=>{
    if(!ok) return;
    supabase.from("kaiha_orders").select("*").order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));
    supabase.from("kaiha_live").select("*").then(({data})=>setLive(data||[]));
  },[ok]);

  const login = () => {
    if(locked){ alert("Too many tries! Wait 30 sec"); return; }
    if(pass === STRONG_PASS){
      setOk(true); setTries(0);
    } else {
      const n = tries+1; setTries(n);
      if(n>=3){ setLocked(true); setTimeout(()=>{setLocked(false); setTries(0);}, 30000); alert("3 Wrong tries! Locked 30 sec"); }
      else alert(`Wrong password! ${3-n} tries left`);
    }
  };

  if(!ok) return <div className="bg-black min-h-screen flex items-center justify-center p-5"><div className="bg-[#101828] p-6 rounded-2xl w-full max-w-sm border border-yellow-500/20"><h1 className="text-yellow-500 font-black text-xl">KAIHA SECURE ADMIN</h1><p className="text-xs text-gray-400 mt-1">Founder Hadi Only</p><input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter Secure Password" type="password" className="w-full p-3 mt-4 rounded-xl bg-black border border-gray-700 text-white"/><button onClick={login} disabled={locked} className="w-full bg-yellow-500 text-black font-black p-3 rounded-xl mt-3 disabled:bg-gray-600">{locked?"LOCKED 30s":"UNLOCK ADMIN"}</button><p className="text-[10px] text-gray-500 mt-3 text-center">3 wrong tries = 30 sec lock</p></div></div>;

  return <div className="bg-black text-white min-h-screen p-4"><h1 className="text-2xl font-black text-yellow-500">KAIHA ADMIN - SECURE - {orders.length} ORDERS</h1><button onClick={()=>setOk(false)} className="mt-2 text-xs bg-red-600 px-3 py-1 rounded-full">Logout</button>{orders.map(o=>{const l=live.find(x=>x.order_id===o.id); return <div key={o.id} className="bg-[#101828] p-4 rounded-xl mt-4 border border-gray-800"><div className="flex justify-between"><b>{o.id}</b><b className="text-yellow-500">Rs.{o.price}</b></div><p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleString()} - {o.status}</p><p className="text-xs mt-2">📦 {o.product_name} - {o.customer_name}</p><p className="text-xs text-yellow-400">PICKUP: {o.pickup_address}</p><p className="text-xs text-green-400">DROP: {o.drop_address}</p><p className="text-xs">Rider: {o.rider_name||"Pending"} {l?`🟢 LIVE ${l.lat?.toFixed(3)},${l.lng?.toFixed(3)}`:""}</p>{l&&<a href={`https://maps.google.com/?q=${l.lat},${l.lng}`} target="_blank" className="mt-2 inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-bold">Track Live</a>}</div>})}</div>
                                                                                               }
