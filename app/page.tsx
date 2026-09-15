"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Video, Shirt, Sun, Crown } from "lucide-react";
import Image from "next/image";

// NAVBAR COMPONENT UPAR HI LIKH DIYA
function Navbar() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((prev) =>!prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black border-b border-gray-800 flex items-center justify-center z-50">
      <div className="relative w-40 h-10">
        <div className={`absolute inset-0 transition-opacity duration-500 ${showLogo? "opacity-100" : "opacity-0"}`}>
          <Image src="/IMG-20200913-WA5443.jpg" alt="Logo" fill className="object-contain" />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white tracking-widest transition-opacity duration-500 ${showLogo? "opacity-0" : "opacity-100"}`}>
          KAIHA
        </div>
      </div>
    </nav>
  );
}

// FAKE DATA - BAAD MEIN SELLER KHUD DALEGA
const fakeProduct = {
  id: 1,
  shopName: "Seller Shop Name",
  itemName: "Premium Kurta",
  price: 1999,
  colors: ["white", "black", "navy", "maroon"]
}

export default function Home() {
  const [cart, setCart] = useState([fakeProduct]); 
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-16"> {/* pt-16 navbar ke liye */}

      <Navbar /> {/* YEH NAYA NAVBAR */}

      {/* NAVBAR ICONS WALA BAR */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-16 bg-black z-40">
        <h1 className="text-2xl font-bold tracking-widest">KAIHA</h1>
        <div className="flex gap-4">
          <Mic /> {/* 33. VOICE SHOP */}
          <Crown size={20} /> {/* 40. BLACK CARD */}
          <button onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* 39. WEATHER SUGGESTION */}
      <div className="bg-gray-800 text-center p-2 text-sm">☀️ Aaj Garmi Hai Karachi Mein - Lawn Kurte Dekhein</div>

      {/* 36. FRIDAY DROP BANNER */}
      <div className="bg-red-600 text-center p-2 font-bold">🔥 FRIDAY DROP - JUMA 9PM - LIMITED 50 PCS</div>

      {/* PRODUCT SECTION */}
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-2">This item from: {fakeProduct.shopName}</p>

        <div className="relative">
          {/* 1. FLOATING ANIMATION */}
          <motion.img
            src="https://via.placeholder.com/200x300/222/fff?text=Kurta"
            className="w-60 mx-auto rounded-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />

          {/* 2. AUTO COLOR CHANGING CIRCLE */}
          <motion.div
            className="w-6 h-6 rounded-full absolute top-4 right-4 border-2 border-white"
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        <h2 className="text-center text-xl mt-4">{fakeProduct.itemName}</h2>
        <p className="text-center text-gray-400">Rs. {fakeProduct.price}</p>

        {/* COLOR SELECT */}
        <div className="flex justify-center gap-2 mt-2">
          {fakeProduct.colors.map(color => (
            <button key={color} onClick={() => setSelectedColor(color)}
              className="w-6 h-6 rounded-full border" style={{backgroundColor: color}}/>
          ))}
        </div>

        {/* 37. BHAI SE BAAT + 34. VIRTUAL WARDROBE */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-white text-black p-2 rounded flex items-center justify-center gap-2"><Video size={16}/> Bhai Se Baat</button>
          <button className="flex-1 bg-gray-700 p-2 rounded flex items-center justify-center gap-2"><Shirt size={16}/> Try On</button>
        </div>

        {/* 35. 3D DUKAN TOUR */}
        <button className="w-full bg-gray-800 mt-2 p-2 rounded">🏪 Dukaan Ka Tour Dekho</button>

        <button onClick={() => setCart([...cart, fakeProduct])} className="w-full bg-yellow-500 text-black mt-2 p-2 rounded font-bold">Add to Cart</button>
      </div>

      {/* 34. VIRTUAL WARDROBE SECTION */}
      <div className="p-6 border-t border-gray-800">
        <h2 className="text-xl font-bold">👕 Meri Almari</h2>
        <p className="text-gray-400">Your past purchases. AI will suggest matches soon.</p>
      </div>

      {/* 4. ACCORDION CART */}
      <AnimatePresence>
      {cartOpen && (
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-4 z-50 overflow-y-auto">
          <X onClick={() => setCartOpen(false)} className="mb-4 cursor-pointer"/>
          <h2 className="text-xl mb-4">Your Cart</h2>

          <div className="bg-gray-800 p-3 rounded">
            <p className="font-bold mb-2">-- {fakeProduct.shopName} - SUKKUR --</p>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center mb-2 text-sm">
                <div>
                  <p>{item.itemName} {selectedColor}</p>
                  <p className="text-gray-400">Rs.{item.price}</p>
                </div>
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
      <footer className="text-center py-10 text-gray-500 text-sm">
        Founded by HADI - 19, Sukkur Pakistan. Building Billions.
      </footer>
    </div>
  );
            }
