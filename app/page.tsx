"use client";
import { useState, useEffect } from "react";

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
  Beauty: [
    { id:10, name:"Matte Liquid Lipstick", price:999, mrp:1299, sub:"Makeup", gender:"Female", img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80", brand:"KAIHA BEAUTY" },
  ],
  Home: [
    { id:20, name:"Luxury Curtain Set", price:4999, mrp:6999, sub:"Decor", gender:"Both", img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&q=80", brand:"KAIHA HOME" },
  ]
};

export default function Home(){
  const [activeTab,setActiveTab]=useState<"Fashion"|"Beauty"|"Home">("Fashion");
  const [activeCircle,setActiveCircle]=useState<string|null>("GEN Z DRIP");
  const [gender,setGender]=useState("Both");
  const [sub,setSub]=useState("All");
  const [live,setLive]=useState(16);
  const [cartItems,setCartItems]=useState<any[]>([{id:1, product: allProducts.Fashion[0], qty:1, size:"M", color:colors[0]}]);
  const [showOrder,setShowOrder]=useState(true);
  const [showVideo,setShowVideo]=useState(false);
  const [showCart,setShowCart]=useState(false);
  const [showWishlist,setShowWishlist]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [showBell,setShowBell]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [phone,setPhone]=useState("");

  useEffect(()=>{const t=setInterval(()=>setLive(v=>Math.max(8,v+(Math.random()>0.5?1:-1))),3000);return()=>clearInterval(t)},[]);

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{font-family:'Inter',sans-serif!important}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      .animate-float{animation:float 3s ease-in-out infinite}
      `}</style>

      {/* HEADER - LOGO FIX (NO IMAGE NEEDED - PURE CSS) */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-black border border-zinc-800 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-float relative overflow-hidden">
            <span className="font-black text-[22px] text-[#a855f7] tracking-tighter" style={{textShadow:'0 0 10px rgba(168,85,247,0.6)'}}>K</span>
            <div className="absolute bottom-0 w-full text-center text-[7px] font-black tracking-[0.2em] text-[#D4AF37] pb-0.5">KAIHA</div>
          </div>
          <h1 className="font-black text-[24px] tracking-[0.2em] text-[#D4AF37]">KAIHA</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={()=>setShowBell(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
          <button onClick={()=>setShowWishlist(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
          <button onClick={()=>setShowProfile(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg></button>
          <button onClick={()=>setShowCart(true)} className="relative"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12h13l2-8H6.5"/></svg>{cartItems.length>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      <div className="p-3">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 py-3 gap-3 border border-zinc-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-3.5-3.5"/></svg>
          <input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-[13px] outline-none placeholder:text-zinc-500 font-medium" />
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
          {activeCircle && (
            <div className="mt-5 px-2 space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {genderFilters.map(g=>(
                  <button key={g} onClick={()=>setGender(g)} className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap ${gender===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={()=>setSub("All")} className={`px-3 py-1.5 rounded-full text-[11px] border ${sub==="All"?"bg-yellow-500 text-black font-bold":"bg-zinc-900 border-zinc-800"}`}>All</button>
                {fashionSubFilters.map(f=>(
                  <button key={f} onClick={()=>setSub(f)} className={`px-3 py-1.5 rounded-full text-[11px] border font-medium ${sub===f?"bg-white text-black font-bold":"bg-zinc-900 border-zinc-800"}`}>{f}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative"><img src={p.img} className="w-full h-[280px] object-cover object-top" alt="" /></div>
            <div className="p-3">
              <h4 className="text-[11px] font-bold text-zinc-300">{p.brand}</h4>
              <h3 className="text-[13px] font-medium truncate">{p.name}</h3>
              <div className="flex gap-2 mt-1"><span className="font-bold text-sm">Rs. {p.price}</span><span className="text-[11px] line-through text-zinc-500">Rs. {p.mrp}</span></div>
              <button onClick={()=>addToCart(p)} className="mt-2 w-full bg-white text-black text-[11px] font-bold py-2 rounded-full">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>

      {/* CART WITH QTY / SIZE / COLOR */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Cart ({cartItems.reduce((a,b)=>a+b.qty,0)})</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            {cartItems.map(item=>(
              <div key={item.id} className="bg-zinc-900 rounded-xl p-3 mb-3 border border-zinc-800">
                <div className="flex gap-3">
                  <img src={item.product.img} className="w-16 h-20 object-cover rounded-lg" alt="" />
                  <div className="flex-1"><h4 className="text-sm font-bold">{item.product.name}</h4><p className="text-xs text-zinc-400">Rs. {item.product.price}</p>
                    <div className="flex gap-1.5 mt-2">{colors.map(c=>(<button key={c.name} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,color:c}:i))} className={`w-6 h-6 rounded-full border-2 ${item.color.name===c.name?"border-yellow-500":"border-zinc-600"}`} style={{background:c.hex}}></button>))}</div>
                    <div className="flex gap-1 mt-2">{sizes.map(s=>(<button key={s} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,size:s}:i))} className={`px-2 py-1 text-[10px] rounded border ${item.size===s?"bg-white text-black":"bg-black border-zinc-700"}`}>{s}</button>))}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))} className="w-7 h-7 bg-zinc-800 rounded-full">-</button>
                      <span className="text-sm font-bold">{item.qty}</span>
                      <button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} className="w-7 h-7 bg-zinc-800 rounded-full">+</button>
                      <button onClick={()=>setCartItems(prev=>prev.filter(i=>i.id!==item.id))} className="ml-auto text-[11px] text-red-400">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="mt-4 bg-yellow-500 text-black w-full py-3 rounded-xl font-black">Checkout - Rs. {cartItems.reduce((a,b)=>a+(b.product.price*b.qty),0)}</button>
          </div>
        </div>
      )}

      {/* BELL / NOTIFICATIONS */}
      {showBell && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Notifications</h2><button onClick={()=>setShowBell(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            <div className="space-y-3">
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800"><p className="text-sm font-bold">🔥 Flash Sale Live!</p><p className="text-xs text-zinc-400">GEN Z DRIP 40% OFF - 59 mins left</p></div>
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800"><p className="text-sm font-bold">📦 Order Update</p><p className="text-xs text-zinc-400">HADI is 8 mins away</p></div>
              <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800"><p className="text-sm font-bold">💰 60 Coins Earned</p><p className="text-xs text-zinc-400">Use KAIHA1 for 20% off</p></div>
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST */}
      {showWishlist && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4">
            <div className="flex justify-between mb-4"><h2 className="font-bold text-lg">Wishlist ❤️ (3)</h2><button onClick={()=>setShowWishlist(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            <p className="text-sm text-zinc-400">Your saved items will appear here. Add from product cards.</p>
          </div>
        </div>
      )}

      {/* PROFILE + LOGIN SYSTEM */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto">
            <div className="flex justify-between mb-6"><h2 className="font-bold text-lg">Profile</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            {!isLoggedIn? (
              <div>
                <h3 className="font-bold mb-3">Login to KAIHA</h3>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter Phone - 03XXXXXXXXX" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm mb-3 outline-none" />
                <input type="password" placeholder="Password" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm mb-4 outline-none" />
                <button onClick={()=>setIsLoggedIn(true)} className="w-full bg-white text-black font-bold py-3 rounded-xl">Login / Sign Up</button>
                <p className="text-[11px] text-zinc-500 mt-3 text-center">By continuing, you agree to Terms & Privacy</p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-black text-xl mx-auto">H</div>
                <h3 className="text-center font-bold mt-2">HADI</h3><p className="text-center text-xs text-zinc-400">{phone || "03127912648"}</p>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center"><div className="bg-zinc-900 p-3 rounded-xl"><p className="font-bold">60</p><p className="text-[10px] text-zinc-400">Coins</p></div><div className="bg-zinc-900 p-3 rounded-xl"><p className="font-bold">3</p><p className="text-[10px] text-zinc-400">Orders</p></div><div className="bg-zinc-900 p-3 rounded-xl"><p className="font-bold">Black</p><p className="text-[10px] text-zinc-400">Card</p></div></div>
                <button onClick={()=>setIsLoggedIn(false)} className="mt-6 w-full bg-zinc-800 py-3 rounded-xl font-bold text-sm">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showOrder && (<div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t-2 border-green-500 rounded-t-[20px] p-4 z-50"><div className="flex justify-between"><h3 className="text-green-400 font-bold text-sm">Your order is on the way!</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-7 h-7 rounded-full text-xs">✕</button></div><p className="text-sm mt-1 font-bold">HADI is coming with your order</p><div className="grid grid-cols-2 gap-2 mt-3"><button className="bg-yellow-500 text-black font-bold py-2.5 rounded-xl text-xs">View Rider Location</button><button className="bg-white text-black font-bold py-2.5 rounded-xl text-xs">Call Rider</button></div></div>)}
    </div>
  );
    }
