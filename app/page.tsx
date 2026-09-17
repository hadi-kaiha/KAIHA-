  "use client";
import { useState, useRef, useEffect } from "react";

const fashionCircles = ["GEN Z DRIP","WINTER EDIT","SUMMER FITS","T-SHIRTS","MEN","WOMEN","PANTS","SLIPPERS"];
const circleImages:any = {
"GEN Z DRIP":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
"WINTER EDIT":"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200",
"SUMMER FITS":"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200",
"T-SHIRTS":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
"MEN":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
"WOMEN":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200",
"PANTS":"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200",
"SLIPPERS":"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200"
};
const genderFilters = ["Both","Male","Female","Boy","Girl","Child"];
const allProducts = [
{ id:1, name:"Oversized Street Tee", price:1999, mrp:2999, sub:"T-Shirts", gender:"Male", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500", brand:"KAIHA" },
{ id:2, name:"Wool Blend Hoodie", price:3499, mrp:4999, sub:"Winter Collection", gender:"Male", circle:"WINTER EDIT", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500", brand:"KAIHA" },
{ id:3, name:"Baggy Cargo Pants", price:2999, mrp:4599, sub:"Pants", gender:"Male", circle:"PANTS", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", brand:"KAIHA" },
{ id:4, name:"Premium Crop Top", price:1899, mrp:2599, sub:"Tops", gender:"Female", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500", brand:"KAIHA WOMAN" },
{ id:5, name:"Boy Street Tee", price:1299, mrp:1899, sub:"T-Shirts", gender:"Boy", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500", brand:"KAIHA BOY" },
{ id:6, name:"Girl Summer Frock", price:1999, mrp:2799, sub:"Summer Fits", gender:"Girl", circle:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500", brand:"KAIHA GIRL" },
];
const colors = [{name:"Black", hex:"#000"}, {name:"White", hex:"#fff"}, {name:"Purple", hex:"#a855f7"}, {name:"Beige", hex:"#D4AF37"}];
const sizes = ["S","M","L","XL"];

export default function Home(){
const [activeCircle,setActiveCircle] = useState("GEN Z DRIP");
const [gender,setGender] = useState("Both");
const [sub,setSub] = useState("All");
const [cartItems,setCartItems] = useState<any[]>([]);
const [showCart,setShowCart] = useState(false);
const [showWishlist,setShowWishlist] = useState(false);
const [showProfile,setShowProfile] = useState(false);
const [showBell,setShowBell] = useState(false);
const [isLoggedIn,setIsLoggedIn] = useState(false);
const [coins,setCoins] = useState(120);
const [shopOpen,setShopOpen] = useState(true);
const [shopName,setShopName] = useState("KAIHA STORE");
const [lang,setLang] = useState("en");
const [isBlackCard,setIsBlackCard] = useState(false);
const [spinResult,setSpinResult] = useState<number|null>(null);
const [showSpin,setShowSpin] = useState(false);
const [wishlist,setWishlist] = useState<any[]>([]);
const [showTracking,setShowTracking] = useState(false);
const [otpSent,setOtpSent] = useState(false);
const [otp,setOtp] = useState("");
const [showReel,setShowReel] = useState<any>(null);
const fileRef = useRef<HTMLInputElement>(null);

useEffect(()=>{
setShopName(localStorage.getItem("kaiha_shop_name")||"KAIHA STORE");
setCoins(Number(localStorage.getItem("kaiha_coins")||120));
},[]);

const addToCart = (p:any)=>{
if(!shopOpen){ alert("Shop Closed 30"); return; }
setCartItems(prev=>{
const exist = prev.find(i=>i.product.id===p.id);
if(exist) return prev.map(i=>i.product.id===p.id?{...i, qty:i.qty+1}:i);
return [...prev, {id:Date.now(), product:p, qty:1, size:"M", color:colors[0]}];
});
setShowCart(true);
};

const filtered = allProducts.filter(p=>{
if(gender!=="Both" && p.gender!==gender) return false;
if(sub!=="All" && p.sub!==sub) return false;
return true;
});

return(
<div className="bg-black text-white min-h-screen pb-32">
<nav className="flex justify-between items-center px-5 h-[62px] sticky top-0 bg-black z-40 border-b border-zinc-900">
<div className="flex items-center gap-3">
<div className="w-[38px] h-[38px] rounded-xl bg-[#111] border border-zinc-800 flex items-center justify-center"><span className="font-black text-[19px] text-[#D4AF37]">K</span></div>
<h1 className="font-black text-[16px] tracking-[0.20em] text-[#D4AF37]">KAIHA</h1>
<button onClick={()=>setLang(lang==="en"?"ur":"en")} className="ml-1 bg-zinc-800 text-[10px] px-2 py-1 rounded-full">{lang==="en"?"اردو":"EN"}</button>
</div>
<div className="flex items-center gap-3">
<div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full">🪙 {coins}</div>
<button onClick={()=>setShowCart(true)}>🛒{cartItems.length>0&&<span className="ml-1 bg-yellow-500 text-black text-[9px] w-4 h-4 rounded-full inline-flex items-center justify-center">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
</div>
</nav>

<div className="px-3 py-2 flex gap-2 overflow-x-auto">
<button onClick={()=>setShopOpen(!shopOpen)} className={`shrink-0 text-[11px] px-3 py-2 rounded-full ${shopOpen?"bg-green-600":"bg-red-600"}`}>30.{shopOpen?"OPEN":"CLOSED"}</button>
<button onClick={()=>setShowTracking(true)} className="shrink-0 bg-zinc-800 text-[11px] px-3 py-2 rounded-full">33.Track</button>
<button onClick={()=>setShowSpin(true)} className="shrink-0 bg-yellow-600 text-[11px] px-3 py-2 rounded-full">38.Spin</button>
<button onClick={()=>setIsBlackCard(!isBlackCard)} className={`shrink-0 text-[11px] px-3 py-2 rounded-full ${isBlackCard?"bg-yellow-500 text-black":"bg-zinc-800"}`}>39.Black</button>
</div>

<div className="px-4 py-2 bg-[#0a0a0a] border-y border-zinc-900">
<input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="45.Shop Name HADI COLLECTION" className="w-full bg-black border border-yellow-500/50 rounded-lg h-[40px] px-3 text-[12px]" />
<p className="text-[10px] text-zinc-400 mt-1">37.Refer Rs.50 | 42.AI Suggest | 44.COD OTP | 50.Coins Mall | 63.QR | 65.Urdu</p>
</div>

<div className="px-2 py-4 border-b border-zinc-900 flex gap-4 overflow-x-auto">
{fashionCircles.map(c=>(
<button key={c} onClick={()=>setActiveCircle(c)} className="flex flex-col items-center gap-2 min-w-[68px]">
<img src={circleImages[c]} className={`w-[64px] h-[64px] rounded-full object-cover border-2 ${activeCircle===c?"border-yellow-500":"border-zinc-700"}`} alt="" />
<span className="text-[10px]">{c}</span>
</button>
))}
</div>

<div className="p-3 grid grid-cols-2 gap-3">
{filtered.map(p=>(
<div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
<div className="relative">
<img src={p.img} className="w-full aspect-[3/4] object-cover object-top" alt="" />
<span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px]">{p.gender}</span>
<span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-[8px] font-bold">45.{shopName}</span>
</div>
<div className="p-3">
<h4 className="text-[10px] text-zinc-400">{p.brand}</h4>
<h3 className="text-[12px] truncate">{p.name}</h3>
<p className="font-bold text-[13px]">Rs.{isBlackCard?Math.floor(p.price*0.9):p.price}</p>
<button onClick={()=>addToCart(p)} className="mt-2 w-full bg-white text-black text-[11px] font-bold h-[32px] rounded-full">ADD TO CART</button>
</div>
</div>
))}
</div>

{showSpin && (
<div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-6">
<div className="bg-[#121212] border border-yellow-500 rounded-2xl p-6 w-full max-w-sm text-center">
<h2 className="font-black text-xl text-yellow-500">38.Spin Wheel</h2>
<div className="w-32 h-32 mx-auto my-6 rounded-full border-4 border-yellow-500 flex items-center justify-center text-3xl">{spinResult?`+${spinResult}`:"🎡"}</div>
<button onClick={()=>{ const v=[10,20,50][Math.floor(Math.random()*3)]; setSpinResult(v); setCoins(c=>c+v); }} className="w-full bg-yellow-500 text-black h-[44px] rounded-xl font-bold">SPIN NOW</button>
<button onClick={()=>setShowSpin(false)} className="w-full bg-zinc-800 h-[40px] rounded-xl mt-2">Close</button>
</div>
</div>
)}

{showTracking && (
<div className="fixed inset-0 bg-black z-[70] p-4">
<div className="flex justify-between"><h2 className="font-bold">33.Tracking Map</h2><button onClick={()=>setShowTracking(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
<div className="w-full h-[300px] bg-zinc-900 rounded-xl mt-4 flex items-center justify-center">🗺️ Rider 2km away - 65% delivered - 63.QR</div>
</div>
)}

{showCart && (
<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
<div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto">
<div className="flex justify-between mb-4"><h2 className="font-bold">Cart</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
{cartItems.map((i:any)=><div key={i.id} className="bg-zinc-900 p-3 rounded-xl mb-3">{i.product.name} - Qty {i.qty}</div>)}
<div className="bg-zinc-900 p-3 rounded-xl mt-3">
<p className="text-[11px] font-bold">44.COD OTP</p>
{!otpSent?<button onClick={()=>{ setOtpSent(true); alert("OTP 1234"); }} className="w-full bg-white text-black h-[36px] rounded-lg mt-2 font-bold">Send OTP</button>:<div className="flex gap-2 mt-2"><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP 1234" className="flex-1 bg-black border border-zinc-700 rounded-lg h-[36px] px-3" /><button onClick={()=>otp==="1234"?alert("Verified! 63.QR Generated"):alert("Wrong")} className="bg-green-600 px-4 rounded-lg">Verify</button></div>}
</div>
<button className="mt-4 bg-yellow-500 text-black w-full h-[44px] rounded-xl font-bold">Checkout Rs.{cartItems.reduce((a:any,b:any)=>a+b.product.price*b.qty,0)}</button>
</div>
</div>
)}

</div>
);
 }
