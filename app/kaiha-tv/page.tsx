"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122")
export default function KaihaTV(){
 const [title,setTitle]=useState(""); const [file,setFile]=useState<File|null>(null)
 const [role,setRole]=useState("customer"); const [name,setName]=useState("")
 const [reels,setReels]=useState<any[]>([]); const [up,setUp]=useState(false)
 useEffect(()=>{ fetchTV() },[])
 const fetchTV=async()=>{
  const {data}=await supabase.from("kaiha_tv_reels").select("*").order("created_at",{ascending:false})
  if(data) setReels(data)
 }
 const upload=async()=>{
  if(!file||!title||!name) return alert("Name Title Video do")
  setUp(true)
  try{
   const fn=`${role}_${Date.now()}_${file.name}`
   const {error}=await supabase.storage.from("kaiha-tv").upload(fn,file)
   if(error) throw error
   const {data}=supabase.storage.from("kaiha-tv").getPublicUrl(fn)
   await supabase.from("kaiha_tv_reels").insert({title, video_url:data.publicUrl, uploader_name:name, uploader_role:role})
   alert("Live hogaya ✅"); setTitle(""); setName(""); setFile(null); fetchTV()
  }catch(e:any){ alert(e.message) }
  setUp(false)
 }
 return(
  <div style={{maxWidth:390,margin:"auto",background:"#0a0a0a",minHeight:"100vh",color:"#fff",padding:16}}>
   <h2 style={{color:"#D4B78F"}}>KAIHA TV 📺</h2>
   <p style={{fontSize:10,color:"#888"}}>Ek hi link - Customer / Rider / Seller / Admin</p>
   <div style={{background:"#141414",border:"1px solid #D4B78F55",padding:12,borderRadius:14,marginTop:12}}>
    <select value={role} onChange={e=>setRole(e.target.value)} style={{width:"100%",padding:11,background:"#000",color:"#fff",borderRadius:8,border:"1px solid #333"}}>
     <option value="customer">Customer</option><option value="rider">Rider</option><option value="seller">Seller</option><option value="admin">Admin</option>
    </select>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Apna Naam" style={{width:"100%",marginTop:8,padding:11,background:"#000",color:"#fff",border:"1px solid #333",borderRadius:8}}/>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" style={{width:"100%",marginTop:8,padding:11,background:"#000",color:"#fff",border:"1px solid #333",borderRadius:8}}/>
    <input type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0]||null)} style={{width:"100%",marginTop:10,color:"#888"}}/>
    <button onClick={upload} disabled={up} style={{width:"100%",marginTop:12,background:"#D4B78F",color:"#000",padding:12,borderRadius:999,fontWeight:"800"}}>{up?"Uploading...":"UPLOAD REEL"}</button>
   </div>
   <div style={{marginTop:22}}>{reels.map((r:any)=><div key={r.id} style={{marginTop:10,background:"#141414",borderRadius:14,overflow:"hidden",border:"1px solid #222"}}><video src={r.video_url} controls playsInline style={{width:"100%"}}/><div style={{padding:10}}><b>{r.title}</b><div style={{fontSize:10,color:"#888"}}>{r.uploader_name} - {r.uploader_role}</div></div></div>)}</div>
  </div>
 )
   }
