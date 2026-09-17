"use client";
import { useState } from "react";

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [cart,setCart]=useState(0);
  const [active,setActive]=useState("Home");

  const styles = [
    { name:"Minimal", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200" },
    { name:"Evening", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
    { name:"Casual", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200" },
    { name:"Streetwear", img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200" },
    { name:"Accessories", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
  ];

  return(
    <div className="bg-black text-white min-h-screen pb-[95px] max-w-[430px] mx-auto">
      {/* HEADER - Purple K + Gold KAIHA + Hamburger */}
      <div className="flex justify-between items-center px-5 h-[68px] bg-black sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="text-[#7c3aed] text-[42px] font-black leading-none" style={{fontFamily:"serif"}}>K</span>
          <span className="tracking-[0.35em] text-[#D4AF37] text-[19px] font-medium">KAIHA</span>
        </div>
        <button onClick={()=>setMenu(true)} className="text-[#D4AF37] text-[26px]">☰</button>
      </div>

      {/* SEARCH BAR */}
      <div className="px-4">
        <div className="bg-[#0e0e0e] rounded-full h-[48px] flex items-center px-4 gap-3 border border-[#D4AF37]/50">
          <span className="text-[#D4AF37]">⌕</span>
          <input placeholder="Search for products, styles, brands..." className="bg-transparent flex-1 text-[13px] outline-none text-zinc-400 placeholder:text-zinc-500" />
        </div>
      </div>

      {/* BANNER - Fall Collection 2026 */}
      <div className="mx-4 mt-4 rounded-2xl h-[165px] relative overflow-hidden border border-zinc-800 bg-[#111]">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative p-5 h-full flex flex-col justify-center">
          <p className="text-[#D4AF37] text-[11px] font-bold tracking-wide">NEW ARRIVALS</p>
          <p className="text-white text-[26px] font-serif leading-none mt-1">Fall Collection 2026</p>
          <p className="text-zinc-300 text-[11px] mt-1">Luxury. Timeless. Curated for you.</p>
          <button className="mt-3 bg-[#D4AF37] text-black text-[11px] px-4 py-2 rounded-md font-bold w-fit">SHOP NOW</button>
        </div>
      </div>

      {/* SHOP BY STYLE */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-[15px] font-bold">Shop by Style</h3>
          <span className="text-[12px] text-[#D4AF37]">See all ›</span>
        </div>
        <div className="flex gap-4 mt-3 overflow-x-auto scrollbar-hide">
          {styles.map(s=>(
            <div key={s.name} className="min-w-[64px] flex flex-col items-center">
              <div className="w-[60px] h-[60px] rounded-full bg-[#0e0e0e] border border-[#D4AF37]/50 overflow-hidden flex items-center justify-center">
                <img src={s.img} className="w-full h-full object-cover" alt="" />
              </div>
              <span className="text-[11px] mt-2 text-zinc-300">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING NOW - PKR ONLY */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-[15px] font-bold">Trending Now</h3>
          <span className="text-[12px] text-[#D4AF37]">See all ›</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[#111] rounded-2xl p-2 border border-zinc-800">
            <div className="h-[175px] bg-[#0a0a0a] rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-[12px] text-white">Silk Blazer</p>
                <p className="text-[12px] text-[#D4AF37] font-bold">Rs.1899</p>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 border border-[#D4AF37]/70 text-[#D4AF37] text-[11px] h-9 rounded-lg font-medium">ADD TO CART</button>
          </div>
          <div className="bg-[#111] rounded-2xl p-2 border border-zinc-800">
            <div className="h-[175px] bg-[#0a0a0a] rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-[12px] text-white">Leather Bag</p>
                <p className="text-[12px] text-[#D4AF37] font-bold">Rs.2450</p>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} className="w-full mt-2 border border-[#D4AF37]/70 text-[#D4AF37] text-[11px] h-9 rounded-lg font-medium">ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV - Exact like image */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-[#111] border border-[#D4AF37]/50 rounded-t-[24px] flex justify-around py-3 px-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        {[
          {name:"Home", icon:"🏠", active:true},
          {name:"Shop", icon:"👜"},
          {name:"Reels", icon:"▶️"},
          {name:"Bag", icon:"🛍️", count:cart},
          {name:"Profile", icon:"👤"},
        ].map(t=>(
          <button key={t.name} onClick={()=>setActive(t.name)} className={`flex flex-col items-center gap-1 relative ${active===t.name?"text-[#D4AF37]":"text-zinc-500"}`}>
            <span className="text-[20px]">{t.icon}</span>
            {t.count>0 && <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{t.count}</span>}
            <span className="text-[10px]">{t.name}</span>
          </button>
        ))}
      </div>

      {/* SECURE HAMBURGER MENU - NO Admin/Rider/Seller in public */}
      {menu && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setMenu(false)}></div>
          <div className="relative w-[78%] bg-[#0a0a0a] h-full p-5 rounded-l-2xl border-l border-[#D4AF37]/30 overflow-y-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2"><span className="text-[#a855f7] text-[28px] font-bold">K</span><span className="tracking-[0.3em] text-[#D4AF37] text-[16px]">KAIHA</span></div>
              <button onClick={()=>setMenu(false)} className="w-7 h-7 border border-[#D4AF37] rounded-full text-[#D4AF37] text-[12px]">✕</button>
            </div>
            <div className="mt-6 space-y-1 text-[13px] text-[#e8d5a0]">
              {["🏠 Home","🛍️ Shop","📦 My Orders","♡ Wishlist","👑 Black Card","🪙 Coins & Rewards","📞 Contact Us","ℹ️ About Us","❓ FAQs","📄 Terms & Conditions","🔒 Privacy Policy","↩️ Return Policy","🚚 Shipping Info","🎧 Help Center"].map(m=>(
                <div key={m} className="py-3 border-b border-zinc-900">{m}</div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 text-center mt-6">v2.4.1 • KAIHA Luxury Fashion 2026 • PKR Only</p>
          </div>
        </div>
      )}
    </div>
  );
          }
