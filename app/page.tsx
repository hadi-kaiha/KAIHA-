"use client";
import {useState} from "react";

// K LOGO - STRIPED PURPLE - DIRECT SVG - NO FILE NEEDED - KABHI GAYAB NAHI HOGA!
const KLogo=({s=72}:{s?:number})=>(
<svg width={s} height={s} viewBox="0 0 100 100" style={{borderRadius:"12px",background:"#000"}}>
<defs>
<pattern id="kp" width="6" height="6" patternTransform="rotate(35)" patternUnits="userSpaceOnUse">
<rect width="6" height="6" fill="#6D28D9"/><path d="M0 0 L0 3 M3 0 L3 6" stroke="#A78BFA" strokeWidth="3"/>
</pattern>
</defs>
<path d="M18 8 L18 92 L36 92 L36 58 L30 48 L36 36 L36 8 Z M36 48 L84 8 L68 8 L40 32 Z M36 58 L42 64 L70 92 L86 92 L36 58 Z" fill="url(#kp)" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round"/>
</svg>
);

const P=[
{id:1,n:"Silk Blazer",pr:189,im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",sh:"Luxury"},
{id:2,n:"Leather Bag",pr:245,im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",sh:"Bags"},
{id:3,n:"Denim Jacket",pr:120,im:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",sh:"Essentials"},
{id:4,n:"Evening Dress",pr:320,im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",sh:"Women"},
{id:5,n:"Hoodie",pr:89,im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",sh:"Street"},
{id:6,n:"Sneakers",pr:150,im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200",sh:"Footwear"},
];
export default function Home(){
const [pg,setPg]=useState("home");
const [mn,setMn]=useState(false);
const [cart,setCart]=useState<any[]>([]);
const add=(p:any)=>setCart(c=>[...c,p]);
const total=cart.reduce((s:any,i:any)=>s+i.pr,0);
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
{/* HEADER - K BADA EMBEDDED - KABHI GAYAB NAHI */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a"}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}}>
<KLogo s={72}/>
<span style={{color:"#D4B78F",letterSpacing:"0.45em",fontSize:"18px",fontFamily:"serif"}}>KAIHA</span>
</div>
<button onClick={()=>setMn(true)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",padding:"8px"}}>
<span style={{width:"26px",height:"3px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
<span style={{width:"26px",height:"3px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
<span style={{width:"26px",height:"3px",background:"#D4B78F",borderRadius:"2px",display:"block"}}></span>
</button>
</div>

{pg==="home" && <>
<div style={{padding:"12px 16px"}}>
<div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4B78F" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="m21 21-3.5-3.5"/></svg>
<input placeholder="Search products..." style={{background:"transparent",border:"none",outline:"none",color:"#888",flex:1,fontSize:"12px"}}/>
</div>
</div>
<div onClick={()=>{add(P[0]);add(P[1]);setPg("bag");}} style={{margin:"12px 16px",borderRadius:"14px",height:"155px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222",cursor:"pointer"}}>
<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"60%",height:"100%",objectFit:"cover"}} alt=""/>
<div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 0%,#0a0a0a 55%,transparent 100%)"}}></div>
<div style={{position:"relative",padding:"16px",width:"65%"}}>
<div style={{color:"#D4B78F",fontSize:"10px",fontWeight:"700"}}>NEW ARRIVALS</div>
<div style={{fontSize:"22px",fontFamily:"serif",marginTop:"4px"}}>Fall Collection 2026</div>
<div style={{color:"#999",fontSize:"10px",marginTop:"4px"}}>Luxury. Timeless. Curated.</div>
<button style={{marginTop:"12px",background:"#D4B78F",color:"#000",border:"none",padding:"7px 12px",borderRadius:"4px",fontSize:"9px",fontWeight:"800"}}>SHOP NOW</button>
</div>
</div>
<div style={{padding:"0 16px"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>Shop by Style</b><span onClick={()=>setPg("all")} style={{color:"#D4B78F",fontSize:"11px",cursor:"pointer"}}>See all ›</span></div>
<div style={{display:"flex",gap:"10px",marginTop:"10px",overflowX:"auto"}}>
{P.slice(2,6).map((s:any,i:number)=>(
<div key={i} onClick={()=>setPg("all")} style={{minWidth:"56px",textAlign:"center",cursor:"pointer"}}>
<div style={{width:"56px",height:"56px",borderRadius:"999px",overflow:"hidden",border:"1.5px solid #D4B78F88",background:"#151515"}}><img src={s.im} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/></div>
<div style={{fontSize:"9px",marginTop:"5px",color:"#ccc"}}>{s.sh}</div>
</div>
))}
</div>
</div>
<div style={{padding:"16px 16px 0"}}>
<div style={{display:"flex",justifyContent:"space-between"}}><b>Trending Now</b><span onClick={()=>setPg("all")} style={{color:"#D4B78F",fontSize:"11px",cursor:"pointer"}}>See all ›</span></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"10px"}}>
{P.slice(0,2).map(p=>(
<div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}>
<div style={{height:"150px",borderRadius:"8px",overflow:"hidden",position:"relative"}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/><div style={{position:"absolute",bottom:"8px",left:0,right:0,textAlign:"center"}}><div style={{fontSize:"11px",fontWeight:"600"}}>{p.n}</div><div style={{color:"#D4B78F",fontSize:"10px"}}>${p.pr}</div></div></div>
<button onClick={()=>add(p)} style={{width:"100%",marginTop:"8px",background:"transparent",border:"1px solid #D4B78F99",color:"#D4B78F",borderRadius:"6px",padding:"6px",fontSize:"9px",fontWeight:"700",cursor:"pointer"}}>ADD TO CART</button>
</div>
))}
</div>
</div>
</>}

{pg==="shop" && <div style={{padding:"16px"}}><b>Shops</b><div style={{marginTop:"10px",display:"grid",gap:"8px"}}>{["KAIHA Essentials","KAIHA Luxury","KAIHA Street","KAIHA Bags","KAIHA Footwear","KAIHA Women"].map(s=><div key={s} onClick={()=>setPg("all")} style={{background:"#141414",border:"1px solid #222",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",cursor:"pointer"}}><div><b style={{fontSize:"13px"}}>{s}</b><div style={{color:"#888",fontSize:"10px"}}>20% OFF • Sale</div></div><span style={{color:"#D4B78F"}}>›</span></div>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"12px"}}>{P.map(p=><div key={p.id} style={{background:"#141414",borderRadius:"10px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"110px",objectFit:"cover",borderRadius:"8px"}} alt=""/><div style={{fontSize:"11px",marginTop:"4px"}}>{p.n}</div><div style={{color:"#D4B78F",fontSize:"10px"}}>${p.pr}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",background:"#D4B78F",color:"#000",border:"none",borderRadius:"6px",padding:"6px",fontSize:"9px",fontWeight:"700"}}>ADD</button></div>)}</div></div>}

{pg==="reels" && <div style={{height:"72vh",overflowY:"scroll",scrollSnapType:"y mandatory"}}><div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",position:"sticky",top:0,background:"#0a0a0a",zIndex:2}}><b>KAIHA TV</b><span style={{color:"#D4B78F",fontSize:"11px"}}>Instagram Style</span></div>{P.map(p=><div key={p.id} style={{height:"68vh",scrollSnapAlign:"start",position:"relative",margin:"8px 12px",borderRadius:"16px",overflow:"hidden",background:"#111",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.9),transparent 60%)"}}></div><div style={{position:"absolute",bottom:"16px",left:"16px",right:"16px"}}><b>{p.n}</b><div style={{color:"#D4B78F",fontSize:"11px",marginTop:"4px"}}>${p.pr} • Tap to Shop</div><button onClick={()=>add(p)} style={{marginTop:"8px",background:"#fff",color:"#000",border:"none",padding:"8px 14px",borderRadius:"999px",fontSize:"11px",fontWeight:"700"}}>Add to Bag</button></div><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"56px",height:"56px",background:"rgba(255,255,255,0.25)",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}}>▶</div></div>)}</div>}

{pg==="bag" && <div style={{padding:"16px"}}><b>Bag ({cart.length}) - ${total}</b>{cart.length===0?<div style={{color:"#888",marginTop:"20px",textAlign:"center"}}>Khali hai!</div>:<><div style={{marginTop:"10px",display:"grid",gap:"8px"}}>{cart.map((c:any,i:number)=><div key={i} style={{background:"#141414",border:"1px solid #222",borderRadius:"10px",padding:"10px",display:"flex",gap:"10px",alignItems:"center"}}><img src={c.im} style={{width:"50px",height:"50px",borderRadius:"8px",objectFit:"cover"}} alt=""/><div style={{flex:1}}><div style={{fontSize:"12px"}}>{c.n}</div><div style={{color:"#D4B78F",fontSize:"11px"}}>${c.pr}</div></div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{background:"none",border:"1px solid #333",color:"#888",borderRadius:"6px",padding:"4px 8px",fontSize:"10px"}}>X</button></div>)}</div><button style={{width:"100%",marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"12px",borderRadius:"8px",fontWeight:"800"}}>CHECKOUT ${total}</button></>}</div>}

{pg==="profile" && <div style={{padding:"16px"}}><div style={{background:"#141414",borderRadius:"16px",padding:"20px",border:"1px solid #222",textAlign:"center"}}><div style={{width:"70px",height:"70px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}}>H</div><div style={{marginTop:"8px",fontWeight:"700"}}>HADI</div><div style={{color:"#888",fontSize:"11px"}}>hadi@kaiha.com</div></div><div style={{marginTop:"12px",display:"grid",gap:"8px"}}>{["My Orders","Wishlist","Addresses","Help","Logout"].map(t=><div key={t} style={{background:"#141414",border:"1px solid #222",borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"13px"}}>{t}</span><span style={{color:"#D4B78F"}}>›</span></div>)}</div></div>}

{pg==="all" && <div style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>All Items</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px",cursor:"pointer"}}>← Back</span></div><div style={{marginTop:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>{P.map(p=><div key={p.id} style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"130px",objectFit:"cover",borderRadius:"8px"}} alt=""/><div style={{fontSize:"11px",marginTop:"5px",fontWeight:"600"}}>{p.n}</div><div style={{color:"#D4B78F",fontSize:"11px"}}>${p.pr}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",background:"transparent",border:"1px solid #D4B78F88",color:"#D4B78F",borderRadius:"6px",padding:"6px",fontSize:"9px",fontWeight:"700"}}>ADD TO CART</button></div>)}</div></div>}

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"#151515",borderTop:"1.5px solid #D4B78F",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-around",padding:"12px 0 14px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",color:pg==="home"?"#D4B78F":"#666",cursor:"pointer"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L3 10h2v10h6v-6h2v6h6V10h2L12 3z"/></svg><span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("shop")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",color:pg==="shop"?"#D4B78F":"#666",cursor:"pointer"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 5h4v2H9V5z"/></svg><span style={{fontSize:"9px"}}>Shop</span></div>
<div onClick={()=>setPg("reels")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",color:pg==="reels"?"#D4B78F":"#666",cursor:"pointer"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M10 8l6 4-6 4V8z" fill="#151515"/></svg><span style={{fontSize:"9px"}}>Reels</span></div>
<div onClick={()=>setPg("bag")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",color:pg==="bag"?"#D4B78F":"#666",cursor:"pointer",position:"relative"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-2V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v1h18V9a2 2 0 0 0-2-2z"/><path d="M4 11v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6H4z"/></svg>{cart.length>0 && <span style={{position:"absolute",top:"-6px",right:"-6px",background:"#D4B78F",color:"#000",fontSize:"8px",width:"14px",height:"14px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>{cart.length}</span>}<span style={{fontSize:"9px"}}>Bag</span></div>
<div onClick={()=>setPg("profile")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",color:pg==="profile"?"#D4B78F":"#666",cursor:"pointer"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="3.5"/><path d="M12 12c-4.5 0-7 2.2-7 3.5V18h14v-2.5c0-1.3-2.5-3.5-7-3.5z"/></svg><span style={{fontSize:"9px"}}>Profile</span></div>
</div>

{mn && <div style={{position:"fixed",inset:0,zIndex:99,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.8)"}} onClick={()=>setMn(false)}></div><div style={{position:"relative",width:"78%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F66"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><KLogo s={48}/><span style={{color:"#D4B78F",letterSpacing:"0.35em",fontSize:"13px"}}>KAIHA</span></div><button onClick={()=>setMn(false)} style={{width:"30px",height:"30px",border:"1px solid #D4B78F",borderRadius:"999px",background:"none",color:"#D4B78F"}}>✕</button></div><div style={{marginTop:"18px",display:"grid",gap:"6px"}}>{[{l:"Home",v:"home"},{l:"Shop - Shops & Items",v:"shop"},{l:"Reels - KAIHA TV",v:"reels"},{l:"Bag - Cart",v:"bag"},{l:"Profile",v:"profile"},{l:"All Items",v:"all"}].map(it=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false);}} style={{padding:"12px",borderRadius:"8px",background:pg===it.v?"#1a1a1a":"transparent",border:"1px solid #222",color:pg===it.v?"#D4B78F":"#ccc",fontSize:"13px",cursor:"pointer"}}>{it.l}</div>)}</div></div></div>}

</div>
</div>
);
  }
