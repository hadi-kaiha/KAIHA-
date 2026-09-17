"use client";
import {useState} from "react";
const LOGO="/k-logo.png";
const P=[
{id:1,n:"Silk Blazer",pr:189,im:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"},
{id:2,n:"Leather Bag",pr:245,im:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
{id:3,n:"Denim Jacket",pr:120,im:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"},
{id:4,n:"Evening Dress",pr:320,im:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"},
{id:5,n:"Hoodie",pr:89,im:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"},
{id:6,n:"Sneakers",pr:150,im:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200"},
];
export default function Home(){
const [pg,setPg]=useState("home");
const [mn,setMn]=useState(false);
const [cart,setCart]=useState<any[]>([]);
const add=(p:any)=>setCart(c=>[...c,{...p,aid:Date.now()+Math.random()}]);
const tot=cart.reduce((s:any,i:any)=>s+i.pr,0);
return(
<div style={{background:"#000",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
<style>{`
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideMenu{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes slideBg{from{opacity:0}to{opacity:1}}
@keyframes textSlide{
  0%{max-width:0;opacity:0;transform:translateX(-10px)}
  25%{max-width:130px;opacity:1;transform:translateX(0)}
  65%{max-width:130px;opacity:1;transform:translateX(0)}
  85%{max-width:0;opacity:0;transform:translateX(10px)}
  100%{max-width:0;opacity:0;transform:translateX(10px)}
}
@keyframes pop{0%{transform:scale(0.96)}100%{transform:scale(1)}}
.page{animation:fadeUp 0.45s cubic-bezier(.2,.8,.2,1)}
.card{transition:transform 0.3s cubic-bezier(.2,.8,.2,1), border-color 0.3s}
.card:active{transform:scale(0.97)}
.card:hover{transform:translateY(-3px);border-color:#D4B78F66!important}
.shopCircle{transition:transform 0.3s}
.shopCircle:active{transform:scale(0.92)}
.hamburger span{transition:all 0.3s cubic-bezier(.4,0,.2,1);transform-origin:center}
.kaihaSlide{
  display:inline-block;
  overflow:hidden;
  white-space:nowrap;
  max-width:0;
  animation:textSlide 3s ease-in-out infinite;
}
`}</style>

<div style={{background:"#0a0a0a",width:"100%",maxWidth:"390px",minHeight:"100vh",paddingBottom:"90px",position:"relative",borderRadius:"28px",overflow:"hidden",color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,background:"rgba(10,10,10,0.96)",backdropFilter:"blur(12px)",zIndex:20}}>
<div onClick={()=>setPg("home")} style={{display:"flex",alignItems:"center",gap:"12px"}}>
<img src={LOGO} alt="K" style={{height:"72px",width:"72px",objectFit:"contain",borderRadius:"16px"}}/>
<span className="kaihaSlide" style={{color:"#D4B78F",letterSpacing:"0.45em",fontSize:"18px",fontFamily:"serif",fontWeight:"600"}}>KAIHA</span>
</div>
<button onClick={()=>setMn(!mn)} className="hamburger" style={{background:"none",border:"none",display:"flex",flexDirection:"column",gap:"5px",width:"32px",height:"26px",justifyContent:"center"}}>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(45deg) translate(5px,5px)":"none"}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",opacity:mn?0:1}}></span>
<span style={{width:"26px",height:"2.5px",background:"#D4B78F",borderRadius:"2px",display:"block",transform:mn?"rotate(-45deg) translate(5px,-5px)":"none"}}></span>
</button>
</div>

{pg==="home"&&<div className="page">
<div style={{padding:"12px 16px"}}><div style={{background:"#141414",borderRadius:"10px",height:"42px",display:"flex",alignItems:"center",padding:"0 14px",gap:"10px",border:"1px solid #D4B78F55"}}><span style={{color:"#D4B78F"}}>⌕</span><input placeholder="Search luxury..." style={{background:"transparent",border:"none",outline:"none",color:"#ccc",flex:1,fontSize:"12px"}}/></div></div>
<div onClick={()=>{add(P[0]);add(P[1]);setPg("bag")}} className="card" style={{margin:"12px 16px",borderRadius:"14px",height:"155px",position:"relative",overflow:"hidden",background:"#111",border:"1px solid #222"}}><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute",right:0,top:0,width:"60%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#0a0a0a 60%,transparent)"}}/><div style={{position:"relative",padding:"16px",width:"65%"}}><div style={{color:"#D4B78F",fontSize:"9px",letterSpacing:"0.2em"}}>NEW ARRIVALS</div><div style={{fontSize:"22px",fontFamily:"serif",marginTop:"4px"}}>Fall Collection 2026</div><button style={{marginTop:"14px",background:"#D4B78F",color:"#000",border:"none",padding:"8px 14px",borderRadius:"999px",fontSize:"9px",fontWeight:"800"}}>SHOP NOW →</button></div></div>
<div style={{padding:"0 16px",display:"flex",justifyContent:"space-between"}}><b>Shop by Style</b><span onClick={()=>setPg("all")} style={{color:"#D4B78F",fontSize:"11px"}}>See all ›</span></div>
<div style={{display:"flex",gap:"12px",marginTop:"12px",overflowX:"auto",padding:"0 16px 8px",scrollSnapType:"x mandatory"}}>{P.map((s:any,i:number)=><div key={s.id} onClick={()=>setPg("all")} className="shopCircle" style={{minWidth:"60px",textAlign:"center",scrollSnapAlign:"start",animation:`fadeUp 0.5s ease ${i*0.08}s both`}}><div style={{width:"56px",height:"56px",borderRadius:"999px",overflow:"hidden",border:"1.5px solid #D4B78F88",margin:"0 auto"}}><img src={s.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div><div style={{fontSize:"9px",marginTop:"6px",color:"#aaa"}}>{s.n}</div></div>)}</div>
<div style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Trending</b><span onClick={()=>setPg("all")} style={{color:"#D4B78F",fontSize:"11px"}}>See all ›</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>{P.slice(0,2).map((p:any)=><div key={p.id} className="card page" style={{background:"#141414",borderRadius:"14px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"150px",borderRadius:"10px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"8px"}}>{p.n} - ${p.pr}</div><button onClick={(e)=>{e.stopPropagation();add(p)}} style={{width:"100%",marginTop:"8px",border:"1px solid #D4B78F99",background:"transparent",color:"#D4B78F",borderRadius:"999px",padding:"7px",fontSize:"9px"}}>ADD TO CART</button></div>)}</div></div>
</div>}

{pg==="shop"&&<div className="page" style={{padding:"16px"}}><b>Shops</b>{["Essentials","Luxury","Street","Bags","Footwear","Women"].map((s,i)=><div key={s} onClick={()=>setPg("all")} className="card" style={{background:"#141414",border:"1px solid #222",borderRadius:"12px",padding:"14px",marginTop:"10px",display:"flex",justifyContent:"space-between",animation:`fadeUp 0.4s ease ${i*0.06}s both`}}><b style={{fontSize:"13px"}}>{s}</b><span style={{color:"#D4B78F"}}>›</span></div>)}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginTop:"14px"}}>{P.map(p=><div key={p.id} className="card" style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222"}}><img src={p.im} style={{width:"100%",height:"110px",borderRadius:"8px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",background:"#D4B78F",border:"none",borderRadius:"999px",padding:"6px",fontSize:"9px",fontWeight:"700"}}>ADD</button></div>)}</div></div>}

{pg==="reels"&&<div style={{height:"70vh",overflowY:"scroll",scrollSnapType:"y mandatory"}}>{P.map((p:any,i:number)=><div key={p.id} className="card" style={{height:"65vh",scrollSnapAlign:"start",position:"relative",margin:"8px 12px",borderRadius:"18px",overflow:"hidden",background:"#111",animation:`fadeUp 0.5s ease ${i*0.1}s both`}}><img src={p.im} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",bottom:"20px",left:"18px"}}><b>{p.n}</b><div style={{color:"#D4B78F",fontSize:"12px"}}>${p.pr}</div><button onClick={()=>add(p)} style={{marginTop:"8px",background:"#fff",color:"#000",border:"none",padding:"8px 16px",borderRadius:"999px",fontSize:"11px",fontWeight:"700"}}>Add to Bag</button></div></div>)}</div>}

{pg==="bag"&&<div className="page" style={{padding:"16px"}}><b>Bag ({cart.length}) ${tot}</b>{cart.length===0?<div style={{color:"#888",marginTop:"30px",textAlign:"center"}}>Khali hai</div>:<div style={{marginTop:"14px",display:"grid",gap:"10px"}}>{cart.map((c:any,i:number)=><div key={c.aid} style={{background:"#141414",borderRadius:"12px",padding:"12px",display:"flex",gap:"12px",alignItems:"center",border:"1px solid #222",animation:`fadeUp 0.3s ease ${i*0.05}s both`}}><img src={c.im} style={{width:"54px",height:"54px",borderRadius:"10px"}}/><div style={{flex:1,fontSize:"12px"}}>{c.n}</div><button onClick={()=>setCart(cart.filter((_:any,idx:number)=>idx!==i))} style={{border:"1px solid #333",background:"none",color:"#888",borderRadius:"999px",width:"28px",height:"28px"}}>✕</button></div>)}</div>}</div>}

{pg==="profile"&&<div className="page" style={{padding:"24px",textAlign:"center"}}><div style={{width:"80px",height:"80px",borderRadius:"999px",background:"#222",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px",border:"1px solid #D4B78F44"}}>H</div><div style={{marginTop:"12px",fontWeight:"700",letterSpacing:"0.1em"}}>HADI</div><div style={{color:"#888",fontSize:"11px"}}>hadi@kaiha.com</div></div>}

{pg==="all"&&<div className="page" style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between"}}><b>All Items</b><span onClick={()=>setPg("home")} style={{color:"#D4B78F",fontSize:"12px"}}>← Back</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>{P.map((p:any,i:number)=><div key={p.id} className="card" style={{background:"#141414",borderRadius:"12px",padding:"8px",border:"1px solid #222",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}><img src={p.im} style={{width:"100%",height:"130px",borderRadius:"10px",objectFit:"cover"}}/><div style={{fontSize:"11px",marginTop:"6px"}}>{p.n}</div><button onClick={()=>add(p)} style={{width:"100%",marginTop:"6px",border:"1px solid #D4B78F88",background:"transparent",color:"#D4B78F",borderRadius:"999px",padding:"7px",fontSize:"9px"}}>ADD</button></div>)}</div></div>}

<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"390px",background:"rgba(15,15,15,0.96)",backdropFilter:"blur(16px)",borderTop:"1px solid #222",borderRadius:"24px 24px 0 0",display:"flex",justifyContent:"space-around",padding:"14px 0 20px",zIndex:50}}>
<div onClick={()=>setPg("home")} style={{color:pg==="home"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",transition:"all 0.3s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pg==="home"?2:1.6}><path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10z"/></svg><span style={{fontSize:"9px"}}>Home</span></div>
<div onClick={()=>setPg("shop")} style={{color:pg==="shop"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",transition:"all 0.3s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pg==="shop"?2:1.6}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span style={{fontSize:"9px"}}>Shop</span></div>
<div onClick={()=>setPg("reels")} style={{color:pg==="reels"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",transition:"all 0.3s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pg==="reels"?2:1.6}><polygon points="6 3 20 12 6 21 6 3" strokeLinejoin="round"/></svg><span style={{fontSize:"9px"}}>Reels</span></div>
<div onClick={()=>setPg("bag")} style={{color:pg==="bag"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",position:"relative",transition:"all 0.3s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pg==="bag"?2:1.6}><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>{cart.length>0&&<span style={{position:"absolute",top:"-7px",right:"2px",background:"#D4B78F",color:"#000",fontSize:"8px",minWidth:"15px",height:"15px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700",padding:"0 4px"}}>{cart.length}</span>}<span style={{fontSize:"9px"}}>Bag</span></div>
<div onClick={()=>setPg("profile")} style={{color:pg==="profile"?"#D4B78F":"#6B6B6B",display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",transition:"all 0.3s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={pg==="profile"?2:1.6}><circle cx="12" cy="8" r="3.2"/><path d="M5 19a7 7 0 0 1 14 0"/></svg><span style={{fontSize:"9px"}}>Profile</span></div>
</div>

{mn&&<div style={{position:"fixed",inset:0,zIndex:99,display:"flex",justifyContent:"flex-end"}}><div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)",animation:"slideBg 0.3s ease"}} onClick={()=>setMn(false)}/><div style={{position:"relative",width:"78%",background:"#0a0a0a",height:"100%",padding:"18px",borderLeft:"1px solid #D4B78F33",animation:"slideMenu 0.38s cubic-bezier(.2,.8,.2,1)"}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><img src={LOGO} style={{height:"44px",width:"44px",borderRadius:"10px"}}/><span style={{color:"#D4B78F",letterSpacing:"0.3em",fontFamily:"serif"}}>KAIHA</span></div><button onClick={()=>setMn(false)} style={{width:"32px",height:"32px",border:"1px solid #D4B78F44",borderRadius:"999px",background:"none",color:"#D4B78F"}}>✕</button></div>{[{l:"Home",v:"home"},{l:"Shop",v:"shop"},{l:"Reels - KAIHA TV",v:"reels"},{l:"Bag",v:"bag"},{l:"Profile",v:"profile"},{l:"All Items",v:"all"}].map((it,i)=><div key={it.l} onClick={()=>{setPg(it.v);setMn(false)}} style={{padding:"14px",borderRadius:"10px",background:pg===it.v?"#1a1a1a":"transparent",border:"1px solid #222",marginTop:"10px",color:pg===it.v?"#D4B78F":"#ccc",animation:`fadeUp 0.35s ease ${i*0.06}s both`}}>{it.l}</div>)}</div></div>}
</div>
</div>
);
                                     }
