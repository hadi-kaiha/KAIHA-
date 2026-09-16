"use client";
import { useState } from "react";
import { Bell, Heart, User, ShoppingCart, Search, Mic, Play } from "lucide-react";

const fashionSub = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=200" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=200" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
];
const beautySub = [
  { name: "MAKEUP", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200" },
  { name: "SKINCARE", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" },
  { name: "HAIRCARE", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200" },
  { name: "FRAGRANCE", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200" },
];
const homeSub = [
  { name: "DECOR", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200" },
  { name: "BEDDING", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=200" },
  { name: "KITCHEN", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200" },
  { name: "LIGHTING", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=200" },
];

export default function Home(){
  const [activeMain, setActiveMain] = useState("Fashion");
  const [cart, setCart] = useState(1);

  const getSubs = () => {
    if(activeMain==="Beauty") return beautySub;
    if(activeMain==="Home") return homeSub;
    return fashionSub;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HEADER - EXACT LIKE YOUR SCREENSHOT */}
      <header className="flex justify-between items-center p-4 border-b border-gray-900">
        <h1 className="text-3xl font-black tracking-widest" style={{background: 'linear-gradient(90deg, #a855f7, #facc15)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>KAIHA</h1>
        <div className="flex items-center gap-4">
          <Bell className="w-7 h-7" />
          <Heart className="w-7 h-7" />
          <User className="w-7 h-7" />
          <div className="relative">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cart}</span>
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <div className="p-4">
        <div className="bg-[#1a2332] rounded-full flex items-center px-4 py-3">
          <Search className="text-gray-400 w-6 h-6" />
          <input placeholder="Search for products, brands and more" className="bg-transparent w-full ml-3 text-sm outline-none text-gray-300 placeholder-gray-500" />
          <Mic className="text-gray-400 w-6 h-6" />
        </div>
      </div>

      {/* MAIN TABS - Fashion Beauty Home */}
      <div className="px-4 flex gap-3 overflow-x-auto">
        {["Fashion","Beauty","Home"].map(tab=>(
          <button key={tab} onClick={()=>setActiveMain(tab)} className={`px-6 py-3 rounded-full font-bold whitespace-nowrap ${activeMain===tab? 'bg-white text-black' : 'bg-[#1a2332] text-white border border-gray-800'}`}>{tab}</button>
        ))}
      </div>

      {/* CIRCULAR CATEGORIES */}
      <div className="px-2 mt-6 flex gap-4 overflow-x-auto pb-4">
        {getSubs().map(cat=>(
          <div key={cat.name} className="flex flex-col items-center min-w-[80px]">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-800 bg-[#1a2332]">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-bold mt-2 text-center whitespace-nowrap">{cat.name}</p>
          </div>
        ))}
      </div>

      <div className="h-[1px] bg-gray-900 my-2"></div>

      {/* KAIHA TV */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center"><Play className="w-4 h-4 text-red-600 fill-red-600" /></div>
            <h2 className="text-2xl font-black">KAIHA TV</h2>
          </div>
          <p className="text-gray-500 text-sm">Shop from Videos</p>
        </div>

        {/* VIDEO CARD */}
        <div className="mt-4 bg-[#111c2e] rounded-2xl overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600" alt="product" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">3 Ways to Style This Kurta</h3>
              <p className="text-gray-400 text-sm mt-1">Premium Kurta</p>
              <p className="font-black text-xl mt-1">Rs. 1999</p>
            </div>
            <button onClick={()=>setCart(cart+1)} className="bg-yellow-500 text-black font-bold px-5 py-3 rounded-full text-sm">Add to Cart</button>
          </div>
        </div>

        {/* BANNER */}
        <div className="mt-6 rounded-2xl overflow-hidden relative h-48">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center p-6">
            <h2 className="text-3xl font-black leading-tight">Let's Get THIS PARTY STARTED!</h2>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  )
  }
