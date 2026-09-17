"use client";
export default function Home() {
  return (
    <div style={{background:"black", color:"white", minHeight:"100vh", padding:20}}>
      <h1 style={{fontSize:24, fontWeight:"bold"}}>KAIHA - BUILD TEST OK</h1>
      <div style={{marginTop:20, display:"flex", gap:8, flexWrap:"wrap"}}>
        {["Male","Female","Both","Child","Boy","Girl"].map(f=>(
          <span key={f} style={{background:"white", color:"black", padding:"6px 12px", borderRadius:20, fontSize:12, fontWeight:"bold"}}>{f}</span>
        ))}
      </div>
      <p style={{marginTop:20}}>Agar ye dikh raha hai toh build fix ho gaya ✅</p>
    </div>
  );
}
