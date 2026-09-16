"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Seller(){
  const [shop,setShop]=useState(""); const [gmail,setGmail]=useState(""); const [acc,setAcc]=useState("");
  const [seller,setSeller]=useState<any>(null);
  const [myProducts,setMyProducts]=useState<any[]>([]);
  const [myOrders,setMyOrders]=useState<any[]>([]);

  const [name,setName]=useState(""); const [price,setPrice]=useState(""); const [stock,setStock]=useState("");
  const [sizes,setSizes]=useState<string[]>([]); const [colors,setColors]=useState<string[]>([]);
  const [colorInput,setColorInput]=useState("");

  const login = async()=>{
    if(!shop ||!gmail ||!acc) return alert("Fill all");
    const {data} = await supabase.from("kaiha_sellers").select("*").eq("gmail",gmail).single();
    if(data) setSeller(data);
    else {
      const {data:newS} = await supabase.from("kaiha_sellers").insert({shop_name:shop,gmail,jazzcash:acc}).select().single();
      setSeller(newS);
    }
  }

  const loadData = async(sellerId:string)=>{
    const {data:prods} = await supabase.from("kaiha_products").select("*").eq("seller_id",sellerId).order("created_at",{ascending:false});
    setMyProducts(prods || []);
    const {data:ords} = await supabase.from("kaiha_orders").select("*, kaiha_products(name)").eq("seller_id",sellerId).order("created_at",{ascending:false});
    setMyOrders(ords || []);
  }

  useEffect(()=>{ if(seller) loadData(seller.id) }, [seller]);

  const addProduct = async()=>{
    const {error} = await supabase.from("kaiha_products").insert({
      seller_id:seller.id, name, price:Number(price), sizes, colors, stock:Number(stock) || 10
    });
    if(error) alert(error.message); else { alert("Product Added!"); loadData(seller.id); setName(""); setPrice(""); setStock(""); setSizes([]); setColors([]); }
  }

  const updateStatus = async(orderId:string, status:string)=>{
    await supabase.from("kaiha_orders").update({status}).eq("id",orderId);
    loadData(seller.id);
  }

  const updateStock = async(productId:string, newStock:number)=>{
    if(newStock < 0) return;
    await supabase.from("kaiha_products").update({stock:newStock}).eq("id",productId);
    loadData(seller.id);
  }

  const toggleOpen = async()=>{
    const newStatus =!seller.is_open;
    await supabase.from("kaiha_sellers").update({is_open: newStatus}).eq("id", seller.id);
    setSeller({...seller, is_open: newStatus});
  }

  if(!seller) return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#101828] p-6 rounded-2xl w-full max-w-sm">
        <h1 className="text-yellow-500 font-black text-xl">SELLER LOGIN</h1>
        <input value={shop} onChange={e=>setShop(e.target.value)} placeholder="Shop Name" className="w-full p-3 mt-3 rounded-xl bg-black border border-gray-700 text-white"/>
        <input value={gmail} onChange={e=>setGmail(e.target.value)} placeholder="Gmail" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700 text-white"/>
        <input value={acc} onChange={e=>setAcc(e.target.value)} placeholder="JazzCash / EasyPaisa" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700 text-white"/>
        <button onClick={login} className="w-full bg-yellow-500 text-black font-black p-3 rounded-xl mt-3">LOGIN</button>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen p-4 text-white pb-20">
      {/* HEADER WITH OPEN/CLOSE */}
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-500 font-black text-xl">Welcome {seller.shop_name} 👑</h1>
        <button onClick={toggleOpen} className={`px-4 py-2 rounded-full font-black text-sm ${seller.is_open? 'bg-green-500 text-black' : 'bg-red-600 text-white'}`}>
          {seller.is_open? '🟢 OPEN' : '🔴 CLOSED'}
        </button>
      </div>
      {!seller.is_open && <p className="text-red-400 text-xs mt-2 bg-red-900/20 p-2 rounded-xl">Your shop is CLOSED - Customers cannot order</p>}

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-[#101828] p-3 rounded-xl text-center"><p className="text-2xl font-black">{myProducts.length}</p><p className="text-xs text-gray-400">Items</p></div>
        <div className="bg-[#101828] p-3 rounded-xl text-center"><p className="text-2xl font-black text-red-500">{myProducts.filter(p=>p.stock==0).length}</p><p className="text-xs text-gray-400">Khatam</p></div>
        <div className="bg-[#101828] p-3 rounded-xl text-center"><p className="text-2xl font-black text-green-500">{myOrders.filter(o=>o.status=='pending').length}</p><p className="text-xs text-gray-400">New Orders</p></div>
      </div>

      {/* ADD PRODUCT */}
      <div className="bg-[#101828] p-4 rounded-xl mt-4">
        <h2 className="font-bold">+ Add New Item</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700"/>
        <div className="flex gap-2"><input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700"/><input value={stock} onChange={e=>setStock(e.target.value)} placeholder="Stock Qty" type="number" className="w-full p-3 mt-2 rounded-xl bg-black border border-gray-700"/></div>
        <p className="mt-3 text-sm">Select Sizes:</p>
        <div className="flex gap-2 mt-1">{["S","M","L","XL"].map(s=><button key={s} onClick={()=>setSizes(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s])} className={`px-3 py-1 rounded-full border ${sizes.includes(s)?"bg-yellow-500 text-black":"border-gray-600"}`}>{s}</button>)}</div>
        <p className="mt-3 text-sm">Add Colors:</p>
        <div className="flex gap-2 mt-1"><input value={colorInput} onChange={e=>setColorInput(e.target.value)} placeholder="e.g Black" className="p-2 rounded-xl bg-black border border-gray-700 flex-1"/><button onClick={()=>{if(colorInput){setColors([...colors,colorInput]); setColorInput("")}}} className="bg-white text-black px-3 rounded-xl">Add</button></div>
        <p className="text-xs mt-1 text-gray-400">{colors.join(", ")}</p>
        <button onClick={addProduct} className="w-full bg-yellow-500 text-black font-black p-3 rounded-xl mt-4">ADD ITEM</button>
      </div>

      {/* MY ITEMS */}
      <div className="mt-6"><h2 className="font-black text-lg">Mere Items - Stock Control</h2>
        {myProducts.map(p=>(
          <div key={p.id} className="bg-[#101828] p-3 rounded-xl mt-2 flex justify-between items-center border-l-4" style={{borderColor: p.stock==0? 'red' : p.stock<5? 'orange' : 'green'}}>
            <div><p className="font-bold">{p.name} - Rs.{p.price}</p><p className="text-xs text-gray-400">{p.sizes?.join("/")} | {p.colors?.join(", ")}</p><p className={`text-sm font-bold ${p.stock==0?'text-red-500':'text-green-400'}`}>{p.stock==0? 'KHATAM!' : `${p.stock} bacha hai`}</p></div>
            <div className="flex gap-1 items-center"><button onClick={()=>updateStock(p.id, p.stock-1)} className="bg-red-600 px-3 py-1 rounded-lg">-</button><span className="px-2 font-bold">{p.stock}</span><button onClick={()=>updateStock(p.id, p.stock+1)} className="bg-green-600 px-3 py-1 rounded-lg">+</button></div>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="mt-6"><h2 className="font-black text-lg">Orders - Accept / Reject</h2>
        {myOrders.length==0 && <p className="text-gray-500 text-sm mt-2">Koi order nahi aya abhi</p>}
        {myOrders.map(o=>(
          <div key={o.id} className="bg-[#101828] p-3 rounded-xl mt-2">
            <p className="font-bold">{o.kaiha_products?.name} - Size:{o.size} Color:{o.color}</p>
            <p className="text-xs">Customer: {o.customer_name} | Status: <span className={`font-bold ${o.status=='pending'?'text-yellow-500':o.status=='accepted'?'text-green-500':'text-red-500'}`}>{o.status}</span></p>
            {o.status=='pending' && <div className="flex gap-2 mt-2"><button onClick={()=>updateStatus(o.id,'accepted')} className="flex-1 bg-green-600 p-2 rounded-xl font-bold">ACCEPT</button><button onClick={()=>updateStatus(o.id,'rejected')} className="flex-1 bg-red-600 p-2 rounded-xl font-bold">REJECT</button></div>}
          </div>
        ))}
      </div>
    </div>
  )
      }
