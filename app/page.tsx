"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const fashionCircles = [
  {id:"genz",name:"GEN Z DRIP"},
  {id:"winter",name:"WINTER EDIT"},
  {id:"summer",name:"SUMMER FITS"},
  {id:"tshirt",name:"T-SHIRTS"},
  {id:"men",name:"MEN"},
  {id:"women",name:"WOMEN"}
];

const circleImages: any = {
  "GEN Z DRIP":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
  "WINTER EDIT":"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200",
  "SUMMER FITS":"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200",
  "T-SHIRTS":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
  "MEN":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "WOMEN":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200"
};

const genderFilters = ["Both","Male","Female","Boy","Girl","Child"];

const baseProducts = [
  {id:"base1", name:"Oversized Street Tee", price:1999, gender:"Male", stock:10, active:true, colors:["Black"], sizes:["M","L"], img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", shop:"KAIHA OFFICIAL", shop_video:""},
  {id:"base2", name:"Boy Street Tee", price:1299, gender:"Boy", stock:8, active:true, colors:["White"], sizes:["S","M"], img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&q=80", shop:"KAIHA BOY", shop_video:""},
];

export default function Home(){
  const [cartItems,setCartItems]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [showDetail,setShowDetail]=useState<any>(null);
  const [showAddress,setShowAddress]=useState(false);
  const [showPayment,setShowPayment]=useState(false);
  const [address,setAddress]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("COD");
  const [coins,setCoins]=useState(0);
  const [coupon,setCoupon]=useState("");
  const [discount,setDiscount]=useState(0);
  const [search,setSearch]=useState("");
  const [sellerProducts,setSellerProducts]=useState<any[]>([]);
  const [shopOpen,setShopOpen]=useState(true);
  const [shopVideo,setShopVideo]=useState("");
  const [shopNameState,setShopNameState]=useState("KAIHA SELLER");
  const [showReel,setShowReel]=useState<any>(null);
  const [reels,setReels]=useState<any[]>([]);
  const [gender,setGender]=useState("Both");
  const [lang,setLang]=useState("en");
  const [showSpin,setShowSpin]=useState(false);
  const [showTracking,setShowTracking]=useState(false);
  const [showChat,setShowChat]=useState<any>(null);
  const [otp,setOtp]=useState("");
  const [showOtp,setShowOtp]=useState(false);
  const [isBlackCard,setIsBlackCard]=useState(false);
  const [coinsMall,setCoinsMall]=useState<any[]>([]);
  const [rotation,setRotation]=useState(0);
  const fileRef=useRef<HTMLInputElement>(null);
  const tryOnRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const loadData = async()=>{
      try{
        const {data:sellers} = await supabase.from("kaiha_sellers").select("id, shop_name, shop_video, is_open");
        if(sellers && sellers.length>0){
          const openShops = sellers.filter((s:any)=>s.is_open!==false);
          setShopOpen(openShops.length>0);
          const withVideo = sellers.find((s:any)=>s.shop_video);
          if(withVideo){
            setShopVideo(withVideo.shop_video);
            setShopNameState(withVideo.shop_name);
            localStorage.setItem("kaiha_shop_video", withVideo.shop_video);
            localStorage.setItem("kaiha_shop_name", withVideo.shop_name);
          }
          const {data:prods} = await supabase.from("kaiha_products").select("*, kaiha_sellers(shop_name, shop_video, is_open)").order("created_at",{ascending:false});
          if(prods){
            const mapped = prods.filter((p:any)=>p.kaiha_sellers?.is_open!==false).map((p:any)=>({
              id:p.id, name:p.name, price:p.price, stock:p.stock||10, gender:p.gender||"Male",
              colors:p.colors||["Black"], sizes:p.sizes||["M"],
              img:p.image_url||"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
              shop: p.kaiha_sellers?.shop_name || "KAIHA SELLER",
              shop_video: p.kaiha_sellers?.shop_video||"",
              active:true
            }));
            setSellerProducts(mapped);
          }
        }
        const {data:coinsData} = await supabase.from("kaiha_coins_mall").select("*");
        if(coinsData && coinsData.length>0){
          setCoinsMall(coinsData.map((c:any)=>({id:c.id, name:c.name, coins:c.coins_required||100, img:c.image_url})));
        } else {
          setCoinsMall(JSON.parse(localStorage.getItem("kaiha_coins_mall")||"[]"));
        }
      }catch(e){
        console.log("Supabase load fail - local fallback");
        setCoinsMall(JSON.parse(localStorage.getItem("kaiha_coins_mall")||"[]"));
        setShopVideo(localStorage.getItem("kaiha_shop_video")||"");
        setShopNameState(localStorage.getItem("kaiha_shop_name")||"KAIHA SELLER");
      }
      setReels([{id:1,role:"Seller Live - 41",product:"Live Shopping - Tee 1999",price:1999,video:"https://www.w3schools.com/html/mov_bbb.mp4",thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"}]);
    };
    loadData();
  },[]);

  const addToCart=(p:any)=>{
    setCartItems(prev=>{
      const ex=prev.find(i=>i.product.id===p.id);
      if(ex) return prev.map(i=>i.product.id===p.id?{...i,qty:i.qty+1}:i);
      return [...prev,{id:Date.now(),product:p,qty:1}];
    });
    setShowDetail(null);
    setShowCart(true);
  };

  const allProducts = [...baseProducts,...sellerProducts];
  const filtered = allProducts.filter(p=> p.stock!==0 && p.active!==false && (gender==="Both"||p.gender===gender) && (!search || p.name.toLowerCase().includes(search.toLowerCase())));
  const total = cartItems.reduce((a,b)=>a+b.product.price*b.qty,0);
  const finalTotal = Math.round(total - (total*discount/100) - (isBlackCard? total*0.1 : 0));
  const t = (en:string, ur:string) => lang==="ur"? ur : en;

  return(
    <div className="bg-black text-white min-h-screen pb-24">
      <nav className="flex justify-between items-center px-4 h-[56px] sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-2"><div className="w-9 h-9 bg-[#111] border border-zinc-800 flex items-center justify-center rounded-lg"><span className="text-[#D4AF37] font-bold">K</span></div><h1 className="font-bold text-[14px] tracking-widest text-[#D4AF37]">KAIHA 65</h1><span className="bg-yellow-500 text-black text-[9px] px-2 py-0.5 rounded-full font-bold">🪙 {coins}</span></div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setLang(lang==="en"?"ur":"en")} className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">65.{lang==="en"?" اردو":"EN"}</button>
          <button onClick={()=>setShowSpin(true)} className="text-[10px] bg-yellow-600 px-2 py-1 rounded-full">38. Spin</button>
          <a href="/seller" className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full">Seller</a>
          <a href="/admin" className="text-[10px] bg-red-900 px-2 py-1 rounded-full">Admin 46</a>
          <a href="/rider" className="text-[10px] bg-green-900 px-2 py-1 rounded-full">Rider 32</a>
          <button onClick={()=>setShowCart(true)} className="relative">🛒{cartItems.length>0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[8px] w-3 h-3 rounded-full flex items-center justify-center">{cartItems.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      <div className="p-3 flex gap-2">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] border border-zinc-800 flex-1"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("Search + Enter","تلاش کریں")} className="bg-transparent flex-1 text-[13px] outline-none" /></div>
        <button onClick={()=>{ const SR=(window as any).webkitSpeechRecognition||(window as any).SpeechRecognition; if(!SR) return alert("Mic not supported"); const rec=new SR(); rec.lang="en-PK"; rec.onresult=(e:any)=>{ const txt=e.results[0][0].transcript.toLowerCase(); setSearch(txt); if(txt.includes("order")){ const p=filtered[0]; if(p){ addToCart(p); alert("64. Voice Ordering: "+p.name+" cart me dal diya"); } } }; rec.start(); }} className="w-[44px] h-[44px] bg-white text-black rounded-full">🎤 64</button>
      </div>

      <div className="px-2 py-2 flex gap-3 overflow-x-auto">{fashionCircles.map(c=>(<button key={c.id} onClick={()=>setShopNameState(c.name)} className="flex flex-col items-center gap-1 min-w-[60px]"><img src={circleImages[c.name]} className="w-14 h-14 rounded-full border-2 border-zinc-700" alt=""/><span className="text-[9px]">{c.name}</span></button>))}</div>
      <div className="px-2 flex gap-2 overflow-x-auto mt-2">{genderFilters.map(g=>(<button key={g} onClick={()=>setGender(g)} className={`px-3 h-[28px] rounded-full text-[11px] border ${gender===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>))}</div>

      <div className="px-4 py-2 flex gap-2"><input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="KAIHA1 40% OFF" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full h-[36px] px-4 text-[12px]" /><button onClick={()=>{ if(coupon.toUpperCase()==="KAIHA1"){ setDiscount(40); alert("40% OFF"); } }} className="bg-yellow-500 text-black px-4 h-[36px] rounded-full text-[11px] font-bold">Apply</button><button onClick={()=>{ if(!isBlackCard){ if(confirm("39. Black Card Rs.499 - 10% extra off + free delivery?")) setIsBlackCard(true); } }} className={`px-3 h-[36px] rounded-full text-[10px] font-bold ${isBlackCard?"bg-yellow-500 text-black":"bg-zinc-800"}`}>{isBlackCard?"Black Card ON":"39. Black Card"}</button></div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative">
              <img src={p.img} onClick={()=>setShowDetail(p)} className="w-full h-[190px] object-cover cursor-pointer" style={{transform:`rotateY(${rotation}deg)`}} alt="" />
              <span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[7px]">Stock:{p.stock} • {p.gender}</span>
              <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-[6px] font-bold">Sold by {p.shop||shopNameState} 45</span>
              <button onClick={()=>setRotation(r=>r+90)} className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px]">62. 360° 3D</button>
            </div>
            <div className="p-2">
              <h3 className="text-[11px] truncate font-bold">{p.name}</h3><p className="text-[11px] font-bold">Rs. {p.price}</p>
              <p className="text-[8px] text-yellow-500">Sold by {p.shop||shopNameState} 45 • View Store</p>
              <div className="flex gap-1 mt-1.5">
                <button onClick={()=>addToCart(p)} className="flex-1 bg-white text-black text-[9px] h-[30px] rounded-full font-bold">{t("ADD TO CART","ٹوکری میں ڈالیں")}</button>
                <button onClick={()=>{ const vid=(p as any).shop_video||shopVideo; if(vid) setShowReel({product:`3D Store - ${p.name}`,video:vid,thumb:p.img,role:"3D Shop Tour"}); else alert("Seller ne 3D video nahi dala - /seller pe upload karo 31"); }} className="flex-1 border border-[#D4AF37] text-[#D4AF37] text-[8px] h-[30px] rounded-full font-bold">🏪 VIEW STORE 31</button>
              </div>
              <div className="flex gap-1 mt-1.5">
                <button onClick={()=>setShowChat(p)} className="flex-1 bg-zinc-800 text-[8px] h-[24px] rounded-full">34. 💬 Chat</button>
                <button onClick={()=>{ const offer=prompt("35. Bargain - Kitne me lena hai?"); if(offer) alert("Offer seller ko gaya: Rs."+offer); }} className="flex-1 bg-zinc-800 text-[8px] h-[24px] rounded-full">35. Bargain</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0a0a0a] border-y border-zinc-900 mt-4">
        <h2 className="font-bold text-[13px]">▶ KAIHA TV 41 Live • 50 Coins Mall: {coinsMall.length}</h2>
        <div className="flex gap-2 overflow-x-auto mt-2 pb-2">
          {shopVideo && <div onClick={()=>setShowReel({product:"3D Shop Tour",video:shopVideo,thumb:"",role:"3D Shop"})} className="min-w-[120px] h-[140px] bg-yellow-800 rounded-xl flex flex-col items-center justify-center border border-yellow-500"><span>🏪</span><p className="text-[9px] font-bold">3D VIDEO 31</p></div>}
          {coinsMall.map((c:any)=>(<div key={c.id} className="min-w-[120px] bg-zinc-900 rounded-xl p-2 border border-zinc-800"><p className="text-[10px] font-bold">{c.name}</p><p className="text-[9px] text-yellow-500">{c.coins} coins</p><button onClick={()=>{ if(coins>=c.coins){ setCoins(co=>co-c.coins); alert("50. Coins se buy: "+c.name); } else alert("Coins kam hain"); }} className="mt-1 w-full bg-yellow-500 text-black text-[9px] h-[22px] rounded-full font-bold">Buy with Coins</button></div>))}
          {reels.map(r=>(<div key={r.id} onClick={()=>setShowReel(r)} className="min-w-[120px] bg-zinc-900 rounded-xl overflow-hidden"><img src={r.thumb} className="w-full h-[100px] object-cover"/><p className="text-[9px] p-1">{r.product}</p></div>))}
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={()=>fileRef.current?.click()} className="bg-white text-black px-3 h-[28px] rounded-full text-[10px] font-bold">+ Upload Reel 41</button>
          <button onClick={()=>tryOnRef.current?.click()} className="bg-zinc-800 px-3 h-[28px] rounded-full text-[10px]">36. Try On AI</button>
        </div>
        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={e=>{ const f=e.target.files?.[0]; if(f){ const url=URL.createObjectURL(f); setReels([{id:Date.now(),product:"Live Video",video:url,thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",role:"Customer",price:1999},...reels]); } }} />
        <input ref={tryOnRef} type="file" accept="image/*" className="hidden" onChange={e=>{ const f=e.target.files?.[0]; if(f){ alert("36. Try On AI - Photo pe kapra laga diya!"); } }} />
      </div>

      {showReel && (<div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between"><h3 className="font-bold">{showReel.role}</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><video src={showReel.video} controls autoPlay className="flex-1"/><div className="p-4"><button onClick={()=>{addToCart({id:showReel.id,name:showReel.product,price:1999,img:showReel.thumb,stock:10}); setShowReel(null)}} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY - 41 Live</button></div></div>)}
      {showDetail && (<div className="fixed inset-0 bg-black z-[85] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold">{showDetail.name}</h3><button onClick={()=>setShowDetail(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><img src={showDetail.img} className="w-full h-[40%] object-cover"/><div className="p-4"><p className="font-bold">Rs. {showDetail.price} • Sold by {showDetail.shop||shopNameState} 45</p><p className="text-[11px] text-zinc-400">42 AI Suggest + 62 3D 360 + 63 Blockchain QR</p><div className="grid grid-cols-2 gap-2 mt-4"><button onClick={()=>addToCart(showDetail)} className="bg-white text-black h-[44px] rounded-xl font-bold">ADD TO CART</button><button onClick={()=>{ const vid=showDetail.shop_video||shopVideo; if(vid){ setShowDetail(null); setShowReel({product:`3D Store - ${showDetail.name}`,video:vid,thumb:showDetail.img,role:"3D Shop"}); } }} className="border border-yellow-500 text-yellow-500 h-[44px] rounded-xl font-bold">VIEW STORE 31</button></div></div></div>)}
      {showChat && (<div className="fixed inset-0 bg-black/90 z-[90] flex items-end"><div className="bg-[#1a1a1a] w-full rounded-t-[24px] p-5"><h3 className="font-bold">34 Chat with {showChat.shop||shopNameState}</h3><div className="bg-black p-3 rounded-xl mt-3 h-[200px] text-[11px] text-zinc-400">Chat: Salam, ye item available hai? - Seller: Yes stock me hai</div><div className="flex gap-2 mt-3"><input placeholder="Message likho" className="flex-1 bg-black border border-zinc-700 rounded-full h-[40px] px-4 text-sm"/><button className="bg-yellow-500 text-black px-4 h-[40px] rounded-full font-bold">Send</button></div><button onClick={()=>setShowChat(null)} className="w-full bg-zinc-800 h-[40px] rounded-xl mt-3">Close</button></div></div>)}
      {showSpin && (<div className="fixed inset-0 bg-black/90 z-[90] flex items-center justify-center"><div className="bg-[#1a1a1a] w-[90%] rounded-[24px] p-6 text-center border border-yellow-500/20"><h2 className="font-black text-[18px]">38 Spin Wheel</h2><div className="w-[150px] h-[150px] bg-gradient-to-br from-yellow-500 to-yellow-800 rounded-full mx-auto mt-4 flex items-center justify-center text-[30px]">🎡</div><button onClick={()=>{ const win=[10,20,50,100][Math.floor(Math.random()*4)]; setCoins(c=>c+win); alert("Jeet gaye "+win+" Coins!"); setShowSpin(false); }} className="w-full bg-yellow-500 text-black h-[44px] rounded-xl font-bold mt-4">Spin - Win Coins</button><button onClick={()=>setShowSpin(false)} className="w-full bg-zinc-800 h-[40px] rounded-xl mt-2">Close</button></div></div>)}
      {showTracking && (<div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold">33 Tracking Map</h3><button onClick={()=>setShowTracking(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="w-full h-[300px] bg-zinc-900 flex items-center justify-center">🗺️ Rider 2km away - Bike moving live...</div><div className="p-4"><p className="text-[12px]">44 COD OTP Verified ✅ • 63 Blockchain QR: KAIHA-BLK-{Date.now()}</p></div></div>)}
      {showCart && (<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 flex flex-col"><div className="flex justify-between mb-4"><h2 className="font-bold">{t("Cart","ٹوکری")}</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><div className="flex-1">{cartItems.map(item=>(<div key={item.id} className="bg-zinc-900 rounded-xl p-3 mb-2 flex gap-3"><img src={item.product.img} className="w-14 h-14 rounded-lg object-cover"/><div className="flex-1"><h4 className="text-[12px] font-bold">{item.product.name}</h4><p className="text-[9px] text-yellow-500">Sold by {item.product.shop||shopNameState} 45</p><div className="flex items-center gap-2 mt-1"><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:Math.max(0,i.qty-1)}:i).filter(i=>i.qty>0))} className="w-6 h-6 bg-zinc-800 rounded-full">-</button><span className="text-xs">{item.qty}</span><button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} className="w-6 h-6 bg-zinc-800 rounded-full">+</button></div></div></div>))}</div><div className="border-t border-zinc-800 pt-3"><div className="flex justify-between text-sm"><span>Total</span><span className="font-bold">Rs. {finalTotal}</span></div>{isBlackCard && <p className="text-[10px] text-green-400">39 Black Card 10% OFF</p>}<button onClick={()=>{ setShowCart(false); setShowAddress(true); }} className="w-full bg-yellow-500 text-black h-[48px] rounded-xl font-bold mt-2">{t("Checkout","خریدیں")} Rs. {finalTotal}</button><button onClick={()=>setShowTracking(true)} className="w-full bg-zinc-800 h-[40px] rounded-xl mt-2 text-[11px]">33 Track Order Map</button></div></div></div>)}
      {showAddress && (<div className="fixed inset-0 bg-black/90 z-[
