"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const circles = ["GEN Z DRIP","WINTER EDIT","SUMMER FITS","T-SHIRTS","MEN","WOMEN"];
const circleImgs: any = {
  "GEN Z DRIP":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200",
  "WINTER EDIT":"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200",
  "SUMMER FITS":"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200",
  "T-SHIRTS":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
  "MEN":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  "WOMEN":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200"
};
const baseProducts = [
  {id:"1",name:"Oversized Street Tee",price:1999,stock:10,gender:"Male",img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",shop:"KAIHA OFFICIAL",shop_video:""},
  {id:"2",name:"Boy Street Tee",price:1299,stock:8,gender:"Boy",img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",shop:"KAIHA BOY",shop_video:""},
  {id:"3",name:"Winter Hoodie",price:2999,stock:5,gender:"Male",img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500",shop:"KAIHA OFFICIAL",shop_video:""},
  {id:"4",name:"Summer Fit Kurta",price:2499,stock:12,gender:"Male",img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",shop:"HADI COLLECTION",shop_video:""},
];

export default function Home(){
  const [cart,setCart]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [sellerProducts,setSellerProducts]=useState<any[]>([]);
  const [shopName,setShopName]=useState("KAIHA SELLER");
  const [shopVideo,setShopVideo]=useState("");
  const [search,setSearch]=useState("");
  const [coins,setCoins]=useState(12);
  const [gender,setGender]=useState("Both");
  const [activeCircle,setActiveCircle]=useState("GEN Z DRIP");
  const [showDetail,setShowDetail]=useState<any>(null);
  const [showReel,setShowReel]=useState<any>(null);

  useEffect(()=>{
    (async()=>{
      const {data:sellers}=await supabase.from("kaiha_sellers").select("shop_name, shop_video, is_open");
      const v=sellers?.find((s:any)=>s.shop_video);
      if(v){ setShopVideo(v.shop_video); setShopName(v.shop_name); }
      const {data:prods}=await supabase.from("kaiha_products").select("*, kaiha_sellers(shop_name, shop_video, is_open)").order("created_at",{ascending:false});
      if(prods && prods.length>0){
        setSellerProducts(prods.filter((p:any)=>p.kaiha_sellers?.is_open!==false).map((p:any)=>({
          id:p.id,name:p.name,price:p.price,stock:p.stock||10,gender:p.gender||"Male",img:p.image_url||baseProducts[0].img,shop:p.kaiha_sellers?.shop_name||"SELLER",shop_video:p.kaiha_sellers?.shop_video||""
        })));
      }
    })();
  },[]);

  const addToCart=(p:any)=>{
    setCart(prev=>{
      const ex=prev.find(i=>i.product.id===p.id);
      if(ex) return prev.map(i=>i.product.id===p.id?{...i,qty:i.qty+1}:i);
      return [...prev,{id:Date.now(),product:p,qty:1}];
    });
    setShowCart(true);
  };

  const all=[...baseProducts,...sellerProducts].filter(p=>(gender==="Both"||p.gender===gender) && (!search || p.name.toLowerCase().includes(search.toLowerCase())));
  const total=cart.reduce((a,b)=>a+b.product.price*b.qty,0);

  return(
    <div className="bg-black text-white min-h-screen pb-20">
      <nav className="flex justify-between items-center px-4 h-[56px] sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#111] border border-zinc-800 flex items-center justify-center rounded-lg"><span className="text-[#D4AF37] font-bold">K</span></div>
          <h1 className="font-bold text-[14px] tracking-widest text-[#D4AF37]">KAIHA 65</h1>
          <span className="bg-yellow-500 text-black text-[9px] px-2 py-0.5 rounded-full font-bold">🪙 {coins}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <a href="/seller" className="text-[10px] bg-zinc-800 px-2.5 py-1.5 rounded-full">Seller 45</a>
          <a href="/kaiha-admin-786" className="text-[10px] bg-red-900 px-2.5 py-1.5 rounded-full">Admin 46</a>
          <a href="/rider" className="text-[10px] bg-green-900 px-2.5 py-1.5 rounded-full">Rider 32</a>
          <button onClick={()=>setShowCart(true)} className="relative w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">🛒{cart.length>0&&<span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a,b)=>a+b.qty,0)}</span>}</button>
        </div>
      </nav>

      <div className="p-3">
        <div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] border border-zinc-800">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search - 64 Voice - 65 اردو" className="bg-transparent flex-1 text-[13px] outline-none"/>
          <button onClick={()=>{ const SR=(window as any).webkitSpeechRecognition||(window as any).SpeechRecognition; if(!SR) return alert("Mic not supported"); const rec=new SR(); rec.lang="en-PK"; rec.onresult=(e:any)=>{ const txt=e.results[0][0].transcript; setSearch(txt); }; rec.start(); }} className="ml-2">🎤 64</button>
        </div>
      </div>

      <div className="px-3 flex gap-3 overflow-x-auto pb-2">
        {circles.map(c=>(
          <button key={c} onClick={()=>setActiveCircle(c)} className="flex flex-col items-center gap-1 min-w-[60px]">
            <img src={circleImgs[c]} className={`w-14 h-14 rounded-full border-2 ${activeCircle===c?"border-yellow-500":"border-zinc-700"} object-cover`} alt=""/>
            <span className="text-[8px] text-zinc-300">{c}</span>
          </button>
        ))}
      </div>

      <div className="px-3 flex gap-2 overflow-x-auto mt-1 pb-2">
        {["Both","Male","Female","Boy","Girl"].map(g=>(
          <button key={g} onClick={()=>setGender(g)} className={`px-3 h-[28px] rounded-full text-[11px] border whitespace-nowrap ${gender===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>
        ))}
      </div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {all.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900">
            <div className="relative">
              <img src={p.img} onClick={()=>setShowDetail(p)} className="w-full h-[200px] object-cover cursor-pointer" alt=""/>
              <span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[7px]">Stock:{p.stock} • {p.gender}</span>
              <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-[6px] font-bold">Sold by {p.shop} 45</span>
              <button className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px]">62. 360° 3D</button>
            </div>
            <div className="p-2.5">
              <h3 className="text-[11px] font-bold truncate">{p.name}</h3>
              <p className="text-[11px] font-bold mt-0.5">Rs. {p.price} <span className="text-[8px] text-zinc-500 font-normal">42 Cargo best</span></p>
              <p className="text-[8px] text-yellow-500 mt-0.5">Sold by {p.shop} - View Store 31 - 63 QR</p>
              <div className="flex gap-1 mt-2">
                <button onClick={()=>addToCart(p)} className="flex-1 bg-white text-black text-[9px] h-[32px] rounded-full font-bold">ADD TO CART</button>
                <button onClick={()=>{ const vid=p.shop_video||shopVideo; if(vid) setShowReel({product:p.name,video:vid,role:`3D ${p.shop} Tour - 31 Gucci`,thumb:p.img}); else alert("Seller ne 3D video nahi dala - /seller pe upload karo 31"); }} className="flex-1 border border-[#D4AF37] text-[#D4AF37] text-[8px] h-[32px] rounded-full font-bold">🏪 VIEW STORE</button>
              </div>
              <div className="flex gap-1 mt-1.5">
                <button className="flex-1 bg-zinc-800 text-[8px] h-[24px] rounded-full">34. 💬 Chat</button>
                <button className="flex-1 bg-zinc-800 text-[8px] h-[24px] rounded-full">35. Bargain</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0a0a0a] border-y border-zinc-900 mt-2">
        <h2 className="font-bold text-[12px]">▶ KAIHA TV 41 Live Shopping • 50 Coins Mall</h2>
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {shopVideo && <div onClick={()=>setShowReel({product:"3D Shop Tour",video:shopVideo,role:"3D Shop - 31"})} className="min-w-[110px] h-[110px] bg-yellow-800 rounded-xl flex flex-col items-center justify-center border border-yellow-500"><span>🏪</span><p className="text-[9px] font-bold">3D SHOP 31</p><p className="text-[7px]">{shopName} 45</p></div>}
          <div className="min-w-[110px] h-[110px] bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800"><p className="text-[9px]">Live Reel 41</p></div>
          <div className="min-w-[110px] h-[110px] bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800"><p className="text-[9px]">Coins Mall 50</p></div>
        </div>
      </div>

      {showDetail && (
        <div className="fixed inset-0 bg-black z-[85] flex flex-col">
          <div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold">{showDetail.name} - 45 {showDetail.shop}</h3><button onClick={()=>setShowDetail(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
          <img src={showDetail.img} className="w-full h-[45%] object-cover" alt=""/>
          <div className="p-4"><p className="font-bold">Rs. {showDetail.price} - Sold by {showDetail.shop} 45</p><p className="text-[11px] text-zinc-400 mt-1">42 AI: Cargo best - 62 3D 360 - 63 Blockchain QR - Nakli bill nahi</p><div className="grid grid-cols-2 gap-2 mt-4"><button onClick={()=>addToCart(showDetail)} className="bg-white text-black h-[44px] rounded-xl font-bold">ADD TO CART - 65</button><button onClick={()=>{ const vid=showDetail.shop_video||shopVideo; if(vid) setShowReel({product:showDetail.name,video:vid,role:`3D ${showDetail.shop}`}); }} className="border border-yellow-500 text-yellow-500 h-[44px] rounded-xl font-bold">VIEW STORE 31</button></div></div>
        </div>
      )}

      {showReel && (
        <div className="fixed inset-0 bg-black z-[80] flex flex-col">
          <div className="p-4 flex justify-between"><h3 className="font-bold">{showReel.role} - 31 Gucci</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
          <video src={showReel.video} controls autoPlay className="w-full flex-1 bg-zinc-900"/>
          <div className="p-4"><button onClick={()=>{addToCart({id:showReel.product,name:showReel.product,price:1999,img:showReel.thumb||"",stock:10}); setShowReel(null)}} className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY - 41 Live + 45 {shopName}</button></div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex justify-end">
          <div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 flex flex-col">
            <div className="flex justify-between"><h2 className="font-bold">Cart - 45 {shopName} - 🪙 {coins}</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>
            <div className="flex-1 mt-4 overflow-y-auto">
              {cart.map(item=><div key={item.id} className="bg-zinc-900 rounded-xl p-3 mb-2 flex gap-3"><img src={item.product.img} className="w-14 h-14 rounded-lg object-cover"/><div><h4 className="text-[12px] font-bold">{item.product.name}</h4><p className="text-[9px] text-yellow-500">Sold by {item.product.shop} 45 - 63 QR</p><p className="text-[11px]">Qty {item.qty}</p></div></div>)}
            </div>
            <div className="border-t border-zinc-800 pt-3"><div className="flex justify-between"><span>Total</span><span className="font-bold">Rs. {total}</span></div><button onClick={async()=>{ await supabase.from("kaiha_orders").insert({price:total, status:'pending', product_name:cart.map((c:any)=>c.product.name).join(","), customer_name:"Hadi", otp:"1234", blockchain_hash:"KAIHA-BLK-"+Date.now()}); setCoins(c=>c+5); alert("Order Placed! 44 OTP + 63 QR + 45 "+shopName); setCart([]); setShowCart(false); }} className="w-full bg-yellow-500 text-black h-[48px] rounded-xl font-bold mt-3">Place Order Rs.{total} - 44 OTP + 63 QR</button></div>
          </div>
        </div>
      )}
    </div>
  );
        }
