"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function SellerPage(){
  const [shopName, setShopName] = useState("");
  const [step, setStep] = useState(1);
  const [main, setMain] = useState("Fashion");
  const [sub, setSub] = useState("");

  const subs = {
    Fashion: ["GEN Z DRIP","WINTER EDIT","MEN","WOMEN","OLD MONEY"],
    Beauty: ["MAKEUP","SKINCARE","HAIRCARE","FRAGRANCE"],
    Home: ["HOME DECOR","BEDDING","KITCHEN","LIGHTING"]
  }

  if(!shopName){
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold text-center mt-10">Seller Login</h1>
        <p className="text-center text-gray-400 mt-2 mb-6">Apni Shop ka naam likho</p>
        <input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="e.g: HADI FASHION" className="w-full bg-gray-800 p-3 rounded border border-gray-700"/>
        <button onClick={()=>{if(shopName.length>2)setStep(2)}} className="w-full bg-yellow-500 text-black p-3 rounded font-bold mt-3">Login as Seller</button>
      </div>
    )
  }

  if(step===2){
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-xl font-bold">{shopName} - Dashboard</h1>
        <p className="text-gray-400 mt-2 mb-4">Kis Section me product bechna hai?</p>
        <div className="flex gap-2 overflow-x-auto mb-4">{["Fashion","Beauty","Home"].map(c=><button key={c} onClick={()=>{setMain(c); setSub("")}} className={`px-4 py-2 rounded-full ${main===c?'bg-white text-black':'bg-gray-800'}`}>{c}</button>)}</div>
        <div className="grid grid-cols-2 gap-2">
          {subs[main as keyof typeof subs].map(s=><div key={s} onClick={()=>setSub(s)} className={`p-4 rounded-lg text-center cursor-pointer border-2 ${sub===s?'bg-yellow-500 text-black border-yellow-500':'bg-gray-900 border-gray-800'}`}>{s}</div>)}
        </div>
        {sub && <button onClick={()=>setStep(3)} className="w-full bg-green-500 text-black p-3 rounded font-bold mt-6">Add Product in {sub}</button>}
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-1">Add Product</h1>
      <p className="text-gray-400 mb-4">Shop: <span className="text-yellow-500">{shopName}</span> | Section: <span className="text-yellow-500">{sub}</span></p>
      <div className="bg-gray-900 p-4 rounded-lg">
        <input placeholder="Product Name" className="w-full bg-gray-800 p-2 rounded mb-2"/>
        <input placeholder="Price Rs." type="number" className="w-full bg-gray-800 p-2 rounded mb-2"/>
        <input placeholder="Image URL" className="w-full bg-gray-800 p-2 rounded mb-3"/>
        <button onClick={()=>alert(`Product Added by ${shopName} in ${sub}`)} className="w-full bg-green-500 text-black p-3 rounded font-bold flex justify-center gap-2"><Upload size={18}/>Add Product</button>
      </div>
    </div>
  )
      }
