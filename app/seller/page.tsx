"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
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
  const file=e.target.files[0]; if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{ setImgPreview(reader.result as string); setProd({...prod,img:reader.result as string}); };
  reader.readAsDataURL(file);
};

const sendOtp=async()=>{
  if(!shopName||!accNum||!gmail) return alert("3 boxes fill karo");
  setLoading(true);
  try{
    const {error}=await supabase.auth.signInWithOtp({email:gmail,options:{data:{shop_name:shopName,shop_cat:shopCat}}});
    if(error)throw error; setLoading(false); setStep(2); alert("OTP to "+gmail);
  }catch(e:any){
    const localOtp=Math.floor(100000+Math.random()*900000).toString();
    localStorage.setItem("kaiha_seller_otp",localOtp); localStorage.setItem("kaiha_seller_gmail",gmail);
    setLoading(false); setStep(2); alert("OTP Local: "+localOtp+" or 123456");
  }
};

const verifyOtp=async()=>{
  const localOtp=localStorage.getItem("kaiha_seller_otp");
  if((localOtp&&otp===localOtp)||otp==="123456"){
    const newShop={shopName, accNum, gmail, shopCat, isOpen:true, id:Date.now()};
    localStorage.setItem("kaiha_shop",JSON.stringify(newShop)); setShopCreated(newShop); setShowLogin(false); return;
  }
  try{
    const {error}=await supabase.auth.verifyOtp({email:gmail,token:otp,type:'email'});
    if(error)throw error;
    const newShop={shopName, accNum, gmail, shopCat, isOpen:true, id:Date.now()};
    localStorage.setItem("kaiha_shop",JSON.stringify(newShop)); setShopCreated(newShop); setShowLogin(false);
  }catch{
    if(otp==="123456"||otp===localOtp){
      const newShop={shopName, accNum, gmail, shopCat, isOpen:true, id:Date.now()};
      localStorage.setItem("kaiha_shop",JSON.stringify(newShop)); setShopCreated(newShop); setShowLogin(false);
    }else alert("Wrong OTP! Use "+(localOtp||"123456"));
  }
};

const toggleShop=()=>{
  const upd={...shopCreated,isOpen:!shopCreated.isOpen};
  setShopCreated(upd); localStorage.setItem("kaiha_shop",JSON.stringify(upd));
  // Update main products visibility
  const all=JSON.parse(localStorage.getItem("kaiha_all_products")||"[]");
  const updatedAll=all.map((p:any)=>p.shopName===upd.shopName?{...p,isOpen:upd.isOpen}:p);
  localStorage.setItem("kaiha_all_products",JSON.stringify(updatedAll));
};

const uploadProduct=()=>{
  if(!prod.name||!prod.price)return alert("Name Price required");
  const newP={...prod, id:Date.now(), shopName:shopCreated.shopName, shopCat:shopCreated.shopCat, pr:Number(prod.price), n:prod.name, im:prod.img||imgPreview||"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", stock:Number(prod.stock), isOpen:shopCreated.isOpen, colors:prod.color.split(",").map((c:string)=>c.trim())};
  const all=[newP,...myProds]; setMyProds(all); localStorage.setItem("kaiha_seller_products",JSON.stringify(all));
  const mainP=JSON.parse(localStorage.getItem("kaiha_all_products")||"[]"); localStorage.setItem("kaiha_all_products",JSON.stringify([newP,...mainP]));
  setProd({name:"",price:"",size:"M",color:"Black",stock:"10",img:"",cat:shopCreated.shopCat,sub:"MALE"}); setImgPreview(""); alert("Uploaded! "+shopCreated.shopCat+" category me show hoga!");
};

const updateStock=(id:number,newStock:number)=>{
  const upd=myProds.map(p=>p.id===id?{...p,stock:newStock}:p); setMyProds(upd);
  localStorage.setItem("kaiha_seller_products",JSON.stringify(upd));
  const all=JSON.parse(localStorage.getItem("kaiha_all_products")||"[]"); localStorage.setItem("kaiha_all_products",JSON.stringify(all.map((p:any)=>p.id===id?{...p,stock:newStock}:p)));
};

if(showLogin){
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",color:"#fff"}}>
<div style={{background:"#141414",borderRadius:"16px",padding:"20px",width:"100%",border:"1px solid #D4B78F44"}}>
<div style={{textAlign:"center",color:"#D4B78F",fontWeight:"800"}}>SELLER LOGIN - KAIHA</div>
{step===1?<>
<input value={shopName} onChange={e=>setShopName(e.target.value)} placeholder="1. Shop Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"16px"}}/>
<input value={accNum} onChange={e=>setAccNum(e.target.value)} placeholder="2. JazzCash / EasyPaisa Acc Number" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<select value={shopCat} onChange={e=>setShopCat(e.target.value)} style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F99",borderRadius:"10px",padding:"12px",color:"#D4B78F",marginTop:"10px",fontWeight:"700"}}>
<option value="FASHION">FASHION Category Shop</option><option value="BEAUTY">BEAUTY Category Shop</option><option value="HOME">HOME Category Shop</option>
</select>
<input value={gmail} onChange={e=>setGmail(e.target.value)} placeholder="3. Gmail for OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<button onClick={sendOtp} disabled={loading} style={{width:"100%",marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"13px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button>
</>:<>
<div style={{textAlign:"center",color:"#D4B78F"}}>OTP: {typeof window!=="undefined"?localStorage.getItem("kaiha_seller_otp")||"123456":""}</div>
<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center",letterSpacing:"0.3em"}}/>
<button onClick={verifyOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>VERIFY & CREATE SHOP</button>
<button onClick={()=>setStep(1)} style={{width:"100%",marginTop:"8px",background:"none",border:"1px solid #333",color:"#888",padding:"10px",borderRadius:"999px"}}>Back</button>
</>}
</div></div></div>
);
}

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"20px",color:"#fff",borderRadius:"28px",overflow:"hidden"}}>
<div style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 18px",borderBottom:"1px solid #D4B78F33"}}><img src={LOGO} style={{height:"72px",width:"72px",borderRadius:"16px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px"}}>KAIHA SELLER</span></div>
<div style={{padding:"18px"}}>
<div style={{background:"#111",border:"1px solid #D4B78F44",borderRadius:"14px",padding:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{color:"#D4B78F",fontWeight:"800",fontSize:"16px"}}>{shopCreated.shopName}</div><div style={{fontSize:"10px",color:"#888"}}>{shopCreated.gmail} | {shopCreated.shopCat} SHOP</div><div style={{fontSize:"10px",color:"#D4B78F"}}>Acc: {shopCreated.accNum} ✓</div></div>
<button onClick={toggleShop} style={{background:shopCreated.isOpen?"#D4B78F":"#333",color:shopCreated.isOpen?"#000":"#fff",border:"none",borderRadius:"999px",padding:"8px 14px",fontSize:"10px",fontWeight:"800"}}>{shopCreated.isOpen?"SHOP OPEN":"SHOP CLOSED"}</button>
</div>

<div style={{color:"#888",fontSize:"9px",marginTop:"8px",textAlign:"center"}}>{shopCreated.isOpen?"✓ Your shop is LIVE on kaiha.vercel.app - Customers can see":"✕ Shop CLOSED - Hidden from customers"}</div>

<div style={{color:"#D4B78F",fontWeight:"700",marginTop:"18px"}}>Upload Product - {shopCreated.shopCat} Section Only</div>
<input value={prod.name} onChange={e=>setProd({...prod,name:e.target.value})} placeholder="Product Name" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"10px"}}/>
<div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
<input value={prod.price} onChange={e=>setProd({...prod,price:e.target.value})} placeholder="Price $" type="number" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
<input value={prod.stock} onChange={e=>setProd({...prod,stock:e.target.value})} placeholder="Stock Qty" type="number" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
</div>
<div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
<input value={prod.size} onChange={e=>setProd({...prod,size:e.target.value})} placeholder="Size M/L/XL" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
<input value={prod.color} onChange={e=>setProd({...prod,color:e.target.value})} placeholder="Colors - Black,White,Red" style={{flex:2,background:"#141414",border:"1px solid #D4B78F44",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
</div>

{/* GALLERY SELECT */}
<div style={{marginTop:"10px",background:"#141414",border:"1px solid #D4B78F55",borderRadius:"10px",padding:"12px"}}>
<div style={{fontSize:"10px",color:"#D4B78F",marginBottom:"8px"}}>📷 Product Image - Gallery se select karo</div>
<input type="file" accept="image/*" onChange={handleGallery} style={{width:"100%",color:"#fff",fontSize:"11px"}}/>
{imgPreview&&<img src={imgPreview} style={{width:"100%",height:"120px",objectFit:"cover",borderRadius:"8px",marginTop:"8px"}}/>}
</div>

<button onClick={uploadProduct} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>UPLOAD TO {shopCreated.shopCat} MAIN SITE</button>

<div style={{marginTop:"18px"}}><b style={{color:"#D4B78F"}}>My Shop Products ({myProds.length}) - {shopCreated.shopCat}</b>
{myProds.map((p:any)=><div key={p.id} style={{background:"#141414",border:`1px solid ${p.stock>0?"#222":"#ff444466"}`,borderRadius:"10px",padding:"10px",marginTop:"8px"}}>
<div style={{display:"flex",gap:"10px"}}>
<img src={p.im} style={{width:"60px",height:"60px",borderRadius:"8px",objectFit:"cover"}}/>
<div style={{flex:1}}>
<div style={{fontSize:"12px",fontWeight:"600"}}>{p.n} - {p.shopName}</div>
<div style={{fontSize:"10px",color:"#D4B78F"}}>Rs. {(p.pr*280).toLocaleString()} | {p.size} | {p.colors?.join(", ")}</div>
<div style={{fontSize:"10px",color:p.stock>0?"#4CAF50":"#ff4444",marginTop:"2px"}}>{p.stock>0?`${p.stock} in Stock - Available`:`OUT OF STOCK - Hidden from customers`}</div>
<div style={{display:"flex",gap:"6px",marginTop:"6px"}}>
<button onClick={()=>updateStock(p.id,Math.max(0,p.stock-1))} style={{background:"#222",border:"1px solid #333",color:"#fff",borderRadius:"6px",padding:"4px 8px",fontSize:"10px"}}>-1</button>
<span style={{fontSize:"11px",padding:"4px"}}>Stock: {p.stock}</span>
<button onClick={()=>updateStock(p.id,p.stock+1)} style={{background:"#D4B78F",border:"none",color:"#000",borderRadius:"6px",padding:"4px 8px",fontSize:"10px",fontWeight:"700"}}>+1</button>
</div>
</div>
</div>
</div>)}
</div>

<div style={{marginTop:"12px",background:"#0a0a0a",border:"1px dashed #D4B78F33",borderRadius:"10px",padding:"10px"}}>
<div style={{fontSize:"9px",color:"#888",textAlign:"center"}}>Items uploaded here will show ONLY in {shopCreated.shopCat} category on https://kaiha.vercel.app<br/>Customer: {shopCreated.isOpen?"Can see shop":"Cannot see - Shop Closed"}</div>
</div>

</div></div></div>
);
      }
