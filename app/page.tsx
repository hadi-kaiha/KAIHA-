"use client";
import { useState, useEffect, useRef } from "react";

const fashionCircles = [
  { id:"genz", name:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" },
  { id:"winter", name:"WINTER EDIT", img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&q=80" },
  { id:"summer", name:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&q=80" },
  { id:"tshirt", name:"T-SHIRTS", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" },
  { id:"men", name:"MEN", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { id:"women", name:"WOMEN", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80" },
  { id:"pants", name:"PANTS", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80" },
  { id:"slippers", name:"SLIPPERS", img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80" },
];

const genderFilters = ["Male","Female","Both","Child","Boy","Girl"];
const fashionSubFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers","FlipFlops","Essentials","Footwear","Innerwears","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];
const sizes = ["S","M","L","XL"];
const colors = [{name:"Black", hex:"#000"}, {name:"White", hex:"#fff"}, {name:"Purple", hex:"#a855f7"}, {name:"Beige", hex:"#D4AF37"}];

const allProducts = {
  Fashion: [
    { id:1, name:"Oversized Street Tee", price:1999, mrp:2999, sub:"T-Shirts", gender:"Male", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", brand:"KAIHA GENZ" },
    { id:2, name:"Wool Blend Hoodie", price:3499, mrp:4999, sub:"Winter Collection", gender:"Both", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80", brand:"WINTER EDIT" },
    { id:3, name:"Baggy Cargo Pants", price:2999, mrp:4599, sub:"Pants", gender:"Male", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"KAIHA MAN" },
    { id:4, name:"Summer Co-ord Set", price:2499, mrp:3999, sub:"Summer Fits", gender:"Girl", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80", brand:"KAIHA WOMAN" },
  ],
  Beauty: [{ id:10, name:"Matte Lipstick", price:999, mrp:1299, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80", brand:"KAIHA BEAUTY" }],
  Home: [{ id:20, name:"Luxury Curtain", price:4999, mrp:6999, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&q=80", brand:"KAIHA HOME" }]
};

export default function Home(){
  const [activeTab,setActiveTab]=useState<"Fashion"|"Beauty"|"Home">("Fashion");
  const [activeCircle,setActiveCircle]=useState<string|null>("GEN Z DRIP");
  const [gender,setGender]=useState("Both");
  const [sub,setSub]=useState("All");
  const [cartItems,setCartItems]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [showWishlist,setShowWishlist]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [showBell,setShowBell]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [reels,setReels]=useState([
    {id:1, user:"@hadi_style", role:"Customer", product:"Oversized Tee", price:1999, video:"https://www.w3schools.com/html/mov_bbb.mp4", thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", likes:1200},
    {id:2, user:"@kaiha_official", role:"Seller", product:"Winter Hoodie", price:3499, video:"https://www.w3schools.com/html/movie.mp4", thumb:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", likes:3400},
    {id:3, user:"@rider_ali", role:"Rider", product:"Cargo Pants", price:2999, video:"https://www.w3schools.com/html/mov_bbb.mp4", thumb:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", likes:890},
  ]);
  const [showReel,setShowReel]=useState<any>(null);
  const [uploadRole,setUploadRole]=useState("Customer");
  const fileRef = useRef<HTMLInputElement>(null);

  const addToCart = (p:any) => {
    setCartItems(prev=>{
      const exist = prev.find(i=>i.product.id===p.id);
      if(exist) return prev.map(i=>i.product.id===p.id?{...i, qty:i.qty+1}:i);
      return [...prev, {id:Date.now(), product:p, qty:1, size:"M", color:colors[0]}];
    });
    setShowCart(true);
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        *{font-family:'Inter',sans-serif!important}
        @keyframes slideIn{0%{transform:translateX(-30px); opacity:0}100%{transform:translateX(0); opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
       .slide-text{animation:slideIn 0.8s ease-out forwards}
       .float{animation:float 3s ease-in-out infinite}
      `}</style>

      {/* HEADER - LOGO ONLY K + SLIDE KAIHA TEXT */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-11 h-11 rounded-xl bg-black border border-zinc-800 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)] float">
            <span className="font-black text-[26px] text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-700">K</span>
          </div>
          <h1 className="font-black text-[26px] tracking-[0.25em] text-[#D4AF37] slide-text">KAIHA</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={()=>setShowBell(true)} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
          <button onClick={()=>setShowWishlist(true)} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
          <button onClick={()=>setShowProfile(true)} className="text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg></button>
          <button onClick={()=>setShowCart(true)} className="relative text-white"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12h13l2-8H6.5"/></svg>{cartItems.length>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      <div className="p-3">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 py-3 gap-3 border border-zinc-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-3.5-3.5"/></svg>
          <input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-[13px] outline-none placeholder:text-zinc-500" />
        </div>
      </div>

      <div className="flex gap-3 px-4 py-2">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>{setActiveTab(t); setSub("All")}} className={`flex-1 py-3 rounded-full text-[13px] font-bold border ${activeTab===t?"bg-white text-black":"bg-[#1a1a1a] text-white border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {activeTab==="Fashion" && (
        <div className="px-2 py-4 border-b border-zinc-900">
          <div className="flex gap-4 overflow-x-auto px-2 pb-2">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCircle(c.name)} className="flex flex-col items-center gap-2 min-w-[72px]">
                <img src={c.img} className={`w-[72px] h-[72px] rounded-full object-cover border-2 ${activeCircle===c.name?"border-yellow-500 scale-110":"border-zinc-700"}`} alt="" />
                <span className="text-[11px] font-bold">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 px-2">
            {genderFilters.map(g=>(
              <button key={g} onClick={()=>setGender(g)} className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap ${gender===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap px-2 mt-3">
            <button onClick={()=>setSub("All")} className={`px-3 py-1.5 rounded-full text-[11px] border ${sub==="All"?"bg-yellow-500 text-black font-bold":"bg-zinc-900 border-zinc-800"}`}>All</button>
            {fashionSubFilters.map(f=>(
              <button key={f} onClick={()=>setSub(f)} className={`px-3 py-1.5 rounded-full text-[11px] border ${sub===f?"bg-white text-black font-bold":"bg-zinc-900 border-zinc-800"}`}>{f}</button>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <img src={p.img} className="w-full h-[280px] object-cover" alt="" />
            <div className="p-3"><h4 className="text-[11px] font-bold text-zinc-400">{p.brand}</h4><h3 className="text-[13px] font-medium truncate">{p.name}</h3><p className="font-bold text-sm mt-1">Rs. {p.price}</p><button onClick={()=>addToCart(p)} className="mt-2 w-full bg-white text-black text-[11px] font-bold py-2 rounded-full">ADD TO CART</button></div>
          </div>
        ))}
      </div>

      {/* FIXED KAIHA TV - REELS + UPLOAD */}
      <div className="p-4 bg-[#0a0a0a] mt-4 border-t border-zinc-900">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-black text-[16px] tracking-wide flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px]">▶</span> KAIHA TV</h2>
          <button onClick={()=>fileRef.current?.click()} className="bg-white text-black px-4 py-1.5 rounded-full text-[11px] font-bold">+ Upload Reel</button>
        </div>
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e)=>{
          const file = e.target.files?.[0];
          if(file){ const url = URL.createObjectURL(file); setReels([{id:Date.now(), user:"@you", role:uploadRole, product:"New Drop", price:1999, video:url, thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", likes:0},...reels]); }
        }} />
        <div className="flex gap-2 mb-3">
          {["Customer","Seller","Rider"].map(r=>(
            <button key={r} onClick={()=>setUploadRole(r)} className={`px-3 py-1 rounded-full text-[10px] border ${uploadRole===r?"bg-yellow-500 text-black border-yellow-500 font-bold":"bg-zinc-900 border-zinc-800 text-zinc-400"}`}>{r} Reel</button>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {reels.map(reel=>(
            <div key={reel.id} onClick={()=>setShowReel(reel)} className="min-w-[150px] w-[150px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 relative cursor-pointer">
              <img src={reel.thumb} className="w-full h-[200px] object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full text-[9px] font-bold">{reel.role}</div>
              <div className="absolute bottom-0 p-2 w-full">
                <p className="text-[11px] font-bold truncate">{reel.product}</p>
                <p className="text-[10px] text-zinc-300">{reel.user} • ❤️ {reel.likes}</p>
                <p className="text-[11px] font-bold text-yellow-500">Rs. {reel.price}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-black text-xs">▶</div></div>
            </div>
          ))}
        </div>
      </div>

      {showReel && (
        <div className="fixed inset-0 bg-black z-[80] flex flex-col">
          <div className="p-4 flex justify-between items-center"><h3 className="font-bold">{showReel.role} Reel • {showReel.user}</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
          <video src={showReel.video} controls autoPlay loop className="w-full flex-1 bg-black object-contain" />
          <div className="p-4 bg-[#121212]"><h3 className="font-bold">{showReel.product}</h3><p className="text-sm text-yellow-500 font-bold">Rs. {showReel.price}</p><button onClick={()=>{addToCart({id:showReel.id, name:showReel.product, price:showReel.price, img:showReel.thumb, mrp:showReel.price+1000, brand:"KAIHA TV", sub:"Reel", gender:"Both"}); setShowReel(null)}} className="mt-3 w-full bg-yellow-500 text-black py-3 rounded-xl font-black">Add to Cart</button></div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Cart ({cartItems.reduce((a,b)=>a+b.qty,0)})</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            {cartItems.map(item=>(
              <div key={item.id} className="bg-zinc-900 rounded-xl p-3 mb-3 border border-zinc-800 flex gap-3">
                <img src={item.product.img} className="w-16 h-20 object-cover rounded-lg" alt="" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{item.product.name}</h4>
                  <div className="flex gap-1 mt-1">{colors.map(c=>(<button key={c.name} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,color:c}:i))} className={`w-5 h-5 rounded-full border ${item.color.name===c.name?"border-yellow-500":"border-zinc-600"}`} style={{background:c.hex}}></button>))}</div>
                  <div className="flex gap-1 mt-1">{sizes.map(s=>(<button key={s} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,size:s}:i))} className={`px-2 py-0.5 text-[10px] rounded border ${item.size===s?"bg-white text-black":"bg-black border-zinc-700"}`}>{s}</button>))}</div>
                  <div className="flex items-center gap-2 mt-2"><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))} className="w-6 h-6 bg-zinc-800 rounded-full">-</button><span className="text-sm font-bold">{item.qty}</span><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} className="w-6 h-6 bg-zinc-800 rounded-full">+</button></div>
                </div>
              </div>
            ))}
            <button className="mt-4 bg-yellow-500 text-black w-full py-3 rounded-xl font-black">Checkout Rs. {cartItems.reduce((a,b)=>a+b.product.price*b.qty,0)}</button>
          </div>
        </div>
      )}

      {showBell && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Notifications</h2><button onClick={()=>setShowBell(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="bg-zinc-900 p-3 rounded-xl">🔥 Flash Sale 40% OFF live</div></div></div>)}
      {showWishlist && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Wishlist ❤️</h2><button onClick={()=>setShowWishlist(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><p className="text-sm text-zinc-400">Saved items here</p></div></div>)}
      {showProfile && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Profile</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{!isLoggedIn?<button onClick={()=>setIsLoggedIn(true)} className="w-full bg-white text-black font-bold py-3 rounded-xl">Login</button>:<div className="text-center"><div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto flex items-center justify-center font-black text-xl text-black">H</div><p className="font-bold mt-2">HADI</p></div>}</div></div>)}
    </div>
  );
      }
