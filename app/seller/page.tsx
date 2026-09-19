"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
export default function Page(){
  const [name,setName]=useState("Black tee");
  const [price,setPrice]=useState("200");
  const [loading,setLoading]=useState(false);
  const upload=async()=>{
    setLoading(true);
    const {data,error}=await supabase.from("products").insert([{name,price:Number(price)}]).select();
    if(error){ alert("❌ "+error.message); }
    else{ alert("✅ SUCCESS! ID: "+data[0].id); setName(""); setPrice(""); }
    setLoading(false);
  };
  return(
    <div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
      <div style={{background:"#0a0a0a",width:"390px",padding:"20px",color:"#fff"}}>
        <h2 style={{color:"#D4B78F",textAlign:"center"}}>KAIHA SELLER</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Black tee" style={{width:"100%",padding:"12px",marginTop:"20px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="200" type="number" style={{width:"100%",padding:"12px",marginTop:"10px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
        <button onClick={upload} disabled={loading} style={{width:"100%",marginTop:"12px",padding:"14px",background:"#D4B78F",color:"#000",border:"none",borderRadius:"999px",fontWeight:"800"}}>{loading?"UPLOADING...":"UPLOAD TO FASHION"}</button>
      </div>
    </div>
  );
                     }
