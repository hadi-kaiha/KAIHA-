"use client";
import { useState } from "react";

export default function SellerPage(){
  const [shopName, setShopName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [section, setSection] = useState("Fashion");

  const handleLogin = () => {
    if(shopName.trim().length < 3){
      alert("Bhai poora shop ka naam likho - kam se kam 3 letters! Jaise HADI FASHION");
      return;
    }
    setIsLoggedIn(true);
  }

  const handleFile = (e:any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }

  const addProduct = () => {
    if(!name ||!price ||!image) return alert("Saare boxes bharo!");
    const products = JSON.parse(localStorage.getItem("kaiha_products")||"[]");
    products.push({ id: Date.now(), name, price, img: image, shop: shopName, section });
    localStorage.setItem("kaiha_products", JSON.stringify(products));
    alert(`Product Add Ho Gaya! Shop: ${shopName}`);
    setName(""); setPrice(""); setImage(""); setPreview("");
  }

  // LOGIN SCREEN
  if(!isLoggedIn){
    return (
      <div className="bg-black text-white min-h-screen p-6 flex flex-col justify-center">
        <h1 className="text-3xl font-black text-yellow-500">KAIHA SELLER</h1>
        <p className="text-gray-400 mt-2">Apna Shop ka poora naam likho</p>
        <input
          value={shopName}
          onChange={e=>setShopName(e.target.value)}
          placeholder="Shop Name - Jaise HADI FASHION, KAIHA Official"
          className="w-full bg-gray-800 p-4 rounded-xl mt-6 border border-gray-700 outline-none text-white"
        />
        <p className="text-xs text-gray-500 mt-2">* Kam se kam 3 letters zaroor likho</p>
        <button onClick={handleLogin} className="w-full bg-yellow-500 text-black p-4 rounded-xl font-black mt-4 text-lg">Continue to Dashboard →</button>
      </div>
    )
  }

  // PRODUCT SCREEN
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Add Product</h1>
        <button onClick={()=>setIsLoggedIn(false)} className="text-xs bg-gray-800 px-3 py-1 rounded">Logout</button>
      </div>
      <p className="text-sm mt-1"><span className="text-gray-400">Shop:</span> <span className="text-yellow-500 font-bold">{shopName}</span> | <span className="text-gray-400">Section:</span> <span className="text-white">{section}</span></p>

      <div className="bg-[#101828] p-4 rounded-2xl mt-6 space-y-3 border border-gray-800">
        <div className="flex gap-2">
          {["Fashion","Beauty","Home"].map(s=>(
            <button key={s} onClick={()=>setSection(s)} className={`px-4 py-2 rounded-full text-sm font-bold ${section===s?'bg-white text-black':'bg-gray-800 text-gray-400'}`}>{s}</button>
          ))}
        </div>

        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" className="w-full bg-[#1d2939] p-4 rounded-xl border border-gray-800 outline-none" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price Rs." type="number" className="w-full bg-[#1d2939] p-4 rounded-xl border border-gray-800 outline-none" />

        <div className="w-full bg-[#1d2939] p-3 rounded-xl border border-gray-800">
          <p className="text-xs text-gray-400 mb-2">Gallery se photo:</p>
          <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm text-gray-300" />
        </div>

        {preview && <img src={preview} className="w-full h-64 object-cover rounded-xl" />}

        {!preview && (
          <input value={image} onChange={e=>{setImage(e.target.value); setPreview(e.target.value)}} placeholder="Ya Image URL paste karo" className="w-full bg-[#1d2939] p-4 rounded-xl border border-gray-800 outline-none" />
        )}

        <button onClick={addProduct} className="w-full bg-[#00ff66] text-black font-black p-4 rounded-xl text-lg flex items-center justify-center gap-2">↑ Add Product</button>
      </div>
    </div>
  )
        }
