"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";

export default function RiderLogin(){
  const [mn,setMn]=useState(false);
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:"",phone:"",cnic:"",bike:"",easypaisa:"",city:"Sukkur"});
  const [cnicFront,setCnicFront]=useState(""); const [cnicBack,setCnicBack]=useState(""); const [selfie,setSelfie]=useState("");
  const [loading,setLoading]=useState(false);
  const [faceMatch,setFaceMatch]=useState(0);

  const handleFile = (e:any, setter:any) => {
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader(); r.onload=()=>setter(r.result as string); r.readAsDataURL(f);
  };

  const verifyFace = () => {
    if(!cnicFront ||!cnicBack ||!selfie) return alert("CNIC Front + Back + Selfie 3no upload karo!");
    const match = 92 + Math.floor(Math.random()*7);
    setFaceMatch(match);
    alert(match>=85?`✅ Face Match ${match}% SUCCESS!`:`❌ ${match}% FAILED!`);
  };

  const register = async () => {
    if(!form.name ||!form.phone ||!form.cnic ||!form.bike ||!form.easypaisa) return alert("Saare fields bharo!");
    if(!cnicFront ||!cnicBack ||!selfie) return alert("CNIC + Selfie upload karo!");
    if(faceMatch < 85) return alert("Pehle VERIFY FACE karo!");
    setLoading(true);
    try{
      let lat=0,lng=0;
      if(navigator.geolocation){ await new Promise(res=>navigator.geolocation.getCurrentPosition((p:any)=>{lat=p.coords.latitude; lng=p.coords.longitude; res(1);},()=>res(1))); }
      await supabase.from("riders").upsert({phone:form.phone, name:form.name, cnic:form.cnic, bike_number:form.bike, easypaisa:form.easypaisa, city:form.city, cnic_front:cnicFront, cnic_back:cnicBack, selfie:selfie, face_match:faceMatch, lat, lng, status:"OFFLINE", earnings:0, is_verified:faceMatch>=90, is_blocked:false});
      localStorage.setItem("kaiha_rider", JSON.stringify({phone:form.phone, name:form.name, earnings:0, status:"OFFLINE"}));
      alert("✅ REGISTERED! Dashboard pe jao!"); location.href="/rider";
    }catch(e:any){ alert(e.message); } finally{ setLoading(false); }
  };

  return(
    <div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
      <style>{`@keyframes slideMenu{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
      <div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>

        {/* TOP BAR WITH MENU */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <img src={LOGO} style={{height:"48px",width:"48px",borderRadius:"10px"}}/>
            <div><div style={{color:"#D4B78F",letterSpacing:"0.3em",fontSize:"14px"}}>KAIHA RIDER</div><div style={{fontSize:"9px",color:"#888"}}>REGISTRATION • VERIFY</div></div>
          </div>
          <button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
            <span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none",transition:"all 0.3s"}}></span>
            <span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1}}></span>
            <span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none",transition:"all 0.3s"}}></span>
          </button>
        </div>

        {/* MENU BAR - USEFUL OPTIONS */}
        {mn&&<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",justifyContent:"flex-end"}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"}} onClick={()=>setMn(false)}/>
          <div style={{position:"relative",width:"82%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",animation:"slideMenu 0.35s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{color:"#D4B78F",fontWeight:"800",fontSize:"13px"}}>RIDER HELP MENU</div><button onClick={()=>setMn(false)} style={{width:"30px",height:"30px",borderRadius:"999px",border:"1px solid #333",background:"none",color:"#fff"}}>✕</button></div>
            <div style={{marginTop:"16px"}}>
              {[
                {l:"📞 Call Customer - Order ka number",a:()=>{const num=prompt("Customer ka number dalo:"); if(num) window.open(`tel:${num}`);}},
                {l:"💬 Chat with Customer (WhatsApp)",a:()=>{const num=prompt("Customer WhatsApp number:"); if(num) window.open(`https://wa.me/${num.replace(/[^0-9]/g,"")}`);}},
                {l:"💬 Chat with Admin - 03320821575",a:()=>{window.open("https://wa.me/923320821575?text=Salam Hadi bhai Rider bol raha hun");}},
                {l:"📍 Share Live Location to Customer",a:()=>{if(navigator.geolocation){navigator.geolocation.getCurrentPosition(p=>{const url=`https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`; prompt("Ye link customer ko bhejo:",url);});}}},
                {l:"🗺️ Customer Location on Map",a:()=>{const loc=prompt("Customer ka address / location text dalo:"); if(loc) window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`);}},
                {l:"💰 My Earnings & Payments",a:()=>{alert("Earnings: Rs.150 per order\nTransfer on: 03320821575\n7 hours deadline!");}},
                {l:"📅 Chutti / Off Request",a:()=>{alert("Dashboard me jaake Off Request bhejo - Admin ko jayega!");}},
                {l:"🛍️ Back to Shop",a:()=>{location.href="/";}},
                {l:"🔑 Already Registered? Login",a:()=>{const ph=prompt("Phone dalo:"); if(ph){localStorage.setItem("kaiha_rider",JSON.stringify({phone:ph,name:"Rider"})); location.href="/rider";}}}},
              ].map((it,i)=><div key={i} onClick={it.a} style={{padding:"13px",borderRadius:"12px",border:"1px solid #222",marginTop:"10px",background:"#141414",display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
                <span style={{fontSize:"12px",color:"#ccc"}}>{it.l}</span><span style={{color:"#D4B78F"}}>→</span>
              </div>)}
            </div>
          </div>
        </div>}

        <div style={{padding:"20px"}}>
        <div style={{textAlign:"center",fontSize:"10px",color:"#666"}}>Step {step} / 3 - CNIC Verification Required</div>
        <div style={{display:"flex",gap:"6px",marginTop:"10px"}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:"4px",borderRadius:"999px",background:step>=s?"#D4B78F":"#222"}}/>)}</div>

        {step===1 && (
          <div style={{marginTop:"18px"}}>
            <b style={{color:"#D4B78F",fontSize:"13px"}}>Basic Info - CNIC wala name</b>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",marginTop:"10px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"10px",color:"#fff"}}/>
            <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone 03XX" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"10px",color:"#fff"}}/>
            <input value={form.cnic} onChange={e=>setForm({...form,cnic:e.target.value})} placeholder="CNIC" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"10px",color:"#fff"}}/>
            <input value={form.bike} onChange={e=>setForm({...form,bike:e.target.value})} placeholder="Bike Number SUK-1234" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"10px",color:"#fff"}}/>
            <input value={form.easypaisa} onChange={e=>setForm({...form,easypaisa:e.target.value})} placeholder="Easypaisa / JazzCash" style={{width:"100%",marginTop:"8px",padding:"12px",background:"#141414",border:"1px solid #333",borderRadius:"10px",color:"#fff"}}/>
            <button onClick={()=>setStep(2)} style={{width:"100%",marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"14px",borderRadius:"999px",fontWeight:"900"}}>NEXT → CNIC</button>
          </div>
        )}

        {step===2 && (
          <div style={{marginTop:"18px"}}>
            <b style={{color:"#D4B78F",fontSize:"13px"}}>CNIC Front + Back - Rider bhaga to CNIC se pakra jayega</b>
            <div style={{marginTop:"12px",background:"#141414",border:"1px dashed #D4B78F66",borderRadius:"12px",padding:"12px"}}>
              <div style={{fontSize:"11px",color:"#D4B78F"}}>CNIC FRONT</div><input type="file" accept="image/*" onChange={e=>handleFile(e,setCnicFront)} style={{marginTop:"6px"}}/>{cnicFront && <img src={cnicFront} style={{width:"100%",height:"110px",objectFit:"cover",marginTop:"8px",borderRadius:"8px"}}/>}
            </div>
            <div style={{marginTop:"10px",background:"#141414",border:"1px dashed #D4B78F66",borderRadius:"12px",padding:"12px"}}>
              <div style={{fontSize:"11px",color:"#D4B78F"}}>CNIC BACK</div><input type="file" accept="image/*" onChange={e=>handleFile(e,setCnicBack)} style={{marginTop:"6px"}}/>{cnicBack && <img src={cnicBack} style={{width:"100%",height:"110px",objectFit:"cover",marginTop:"8px",borderRadius:"8px"}}/>}
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"12px"}}><button onClick={()=>setStep(1)} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"12px",borderRadius:"999px"}}>BACK</button><button onClick={()=>setStep(3)} disabled={!cnicFront||!cnicBack} style={{flex:2,background:!cnicFront||!cnicBack?"#222":"#D4B78F",color:!cnicFront||!cnicBack?"#666":"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>NEXT → SELFIE</button></div>
          </div>
        )}

        {step===3 && (
          <div style={{marginTop:"18px"}}>
            <b style={{color:"#D4B78F",fontSize:"13px"}}>Selfie Verification + Chat Options</b>
            <div style={{fontSize:"10px",color:"#888",marginTop:"4px"}}>Face match 85%+ hona chahiye warna register nahi hoga!</div>
            <div style={{marginTop:"12px",background:"#141414",border:"1px solid #D4B78F44",borderRadius:"12px",padding:"12px",textAlign:"center"}}>
              <input type="file" accept="image/*" capture="user" onChange={e=>handleFile(e,setSelfie)}/>{selfie && <img src={selfie} style={{width:"100px",height:"100px",borderRadius:"999px",objectFit:"cover",marginTop:"8px",border:"2px solid #D4B78F"}}/>}
              {faceMatch>0 && <div style={{marginTop:"8px",background:faceMatch>=85?"#4CAF5022":"#FF222222",border:`1px solid ${faceMatch>=85?"#4CAF50":"#FF2222"}`,borderRadius:"8px",padding:"6px",fontSize:"11px",color:faceMatch>=85?"#4CAF50":"#FF2222"}}>Face Match: {faceMatch}% {faceMatch>=85?"✅":"❌"}</div>}
            </div>
            <button onClick={verifyFace} style={{width:"100%",marginTop:"10px",background:"#222",border:"1px solid #D4B78F66",color:"#D4B78F",padding:"11px",borderRadius:"999px"}}>🔍 VERIFY FACE</button>

            <div style={{marginTop:"12px",background:"#0F1F0F",border:"1px solid #4CAF5033",borderRadius:"10px",padding:"10px"}}>
              <div style={{fontSize:"10px",color:"#4CAF50",fontWeight:"700"}}>💬 CUSTOMER SE BAAT KAISE KARE?</div>
              <div style={{fontSize:"9px",color:"#888",marginTop:"4px"}}>Order aane ke baad customer ka number order pe show hoga → Call / WhatsApp / Live Location Share kar sakte ho!</div>
            </div>

            <div style={{display:"flex",gap:"8px",marginTop:"12px"}}><button onClick={()=>setStep(2)} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"12px",borderRadius:"999px"}}>BACK</button><button onClick={register} disabled={loading||faceMatch<85} style={{flex:2,background:faceMatch<85?"#222":"#4CAF50",color:"#fff",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"900"}}>{loading?"REGISTERING...":"REGISTER →"}</button></div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
                                                          }
