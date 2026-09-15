"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Video, Shirt, Sun, Crown } from "lucide-react";

// FAKE DATA - BAAD MEIN SELLER KHUD DALEGA
const fakeProduct = {
  id: 1,
  shopName: "Seller Shop Name",
  itemName: "Premium Kurta",
  price: 1999,
  colors: ["white", "black", "navy", "maroon"]
}

export default function Home() {
  const [cart, setCart] = useState([{...fakeProduct, qty: 1}]); // FIX 1: qty add ki
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-40">
        <h1 className="text-2xl font-bold tracking-widest">KAIHA</h1>
        <div className="flex gap-4">
          <Mic onClick={() => alert('Voice Search - Coming Soon')} className="cursor-pointer" /> {/* FIX 3 */}
          <Crown size={20} onClick={() => alert('AI Stylist Crown - Coming Soon')} className="cursor-pointer" /> {/* FIX 3 */}
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1"> {/* FIX 2 */}
            <ShoppingCart />
            <span className="text-xs">My Closet</span> {/* FIX 2: Meri Almari -> My Closet */}
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.reduce((a,b) => a + b.qty, 0)}</span>}
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
            animate={{ backgroundColor: selectedColor === "white"? fakeProduct.colors : [selectedColor] }}
            transition={{ repeat: Infinity, duration: 3 }}
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

        {/* 37. VIDEO CALL + 34. VIRTUAL TRY-ON + 35. 3D TOUR */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => alert('Video Call with Seller - Coming in Week 2')}
            className="flex-1 bg-white text-black p-2 rounded flex items-center justify-center gap-2"
          >
            📞 Video Call with Seller
          </button>
          <button
            onClick={() => alert('Virtual Try-On Camera - Coming in Week 2')}
            className="flex-1 bg-gray-700 p-2 rounded flex items-center justify-center gap-2"
          >
            👔 Virtual Try-On
          </button>
        </div>
        
        {/* 35. 3D STORE TOUR */}
        <button
          onClick={() => alert('3D Store Tour - Coming Soon')}
          className="w-full bg-gray-800 mt-2 p-2 rounded"
        >
          🏛️ 3D Store Tour
        </button>

        <button onClick={() => {
          const exists = cart.find(i => i.id === fakeProduct.id)
          if(exists) {
            setCart(cart.map(i => i.id === fakeProduct.id? {...i, qty: i.qty + 1} : i))
          } else {
            setCart([...cart, {...fakeProduct, qty: 1}])
          }
        }} className="w-full bg-yellow-500 text-black mt-2 p-2 rounded font-bold">
          Add to Cart
        </button>
      </div>

      {/* CART DRAWER - FIX 2 */}
      <AnimatePresence>
      {cartOpen && (
        <motion.div 
          initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}}
          className="fixed right-0 top-0 h-full w-80 bg-gray-900 p-4 z-50">
          <X onClick={() => setCartOpen(false)} className="cursor-pointer mb-4" />
          <h2 className="text-xl font-bold mb-4">My Closet</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <div>
                <p>{item.itemName}</p>
                <p className="text-sm text-gray-400">Rs. {item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Minus size={16} className="cursor-pointer" onClick={() => 
                  setCart(cart.map(i => i.id === item.id && i.qty > 1? {...i, qty: i.qty-1} : i).filter(i => i.qty > 0))
                } />
                <span>{item.qty}</span>
                <Plus size={16} className="cursor-pointer" onClick={() => 
                  setCart(cart.map(i => i.id === item.id? {...i, qty: i.qty + 1} : i))
                } />
              </div>
            </div>
          ))}
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
            }
