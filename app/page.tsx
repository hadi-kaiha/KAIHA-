"use client";
import { useState, useRef, useEffect } from "react";

const fashionCircles = [
  { id:"genz", name:"GEN Z DRIP" }, { id:"winter", name:"WINTER EDIT" }, { id:"summer", name:"SUMMER FITS" },
  { id:"tshirt", name:"T-SHIRTS" }, { id:"men", name:"MEN" }, { id:"women", name:"WOMEN" }, { id:"pants", name:"PANTS" }, { id:"slippers", name:"SLIPPERS" },
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
const fashionSubFilters = ["Winter Collection","Summer Fits","T-Shirts","Tops","Pants","Shorts","Slippers"];
const sizes = ["S","M","L","XL"];
const colors = [{name:"Black", hex:"#000"}, {name:"White", hex:"#fff"}, {name:"Purple", hex:"#a855f7"}, {name:"Beige", hex:"#D4AF37"}];
const allProducts = [
  { id:1, name:"Oversized Street Tee", price:1999, mrp:2999, sub:"T-Shirts", gender:"Male", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", brand:"KAIHA GENZ" },
  { id:2, name:"Wool Blend Hoodie", price:3499, mrp:4999, sub:"Winter Collection", gender:"Male", circle:"WINTER EDIT", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80", brand:"WINTER EDIT" },
  { id:3, name:"Baggy Cargo Pants", price:2999, mrp:4599, sub:"Pants", gender:"Male", circle:"PANTS", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", brand:"KAIHA MAN" },
  { id:4, name:"Premium Crop Top", price:1899, mrp:2599, sub:"Tops", gender:"Female", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", brand:"KAIHA WOMAN" },
  { id:5, name:"Boy Street Tee", price:1299, mrp:1899, sub:"T-Shirts", gender:"Boy", circle:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", brand:"KAIHA BOY" },
  { id:6, name:"Girl Summer Frock", price:1999, mrp:2799, sub:"Summer Fits", gender:"Girl", circle:"SUMMER FITS", img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80", brand:"KAIHA GIRL" },
];

export default function Home(){
  const [activeTab,setActiveTab]=useState("Fashion");
  const [activeCircle,setActiveCircle]=useState<string|null>("GEN Z DRIP");
  const [gender,setGender]=useState("Both"); const [sub,setSub]=useState("All");
  const [cartItems,setCartItems]=useState<any[]>([]); const [showCart,setShowCart]=useState(false);
  const [showWishlist,setShowWishlist]=useState(false); const [showProfile,setShowProfile]=useState(false);
  const [showBell,setShowBell]=useState(false); const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [coins,setCoins]=useState(120); const [shopOpen,setShopOpen]=useState(true); // 30
  const [shopName,setShopName]=useState(""); // 45
  const [lang,setLang]=useState("en"); // 65
  const [isBlackCard,setIsBlackCard]=useState(false); // 39
  const [spinResult,setSpinResult]=useState<number|null>(null); // 38
  const [showSpin,setShowSpin]=useState(false);
  const [bargainPrice,setBargainPrice]=useState<any>({}); // 35
  const [reviews,setReviews]=useState<any[]>([]); // 40
  const [showTryOn,setShowTryOn]=useState<any>(null); // 36
  const [showChat,setShowChat]=useState<any>(null); // 34
  const [showTracking,setShowTracking]=useState(false); // 33
  const [otpSent,setOtpSent]=useState(false); const [otp,setOtp]=useState(""); // 44
  const [isListening,setIsListening]=useState(false); // 64
  const [rotateVal,setRotateVal]=useState(0); const [show360,setShow360]=useState<any>(null); // 62
  const [wishlist,setWishlist]=useState<any[]>([]);
  const [reels,setReels]=useState<any[]>([
    {id:1, user:"@hadi_style", role:"Customer", product:"Oversized Street Tee", price:1999, video:"https://www.w3schools.com/html/mov_bbb.mp4", thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", likes:1240, isRider:false, isLive:false},
    {id:2, user:"@kaiha_store", role:"Seller", product:"Live: Winter Drop 50% OFF", price:3499, video:"https://www.w3schools.com/html/movie.mp4", thumb:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", likes:3420, isRider:false, isLive:true}, // 41
  ]);
  const [showReel,setShowReel]=useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null); const tryOnRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setShopName(localStorage.getItem("kaiha_shop_name")||"KAIHA STORE");
    setShopOpen(localStorage.getItem("kaiha_shop_open")!=="false");
    setIsBlackCard(localStorage.getItem("kaiha_black_card")==="true");
    setCoins(Number(localStorage.getItem("kaiha_coins")||120));
  },[]);
  useEffect(()=>{ localStorage.setItem("kaiha_shop_name",shopName); },[shopName]);
  useEffect(()=>{ localStorage.setItem("kaiha_shop_open",String(shopOpen)); },[shopOpen]);
  useEffect(()=>{ localStorage.setItem("kaiha_black_card",String(isBlackCard)); localStorage.setItem("kaiha_coins",String(coins)); },[isBlackCard,coins]);

  const addToCart = (p:any) => {
    if(!shopOpen){ alert(lang==="ur"?"دکان بند ہے - Shop Closed":"Shop Closed - 30"); return; }
    setCartItems(prev=>{
      const exist = prev.find(i=>i.product.id===p.id);
      if(exist) return prev.map(i=>i.product.id===p.id?{...i, qty:i.qty+1}:i);
      return [...prev, {id:Date.now(), product:p, qty:1, size:"M", color:colors[0]}];
    });
    setShowCart(true);
  };

  // 64 VOICE ORDER
  const startVoice = ()=>{
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){ alert("Voice not supported"); return; }
    const rec = new SpeechRecognition(); rec.lang="en-US"; setIsListening(true);
    rec.onresult=(e:any)=>{
      const text=e.results[0][0].transcript.toLowerCase();
      if(text.includes("black")||text.includes("tee")){ addToCart(allProducts[0]); alert(`64 Voice: "${text}" -> Added to cart`); }
      setIsListening(false);
    }; rec.onend=()=>setIsListening(false); rec.start();
  };

  // 38 SPIN
  const doSpin = ()=>{ const vals=[10,20,50,100]; const win=vals[Math.floor(Math.random()*vals.length)]; setSpinResult(win); setCoins(c=>c+win); };

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

  const t = (en:string, ur:string)=> lang==="ur"?ur:en;

  return(
    <div className="bg-black text-white min-h-screen pb-32">
      <style>{`*{font-family:Inter,sans-serif!important}.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>

      <nav className="flex justify-between items-center px-5 h-[62px] sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-xl bg-[#111] border border-zinc-800 flex items-center justify-center"><span className="font-black text-[19px] text-[#D4AF37]">K</span></div>
          <h1 className="font-black text-[16px] tracking-[0.20em] text-[#D4AF37]">KAIHA</h1>
          <button onClick={()=>setLang(lang==="en"?"ur":"en")} className="ml-1 bg-zinc-800 text-[10px] px-2 py-1 rounded-full">65. {lang==="en"?"اردو":"EN"}</button>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full flex gap-1">🪙 {coins}</div>
          <button onClick={()=>setShowBell(true)} className="relative">🔔</button>
          <button onClick={()=>setShowWishlist(true)}>♡</button>
          <button onClick={()=>setShowProfile(true)}>👤</button>
          <button onClick={()=>setShowCart(true)} className="relative">🛒{cartItems.length>0 && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      {/* 30 SHOP OPEN / 44 COD / 33 TRACKING / 48 PUSH / 39 BLACK CARD */}
      <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        <button onClick={()=>setShopOpen(!shopOpen)} className={`shrink-0 text-[11px] px-3 py-2 rounded-full border ${shopOpen?"bg-green-600 border-green-600":"bg-red-600 border-red-600"}`}>30. {shopOpen?"Shop OPEN":"Shop CLOSED"}</button>
        <button onClick={()=>setShowTracking(true)} className="shrink-0 bg-zinc-800 text-[11px] px-3 py-2 rounded-full">33. 🗺️ Tracking</button>
        <button onClick={()=>setShowSpin(true)} className="shrink-0 bg-yellow-600 text-[11px] px-3 py-2 rounded-full">38. Spin {spinResult?`+${spinResult}`:""}</button>
        <button onClick={()=>{ if(Notification.permission!=="granted") Notification.requestPermission(); new Notification("KAIHA Flash 40% OFF!"); alert("48. Push Sent"); }} className="shrink-0 bg-zinc-800 text-[11px] px-3 py-2 rounded-full">48. Push</button>
        <button onClick={()=>{ setIsBlackCard(!isBlackCard); alert(isBlackCard?"Black Card Removed":"39. Black Card Rs.499 Activated - 10% OFF + Free Delivery"); }} className={`shrink-0 text-[11px] px-3 py-2 rounded-full ${isBlackCard?"bg-yellow-500 text-black font-bold":"bg-zinc-800"}`}>39. Black Card {isBlackCard?"✓":""}</button>
        <button onClick={startVoice} className={`shrink-0 text-[11px] px-3 py-2 rounded-full ${isListening?"bg-red-600":"bg-zinc-800"}`}>64. {isListening?"🎙️ Listening...":"🎤 Voice Order"}</button>
        <a href="/seller" className="shrink-0 bg-zinc-800 text-[11px] px-3 py-2 rounded-full">Seller - 45</a>
        <a href="/admin" className="shrink-0 bg-red-900 text-[11px] px-3 py-2 rounded-full">46. Admin</a>
        <a href="/rider" className="shrink-0 bg-green-900 text-[11px] px-3 py-2 rounded-full">32. Rider</a>
      </div>

      {/* 45 SHOP NAME + 37 REFER + 42 AI SUGGEST */}
      <div className="px-4 py-3 bg-[#0a0a0a] border-y border-zinc-900 space-y-2">
        <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="45. Apni Shop Name likho - HADI COLLECTION" className="w-full bg-black border border-yellow-500/50 rounded-lg h-[40px] px-3 text-[12px]" />
        <div className="flex gap-2">
          <div className="flex-1 bg-zinc-900 rounded-lg p-2"><p className="text-[10px] text-zinc-400">37. Refer Wallet - Easypaisa Rs.50</p><p className="text-[11px] font-mono">kaiha.app/r/{isLoggedIn?"HADI123":"LOGIN"}</p></div>
          <div className="flex-1 bg-zinc-900 rounded-lg p-2"><p className="text-[10px] text-zinc-400">42. AI Outfit Suggest</p><p className="text-[11px]">Tee + Cargo best hai</p></div>
        </div>
        <div className="bg-zinc-900 rounded-lg p-2 flex justify-between"><p className="text-[10px]">50. Coins Mall - Admin se select hoga - 100 coins = Free Tee</p><a href="/admin" className="text-yellow-500 text-[10px]">Open</a></div>
      </div>

      <div className="p-3"><div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] gap-3 border border-zinc-800"><span className="text-zinc-500">🔍</span><input placeholder={t("Search products","پروڈکٹ تلاش کریں")} className="bg-transparent flex-1 text-[13px] outline-none placeholder:text-zinc-500" /></div></div>

      <div className="flex gap-2.5 px-4 py-2">
        {(["Fashion","Beauty","Home"] as const).map(tt=>(
          <button key={tt} onClick={()=>{setActiveTab(tt as any); setSub("All")}} className={`flex-1 h-[40px] rounded-full text-[13px] font-semibold border ${activeTab===tt?"bg-white text-black":"bg-[#1a1a1a] text-white border-zinc-800"}`}>{tt}</button>
        ))}
      </div>

      {activeTab==="Fashion" && (
        <div className="px-2 py-4 border-b border-zinc-900">
          <div className="flex gap-4 overflow-x-auto px-2 pb-2 scrollbar-hide">
            {fashionCircles.map(c=>(
              <button key={c.id} onClick={()=>setActiveCircle(c.name)} className="flex flex-col items-center gap-2 min-w-[68px]">
                <img src={circleImages[c.name]} className={`w-[64px] h-[64px] rounded-full object-cover border-2 ${activeCircle===c.name?"border-yellow-500":"border-zinc-700"}`} alt="" />
                <span className="text-[10px] font-semibold">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 px-2 scrollbar-hide">
            {genderFilters.map(g=>(
              <button key={g} onClick={()=>setGender(g)} className={`px-4 h-[34px] rounded-full text-[13px] border whitespace-nowrap shrink-0 ${gender===g?"bg-white text-black font-semibold":"bg-black border-zinc-700 text-zinc-300"}`}>{g}</button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-2 text-[11px] text-zinc-400">{t(`Showing ${filtered.length} items`, `${filtered.length} آئٹمز`)} • {activeCircle} • {gender}</div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative">
              <img src={p.img} className="w-full aspect-[3/4] object-cover object-top" style={{transform:`rotateY(${show360?.id===p.id?rotateVal:0}deg)`}} alt="" />
              <span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px] font-bold">{p.gender}</span>
              <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-[8px] font-bold">45. {shopName||"KAIHA STORE"}</span>
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-bold text-zinc-400">{p.brand}</h4>
              <h3 className="text-[12px] font-medium truncate">{p.name}</h3>
              <p className="font-bold text-[13px] mt-1">Rs. {isBlackCard?Math.floor(p.price*0.9):p.price} {isBlackCard && <span className="text-[9px] text-green-400 line-through">Rs.{p.price}</span>}</p>
              <div className="flex gap-1 mt-2">
                <button onClick={()=>addToCart(p)} className="flex-1 bg-white text-black text-[11px] font-bold h-[30px] rounded-full">{t("ADD","خریدیں")}</button>
                <button onClick={()=>setShow360(show360?.id===p.id?null:p)} className="w-8 h-[30px] bg-zinc-800 rounded-full text-[10px]">62. 360°</button>
              </div>
              {show360?.id===p.id && <input type="range" min="-180" max="180" value={rotateVal} onChange={e=>setRotateVal(Number(e.target.value))} className="w-full mt-2" />}
              <div className="flex gap-1 mt-2">
                <button onClick={()=>setShowChat(p)} className="flex-1 bg-zinc-800 text-[10px] h-[26px] rounded-full">34. 💬 Chat</button>
                <button onClick={()=>setShowTryOn(p)} className="flex-1 bg-zinc-800 text-[10px] h-[26px] rounded-full">36. Try AI</button>
                <button onClick={()=>{ if(!wishlist.find(w=>w.id===p.id)) setWishlist([...wishlist,p]); alert("49. Wishlist Added - WhatsApp Share ready"); }} className="w-8 h-[26px] bg-zinc-800 rounded-full">♡</button>
              </div>
              <div className="flex gap-1 mt-2 items-center">
                <input value={bargainPrice[p.id]||""} onChange={e=>setBargainPrice({...bargainPrice,[p.id]:e.target.value})} placeholder="35. Offer Rs" className="flex-1 bg-black border border-zinc-700 rounded-full h-[28px] px-2 text-[10px]" />
                <button onClick={()=>{ alert(`35. Bargain Offer Rs.${bargainPrice[p.id]} sent to Seller ${shopName}`); }} className="bg-yellow-600 text-[10px] px-2 h-[28px] rounded-full">Offer</button>
              </div>
              <div className="mt-2 text-[10px] text-zinc-400">40. Review: {reviews.filter(r=>r.productId===p.id).length} 📸 <button onClick={()=>{ const url=prompt("Photo Review URL paste karo - 40"); if(url) setReviews([...reviews,{productId:p.id,url,user:"@you"}]); }} className="text-yellow-500">+ Photo</button></div>
            </div>
          </div>
        ))}
      </div>

      {/* KAIHA TV 41 LIVE */}
      <div className="p-4 bg-[#0a0a0a] mt-4 border-y border-zinc-900">
        <div className="flex justify-between items-center mb-3"><h2 className="font-bold text-[14px] flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px]">▶</span> 41. KAIHA TV LIVE</h2><button onClick={()=>fileRef.current?.click()} className="bg-white text-black px-3 h-[28px] rounded-full text-[11px] font-bold">+ Upload</button></div>
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e)=>{const file=e.target.files?.[0]; if(file){const url=URL.createObjectURL(file); setReels([{id:Date.now(), user:"@you", role:"Customer", product:"New Drop", price:1999, video:url, thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400", likes:0, isRider:false, isLive:false},...reels]);}}} />
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">{reels.map(reel=>(<div key={reel.id} onClick={()=>setShowReel(reel)} className="min-w-[150px] w-[150px] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative"><img src={reel.thumb} className="w-full h-[200px] object-cover" alt="" />{reel.isLive && <span className="absolute top-2 left-2 bg-red-600 text-[8px] px-2 py-0.5 rounded-full animate-pulse">LIVE</span>}<div className="absolute bottom-0 p-2 w-full bg-gradient-to-t from-black to-transparent"><p className="text-[11px] font-bold truncate">{reel.product}</p><p className="text-[10px] text-yellow-500">Rs. {reel.price}</p></div><div className="absolute inset-0 flex items-center justify-center"><div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-black text-[10px]">▶</div></div></div>))}</div>
      </div>

      {showSpin && (<div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-6"><div className="bg-[#121212] border border-yellow-500 rounded-2xl p-6 w-full max-w-sm text-center"><h2 className="font-black text-xl text-yellow-500">38. Spin</h2><button onClick={()=>{ const v=[10,20,50][Math.floor(Math.random()*3)]; setSpinR(v); setCoins(c=>c+v); }} className="w-full bg-yellow-500 text-black h-[44px] rounded-xl font-bold mt-4">SPIN NOW +{spinR}</button><button onClick={()=>setSpin(false)} className="w-full bg-zinc-800 h-[40px] rounded-xl mt-2">Close</button></div></div>)}
{showTryOn && (<div className="fixed inset-0 bg-black/90 z-[70] flex flex-col"><div className="p-4 flex justify-between"><h3 className="font-bold">36. Try On AI</h3><button onClick={()=>setShowTryOn(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="flex-1 flex items-center justify-center">Try On Working</div></div>)}
{showChat && (<div className="fixed inset-0 bg-black/90 z-[70] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-800"><h3 className="font-bold">34. Chat {shopName}</h3><button onClick={()=>setChat(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="p-4"><button onClick={()=>window.open(`https://wa.me/923000000000?text=I want ${chat?.name}`,"_blank")} className="bg-green-600 px-5 h-[44px] rounded-full">WhatsApp Chat</button></div></div>)}
{showTracking && (<div className="fixed inset-0 bg-black z-[70] p-4"><div className="flex justify-between"><h2 className="font-bold">33. Tracking Map</h2><button onClick={()=>setShowTracking(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="w-full h-[300px] bg-zinc-900 rounded-xl mt-4 flex items-center justify-center">🗺️ Rider 2km away - 65% delivered</div></div>)}
{showReel && (<div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold">{showReel.role}</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><video src={showReel.video} controls autoPlay className="flex-1 bg-black object-contain" /><div className="p-4 bg-[#121212]"><button onClick={()=>{ addToCart({id:showReel.id, name:showReel.product, price:showReel.price, img:showReel.thumb}); setShowReel(null); }} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY NOW 63. Blockchain QR</button></div></div>)}
{showCart && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 overflow-y-auto"><div className="flex justify-between mb-4"><h2 className="font-bold">Cart</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{cart.map((i:any)=><div key={i.id} className="bg-zinc-900 p-3 rounded-xl mb-3">{i.name} - Qty {i.qty}</div>)}<button className="mt-4 bg-yellow-500 text-black w-full h-[44px] rounded-xl font-bold">Checkout Rs.{cart.reduce((a:any,b:any)=>a+b.price*b.qty,0)}</button></div></div>)}
{showBell && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Notifications</h2><button onClick={()=>setShowBell(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><p className="text-[12px]">48. Flash Sale 40% OFF - 47. Sales Rs. 1,20,000</p></div></div>)}
{showWishlist && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Wishlist 49</h2><button onClick={()=>setShowWishlist(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{wishlist.map((w:any)=><div key={w.id} className="bg-zinc-900 p-2 rounded-lg mb-2">{w.name}</div>)}</div></div>)}
{showProfile && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Profile</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="text-center"><div className="w-14 h-14 bg-yellow-500 rounded-full mx-auto flex items-center justify-center font-bold text-black">H</div><p className="font-bold mt-2">HADI - KAIHA</p></div></div></div>)}
</div>
);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
