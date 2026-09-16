"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Video, Shirt, Search, Bell, Heart, User, PlayCircle } from "lucide-react";

const fashionCategories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400" },
]
const beautyCategories = [
  { name: "MAKEUP", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400" },
  { name: "SKINCARE", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400" },
]
const homeCategories = [
  { name: "HOME DECOR", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400" },
]

const allProducts = [
  { id: 1, name: "Premium Kurta", price: 1999, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400", category: "MEN", shop: "KAIHA Official" },
  { id: 2, name: "Gen Z Hoodie", price: 2999, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400", category: "GEN Z DRIP", shop: "HADI FASHION" },
  { id: 3, name: "Winter Jacket", price: 4500, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400", category: "WINTER EDIT", shop: "KAIHA Official" },
]

export default function Home(){
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter(p => activeCat==="ALL" || p.category===activeCat);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HEADER - CLEAN - NO SELLER LINK */}
      <header className="sticky top-0 bg-black z-50 p-4 border-b border-gray-900 flex justify-between items-center">
        <h1 className="text-3xl font-black text-yellow-500 tracking-tighter">KAIHA</h1>
        <div className="flex items-center gap-4">
          <Search className="text-gray-400" />
          <Bell className="text-gray-400" />
          <div className="relative" onClick={()=>setShowCart(true)}>
            <ShoppingCart className="text-white" />
            {cart.length>0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.length}</span>}
          </div>
        </div>
      </header>

      <div className="p-4">
        <h2 className="text-xl font-bold">KAIHA TV - Founded by HADI</h2>
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
          {["ALL","GEN Z DRIP","WINTER EDIT","MEN","WOMEN"].map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${activeCat===c?'bg-white text-black border-white':'bg-gray-900 border-gray-800 text-gray-400'}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {filtered.map(p=>(
            <div key={p.id} className="bg-gray-900 rounded-xl overflow-hidden">
              <img src={p.img} className="w-full h-48 object-cover" />
              <div className="p-3">
                <h3 className="font-bold text-sm">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.shop}</p>
                <p className="font-bold text-yellow-500 mt-1">Rs. {p.price}</p>
                <button onClick={()=>setCart([...cart,p])} className="w-full bg-yellow-500 text-black text-sm font-bold py-2 rounded-lg mt-2">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <AnimatePresence>
        {showCart && (
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed inset-0 bg-black z-[100] p-4">
            <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Cart ({cart.length})</h2><X onClick={()=>setShowCart(false)} /></div>
            <div className="mt-6 space-y-3">{cart.map((c,i)=><div key={i} className="flex justify-between bg-gray-900 p-3 rounded"><span>{c.name}</span><span>Rs.{c.price}</span></div>)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center py-10 text-gray-600 text-xs">© 2025 KAIHA - Sukkur</footer>
    </div>
  )
   }
