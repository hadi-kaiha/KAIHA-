"use client";
import { useState, useEffect } from "react";

export default function RiderPage(){
  const [step, setStep] = useState("kyc");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [bikeNo, setBikeNo] = useState("");
  const [phone, setPhone] = useState("");
  const [cnicImg, setCnicImg] = useState("");
  const [bikeImg, setBikeImg] = useState("");
  const [loc, setLoc] = useState({lat:27.704,lng:68.845});

  useEffect(()=>{
    const s = localStorage.getItem("kaiha_rider");
    if(s){
      const d=JSON.parse(s);
      setName(d.name);
      setBikeNo(d.bikeNo);
      setPhone(d.phone);
      if(d.verified) setStep("orders");
      else setStep("pending");
    }
  },[]);

  const submitKYC = () => {
    if(name.length<3) return alert("Please enter full name");
    if(cnic.length!=13) return alert("CNIC must be 13 digits");
    if(bikeNo.length<3) return alert("Please enter bike number");
    if(phone.length<11) return alert("Please enter valid phone number");
    if(!cnicImg) return alert("CNIC photo is required");
    if(!bikeImg) return alert("Bike registration photo is required");

    localStorage.setItem("kaiha_rider", JSON.stringify({name,cnic,bikeNo,phone,verified:false}));
    setStep("pending");
    setTimeout(()=>{
      localStorage.setItem("kaiha_rider", JSON.stringify({name,cnic,bikeNo,phone,verified:true}));
    }, 3000);
  };

  const acceptOrder = () => {
    setStep("delivering");
    if(navigator.geolocation){
      navigator.geolocation.watchPosition((p)=>{
        const l={lat:p.coords.latitude, lng:p.coords.longitude};
        setLoc(l);
        localStorage.setItem("kaiha_live", JSON.stringify({riderName:name, bikeNo, phone, lat:l.lat, lng:l.lng}));
      });
    } else {
      localStorage.setItem("kaiha_live", JSON.stringify({riderName:name, bikeNo, phone, lat:27.704, lng:68.845}));
    }
  };

  if(step==="kyc"){
    return (
      <div className="bg-black text-white min-h-screen p-5">
        <h1 className="text-2xl font-black text-yellow-500">KAIHA RIDER - Join as Rider</h1>
        <p className="text-gray-400 text-sm mt-1">Rider Verification Required</p>
        <div className="bg-[#101828] p-4 rounded-2xl mt-6 space-y-3 border border-gray-800">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none border border-gray-800" />
          <input value={cnic} onChange={e=>setCnic(e.target.value.replace(/\D/g,'').slice(0,13))} placeholder="CNIC No - 13 digits" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none border border-gray-800" />
          <input value={bikeNo} onChange={e=>setBikeNo(e.target.value)} placeholder="Bike Number" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none border border-gray-800" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none border border-gray-800" />

          <div className="bg-[#1d2939] p-3 rounded-xl border border-gray-800">
            <p className="text-xs text-yellow-500 mb-2">CNIC Front / Back Photo (Required):</p>
            <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f){const r=new FileReader(); r.onload=()=>setCnicImg(r.result as string); r.readAsDataURL(f)}}} className="w-full text-sm text-gray-300" />
            {cnicImg && <img src={cnicImg} className="mt-2 w-full h-28 object-cover rounded-lg" />}
          </div>

          <div className="bg-[#1d2939] p-3 rounded-xl border border-gray-800">
            <p className="text-xs text-yellow-500 mb-2">Bike Registration Photo (Required):</p>
            <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f){const r=new FileReader(); r.onload=()=>setBikeImg(r.result as string); r.readAsDataURL(f)}}} className="w-full text-sm text-gray-300" />
            {bikeImg && <img src={bikeImg} className="mt-2 w-full h-28 object-cover rounded-lg" />}
          </div>

          <button onClick={submitKYC} className="w-full bg-[#00ff66] text-black p-4 rounded-xl font-black text-lg">Submit & Login</button>
          <p className="text-[11px] text-gray-500 text-center">Admin will verify your documents for approval</p>
        </div>
      </div>
    )
  }

  if(step==="pending"){
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold">Verification Pending</h1>
        <p className="text-gray-400 mt-2">Your documents are under review</p>
        <p className="text-xs text-gray-500 mt-2">CNIC: {cnic} | Bike: {bikeNo}</p>
        <button onClick={()=>{const d=JSON.parse(localStorage.getItem("kaiha_rider")||"{}"); if(d.verified) setStep("orders")}} className="mt-6 bg-white text-black px-6 py-3 rounded-full font-bold">Refresh Status</button>
      </div>
    )
  }

  if(step==="orders"){
    return (
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-xl font-bold">Welcome {name} - Verified Rider</h1>
        <div className="bg-[#101828] p-4 rounded-2xl mt-6 border border-gray-800">
          <h2 className="font-bold">New Order #1234</h2>
          <p className="text-sm text-gray-400 mt-1">Customer: Ali - Main Road, Sukkur</p>
          <p className="font-bold mt-2">Item: Premium Kurta - Rs.1999</p>
          <button onClick={acceptOrder} className="w-full bg-[#00ff66] text-black font-black p-4 rounded-xl mt-4">Accept & Deliver</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-xl font-bold text-green-400">Delivering - Live Location ON</h1>
      <p className="text-sm mt-2">Your location is visible to customer</p>
      <p className="text-xs font-mono mt-2">{loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}</p>
      <a href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`} target="_blank" className="block bg-blue-600 text-center p-3 rounded-xl mt-4 font-bold">Open in Google Maps</a>
      <a href={`tel:${phone}`} className="block bg-white text-black text-center p-3 rounded-xl mt-3 font-bold">Call Customer</a>
    </div>
  )
        }
