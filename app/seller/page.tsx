"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function SellerPage() {
  const [prod, setProd] = useState({ name: "Black tee", price: "200", stock: "10" });
  const [shopCat, setShopCat] = useState("T-Shirts");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImg = (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader(); r.onload = () => setImg(r.result as string); r.readAsDataURL(file);
  };

  const uploadProduct = async () => {
    if (!prod.name ||!prod.price) return alert("Name Price likho!");
    setLoading(true);
    try {
      const finalImg = img || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
      const { data, error } = await supabase.from("products").insert([{
        name: prod.name,
        price: Number(prod.price),
        image_url: finalImg,
        category: shopCat,
        shop_name: "KAIHA",
        stock: Number(prod.stock) || 10,
        is_active: true
      }]).select();
      if (error) throw error;
      alert("✅ SUCCESS! ID: " + data[0].id + " - Ho gaya Hadi bhai!");
      setProd({ name: "", price: "", stock: "10" }); setImg("");
    } catch (e: any) { alert("❌ " + e.message); } finally { setLoading(false); }
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "#0a0a0a", width: "100%", maxWidth: "390px", minHeight: "100vh", padding: "20px", color: "#fff", borderLeft: "1px solid #222", borderRight: "1px solid #222" }}>
        <h1 style={{ color: "#D4B78F", textAlign: "center", fontWeight: "900", letterSpacing: "2px", marginTop: "10px" }}>KAIHA SELLER</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: "12px", marginTop: "4px" }}>UPLOAD TO FASHION</p>

        <div style={{ marginTop: "25px" }}>
          <label style={{ fontSize: "12px", color: "#D4B78F" }}>Product Name</label>
          <input value={prod.name} onChange={e => setProd({...prod, name: e.target.value })} placeholder="Black tee" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", outline: "none" }} />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#D4B78F" }}>Price (Rs)</label>
            <input value={prod.price} onChange={e => setProd({...prod, price: e.target.value })} placeholder="200" type="number" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", outline: "none" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "12px", color: "#D4B78F" }}>Stock</label>
            <input value={prod.stock} onChange={e => setProd({...prod, stock: e.target.value })} placeholder="10" type="number" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", outline: "none" }} />
          </div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <label style={{ fontSize: "12px", color: "#D4B78F" }}>Category</label>
          <select value={shopCat} onChange={e => setShopCat(e.target.value)} style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", outline: "none" }}>
            <option>T-Shirts</option><option>Hoodies</option><option>Jeans</option><option>Shirts</option><option>Accessories</option>
          </select>
        </div>

        <div style={{ marginTop: "14px", padding: "12px", background: "#141414", border: "1px dashed #D4B78F66", borderRadius: "12px" }}>
          <label style={{ fontSize: "12px", color: "#D4B78F" }}>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImg} style={{ width: "100%", marginTop: "8px", color: "#fff" }} />
          {img && <img src={img} style={{ width: "100%", height: "180px", objectFit: "cover", marginTop: "10px", borderRadius: "10px" }} />}
        </div>

        <button onClick={uploadProduct} disabled={loading} style={{ width: "100%", marginTop: "18px", padding: "14px", background: "#D4B78F", color: "#000", border: "none", borderRadius: "999px", fontWeight: "900", letterSpacing: "1px", cursor: "pointer", opacity: loading? 0.6 : 1 }}>
          {loading? "UPLOADING..." : "UPLOAD TO FASHION"}
        </button>

        <p style={{ textAlign: "center", color: "#444", fontSize: "10px", marginTop: "14px" }}>kaiha.vercel.app/sell • ID: 1 SUCCESS ✅</p>
      </div>
    </div>
  );
                                                  }
