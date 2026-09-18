"use client";
import {useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://rlsmcomxugstuoerdam.supabase.co","sb_publishable_mxCJKSppCAnMe6SwT7tbiQ_4dlOy122");
const LOGO="/k-logo.png";
const PKR=(d:number)=>`Rs. ${(d*280).toLocaleString()}`;
const ALL=[
{id:1,n:"Silk Blazer",pr:189,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Male T-Shirt",pr:45,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
{id:4,n:"Male Cap",pr:25,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"},
{id:5,n:"Male Slippers",pr:35,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:6,n:"Men Perfume",pr:85,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"},
{id:7,n:"Pants",pr:65,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
{id:8,n:"Shorts",pr:40,cat:"FASHION",sub:"MALE",im:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400"},
{id:9,n:"Female Top",pr:55,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
{id:10,n:"Bra",pr:30,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1620799139507-715043871744?w=400"},
{id:11,n:"Inner Wear",pr:28,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400"},
{id:12,n:"Earrings",pr:40,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"},
{id:13,n:"Chain",pr:70,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"},
{id:14,n:"Bracelet",pr:35,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"},
{id:15,n:"Sandals",pr:50,cat:"FASHION",sub:"FEMALE",im:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"},
{id:16,n:"Boy T-Shirt",pr:25,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400"},
{id:17,n:"Boy Jeans",pr:40,cat:"FASHION",sub:"BOY",im:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"},
{id:18,n:"Girl Dress",pr:45,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"},
{id:19,n:"Girl Top",pr:30,cat:"FASHION",sub:"GIRL",im:"https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400"},
{id:20,n:"Hoodie Unisex",pr:89,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
{id:21,n:"Sneakers Unisex",pr:120,cat:"FASHION",sub:"UNISEX",im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400"},
{id:22,n:"Lipstick",pr:25,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"},
{id:23,n:"Makeup Kit",pr:95,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"},
{id:24,n:"Foundation",pr:40,cat:"BEAUTY",sub:"MAKEUP",im:"https://images.unsplash.com/photo-1557205465-f3768edea7d6?w=400"},
{id:25,n:"Decor Lamp",pr:75,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"},
{id:26,n:"Vase Decor",pr:55,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1578500351865-d6c3706f46a4?w=400"},
{id:27,n:"Wall Art",pr:65,cat:"HOME",sub:"DECOR",im:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400"},
];
const REELS=[
{id:1,shop:"Hadi Luxury",likes:234,im:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",desc:"New Fall Drop 🔥"},
{id:2,shop:"Sukkur Fashion",likes:189,im:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",desc:"Luxury Blazer"},
{id:3,shop:"KAIHA Official",likes:542,im:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",desc:"Evening Collection"},
];
export default function Home(){
const [pg,setPg]=useState("home");const [mn,setMn]=useState(false);const [cart,setCart]=useState<any[]>([]);const [user,setUser]=useState<any>(null);const [accounts,setAccounts]=useState<any[]>([]);const [showLogin,setShowLogin]=useState(false);const [form,setForm]=useState({name:"",gmail:"",phone:""});const [otp,setOtp]=useState("");const [step,setStep]=useState(1);const [loading,setLoading]=useState(false);const [mainCat,setMainCat]=useState("FASHION");const [subCat,setSubCat]=useState("MALE");const [q,setQ]=useState("");const [sellerProds,setSellerProds]=useState<any[]>([]);const [reels,setReels]=useState<any[]>(REELS);const [comment,setComment]=useState("");
useEffect(()=>{
const a=localStorage.getItem("kaiha_acc");if(a)setAccounts(JSON.parse(a));
const s=localStorage.getItem("kaiha_user");if(s)setUser(JSON.parse(s));else setShowLogin(true);
const sp=localStorage.getItem("kaiha_all_products");if(sp){const parsed=JSON.parse(sp);const live=parsed.filter((p:any)=>p.isOpen!==false&&(p.stock===undefined||p.stock>0));setSellerProds(live);}
const sr=localStorage.getItem("kaiha_reels");if(sr)setReels(JSON.parse(sr));
},[]);
const requireLogin=(fn:any)=>{if(!user){setShowLogin(true);setStep(1);return;}fn();};
const sendOtp=async()=>{
if(!form.name||!form.gmail)return alert("fill all");setLoading(true);
try{const {error}=await supabase.auth.signInWithOtp({email:form.gmail,options:{data:{full_name:form.name}}});if(error)throw error;setLoading(false);setStep(2);alert("OTP sent to "+form.gmail);}
catch(e:any){const localOtp=Math.floor(100000+Math.random()*900000).toString();localStorage.setItem("kaiha_local_otp",localOtp);setLoading(false);setStep(2);alert("OTP Local: "+localOtp+" or 123456");}
};
const verifyOtp=async()=>{
setLoading(true);const localOtp=localStorage.getItem("kaiha_local_otp");
if((localOtp&&otp===localOtp)||otp==="123456"){
const u={...form,id:Date.now()};const n=[...accounts,u];setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setShowLogin(false);setLoading(false);return;
}
try{const {error}=await supabase.auth.verifyOtp({email:form.gmail,token:otp,type:'email'});if(error)throw error;const u={...form,id:Date.now()};const n=[...accounts,u];setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setShowLogin(false);setLoading(false);}
catch(err:any){setLoading(false);if(otp==="123456"||otp===localStorage.getItem("kaiha_local_otp")){const u={...form,id:Date.now()};const n=[...accounts,u];setAccounts(n);localStorage.setItem("kaiha_acc",JSON.stringify(n));localStorage.setItem("kaiha_user",JSON.stringify(u));setUser(u);setShowLogin(false);}else alert("Wrong OTP! "+(localStorage.getItem("kaiha_local_otp")||"123456"));}
};
const add=(p:any)=>requireLogin(()=>setCart(c=>[...c,{...p,aid:Date.now()}]));const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);
const likeReel=(id:number)=>{const upd=reels.map(r=>r.id===id?{...r,likes:r.likes+1,liked:!r.liked}:r);setReels(upd);localStorage.setItem("kaiha_reels",JSON.stringify(upd));};
const allProducts=[...ALL,...sellerProds];
const filtered=allProducts.filter(p=>{
if(q){return p.n.toLowerCase().includes(q.toLowerCase());}
if(p.shopCat&&p.shopCat!==mainCat)return false;
if(mainCat==="FASHION")return p.cat==="FASHION"&&p.sub===subCat;
return p.cat===mainCat;
});
return(<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');.page{animation:fadeUp 0.45s ease}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
 <div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",zIndex:20}}><div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}><img src={LOGO} style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.38em",fontSize:"19px",fontFamily:"Montserrat"}}>KAIHA</span></div><button onClick={()=>setMn(!mn)} style={{background:"#222",border:"1px solid #D4B78F55",borderRadius:"8px",display:"flex",flexDirection:"column",gap:"5px",width:"40px",height:"36px",justifyContent:"center",alignItems:"center",zIndex:100}}><span style={{width:"20px",height:"2.5px",background:"#D4B78F",display:"block",transform:mn?"rotate(45deg) translate(4px,4px)":"none"}}></span><span style={{width:"20px",height:"2.5px",background:"#D4B78F",display:"block",opacity:mn?0:1}}></span><span style={{width:"20px",height:"2.5px",background:"#D4B78F",display:"block",transform:mn?"rotate(-45deg) translate(4px,-4px)":"none"}}></span></button></div>
{mn&&<div style={{position:"fixed",inset:0,zIndex:999,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"78%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#D4B78F",fontWeight:"800"}}>KAIHA MENU</span><button onClick={()=>setMn(false)} style={{width:"32px",height:"32px",border:"1px solid #D4B78F44",borderRadius:"999px",background:"none",color:"#D4B78F"}}>✕</button></div>{[{l:"Home",v:"home"},{l:"Shop",v:"category"},{l:"KAIHA TV - Reels",v:"reels"},{l:"Bag",v:"bag"},{l:"Profile",v:"profile"}].map((it:any)=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}} style={{padding:"14px",borderRadius:"10px",border:"1px solid #222",marginTop:"10px",color:pg===it.v?"#D4B78F":"#ccc",cursor:"pointer"}}>{it.l}</div>)}</div></div>}
{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/>{q&&<span onClick={()=>setQ("")} style={{color:"#888"}}>✕</span>}</div></div>
{/* SAME HEIGHT 185px - NOT CROPPED */}
<div onClick={()=>requireLogin(()=>setPg("category"))} style={{margin:"14px 16px",borderRadius:"22px",height:"185px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222",cursor:"pointer"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"58%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 68%,rgba(10,10,10,0.3) 85%,transparent)"}}/>
<div style={{position:"relative",padding:"18px 20px",width:"60%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
<div style={{color:"#D4B78F",fontSize:"10px",letterSpacing:"0.35em",fontWeight:"700"}}>NEW ARRIVALS</div>
<div style={{fontSize:"26px",fontFamily:"serif",marginTop:"6px",lineHeight:"1.1"}}>Fall Collection<br/>2026</div>
<div style={{marginTop:"14px"}}><button style={{background:"#D4B78F",color:"#000",border:"none",padding:"9px 16px",borderRadius:"999px",fontSize:"10px",fontWeight:"800",display:"inline-block"}}>SHOP NOW →</button></div>
</div>
</div>
<div style={{display:"flex",gap:"8px",padding:"8px 16px",overflowX:"auto"}}>{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>{setMainCat(c);setPg("category")}} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #D4B78F44",borderRadius:"999px",padding:"9px 18px",fontSize:"10px",fontWeight:"800",whiteSpace:"nowrap"}}>{c}</button>)}</div>
{mainCat==="FASHION"&&<div style={{display:"flex",gap:"7px",padding:"0 16px 12px",overflowX:"auto"}}>{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>{setSubCat(s);setPg("category")}} style={{background:subCat===s?"#fff":"#0a0a0a",color:subCat===s?"#000":"#aaa",border:"1px solid #333",borderRadius:"999px",padding:"7px 14px",fontSize:"9px",whiteSpace:"nowrap"}}>{s}</button>)}</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",padding:"0 16px 16px"}}>{filtered.slice(0,6).map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"18px",padding:"8px",border:"1px solid #222"}}><div style={{position:"relative"}}><img src={p.im} style={{width:"100%",height:"155px",borderRadius:"14px",objectFit:"cover"}}/><div style={{position:"absolute",top:"7px",left:"7px",background:p.shopName?"#4CAF50":"#D4B78F",color:p.shopName?"#fff":"#000",fontSize:"7px",padding:"4px 8px",borderRadius:"999px",fontWeight:"800"}}>{p.shopName||p.sub}</div></div><div style={{fontSize:"12px",marginTop:"10px",fontWeight:"700"}}>{p.n}</div><div style={{fontSize:"7px",color:"#666"}}>{p.sub}</div><div style={{fontSize:"11px",color:"#D4B78F",marginTop:"3px"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"10px",border:"1px solid #D4B78F99",background:"none",color:"#D4B78F",borderRadius:"999px",padding:"10px",fontSize:"10px",fontWeight:"700"}}>ADD TO BAG</button></div>)}</div>
</div>}
{pg==="reels"&&<div className="page" style={{padding:"0"}}>
<div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{color:"#D4B78F",fontSize:"18px"}}>KAIHA TV</b><label style={{background:"#D4B78F",color:"#000",borderRadius:"999px",padding:"8px 14px",fontSize:"10px",fontWeight:"800"}}> + UPLOAD REEL<input type="file" accept="image/*,video/*" style={{display:"none"}} onChange={(e:any)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const newReel={id:Date.now(),shop:user?.name||"You",likes:0,im:r.result as string,desc:"My New Reel"};const upd=[newReel,...reels];setReels(upd);localStorage.setItem("kaiha_reels",JSON.stringify(upd));};r.readAsDataURL(f);}}/></label></div>
<div style={{height:"72vh",overflowY:"scroll",scrollSnapType:"y mandatory",padding:"0 8px"}}>
{reels.map((reel:any)=><div key={reel.id} style={{height:"68vh",scrollSnapAlign:"start",position:"relative",margin:"8px 6px",borderRadius:"20px",overflow:"hidden",background:"#111"}}>
<img src={reel.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,0.9))",padding:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
<div><div style={{fontWeight:"800",fontSize:"13px"}}>@{reel.shop}</div><div style={{fontSize:"11px",marginTop:"4px"}}>{reel.desc}</div><div style={{display:"flex",gap:"8px",marginTop:"8px"}}><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Comment..." style={{background:"rgba(255,255,255,0.15)",border:"1px solid #333",borderRadius:"999px",padding:"6px 12px",color:"#fff",fontSize:"10px",width:"140px"}}/><button style={{background:"#D4B78F",color:"#000",border:"none",borderRadius:"999px",padding:"6px 12px",fontSize:"10px"}}>Post</button></div></div>
<div style={{display:"flex",flexDirection:"column",gap:"14px",alignItems:"center"}}>
<button onClick={()=>likeReel(reel.id)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"999px",width:"44px",height:"44px",color:reel.liked?"#ff3040":"#fff",fontSize:"18px"}}>{reel.liked?"♥":"♡"}<div style={{fontSize:"9px"}}>{reel.likes}</div></button>
<button onClick={()=>alert("Link copied! Share")} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"999px",width:"44px",height:"44px",color:"#fff"}}>↗<div style={{fontSize:"8px"}}>Share</div></button>
</div>
</div>
</div>
</div>)}
</div>
</div>}
{pg==="category"&&<div className="page" style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>{mainCat} {mainCat==="FASHION"?`- ${subCat}`:""} ({filtered.length})</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px"}}>← Back</span></div><div style={{display:"flex",gap:"8px",marginTop:"14px",overflowX:"auto"}}>{["FASHION","BEAUTY","HOME"].map(c=><button key={c} onClick={()=>setMainCat(c)} style={{background:mainCat===c?"#D4B78F":"#141414",color:mainCat===c?"#000":"#fff",border:"1px solid #333",borderRadius:"999px",padding:"8px 16px",fontSize:"10px",fontWeight:"700"}}>{c}</button>)}</div>{mainCat==="FASHION"&&<div style={{display:"flex",gap:"7px",marginTop:"12px",overflowX:"auto"}}>{["MALE","FEMALE","BOY","GIRL","UNISEX"].map(s=><button key={s} onClick={()=>setSubCat(s)} style={{background:subCat===s?"#fff":"#222",color:subCat===s?"#000":"#aaa",border:"1px solid #333",borderRadius:"999px",padding:"7px 14px",fontSize:"9px"}}>{s}</button>)}</div>}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"16px"}}>{filtered.map((p:any)=><div key={p.id} style={{background:"#141414",borderRadius:"18px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"145px",borderRadius:"12px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"8px",fontWeight:"700"}}>{p.n}</div><div style={{fontSize:"10px",color:"#D4B78F",marginTop:"3px"}}>{PKR(p.pr)}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"8px",background:"#D4B78F",border:"none",borderRadius:"999px",padding:"8px",fontSize:"10px",fontWeight:"800"}}>ADD TO BAG</button></div>)}</div></div>}
{pg==="bag"&&<div className="page" style={{padding:"16px"}}><b>Bag ({cart.length}) {PKR(tot)}</b>{cart.length===0?<div style={{color:"#888",marginTop:"30px",textAlign:"center"}}>Your bag is empty</div>:cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",marginTop:"10px",border:"1px solid #222"}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px"}}/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{fontSize:"10px",color:"#D4B78F"}}>{PKR(c.pr)}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>✕</button></div>)}</div>}
{pg==="profile"&&<div className="page" style={{padding:"18px"}}><div style={{textAlign:"center"}}><div style={{width:"64px",height:"64px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",border:"1px solid #D4B78F44"}}>{user?.name?.[0]||"H"}</div><div style={{marginTop:"8px",fontWeight:"700"}}>{user?.name||"Guest"}</div><div style={{color:"#888",fontSize:"10px"}}>{user?.gmail||"Login required"}</div></div><div style={{marginTop:"16px"}}><b>Accounts ({accounts.length})</b>{accounts.map((a:any,i:number)=><div key={i} onClick={()=>{localStorage.setItem("kaiha_user",JSON.stringify(a));setUser(a)}} style={{background:user?.id===a.id?"#1a1a1a":"#141414",border:"1px solid #222",borderRadius:"10px",padding:"10px",marginTop:"8px",display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:"12px"}}>{a.name}</div><div style={{fontSize:"9px",color:"#888"}}>{a.gmail}</div></div><div style={{fontSize:"10px",color:user?.id===a.id?"#D4B78F":"#666"}}>{user?.id===a.id?"Active":"Switch"}</div></div>)}</div><div style={{display:"flex",gap:"8px",marginTop:"16px"}}><button onClick={()=>{setShowLogin(true);setStep(1)}} style={{flex:1,background:"#D4B78F",color:"#000",border:"none",padding:"10px",borderRadius:"999px",fontSize:"11px",fontWeight:"800"}}>+ ADD ACCOUNT</button><button onClick={()=>{localStorage.removeItem("kaiha_user");setUser(null);setShowLogin(true)}} style={{flex:1,background:"#222",border:"1px solid #333",color:"#fff",padding:"10px",borderRadius:"999px",fontSize:"11px"}}>Logout</button></div></div>}
<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("category")} style={{color:pg==="category"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Shop</span></div>
<div onClick={()=>setPg("reels")} style={{color:pg==="reels"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Reels</span></div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Bag {cart.length>0?`(${cart.length})`:""}</span></div>
<div onClick={()=>setPg("profile")} style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><span style={{fontSize:"9px"}}>Profile</span></div>
</div>
{showLogin&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:"#141414",borderRadius:"16px",padding:"18px",width:"100%",maxWidth:"320px",border:"1px solid #D4B78F44"}}>{step===1?<><div style={{textAlign:"center",color:"#D4B78F",letterSpacing:"0.3em",fontSize:"12px"}}>KAIHA SECURE</div><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"12px"}}/><input value={form.gmail} onChange={e=>setForm({...form,gmail:e.target.value})} placeholder="Gmail for OTP" style={{width:"100%",background:"#0a0a0a",border:"1px solid #333",borderRadius:"8px",padding:"10px",color:"#fff",marginTop:"8px"}}/><button onClick={sendOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>{loading?"SENDING...":"SEND OTP"}</button></>:<><div style={{textAlign:"center",color:"#D4B78F"}}>OTP: {typeof window!=="undefined"?localStorage.getItem("kaiha_local_otp")||"123456":""}</div><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" maxLength={6} style={{width:"100%",background:"#0a0a0a",border:"1px solid #D4B78F66",borderRadius:"8px",padding:"12px",color:"#fff",marginTop:"12px",textAlign:"center",letterSpacing:"0.3em"}}/><button onClick={verifyOtp} disabled={loading} style={{width:"100%",marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"11px",borderRadius:"999px",fontWeight:"800"}}>VERIFY</button><button onClick={()=>setStep(1)} style={{width:"100%",marginTop:"8px",background:"none",border:"1px solid #333",color:"#888",padding:"9px",borderRadius:"999px"}}>Back</button></>}</div></div>}
</div></div>
);
}
