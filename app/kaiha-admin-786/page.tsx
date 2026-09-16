"use client";
import { useState } from "react";
export default function AdminSecret(){
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  if(!auth){
    return (
      <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">KAIHA ADMIN - SECRET</h1>
        <p className="text-gray-500 text-sm">Only for HADI</p>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Secret Password" className="w-full max-w-xs bg-gray-800 p-3 rounded mt-6"/>
        <button onClick={()=>{if(pass==="hadi123"){setAuth(true)} else{alert("Wrong")}} } className="w-full max-w-xs bg-red-600 text-white p-3 rounded font-bold mt-3">Unlock</button>
        <p className="text-xs text-gray-600 mt-2">Pass: hadi123</p>
      </div>
    )
  }
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-gray-900 p-4 rounded-lg"><p className="text-2xl font-bold">12</p><p className="text-sm text-gray-400">Total Sellers</p></div>
        <div className="bg-gray-900 p-4 rounded-lg"><p className="text-2xl font-bold">156</p><p className="text-sm text-gray-400">Total Orders</p></div>
        <div className="bg-gray-900 p-4 rounded-lg"><p className="text-2xl font-bold">Rs.45k</p><p className="text-sm text-gray-400">KAIHA Fee</p></div>
        <div className="bg-gray-900 p-4 rounded-lg"><p className="text-2xl font-bold">3</p><p className="text-sm text-gray-400">Active Riders</p></div>
      </div>
    </div>
  )
        }
