"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Video, Shirt, Crown, Search, Bell, Heart, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// CATEGORY IMAGES - BAAD MEIN APNI REAL IMAGES KE LINK DAL DENA
const categories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400" },
  { name: "CHILD", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400" },
  { name: "FOOTWEAR", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" },
  { name: "SUMMER COLLECTION", img: "https://images.unsplash.com/photo-1529139574466-a30302731d8b?q=80&w=400" },
  { name: "ESSENTIALS", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400" },
]

const fakeProduct = {
  id: 1,
  shopName: "Seller Shop Name",
  itemName: "Premium Kurta",
  price: 1999,
  colors: ["white", "black", "navy", "maroon"]
}

export default function Home() {
  const router = useRouter();
  const [cart, setCart] = useState([fakeProduct]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState("Fashion");

  useEffect(() => {
    const interval = setInterval(() => setShowLogo((prev) =>!prev), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* 1. TOP NAVBAR - LOGO SWITCH + ICONS */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="relative w-32 h-10 flex items-center">
          <AnimatePresence mode="wait">
            {showLogo? (
              <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-9">
                <Image src="/IMG-20200913-WA5443.jpg" alt="KAIHA Logo" fill className="object-contain" />
              </motion.div>
            ) : (
              <motion.h1 key="text" className="text-2xl font-bold tracking-widest" style={{background: "linear-gradient(90deg, #A855F7, #EAB308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                KAIHA
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <div className="flex gap-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <Heart className="w-6 h-6 cursor-pointer" />
          <User onClick={() => router.push('/profile')} className="w-6 h-6 cursor-pointer" />
          <button onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* 2. SEARCH BAR */}
      <div className="p-3 bg-black">
        <div className="flex items-center bg-gray-900 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input placeholder="Search for products, brands and more" className="bg-transparent outline-none flex-1 ml-2 text-sm" />
          <Mic className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* 3. FASHION BEAUTY HOME TABS */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">
        {["Fashion", "Beauty", "Home"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${activeTab === tab? 'bg-white text-black' : 'bg-gray-800 text-white border border-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4. CATEGORY CHIPS - WITH REAL IMAGES */}
      <div className="flex gap-3 px-3 py-3 overflow-x-auto">
        {categories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer">
            <div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
              <Image
                src={cat.img}
                alt={cat.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-[11px] text-center font-medium leading-tight">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* 5. BANNER WITH IMAGE */}
      <div className="p-3">
        <div className="relative w-full h-40 rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
            alt="Party Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-6 flex-col justify-center">
            <h2 className="text-2xl font-bold">Let's Get THIS PARTY STARTED!</h2>
            <p className="text-lg">Slay New Year Parties</p>
            <p className="text-sm opacity-80">#GetPartyReady</p>
          </div>
        </div>
      </div>

      {/* 6. WEATHER + FRIDAY DROP */}
      <div className="bg-gray-800 text-center p-2 text-sm">☀️ It's Hot in Karachi Today - Shop Lawn Kurtas</div>
      <div className="bg-red-600 text-center p-2 font-bold">🔥 FRIDAY DROP - FRIDAY 9PM - LIMITED 50 PCS</div>

      {/* 7. PRODUCT SECTION */}
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-2">This item from: {fakeProduct.shopName}</p>
        <div className="relative">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-60 mx-auto">
            <Image src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400" alt="Kurta" width={240} height={360} className="rounded-lg" />
          </motion.div>
          <motion.div className="w-6 h-6 rounded-full absolute top-4 right-4 border-2 border-white" style={{ backgroundColor: selectedColor }} />
        </div>
        <h2 className="text-center text-xl mt-4">{fakeProduct.itemName}</h2>
        <p className="text-center text-gray-400">Rs. {fakeProduct.price}</p>
        <div className="flex justify-center gap-2 mt-2">
          {fakeProduct.colors.map(color => (
            <button key={color} onClick={() => setSelectedColor(color)} className="w-6 h-6 rounded-full border-2" style={{backgroundColor: color, borderColor: selectedColor === color? 'white' : 'gray'}}/>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-white text-black p-2 rounded flex items-center justify-center gap-2 font-semibold"><Video size={16}/> Video Call</button>
          <button className="flex-1 bg-gray-700 p-2 rounded flex items-center justify-center gap-2 font-semibold"><Shirt size={16}/> Try-On</button>
        </div>
        <button className="w-full bg-gray-800 mt-2 p-2 rounded font-semibold">🏛️ 3D Store Tour</button>
        <button onClick={() => setCart([...cart, fakeProduct])} className="w-full bg-yellow-500 text-black mt-2 p-2 rounded font-bold">Add to Cart</button>
      </div>

      {/* 8. MY CLOSET */}
      <div className="p-6 border-t border-gray-800">
        <h2 className="text-xl font-bold">👕 My Closet</h2>
        <p className="text-gray-400">Your past purchases. AI will suggest matches soon.</p>
      </div>

      {/* CART */}
      <AnimatePresence>
      {cartOpen && (
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-4 z-50 overflow-y-auto">
          <X onClick={() => setCartOpen(false)} className="mb-4 cursor-pointer"/>
          <h2 className="text-xl mb-4">Your Cart</h2>
          <div className="bg-gray-800 p-3 rounded">
            <p className="font-bold mb-2">-- {fakeProduct.shopName} - SUKKUR --</p>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center mb-2 text-sm">
                <div><p>{item.itemName} - {selectedColor}</p><p className="text-gray-400">Rs.{item.price}</p></div>
                <div className="flex gap-2 items-center"><Minus size={16}/><span>1</span><Plus size={16}/></div>
              </div>
            ))}
            <p className="border-t border-gray-700 pt-2 mt-2">Shop Total: Rs.{fakeProduct.price}</p>
            <button className="w-full bg-green-500 text-black mt-2 p-2 rounded font-bold">Checkout This Shop Only</button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">Founded by HADI - 19, Sukkur Pakistan. Building Billions.</footer>
    </div>
  );
      }
