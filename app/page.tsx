"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Video, Shirt, Sun, Crown } from "lucide-react";

// FAKE DATA
const fakeProduct = {
  id: 1,
  shopName: "Seller Shop Name",
  itemName: "Premium Kurta",
  price: 1999,
  colors: ["white", "black", "navy", "maroon"]
}

export default function Home() {
  const [cart, setCart] = useState([{...fakeProduct, qty: 1}]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");

  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-40">
        <h1 className="text-2xl font-bold tracking-widest">KAIHA</h1>
        <div className="flex gap-4 items-center">
          <Mic onClick={() => alert('Voice Search - Coming Soon')} className="cursor-pointer" />
          <Crown size={20} onClick={() => alert('AI Stylist Crown - Coming Soon')} className="cursor-pointer" />
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1">
            <ShoppingCart />
            <span className="text-xs">My Closet</span>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.reduce((a,b) => a + b.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* WEATHER + FRIDAY DROP */}
      <div className="bg-gray-800 text-center p-2 text-sm">☀️ Aaj Garmi Hai Karachi Mein - Lawn Kurte Dekhein</div>
      <div className="bg-red-600 text-center p-2 font-bold">🔥 FRIDAY DROP - JUMA 9PM - LIMITED 50 PCS</div>

      {/* MYNRA STYLE CATEGORIES */}
      <div className="flex gap-4 overflow-x-auto p-4">
        {[
          {name: "GEN Z DRIP", img: "https://via.placeholder.com/80/FFD700/000?text=I"},
          {name: "WINTER EDIT", img: "https://via.placeholder.com/80/333/fff?text=W"},
          {name: "MEN", img: "https://via.placeholder.com/80/222/fff?text=M"},
          {name: "WOMEN", img: "https://via.placeholder.com/80/222/fff?text=W"},
          {name: "FOOTWEAR", img: "https://via.placeholder.com/80/222/fff?text=F"},
          {name: "ACCESSORIES", img: "https://via.placeholder.com/80/222/fff?text=A"},
          {name: "BEAUTY", img: "https://via.placeholder.com/80/222/fff?text=B"},
          {name: "HOME", img: "https://via.placeholder.com/80/222/fff?text=H"},
        ].map(cat => (
          <motion.div
            key={cat.name}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer"
            onClick={() => alert(`${cat.name} - Coming Soon`)}
          >
            <div className="w-20 h-20 rounded-lg bg-gray-800 flex items-center justify-center">
              <img src={cat.img} className="w-16 h-16 rounded" />
            </div>
            <span className="text-xs text-center">{cat.name}</span>
          </motion.div>
        ))}
      </div>

      {/* BANNER SLIDER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-4 rounded-xl overflow-hidden mb-6"
      >
        <img
          src="https://via.placeholder.com/600x300/111/fff?text=Slay+New+Year+Parties"
          className="w-full"
        />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold">Slay New Year Parties</h2>
          <p className="text-sm">Countdown to dazzle up! #GetPartyReady</p>
        </div>
      </motion.div>

      {/* PRODUCT SECTION */}
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-2">This item from: {fakeProduct.shopName}</p>

        <div className="relative">
          <motion.img
            src="https://via.placeholder.com/200x300/222/fff?text=Kurta"
            className="w-60 mx-auto rounded-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div
            className="w-6 h-6 rounded-full absolute top-4 right-4 border-2 border-white"
            style={{ backgroundColor: selectedColor }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>

        <h2 className="text-center text-xl mt-4">{fakeProduct.itemName}</h2>
        <p className="text-center text-gray-400">Rs. {fakeProduct.price}</p>

        <div className="flex justify-center gap-2 mt-2">
          {fakeProduct.colors.map(color => (
            <button key={color} onClick={() => setSelectedColor(color)}
              className="w-6 h-6 rounded-full border" style={{backgroundColor: color}}/>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => alert('Video Call with Seller - Coming in Week 2')} className="flex-1 bg-white text-black p-2 rounded">📞 Video Call</button>
          <button onClick={() => alert('Virtual Try-On Camera - Coming in Week 2')} className="flex-1 bg-gray-700 p-2 rounded">👔 Try-On</button>
        </div>

        <button onClick={() => alert('3D Store Tour - Coming Soon')} className="w-full bg-gray-800 mt-2 p-2 rounded">🏛️ 3D Store Tour</button>

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

      {/* CART DRAWER */}
      <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{x: "100%"}} animate={{x: 0}} exit={{x: "100%"}}
          className="fixed right-0 top-0 h-full w-80 bg-gray-900 p-4 z-50 overflow-y-auto">
          <X onClick={() => setCartOpen(false)} className="cursor-pointer mb-4" />
          <h2 className="text-xl font-bold mb-4">My Closet</h2>
          {cart.length === 0? <p>Your closet is empty</p> : cart.map(item => (
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
                <button onClick={() => setCart(cart.filter(i => i.id!== item.id))} className="text-red-500 text-xs ml-2">Cancel</button>
              </div>
            </div>
          ))}
          {cart.length > 0 && (
            <button onClick={() => {
              alert(`✅ Order Placed! \nTotal: Rs.${cart.reduce((a,b) => a + b.price * b.qty, 0)}\n\nSeller ko notification chali gayi.`)
              setCart([])
              setCartOpen(false)
            }} className="w-full bg-green-500 text-black mt-4 p-3 rounded font-bold">
              Place Order - COD
            </button>
          )}
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
          }
