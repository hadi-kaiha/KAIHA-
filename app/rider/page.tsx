"use client";
import { useState } from "react";

export default function RiderPage(){
  const [riderId, setRiderId] = useState("");
  const [logged, setLogged] = useState(false);
  if(!logged){
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold text-center mt-10">Rider Login</h1>
        <input value={riderId} onChange={e=>setRiderId(e.target.value)} placeholder="RIDER-001" className="w-full bg-gray-800 p-3 rounded mt-6"/>
        <button onClick={()=>setLogged(true)} className="w-full bg-yellow-500 text-black p-3 rounded font-bold mt-3">Login</button>
      </div>
    )
  }
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-xl font-bold">Welcome {riderId}</h1>
      <div className="bg-gray-900 p-4 rounded-lg mt-4">
        <p className="font-bold">New Order #1234</p>
        <p className="text-sm text-gray-400">Customer: Ali - Sukkur</p>
        <p className="text-sm text-gray-400">Address: Main Road, Sukkur</p>
        <p className="mt-2">Item: Premium Kurta - Rs.1999</p>
        <button className="w-full bg-green-500 text-black p-2 rounded font-bold mt-3">Accept & Deliver</button>
      </div>
    </div>
  )
          }
