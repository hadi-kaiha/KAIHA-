"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

export default function SellerPage() {
  const [prod, setProd] = useState({ name: "", price: "", stock: "10" });
  const [mainCat, setMainCat] = useState("FASHION");
  const [subCat, setSubCat] = useState("MALE");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [myProds, setMyProds] = useState<any[]>([]);
  const [sellerOrders, setSellerOrders] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["#000000"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["M","L","XL"]);
  const [shopName, setShopName] = useState("");

  const subOptions: any = {
    FASHION: ["MALE","FEMALE","BOY","GIRL","UNISEX"],
    BEAUTY: ["MAKEUP"],
    HOME: ["DECOR"]
  };
  const colorOptions = [
    {name:"Black", hex:"#000000"},{name:"White", hex:"#FFFFFF"},
    {name:"Beige", hex:"#D4B78F"},{name:"Red", hex:"#FF0000"},
    {name:"Blue", hex:"#0066FF"},{name:"Green", hex:"#00AA00"},
    {name:"Yellow", hex:"#FFD700"},{name:"Brown", hex:"#8B4513"},
    {name:"Grey", hex:"#808080"},{name:"Pink", hex:"#FF69B4"},
    {name:"Navy", hex:"#000080"},{name:"Maroon", hex:"#800000"},
  ];
  const sizeOptions = ["XS","S","M","L","XL","XXL","28","30","32","34","36","Free Size"];

  useEffect(()=>{
    // FIX: URL se shop lo, warna prompt
    const params = new URLSearchParams(window.location.search);
    let s = params.get("shop") || "";
    if(!s) s = window.prompt("Shop Name likho: ex Hadi Store") || "KAIHA";
    s = s.trim();
    setShopName(s);
    fetchMine(s); fetchSellerOrders(s);
    const iv=setInterval(()=>fetchSellerOrders(s),15000);
    return()=>clearInterval(iv);
  },[]);

  const fetchMine = async (shop:string) => {
    if(!shop) return;
    const { data } = await supabase.from("products").select("*").eq("shop_name", shop).order("id",{ascending:false}).limit(20);
    setMyProds(data||[]);
  };

  const fetchSellerOrders = async (shop:string) => {
    if(!shop) return;
    const {data:notes} = await supabase.from("seller_notifications").select("*").eq("shop_name", shop).order("created_at",{ascending:false}).limit(20);
    const {data:ords} = await supabase.from("orders").select("*").eq("status","PENDING").eq("seller_name", shop).order("created_at",{ascending:false}).limit(20);
    let all:any[] = [];
    if(notes && notes.length>0) all = notes;
    else if(ords){
      all = ords.map((o:any)=>({
        id:o.id, order_id:o.id,
        product_name: typeof o.items === 'string'? o.items : o.product_name||"Order",
        buyer_name:o.buyer_name, buyer_phone:o.buyer_phone, buyer_location:o.buyer_location||o.location_text,
        size:"-", color:"-", qty:1,
        message:`PACK THIS ITEM: ${o.product_name||"Product"} - Rider will arrive`,
        status:o.status
      }));
    }
    setSellerOrders(all);
  };

  const handleImg = (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    if(file.size > 5*1024*1024) return alert("5MB se kam image lo!");
    setImgFile(file);
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 600; let w = img.width, h = img.height;
        if(w>h){ if(w>MAX){ h*=MAX/w; w=MAX; } } else { if(h>MAX){ w*=MAX/h; h=MAX; } }
        canvas.width=w; canvas.height=h;
        canvas.getContext("2d")?.drawImage(img,0,0,w,h);
        setImgPreview(canvas.toDataURL("image/jpeg",0.6));
      };
      img.src = r.result as string;
    };
    r.readAsDataURL(file);
  };

  const uploadProduct = async () => {
    if (!prod.name ||!prod.price) return alert("Name Price likho!");
    if(selectedColors.length===0) return alert("1 color to select karo!");
    setLoading(true);
    try {
      let finalImg = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
      if(imgFile){
        const fileName = `${Date.now()}-${imgFile.name.replace(/[^a-zA-Z0-9.]/g,"")}`;
        const { error: upErr } = await supabase.storage.from("kaiha-images").upload(fileName, imgFile);
        if(upErr) throw upErr;
        const { data } = supabase.storage.from("kaiha-images").getPublicUrl(fileName);
        finalImg = data.publicUrl;
      } else if(imgPreview){
        finalImg = imgPreview;
      }
      const { error } = await supabase.from("products").insert([{
        name: prod.name, price: Number(prod.price), image_url: finalImg,
        category: mainCat, subcategory: subCat,
        colors: selectedColors.join(","), sizes: selectedSizes.join(","),
        shop_name: shopName, stock: Number(prod.stock) || 10, is_active: true
      }]);
      if (error) throw error;
      alert(`✅ ${prod.name} add ho gaya!`);
      setProd({ name: "", price: "", stock: "10" }); setImgFile(null); setImgPreview("");
      fetchMine(shopName);
    } catch (e: any) { alert("❌ " + e.message); } finally { setLoading(false); }
  };

  const deleteProd = async (id: number) => {
    if(!confirm("Delete?")) return;
    await supabase.from("products").delete().eq("id",id);
    fetchMine(shopName);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#0a0a0a", width: "100%", maxWidth: "390px", minHeight: "100vh", padding: "20px", color: "#fff" }}>
        <h1 style={{ color: "#D4B78F", textAlign: "center", fontWeight: "900" }}>KAIHA SELLER</h1>
        <input value={shopName} onChange={e=>{setShopName(e.target.value); fetchMine(e.target.value); fetchSellerOrders(e.target.value);}} placeholder="Shop Name ex: Hadi Store" style={{width:"100%",marginTop:"10px",background:"#141414",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"10px",color:"#fff"}}/>
        <div style={{textAlign:"center", fontSize:"10px", color:"#888", marginTop:"6px"}}>Shop: {shopName} • Sirf apni shop ke orders</div>

        <div style={{marginTop:"16px", background:"#141414", border:"1px solid #D4B78F88", borderRadius:"14px", padding:"12px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:"12px",color:"#D4B78F"}}>📦 NEW ORDERS ({sellerOrders.length})</b><button onClick={()=>fetchSellerOrders(shopName)} style={{background:"#D4B78F",color:"#000",border:"none",borderRadius:"999px",padding:"5px 10px",fontSize:"9px",fontWeight:"800"}}>REFRESH</button></div>
          {sellerOrders.length===0? <div style={{color:"#666",fontSize:"11px",marginTop:"10px",textAlign:"center"}}>No orders yet</div> :
            sellerOrders.map((o:any)=>(
              <div key={o.id} style={{background:"#000",border:"1px solid #333",borderRadius:"10px",padding:"10px",marginTop:"8px"}}>
                <div style={{fontWeight:"700",fontSize:"12px"}}>{o.product_name}</div>
                <div style={{fontSize:"11px",marginTop:"4px"}}>👤 {o.buyer_name} - 📞 {o.buyer_phone}</div>
                <div style={{fontSize:"11px"}}>📍 {o.buyer_location}</div>
                <button onClick={async()=>{await supabase.from("orders").update({status:"PACKED"}).eq("id",o.order_id); alert("PACKED! Rider ayega"); fetchSellerOrders(shopName);}} style={{width:"100%",marginTop:"6px",background:"#4CAF50",color:"#fff",border:"none",padding:"8px",borderRadius:"999px",fontSize:"10px",fontWeight:"800"}}>✅ PACKED</button>
              </div>
            ))
          }
        </div>

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
            <input value={prod.stock} onChange={e => setProd({...prod, stock: e.target.value })} type="number" style={{ width: "100%", padding: "12px", marginTop: "6px", background: "#141414", border: "1px solid #333", borderRadius: "10px", color: "#fff" }} />
          </div>
        </div>
        <div style={{marginTop:"12px", background:"#141414", border:"1px solid #222", borderRadius:"12px", padding:"12px"}}>
          <label style={{fontSize:"11px", color:"#D4B78F", fontWeight:"800"}}>🎨 Color</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"10px"}}>
            {colorOptions.map(c=>(
              <button key={c.hex} onClick={()=>{
                if(selectedColors.includes(c.hex)) setSelectedColors(selectedColors.filter(x=>x!==c.hex));
                else setSelectedColors([...selectedColors, c.hex]);
              }} style={{background:c.hex, border:selectedColors.includes(c.hex)?"3px solid #D4B78F":"1px solid #444",width:"44px",height:"44px",borderRadius:"10px",position:"relative"}}>
                {selectedColors.includes(c.hex)&&<span style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",color:c.hex==="#FFFFFF"?"#000":"#fff",fontWeight:"900"}}>✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{marginTop:"12px", background:"#141414", border:"1px solid #222", borderRadius:"12px", padding:"12px"}}>
          <label style={{fontSize:"11px", color:"#D4B78F", fontWeight:"800"}}>📏 Size</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginTop:"10px"}}>
            {sizeOptions.map(s=>(
              <button key={s} onClick={()=>{
                if(selectedSizes.includes(s)) setSelectedSizes(selectedSizes.filter(x=>x!==s));
                else setSelectedSizes([...selectedSizes, s]);
              }} style={{background:selectedSizes.includes(s)?"#D4B78F":"#0a0a0a", color:selectedSizes.includes(s)?"#000":"#fff",border:"1px solid #333",borderRadius:"999px",padding:"7px 12px",fontSize:"10px",fontWeight:"700"}}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "12px", padding: "12px", background: "#141414", border: "1px dashed #D4B78F66", borderRadius: "12px" }}>
          <label style={{ fontSize: "11px", color: "#D4B78F" }}>Product Image (Bucket me jayegi)</label>
          <input type="file" accept="image/*" onChange={handleImg} style={{ width: "100%", marginTop: "8px", color: "#fff" }} />
          {imgPreview && <img src={imgPreview} style={{ width: "100%", height: "160px", objectFit: "cover", marginTop: "10px", borderRadius: "10px" }} />}
        </div>
        <button onClick={uploadProduct} disabled={loading} style={{ width: "100%", marginTop: "14px", padding: "14px", background: "#D4B78F", color: "#000", border: "none", borderRadius: "999px", fontWeight: "900" }}>
          {loading? "UPLOADING..." : `UPLOAD TO ${mainCat} > ${subCat}`}
        </button>
        <div style={{ marginTop: "25px", borderTop: "1px solid #222", paddingTop: "15px" }}>
          <b style={{ fontSize: "13px", color: "#D4B78F" }}>My Uploaded ({myProds.length})</b>
          {myProds.map((p:any)=><div key={p.id} style={{ background: "#141414", border: "1px solid #222", borderRadius: "12px", padding: "10px", display: "flex", gap: "10px", marginTop: "10px" }}>
            <img src={p.image_url} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
            <div style={{ flex: 1 }}><div style={{ fontSize: "12px" }}>{p.name} - Rs.{p.price}</div><div style={{ fontSize: "9px", color: "#888" }}>{p.category} → {p.subcategory}</div></div>
            <button onClick={()=>deleteProd(p.id)} style={{ background: "#FF2222", color: "#fff", border: "none", borderRadius: "8px", padding: "6px 10px", fontSize: "10px", height: "30px" }}>DEL</button>
          </div>)}
        </div>
      </div>
    </div>
  );
      }
