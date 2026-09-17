"use client";
import { useState } from "react";
export default function Home(){
  const [menu,setMenu]=useState(false);
  const [active,setActive]=useState("Home");
  const [cart,setCart]=useState(0);
  const publicMenu=["Home","Shop","My Orders","Wishlist","Black Card","Coins","Contact Us","About Us","FAQs","Terms","Privacy Policy","Return Policy","Shipping Info","Help Center"];
  return(
    <div className="bg-black text-white min-h-screen pb-[90px]">
      <div className="flex justify-between items-center px-4 h-[68px] sticky top-0 bg-black z-30">
        <div className="flex items-center gap-2"><span className="text-[#a855f7] text-[36px] font-bold">K</span><span className="tracking-[0.4em] text-[#D4AF37] text-[20px]">KAIHA</span></div>
        <button onClick={()=>setMenu(true)} className="text-[#D4AF37] text-[26px]">☰</button>
      </div>

      <div className="mx-4 bg-[#111] rounded-full h-11 flex items-center px-4 border border-[#D4AF37]/40 gap-2">
        <span>🔍</span><input placeholder="Search for products, styles, brands..." className="bg-transparent flex-1 text-[13px] outline-none text-zinc-400"/>
      </div>

      <div className="mx-4 mt-4 rounded-2xl h-[140px] bg-[#111] border border-zinc-800 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-2xl" alt=""/>
        <div className="relative p-4"><p className="text-[#D4AF37] text-[11px]">NEW ARRIVALS</p><p className="text-white text-[22px] font-serif">Fall Collection 2026</p><p className="text-zinc-300 text-[11px]">Luxury. Timeless. Curated for you.</p><button className="mt-2 bg-[#D4AF37] text-black px-4 py-1.5 rounded-md text-[11px] font-bold">SHOP NOW</button></div>
      </div>

      <div className="px-4 mt-5"><div className="flex justify-between"><p className="font-bold text-[14px]">Shop by Style</p><span className="text-[#D4AF37] text-[11px]">See all ›</span></div>
        <div className="flex gap-3 mt-2 overflow-x-auto">{["Minimal","Evening","Casual","Streetwear","Accessories"].map(n=><div key={n} className="min-w-[64px] flex flex-col items-center"><div className="w-14 h-14 rounded-full bg-[#111] border border-[#D4AF37]/40"></div><span className="text-[10px] mt-1">{n}</span></div>)}</div>
      </div>

      <div className="px-4 mt-5"><div className="flex justify-between"><p className="font-bold text-[14px]">Trending Now</p><span className="text-[#D4AF37] text-[11px]">See all ›</span></div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-[#111] rounded-xl p-2 border border-zinc-800"><div className="h-36 bg-black rounded-lg"></div><p className="text-center text-[11px] mt-2">Silk Blazer</p><p className="text-center text-[#D4AF37] text-[11px] font-bold">Rs.1899</p><button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 border border-[#D4AF37] text-[#D4AF37] h-7 rounded-md text-[10px]">ADD TO CART</button></div>
          <div className="bg-[#111] rounded-xl p-2 border border-zinc-800"><div className="h-36 bg-black rounded-lg"></div><p className="text-center text-[11px] mt-2">Leather Bag</p><p className="text-center text-[#D4AF37] text-[11px] font-bold">Rs.2450</p><button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 border border-[#D4AF37] text-[#D4AF37] h-7 rounded-md text-[10px]">ADD TO CART</button></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#D4AF37] rounded-t-3xl flex justify-around py-3 z-40">
        {["Home","Shop","Reels","Bag","Profile"].map(t=><button key={t} onClick={()=>setActive(t)} className={`${active===t?"text-[#D4AF37]":"text-zinc-500"} flex flex-col items-center text-[10px]`}><span className="text-[18px]">{t==="Home"?"🏠":t==="Shop"?"👜":t==="Reels"?"▶️":t==="Bag"?"🛍️":"👤"}</span>{t}{t==="Bag" && cart>0?` (${cart})`:""}</button>)}
      </div>

      {menu && <div className="fixed inset-0 z-50 flex justify-end"><div className="absolute inset-0 bg-black/70" onClick={()=>setMenu(false)}></div><div className="relative w-[78%] bg-[#0a0a0a] h-full p-5 rounded-l-2xl border-l border-[#D4AF37]/30"><div className="flex justify-between"><span className="tracking-[0.3em] text-[#D4AF37]">KAIHA</span><button onClick={()=>setMenu(false)} className="w-7 h-7 border border-[#D4AF37] rounded-full text-[#D4AF37]">✕</button></div><div className="mt-6 space-y-3 text-[13px] text-[#e8d5a0]">{publicMenu.map(m=><p key={m}>• {m}</p>)}</div><p className="text-[10px] text-zinc-600 text-center mt-8">v2.4.1 • KAIHA 2026</p><p className="text-[9px] text-zinc-700 text-center mt-2">Admin/Rider/Seller hidden - secret links only</p></div></div>}
    </div>
  );
}
