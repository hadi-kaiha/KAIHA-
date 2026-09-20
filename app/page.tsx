"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoeurdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const PKR=(d:number)=>`Rs. ${Number(d).toLocaleString()}`;
const ALL=[
{id:1,n:"Silk Blazer",pr:5490,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",colors:["#000","#D4B78F"],sizes:["M","L","XL"]},
{id:2,n:"Leather Bag",pr:6990,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",colors:["#8B4513","#000"],sizes:["Free"]},
{id:3,n:"Male T-Shirt",pr:1290,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",colors:["#000","#fff"],sizes:["M","L","XL"]},
{id:4,n:"Male Cap",pr:750,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",colors:["#000"],sizes:["Free"]},
{id:5,n:"Male Slippers",pr:990,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400",colors:["#000"],sizes:["40","41","42"]},
{id:6,n:"Men Perfume",pr:2490,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",colors:["#000"],sizes:["Free"]},
{id:7,n:"Pants",pr:1890,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",colors:["#000"],sizes:["M","L"]},
{id:8,n:"Shorts",pr:1190,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",colors:["#000"],sizes:["M","L"]},
{id:9,n:"Female Top",pr:1590,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",colors:["#fff"],sizes:["S","M","L"]},
{id:10,n:"Bra",pr:890,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1620799139507-715043871744?w=400",colors:["#fff"],sizes:["S","M"]},
{id:11,n:"Inner Wear",pr:790,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400",colors:["#fff"],sizes:["Free"]},
{id:12,n:"Earrings",pr:1190,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",colors:["#D4B78F"],sizes:["Free"]},
{id:13,n:"Chain",pr:1990,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",colors:["#D4B78F"],sizes:["Free"]},
{id:14,n:"Bracelet",pr:990,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",colors:["#D4B78F"],sizes:["Free"]},
{id:15,n:"Sandals",pr:1490,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",colors:["#000"],sizes:["36","37"]},
{id:16,n:"Boy T-Shirt",pr:790,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400",colors:["#000"],sizes:["S","M"]},
{id:17,n:"Boy Jeans",pr:1190,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",colors:["#0000ff"],sizes:["28","30"]},
{id:18,n:"Girl Dress",pr:1290,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",colors:["#ff69b4"],sizes:["S","M"]},
{id:19,n:"Girl Top",pr:890,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",colors:["#fff"],sizes:["S","M"]},
{id:20,n:"Hoodie Unisex",pr:2590,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",colors:["#000"],sizes:["M","L"]},
{id:21,n:"Sneakers Unisex",pr:3490,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400",colors:["#fff"],sizes:["40","41"]},
{id:22,n:"Lipstick",pr:750,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",colors:["#ff0000"],sizes:["Free"]},
{id:23,n:"Makeup Kit",pr:2790,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",colors:["#000"],sizes:["Free"]},
{id:24,n:"Foundation",pr:1190,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1557205465-f3768edea7d6?w=400",colors:["#D4B78F"],sizes:["Free"]},
{id:25,n:"Decor Lamp",pr:2190,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",colors:["#D4B78F"],sizes:["Free"]},
{id:26,n:"Vase Decor",pr:1590,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1578500351865-d6c3706f46a4?w=400",colors:["#fff"],sizes:["Free"]},
{id:27,n:"Wall Art",pr:1890,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400",colors:["#000"],sizes:["Free"]},
];
const REELS=[
{id:1,shop:"Hadi Luxury",likes:234,im:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",desc:"New Fall Drop 🔥"},
{id:2,shop:"Sukkur Fashion",likes:189,im:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",desc:"Luxury Blazer"},
{id:3,shop:"KAIHA Official",likes:542,im:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",desc:"Evening Collection"},
];
export default function Home(){
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);const [form,setForm]=useState({name:"",gmail:"",phone:""});const [otp,setOtp]=useState("");const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);const [mainCat,setMainCat]=useState("FASHION");const [subCat,setSubCat]=useState("MALE");const [q,setQ]=useState("");const [sellerProds,setSellerProds]=useState<any[]>([]);const [reels,setReels]=useState<any[]>(REELS);
 const [showOptions,setShowOptions]=useState<any>(null);const [selSize,setSelSize]=useState("M");const [selColor,setSelColor]=useState("#000");const [selQty,setSelQty]=useState(1);const [showCheckout,setShowCheckout]=useState(false);const [payType,setPayType]=useState("COD");const [buyerPhone,setBuyerPhone]=useState("");const [buyerName,setBuyerName]=useState("");const [locText,setLocText]=useState("");const [locLat,setLocLat]=useState<any>(null);const [locLng,setLocLng]=useState<any>(null);const [phoneOtp,setPhoneOtp]=useState("");const [phoneOtpSent,setPhoneOtpSent]=useState(false);
const [tvReels,setTvReels]=useState<any[]>([]); const [tvTitle,setTvTitle]=useState(""); const [tvFile,setTvFile]=useState<File|null>(null); const [tvUp,setTvUp]=useState(false); const [cmt,setCmt]=useState<{[key:number]:string}>({});
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");if(s){const u=JSON.parse(s);setUser(u);setBuyerName(u.name);setBuyerPhone(u.phone);}else setShowLogin(true);
const sr=localStorage.getItem("kaiha_reels");if(sr)setReels(JSON.parse(sr));
fetchHybrid(); fetchTv();
const ch=supabase.channel("prod-live").on("postgres_changes",{event:"*",schema:"public",table:"products"},()=>fetchHybrid()).subscribe();
const ch2=supabase.channel("tv-live").on("postgres_changes",{event:"*",schema:"public",table:"kaiha_tv_reels"},()=>fetchTv()).subscribe();
return()=>{supabase.removeChannel(ch); supabase.removeChannel(ch2);}
},[]);
const fetchHybrid=async()=>{
 try{
  const {data,error}=await supabase.from("products").select("*").order("created_at",{ascending:false});
  if(error) throw error;
  const supa=(data||[]).map((d:any)=>({id:100000+d.id,n:d.name,pr:d.price,cat:(d.category||"FASHION").toUpperCase(),sub:(d.subcategory||"MALE").toUpperCase(),im:d.image_url||"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",colors:d.colors? (typeof d.colors==='string'? d.colors.split(','):d.colors):["#000","#D4B78F"],sizes:d.sizes? (typeof d.sizes==='string'? d.sizes.split(','):d.sizes):["M","L","XL"],shopName:d.shop_name||"KAIHA Seller",shopCat:(d.category||"FASHION").toUpperCase()}));
  setSellerProds(supa);
 }catch(e){console.log(e)}
};
const fetchTv=async()=>{
 const {data}=await supabase.from("kaiha_tv_reels").select("*").order("created_at",{ascending:false});
 if(data) setTvReels(data);
};
const uploadTv=async()=>{
 if(!user) {setShowLogin(true); return;}
 if(!tvFile||!tvTitle) return alert("Title + Video chahiye");
 setTvUp(true);
 try{
  const fn=Date.now()+"_"+tvFile.name;
  const {error}=await supabase.storage.from("kaiha-tv").upload(fn,tvFile);
  if(error) throw error;
  const {data}=supabase.storage.from("kaiha-tv").getPublicUrl(fn);
  await supabase.from("kaiha_tv_reels").insert({title:tvTitle, video_url:data.publicUrl, uploader_name:user?.name||"Customer", likes:0});
  alert("Uploaded ✅"); setTvTitle(""); setTvFile(null); fetchTv();
 }catch(e:any){alert(e.message)}
 setTvUp(false);
};
const likeTv=async(r:any)=>{
 const nl=(r.likes||0)+1;
 await supabase.from("kaiha_tv_reels").update({likes:nl}).eq("id",r.id);
 fetchTv();
};
 const requireLogin=(fn:any)=>{if(!user){setShowLogin(true);setStep(1);return;}fn();};
const sendOtp=async()=>{
if(!form.name||!form.gmail||!form.phone)return alert("fill all");setLoading(true);
const o=Math.floor(100000+Math.random()*900000).toString();localStorage.setItem("kaiha_local_otp",o);setLoading(false);setStep(2);alert("OTP: "+o+" or 123456");
};
const verifyOtp=async()=>{
setLoading(true);const lo=localStorage.getItem("kaiha_local_otp");
if((lo&&otp===lo)||otp==="123456"){
const u={...form,id:Date.now(),coins:250,loginId:"KAIHA-"+Math.floor(10000+Math.random()*90000)};const n=[...accounts,u];setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setBuyerName(u.name);setBuyerPhone(u.phone);setShowLogin(false);setLoading(false);return;
}else{setLoading(false);alert("Wrong OTP");}
};
const openOptions=(p:any)=>{requireLogin(()=>{setShowOptions(p);setSelSize(p.sizes?.[0]||"M");setSelColor(p.colors?.[0]||"#000");setSelQty(1);});};
const confirmAdd=()=>{if(!showOptions)return;const item={...showOptions,aid:Date.now(),selSize,selColor,qty:selQty,finalPr:showOptions.pr};setCart(c=>[...c,item]);setShowOptions(null);setPg("bag");};
const tot=cart.reduce((s:any,i:any)=>s+(i.pr||i.finalPr)*i.qty,0);
const getCurrentLoc=()=>{navigator.geolocation.getCurrentPosition((pos)=>{setLocLat(pos.coords.latitude);setLocLng(pos.coords.longitude);setLocText(`Lat:${pos.coords.latitude.toFixed(4)} Lng:${pos.coords.longitude.toFixed(4)} - Current`);});};
const sendPhoneOtp=()=>{if(!buyerPhone)return alert("Phone dalo");const o=Math.floor(100000+Math.random()*900000).toString();localStorage.setItem("kaiha_phone_otp",o);setPhoneOtpSent(true);alert(`OTP: ${o} (123456 works)`);};
const placeOrder=async()=>{if(!buyerName||!buyerPhone||!locText)return alert("Name Phone Location zaruri");if(!phoneOtpSent)return alert("Pehle OTP send karo");const so=localStorage.getItem("kaiha_phone_otp");if(phoneOtp!==so&&phoneOtp!=="123456")return alert("Wrong OTP");if(cart.length===0)return alert("Bag empty");setLoading(true);try{for(let c of cart){await supabase.from("orders").insert({buyer_name:buyerName,buyer_phone:buyerPhone,buyer_gmail:user?.gmail,location_text:locText,location_lat:locLat,location_lng:locLng,product_name:c.n,product_image:c.im,quantity:c.qty,size:c.selSize,color:c.selColor,price:(c.finalPr||c.pr)*c.qty,payment_type:payType,status:"PENDING",seller_name:c.shopName});}setCart([]);setShowCheckout(false);setLoading(false);alert(`✅ Order Placed! ${payType==="ONLINE"?"03320821575 pe bhejo":"Rider ayega"}`);setPg("home");}catch(e:any){setLoading(false);alert(e.message);}};
const likeReel=(id:number)=>{const upd=reels.map(r=>r.id===id?{...r,likes:r.likes+1,liked:!r.liked}:r);setReels(upd);localStorage.setItem("kaiha_reels",JSON.stringify(upd));};
const allProducts=[...sellerProds,...ALL];
const filtered=allProducts.filter(p=>{if(q){return p.n.toLowerCase().includes(q.toLowerCase());}if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;return p.cat===mainCat;});
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes kaihaIn{0%{max-width:0;opacity:0}100%{max-width:135px;opacity:1}}
@keyframes slideMenu{from{transform:translateX(100%)}to{transform:translateX(0)}}
.page{animation:fadeUp 0.45s ease}.kaihaOnce{animation:kaihaIn 0.9s forwards;display:inline-block;overflow:hidden;white-space:nowrap;max-width:0;opacity:0}`}</style>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} alt="K" style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/>
<span className={pg==="home"?"kaihaOnce":""} style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px",fontFamily:"Montserrat"}}>KAIHA</span></div>
<button onClick={()=>setMn(!mn)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transition:"all 0.3s",transform:mn?"rotate(45deg) translate(5px,5px)":"none"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transition:"all 0.2s",opacity:mn?0:1}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transition:"all 0.3s",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none"}}></span>
</button></div>
{mn&&<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",justifyContent:"flex-end"}}>
<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)"}} onClick={()=>setMn(false)}/>
<div style={{position:"relative",width:"82%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",animation:"slideMenu 0.35s ease"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px"}}><img src={LOGO} style={{height:"42px",width:"42px",objectFit:"contain",borderRadius:"10px"}}/><div><div style={{color:"#D4B78F",fontWeight:"800",letterSpacing:"0.3em",fontSize:"14px"}}>KAIHA</div><div style={{fontSize:"9px",color:"#888"}}>LUXURY • SUKKUR</div></div><button onClick={()=>setMn(false)} style={{marginLeft:"auto",width:"32px",height:"32px",border:"1px solid #D4B78F44",borderRadius:"999px",background:"none",color:"#D4B78F"}}>✕</button></div>
<div style={{marginTop:"18px"}}>{[{l:"Home",v:"home"},{l:"Shop",v:"category"},{l:"KAIHA TV",v:"reels"},{l:"Bag",v:"bag"},{l:"Profile",v:"profile"}].map((it:any)=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}} style={{padding:"14px",borderRadius:"12px",border:"1px solid #222",marginTop:"10px",color:pg===it.v?"#D4B78F":"#ccc",display:"flex",justifyContent:"space-between"}}><span>{it.l}</span><span>→</span></div>)}</div></div></div>}
{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/>{q&&<span onClick={()=>setQ("")} style={{color:"#888"}}>✕</span>}</div></div>
<div onClick={()=>requireLogin(()=>setPg("category"))} style={{margin:"14px 16px",borderRadius:"22px",height:"185px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222",cursor:"pointer"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"58%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 68%,rgba(10,10,10,0.3) 85%,transparent)"}}/>
<div style={{position:"relative",padding:"18px 20px",width:"60%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
<div style={{color:"#D4B78F",fontSize:"10px",letterSpacing:"0.35em",fontWeight:"700"}}>NEW ARRIVALS</div>
<div style={{fontSize:"26px",fontFamily:"serif",marginTop:"6px",lineHeight:"1.1"}}>Fall Collection<br/>2026</div>
<div style={{marginTop:"14px"}}><button style={{background:"#D4B78F",color:"#000",border:"none",padding:"9px 16px",borderRadius:"999px",fontSize:"10px",fontWeight:"800"}}>SHOP NOW →</button></div>
</div>
</div>
<div style={{display:"flex",gap:"8px",padding:"8px 16px",overflowX:"auto"}}>{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>{setMainCat(c);setPg("category")}} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #D4B78F44",borderRadius:"999px",padding:"9px 18px",fontSize:"10px",fontWeight:"800",whiteSpace:"nowrap"}}>{c}</button>)}</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"7px",padding:"0 16px 12px",overflowX:"auto"}}>{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>{setSubCat(s);setPg("category")}} style={{background:subCat===s?"#fff":"#0a0a0a",color:subCat===s?"#000":"#aaa",border:"1px solid #333",borderRadius:"999px",padding:"7px 14px",fontSize:"9px",whiteSpace:"nowrap"}}>{s}</button>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>{filtered.slice(0,20).map((p:any)=>{const isFake=!p.shopName;return(<div key={p.id} style={{background:"#141414",borderRadius:"18px",padding:"8px",border:"1px solid #222",opacity:isFake?0.6:1}}><div style={{position:"relative"}}><img src={p.im} style={{width:"100%",height:"155px",borderRadius:"14px",objectFit:"cover",filter:isFake?"grayscale(0.6)":"none"}}/>{isFake&&<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#FF0000",color:"#fff",fontSize:"11px",padding:"5px 12px",borderRadius:"999px",fontWeight:"800"}}>SOLD</div>}<div style={{position:"absolute",top:"7px",left:"7px",background:isFake?"#FF0000":p.shopName?"#4CAF50":"#D4B78F",color:p.shopName?"#fff":"#000",fontSize:"7px",padding:"4px 8px",borderRadius:"999px",fontWeight:"800"}}>{isFake?"SOLD":p.shopName||p.sub}</div></div><div style={{fontSize:"12px",marginTop:"10px",fontWeight:"700"}}>{p.n}</div><div style={{fontSize:"7px",color:"#666"}}>{p.sub}</div><div style={{fontSize:"11px",color:"#D4B78F",marginTop:"3px"}}>{PKR(p.pr)}</div>{isFake?<button disabled style={{width:"100%",marginTop:"10px",background:"#222",color:"#666",border:"1px solid #333",borderRadius:"999px",padding:"10px",fontSize:"10px",fontWeight:"700"}}>SOLD OUT</button>:<button onClick={()=>openOptions(p)} style={{width:"100%",marginTop:"10px",border:"1px solid #D4B78F99",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"10px",fontSize:"10px",fontWeight:"700"}}>ADD TO BAG</button>}</div>)})}</div>
</div>}
 {pg==="reels"&&<div className="page" style={{background:"#000",height:"calc(100vh - 130px)",overflow:"hidden",position:"relative"}}>
{/* TOP BAR */}
<div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"absolute",top:0,left:0,right:0,zIndex:10,background:"linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)"}}>
<b style={{color:"#D4B78F",letterSpacing:"0.2em"}}>KAIHA TV 📺</b>
<button onClick={()=>{const el=document.getElementById("uploadBox"); if(el) el.style.display=el.style.display==="none"?"block":"none"}} style={{background:"#D4B78F",color:"#000",border:"none",padding:"6px 14px",borderRadius:"999px",fontSize:"10px",fontWeight:"800"}}>+ UPLOAD</button>
</div>

{/* UPLOAD BOX - HIDDEN BY DEFAULT */}
<div id="uploadBox" style={{display:"none",position:"absolute",top:"50px",left:"16px",right:"16px",background:"#141414",border:"1px solid #D4B78F55",borderRadius:"14px",padding:"12px",zIndex:20}}>
<div style={{fontSize:"10px",color:"#D4B78F",fontWeight:"800"}}>UPLOAD REEL</div>
<input value={tvTitle} onChange={e=>setTvTitle(e.target.value)} placeholder="Title..." style={{width:"100%",marginTop:"8px",padding:"10px",background:"#000",color:"#fff",border:"1px solid #333",borderRadius:"8px",fontSize:"12px"}}/>
<input type="file" accept="video/*" onChange={e=>setTvFile(e.target.files?.[0]||null)} style={{width:"100%",marginTop:"8px",fontSize:"10px",color:"#888"}}/>
<button onClick={uploadTv} disabled={tvUp} style={{width:"100%",marginTop:"10px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800",fontSize:"11px"}}>{tvUp?"UPLOADING...":"UPLOAD"}</button>
</div>

{/* REELS SCROLL CONTAINER - TIKTOK STYLE */}
<div style={{height:"100%",overflowY:"scroll",scrollSnapType:"y mandatory",scrollbarWidth:"none"}}>
{tvReels.length===0? (
<div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",scrollSnapAlign:"start"}}>
<div style={{fontSize:"40px"}}>📺</div>
<div style={{color:"#888",marginTop:"10px",fontSize:"13px"}}>No Reels Yet</div>
<div style={{color:"#555",fontSize:"10px",marginTop:"4px"}}>Be the first to upload!</div>
{/* DUMMY REELS SHOW KARO JAB TAK REAL NA HO */}
{reels.map((r:any)=>(
<div key={r.id} style={{width:"100%",height:"100%",position:"relative",scrollSnapAlign:"start",background:"#000",flexShrink:0}}>
<img src={r.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px",background:"linear-gradient(to top, rgba(0,0,0,0.9), transparent)"}}>
<div style={{fontSize:"13px",fontWeight:"700"}}>@{r.shop}</div>
<div style={{fontSize:"11px",color:"#ccc",marginTop:"3px"}}>{r.desc}</div>
</div>
<div style={{position:"absolute",right:"12px",bottom:"80px",display:"flex",flexDirection:"column",gap:"18px",alignItems:"center"}}>
<button onClick={()=>likeReel(r.id)} style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:r.liked?"#ff3040":"#fff",fontSize:"20px"}}>♥</button>
<div style={{fontSize:"10px",color:"#fff",marginTop:"-12px"}}>{r.likes}</div>
<button style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:"#fff"}}>💬</button>
<button style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:"#fff"}}>↗</button>
</div>
</div>
))}
</div>
) : (
tvReels.map((r:any)=>(
<div key={r.id} style={{width:"100%",height:"100%",position:"relative",scrollSnapAlign:"start",background:"#000",flexShrink:0}}>
<video src={r.video_url} autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover"}} onClick={e=>{const v=e.target as HTMLVideoElement; if(v.paused) v.play(); else v.pause();}}/>
<div style={{position:"absolute",bottom:0,left:0,right:"70px",padding:"16px",background:"linear-gradient(to top, rgba(0,0,0,0.9), transparent)"}}>
<div style={{fontSize:"13px",fontWeight:"700"}}>{r.title}</div>
<div style={{fontSize:"10px",color:"#aaa",marginTop:"3px"}}>@{r.uploader_name}</div>
<div style={{display:"flex",gap:"6px",marginTop:"8px",alignItems:"center"}}>
<input value={cmt[r.id]||""} onChange={e=>setCmt({...cmt,[r.id]:e.target.value})} placeholder="Comment..." style={{flex:1,background:"rgba(0,0,0,0.6)",border:"1px solid #333",borderRadius:"999px",padding:"6px 10px",color:"#fff",fontSize:"10px"}}/>
<button onClick={()=>{ if(!cmt[r.id]) return; alert("Comment posted: "+cmt[r.id]); setCmt({...cmt,[r.id]:""}); }} style={{background:"#D4B78F",color:"#000",border:"none",borderRadius:"999px",padding:"6px 10px",fontSize:"10px",fontWeight:"800"}}>Post</button>
</div>
</div>
<div style={{position:"absolute",right:"12px",bottom:"100px",display:"flex",flexDirection:"column",gap:"18px",alignItems:"center"}}>
<button onClick={()=>likeTv(r)} style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:"#ff3040",fontSize:"22px",backdropFilter:"blur(4px)"}}>♥</button>
<div style={{fontSize:"11px",color:"#fff",marginTop:"-12px",fontWeight:"700"}}>{r.likes||0}</div>
<button style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:"#fff",backdropFilter:"blur(4px)"}}>💬</button>
<button style={{background:"rgba(255,255,255,0.15)",border:"none",width:"44px",height:"44px",borderRadius:"999px",color:"#fff",backdropFilter:"blur(4px)"}}>↗</button>
</div>
</div>
))
)}
</div>
</div>}
