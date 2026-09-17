"use client";
import { useState, useEffect } from "react";

const fashionCircles = [
  { id: "genz", name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=200" },
  { id: "winter", name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200" },
  { id: "men", name: "MEN", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
  { id: "women", name: "WOMEN", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200" },
];

const fashionFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers","FlipFlops","Essentials","Footwear","Innerwears","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];
const genderFilters = ["Male","Female","Both","Child","Boy","Girl"];

const products = {
  Fashion: [
    { id: 1, name: "Gen Z Oversized Tee", price: 1999, cat: "T-Shirts", gender: "Male", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 2, name: "Winter Hoodie", price: 3499, cat: "Winter Collection", gender: "Both", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 3, name: "Cargo Pants", price: 2999, cat: "Pants", gender: "Male", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
  ],
  Beauty: [
    { id: 10, name: "KAIHA Lipstick", price: 999, cat: "Makeup", gender: "Female", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400" },
    { id: 11, name: "Glow Foundation", price: 1499, cat: "Makeup", gender: "Female", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
  ],
  Home: [
    { id: 20, name: "Luxury Curtain", price: 4999, cat: "Decor", gender: "Both", img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400" },
    { id: 21, name: "Velvet Cushion", price: 1299, cat: "Decor", gender: "Both", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Fashion"|"Beauty"|"Home">("Fashion");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [gender, setGender] = useState("Male");
  const [subCat, setSubCat] = useState("All");
  const [live, setLive] = useState(10);
  const [coins, setCoins] = useState(60);
  const [cart, setCart] = useState(0);
  const [showOrder, setShowOrder] = useState(true);

  useEffect(()=>{
    const i=setInterval(()=>setLive(c=>Math.max(8,c+(Math.random()>0.5?1:-1))),3000);
    return()=>clearInterval(i);
  },[]);

  const currentProducts = products[activeTab].filter(p =>
    (subCat==="All" || p.cat===subCat) && (activeTab!=="Fashion" || gender==="Both" || p.gender===gender || p.gender==="Both")
  );

  return (
    <div className="bg-black text-white min-h-screen pb-28">
      {/* HEADER - Screenshot wala */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black z-50 border-b border-zinc-900">
        <h1 className="font-black text-3xl tracking-wider bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">KAIHA</h1>
        <div className="flex gap-4 text-xl">🔔 ❤️ 👤 <span className="relative">🛒{cart>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart}</span>}</span></div>
      </nav>

      {/* SEARCH */}
      <div className="p-3">
        <div className="bg-[#1c1c1f] rounded-full flex items-center px-4 py-3 gap-3">
          <span className="text-zinc-500">🔍</span><input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-sm outline-none placeholder:text-zinc-500" /><span>🎤</span>
        </div>
      </div>

      {/* 3 MAIN TABS */}
      <div className="flex gap-3 px-4 py-2 overflow-x-auto">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>{setActiveTab(t); setActiveCollection(null); setSubCat("All")}} className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all ${activeTab===t?"bg-white text-black border-white":"bg-[#1c1c1f] text-white border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {/* FASHION CIRCLES - Ye wala section jo screenshot me hai */}
      {activeTab==="Fashion" && (
        <div className="px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCollection(activeCollection===c.name?null:c.name)} className="flex flex-col items-center gap-2 min-w-[75px]">
                <img src={c.img} className={`w-[72px] h-[72px] rounded-full object-cover border-2 ${activeCollection===c.name?"border-yellow-500":"border-zinc-700"}`} alt={c.name} />
                <span className="text-[11px] font-bold text-center">{c.name}</span>
              </button>
            ))}
          </div>

          {/* GEN Z DRIP pe tap karne ke baad Male Female + Sub Filters */}
          {activeCollection && (
            <div className="mt-4 space-y-3 animate-in">
              <div className="flex gap-2 overflow-x-auto">
                {genderFilters.map(g=>(
                  <button key={g} onClick={()=>setGender(g)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${gender===g?"bg-white text-black":"bg-black text-white border-zinc-700"}`}>{g}</button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto flex-wrap">
                <button onClick={()=>setSubCat("All")} className={`px-3 py-1 rounded-full text-[11px] border ${subCat==="All"?"bg-yellow-500 text-black border-yellow-500":"bg-zinc-900 border-zinc-800"}`}>All</button>
                {fashionFilters.map(f=>(
                  <button key={f} onClick={()=>setSubCat(f)} className={`px-3 py-1 rounded-full text-[11px] border whitespace-nowrap ${subCat===f?"bg-white text-black":"bg-zinc-900 border-zinc-800 text-zinc-300"}`}>{f}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* LIVE + SMART FEATURES */}
      <div className="flex gap-2 px-4 py-2 text-[11px] items-center text-zinc-400 overflow-x-auto">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>{live} log dekh rahe • ⏰ Flash 59:30 • 🤖 AI Size: M • Coins: {coins} • 📦 Smart Cart: {cart} items
      </div>

      {/* PRODUCTS GRID */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {currentProducts.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <img src={p.img} className="w-full h-48 object-cover" alt={p.name} />
            <div className="p-3">
              <h3 className="text-sm font-bold truncate">{p.name}</h3>
              <p className="text-xs text-zinc-400">{p.cat} • {p.gender}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">Rs. {p.price}</span>
                <button onClick={()=>{setCart(c=>c+1); setCoins(c=>c+10)}} className="bg-yellow-500 text-black text-[11px] font-bold px-3 py-1.5 rounded-full">Add +10 Coins</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KAIHA TV - Screenshot wala */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black flex items-center gap-2"><span className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center text-[12px]">▶</span> KAIHA TV</h2>
          <span className="text-xs text-zinc-400">Shop from Videos</span>
        </div>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" className="w-full h-64 object-cover" alt="video" />
            <div className="absolute inset-0 flex items-center justify-center"><div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-2xl">▶</div></div>
          </div>
          <div className="p-4 bg-[#1c1c1f] flex justify-between items-center">
            <div><h3 className="font-bold text-sm">3 Ways to Style This Kurta</h3><p className="text-xs text-zinc-400">Premium Kurta</p><p className="font-bold mt-1">Rs. 1999</p></div>
            <button onClick={()=>setCart(c=>c+1)} className="bg-yellow-500 text-black font-bold px-5 py-2 rounded-full text-sm">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* 20 CHEEZEN - ORDER TRACKER + SMART SYSTEM */}
      {showOrder && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t-2 border-green-500 rounded-t-[20px] p-4 z-50">
          <div className="flex justify-between items-center"><h3 className="text-green-400 font-bold text-sm">Your order is on the way! 🏍️</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-7 h-7 rounded-full text-xs">✕</button></div>
          <p className="text-sm mt-1 font-bold">HADI is coming with your order</p><p className="text-[11px] text-zinc-400">Bike: 0000 | 03127912648 | Live GPS • ETA 8 min</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-yellow-500 text-black font-bold py-2.5 rounded-xl text-xs">📍 View Rider Location</button>
            <button className="bg-white text-black font-bold py-2.5 rounded-xl text-xs">📞 Call Rider</button>
          </div>
          <button className="bg-green-500 w-full mt-2 py-2.5 rounded-xl font-bold text-xs">💬 Chat with Rider</button>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-center">
            <span className="bg-zinc-800 py-1.5 rounded-full">❌ Cancel Order</span>
            <span className="bg-zinc-800 py-1.5 rounded-full">🏷️ KAIHA1 -20%</span>
            <span className="bg-zinc-800 py-1.5 rounded-full">👥 Refer 20 Coins</span>
            <span className="bg-zinc-800 py-1.5 rounded-full">💳 Black Card</span>
            <span className="bg-zinc-800 py-1.5 rounded-full">👕 Complete Look AI</span>
            <span className="bg-zinc-800 py-1.5 rounded-full">❤️ Wishlist</span>
          </div>
        </div>
      )}
    </div>
  );
    }
