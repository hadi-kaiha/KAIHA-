"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  return (
    <div style={{background:"black", color:"white", minHeight:"100vh"}}>
      {/* Navbar */}
      <div style={{display:"flex", justifyContent:"space-between", padding:"16px", borderBottom:"1px solid #222", position:"sticky", top:0, background:"black", zIndex:10}}>
        <h1 style={{fontWeight:"900", fontSize:"22px", color:"#facc15"}}>KAIHA</h1>
        <div style={{display:"flex", gap:"16px"}}>
          <span onClick={()=>router.push("/profile")} style={{cursor:"pointer"}}>👤</span>
          <span>🛒 {cartCount}</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{padding:"24px", textAlign:"center"}}>
        <h2 style={{fontSize:"32px", fontWeight:"900", marginTop:"40px"}}>GEN Z DRIP</h2>
        <p style={{color:"gray", marginTop:"8px"}}>Premium Streetwear for Sukkur</p>
        
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600" 
          style={{width:"100%", height:"300px", objectFit:"cover", borderRadius:"16px", marginTop:"20px"}}
        />

        <button 
          onClick={()=>setCartCount(cartCount+1)}
          style={{background:"#facc15", color:"black", width:"100%", padding:"14px", borderRadius:"12px", fontWeight:"900", marginTop:"20px", border:"none"}}
        >
          Add to Cart - Rs. 1999
        </button>

        <button 
          onClick={()=>router.push("/profile")}
          style={{background:"white", color:"black", width:"100%", padding:"14px", borderRadius:"12px", fontWeight:"900", marginTop:"12px", border:"none"}}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
      }
