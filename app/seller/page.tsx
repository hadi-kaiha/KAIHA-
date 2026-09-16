"use client";
import { useState } from "react";

export default function SellerPage(){
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

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
    if(!name ||!price ||!image) return alert("Sab fill karo!");
    const products = JSON.parse(localStorage.getItem("kaiha_products")||"[]");
    products.push({ id: Date.now(), name, price, img: image, shop: "H SHOP" });
    localStorage.setItem("kaiha_products", JSON.stringify(products));
    alert("Product Add Ho Gaya! Ab customer page pe dekho");
    setName(""); setPrice(""); setImage(""); setPreview("");
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-black">Add Product - KAIHA Seller</h1>
      <p className="text-gray-400 text-sm mt-1">Shop: H | Gallery se photo select karo</p>

      <div className="bg-gray-900 p-4 rounded-xl mt-6 space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name - jaise Premium Kurta" className="w-full bg-gray-800 p-3 rounded border border-gray-700 outline-none" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price Rs. - jaise 1999" type="number" className="w-full bg-gray-800 p-3 rounded border border-gray-700 outline-none" />

        <div className="w-full bg-gray-800 p-3 rounded border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Image Select Karo (Gallery):</p>
          <input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm" />
        </div>

        {preview && <img src={preview} className="w-full h-64 object-cover rounded-lg mt-2" />}

        <div className="text-gray-500 text-xs text-center">OR</div>

        <input value={image.startsWith("data:")?"":image} onChange={e=>{setImage(e.target.value); setPreview(e.target.value)}} placeholder="Image URL paste karo (agar link hai to)" className="w-full bg-gray-800 p-3 rounded border border-gray-700 outline-none" />

        <button onClick={addProduct} className="w-full bg-green-500 text-black font-black p-4 rounded-lg text-lg">+ Add Product</button>
      </div>
    </div>
  )
}
