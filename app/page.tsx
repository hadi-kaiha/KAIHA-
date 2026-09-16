"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Search, Bell, Heart, User, PlayCircle, Mic } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const fashionCategories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400" },
]
const beautyCategories = [
  { name: "MAKEUP", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400" },
  { name: "SKINCARE", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400" },
  { name: "HAIRCARE", img: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=400" },
  { name: "FRAGRANCE", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400" },
]
const homeCategories = [
  { name: "HOME DECOR", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400" },
  { name: "BEDDING", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400" },
  { name: "KITCHEN", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400" },
  { name: "LIGHTING", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400" },
]
const products = {
  Fashion: { name: "Premium Kurta", price: 1999, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400" },
  Beauty: { name: "Glam Lipstick Set", price: 899, img: "https://images.unsplash.com/photo-1583241800694-2f2b6cbcba3f?q=80&w=400" },
  Home: { name: "Decor Vase Set", price: 2499, img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400" },
}
const kaihaTVVideos = [
  { id: 1, title: "3 Ways to Style This Kurta", thumbnail: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600", product: "Premium Kurta", price: 1999 },
  { id: 2, title: "Party Makeup in 5 Minutes", thumbnail: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600", product: "Glam Lipstick Set", price: 899 },
  { id: 3, title: "Home Decor Hacks", thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600", product: "Decor Vase Set", price: 2499 },
]

export default function Home() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState("Fashion");
  const [showRiderAlert, setShowRiderAlert] = useState(false);
  const [liveRider, setLiveRider] = useState<any>(null);
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [customer,setCustomer]=useState<any>(null);
  const [showLogin,setShowLogin]=useState(false);
  const [custName,setCustName]=useState("");
  const [custGmail,setCustGmail]=useState("");

  useEffect(() => {
    const interval = setInterval(() => setShowLogo((prev) =>!prev), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    const c = localStorage.getItem("kaiha_customer");
    if(c) setCustomer(JSON.parse(c));
    const fetchSellerProducts = async()=>{
      const {data} = await supabase.from("kaiha_products").select("*, kaiha_sellers!inner(shop_name, is_open)").eq("kaiha_sellers.is_open", true).gt("stock",0);
      if(data) setSellerProducts(data);
    }
    fetchSellerProducts();
  },[]);

  const customerLogin = async()=>{
    if(!custGmail) return alert("Gmail dalo");
    const {data} = await supabase.from("kaiha_customers").select("*").eq("gmail", custGmail).single();
    if(data){
      setCustomer(data); localStorage.setItem("kaiha_customer", JSON.stringify(data)); setShowLogin(false);
    } else {
      const {data:newC} = await supabase.from("kaiha_customers").insert({name:custName, gmail:custGmail}).select().single();
      setCustomer(newC); localStorage.setItem("kaiha_customer", JSON.stringify(newC)); setShowLogin(false);
    }
  }

  const handleOrder = async(p:any)=>{
    if(!customer){ setShowLogin(true); return; }
    if(!p.kaiha_sellers?.is_open) return alert("Shop CLOSED hai");
    const {error} = await supabase.from("kaiha_orders").insert({
      product_id:p.id, seller_id:p.seller_id, customer_name:customer.name, size:p.sizes?.[0]||'M', color:p.colors?.[0]||'Black', status:'pending'
    });
    if(error) alert(error.message); else alert("Order sent to "+p.kaiha_sellers.shop_name+" ✅");
  }

  useEffect(()=>{
    const checkRider = setInterval(()=>{
      const live = localStorage.getItem("kaiha_live");
      const status = localStorage.getItem("kaiha_order_status");
      if(live && status==="on_the_way"){ setLiveRider(JSON.parse(live)); setShowRiderAlert(true); }
    }, 2000);
    return ()=>clearInterval(checkRider);
  },[]);

  const currentCategories = activeTab === "Fashion"? fashionCategories : activeTab === "Beauty"? beautyCategories : homeCategories;
  const currentProduct = products[activeTab as keyof typeof products];
  const filteredVideos = kaihaTVVideos.filter(v => activeTab === "Fashion"? v.product.includes("Kurta") : activeTab === "Beauty"? v.product.includes("Lipstick") : v.product.includes("Vase"));

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="relative w-32 h-10 flex items-center">
          <AnimatePresence mode="wait">
            {showLogo? (<motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-9"><Image src="/IMG-20200913-WA5443.jpg" alt="KAIHA Logo" fill className="object-contain" /></motion.div>) : (<motion.h1 key="text" className="text-2xl font-bold tracking-widest bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>KAIHA</motion.h1>)}
          </AnimatePresence>
        </div>
        <div className="flex gap-4 items-center">
          {customer && <span className="text-xs text-yellow-500">Hi, {customer.name}</span>}
          <Bell className="w-6 h-6 cursor-pointer" /><Heart className="w-6 h-6 cursor-pointer" />
          <User onClick={()=> customer? router.push('/profile') : setShowLogin(true)} className="w-6 h-6 cursor-pointer" />
          <button onClick={() => setCartOpen(true)} className="relative"><ShoppingCart className="w-6 h-6" />{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{cart.length}</span>}</button>
        </div>
      </nav>

      <div className="p-3 bg-black"><div className="flex items-center bg-gray-900 rounded-full px-4 py-2"><Search className="w-5 h-5 text-gray-400" /><input placeholder="Search for products, brands and more" className="bg-transparent outline-none flex-1 ml-2 text-sm" /><Mic className="w-5 h-5 text-gray-400 cursor-pointer" /></div></div>
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">{["Fashion", "Beauty", "Home"].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${activeTab === tab? 'bg-white text-black' : 'bg-gray-800 text-white border border-gray-700'}`}>{tab}</button>))}</div>
      <div className="flex gap-3 px-3 py-3 overflow-x-auto">{currentCategories.map(cat => (<div key={cat.name} className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer"><div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700"><Image src={cat.img} alt={cat.name} width={64} height={64} className="object-cover w-full h-full" unoptimized /></div><p className="text-[11px] text-center font-medium">{cat.name}</p></div>))}</div>

      {sellerProducts.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-800">
          <h2 className="text-xl font-black text-yellow-500">LIVE FROM SELLERS 🔴</h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {sellerProducts.map(p=>(
              <div key={p.id} className="bg-[#101828] p-3 rounded-xl border border-yellow-500/20">
                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-yellow-500 text-sm font-bold">Rs. {p.price}</p>
                <p className="text-[10px] text-gray-400">{p.kaiha_sellers?.shop_name} • {p.stock} left</p>
                <p className="text-[10px] text-gray-500">{p.sizes?.join("/")} | {p.colors?.join(", ")}</p>
                <button onClick={()=>handleOrder(p)} className="w-full bg-yellow-500 text-black mt-2 p-2 rounded-xl font-black text-xs">{!customer? 'LOGIN TO ORDER' : 'ORDER NOW'}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-4 border-t border-gray-800"><div className="flex items-center justify-between mb-3"><h2 className="text-xl font-bold flex items-center gap-2"><PlayCircle className="w-6 h-6 text-red-500" /> KAIHA TV</h2><p className="text-xs text-gray-400">Shop from Videos</p></div><div className="flex gap-3 overflow-x-auto pb-2">{filteredVideos.map(video => (<div key={video.id} className="min-w-[280px] bg-gray-900 rounded-xl overflow-hidden"><div className="relative w-full h-40"><Image src={video.thumbnail} alt={video.title} fill className="object-cover" unoptimized /><PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80" /></div><div className="p-3"><p className="font-semibold text-sm">{video.title}</p><div className="flex items-center justify-between mt-2"><div><p className="text-xs text-gray-400">{video.product}</p><p className="text-sm font-bold">Rs. {video.price}</p></div><button onClick={() => setCart([...cart, {name: video.product, price: video.price}])} className="bg-yellow-500 text-black text-xs px-3 py-1.5 rounded-full font-bold">Add to Cart</button></div></div></div>))}</div></div>
      <div className="p-3"><div className="relative w-full h-40 rounded-xl overflow-hidden"><Image src={activeTab === "Fashion"? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200" : activeTab === "Beauty"? "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200" : "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200"} alt="Banner" fill className="object-cover" unoptimized /><div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-6"><h2 className="text-2xl font-bold">{activeTab === "Fashion" && "Let's Get THIS PARTY STARTED!"}{activeTab === "Beauty" && "Glow Up This Season"}{activeTab === "Home" && "Make Your Home Beautiful"}</h2><p className="text-lg">{activeTab === "Fashion" && "Slay New Year Parties"}{activeTab === "Beauty" && "Best Makeup & Skincare"}{activeTab === "Home" && "Decor & Essentials"}</p></div></div></div>
      <div className="p-6"><p className="text-gray-400 text-sm mb-2">This item from: Seller Shop</p><div className="relative"><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-60 mx-auto"><Image src={currentProduct.img} alt={currentProduct.name} width={240} height={360} className="rounded-lg" unoptimized /></motion.div></div><h2 className="text-center text-xl mt-4">{currentProduct.name}</h2><p className="text-center text-gray-400">Rs. {currentProduct.price}</p><button onClick={() => setCart([...cart, currentProduct])} className="w-full bg-yellow-500 text-black mt-4 p-3 rounded font-bold">Add to Cart</button></div>

      <AnimatePresence>{cartOpen && (<motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-4 z-50 overflow-y-auto"><X onClick={() => setCartOpen(false)} className="mb-4 cursor-pointer"/><h2 className="text-xl mb-4">Your Cart ({cart.length})</h2>{cart.map((item, i) => <p key={i}>{item.name} - Rs.{item.price}</p>)}</motion.div>)}</AnimatePresence>

      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200] p-4">
          <div className="bg-[#101828] p-6 rounded-2xl w-full max-w-sm border border-yellow-500/30">
            <h2 className="text-yellow-500 font-black text-xl">Customer Login 👤</h2>
            <p className="text-xs text-gray-400 mt-1">Order karne ke liye login zaroori hai</p>
            <input value={custName} onChange={e=>setCustName(e.target.value)} placeholder="Your Name" className="w-full p-3 mt-3 rounded-xl bg-black border border-gray-700 text-white"/>
            <input value={custGmail} onChange={e=>setCustGmail(e.target.value)} placeholder="Gmail" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700 text-white"/>
            <button onClick={customerLogin} className="w-full bg-yellow-500 text-black font-black p-3 rounded-xl mt-3">LOGIN & ORDER</button>
            <button onClick={()=>setShowLogin(false)} className="w-full text-gray-400 mt-2 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {showRiderAlert && liveRider && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#101828] border-t-2 border-green-500 p-4 rounded-t-2xl shadow-2xl z-[100]">
          <div className="flex justify-between items-start"><div><h3 className="font-black text-green-400 text-lg">Your order is on the way! 🏍️</h3><p className="text-sm text-white mt-1">{liveRider.riderName} is coming</p><p className="text-xs text-gray-400">Bike: {liveRider.bikeNo} | {liveRider.phone}</p></div><button onClick={()=>setShowRiderAlert(false)} className="text-gray-400 bg-gray-800 w-8 h-8 rounded-full">✕</button></div>
          <div className="flex gap-2 mt-3"><a href="/track" className="flex-1 bg-yellow-500 text-black p-3 rounded-xl text-center font-black text-sm">View Location</a><a href={`tel:${liveRider.phone}`} className="flex-1 bg-white text-black p-3 rounded-xl text-center font-black text-sm">Call Rider</a></div>
        </div>
      )}

      <footer className="text-center py-10 text-gray-500 text-sm">Founded by HADI - 19, Sukkur Pakistan. Building Billions.</footer>
    </div>
  );
      }
