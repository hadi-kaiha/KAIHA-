"use client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  return (
    <div style={{background:"black", color:"white", minHeight:"100vh", padding:"20px", fontFamily:"sans-serif"}}>
      <button onClick={()=>router.push("/")} style={{color:"gray"}}>← Back to Home</button>
      <div style={{marginTop:"20px", textAlign:"center"}}>
        <div style={{width:"80px", height:"80px", background:"#facc15", borderRadius:"50%", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"32px", fontWeight:"900", color:"black"}}>H</div>
        <h1 style={{fontSize:"24px", fontWeight:"900", marginTop:"12px"}}>HADI</h1>
        <p style={{color:"gray"}}>19, Sukkur Pakistan</p>
        <p style={{color:"#facc15", marginTop:"4px"}}>Founder of KAIHA 🔥</p>
      </div>
      <div style={{marginTop:"30px", background:"#111", padding:"16px", borderRadius:"12px"}}>
        <p>📧 hadi@kaiha.com</p>
        <p style={{marginTop:"8px"}}>📍 Sukkur, Sindh</p>
        <p style={{marginTop:"8px"}}>🚀 Building Billions</p>
      </div>
      <button onClick={()=>router.push("/")} style={{width:"100%", background:"white", color:"black", padding:"14px", borderRadius:"12px", fontWeight:"900", marginTop:"20px"}}>Go to Shopping 🛒</button>
    </div>
  );
    }
