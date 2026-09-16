"use client";
import { useRouter } from "next/navigation";
export default function Profile(){
 const r=useRouter();
 return(
  <div style={{background:"black",color:"white",minHeight:"100vh",padding:"20px"}}>
   <button onClick={()=>r.push("/")} style={{color:"gray", background:"none", border:"none"}}>← Back</button>
   <h1 style={{fontSize:"28px",fontWeight:"900",marginTop:"20px",color:"#facc15"}}>HADI - KAIHA Founder</h1>
   <p>19, Sukkur Pakistan</p>
   <div style={{marginTop:"20px", background:"#111", padding:"16px", borderRadius:"12px"}}>
     <p>Building Billions 🔥</p>
   </div>
   <button onClick={()=>r.push("/")} style={{background:"white",color:"black",width:"100%",padding:"14px",borderRadius:"12px",fontWeight:"900",marginTop:"20px", border:"none"}}>Go Shopping</button>
  </div>
 )
}
