"use client";
import { useState, useEffect } from "react";

export default function RiderPage(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [bikeNo, setBikeNo] = useState("");
  const [phone, setPhone] = useState("");
  const [cnicImg, setCnicImg] = useState("");
  const [bikeImg, setBikeImg] = useState("");
  const [status, setStatus] = useState("idle"); // idle, delivering
  const [location, setLocation] = useState({lat:0,lng:0});

  useEffect(()=>{
    const saved = localStorage.getItem("kaiha_rider");
    if(saved){
      const r = JSON.parse(saved);
      setName(r.name); setIsLoggedIn(true);
    }
  },[]);

  const handleFile = (e:any, type:string) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      if(type==="cnic") setCnicImg(reader.result as string);
      else setBikeImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleLogin = () => {
    if(name.length < 3) return alert("Poora naam likho");
    if(cnic.length!== 13) return alert("CNIC 13 digits likho - bina dash ke, jaise 4520331234567");
    if(bikeNo.length < 3) return alert("Bike number likho - jaise KHI-1234");
    if(!cnicImg) return alert("CNIC ki photo upload karo");
    if(!bikeImg) return alert("Bike kagaz ki photo upload karo");
    if(phone.length < 11) return alert("Phone number poora likho");

    const riderData = {name,cnic,bikeNo,phone,cnicImg,bikeImg};
    localStorage.setItem("kaiha_rider", JSON.stringify(riderData));
    setIsLoggedIn(true);
    alert("Rider Register Ho Gaya! Admin approval ke baad orders milenge.");
  }

  const startDelivery = () => {
    setStatus("delivering");
    // Live location start
    if(navigator.geolocation){
      navigator.geolocation.watchPosition((pos)=>{
        const loc = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        setLocation(loc);
        localStorage.setItem("kaiha_rider_location", JSON.stringify({name, bikeNo, phone,...loc, time: Date.now()}));
      });
    }
  }

  // LOGIN FORM - FOODPANDA STYLE
  if(!isLoggedIn){
    return (
      <div className="bg-black text-white min-h-screen p-5">
        <h1 className="text-2xl font-black text-yellow-500">KAIHA RIDER - Join as Rider</h1>
        <p className="text-gray-400 text-sm mt-1">Foodpanda jaisa verification</p>

        <div className="bg-[#101828] p-4 rounded-2xl mt-6 space-y-3 border border-gray-800">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name - Jaise Rehman Ali" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none" />
          <input value={cnic} onChange={e=>setCnic(e.target.value)} placeholder="CNIC No - 13 digits (45203...)" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none" type="number" />
          <input value={bikeNo} onChange={e=>setBikeNo(e.target.value)} placeholder="Bike Number - KHI-1234" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone - 03xx-xxxxxxx" className="w-full bg-[#1d2939] p-4 rounded-xl outline-none" />

          <div className="bg-[#1d2939] p-3 rounded-xl">
            <p className="text-xs text-yellow-500 mb-2">CNIC Front/Back Photo (Zaroori):</p>
            <input type="file" accept="image/*" onChange={e=>handleFile(e,"cnic")} className="w-full text-sm" />
            {cnicImg && <img src={cnicImg} className="w-full h-32 object-cover rounded-lg mt-2" />}
          </div>

          <div className="bg-[#1d2939] p-3 rounded-xl">
            <p className="text-xs text-yellow-500 mb-2">Bike Papers / Registration Photo (Zaroori):</p>
            <input type="file" accept="image/*" onChange={e=>handleFile(e,"bike")} className="w-full text-sm" />
            {bikeImg && <img src={bikeImg} className="w-full h-32 object-cover rounded-lg mt-2" />}
          </div>

          <button onClick={handleLogin} className="w-full bg-green-500 text-black p-4 rounded-xl font-black text-lg">Submit & Login</button>
          <p className="text-[10px] text-gray-500 text-center">Admin tumhara CNIC & Bike papers check karke approve karega</p>
        </div>
      </div>
    )
  }

  // DASHBOARD AFTER LOGIN
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome {name} rider</h1>
      <p className="text-xs text-gray-400 mt-1">Bike: {bikeNo} | CNIC Verified ✅</p>

      {status==="idle"? (
        <div className="bg-[#101828] p-4 rounded-2xl mt-6 border border-gray-800">
          <h2 className="text-xl font-black">New Order #1234</h2>
          <p className="text-gray-400 mt-2">Customer: Ali - Sukkur</p>
          <p className="text-gray-400">Address: Main Road, Sukkur</p>
          <p className="font-bold mt-2">Item: Premium Kurta - Rs.1999</p>
          <button onClick={startDelivery} className="w-full bg-[#00ff66] text-black p-4 rounded-xl font-black mt-4 text-lg">Accept & Deliver</button>
        </div>
      ) : (
        <div className="bg-[#101828] p-4 rounded-2xl mt-6 border border-green-500">
          <h2 className="text-green-500 font-black">Delivering... 🏍️</h2>
          <p className="text-sm mt-2">Live Location Sharing ON</p>
          <p className="text-xs text-gray-400 mt-1">Lat: {location.lat.toFixed(5)} Lng: {location.lng.toFixed(5)}</p>
          <div className="w-full h-32 bg-gray-800 rounded-xl mt-3 flex items-center justify-center">
            <p className="text-xs">🗺️ Map - Rider yahan hai</p>
          </div>
          <p className="text-xs text-yellow-500 mt-3">Customer ab tumhe track kar raha hai + call kar sakta hai</p>
          <button onClick={()=>setStatus("idle")} className="w-full bg-yellow-500 text-black p-3 rounded-xl font-bold mt-4">Delivered ✅</button>
        </div>
      )}

      <button onClick={()=>{localStorage.removeItem("kaiha_rider"); setIsLoggedIn(false);}} className="w-full bg-gray-800 p-3 rounded-xl mt-6 text-sm">Logout</button>
    </div>
  )
      }
