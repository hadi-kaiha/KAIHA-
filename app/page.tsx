"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab,setActiveTab]=useState("Fashion");
  const [live,setLive]=useState(12);
  const [coins,setCoins]=useState(60);
  const mainFilters=["Male","Female","Both","Child","Boy","Girl"];
  const fashionExtra=["Winter Collection","Summer Fits","T-Shirts","Pants","Tank Top","Shorts","Footwear","Essentials","Innerwears","Slippers","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];
  const [showOrder,setShowOrder]=useState(true);

  useEffect(()=>{
    const i=setInterval(()=>setLive(c=>Math.max(8,c+(Math.random()>0.5?1:-1))),3000);
    return()=>clearInterval(i);
  },[]);

  return(
    <div className="bg-black text-white min-h-screen pb-20">
      <nav className="flex justify-between p-4 border-b border-zinc-800 sticky top-0 bg-black z-50">
        <h1 className="font-black text-xl bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">KAIHA</h1>
        <div className="flex gap-4">🔔 ❤️ 👤 🛒</div>
      </nav>

      <div className="p-3">
        <div className="bg-zinc-900 rounded-full flex items-center px-4 py-2 gap-2">
          <span>🔍</span><input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-sm outline-none" /><span>🎤</span>
        </div>
      </div>

      <div className="flex gap-2 px-3 overflow-x-auto">
        {["Fashion","Beauty","Home"].map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-2 rounded-full text-sm font-bold border ${activeTab===t?"bg-white text-black":"bg-zinc-800"}`}>{t}</button>
        ))}
      </div>

      <div className="flex gap-2 p-3 overflow-x-auto">
        {mainFilters.map(f=>(
          <span key={f} className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{f}</span>
        ))}
      </div>

      <div className="flex gap-2 px-3 py-2 text-[11px] items-center text-zinc-400">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>{live} log dekh rahe • ⏰ Flash 59:30 • 🤖 AI Size: M • Coins: {coins}
      </div>

      {activeTab==="Fashion" && (
        <div className="flex gap-2 px-3 flex-wrap">
          {fashionExtra.map(c=>(
            <span key={c} className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[10px]">{c}</span>
          ))}
        </div>
      )}

      <div className="p-3 grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 rounded-xl p-3">GEN Z DRIP</div>
        <div className="bg-zinc-900 rounded-xl p-3">WINTER EDIT</div>
      </div>

      <div className="p-3">
        <div className="flex justify-between"><h2 className="font-bold">▶ KAIHA TV</h2><span className="text-xs text-zinc-400">Shop from Videos</span></div>
        <div className="bg-white h-48 rounded-xl mt-2 text-black flex items-center justify-center">Video Product - Tap to Open Reel</div>
      </div>

      {showOrder && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t-2 border-green-500 rounded-t-2xl p-4">
          <div className="flex justify-between"><h3 className="text-green-400 font-bold">Your order is on the way! 🏍️</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-8 h-8 rounded-full">X</button></div>
          <p className="text-sm mt-1">HADI is coming with your order</p><p className="text-xs text-zinc-400">Bike: 0000 | 03127912648</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-yellow-500 text-black font-bold py-2 rounded-xl text-sm">View Rider Location</button>
            <button className="bg-white text-black font-bold py-2 rounded-xl text-sm">Call Rider</button>
          </div>
          <button className="bg-green-500 w-full mt-2 py-2 rounded-xl font-bold text-sm">Chat with Rider</button>
          <div className="mt-2 text-[10px] text-zinc-500 text-center">Cancel Order • Coupon KAIHA1 • Refer 20 Coins • Black Card • Complete Look • Wishlist</div>
        </div>
      )}
    </div>
  );
        }
