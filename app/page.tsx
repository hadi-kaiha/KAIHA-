"use client";
import { useState, useRef } from "react";

const fashionCircles = [
  { id:"genz", name:"GEN Z DRIP", filter:"GENZ" },
  { id:"winter", name:"WINTER EDIT", filter:"Winter Collection" },
  { id:"summer", name:"SUMMER FITS", filter:"Summer Fits" },
  { id:"tshirt", name:"T-SHIRTS", filter:"T-Shirts" },
  { id:"men", name:"MEN", filter:"Male" },
  { id:"women", name:"WOMEN", filter:"Female" },
  { id:"pants", name:"PANTS", filter:"Pants" },
  { id:"slippers", name:"SLIPPERS", filter:"Slippers" },
];

const circleImages: any = {
  "GEN Z DRIP":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80",
  "WINTER EDIT":"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&q=80",
  "SUMMER FITS":"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&q=80",
  "T-SHIRTS":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
  "MEN":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "WOMEN":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80",
  "PANTS":"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80",
  "SLIPPERS":"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80",
};

const genderFilters = ["Both","Male","Female","Boy","Girl","Child"];
const fashionSubFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers","FlipFlops","Essentials","Footwear","Innerwears","Socks","Shoes","Glasses","Chain","Earrings","Churiyan"];
const sizes = ["S","M","L","XL"];
const colors = [{name:"Black", hex:"#000"}, {name:"White", hex:"#fff"}, {name:"Purple", hex:"#a855f7"}, {name:"Beige", hex:"#D4AF37"}];

const allProducts = [
  { id:1, name:"Oversized Street Tee", price:1999, mrp:2999, sub:"T-Shirts", gender:"Male", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", brand:"KAIHA GENZ" },
  { id:2, name:"Wool Blend Hoodie", price:3499, mrp:4999, sub:"Winter Collection", gender:"Male", circle:"WINTER EDIT", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80", brand:"WINTER EDIT" },
  { id:3, name:"Baggy Cargo Pants", price:2999, mrp:4599, sub:"Pants", gender:"Male", circle:"PANTS", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"KAIHA MAN" },
  { id:4, name:"Gen Z Drip Hoodie Male", price:2899, mrp:3999, sub:"T-Shirts", gender:"Male", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"GEN Z DRIP" },
  { id:5, name:"Premium Crop Top", price:1899, mrp:2599, sub:"Tops", gender:"Female", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", brand:"KAIHA WOMAN" },
  { id:6, name:"Summer Co-ord Set", price:2499, mrp:3999, sub:"Summer Fits", gender:"Female", circle:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80", brand:"KAIHA WOMAN" },
  { id:7, name:"Female Winter Coat", price:4599, mrp:5999, sub:"Winter Collection", gender:"Female", circle:"WINTER EDIT", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80", brand:"WINTER EDIT" },
  { id:8, name:"Slippers Luxury", price:1499, mrp:1999, sub:"Slippers", gender:"Female", circle:"SLIPPERS", img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80", brand:"KAIHA" },
  { id:9, name:"Boy Street Tee", price:1299, mrp:1899, sub:"T-Shirts", gender:"Boy", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", brand:"KAIHA BOY" },
  { id:10, name:"Boy Winter Jacket", price:2299, mrp:2999, sub:"Winter Collection", gender:"Boy", circle:"WINTER EDIT", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"KAIHA BOY" },
  { id:11, name:"Girl Summer Frock", price:1999, mrp:2799, sub:"Summer Fits", gender:"Girl", circle:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80", brand:"KAIHA GIRL" },
  { id:12, name:"Girl T-Shirt Drip", price:1399, mrp:1899, sub:"T-Shirts", gender:"Girl", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", brand:"GEN Z DRIP" },
  { id:13, name:"Child Essentials Pack", price:999, mrp:1499, sub:"Essentials", gender:"Child", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1522771930-78848d9293e4?w=500&q=80", brand:"KAIHA KIDS" },
];

export default function Home(){
  const [activeTab,setActiveTab]=useState("Fashion");
  const [activeCircle,setActiveCircle]=useState<string|null>("GEN Z DRIP");
  const [gender,setGender]=useState("Both");
  const [sub,setSub]=useState("All");
  const [cartItems,setCartItems]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [showWishlist,setShowWishlist]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const [showBell,setShowBell]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [reels,setReels]=useState([
    {id:1, user:"@hadi_style", role:"Customer", product:"Oversized Street Tee", price:1999, video:"https://www.w3schools.com/html/mov_bbb.mp4", thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", likes:1240, isRider:false},
    {id:2, user:"@kaiha_store", role:"Seller", product:"Wool Blend Hoodie", price:3499, video:"https://www.w3schools.com/html/movie.mp4", thumb:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", likes:3420, isRider:false},
    {id:3, user:"@rider_ali", role:"Rider", product:"Safe Delivery Proof", price:0, video:"https://www.w3schools.com/html/mov_bbb.mp4", thumb:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80", likes:890, isRider:true},
  ]);
  const [showReel,setShowReel]=useState<any>(null);
  const [uploadRole,setUploadRole]=useState("Customer");
  const fileRef = useRef<HTMLInputElement>(null);

  const addToCart = (p:any) => {
    setCartItems(prev=>{
      const exist = prev.find(i=>i.product.id===p.id);
      if(exist) return prev.map(i=>i.product.id===p.id?{...i, qty:i.qty+1}:i);
      return [...prev, {id:Date.now(), product:p, qty:1, size:"M", color:colors[0]}];
    });
    setShowCart(true);
  };

  // SMART FILTER - BOTH = ALL, MALE = MALE ONLY, CIRCLE + GENDER COMBINE
  const filtered = allProducts.filter(p=>{
    if(gender!=="Both" && p.gender!==gender) return false;
    if(sub!=="All" && p.sub!==sub) return false;
    if(activeCircle){
      if(activeCircle==="GEN Z DRIP" && p.circle!=="GEN Z DRIP") return false;
      if(activeCircle==="WINTER EDIT" && p.sub!=="Winter Collection") return false;
      if(activeCircle==="SUMMER FITS" && p.sub!=="Summer Fits") return false;
      if(activeCircle==="T-SHIRTS" &&!(p.sub==="T-Shirts" || p.sub==="Tops")) return false;
      if(activeCircle==="MEN" && p.gender!=="Male") return false;
      if(activeCircle==="WOMEN" && p.gender!=="Female") return false;
      if(activeCircle==="PANTS" && p.sub!=="Pants") return false;
      if(activeCircle==="SLIPPERS" && p.sub!=="Slippers") return false;
    }
    return true;
  });

  return(
    <div className="bg-black text-white min-h-screen pb-32">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&display=swap'); *{font-family:'Inter',sans-serif!important} @keyframes proFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}.pro-logo{animation:proFloat 4s ease-in-out infinite}`}</style>

      <nav className="flex justify-between items-center px-4 h-[56px] sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-2.5"><div className="w-[36px] h-[36px] rounded-lg bg-[#111] border border-zinc-800 flex items-center justify-center pro-logo"><span className="font-bold text-[18px] text-[#a855f7]">K</span></div><h1 className="font-bold text-[15px] tracking-[0.28em] text-[#D4AF37]">KAIHA</h1></div>
        <div className="flex items-center gap-[14px]">
          <button onClick={()=>setShowBell(true)} className="w-[20px] h-[20px] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><path d="M6 8a6 6 0 0 1 12 0c0 7 6 5 6 10H0c0-5 6-3 6-10"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
          <button onClick={()=>setShowWishlist(true)} className="w-[20px] h-[20px] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l8.2-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
          <button onClick={()=>setShowProfile(true)} className="w-[20px] h-[20px] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg></button>
          <button onClick={()=>setShowCart(true)} className="w-[20px] h-[20px] flex items-center justify-center relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.5 12h13l2-8H6.5"/></svg>{cartItems.length>0 && <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      <div className="p-3"><div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] gap-3 border border-zinc-800"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="M21 21l-3.5-3.5"/></svg><input placeholder="Search for products, brands and more" className="bg-transparent flex-1 text-[13px] outline-none placeholder:text-zinc-500" /></div></div>

      <div className="flex gap-2.5 px-4 py-2">
        {(["Fashion","Beauty","Home"] as const).map(t=>(
          <button key={t} onClick={()=>{setActiveTab(t as any); setSub("All")}} className={`flex-1 h-[40px] rounded-full text-[13px] font-semibold border ${activeTab===t?"bg-white text-black":"bg-[#1a1a1a] text-white border-zinc-800"}`}>{t}</button>
        ))}
      </div>

      {activeTab==="Fashion" && (
        <div className="px-2 py-4 border-b border-zinc-900">
          <div className="flex gap-4 overflow-x-auto px-2 pb-2">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCircle(c.name)} className="flex flex-col items-center gap-2 min-w-[68px]">
                <img src={circleImages[c.name]} className={`w-[64px] h-[64px] rounded-full object-cover border-2 ${activeCircle===c.name?"border-yellow-500":"border-zinc-700"}`} alt="" />
                <span className="text-[10px] font-semibold">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 px-2">
            {genderFilters.map(g=>(
              <button key={g} onClick={()=>setGender(g)} className={`px-4 h-[34px] rounded-full text-[13px] font-medium border whitespace-nowrap shrink-0 ${gender===g?"bg-white text-black font-semibold":"bg-black border-zinc-700 text-zinc-300"}`}>{g}</button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap px-2 mt-3">
            <button onClick={()=>setSub("All")} className={`px-3 h-[28px] rounded-full text-[11px] border ${sub==="All"?"bg-yellow-500 text-black font-bold":"bg-zinc-900 border-zinc-800"}`}>All</button>
            {fashionSubFilters.map(f=>(
              <button key={f} onClick={()=>setSub(f)} className={`px-3 h-[28px] rounded-full text-[11px] border ${sub===f?"bg-white text-black font-bold":"bg-zinc-900 border-zinc-800 text-zinc-300"}`}>{f}</button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-2 text-[11px] text-zinc-400">Showing {filtered.length} items • {activeCircle} • {gender}</div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.length===0? <div className="col-span-2 py-10 text-center text-zinc-500 text-sm">No items for {gender} in {activeCircle}. Try Both.</div> : filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative"><img src={p.img} className="w-full h-[240px] object-cover" alt="" /><span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px] font-bold">{p.gender}</span></div>
            <div className="p-3"><h4 className="text-[10px] font-bold text-zinc-400">{p.brand}</h4><h3 className="text-[12px] font-medium truncate">{p.name}</h3><p className="font-bold text-[13px] mt-1">Rs. {p.price}</p><button onClick={()=>addToCart(p)} className="mt-2 w-full bg-white text-black text-[11px] font-bold h-[32px] rounded-full">ADD TO CART</button></div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0a0a0a] mt-4 border-y border-zinc-900">
        <div className="flex justify-between items-center mb-3"><h2 className="font-bold text-[14px] flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px]">▶</span> KAIHA TV</h2><button onClick={()=>fileRef.current?.click()} className="bg-white text-black px-3 h-[28px] rounded-full text-[11px] font-bold">+ Upload</button></div>
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e)=>{const file=e.target.files?.[0]; if(file){const url=URL.createObjectURL(file); const isRider=uploadRole==="Rider"; setReels([{id:Date.now(), user:"@you", role:uploadRole, product:isRider?"Safe Delivery":"New Drop", price:isRider?0:1999, video:url, thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", likes:0, isRider},...reels]);}}} />
        <div className="flex gap-2 mb-3">{["Customer","Seller","Rider"].map(r=>(<button key={r} onClick={()=>setUploadRole(r)} className={`px-3 h-[26px] rounded-full text-[10px] border ${uploadRole===r?"bg-yellow-500 text-black font-bold":"bg-zinc-900 border-zinc-800 text-zinc-400"}`}>{r}</button>))}</div>
        <div className="flex gap-3 overflow-x-auto pb-2">{reels.map(reel=>(<div key={reel.id} onClick={()=>setShowReel(reel)} className="min-w-[150px] w-[150px] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative"><img src={reel.thumb} className="w-full h-[200px] object-cover" alt="" /><div className="absolute bottom-0 p-2 w-full bg-gradient-to-t from-black to-transparent"><p className="text-[11px] font-bold truncate">{reel.product}</p>{!reel.isRider && <p className="text-[10px] text-yellow-500">Rs. {reel.price}</p>}</div><div className="absolute inset-0 flex items-center justify-center"><div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-black text-[10px]">▶</div></div></div>))}</div>
      </div>

      {showReel && (<div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold text-sm">{showReel.role}</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><video src={showReel.video} controls autoPlay className="flex-1 bg-black object-contain"/><div className="p-4 bg-[#121212]">{!showReel.isRider? <button onClick={()=>{addToCart({id:showReel.id, name:showReel.product, price:showReel.price, img:showReel.thumb, mrp:showReel.price+1000, brand:"KAIHA TV", sub:"Reel", gender:"Both"}); setShowReel(null)}} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY THIS ITEM</button> : <div className="text-[11px] text-zinc-400">Rider delivery proof - No buy</div>}</div></div>)}

      {showCart && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto"><div className="flex justify-between mb-4"><h2 className="font-bold">Cart</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{cartItems.map(item=>(<div key={item.id} className="bg-zinc-900 rounded-xl p-3 mb-3 flex gap-3"><img src={item.product.img} className="w-14 h-18 object-cover rounded-lg"/><div className="flex-1"><h4 className="text-[13px] font-bold">{item.product.name}</h4><div className="flex gap-1 mt-1">{colors.map(c=>(<button key={c.name} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,color:c}:i))} className={`w-4 h-4 rounded-full border ${item.color.name===c.name?"border-yellow-500":"border-zinc-600"}`} style={{background:c.hex}}></button>))}</div><div className="flex gap-1 mt-1">{sizes.map(s=>(<button key={s} onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,size:s}:i))} className={`px-2 py-0.5 text-[9px] rounded border ${item.size===s?"bg-white text-black":"bg-black border-zinc-700"}`}>{s}</button>))}</div><div className="flex items-center gap-2 mt-2"><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:Math.max(1,i.qty-1)}:i))} className="w-6 h-6 bg-zinc-800 rounded-full">-</button><span className="text-xs">{item.qty}</span><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} className="w-6 h-6 bg-zinc-800 rounded-full">+</button></div></div></div>))}<button className="mt-4 bg-yellow-500 text-black w-full h-[44px] rounded-xl font-bold">Checkout Rs. {cartItems.reduce((a,b)=>a+b.product.price*b.qty,0)}</button></div></div>)}
      {showBell && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Notifications</h2><button onClick={()=>setShowBell(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div></div></div>)}
      {showWishlist && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Wishlist</h2><button onClick={()=>setShowWishlist(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div></div></div>)}
      {showProfile && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Profile</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{!isLoggedIn?<button onClick={()=>setIsLoggedIn(true)} className="w-full bg-white text-black font-bold h-[44px] rounded-xl">Login</button>:<div className="text-center"><div className="w-14 h-14 bg-yellow-500 rounded-full mx-auto flex items-center justify-center font-bold text-black">H</div><p className="font-bold mt-2 text-sm">HADI</p></div>}</div></div>)}
    </div>
  );
    }
