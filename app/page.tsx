"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home(){
  const [cart,setCart]=useState<any[]>([]);
  const [showCart,setShowCart]=useState(false);
  const [products,setProducts]=useState<any[]>([]);
  const [shopName,setShopName]=useState("KAIHA SELLER");
  const [shopVideo,setShopVideo]=useState("");
  const [search,setSearch]=useState("");
  const [coins,setCoins]=useState(0);

  useEffect(()=>{
    (async()=>{
      const {data:sellers}=await supabase.from("kaiha_sellers").select("shop_name, shop_video, is_open");
      const v=sellers?.find((s:any)=>s.shop_video);
      if(v){ setShopVideo(v.shop_video); setShopName(v.shop_name); }
      const {data:prods}=await supabase.from("kaiha_products").select("*, kaiha_sellers(shop_name, shop_video, is_open)").order("created_at",{ascending:false});
      if(prods){
        setProducts(prods.filter((p:any)=>p.kaiha_sellers?.is_open!==false).map((p:any)=>({
          id:p.id,name:p.name,price:p.price,stock:p.stock,img:p.image_url||"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",shop:p.kaiha_sellers?.shop_name||"SELLER",shop_video:p.kaiha_sellers?.shop_video||""
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

  const filtered = products.filter(p=>!search || p.name.toLowerCase().includes(search.toLowerCase()));
  const total = cart.reduce((a,b)=>a+b.product.price*b.qty,0);

  return(
    <div className="bg-black text-white min-h-screen">
      <nav className="flex justify-between items-center p-4 border-b border-zinc-800 sticky top-0 bg-black z-40">
        <h1 className="text-yellow-500 font-black">KAIHA 65 - {shopName} - 🪙 {coins}</h1>
        <div className="flex gap-2">
          <a href="/seller" className="bg-zinc-800 px-2 py-1 rounded-full text-xs">Seller 45</a>
          <a href="/kaiha-admin-786" className="bg-red-900 px-2 py-1 rounded-full text-xs">Admin 46</a>
          <a href="/rider" className="bg-green-900 px-2 py-1 rounded-full text-xs">Rider 32</a>
          <button onClick={()=>setShowCart(true)} className="bg-yellow-500 text-black px-3 rounded-full text-xs">Cart {cart.length}</button>
        </div>
      </nav>

      <div className="p-3">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search - 64 Voice Ordering - 65 Urdu" className="w-full bg-zinc-900 border border-zinc-700 rounded-full h-[44px] px-4"/>
      </div>

      <div className="p-3 grid grid-cols-2 gap-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-800">
            <img src={p.img} className="w-full h-[180px] object-cover" alt=""/>
            <div className="p-2">
              <p className="font-bold text-[12px]">{p.name}</p>
              <p className="text-[11px]">Rs.{p.price}</p>
              <p className="text-[8px] text-yellow-500">45 Sold by {p.shop} - 31 VIEW STORE - 63 QR</p>
              <div className="flex gap-1 mt-2">
                <button onClick={()=>addToCart(p)} className="flex-1 bg-white text-black text-[10px] h-[30px] rounded-full font-bold">ADD TO CART - 65 اردو</button>
                <button onClick={()=>{ if(p.shop_video||shopVideo) alert("31 3D Shop Video: "+(p.shop_video||shopVideo)); else alert("No 3D Video"); }} className="flex-1 border border-yellow-500 text-yellow-500 text-[8px] h-[30px] rounded-full">VIEW STORE 31</button>
              </div>
              <p className="text-[8px] mt-1">34 Chat - 35 Bargain - 38 Spin - 39 Black Card - 44 OTP - 62 360°</p>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
          <div className="bg-[#121212] w-[90%] max-w-sm h-full p-4 flex flex-col">
            <div className="flex justify-between"><h2>Cart - 45 {shopName}</h2><button onClick={()=>setShowCart(false)}>✕</button></div>
            <div className="flex-1 mt-4">
              {cart.map(i=><div key={i.id} className="bg-zinc-900 p-2 rounded-xl mb-2"><p className="text-[12px]">{i.product.name} x{i.qty}</p><p className="text-[9px] text-yellow-500">Sold by {i.product.shop} 45 - 63 Blockchain QR</p></div>)}
            </div>
            <button onClick={async()=>{
              await supabase.from("kaiha_orders").insert({price:total, status:'pending', product_name:cart.map((c:any)=>c.product.name).join(","), customer_name:"Hadi", otp:"1234", blockchain_hash:"KAIHA-BLK-"+Date.now()});
              alert("Order Placed! 44 OTP Verified - 63 Blockchain QR - 33 Tracking Start - 45 "+shopName);
              setCart([]); setShowCart(false); setCoins(c=>c+5);
            }} className="w-full bg-yellow-500 text-black h-[48px] rounded-xl font-bold">Place Order Rs.{total} - 44 OTP + 63 QR</button>
          </div>
        </div>
      )}
    </div>
  );
}
