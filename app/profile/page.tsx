"use client";
import { useEffect, useState } from "react";
export default function Profile(){
  const [c,setC]=useState<any>(null);
  useEffect(()=>{ const d=localStorage.getItem("kaiha_customer"); if(d) setC(JSON.parse(d)); },[]);
  if(!c) return <div className="bg-black text-white min-h-screen p-6">No login - Go home and login</div>;
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-black text-yellow-500">My Profile 👤</h1>
      <p className="mt-4">Name: {c.name}</p>
      <p>Gmail: {c.gmail}</p>
      <button onClick={()=>{localStorage.removeItem("kaiha_customer"); window.location.href="/";}} className="bg-red-500 text-white p-3 rounded-xl mt-6 w-full font-bold">Logout</button>
    </div>
  )
      }
