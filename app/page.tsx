"use client";
import { useState } from "react";

export default function Home(){
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  // CUSTOMER ke liye hi menu - NO Admin/Rider/Seller
  const publicMenu = [
    { icon:"🏠", name:"Home", path:"/" },
    { icon:"🛍️", name:"Shop", path:"/" },
    { icon:"📦", name:"My Orders", path:"/" },
    { icon:"♡", name:"Wishlist", path:"/" },
    { icon:"👑", name:"Black Card", path:"/" },
    { icon:"🪙", name:"Coins & Rewards", path:"/" },
    { icon:"📞", name:"Contact Us", path:"/" },
    { icon:"ℹ️", name:"About Us", path:"/" },
    { icon:"❓", name:"FAQs", path:"/" },
    { icon:"📄", name:"Terms & Conditions", path:"/" },
    { icon:"🔒", name:"Privacy Policy", path:"/" },
    { icon:"↩️", name:"Return Policy", path:"/" },
    { icon:"🚚", name:"Shipping Info", path:"/" },
    { icon:"🎧", name:"Help Center", path:"/" },
  ];

  return(
    <div className="bg-black text-white min-h-screen pb-[90px]">
      <style>{`*{font-family:'Inter',sans-serif}`}</style>

      {/* HEADER - Purple K Logo + Hamburger right corner */}
      <nav className="flex justify-between items-center px-4 h-[68px] sticky top-0 bg-black z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center"><span className="text-[#a855f7] text-[36px] font-bold" style={{fontFamily:"serif"}}>K</span></div>
          <h1 className="tracking-[0.4em] text-[#D4AF37] text-[20px]">KAIHA</h1>
        </div>
        <button onClick={()=>setShowMenu(true)} className="text-[#D4AF37] text-[26px]">☰</button>
      </nav>

      <div className="px-4">
        <div className="bg-[#111] rounded-full h-[44px] flex items-center px-4 gap-3 border border-[#D4AF37]/50">
          <span>🔍</span><input placeholder="Search for products, styles, brands..." className="bg-transparent flex-1 text-[13px] outline-none text-zinc-400" />
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-2xl h-[140px] bg-[#111] relative overflow-hidden border border-zinc-800">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
        <div className="relative p-4"><p className="text-[#D4AF37] text-[11px]">NEW ARRIVALS</p><p className="text-[22px] font-serif">Fall Collection 2026</p><p className="text-[11px] text-zinc-300">Luxury. Timeless. Curated for you.</p><button className="mt-2 bg-[#D4AF37] text-black text-[11px] px-4 py-1.5 rounded-md font-bold">SHOP NOW</button></div>
      </div>

      <div className="px-4 mt-5">
        <div className="flex justify-between"><h3 className="text-[14px] font-bold">Shop by Style</h3><span className="text-[11px] text-[#D4AF37]">See all ›</span></div>
        <div className="flex gap-4 mt-2 overflow-x-auto">
          {["Minimal","Evening","Casual","Streetwear","Accessories"].map(n=><div key={n} className="min-w-[60px] flex flex-col items-center"><div className="w-14 h-14 rounded-full bg-[#111] border border-[#D4AF37]/50"></div><span className="text-[10px] mt-1">{n}</span></div>)}
        </div>
      </div>

      <div className="px-4 mt-5">
        <div className="flex justify-between"><h3 className="text-[14px] font-bold">Trending Now</h3><span className="text-[11px] text-[#D4AF37]">See all ›</span></div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-[#111] rounded-xl p-2 border border-zinc-800"><div className="h-[140px] bg-black rounded-lg"></div><p className="text-[11px] mt-2 text-center">Silk Blazer</p><p className="text-[11px] text-[#D4AF37] text-center">$189.00</p><button className="w-full mt-2 border border-[#D4AF37] text-[#D4AF37] text-[10px] h-7 rounded-md">ADD TO CART</button></div>
          <div className="bg-[#111] rounded-xl p-2 border border-zinc-800"><div className="h-[140px] bg-black rounded-lg"></div><p className="text-[11px] mt-2 text-center">Leather Bag</p><p className="text-[11px] text-[#D4AF37] text-center">$245.00</p><button className="w-full mt-2 border border-[#D4AF37] text-[#D4AF37] text-[10px] h-7 rounded-md">ADD TO CART</button></div>
        </div>
      </div>

      {/* BOTTOM NAV - Home Shop Reels Bag Profile */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#D4AF37] rounded-t-3xl flex justify-around py-3 z-40">
        {[
          {name:"Home", icon:"🏠"},
          {name:"Shop", icon:"👜"},
          {name:"Reels", icon:"▶️"},
          {name:"Bag", icon:"🛍️"},
          {name:"Profile", icon:"👤"},
        ].map(t=><button key={t.name} onClick={()=>setActiveTab(t.name)} className={`flex flex-col items-center ${activeTab===t.name?"text-[#D4AF37]":"text-zinc-500"}`}><span>{t.icon}</span><span className="text-[10px]">{t.name}</span></button>)}
      </div>

      {/* SECURE DRAWER - NO Admin/Rider/Seller */}
      {showMenu && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setShowMenu(false)}></div>
          <div className="relative w-[78%] bg-[#0a0a0a] h-full p-5 rounded-l-2xl border-l border-[#D4AF37]/30 overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2"><span className="text-[#a855f7] text-[28px] font-bold">K</span><span className="tracking-[0.3em] text-[#D4AF37]">KAIHA</span></div>
              <button onClick={()=>setShowMenu(false)} className="w-7 h-7 border border-[#D4AF37] rounded-full text-[#D4AF37]">✕</button>
            </div>
            {publicMenu.map(m=>(
              <button key={m.name} className="w-full flex gap-3 py-3 text-left text-[13px] text-[#e8d5a0]"><span>{m.icon}</span>{m.name}</button>
            ))}
            <p className="text-[10px] text-zinc-600 text-center mt-6">v2.4.1 • KAIHA Luxury Fashion 2026</p>
          </div>
        </div>
      )}
    </div>
  );
}
