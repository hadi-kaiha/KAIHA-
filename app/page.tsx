"use client";
import { useState, useEffect } from "react";

// Professional SVG Icons
const BellIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
const HeartIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const UserIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CartIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const PlayIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>;

const fashionCircles = [
  { id: "genz", name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=200" },
  { id: "winter", name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200" },
  { id: "men", name: "MEN", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
  { id: "women", name: "WOMEN", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Fashion"|"Beauty"|"Home">("Fashion");
  const [activeCollection, setActiveCollection] = useState<string|null>(null);
  const [cart, setCart] = useState(1);
  const [live, setLive] = useState(16);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showOrder, setShowOrder] = useState(true);

  useEffect(()=>{ const i=setInterval(()=>setLive(c=>Math.max(8,c+(Math.random()>0.5?1:-1))),3000); return()=>clearInterval(i); },[]);

  return (
    <div className="bg-black text-white min-h-screen pb-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
       .kaiha-logo{font-family:'Syne',sans-serif; font-weight:800; letter-spacing:2px; background: linear-gradient(90deg,#a855f7,#ec4899,#facc15,#a855f7); background-size:300% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: gradientMove 3s linear infinite;}
        @keyframes gradientMove{0%{background-position:0% 50%}100%{background-position:100% 50%}}
       .no-scrollbar::-webkit-scrollbar{display:none}
      `}</style>

      {/* HEADER */}
      <nav className="flex justify-between items-center p-4 sticky top-0 bg-black z-40 border-b border-zinc-900">
        <h1 className="kaiha-logo text-3xl">KAIHA</h1>
        <div className="flex gap-5 items-center">
          <button onClick={()=>setShowNotif(true)}><BellIcon/></button>
          <button onClick={()=>setShowWishlist(true)}><HeartIcon/></button>
          <button onClick={()=>setShowProfile(true)}><UserIcon/></button>
          <button onClick={()=>setShowCart(true)} className="relative"><CartIcon/>{cart>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart}</span>}</button>
        </div>
      </nav>

      <div className="p-3">
        <div className="bg-[#1c1c1f] rounded-full flex items-center px-4 py-3 gap-3">
          <SearchIcon/><input defaultValue="HOODIE" className="bg-transparent flex-1 text-sm font-bold outline-none" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </div>
      </div>

      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)} className={`px-7 py-3 rounded-full text-sm font-black tracking-wide border transition-all ${activeTab===t?"bg-white text-black border-white":"bg-[#1c1c1f] border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {activeTab==="Fashion" && (
        <div className="px-4 py-5 flex gap-5 overflow-x-auto no-scrollbar border-b border-zinc-900">
          {fashionCircles.map(c=>(
            <button key={c.id} onClick={()=>setActiveCollection(c.name)} className="flex flex-col items-center gap-2 min-w-[80px]">
              <img src={c.img} className={`w-[78px] h-[78px] rounded-full object-cover border-2 transition-all ${activeCollection===c.name?"border-yellow-500 scale-110":"border-zinc-700"}`} alt={c.name}/>
              <span className="text-[11px] font-black tracking-wider">{c.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="px-4 py-3 text-[11px] text-zinc-500 font-bold">LIVE {live} • FLASH 59:30 • AI SIZE: M • COINS: 60 • SMART CART: {cart} ITEMS</div>

      <div className="p-3 grid grid-cols-2 gap-3">
        <div className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" className="w-full h-64 object-cover"/><div className="p-3"><h3 className="font-bold text-sm">Gen Z Oversized Tee</h3><p className="text-xs text-zinc-500">T-Shirts • Male</p><div className="flex justify-between mt-2"><span className="font-black">Rs. 1999</span><button onClick={()=>setCart(c=>c+1)} className="bg-yellow-500 text-black text-[10px] font-black px-4 py-2 rounded-full">+10 COINS</button></div></div></div>
        <div className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900"><img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" className="w-full h-64 object-cover"/><div className="p-3"><h3 className="font-bold text-sm">Winter Hoodie</h3><p className="text-xs text-zinc-500">Winter • Both</p><div className="flex justify-between mt-2"><span className="font-black">Rs. 3499</span><button onClick={()=>setCart(c=>c+1)} className="bg-yellow-500 text-black text-[10px] font-black px-4 py-2 rounded-full">+10 COINS</button></div></div></div>
      </div>

      {/* KAIHA TV - AB VIDEO CHALEGA */}
      <div className="p-4">
        <div className="flex justify-between mb-3"><h2 className="font-black flex gap-2 items-center"><span className="border border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-[10px]">▶</span> KAIHA TV</h2><span className="text-xs text-zinc-500">Shop from Videos</span></div>
        <button onClick={()=>setShowVideo(true)} className="w-full bg-zinc-900 rounded-2xl overflow-hidden text-left border border-zinc-800">
          <div className="relative"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" className="w-full h-64 object-cover"/><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"><PlayIcon/></div></div></div>
          <div className="p-4 bg-[#1c1c1f] flex justify-between items-center"><div><h3 className="font-bold text-sm">3 Ways to Style This Kurta</h3><p className="text-xs text-zinc-400">Premium Kurta</p><p className="font-black mt-1">Rs. 1999</p></div><span className="bg-yellow-500 text-black font-black px-5 py-2 rounded-full text-sm">Add to Cart</span></div>
        </button>
      </div>

      {/* --- DRAWERS --- */}
      {showCart && <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={()=>setShowCart(false)}><div onClick={e=>e.stopPropagation()} className="absolute right-0 top-0 h-full w-[85%] bg-[#121212] p-5 rounded-l-3xl"><div className="flex justify-between"><h2 className="font-black text-xl">Smart Cart ({cart})</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="mt-10 text-center text-zinc-500">Your cart is ready • Coupon KAIHA1 applied -20% • +{cart*10} Coins</div><button className="mt-6 w-full bg-yellow-500 text-black font-black py-3 rounded-full">Checkout Rs. {cart*1999}</button></div></div>}
      {showWishlist && <div className="fixed inset-0 z-[100] bg-black/80" onClick={()=>setShowWishlist(false)}><div onClick={e=>e.stopPropagation()} className="absolute right-0 top-0 h-full w-[85%] bg-[#121212] p-5 rounded-l-3xl"><div className="flex justify-between"><h2 className="font-black text-xl">Wishlist ❤️</h2><button onClick={()=>setShowWishlist(false)}>✕</button></div><p className="mt-10 text-zinc-500">No items yet • Complete Look AI will suggest here</p></div></div>}
      {showProfile && <div className="fixed inset-0 z-[100] bg-black/80" onClick={()=>setShowProfile(false)}><div onClick={e=>e.stopPropagation()} className="absolute right-0 top-0 h-full w-[85%] bg-[#121212] p-5 rounded-l-3xl"><div className="flex justify-between"><h2 className="font-black text-xl">Profile</h2><button onClick={()=>setShowProfile(false)}>✕</button></div><div className="mt-6 space-y-3"><div className="bg-zinc-900 p-3 rounded-xl">👤 HADI • Black Card Member</div><div className="bg-zinc-900 p-3 rounded-xl">🪙 60 Coins • Refer 20 Coins</div><div className="bg-zinc-900 p-3 rounded-xl">📦 My Orders • Wishlist • Complete Look</div></div></div></div>}
      {showNotif && <div className="fixed inset-0 z-[100] bg-black/80" onClick={()=>setShowNotif(false)}><div onClick={e=>e.stopPropagation()} className="absolute right-0 top-0 h-full w-[85%] bg-[#121212] p-5 rounded-l-3xl"><div className="flex justify-between"><h2 className="font-black text-xl">Notifications</h2><button onClick={()=>setShowNotif(false)}>✕</button></div><p className="mt-6 bg-yellow-500/20 text-yellow-500 p-3 rounded-xl text-sm">Flash Sale 59:30 left! Gen Z Drip 50% off</p></div></div>}
      {showVideo && <div className="fixed inset-0 z-[100] bg-black flex flex-col"><button onClick={()=>setShowVideo(false)} className="p-4 text-left">✕ Close</button><video autoPlay controls className="w-full flex-1 object-cover" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video><div className="p-4 bg-[#1c1c1f] flex justify-between"><span className="font-bold">Premium Kurta - Rs.1999</span><button onClick={()=>{setCart(c=>c+1); setShowVideo(false)}} className="bg-yellow-500 text-black font-black px-6 py-2 rounded-full">Add to Cart</button></div></div>}

      {showOrder && <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t-2 border-green-500 rounded-t-[24px] p-4 z-40"><div className="flex justify-between"><h3 className="text-green-400 font-black text-sm">Your order is on the way!</h3><button onClick={()=>setShowOrder(false)} className="bg-zinc-800 w-7 h-7 rounded-full text-xs">✕</button></div><p className="text-sm font-bold mt-1">HADI is coming</p><p className="text-[11px] text-zinc-500">Live GPS • 03127912648</p></div>}
    </div>
  );
        }
