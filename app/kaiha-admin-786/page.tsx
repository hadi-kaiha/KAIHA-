"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STRONG_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "Kaiha@Hadi_99$ecure!Sukkur_2026";

export default function Admin(){
  const [orders,setOrders]=useState<any[]>([]);
  const [live,setLive]=useState<any[]>([]);
  const [sellers,setSellers]=useState<any[]>([]);
  const [products,setProducts]=useState<any[]>([]);
  const [coinsMall,setCoinsMall]=useState<any[]>([]);
  const [pass,setPass]=useState("");
  const [ok,setOk]=useState(false);
  const [tries,setTries]=useState(0);
  const [locked,setLocked]=useState(false);
  const [newCoinsItem,setNewCoinsItem]=useState({name:"", coins:"", img:""});

  useEffect(()=>{
    if(!ok) return;
    supabase.from("kaiha_orders").select("*, kaiha_products(name), kaiha_sellers(shop_name)").order("created_at",{ascending:false}).then(({data})=>setOrders(data||[]));
    supabase.from("kaiha_live").select("*").then(({data})=>setLive(data||[]));
    supabase.from("kaiha_sellers").select("*").order("created_at",{ascending:false}).then(({data})=>setSellers(data||[]));
    supabase.from("kaiha_products").select("*, kaiha_sellers(shop_name)").order("created_at",{ascending:false}).then(({data})=>setProducts(data||[]));
    supabase.from("kaiha_coins_mall").select("*").order("created_at",{ascending:false}).then(({data})=>setCoinsMall(data||[]));
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

  const addCoinsItem = async()=>{
    if(!newCoinsItem.name) return alert("Name likho");
    const {data, error} = await supabase.from("kaiha_coins_mall").insert({name: newCoinsItem.name, coins_required: Number(newCoinsItem.coins||100), image_url: newCoinsItem.img}).select().single();
    if(error){
      const updated = [...coinsMall, {id: Date.now(), name: newCoinsItem.name, coins_required: Number(newCoinsItem.coins), image_url: newCoinsItem.img}];
      setCoinsMall(updated);
      localStorage.setItem("kaiha_coins_mall", JSON.stringify(updated));
    } else {
      setCoinsMall([data,...coinsMall]);
    }
    setNewCoinsItem({name:"", coins:"", img:""});
  }

  const deleteCoinsItem = async(id:any)=>{
    await supabase.from("kaiha_coins_mall").delete().eq("id", id);
    setCoinsMall(coinsMall.filter((c:any)=>c.id!==id));
  }

  if(!ok) return <div className="bg-black min-h-screen flex items-center justify-center p-5"><div className="bg-[#101828] p-6 rounded-2xl w-full max-w-sm border border-yellow-500/20"><h1 className="text-yellow-500 font-black text-xl">KAIHA SECURE ADMIN</h1><p className="text-xs text-gray-400 mt-1">Founder Hadi Only</p><input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter Secure Password" type="password" className="w-full p-3 mt-4 rounded-xl bg-black border border-gray-700 text-white"/><button onClick={login} disabled={locked} className="w-full bg-yellow-500 text-black font-black p-3 rounded-xl mt-3 disabled:bg-gray-600">{locked?"LOCKED 30s":"UNLOCK ADMIN"}</button></div></div>;

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between items-center"><h1 className="text-[20px] font-black text-yellow-500">KAIHA ADMIN - 46 SECURE</h1><button onClick={()=>setOk(false)} className="text-xs bg-red-600 px-3 py-1 rounded-full">Logout</button></div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-[#101828] p-3 rounded-xl text-center border border-zinc-800"><p className="text-xl font-black">{orders.length}</p><p className="text-[10px]">Orders</p></div>
        <div className="bg-[#101828] p-3 rounded-xl text-center border border-green-500/20"><p className="text-xl font-black text-green-500">{sellers.length}</p><p className="text-[10px]">Sellers</p></div>
        <div className="bg-[#101828] p-3 rounded-xl text-center border border-yellow-500/20"><p className="text-xl font-black text-yellow-500">{coinsMall.length}</p><p className="text-[10px]">50 Coins Mall</p></div>
      </div>
      <div className="bg-[#101828] border border-yellow-500/20 rounded-xl p-4 mt-4">
        <h3 className="font-black text-[14px]">50. Coins Mall - Admin Select</h3>
        <div className="flex gap-2 mt-3"><input value={newCoinsItem.name} onChange={e=>setNewCoinsItem({...newCoinsItem, name:e.target.value})} placeholder="Item Name" className="flex-1 bg-black border border-zinc-700 rounded-lg h-[40px] px-3 text-sm"/><input value={newCoinsItem.coins} onChange={e=>setNewCoinsItem({...newCoinsItem, coins:e.target.value})} placeholder="Coins 100" className="w-[90px] bg-black border border-zinc-700 rounded-lg h-[40px] px-3 text-sm"/><button onClick={addCoinsItem} className="bg-yellow-500 text-black px-4 rounded-lg font-bold">Add</button></div>
        {coinsMall.map((c:any)=>(<div key={c.id} className="flex justify-between bg-black p-2 rounded-lg mt-2 text-[12px]"><span>{c.name} - {c.coins_required||c.coins} coins</span><button onClick={()=>deleteCoinsItem(c.id)} className="text-red-400">Delete</button></div>))}
      </div>
      <h2 className="font-black mt-6">Orders - {orders.length}</h2>
      {orders.map(o=>{ const l=live.find((x:any)=>x.order_id===o.id); return <div key={o.id} className="bg-[#101828] p-4 rounded-xl mt-3 border border-gray-800"><div className="flex justify-between"><b>{o.id.slice(0,8)}</b><b className="text-yellow-500">Rs.{o.price}</b></div><p className="text-xs text-gray-400">{o.status} - OTP {o.otp||1234} - 63 QR {o.blockchain_hash||'KAIHA-BLK'}</p><p className="text-xs mt-2">{o.product_name}</p>{l&&<a href={`https://maps.google.com/?q=${l.lat},${l.lng}`} target="_blank" className="mt-2 inline-block bg-white text-black px-3 py-1 rounded-full text-xs">Track Live 33</a>}</div>})}
    </div>
  )
      }
