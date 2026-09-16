"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Search, Bell, Heart, User, PlayCircle, Mic } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fashionCategories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400" },
]
const products = {
  Fashion: { name: "Premium Kurta", price: 1999, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400" },
  Beauty: { name: "Glam Lipstick Set", price: 899, img: "https://images.unsplash.com/photo-1583241800694-2f2b6cbcba3f?q=80&w=400" },
  Home: { name: "Decor Vase Set", price: 2499, img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400" },
}

export default function Home() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState("Fashion");
  useEffect(() => { const i = setInterval(() => setShowLogo(p=>!p), 2500); return ()=>clearInterval(i)}, []);
  const currentCategories = fashionCategories;
  const currentProduct = products[activeTab as keyof typeof products];

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="w-32 h-10 flex items-center">
          <AnimatePresence mode="wait">
            {showLogo ? <motion.h1 key="1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-2xl font-black text-yellow-500">KAIHA</motion.h1> : <motion.h1 key="2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">KAIHA</motion.h1>}
          </AnimatePresence>
        </div>
        <div className="flex gap-4"><Bell className="w-6 h-6"/><Heart className="w-6 h-6"/><User onClick={()=>router.push('/profile')} className="w-6 h-6 cursor-pointer"/><button onClick={()=>setCartOpen(true)} className="relative"><ShoppingCart className="w-6 h-6"/>{cart.length>0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.length}</span>}</button></div>
      </nav>
      <div className="p-6 text-center"><h2 className="text-xl mt-4">{currentProduct.name}</h2><p className="text-gray-400">Rs. {currentProduct.price}</p><button onClick={()=>setCart([...cart, currentProduct])} className="w-full bg-yellow-500 text-black mt-4 p-3 rounded font-bold">Add to Cart</button><button onClick={()=>router.push('/profile')} className="w-full bg-white text-black mt-2 p-3 rounded font-bold">Go to Profile 👤</button></div>
      {cartOpen && <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-4 z-50"><X onClick={()=>setCartOpen(false)} className="mb-4 cursor-pointer"/><h2>Cart ({cart.length})</h2>{cart.map((i,k)=><p key={k}>{i.name}</p>)}</div>}
    </div>
  );
}
