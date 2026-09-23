"use client"; import { useState, useEffect } from "react"; import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");

function dataURLtoFile(dataurl:string, filename:string){
  const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n);
  while(n--){ u8arr[n] = bstr.charCodeAt(n); }
  return new File([u8arr], filename, {type:mime});
}

const CATS:any={
  FASHION:["Men Clothing","Women Clothing","Kids","Shoes","Watches","Jewellery","Bags"],
  BEAUTY:["Makeup","Skincare","Haircare","Fragrance"],
  HOME:["Kitchen","Decor","Electronics","Toys"]
};
const COLORS=["Black","White","Red","Blue","Green","Beige","Brown","Multi"];
const SIZES=["S","M","L","XL","XXL","Free Size","38","40","42","44"];

export default function SellerPage(){
  const [shop,setShop]=useState("");
  const [orders,setOrders]=useState<any[]>([]);
  const [products,setProducts]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [imgPreview,setImgPreview]=useState("");
  const [form,setForm]=useState({name:"",price:"",stock:"10",mainCat:"FASHION",subCat:"Men Clothing",colors:[] as string[],sizes:[] as string[]});

  useEffect(()=>{
    // 🔒 SECURITY CHECK - Sirf login wala hi apni shop khol sakta
    const auth = localStorage.getItem("seller_auth");
    const savedShop = localStorage.getItem("shop_name");
    const params = new URLSearchParams(window.location.search);
    let s = params.get("shop") || savedShop || "";
    if(!auth ||!savedShop){ location.href="/seller/login"; return; }
    if(s && savedShop && s!==savedShop){ location.href="/seller?shop="+encodeURIComponent(savedShop); return; }
    if(!s) s=savedShop||"";
    setShop(s);
    if(s){ fetchOrders(s); fetchProducts(s); }
  },[]);

  const fetchOrders=async(shopName:string)=>{
    const {data}=await supabase.from("orders").select("*").eq("shop_name",shopName).eq("status","NEW").order("id",{ascending:false});
    setOrders(data||[]);
  };
  const fetchProducts=async(shopName:string)=>{
    const {data}=await supabase.from("products").select("*").eq("shop_name",shopName).order("id",{ascending:false});
    setProducts(data||[]);
  };

  const handleImage=(e:any)=>{
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const canvas=document.createElement("canvas");
        const MAX=800; let w=img.width,h=img.height;
        if(w>h){ if(w>MAX){ h*=MAX/w; w=MAX; } } else { if(h>MAX){ w*=MAX/h; h=MAX; } }
        canvas.width=w; canvas.height=h;
        canvas.getContext("2d")?.drawImage(img,0,0,w,h);
        setImgPreview(canvas.toDataURL("image/jpeg",0.5)); // 70KB
      };
      img.src=r.result as string;
    };
    r.readAsDataURL(file);
  };

  const addProduct=async()=>{
    if(!form.name||!form.price||!imgPreview) return alert("Name + Price + Image zaruri!");
    setLoading(true);
    try{
      const file=dataURLtoFile(imgPreview, `${Date.now()}.jpg`);
      const fileName=`${shop}-${Date.now()}.jpg`;
      await supabase.storage.from("products").upload(fileName,file);
      const {data}=supabase.storage.from("products").getPublicUrl(fileName);
      await supabase.from("products").insert({ shop_name:shop, name:form.name, price:Number(form.price), stock:Number(form.stock), main_category:form.mainCat, sub_category:form.subCat, colors:form.colors.join(","), sizes:form.sizes.join(","), image_url:data.publicUrl, created_at:new Date().toISOString() });
      alert("✅ Product Added!");
      setForm({name:"",price:"",stock:"10",mainCat:"FASHION",subCat:"Men Clothing",colors:[],sizes:[]}); setImgPreview("");
      fetchProducts(shop);
    }catch(e:any){ alert(e.message); } setLoading(false);
  };

  const packedOrder=async(id:any)=>{
    await supabase.from("orders").update({status:"PACKED"}).eq("id",id);
    alert("✅ PACKED - Rider ko gaya!"); fetchOrders(shop);
  };

  const delProduct=async(id:any)=>{
    if(!confirm("Delete?")) return;
    await supabase.from("products").delete().eq("id",id);
    fetchProducts(shop);
  };

  const logout=()=>{ localStorage.removeItem("seller_auth"); localStorage.removeItem("shop_name"); location.href="/seller/login"; };

  return(
    <div style={{background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center"}}>
    <div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",padding:"14px",color:"#fff"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{color:"#D4B78F",fontWeight:"900",fontSize:"14px"}}>SELLER: {shop}</h3>
        <button onClick={logout} style={{background:"#222",color:"#fff",border:"1px solid #333",padding:"6px 10px",borderRadius:"8px",fontSize:"10px"}}>LOGOUT</button>
      </div>

      {/* ADD PRODUCT */}
      <div style={{marginTop:"12px",background:"#141414",border:"1px solid #333",borderRadius:"12px",padding:"10px"}}>
        <div style={{fontSize:"11px",fontWeight:"800",color:"#D4B78F"}}>➕ ADD PRODUCT (70KB Image)</div>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Product Name" style={{width:"100%",marginTop:"8px",padding:"10px",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"12px"}}/>
        <div style={{display:"flex",gap:"6px",marginTop:"6px"}}>
          <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} type="number" placeholder="Price" style={{flex:1,padding:"10px",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"12px"}}/>
          <input value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} type="number" placeholder="Stock" style={{flex:1,padding:"10px",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"12px"}}/>
        </div>
        <div style={{display:"flex",gap:"6px",marginTop:"6px"}}>
          <select value={form.mainCat} onChange={e=>setForm({...form,mainCat:e.target.value,subCat:CATS[e.target.value][0]})} style={{flex:1,padding:"8px",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"11px"}}>{Object.keys(CATS).map((c:any)=><option key={c}>{c}</option>)}</select>
          <select value={form.subCat} onChange={e=>setForm({...form,subCat:e.target.value})} style={{flex:1,padding:"8px",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",color:"#fff",fontSize:"11px"}}>{CATS[form.mainCat].map((s:any)=><option key={s}>{s}</option>)}</select>
        </div>
        <div style={{marginTop:"6px",fontSize:"9px",color:"#888"}}>Colors:</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"4px"}}>{COLORS.map(c=><button key={c} onClick={()=>setForm({...form,colors:form.colors.includes(c)?form.colors.filter(x=>x!==c):[...form.colors,c]})} style={{padding:"4px 8px",borderRadius:"999px",fontSize:"9px",border:"1px solid #333",background:form.colors.includes(c)?"#D4B78F":"#222",color:form.colors.includes(c)?"#000":"#fff"}}>{c}</button>)}</div>
        <div style={{marginTop:"6px",fontSize:"9px",color:"#888"}}>Sizes:</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"4px"}}>{SIZES.map(s=><button key={s} onClick={()=>setForm({...form,sizes:form.sizes.includes(s)?form.sizes.filter(x=>x!==s):[...form.sizes,s]})} style={{padding:"4px 8px",borderRadius:"999px",fontSize:"9px",border:"1px solid #333",background:form.sizes.includes(s)?"#D4B78F":"#222",color:form.sizes.includes(s)?"#000":"#fff"}}>{s}</button>)}</div>
        <input type="file" accept="image/*" onChange={handleImage} style={{marginTop:"8px",width:"100%",fontSize:"11px"}}/>
        {imgPreview && <img src={imgPreview} style={{width:"100%",height:"140px",objectFit:"cover",marginTop:"6px",borderRadius:"8px"}}/>}
        <button onClick={addProduct} disabled={loading} style={{width:"100%",marginTop:"8px",background:loading?"#222":"#D4B78F",color:"#000",padding:"12px",borderRadius:"999px",border:"none",fontWeight:"900",fontSize:"12px"}}>{loading?"UPLOADING 70KB...":"ADD PRODUCT →"}</button>
      </div>

      {/* ORDERS */}
      <div style={{marginTop:"12px"}}><div style={{fontSize:"12px",fontWeight:"800"}}>🔔 NEW ORDERS ({orders.length})</div>
      {orders.map((o:any)=><div key={o.id} style={{background:"#111",border:"1px solid #D4B78F44",borderRadius:"10px",padding:"8px",marginTop:"6px"}}><div style={{fontSize:"11px",fontWeight:"700"}}>{o.product_name} - Rs.{o.total_price}</div><div style={{fontSize:"9px",color:"#aaa"}}>{o.buyer_name} - {o.buyer_phone} - {o.buyer_location}</div><button onClick={()=>packedOrder(o.id)} style={{width:"100%",marginTop:"6px",background:"#D4B78F",color:"#000",border:"none",padding:"8px",borderRadius:"999px",fontWeight:"800",fontSize:"10px"}}>📦 PACKED</button></div>)}</div>

      {/* MY PRODUCTS */}
      <div style={{marginTop:"12px"}}><div style={{fontSize:"12px",fontWeight:"800"}}>📦 MY PRODUCTS ({products.length})</div>
      {products.map((p:any)=><div key={p.id} style={{background:"#111",border:"1px solid #222",borderRadius:"10px",padding:"8px",marginTop:"6px",display:"flex",gap:"8px"}}><img src={p.image_url} style={{width:"50px",height:"50px",objectFit:"cover",borderRadius:"8px"}}/><div style={{flex:1}}><div style={{fontSize:"11px",fontWeight:"700"}}>{p.name}</div><div style={{fontSize:"9px",color:"#888"}}>Rs.{p.price} | {p.main_category} {">" } {p.sub_category}</div></div><button onClick={()=>delProduct(p.id)} style={{background:"#ff000022",color:"#ff4444",border:"1px solid #ff000044",padding:"4px 8px",borderRadius:"6px",fontSize:"10px"}}>DEL</button></div>)}</div>
    </div></div>
  )
          }
