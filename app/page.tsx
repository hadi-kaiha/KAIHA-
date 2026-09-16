"use client";
import { useState } from "react";

export default function Home(){
  const [cartCount, setCartCount] = useState(0);
  
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <nav className="flex justify-between items-center border-b border-gray-800 pb-3">
        <h1 className="text-2xl font-bold text-yellow-500">KAIHA</h1>
        <div className="flex gap-2">
          <span className="bg-red-500 px-2 py-1 rounded-full text-xs">{cartCount}</span>
        </div>
      </nav>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold">Welcome to KAIHA</h2>
        <p className="text-gray-400 text-sm mt-2">Founded by HADI - 19, Sukkur</p>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg mt-6 text-center">
        <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400" alt="product" className="w-48 h-64 object-cover rounded-lg mx-auto"/>
        <h3 className="mt-3 font-bold">Premium Kurta</h3>
        <p className="text-gray-400">Rs. 1999</p>
        <p className="text-xs text-yellow-500 mt-1">This item from: KAIHA Official</p>
        <button onClick={()=>setCartCount(cartCount+1)} className="w-full bg-yellow-500 text-black p-3 rounded font-bold mt-3">
          Add to Cart
        </button>
      </div>

      <div className="mt-8 p-3 bg-gray-900 rounded-lg">
        <p className="text-sm text-center text-gray-400">Seller? Rider? Admin?</p>
        <p className="text-xs text-center mt-2">Seller: /seller | Rider: /rider | Admin: /kaiha-admin-786</p>
      </div>

      <footer className="text-center py-10 text-gray-500 text-xs">
        KAIHA - Shopping App
      </footer>
    </div>
  )
}
