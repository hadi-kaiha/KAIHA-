"use client";
import {useState} from "react";
export default function Login(){
const [phone,setPhone]=useState(""); const [name,setName]=useState(""); const [mode,setMode]=useState("signup");
const go=()=>{
 if(!name || !phone){alert("Name aur Phone likho"); return;}
 const rider={id:phone, name, phone, earnings:0, status:"OFFLINE"};
 localStorage.setItem("kaiha_rider", JSON.stringify(rider));
 location.href="/rider";
};
return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<div style={{background:"#0a0a0a",width:360,padding:24,borderRadius:20,border:"1px solid #D4B78F33",textAlign:"center",color:"#fff"}}>
<div style={{color:"#D4B78F",letterSpacing:".3em",fontSize:12,fontWeight:800}}>KAIHA RIDER</div>
<div style={{fontSize:10,color:"#666",marginBottom:16}}>{mode==="signup"?"CREATE ACCOUNT":"LOGIN"}</div>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{width:"100%",background:"#111",border:"1px solid #333",padding:12,borderRadius:10,color:"#fff",marginBottom:10}}/>
<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone 03xx" style={{width:"100%",background:"#111",border:"1px solid #333",padding:12,borderRadius:10,color:"#fff"}}/>
<button onClick={go} style={{width:"100%",background:"#D4B78F",color:"#000",padding:13,borderRadius:999,marginTop:14,fontWeight:800,border:"none"}}>{mode==="signup"?"SIGNUP":"LOGIN"}</button>
<div onClick={()=>setMode(mode==="signup"?"login":"signup")} style={{fontSize:11,color:"#888",marginTop:12,cursor:"pointer"}}>{mode==="signup"?"Already have account? Login":"New? Create Account"}</div>
</div>
</div>
);
             }
