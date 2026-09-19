"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function SellerPage() {
  const [prod, setProd] = useState({ name: "", price: "", stock: "10" });
  const [mainCat, setMainCat] = useState("FASHION");
  const [subCat, setSubCat] = useState("MALE");
  const [colors, setColors] = useState("#000,#D4B78F");
  const [sizes, setSizes] = useState("M,L,XL");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [myProds, setMyProds] = useState<any[]>([]);

  const subOptions: any = {
    FASHION: ["MALE","FEMALE","BOY","GIRL","UNISEX"],
    BEAUTY: ["MAKEUP"],
    HOME: ["DECOR"]
  };

  useEffect(()=>{ fetchMine(); },[]);

  const fetchMine = async () => {
    const { data } = await supabase.from("products").select("*").order("id",{ascending:false}).limit(20);
    setMyProds(data||[]);
  };

  const handleImg = (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader(); r.onload = () => setImg(r.result as string); r.readAsDataURL(file);
  };

  const uploadProduct = async () => {
    if (!prod.name ||!prod.price) return alert("Name Price likho!");
    setLoading(true);
    try {
      const finalImg = img || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
      const { error } = await supabase.from("products").insert([{
        name: prod.name,
        price: Number(prod.price),
        image_url: finalImg,
        category: mainCat,
        subcategory: subCat,
        colors: colors,
        sizes: sizes,
        shop_name: "KAIHA",
        stock: Number(prod.stock) || 10,
        is_active: true
      }]);
      if (error) throw error;
      alert("✅ SUCCESS! "+prod.name+" add ho gaya - Home pe dekho!");
      setProd({ name: "", price: "", stock: "10" }); setImg("");
      fetchMine();
    } catch (e: any) { alert("❌ " + e.message); } finally { setLoading(false); }
  };

  const deleteProd = async (id: number) => {
    if(!confirm("Delete karna hai?")) return;
    await supabase.from("products").delete().eq("id",id);
    fetchMine();
    alert("Deleted!");
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "#0a0a0a", width: "100%", maxWidth: "390px", minHeight: "100vh", padding: "20px", color: "#fff", borderLeft: "1px solid #222", borderRight: "1px solid #222" }}>
        <h1 style={{ color: "#D4B78F", textAlign: "center", fontWeight: "900", letterSpacing: "2px" }}>KAIHA SELLER</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: "10px" }}>MAIN: FASHION / BEAUTY / HOME</p>

        <div style={{ marginTop: "20px" }}>
          <label style={{ fontSize: "11px", color: "#D4B78F" }}>Product Name</label>
          <input value={prod.name} onChange={e => setProd({...prod, name: e.target.value })} placeholder="Black tee" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }} />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Main Category</label>
            <select value={mainCat} onChange={e => {setMainCat(e.target.value); setSubCat(subOptions[e.target.value][0]);}} style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }}>
              <option>FASHION</option><option>BEAUTY</option><option>HOME</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Sub Category</label>
            <select value={subCat} onChange={e => setSubCat(e.target.value)} style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }}>
              {subOptions[mainCat].map((s:string)=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Price Rs</label>
            <input value={prod.price} onChange={e => setProd({...prod, price: e.target.value })} type="number" placeholder="200" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Stock Qty</label>
            <input value={prod.stock} onChange={e => setProd({...prod, stock: e.target.value })} type="number" placeholder="10" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Colors (,#,)</label>
            <input value={colors} onChange={e => setColors(e.target.value)} placeholder="#000,#fff,#D4B78F" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", fontSize:"11px" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: "11px", color: "#D4B78F" }}>Sizes (,) </label>
            <input value={sizes} onChange={e => setSizes(e.target.value)} placeholder="M,L,XL" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff", fontSize:"11px" }} />
          </div>
        </div>

        <div style={{ marginTop: "12px", padding: "12px", background: "#141414", border: "1px dashed #D4B78F66", borderRadius: "12px" }}>
          <label style={{ fontSize: "11px", color: "#D4B78F" }}>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImg} style={{ width: "100%", marginTop: "8px", color: "#fff", fontSize:"12px" }} />
          {img && <img src={img} style={{ width: "100%", height: "160px", objectFit: "cover", marginTop: "10px", borderRadius: "10px" }} />}
        </div>

        <button onClick={uploadProduct} disabled={loading} style={{ width: "100%", marginTop: "14px", padding: "14px", background: "#D4B78F", color: "#000", border: "none", borderRadius: "999px", fontWeight: "900", cursor: "pointer", opacity: loading?0.6:1 }}>
          {loading? "UPLOADING..." : `UPLOAD TO ${mainCat} > ${subCat}`}
        </button>

        <div style={{ marginTop: "25px", borderTop: "1px solid #222", paddingTop: "15px" }}>
          <b style={{ fontSize: "13px", color: "#D4B78F" }}>My Uploaded (Delete / Edit)</b>
          {myProds.map((p:any)=><div key={p.id} style={{ background: "#141414", border: "1px solid #222", borderRadius: "12px", padding: "10px", display: "flex", gap: "10px", marginTop: "10px" }}>
            <img src={p.image_url} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px" }}>{p.name} - Rs.{p.price}</div>
              <div style={{ fontSize: "9px", color: "#888" }}>{p.category} → {p.subcategory} | Stock:{p.stock} | {p.sizes}</div>
            </div>
            <button onClick={()=>deleteProd(p.id)} style={{ background: "#FF2222", color: "#fff", border: "none", borderRadius: "8px", padding: "6px 10px", fontSize: "10px", height: "30px" }}>DEL</button>
          </div>)}
        </div>

      </div>
    </div>
  );
    }
