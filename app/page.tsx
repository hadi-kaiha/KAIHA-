"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Mic, Search, Bell, Heart, User, ArrowLeft, Star, Wallet, Smartphone, Tag, LogOut, Package, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fashionCategories = [
  { name: "GEN Z DRIP", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400", key: "genz" },
  { name: "WINTER EDIT", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400", key: "winter" },
  { name: "MEN", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", key: "men" },
  { name: "WOMEN", img: "https://images.unsplash.com/photo-1496745955548-2b7a1993b7a7?q=80&w=400", key: "women" },
  { name: "SUMMER COLLECTION", img: "https://images.unsplash.com/photo-1529139574466-a30302731d8b?q=80&w=400", key: "summer" },
  { name: "FOOTWEAR", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400", key: "footwear" },
  { name: "CHILD", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400", key: "child" },
  { name: "ESSENTIALS", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400", key: "essentials" },
  { name: "UNDERGARMENTS", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400", key: "underwear" },
  { name: "OLD MONEY COLLECTION", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400", key: "oldmoney" },
]
const beautyCategories = [{ name: "MAKEUP", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400" }];
const homeCategories = [{ name: "HOME DECOR", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400" }];

const categoryProducts = {
  genz: { title: "GENZ OUTFITS", male: [{name: "Men's Oversized Tee", price: 1299, img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400", seller: "Demo Shop"}], female: [{name: "Women's Crop Top", price: 1899, img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=400", seller: "Demo Shop"}] },
}

const products = { Fashion: { name: "Premium Kurta", price: 1999, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=400", seller: "KAIHA Official" } }

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState("Fashion");
  const [categoryPage, setCategoryPage] = useState<string | null>(null);
  const [productDetail, setProductDetail] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [search, setSearch] = useState("");
  const [delivery] = useState(200);
  const [coupon, setCoupon] = useState("");
  const [user, setUser] = useState<any>(null);
  const [sellerStep, setSellerStep] = useState(1);
  const [shopName, setShopName] = useState("");
  const [selectedMain, setSelectedMain] = useState("Fashion");
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setShowLogo((prev) =>!prev), 2500);
    return () => clearInterval(interval);
  }, []);

  const subCategories = {
    Fashion: fashionCategories.map(c=>c.name),
    Beauty: beautyCategories.map(c=>c.name),
    Home: homeCategories.map(c=>c.name)
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const fee = Math.round(subtotal * 0.15);
  const couponDiscount = coupon === "KAIHA100"? 100 : 0;
  const grandTotal = Math.round(subtotal + fee + delivery - couponDiscount);

  if(productDetail){
    return (
      <div className="bg-black text-white min-h-screen">
        <nav className="flex items-center gap-4 p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
          <ArrowLeft onClick={() => setProductDetail(null)} className="cursor-pointer"/>
          <h1 className="text-lg font-bold">Product Details</h1>
        </nav>
        <div className="p-4">
          <Image src={productDetail.img} width={400} height={400} className="w-full h-96 object-cover rounded-xl" alt={productDetail.name} unoptimized />
          <p className="text-gray-400 text-sm mt-2">This item from: <span className="text-yellow-500 font-bold">{productDetail.seller}</span></p>
          <h1 className="text-2xl font-bold mt-1">{productDetail.name}</h1>
          <p className="text-3xl font-bold mt-3">Rs. {productDetail.price}</p>
          <div className="mt-6"><p className="font-semibold mb-2">Select Size</p><div className="flex gap-3">{["S", "M", "L", "XL", "XXL"].map(size => (<button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 border-2 rounded-full font-bold ${selectedSize === size? 'border-yellow-500 bg-yellow-500 text-black' : 'border-gray-700'}`}>{size}</button>))}</div></div>
          <button onClick={() => {setCart([...cart, {...productDetail, qty: 1, size: selectedSize}]); setProductDetail(null);}} className="w-full bg-yellow-500 text-black mt-6 p-4 rounded-lg font-bold text-lg">Add to Cart</button>
        </div>
      </div>
    )
  }

  if(page === "admin"){
    if(!shopName){
      return (
        <div className="bg-black text-white min-h-screen p-4 flex-col justify-center">
          <nav className="flex items-center gap-4 mb-6"><ArrowLeft onClick={() => setPage("home")} className="cursor-pointer"/><h1 className="text-xl font-bold">Seller Panel</h1></nav>
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome Seller!</h1>
          <p className="text-center text-gray-400 mb-4">Pehle apni Shop/Brand ka naam likho</p>
          <input value={shopName} onChange={(e)=>setShopName(e.target.value)} placeholder="e.g: Zara Style, Old Money Co" className="w-full bg-gray-800 p-3 rounded mb-3"/>
          <button onClick={()=>setSellerStep(2)} disabled={!shopName} className="w-full bg-yellow-500 text-black p-3 rounded font-bold disabled:opacity-50">Continue</button>
        </div>
      )
    }
    if(sellerStep === 2){
      return (
        <div className="bg-black text-white min-h-screen p-4">
          <nav className="flex items-center gap-4 mb-6"><ArrowLeft onClick={() => setShopName("")} className="cursor-pointer"/><h1 className="text-xl font-bold">{shopName} Panel</h1></nav>
          <h2 className="text-lg font-bold mb-3">Kis Section me Product Add Karna Hai?</h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {["Fashion", "Beauty", "Home"].map(c=><button key={c} onClick={()=>{setSelectedMain(c); setSelectedSub("")}} className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedMain===c?'bg-white text-black':'bg-gray-800'}`}>{c}</button>)}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {subCategories[selectedMain as keyof typeof subCategories].map(cat=>(
              <div key={cat} onClick={()=>setSelectedSub(cat)} className={`flex flex-col items-center gap-1 min-w-[80px] cursor-pointer p-2 rounded-lg ${selectedSub===cat?'bg-yellow-500 text-black':'bg-gray-900'}`}>
                <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
                <p className="text-[11px] text-center">{cat}</p>
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

  const currentCategories = activeTab === "Fashion"? fashionCategories : activeTab === "Beauty"? beautyCategories : homeCategories;
  const currentProduct = products[activeTab as keyof typeof products];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800 sticky top-0 bg-black z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">KAIHA</h1>
        <div className="flex gap-4">
          <User onClick={() => setPage("profile")} className="w-6 h-6 cursor-pointer" />
          <Package onClick={() => {setPage("admin"); setSellerStep(1); setShopName("")}} className="w-6 h-6 cursor-pointer text-green-500" />
          <button onClick={() => setCartOpen(true)} className="relative"><ShoppingCart className="w-6 h-6" />{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{cart.length}</span>}</button>
        </div>
      </nav>
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">{["Fashion", "Beauty", "Home"].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === tab? 'bg-white text-black' : 'bg-gray-800'}`}>{tab}</button>))}</div>
      <div className="flex gap-3 px-3 py-3 overflow-x-auto">{currentCategories.map(cat => (<div key={cat.name} onClick={() => cat.key && setCategoryPage(cat.key)} className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer"><div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden"><Image src={cat.img} alt={cat.name} width={64} height={64} className="object-cover w-full h-full" unoptimized /></div><p className="text-[11px] text-center">{cat.name}</p></div>))}</div>
      <div className="p-6"><p className="text-gray-400 text-sm mb-2">This item from: <span className="text-yellow-500">{currentProduct.seller}</span></p><div onClick={() => setProductDetail(currentProduct)} className="relative cursor-pointer"><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-60 mx-auto"><Image src={currentProduct.img} alt={currentProduct.name} width={240} height={360} className="rounded-lg" unoptimized /></motion.div></div><h2 className="text-center text-xl mt-4">{currentProduct.name}</h2><p className="text-center text-gray-400">Rs. {currentProduct.price}</p><button onClick={() => setCart([...cart, {...currentProduct, qty: 1, size: "M"}])} className="w-full bg-yellow-500 text-black mt-4 p-3 rounded font-bold">Add to Cart</button></div>
      <AnimatePresence>
      {cartOpen && (
        <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="fixed top-0 right-0 w-80 h-full bg-gray-900 p-4 z-50">
          <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Your Cart ({cart.length})</h2><X onClick={() => setCartOpen(false)} className="cursor-pointer"/></div>
          <div className="border-t border-gray-700 pt-3 mt-2">
            <div className="flex justify-between font-bold text-lg"><span>Grand Total:</span><span>Rs.{grandTotal}</span></div>
            <button onClick={() => alert(`Order Placed! Rs.${grandTotal}`)} className="w-full bg-green-500 text-black p-3 rounded font-bold mt-3">Place Order</button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
    }
