"use client";
import { useState } from "react";

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [cart,setCart]=useState(0);

  const stylesData = [
    { name:"Minimal", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200" },
    { name:"Evening", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200" },
    { name:"Casual", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200" },
    { name:"Streetwear", img:"https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=200" },
    { name:"Accessories", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
  ];

  return(
    <div style={{background:"#000", color:"#fff", minHeight:"100vh", paddingBottom:"95px", maxWidth:"430px", margin:"0 auto", fontFamily:"Inter, sans-serif"}}>
      
      {/* HEADER - EXACT LIKE IMAGE - Purple K + Gold KAIHA */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 16px 12px", background:"#0a0a0a", position:"sticky", top:0, zIndex:20}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <img src="/kaiha-logo.png" alt="KAIHA" style={{height:"52px", width:"auto"}} />
        </div>
        <button onClick={()=>setMenu(true)} style={{background:"none", border:"none", color:"#D4AF37", fontSize:"28px"}}>☰</button>
      </div>

      {/* SEARCH BAR - Gold border */}
      <div style={{padding:"0 16px"}}>
        <div style={{background:"#111", borderRadius:"12px", height:"46px", display:"flex", alignItems:"center", padding:"0 14px", gap:"10px", border:"1px solid #D4AF37", opacity:0.9}}>
          <span style={{color:"#D4AF37", fontSize:"18px"}}>⌕</span>
          <input placeholder="Search for products, styles, brands..." style={{background:"transparent", border:"none", outline:"none", color:"#999", flex:1, fontSize:"13px"}} />
        </div>
      </div>

      {/* BANNER - Fall Collection 2026 - EXACT LIKE IMAGE */}
      <div style={{margin:"16px", borderRadius:"16px", height:"168px", position:"relative", overflow:"hidden", background:"#111", border:"1px solid #1a1a1a"}}>
        <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"right"}} alt="" />
        <div style={{position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.2) 100%)"}}></div>
        <div style={{position:"relative", padding:"18px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", width:"65%"}}>
          <div style={{color:"#D4AF37", fontSize:"11px", fontWeight:"600", letterSpacing:"0.5px"}}>NEW ARRIVALS</div>
          <div style={{fontSize:"24px", fontFamily:"serif", marginTop:"4px", lineHeight:"1.1"}}>Fall Collection 2026</div>
          <div style={{color:"#9ca3af", fontSize:"11px", marginTop:"4px"}}>Luxury. Timeless. Curated for you.</div>
          <button style={{marginTop:"12px", background:"#D4AF37", color:"#000", border:"none", padding:"6px 14px", borderRadius:"6px", fontWeight:"bold", fontSize:"11px", width:"fit-content"}}>SHOP NOW</button>
        </div>
      </div>

      {/* SHOP BY STYLE - EXACT CIRCLES LIKE IMAGE */}
      <div style={{padding:"0 16px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <b style={{fontSize:"15px"}}>Shop by Style</b>
          <span style={{color:"#D4AF37", fontSize:"12px"}}>See all ›</span>
        </div>
        <div style={{display:"flex", gap:"14px", marginTop:"14px", overflowX:"auto", paddingBottom:"4px"}}>
          {stylesData.map(s=>(
            <div key={s.name} style={{minWidth:"62px", textAlign:"center"}}>
              <div style={{width:"62px", height:"62px", borderRadius:"999px", overflow:"hidden", border:"1px solid #D4AF37", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <img src={s.img} style={{width:"100%", height:"100%", objectFit:"cover"}} alt="" />
              </div>
              <div style={{fontSize:"11px", marginTop:"8px", color:"#d1d5db"}}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING NOW - EXACT LIKE IMAGE */}
      <div style={{padding:"20px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <b style={{fontSize:"15px"}}>Trending Now</b>
          <span style={{color:"#D4AF37", fontSize:"12px"}}>See all ›</span>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginTop:"12px"}}>
          <div style={{background:"#0f0f0f", borderRadius:"16px", padding:"10px", border:"1px solid #1f1f1f"}}>
            <div style={{height:"180px", borderRadius:"12px", overflow:"hidden", background:"#000", position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" style={{width:"100%", height:"100%", objectFit:"cover", opacity:0.9}} alt="" />
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, black 20%, transparent 70%)"}}></div>
              <div style={{position:"absolute", bottom:"8px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"12px", color:"#fff"}}>Silk Blazer</div>
                <div style={{fontSize:"12px", color:"#D4AF37", marginTop:"2px"}}>Rs.1899</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"10px", background:"transparent", border:"1px solid #D4AF37", color:"#D4AF37", borderRadius:"8px", padding:"8px", fontSize:"11px", fontWeight:"600"}}>ADD TO CART</button>
          </div>
          <div style={{background:"#0f0f0f", borderRadius:"16px", padding:"10px", border:"1px solid #1f1f1f"}}>
            <div style={{height:"180px", borderRadius:"12px", overflow:"hidden", background:"#000", position:"relative"}}>
              <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" style={{width:"100%", height:"100%", objectFit:"cover", opacity:0.9}} alt="" />
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, black 20%, transparent 70%)"}}></div>
              <div style={{position:"absolute", bottom:"8px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"12px", color:"#fff"}}>Leather Bag</div>
                <div style={{fontSize:"12px", color:"#D4AF37", marginTop:"2px"}}>Rs.2450</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"10px", background:"transparent", border:"1px solid #D4AF37", color:"#D4AF37", borderRadius:"8px", padding:"8px", fontSize:"11px", fontWeight:"600"}}>ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV - EXACT LIKE IMAGE - GOLD BORDER */}
      <div style={{position:"fixed", bottom:0, left:0, right:0, maxWidth:"430px", margin:"0 auto", background:"#0a0a0a", borderTop:"1.5px solid #D4AF37", borderLeft:"1px solid #D4AF37", borderRight:"1px solid #D4AF37", borderRadius:"20px 20px 0 0", display:"flex", justifyContent:"space-around", padding:"12px 0 8px", zIndex:50}}>
        {[
          {name:"Home", icon:"🏠", active:true},
          {name:"Shop", icon:"👜"},
          {name:"Reels", icon:"▶️"},
          {name:"Bag", icon:"🛍️", count:cart},
          {name:"Profile", icon:"👤"},
        ].map(t=>(
          <div key={t.name} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color: t.active ? "#D4AF37" : "#6b7280", position:"relative"}}>
            <span style={{fontSize:"20px"}}>{t.icon}</span>
            {t.count>0 && <span style={{position:"absolute", top:"-4px", right:"-8px", background:"#D4AF37", color:"#000", fontSize:"9px", width:"14px", height:"14px", borderRadius:"999px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>{t.count}</span>}
            <span style={{fontSize:"10px"}}>{t.name}</span>
          </div>
        ))}
      </div>

      {/* HAMBURGER MENU */}
      {menu && (
        <div style={{position:"fixed", inset:0, zIndex:99, display:"flex", justifyContent:"flex-end"}}>
          <div style={{position:"absolute", inset:0, background:"rgba(0,0,0,0.8)"}} onClick={()=>setMenu(false)}></div>
          <div style={{position:"relative", width:"78%", background:"#000", height:"100%", padding:"20px", borderLeft:"2px solid #D4AF37"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <img src="/kaiha-logo.png" style={{height:"50px"}} alt="" />
              <button onClick={()=>setMenu(false)} style={{width:"28px", height:"28px", border:"1px solid #D4AF37", borderRadius:"999px", background:"none", color:"#D4AF37"}}>✕</button>
            </div>
            <div style={{marginTop:"24px", color:"#e8d5a0", fontSize:"13px", lineHeight:"38px"}}>
              🏠 Home<br/>🛍️ Shop<br/>📦 My Orders<br/>♡ Wishlist<br/>👑 Black Card<br/>🪙 Coins & Rewards<br/>📞 Contact Us<br/>ℹ️ About Us
            </div>
            <div style={{fontSize:"10px", color:"#555", textAlign:"center", marginTop:"20px"}}>v2.4.1 • KAIHA Luxury Fashion 2026 • PKR Only</div>
          </div>
        </div>
      )}
    </div>
  );
        }
