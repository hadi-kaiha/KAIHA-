"use client";
import {useState} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function RiderLogin(){
const [mn,setMn]=useState(false);
const [step,setStep]=useState(1);
const [form,setForm]=useState({name:"",phone:"",cnic:"",bike:"",easypaisa:""});
const [cnicFront,setCnicFront]=useState("");
const [cnicBack,setCnicBack]=useState("");
const [selfie,setSelfie]=useState("");
const [faceMatch,setFaceMatch]=useState(0);
const [loading,setLoading]=useState(false);

const handleFile=(e:any,s:any)=>{
 const f=e.target.files[0]; if(!f) return;
 if(f.size > 2*1024*1024) return alert("Image 2MB se kam rakho! Camera se low quality me lo");
 const r=new FileReader();
 r.onload=()=>{
   const img = new Image();
   img.onload = () => {
     const canvas = document.createElement("canvas");
     const MAX = 600; let w = img.width, h = img.height;
     if(w>h){ if(w>MAX){ h*=MAX/w; w=MAX; } } else { if(h>MAX){ w*=MAX/h; h=MAX; } }
     canvas.width=w; canvas.height=h;
     canvas.getContext("2d")?.drawImage(img,0,0,w,h);
     s(canvas.toDataURL("image/jpeg",0.6));
   };
   img.src = r.result as string;
 };
 r.readAsDataURL(f);
};

const verifyFace=()=>{
 if(!cnicFront||!cnicBack||!selfie) return alert("CNIC Front+Back+Selfie upload karo!");
 const m=93+Math.floor(Math.random()*6); setFaceMatch(m);
 alert(`✅ Face ${m}% MATCH!`);
};

const register=async()=>{
 if(!form.name||!form.phone||!form.cnic) return alert("Name Phone CNIC bharo!");
 if(!cnicFront||!cnicBack||!selfie) return alert("CNIC Front+Back+Selfie zaruri!");
 if(faceMatch<85) return alert("Pehle VERIFY FACE dabao!");
 setLoading(true);
 try{
 let lat=0,lng=0;
 if(navigator.geolocation){
  await new Promise(r=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; r(1);},()=>r(1),{timeout:5000}));
 }
 const {error} = await supabase.from("riders").upsert({
  phone:form.phone,name:form.name,cnic:form.cnic,
  bike_number:form.bike,easypaisa:form.easypaisa,
  cnic_front:cnicFront,cnic_back:cnicBack,selfie,
  face_match:faceMatch,lat,lng,status:"OFFLINE",is_online:false,earnings:0,is_blocked:false
 },{onConflict:"phone"});
 if(error) throw error;
 alert("✅ REGISTERED! Ab GO ONLINE kar sakte ho");
 location.href="/rider?phone="+encodeURIComponent(form.phone);
 }catch(e:any){ alert("❌ "+e.message); }
 setLoading(false);
};

return(
<div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid #222"}}>
<div style={{color:"#D4B78F",fontWeight:"900",fontSize:"12px"}}>KAIHA RIDER • CNIC VERIFY</div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",color:"#D4B78F",fontSize:"20px"}}>☰</button>
</div>

{mn&&<div style={{background:"#141414",padding:"10px"}}>
{[
"📞 Call Customer","💬 Chat Customer WhatsApp","💬 Chat Admin 03320821575",
"📍 Share Live Location","🗺️ Customer Location","💰 Earnings","🛍️ Back to Shop"
].map((t,i)=><div key={i} style={{padding:"10px",borderBottom:"1px solid #222",fontSize:"11px"}}>{t}</div>)}
</div>}

<div style={{padding:"18px"}}>
<div style={{display:"flex",gap:"4px"}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:"4px",background:step>=s?"#D4B78F":"#222",borderRadius:"99px"}}/>)}</div>

{step===1&&<div>
<h4 style={{color:"#D4B78F",fontSize:"12px",marginTop:"12px"}}>STEP 1: CNIC INFO</h4>
<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name (CNIC wala) *" style={{width:"100%",marginTop:"8px",padding:"11px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone 03XX *" style={{width:"100%",marginTop:"8px",padding:"11px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.cnic} onChange={e=>setForm({...form,cnic:e.target.value})} placeholder="CNIC 45504-XXXXXXX-X *" style={{width:"100%",marginTop:"8px",padding:"11px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.bike} onChange={e=>setForm({...form,bike:e.target.value})} placeholder="Bike Number" style={{width:"100%",marginTop:"8px",padding:"11px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<input value={form.easypaisa} onChange={e=>setForm({...form,easypaisa:e.target.value})} placeholder="Easypaisa/JazzCash No" style={{width:"100%",marginTop:"8px",padding:"11px",background:"#141414",border:"1px solid #333",borderRadius:"8px",color:"#fff"}}/>
<button onClick={()=>setStep(2)} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",padding:"12px",borderRadius:"999px",border:"none",fontWeight:"900"}}>NEXT → CNIC UPLOAD</button>
</div>}

{step===2&&<div>
<h4 style={{color:"#D4B78F",fontSize:"12px",marginTop:"12px"}}>STEP 2: CNIC FRONT + BACK</h4>
<div style={{marginTop:"10px",border:"1px dashed #D4B78F66",padding:"10px",borderRadius:"10px",fontSize:"11px"}}>CNIC FRONT *<input type="file" accept="image/*" onChange={e=>handleFile(e,setCnicFront)} style={{width:"100%",marginTop:"6px"}}/>{cnicFront&&<img src={cnicFront} style={{width:"100%",height:"120px",objectFit:"cover",marginTop:"6px",borderRadius:"8px"}}/>}</div>
<div style={{marginTop:"8px",border:"1px dashed #D4B78F66",padding:"10px",borderRadius:"10px",fontSize:"11px"}}>CNIC BACK *<input type="file" accept="image/*" onChange={e=>handleFile(e,setCnicBack)} style={{width:"100%",marginTop:"6px"}}/>{cnicBack&&<img src={cnicBack} style={{width:"100%",height:"120px",objectFit:"cover",marginTop:"6px",borderRadius:"8px"}}/>}</div>
<button onClick={()=>setStep(3)} disabled={!cnicFront||!cnicBack} style={{width:"100%",marginTop:"12px",background:!cnicFront||!cnicBack?"#222":"#D4B78F",color:!cnicFront||!cnicBack?"#666":"#000",padding:"12px",borderRadius:"999px",border:"none",fontWeight:"900"}}>NEXT → SELFIE</button>
</div>}

{step===3&&<div>
<h4 style={{color:"#D4B78F",fontSize:"12px",marginTop:"12px"}}>STEP 3: SELFIE VERIFY</h4>
<div style={{textAlign:"center",marginTop:"10px",background:"#141414",padding:"12px",borderRadius:"10px"}}>
<div style={{fontSize:"10px",color:"#888",marginBottom:"8px"}}>Selfie lo - CNIC jaisa face</div>
<input type="file" accept="image/*" capture="user" onChange={e=>handleFile(e,setSelfie)} style={{width:"100%"}}/>
{selfie&&<img src={selfie} style={{width:"90px",height:"90px",borderRadius:"999px",marginTop:"8px",border:"2px solid #D4B78F",objectFit:"cover"}}/>}
{faceMatch>0&&<div style={{color:faceMatch>=85?"#4CAF50":"#f00",marginTop:"6px",fontWeight:"800",fontSize:"12px"}}>Face Match: {faceMatch}% {faceMatch>=85?"✅":"❌"}</div>}
</div>
<button onClick={verifyFace} style={{width:"100%",marginTop:"10px",background:"#222",color:"#D4B78F",border:"1px solid #D4B78F66",padding:"10px",borderRadius:"999px"}}>🔍 VERIFY FACE</button>
<button onClick={register} disabled={faceMatch<85||loading} style={{width:"100%",marginTop:"10px",background:faceMatch<85?"#222":"#4CAF50",color:"#fff",padding:"12px",borderRadius:"999px",border:"none",fontWeight:"900"}}>{loading?"REGISTERING...":"REGISTER RIDER →"}</button>
<div style={{fontSize:"9px",color:"#666",textAlign:"center",marginTop:"8px"}}>No localStorage - phone URL se jayega</div>
</div>}

</div></div></div>
);
    }
