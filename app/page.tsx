"use client";
import { useState, useEffect } from "react";

const fashionCircles = [
  { id:"genz", name:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=200" },
  { id:"winter", name:"WINTER EDIT", img:"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200" },
  { id:"summer", name:"SUMMER FITS", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
  { id:"tshirt", name:"T-SHIRTS", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
  { id:"men", name:"MEN", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
  { id:"women", name:"WOMEN", img:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200" },
  { id:"pants", name:"PANTS", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200" },
  { id:"slippers", name:"SLIPPERS", img:"https://images.unsplash.com/photo-1603808033176-935819eb3b3a?w=200" },
];

const genderFilters = ["Male","Female","Both","Child","Boy","Girl"];
const fashionSubFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers","FlipFlops","Essentials","Footwear","Innerwears","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];

const allProducts = {
  Fashion: [
    { id:1, name:"Gen Z Oversized Tee", price:1999, sub:"T-Shirts", gender:"Male", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id:2, name:"Winter Hoodie", price:3499, sub:"Winter Collection", gender:"Both", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id:3, name:"Cargo Pants", price:2999, sub:"Pants", gender:"Male", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
    { id:4, name:"Summer Shorts", price:1499, sub:"Shorts", gender:"Girl", img:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  ],
  Beauty: [
    { id:10, name:"KAIHA Matte Lipstick", price:999, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400" },
    { id:11, name:"Glow Foundation", price:1499, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
  ],
  Home: [
    { id:20, name:"Luxury Curtain Set", price:4999, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400" },
    { id:21, name:"Velvet Cushion", price:1299, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
  ]
};

function Icon({d}:{d:string}){return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d}/></svg>}

export default function Home(){
  const [activeTab,setActiveTab]=useState<"Fashion"|"Beauty"|"Home">("Fashion");
  const [activeCircle,setActiveCircle]=useState<string|null>("GEN Z DRIP");
  const [gender,setGender]=useState("Both");
  const [sub,setSub]=useState("All");
  const [live,setLive]=useState(13);
  const [cart,setCart]=useState(1);
  const [showOrder,setShowOrder]=useState(true);
  const [showVideo,setShowVideo]=useState(false);
  const [showCart,setShowCart]=useState(false);

  useEffect(()=>{const t=setInterval(()=>setLive(v=>Math.max(8,v+(Math.random()>0.5?1:-1))),3000);return()=>clearInterval(t)},[]);

  const filtered = allProducts[activeTab].filter(p=>{
    if(activeTab==="Fashion"){
      if(gender!=="Both" && p.gender!=="Both" && p.gender!==gender) return false;
      if(sub!=="All" && p.sub!==sub) return false;
    }
    return true;
  });

  return(
    <div className="bg-black text-white min-h-screen pb-36">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');.kaiha{font-family:'Syne',sans-serif; background:linear-gradient(90deg,#ff3cac,#ff9a3c,#ff3cac); background-size:200% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:grad 3s ease infinite} @keyframes grad{0%{background-position:0%} 50%{background-position:100%} 100%{background-position:0%}}`}</style>

      {/* HEADER - Professional Icons, No Emoji */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black/90 backdrop-blur z-40 border-b border-zinc-900">
        <h1 className="kaiha text-[32px] font-black tracking-tight">KAIHA</h1>
        <div className="flex gap-5 items-center">
          <button className="text-zinc-200"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
          <button className="text-zinc-200"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
          <button className="text-zinc-200"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg></button>
          <button onClick={()=>setShowCart(true)} className="relative text-zinc-200"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12h13l2-8H6.5"/></svg>{cart>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart}</span>}</button>
        </div>
      </nav>

      {/* SEARCH */}
      <div className="p-3">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 py-3 gap-3 border border-zinc-800">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-3.5-3.5"/></svg>
          <input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-sm outline-none placeholder:text-zinc-500" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>
        </div>
      </div>

      {/* 3 MAIN */}
      <div className="flex gap-3 px-4 py-2">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>{setActiveTab(t); setSub("All")}} className={`flex-1 py-3 rounded-full text-sm font-black border transition-all ${activeTab===t?"bg-white text-black border-white":"bg-[#1a1a1a] text-white border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {/* CIRCLES - Fashion only */}
      {activeTab==="Fashion" && (
        <div className="px-2 py-4 border-b border-zinc-900">
          <div className="flex gap-4 overflow-x-auto px-2 pb-2">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCircle(c.name)} className="flex flex-col items-center gap-2 min-w-[72px]">
                <img src={c.img} className={`w-[72px] h-[72px] rounded-full object-cover border-2 ${activeCircle===c.name?"border-yellow-500 scale-110":"border-zinc-700" } transition-all`} alt="" />
                <span className="text-[11px] font-bold">{c.name}</span>
              </button>
            ))}
          </div>

          {/* YE WALA SECTION JO GAYAB HO GAYA THA - AB WAPAS */}
          {activeCircle && (
            <div className="mt-5 px-2 space-y-4">
              <div>
                <p className="text-[11px] text-zinc-400 mb-2 font-bold">SELECT GENDER - {activeCircle}</p>
                <div className="flex gap-2 overflow-x-auto">
                  {genderFilters.map(g=>(
                    <button key={g} onClick={()=>setGender(g)} className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${gender===g?"bg-white text-black border-white":"bg-black border-zinc-700 text-zinc-300"}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 mb-2 font-bold">SELECT CATEGORY</p>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={()=>setSub("All")} className={`px-3 py-1.5 rounded-full text-[11px] border ${sub==="All"?"bg-yellow-500 text-black border-yellow-500 font-bold":"bg-zinc-900 border-zinc-800"}`}>All</button>
                  {fashionSubFilters.map(f=>(
                    <button key={f} onClick={()=>setSub(f)} className={`px-3 py-1.5 rounded-full text-[11px] border whitespace-nowrap ${sub===f?"bg-white text-black font-bold":"bg-zinc-900 border-zinc-800 text-zinc-300"}`}>{f}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LIVE + 20 FEATURES BAR */}
      <div className="px-4 py-3 text-[11px] text-zinc-400 font-bold flex gap-2 overflow-x-auto whitespace-nowrap">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE {live}</span>
        <span>• FLASH 59:30</span><span>• AI SIZE: M</span><span>• COINS: 60</span><span>• SMART CART: {cart} ITEMS</span>
      </div>

      {/* PRODUCTS */}
      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <img src={p.img} className="w-full h-56 object-cover" alt="" />
            <div className="p-3">
              <h3 className="text-sm font-bold truncate">{p.name}</h3>
              <p className="text-[11px] text-zinc-500">{p.sub} • {p.gender}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-black">Rs. {p.price}</span>
                <button onClick={()=>setCart(c=>c+1)} className="bg-yellow-500 text-black text-[11px] font-black px-3 py-1.5 rounded-full">Add +10 Coins</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KAIHA TV - TAP PE VIDEO CHALEGA */}
      <div className="p-4">
        <div className="flex justify-between mb-3"><h2 className="font-black flex items-center gap-2"><span className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center text-[10px]">▶</span> KAIHA TV</h2><span className="text-xs text-zinc-500">Shop from Videos</span></div>
        <div onClick={()=>setShowVideo(true)} className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer">
          <div className="relative"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" className="w-full h-64 object-cover" alt="" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black font-black">▶</div></div></div>
          <div className="p-4 bg-[#1c1c1f] flex justify-between items-center"><div><h3 className="font-bold text-sm">3 Ways to Style This Kurta</h3><p className="text-xs text-zinc-500">Premium Kurta</p><p className="font-black mt-1">Rs. 1999</p></div><button className="bg-yellow-500 text-black font-black px-5 py-2 rounded-full text-xs">Add to Cart</button></div>
        </div>
      </div>

      {/* CART DRAWER - Professional, No Emoji */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[85%] max-w-sm h-full p-5">
            <div className="flex justify-between mb-6"><h2 className="font-black text-xl">Smart Cart ({cart})</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            <p className="text-sm text-zinc-400">Coins Earned: {cart*10} • Coupon KAIHA1 Applied • Black Card Active • Complete Look AI • Wishlist Synced</p>
            <button onClick={()=>setShowCart(false)} className="mt-6 bg-yellow-500 text-black w-full py-3 rounded-xl font-black">Checkout</button>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black z-[70] flex flex-col">
          <div className="p-4 flex justify-between"><h3 className="font-black">KAIHA TV - Shop from Videos</h3><button onClick={()=>setShowVideo(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="w-full flex-1 bg-black" />
          <div className="p-4 bg-[#121212]"><h4 className="font-bold">Premium Kurta - Rs.1999</h4><button onClick={()=>{setCart(c=>c+1); setShowVideo(false)}} className="mt-3 bg-yellow-500 text-black w-full py-3 rounded-xl font-black">Add to Cart +10 Coins</button></div>
        </div>
      )}

      {/* ORDER TRACKER - Wapas la diya */}
      {showOrder && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t-2 border-green-500 rounded-t-[20px] p-4 z-50">
          <div className="flex justify-between"><h3 className="text-green-400 font-bold text-sm">Your order is on the way!</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-7 h-7 rounded-full text-xs">✕</button></div>
          <p className="text-sm mt-1 font-bold">HADI is coming with your order</p><p className="text-[11px] text-zinc-400">Bike: 0000 | 03127912648 | Live GPS • ETA 8 min</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-yellow-500 text-black font-bold py-2.5 rounded-xl text-xs">View Rider Location</button>
            <button className="bg-white text-black font-bold py-2.5 rounded-xl text-xs">Call Rider</button>
          </div>
          <button className="bg-green-500 w-full mt-2 py-2.5 rounded-xl font-bold text-xs">Chat with Rider</button>
          <div className="mt-3 flex gap-2 overflow-x-auto text-[10px]"><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">Cancel Order</span><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">KAIHA1 -20%</span><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">Refer 20 Coins</span><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">Black Card</span><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">Complete Look</span><span className="bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">Wishlist</span></div>
        </div>
      )}
    </div>
  );
     }
