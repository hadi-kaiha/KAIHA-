"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk");

const LOGO="/k-logo.png";

export default function Seller(){
const [showLogin,setShowLogin]=useState(true);
const [shopName,setShopName]=useState(""); const [accNum,setAccNum]=useState(""); const [gmail,setGmail]=useState(""); const [shopCat,setShopCat]=useState("FASHION");
const [otp,setOtp]=useState(""); const [step,setStep]=useState(1); const [loading,setLoading]=useState(false);
const [shopCreated,setShopCreated]=useState<any>(null);
const [myProds,setMyProds]=useState<any[]>([]);
const [prod,setProd]=useState({name:"",price:"",size:"M",color:"Black",stock:"10",img:"",cat:"FASHION",sub:"MALE"});
const [imgPreview,setImgPreview]=useState("");

useEffect(()=>{
  const sh=localStorage.getItem("kaiha_shop"); if(sh){setShopCreated(JSON.parse(sh)); setShowLogin(false);}
  const pr=localStorage.getItem("kaiha_seller_products"); if(pr)setMyProds(JSON.parse(pr));
},[]);

const handleGallery=(e:any)=>{
  const file=e.target.files[0]; if(!file) return;
  if(file.size > 500*1024){ alert("500KB se choti image lo bhai!"); return; }
  const reader=new FileReader();
  reader.onload=()=>{ setImgPreview(reader.result as string); };
  reader.readAsDataURL(file);
};

const sendOtp=async()=>{
  if(!shopName||!accNum||!gmail) return alert("3 boxes fill karo");
  setLoading(true);
  const localOtp=Math.floor(100000+Math.random()*900000).toString();
  localStorage.setItem("kaiha_seller_otp",localOtp);
  setLoading(false); setStep(2); alert("OTP Local: "+localOtp+" or 123456");
};

const verifyOtp=async()=>{
  const localOtp=localStorage.getItem("kaiha_seller_otp");
  if((localOtp&&otp===localOtp)||otp==="123456"){
    const newShop={shopName, accNum, gmail, shopCat, isOpen:true, id:Date.now()};
    localStorage.setItem("kaiha_shop",JSON.stringify(newShop)); setShopCreated(newShop); setShowLogin(false); return;
  }else alert("Wrong OTP! Use "+(localOtp||"123456"));
};

const toggleShop=()=>{
  const upd={...shopCreated,isOpen:!shopCreated.isOpen};
  setShopCreated(upd); localStorage.setItem("kaiha_shop",JSON.stringify(upd));
};

// PERFECT FIX - Vercel API se jayega - Failed to fetch khatam
const uploadProduct=async()=>{
  if(!prod.name||!prod.price) return alert("Name Price required");
  setLoading(true);
  try{
    let finalImg = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
    if(imgPreview && imgPreview.length < 200000) finalImg = imgPreview;

    const res = await fetch("/api/products",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        name: prod.name,
        price: prod.price,
        category: shopCreated.shopCat,
        image_url: finalImg,
        shop_name: shopCreated.shopName,
        stock: prod.stock
      })
    });

    const json = await res.json();
    if(!res.ok) throw new Error(json.error || "API Error");

    const newP={id:json.data[0].id, shopName:shopCreated.shopName, shopCat:shopCreated.shopCat, pr:Number(prod.price), n:prod.name, im:finalImg, stock:Number(prod.stock), isOpen:true};
    const all=[newP,...myProds]; setMyProds(all); localStorage.setItem("kaiha_seller_products",JSON.stringify(all));
    setProd({name:"",price:"",size:"M",color:"Black",stock:"10",img:"",cat:shopCreated.shopCat,sub:"MALE"}); setImgPreview("");
    alert("✅ SUCCESS ID: "+json.data[0].id+" - Customer ko ab dikhega!");

  }catch(e:any){
    alert("❌ Error: "+e.message+"\n\n/api/products file banaya hai kya?");
  }finally{
    setLoading(false);
  }
};

if(showLogin){
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",color:"#fff"}}>
<div style={{background:"#141414",borderRadius:"16px",padding:"20px",width:"100%",border:"1px solid #D4B78F44"}}>
<div style={{textAlign:"center",color:"#D4B78F",fontWeight:"800"}}>SELLER LOGIN</div>
<input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="Shop Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"16px"}}/>
<input value={accNum} onChange={e=>setAccNum(e.target.value)} placeholder="JazzCash Acc" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<select value={shopCat} onChange={e=>setShopCat(e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F99",borderRadius:"10px",padding:"12px",color:"#D4B78F",marginTop:"10px"}}>
<option value="FASHION">FASHION</option><option value="BEAUTY">BEAUTY</option><option value="HOME">HOME</option>
</select>
<input value={gmail} onChange={e=>setGmail(e.target.value)} placeholder="Gmail" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
{step===1?<button onClick={sendOtp} style={{width:"100%",marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"13px",borderRadius:"999px",fontWeight:"800"}}>SEND OTP</button>:<>
<div style={{textAlign:"center",color:"#D4B78F",marginTop:"10px"}}>OTP: {typeof window!=="undefined"?localStorage.getItem("kaiha_seller_otp")||"123456":""}</div>
<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center"}}/>
<button onClick={verifyOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>VERIFY</button>
</>}
</div></div></div>
);
}
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"20px",color:"#fff"}}>
<div style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 18px",borderBottom:"1px solid #D4B78F33"}}><img src={LOGO} style={{height:"72px",width:"72px",borderRadius:"16px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px"}}>KAIHA SELLER</span></div>
<div style={{padding:"18px"}}>
<div style={{background:"#111",border:"1px solid #D4B78F44",borderRadius:"14px",padding:"14px",display:"flex",justifyContent:"space-between"}}>
<div><div style={{color:"#D4B78F",fontWeight:"800"}}>{shopCreated.shopName}</div><div style={{fontSize:"10px",color:"#888"}}>{shopCreated.shopCat}</div></div>
<button onClick={toggleShop} style={{background:shopCreated.isOpen?"#D4B78F":"#333",color:shopCreated.isOpen?"#000":"#fff",border:"none",borderRadius:"999px",padding:"8px 14px",fontSize:"10px",fontWeight:"800"}}>{shopCreated.isOpen?"OPEN":"CLOSED"}</button>
</div>
<input value={prod.name} onChange={e=>setProd({...prod,name:e.target.value})} placeholder="Product Name" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"10px"}}/>
<div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
<input value={prod.price} onChange={e=>setProd({...prod,price:e.target.value})} placeholder="Price" type="number" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
<input value={prod.stock} onChange={e=>setProd({...prod,stock:e.target.value})} placeholder="Stock" type="number" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
</div>
<div style={{marginTop:"10px",background:"#141414",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px"}}>
<div style={{fontSize:"10px",color:"#D4B78F"}}>📷 Gallery - 500KB se choti</div>
<input type="file" accept="image/*" onChange={handleGallery} style={{width:"100%",color:"#fff",fontSize:"11px",marginTop:"6px"}}/>
{imgPreview&&<img src={imgPreview} style={{width:"100%",height:"120px",objectFit:"cover",borderRadius:"8px",marginTop:"8px"}}/>}
</div>
<button onClick={uploadProduct} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>{loading?"UPLOADING...":`UPLOAD TO ${shopCreated.shopCat}`}</button>
<div style={{marginTop:"18px"}}><b style={{color:"#D4B78F"}}>My Products ({myProds.length})</b>
{myProds.map((p:any)=><div key={p.id} style={{background:"#141414",border:"1px solid #222",borderRadius:"10px",padding:"10px",marginTop:"8px",display:"flex",gap:"10px"}}>
<img src={p.im} style={{width:"60px",height:"60px",borderRadius:"8px",objectFit:"cover"}}/>
<div><div style={{fontSize:"12px"}}>{p.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>Rs. {p.pr}</div></div>
</div>)}
</div>
</div></div></div>
);
  }
