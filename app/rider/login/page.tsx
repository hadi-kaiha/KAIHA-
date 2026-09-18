"use client";
import {useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";

export default function Login(){
const [phone,setPhone]=useState("");const [pass,setPass]=useState("");const [name,setName]=useState("");const [mode,setMode]=useState("login");

const handleLogin=async()=>{
if(!phone||!pass)return alert("Phone & Password likho");
if(mode==="signup"){
if(!name)return alert("Name likho");
const {data,error}=await supabase.from("riders").insert({name,phone,password:pass,status:"OFFLINE",earnings:0}).select().single();
if(error)return alert(error.message);
localStorage.setItem("kaiha_rider",JSON.stringify(data));
location.href="/rider";
}else{
const {data,error}=await supabase.from("riders").select("*").eq("phone",phone).eq("password",pass).single();
if(error||!data)return alert("Wrong phone or password");
localStorage.setItem("kaiha_rider",JSON.stringify(data));
location.href="/rider";
}
};

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh",alignItems:"center",padding:"16px"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"360px",padding:"24px",borderRadius:"20px",border:"1px solid #D4B78F33",color:"#fff"}}>
<div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"center",marginBottom:"20px"}}>
<img src={LOGO} style={{height:"40px",width:"40px",borderRadius:"8px"}}/>
<div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"14px"}}>KAIHA RIDER</div><div style={{fontSize:"10px",color:"#888"}}>{mode==="login"?"LOGIN":"CREATE ACCOUNT"}</div></div>
</div>

{mode==="signup"&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{width:"100%",background:"#111",border:"1px solid #333",padding:"12px",borderRadius:"10px",color:"#fff",marginTop:"10px",outline:"none"}}/>}
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone - 03xx-xxxxxxx" style={{width:"100%",background:"#111",border:"1px solid #333",padding:"12px",borderRadius:"10px",color:"#fff",marginTop:"10px",outline:"none"}}/>
<input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" style={{width:"100%",background:"#111",border:"1px solid #333",padding:"12px",borderRadius:"10px",color:"#fff",marginTop:"10px",outline:"none"}}/>

<button onClick={handleLogin} style={{width:"100%",background:"#D4B78F",color:"#000",border:"none",padding:"13px",borderRadius:"999px",fontWeight:"800",marginTop:"18px",letterSpacing:"0.05em"}}>
{mode==="login"?"LOGIN":"SIGNUP"}
</button>

<div onClick={()=>setMode(mode==="login"?"signup":"login")} style={{textAlign:"center",marginTop:"14px",fontSize:"11px",color:"#888",cursor:"pointer"}}>
{mode==="login"?"New rider? Create account":"Already have account? Login"}
</div>

<div style={{textAlign:"center",marginTop:"20px",fontSize:"9px",color:"#444",letterSpacing:"0.2em"}}>KAIHA - SUKKUR 2026</div>
</div>
</div>
);
}
