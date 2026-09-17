"use client";
import { useState, useEffect } from "react";

const fashionCircles = [
  { id:"genz", name:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" },
  { id:"winter", name:"WINTER EDIT", img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80" },
  { id:"summer", name:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&q=80" },
  { id:"tshirt", name:"T-SHIRTS", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { id:"men", name:"MEN", img:"https://images.unsplash.com/photo-1488165580356-0f7d98d94b7f?w=200&q=80" },
  { id:"women", name:"WOMEN", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80" },
  { id:"pants", name:"PANTS", img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80" },
  { id:"slippers", name:"SLIPPERS", img:"https://images.unsplash.com/photo-1603808033176-935819eb3b3a?w=200&q=80" },
];

const genderFilters = ["Male","Female","Both","Child","Boy","Girl"];
const fashionSubFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers","FlipFlops","Essentials","Footwear","Innerwears","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];

const allProducts = {
  Fashion: [
    { id:1, name:"Oversized Street Tee", price:1999, mrp:2999, sub:"T-Shirts", gender:"Male", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", brand:"KAIHA GENZ" },
    { id:2, name:"Wool Blend Hoodie", price:3499, mrp:4999, sub:"Winter Collection", gender:"Both", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80", brand:"WINTER EDIT" },
    { id:3, name:"Baggy Cargo Pants", price:2999, mrp:4599, sub:"Pants", gender:"Male", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"KAIHA MAN" },
    { id:4, name:"Summer Co-ord Set", price:2499, mrp:3999, sub:"Summer Fits", gender:"Girl", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80", brand:"KAIHA WOMAN" },
    { id:5, name:"Premium Crop Top", price:1899, mrp:2599, sub:"Tops", gender:"Female", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", brand:"KAIHA" },
    { id:6, name:"Street Shorts", price:1499, mrp:1999, sub:"Shorts", gender:"Boy", img:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80", brand:"GEN Z DRIP" },
  ],
  Beauty: [
    { id:10, name:"Matte Liquid Lipstick", price:999, mrp:1299, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80", brand:"KAIHA BEAUTY" },
    { id:11, name:"Glow Serum Foundation", price:1499, mrp:1999, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80", brand:"KAIHA BEAUTY" },
  ],
  Home: [
    { id:20, name:"Luxury Curtain Set", price:4999, mrp:6999, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&q=80", brand:"KAIHA HOME" },
    { id:21, name:"Velvet Cushion", price:1299, mrp:1899, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80", brand:"KAIHA HOME" },
  ]
};

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
  const [showWishlist,setShowWishlist]=useState(false);
  const [showProfile,setShowProfile]=useState(false);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{font-family:'Inter', -apple-system, sans-serif!important; letter-spacing:-0.2px; -webkit-font-smoothing:antialiased}
        @keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-4px)}}
        @keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
       .animate-float{animation:float 3s ease-in-out infinite}
       .logo-shine::after{content:''; position:absolute; top:0; left:0; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent); transform:skewX(-20deg); animation:shine 3s infinite}
      `}</style>

      {/* HEADER - LOGO + PROFESSIONAL FONT */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black/90 backdrop-blur z-40 border-b border-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-black shadow-[0_0_20px_rgba(168,85,247,0.35)] animate-float logo-shine group cursor-pointer">
            {/* YAHAN LOGO LAGEGA */}
            <img src="/kaiha-logo.png" alt="KAIHA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e)=>{e.currentTarget.src='https://i.imgur.com/8Km9tLL.png'}} />
          </div>
          <div className="leading-none">
            <h1 className="font-black text-[20px] tracking-[0.25em] text-[#D4AF37]">KAIHA</h1>
            <p className="text-[8px] tracking-[0.3em] text-zinc-500 font-semibold -mt-1">LUXURY FASHION</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={()=>alert("No new notifications")} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
          <button onClick={()=>setShowWishlist(true)} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
          <button onClick={()=>setShowProfile(true)} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg></button>
          <button onClick={()=>setShowCart(true)} className="relative text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12h13l2-8H6.5"/></svg>{cart>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart}</span>}</button>
        </div>
      </nav>

      {/* SEARCH */}
      <div className="p-3">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 py-3 gap-3 border border-zinc-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-3.5-3.5"/></svg>
          <input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-[13px] outline-none placeholder:text-zinc-500 font-medium" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>
        </div>
      </div>

      {/* 3 MAIN TABS - Professional Font */}
      <div className="flex gap-3 px-4 py-2">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>{setActiveTab(t); setSub("All")}} className={`flex-1 py-3 rounded-full text-[13px] font-bold tracking-wide border transition-all ${activeTab===t?"bg-white text-black border-white":"bg-[#1a1a1a] text-white border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {/* CIRCLES */}
      {activeTab==="Fashion" && (
        <div className="px-2 py-4 border-b border-zinc-900">
          <div className="flex gap-4 overflow-x-auto px-2 pb-2">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCircle(c.name)} className="flex flex-col items-center gap-2 min-w-[72px]">
                <img src={c.img} className={`w-[72px] h-[72px] rounded-full object-cover object-top border-2 ${activeCircle===c.name?"border-yellow-500 scale-110":"border-zinc-700"} transition-all`} alt="" />
                <span className="text-[11px] font-bold tracking-wide">{c.name}</span>
              </button>
            ))}
          </div>
          {activeCircle && (
            <div className="mt-5 px-2 space-y-4">
              <div>
                <p className="text-[11px] text-zinc-400 mb-2 font-bold tracking-wider">SELECT GENDER - {activeCircle}</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {genderFilters.map(g=>(
                    <button key={g} onClick={()=>setGender(g)} className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap ${gender===g?"bg-white text-black border-white":"bg-black border-zinc-700 text-zinc-300"}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 mb-2 font-bold tracking-wider">SELECT CATEGORY</p>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={()=>setSub("All")} className={`px-3 py-1.5 rounded-full text-[11px] border ${sub==="All"?"bg-yellow-500 text-black border-yellow-500 font-bold":"bg-zinc-900 border-zinc-800"}`}>All</button>
                  {fashionSubFilters.map(f=>(
                    <button key={f} onClick={()=>setSub(f)} className={`px-3 py-1.5 rounded-full text-[11px] border whitespace-nowrap font-medium ${sub===f?"bg-white text-black font-bold":"bg-zinc-900 border-zinc-800 text-zinc-300"}`}>{f}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SMART BAR */}
      <div className="px-4 py-3 text-[11px] text-zinc-400 font-semibold tracking-wide flex gap-2 overflow-x-auto whitespace-nowrap border-b border-zinc-900">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE {live}</span>
        <span>• FLASH 59:30</span><span>• AI SIZE: M</span><span>• COINS: 60</span><span>• SMART CART: {cart} ITEMS</span>
      </div>

      {/* PRODUCTS - Myntra Style */}
      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative">
              <img src={p.img} className="w-full h-[280px] object-cover object-top" alt="" />
              <button className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
              <span className="absolute bottom-2 left-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full">4.5 ★ | 1.2k</span>
            </div>
            <div className="p-3">
              <h4 className="text-[11px] font-bold text-zinc-300 tracking-wide">{p.brand}</h4>
              <h3 className="text-[13px] font-medium truncate">{p.name}</h3>
              <p className="text-[11px] text-zinc-500">{p.sub} • {p.gender}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-sm">Rs. {p.price}</span>
                <span className="text-[11px] text-zinc-500 line-through">Rs. {p.mrp}</span>
                <span className="text-[11px] text-green-400 font-bold">(40% OFF)</span>
              </div>
              <button onClick={()=>setCart(c=>c+1)} className="mt-2 w-full bg-white text-black text-[11px] font-bold py-2 rounded-full">ADD TO CART +10 Coins</button>
            </div>
          </div>
        ))}
      </div>

      {/* KAIHA TV */}
      <div className="p-4">
        <div className="flex justify-between mb-3"><h2 className="font-bold flex items-center gap-2 tracking-wide text-[14px]"><span className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center text-[10px]">▶</span> KAIHA TV</h2><span className="text-xs text-zinc-500">Shop from Videos</span></div>
        <div onClick={()=>setShowVideo(true)} className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800">
          <div className="relative"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" className="w-full h-64 object-cover object-top" alt="" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black font-black text-xl">▶</div></div></div>
          <div className="p-4 bg-[#1c1c1f] flex justify-between items-center"><div><h3 className="font-bold text-sm">3 Ways to Style This Kurta</h3><p className="text-xs text-zinc-500">Premium Kurta</p><p className="font-bold mt-1">Rs. 1999</p></div><button className="bg-yellow-500 text-black font-bold px-5 py-2 rounded-full text-xs">Add to Cart</button></div>
        </div>
      </div>

      {/* DRAWERS */}
      {showCart && (<div className="fixed inset-0 bg-black/70 z-[60] flex justify-end"><div className="bg-[#121212] w-[85%] max-w-sm h-full p-5"><div className="flex justify-between mb-6"><h2 className="font-bold text-xl">Smart Cart ({cart})</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><p className="text-sm text-zinc-400">20 Features Active: Coins, KAIHA1, Black Card, Complete Look</p><button onClick={()=>setShowCart(false)} className="mt-6 bg-yellow-500 text-black w-full py-3 rounded-xl font-bold">Checkout</button></div></div>)}
      {showWishlist && (<div className="fixed inset-0 bg-black/70 z-[60] flex justify-end"><div className="bg-[#121212] w-[85%] max-w-sm h-full p-5"><div className="flex justify-between mb-6"><h2 className="font-bold text-xl">Wishlist</h2><button onClick={()=>setShowWishlist(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><p className="text-zinc-400 text-sm">3 items</p></div></div>)}
      {showProfile && (<div className="fixed inset-0 bg-black/70 z-[60] flex justify-end"><div className="bg-[#121212] w-[85%] max-w-sm h-full p-5"><div className="flex justify-between mb-6"><h2 className="font-bold text-xl">Profile</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><p className="text-sm">HADI • 60 Coins • Black Card</p></div></div>)}
      {showVideo && (<div className="fixed inset-0 bg-black z-[70] flex flex-col"><div className="p-4 flex justify-between"><h3 className="font-bold">KAIHA TV</h3><button onClick={()=>setShowVideo(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="w-full flex-1 bg-black" /><div className="p-4 bg-[#121212]"><button onClick={()=>{setCart(c=>c+1); setShowVideo(false)}} className="mt-3 bg-yellow-500 text-black w-full py-3 rounded-xl font-bold">Add to Cart +10 Coins</button></div></div>)}

      {/* ORDER TRACKER */}
      {showOrder && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t-2 border-green-500 rounded-t-[20px] p-4 z-50">
          <div className="flex justify-between"><h3 className="text-green-400 font-bold text-sm">Your order is on the way!</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-7 h-7 rounded-full text-xs">✕</button></div>
          <p className="text-sm mt-1 font-bold">HADI is coming with your order</p><p className="text-[11px] text-zinc-400">Bike: 0000 | 03127912648 | Live GPS • ETA 8 min</p>
          <div className="grid grid-cols-2 gap-2 mt-3"><button className="bg-yellow-500 text-black font-bold py-2.5 rounded-xl text-xs">View Rider Location</button><button className="bg-white text-black font-bold py-2.5 rounded-xl text-xs">Call Rider</button></div>
        </div>
      )}
    </div>
  );
}
