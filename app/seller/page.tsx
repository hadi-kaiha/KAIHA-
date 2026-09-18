"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
export default function Seller(){
const [user,setUser]=useState<any>(null); const [showLogin,setShowLogin]=useState(false);
const [form,setForm]=useState({name:"",gmail:""}); const [otp,setOtp]=useState(""); const [step,setStep]=useState(1); const [loading,setLoading]=useState(false);
const [shop,setShop]=useState({shopName:"",jazz:"",easy:"",gmail:""}); const [shopCreated,setShopCreated]=useState<any>(null);
const [prod,setProd]=useState({name:"",price:"",size:"M",color:"Black",cat:"FASHION",sub:"MALE",img:""}); const [myProds,setMyProds]=useState<any[]>([]);

useEffect(()=>{
  const u=localStorage.getItem("kaiha_user"); if(u){setUser(JSON.parse(u)); setShop(s=>({...s,gmail:JSON.parse(u).gmail}));}
  const sh=localStorage.getItem("kaiha_shop"); if(sh)setShopCreated(JSON.parse(sh));
  const pr=localStorage.getItem("kaiha_seller_products"); if(pr)setMyProds(JSON.parse(pr));
  else setShowLogin(true);
},[]);

const sendOtp=async()=>{
  if(!form.name||!form.gmail)return alert("Name Gmail required");
  setLoading(true);
  const {error}=await supabase.auth.signInWithOtp({email:form.gmail,options:{data:{full_name:form.name}}});
  setLoading(false); if(error)return alert(error.message);
  setStep(2); alert("OTP sent to "+form.gmail);
};
const verifyOtp=async()=>{
  setLoading(true);
  const {data,error}=await supabase.auth.verifyOtp({email:form.gmail,token:otp,type:'email'});
  setLoading(false); if(error)return alert("Wrong OTP: "+error.message);
  const u={name:form.name,gmail:form.gmail,id:data.user?.id}; setUser(u); localStorage.setItem("kaiha_user",JSON.stringify(u));
  setShop(s=>({...s,gmail:form.gmail})); setShowLogin(false);
};

const createShop=async()=>{
  if(!shop.shopName||!shop.gmail||(!shop.jazz&&!shop.easy))return alert("Shop Name + Gmail + JazzCash/EasyPaisa required");
  const newShop={...shop,owner:user.name,id:Date.now(),createdAt:new Date().toISOString()};
  localStorage.setItem("kaiha_shop",JSON.stringify(newShop)); setShopCreated(newShop);
  // Save to Supabase
  await supabase.from("sellers").insert([{shop_name:shop.shopName,gmail:shop.gmail,jazzcash_number:shop.jazz,easypaisa_number:shop.easy,owner_name:user.name}]);
  alert("Shop Created: "+shop.shopName+" - Ab products upload karo!");
};

const uploadProduct=async()=>{
  if(!prod.name||!prod.price)return alert("Name Price required");
  const newP={...prod, id:Date.now(), shopName:shopCreated.shopName, sellerGmail:shopCreated.gmail, pr:Number(prod.price), n:prod.name, im:prod.img||"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", cat:prod.cat, sub:prod.sub, size:prod.size, color:prod.color};
  const all=[newP,...myProds]; setMyProds(all); localStorage.setItem("kaiha_seller_products",JSON.stringify(all));
  // Also add to main site products
  const mainP=JSON.parse(localStorage.getItem("kaiha_all_products")||"[]"); localStorage.setItem("kaiha_all_products",JSON.stringify([newP,...mainP]));
  await supabase.from("seller_products").insert([{seller_shop_name:shopCreated.shopName,product_name:prod.name,price:Number(prod.price),size:prod.size,color:prod.color,image_url:newP.im,category:prod.cat,sub_category:prod.sub}]);
  setProd({name:"",price:"",size:"M",color:"Black",cat:"FASHION",sub:"MALE",img:""}); alert("Product uploaded! Main website https://kaiha.vercel.app pe show hoga!");
};

if(showLogin){
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",color:"#fff"}}>
<div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",border:"1px solid #D4B78F44"}}>
{step===1?<><div style={{textAlign:"center",color:"#D4B78F"}}>SELLER LOGIN - KAIHA</div><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/><input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/><button onClick={sendOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button></>:<><div style={{textAlign:"center",color:"#D4B78F"}}>Enter OTP - {form.gmail}</div><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center"}}/><button onClick={verifyOtp} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>VERIFY</button></>}
</div></div></div>
);
}

return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}><div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"20px",color:"#fff",borderRadius:"28px",overflow:"hidden"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #D4B78F33"}}><div style={{display:"flex",alignItems:"center",gap:"12px"}}><img src={LOGO} style={{height:"72px",width:"72px",borderRadius:"16px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px"}}>KAIHA SELLER</span></div></div>

<div style={{padding:"18px"}}>
{!shopCreated?<>
<div style={{color:"#D4B78F",fontWeight:"700",fontSize:"16px",textAlign:"center"}}>Create Your Shop</div>
<div style={{color:"#888",fontSize:"10px",textAlign:"center",marginTop:"4px"}}>One time setup - Lifetime shop</div>
<input value={shop.shopName} onChange={e=>setShop({...shop,shopName:e.target.value})} placeholder="Shop Name - e.g. Hadi Luxury" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"14px"}}/>
<input value={shop.gmail} onChange={e=>setShop({...shop,gmail:e.target.value})} placeholder="Gmail - OTP verified" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<input value={shop.jazz} onChange={e=>setShop({...shop,jazz:e.target.value})} placeholder="JazzCash Number - 03XX-XXXXXXX" style={{width:"100%",background:"#141414",border:"1px solid #D4B78F44",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<input value={shop.easy} onChange={e=>setShop({...shop,easy:e.target.value})} placeholder="EasyPaisa Number - 03XX-XXXXXXX" style={{width:"100%",background:"#141414",border:"1px solid #D4B78F44",borderRadius:"10px",padding:"12px",color:"#fff",marginTop:"10px"}}/>
<button onClick={createShop} style={{width:"100%",marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"14px",borderRadius:"999px",fontWeight:"800"}}>CREATE SHOP →</button>
</>:<>
<div style={{background:"#111",border:"1px solid #D4B78F44",borderRadius:"14px",padding:"14px",display:"flex",justifyContent:"space-between"}}>
<div><div style={{color:"#D4B78F",fontWeight:"800",fontSize:"16px"}}>{shopCreated.shopName}</div><div style={{fontSize:"10px",color:"#888"}}>{shopCreated.gmail}</div><div style={{fontSize:"10px",color:"#D4B78F",marginTop:"4px"}}>Jazz: {shopCreated.jazz||" - "} | Easy: {shopCreated.easy||" - "}</div></div>
<div style={{color:"#000",background:"#D4B78F",borderRadius:"999px",padding:"4px 10px",fontSize:"10px",height:"fit-content"}}>Active</div>
</div>

<div style={{color:"#D4B78F",fontWeight:"700",marginTop:"18px"}}>Upload Product - Main Site pe Shop Hoga</div>
<input value={prod.name} onChange={e=>setProd({...prod,name:e.target.value})} placeholder="Product Name" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"10px"}}/>
<div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
<input value={prod.price} onChange={e=>setProd({...prod,price:e.target.value})} placeholder="Price $" type="number" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
<input value={prod.size} onChange={e=>setProd({...prod,size:e.target.value})} placeholder="Size M/L" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
<input value={prod.color} onChange={e=>setProd({...prod,color:e.target.value})} placeholder="Color" style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}/>
</div>
<div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
<select value={prod.cat} onChange={e=>setProd({...prod,cat:e.target.value})} style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}><option>FASHION</option><option>BEAUTY</option><option>HOME</option></select>
<select value={prod.sub} onChange={e=>setProd({...prod,sub:e.target.value})} style={{flex:1,background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff"}}><option>MALE</option><option>FEMALE</option><option>BOY</option><option>GIRL</option><option>UNISEX</option></select>
</div>
<input value={prod.img} onChange={e=>setProd({...prod,img:e.target.value})} placeholder="Image URL (unsplash)" style={{width:"100%",background:"#141414",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/>
<button onClick={uploadProduct} style={{width:"100%",marginTop:"10px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"999px",fontWeight:"800"}}>UPLOAD TO KAIHA MAIN SITE</button>

<div style={{marginTop:"16px"}}><b style={{fontSize:"12px"}}>My Products ({myProds.length}) - Live on kaiha.vercel.app</b>
{myProds.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"10px",padding:"10px",marginTop:"8px",display:"flex",gap:"10px"}}><img src={p.im} style={{width:"50px",height:"50px",borderRadius:"8px"}}/><div><div style={{fontSize:"12px"}}>{p.n} - {p.shopName}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>Rs. {(p.pr*280).toLocaleString()} | {p.size} | {p.color}</div></div></div>)}
</div>
</>}
</div>
</div></div>
);
}
