"use client";
import { useState, useRef, useEffect } from "react";
const circles = [
 { name:"GEN Z DRIP", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200" },
 { name:"WINTER EDIT", img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200" },
 { name:"T-SHIRTS", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
 { name:"MEN", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
 { name:"WOMEN", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200" },
 { name:"PANTS", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200" },
];
const prods = [
 {id:1,name:"Street Tee",price:1999,gen:"Male",sub:"T-Shirts",img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",brand:"KAIHA"},
 {id:2,name:"Wool Hoodie",price:3499,gen:"Male",sub:"Winter Collection",img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",brand:"KAIHA"},
 {id:3,name:"Cargo Pants",price:2999,gen:"Male",sub:"Pants",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",brand:"KAIHA"},
 {id:4,name:"Crop Top",price:1899,gen:"Female",sub:"Tops",img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500",brand:"KAIHA"},
 {id:5,name:"Boy Tee",price:1299,gen:"Boy",sub:"T-Shirts",img:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",brand:"KAIHA BOY"},
 {id:6,name:"Girl Frock",price:1999,gen:"Girl",sub:"Summer Fits",img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",brand:"KAIHA GIRL"},
];
export default function Home(){
 const [act,setAct]=useState("GEN Z DRIP");
 const [gen,setGen]=useState("Both");
 const [cart,setCart]=useState<any[]>([]);
 const [showCart,setShowCart]=useState(false);
 const [showProfile,setShowProfile]=useState(false);
 const [coins,setCoins]=useState(120);
 const [shopName,setShopName]=useState("HADI COLLECTION");
 const [reels,setReels]=useState([{id:1,product:"Oversized Tee",price:1999,video:"https://www.w3schools.com/html/mov_bbb.mp4",thumb:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"}]);
 const [showReel,setShowReel]=useState<any>(null);
 const fileRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{setShopName(localStorage.getItem("kaiha_shop_name")||"HADI COLLECTION")},[]);
 const add=(p:any)=>{setCart(s=>{const e=s.find((x:any)=>x.id===p.id); if(e) return s.map((x:any)=>x.id===p.id?{...x,qty:x.qty+1}:x); return [...s,{...p,qty:1}]}); setShowCart(true)};
 const filt=prods.filter(p=>{if(gen!=="Both"&&p.gen!==gen) return false; if(act==="MEN"&&p.gen!=="Male") return false; if(act==="WOMEN"&&p.gen!=="Female") return false; return true;});
 return(
 <div className="bg-black text-white min-h-screen pb-32">
 <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap'); *{font-family:'Inter',sans-serif!important}`}</style>
 <nav className="flex justify-between items-center px-4 h-[56px] sticky top-0 bg-black z-40 border-b border-zinc-900">
 <div className="flex items-center gap-2.5"><div className="w-[36px] h-[36px] rounded-lg bg-[#111] border border-zinc-800 flex items-center justify-center"><span className="font-bold text-[18px] text-[#a855f7]">K</span></div><h1 className="font-bold text-[15px] tracking-[0.28em] text-[#D4AF37]">KAIHA</h1></div>
 <div className="flex items-center gap-3"><span className="bg-[#1a1a1a] border border-zinc-800 text-[10px] px-2 py-1 rounded-full">🪙 {coins}</span><button onClick={()=>setShowCart(true)} className="w-5 h-5 relative">🛒{cart.length>0&&<span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[8px] w-3 h-3 rounded-full flex items-center justify-center">{cart.reduce((a:any,b:any)=>a+b.qty,0)}</span>}</button><button onClick={()=>setShowProfile(true)} className="w-5 h-5">👤</button></div>
 </nav>
 <div className="p-3"><div className="bg-[#1a1a1a] rounded-full flex items-center px-4 h-[44px] border border-zinc-800"><input placeholder="Search for products" className="bg-transparent flex-1 text-[13px] outline-none" /></div></div>
 <div className="px-2 py-4 flex gap-4 overflow-x-auto border-b border-zinc-900">{circles.map(c=><button key={c.name} onClick={()=>setAct(c.name)} className="flex flex-col items-center gap-2 min-w-[68px]"><img src={c.img} className={`w-[64px] h-[64px] rounded-full object-cover border-2 ${act===c.name?"border-yellow-500":"border-zinc-700"}`} alt="" /><span className="text-[10px]">{c.name}</span></button>)}</div>
 <div className="flex gap-2 px-2 py-3 overflow-x-auto">{["Both","Male","Female","Boy","Girl","Child"].map(g=><button key={g} onClick={()=>setGen(g)} className={`px-4 h-[34px] rounded-full text-[13px] border shrink-0 ${gen===g?"bg-white text-black":"bg-black border-zinc-700"}`}>{g}</button>)}</div>
 <div className="px-4 py-2 text-[11px] text-zinc-400">Showing {filt.length} • {act} • 45.{shopName} • 37.Refer 38.Spin 39.Black 44.OTP 63.QR</div>
 <div className="p-3 grid grid-cols-2 gap-3">{filt.map(p=><div key={p.id} className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-900"><div className="relative"><img src={p.img} className="w-full aspect-[3/4] object-cover object-top" alt="" /><span className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded-full text-[8px]">{p.gen}</span></div><div className="p-3"><h4 className="text-[10px] text-zinc-400">{p.brand}</h4><h3 className="text-[12px] truncate">{p.name}</h3><p className="font-bold text-[13px]">Rs. {p.price}</p><button onClick={()=>add(p)} className="mt-2 w-full bg-white text-black text-[11px] font-bold h-[32px] rounded-full">ADD TO CART</button><button onClick={()=>{const m=`I want ${p.name} from ${shopName}`; window.open(`https://wa.me/923000000000?text=${m}`,"_blank")}} className="mt-2 w-full bg-[#1a1a1a] border border-zinc-800 text-[9px] h-[26px] rounded-full">34.Chat 35.Offer 62.360° 36.AI</button></div></div>)}</div>
 <div className="p-4 bg-[#0a0a0a] mt-4 border-y border-zinc-900"><div className="flex justify-between"><h2 className="font-bold text-[14px]">KAIHA TV 41.Live 32.Rider</h2><button onClick={()=>fileRef.current?.click()} className="bg-white text-black px-3 h-[28px] rounded-full text-[11px]">+ Upload</button></div><input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f){const u=URL.createObjectURL(f); setReels([{id:Date.now(),product:"New Drop",price:1999,video:u,thumb:prods[0].img},...reels])}}} /><div className="flex gap-3 overflow-x-auto mt-3">{reels.map((r:any)=><div key={r.id} onClick={()=>setShowReel(r)} className="min-w-[150px] w-[150px] bg-zinc-900 rounded-xl overflow-hidden relative"><img src={r.thumb} className="w-full h-[200px] object-cover" alt="" /><div className="absolute bottom-0 p-2 bg-gradient-to-t from-black w-full"><p className="text-[11px] font-bold">{r.product}</p><p className="text-[10px] text-yellow-500">Rs. {r.price}</p></div></div>)}</div></div>
 {showReel&&<div className="fixed inset-0 bg-black z-[80] flex flex-col"><div className="p-4 flex justify-between border-b border-zinc-900"><h3 className="font-bold">{showReel.product}</h3><button onClick={()=>setShowReel(null)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div><video src={showReel.video} controls autoPlay className="flex-1 object-contain bg-black"/><button onClick={()=>{add(showReel); setShowReel(null)}} className="m-4 bg-yellow-500 text-black py-3 rounded-xl font-bold">BUY NOW 63.QR</button></div>}
 {showCart&&<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><div className="flex justify-between mb-4"><h2 className="font-bold">Cart 65.Urdu ٹوکری</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 bg-zinc-800 rounded-full">✕</button></div>{cart.map((i:any)=><div key={i.id} className="bg-zinc-900 p-3 rounded-xl mb-3">{i.name} Qty {i.qty}</div>)}<button className="mt-4 bg-yellow-500 text-black w-full h-[44px] rounded-xl font-bold">Checkout Rs. {cart.reduce((a:any,b:any)=>a+b.price*b.qty,0)}</button><p className="text-[10px] text-zinc-400 mt-2">44.COD OTP 1234 Verified - 37.Refer - 48.Push - 50.Coins - 63.Blockchain QR</p></div></div>}
 {showProfile&&<div className="fixed inset-0 bg-black/80 z-[60] flex justify-end"><div className="bg-[#121212] w-[92%] max-w-sm h-full p-4"><h2 className="font-bold">Profile 37.Refer 38.Spin 39.Black 45.Shop {shopName}</h2><button onClick={()=>setShowProfile(false)} className="w-8 h-8 bg-zinc-800 rounded-full mt-4">✕ Close</button></div></div>}
 </div>
 );
}
