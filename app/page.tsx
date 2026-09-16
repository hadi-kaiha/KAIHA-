"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Bell, Heart, User, ArrowLeft, Package, Upload } from "lucide-react";
import Image from "next/image";

const fashionCategories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400", key: "genz" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400", key: "winter" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", key: "men" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400", key: "women" },
  { name: "OLD MONEY COLLECTION", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400", key: "oldmoney" },
]

export default function Home() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [shopName, setShopName] = useState("");
  const [sellerStep, setSellerStep] = useState(1);
  const [selectedSub, setSelectedSub] = useState("");

  const products = {
    Fashion: { name: "Premium Kurta", price: 1999, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400", seller: "KAIHA Official" }
  }
  const currentProduct = products["Fashion" as keyof typeof products];

  if(productDetail){
    return (
      <div className="bg-black text-white min-h-screen">
        <nav className="flex items-center gap-4 p-4 border-b border-gray-800"><ArrowLeft onClick={() => setProductDetail(null)} className="cursor-pointer"/><h1 className="text-lg font-bold">Product Details</h1></nav>
        <div className="p-4">
          <Image src={productDetail.img} width={400} height={400} className="w-full h-96 object-cover rounded-xl" alt={productDetail.name} unoptimized />
          <p className="text-gray-400 text-sm mt-2">This item from: <span className="text-yellow-500 font-bold">{productDetail.seller}</span></p>
          <h1 className="text-2xl font-bold mt-1">{productDetail.name}</h1>
          <p className="text-3xl font-bold mt-3">Rs. {productDetail.price}</p>
          <button onClick={() => {setCart([...cart, {...productDetail, qty: 1, size: selectedSize}]); setProductDetail(null);}} className="w-full bg-yellow-500 text-black mt-6 p-4 rounded-lg font-bold text-lg">Add to Cart</button>
        </div>
      </div>
    )
  }

  if(page === "admin"){
    if(!shopName){
      return (
        <div className="bg-black text-white min-h-screen p-4">
          <nav className="flex items-center gap-4 mb-6"><ArrowLeft onClick={() => setPage("home")} className="cursor-pointer"/><h1 className="text-xl font-bold">Seller Panel</h1></nav>
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome Seller!</h1>
          <p className="text-center text-gray-400 mb-4">Pehle apni Shop/Brand ka naam likho</p>
          <input value={shopName} onChange={(e)=>setShopName(e.target.value)} placeholder="e.g: Zara Style, Old Money Co" className="w-full bg-gray-800 p-3 rounded mb-3"/>
          <button onClick={()=>{if(shopName.trim().length>2)setSellerStep(2)}} disabled={shopName.trim().length<3} className="w-full bg-yellow-500 text-black p-3 rounded font-bold disabled:opacity-50">Continue</button>
        </div>
      )
    }
    if(sellerStep === 2){
      return (
        <div className="bg-black text-white min-h-screen p-4">
          <nav className="flex items-center gap-4 mb-6"><ArrowLeft onClick={() => setShopName("")} className="cursor-pointer"/><h1 className="text-xl font-bold">{shopName} Panel</h1></nav>
          <h2 className="text-lg font-bold mb-3">Kis Section me Product Add Karna Hai?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {fashionCategories.map(cat=>(
              <div key={cat.name} onClick={()=>setSelectedSub(cat.name)} className={`flex flex-col items-center gap-1 min-w-[80px] cursor-pointer p-2 rounded-lg ${selectedSub===cat.name?'bg-yellow-500 text-black':'bg-gray-900'}`}>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700"><Image src={cat.img} alt={cat.name} width={64} height={64} className="object-cover w-full h-full" unoptimized /></div>
                <p className="text-[11px] text-center">{cat.name}</p>
              </div>
            ))}
          </div>
          {selectedSub && <button onClick={()=>setSellerStep(3)} className="w-full bg-green-500 text-black p-3 rounded font-bold mt-6">Add Product in {selectedSub}</button>}
        </div>
      )
    }
    if(sellerStep === 3){
      return (
        <div className="bg-black text-white min-h-screen p-4">
          <nav className="flex items-center gap-4 mb-6"><ArrowLeft onClick={() => setSellerStep(2)} className="cursor-pointer"/><h1 className="text-xl font-bold">Add Product</h1></nav>
          <p className="text-gray-400 mb-1">Shop: <span className="text-yellow-500">{shopName}</span></p>
          <p className="text-gray-400 mb-3">Section: <span className="text-yellow-500">{selectedSub}</span></p>
          <div className="bg-gray-900 p-4 rounded-lg">
            <input placeholder="Product Name" className="w-full bg-gray-800 p-2 rounded mb-2"/>
            <input placeholder="Price" type="number" className="w-full bg-gray-800 p-2 rounded mb-2"/>
            <input placeholder="Image URL" className="w-full bg-gray-800 p-2 rounded mb-3"/>
            <button onClick={() => alert(`Product added to ${selectedSub} by ${shopName}`)} className="w-full bg-green-500 text-black p-3 rounded font-bold flex items-center justify-center gap-2"><Upload size={18}/>Add Product</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">KAIHA</h1>
        <div className="flex gap-4">
          <User onClick={() => setPage("profile")} className="w-6 h-6 cursor-pointer" />
          <Package onClick={() => {setPage("admin"); setSellerStep(1); setShopName("");}} className="w-6 h-6 cursor-pointer text-green-500" />
          <button onClick={() => setCartOpen(true)} className="relative"><ShoppingCart className="w-6 h-6" /></button>
        </div>
      </nav>
      <div className="flex gap-3 px-3 py-3 overflow-x-auto">{fashionCategories.map(cat => (<div key={cat.name} className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer"><div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden"><Image src={cat.img} alt={cat.name} width={64} height={64} className="object-cover w-full h-full" unoptimized /></div><p className="text-[11px] text-center">{cat.name}</p></div>))}</div>
      <div className="p-6"><p className="text-gray-400 text-sm mb-2">This item from: <span className="text-yellow-500">{currentProduct.seller}</span></p><div onClick={() => setProductDetail(currentProduct)} className="relative cursor-pointer"><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-60 mx-auto"><Image src={currentProduct.img} alt={currentProduct.name} width={240} height={360} className="rounded-lg" unoptimized /></motion.div></div><h2 className="text-center text-xl mt-4">{currentProduct.name}</h2><p className="text-center text-gray-400">Rs. {currentProduct.price}</p><button onClick={() => setCart([...cart, {...currentProduct, qty: 1, size: "M"}])} className="w-full bg-yellow-500 text-black mt-4 p-3 rounded font-bold">Add to Cart - TEST 2.0</button></div>
    </div>
  );
        }
