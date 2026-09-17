"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const circles = ["GEN Z DRIP","WINTER EDIT","SUMMER FITS","T-SHIRTS","MEN","WOMEN"];
const circleImgs: any = {"GEN Z DRIP":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200","WINTER EDIT":"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200","SUMMER FITS":"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200","T-SHIRTS":"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200","MEN":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200","WOMEN":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200"};
const base = [{id:"1",name:"Oversized Tee",price:1999,stock:10,gender:"Male",img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",shop:"KAIHA OFFICIAL"},{id:"2",name:"Boy Tee",price:1299,stock:8,gender:"Boy",img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",shop:"KAIHA BOY"}];

export default function Home(){
  const [cart,setCart]=useState<any[]>([]); const [showCart,setShowCart]=useState(false);
  const [seller,setSeller]=useState<any[]>([]); const [shopName,setShopName]=useState("KAIHA SELLER");
  const [shopVideo,setShopVideo]=useState(""); const [search,setSearch]=useState("");
  const [coins,setCoins]=useState(12); const [gender,setGender]=useState("Both");
  const [active,setActive]=useState("GEN Z DRIP"); const [detail,setDetail]=useState<any>(null);
  const [reel,setReel]=useState<any>(null);

  useEffect(()=>{(async()=>{
    const {data:s}=await supabase.from("kaiha_sellers").select("shop_name, shop_video, is_open");
    const v=s?.find((x:any)=>x.shop_video); if(v){setShopVideo(v.shop_video); setShopName(v.shop_name);}
    const {data:p}=await supabase.from("kaiha_products").select("*, kaiha_sellers(shop_name, shop_video, is_open)").order("created_at",{ascending:false});
    if(p){setSeller(p.filter((x:any)=>x.kaiha_sellers?.is_open!==false).map((x:any)=>({id:x.id,name:x.name,price:x.price,stock:x.stock||10,gender:x.gender||"Male",img:x.image_url||base[0].img,shop:x.kaiha_sellers?.shop_name||"SELLER",shop_video:x.kaiha_sellers?.shop_video||""})));}
  })()},[]);

  const add=(pr:any)=>{setCart(prev=>{const ex=prev.find(i=>i.product.id===pr.id); if(ex) return prev.map(i=>i.product.id===pr.id?{...i,qty:i.qty+1}:i); return [...prev,{id:Date.now(),product:pr,qty:1}];}); setShowCart(true);};
  const all=[...base,...seller].filter(pr=>(gender==="Both"||pr.gender===gender) && (!search || pr.name.toLowerCase().includes(search.toLowerCase())));
  const total=cart.reduce((a,b)=>a+b.product.price*b.qty,0);

  return(
    <div className="bg-black text-white min-h-screen pb-20">
      <nav className="flex justify-between items-center px-4 h-[56px] sticky top-0 bg-black z-40 border-b border-zinc-900">
        <div className="flex items-center gap-2"><div className="w-9 h-9 bg-[#111] border border-zinc-800 flex items-center justify-center rounded-lg"><span className="text-[#D4AF37] font-bold">K</span></div><h1 className="font-bold text-[14px] text-[#D4AF37]">KAIHA 65</h1><span className="bg-yellow-500 text-black text-[9px] px-2 py-0.5 rounded-full">🪙 {coins}</span></div>
        <div className="flex gap-1.5"><a href="/seller" className="text-[10px] bg-zinc-800 px-2.5 py-1.5 rounded-full">Seller</a><a href="/kaiha-admin-786" className="text-[10px] bg-red-900 px-2.5 py-1.5 rounded-full">Admin</a><a href="/rider" className="text-[10px] bg-green-900 px-2.5 py-1.5 rounded-full">Rider</a><button onClick={()=>setShowCart(true)} className="w-8 h-8 bg-white text-black rounded-full">🛒{cart.length>0&&<span className="bg-yellow-500 text-[8px] px-1 rounded-full">{cart.reduce((a,b)=>a+b.qty,0)}</span>}</button></div>
      </nav>
      <div className="p-3"><div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] border border-zinc-800"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search - 64 Voice - 65 اردو" className="bg-transparent flex-1 text-[13px] outline-none"/><button onClick={()=>{const SR=(window as any).webkitSpeechRecognition||(window as any).SpeechRecognition; if(!SR) return; const r=new SR(); r.lang="en-PK"; r.onresult=(e:any)=>setSearch(e.results[0][0].transcript); r.start();}} className="ml-2">🎤</button></div></div>
      <div className="px-3 flex gap-3 overflow-x-auto pb-2">{circles.map(c=><button key={c} onClick={()=>setActive(c)} className="flex flex-col items-center gap-1 min-w-[60px]"><img src={circleImgs[c]} className={`w-14 h-14 rounded-full border-2 ${active===c?"border-yellow-500":"border-zinc-700"} object-cover`} alt=""/><span className="text-[8px]">{c}</span></button>)}</div>
      <div className="px-3 flex gap-2 overflow-x-auto mt-1">{["Both","Male","Female","Boy","Girl"].map(g=><button key={g} onClick={()=>setGender(g)} className={`px-3 h-[28px] rounded-full text-[11px] border ${gender===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>)}</div>
      <div className="p-3 grid grid-cols-2 gap-3">
        {all.map(p=><div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900"><div className="relative"><img src={p.img} onClick={()=>setDetail(p)} className="w-full h-[200px] object-cover" alt=""/><span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-[6px] font-bold">Sold by {p.shop} 45</span></div><div className="p-2.5"><h3 className="text-[11px] font-bold truncate">{p.name}</h3><p className="text-[11px] font-bold">Rs. {p.price}</p><p className="text-[8px] text-yellow-500">Sold by {p.shop} - 31 VIEW - 63 QR</p><div className="flex gap-1 mt-2"><button onClick={()=>add(p)} className="flex-1 bg-white text-black text-[9px] h-[32px] rounded-full font-bold">ADD TO CART - ٹوکری</button><button onClick={()=>{const vid=(p as any).shop_video||shopVideo; if(vid) setReel({product:p.name,video:vid,role:`3D ${p.shop} - 31`}); else alert("No 3D video");}} className="flex-1 border border-yellow-500 text-yellow-500 text-[8px] h-[32px] rounded-full">VIEW STORE 31</button></div></div></div>)}
      </div>
      {detail && <div className="fixed inset-0 bg-black z-[85] p-4"><div className="flex justify-between"><h3>{detail.name} - 45 {detail.shop}</h3><button onClick={()=>setDetail(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><img src={detail.img} className="w-full h-[40%] object-cover mt-4 rounded-xl"/><p className="mt-4 font-bold">Rs.{detail.price} - Sold by {detail.shop} 45 - 63 QR</p><button onClick={()=>add(detail)} className="w-full bg-white text-black h-[44px] rounded-xl font-bold mt-4">ADD TO CART</button></div>}
      {reel && <div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between"><h3>{reel.role}</h3><button onClick={()=>setReel(null)}>✕</button></div><video src={reel.video} controls autoPlay className="flex-1 bg-zinc-900"/><button onClick={()=>{add({id:reel.product,name:reel.product,price:1999,img:"",stock:10}); setReel(null)}} className="m-4 bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY 41 + 45 {shopName}</button></div>}
      {showCart && <div className="fixed inset-0 bg-black/80 z-50 flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4 flex flex-col"><div className="flex justify-between"><h2>Cart - 45 {shopName}</h2><button onClick={()=>setShowCart(false)}>✕</button></div><div className="flex-1 mt-4">{cart.map(i=><div key={i.id} className="bg-zinc-900 p-2 rounded-xl mb-2"><p className="text-[12px]">{i.product.name} x{i.qty}</p><p className="text-[9px] text-yellow-500">Sold by {i.product.shop} 45 - 63 QR</p></div>)}</div><button onClick={async()=>{await supabase.from("kaiha_orders").insert({price:total, status:'pending', product_name:cart.map((c:any)=>c.product.name).join(","), customer_name:"Hadi"}); setCoins(c=>c+5); alert("Order Placed! 44 OTP + 63 QR + 45 "+shopName); setCart([]); setShowCart(false);}} className="w-full bg-yellow-500 text-black h-[48px] rounded-xl font-bold">Place Order Rs.{total} - 44 OTP + 63 QR</button></div></div>}
    </div>
  );
}
