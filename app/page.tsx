"use client";
import { useState } from "react";

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [cart,setCart]=useState(0);

  const styles=[
    {n:"Minimal", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200"},
    {n:"Evening", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200"},
    {n:"Casual", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200"},
    {n:"Streetwear", img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200"},
    {n:"Accessories", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200"},
  ];

  return(
    <div style={{background:"#000", minHeight:"100vh", display:"flex", justifyContent:"center"}}>
    <div style={{background:"#0a0a0a", color:"#fff", width:"100%", maxWidth:"390px", minHeight:"100vh", paddingBottom:"90px", position:"relative", borderRadius:"24px", overflow:"hidden", border:"1px solid #1a1a1a"}}>
      
      {/* HEADER - EXACT SIZE - K 46px + KAIHA */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 20px 16px", background:"#0a0a0a"}}>
        <div style={{display:"flex", alignItems:"center", gap:"14px"}}>
          <img src="/k-logo.png" alt="K" style={{height:"46px", width:"46px", objectFit:"contain"}} onError={(e:any)=>{e.target.style.display='none'}}/>
          {/* Fallback if logo not in public */}
          <span style={{color:"#D4B78F", letterSpacing:"0.45em", fontSize:"17px", fontWeight:"400", fontFamily:"serif"}}>KAIHA</span>
        </div>
        <button onClick={()=>setMenu(true)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", gap:"5px", padding:"4px"}}>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
        </button>
      </div>

      {/* SEARCH - Exact like image */}
      <div style={{padding:"0 16px"}}>
        <div style={{background:"#141414", borderRadius:"10px", height:"44px", display:"flex", alignItems:"center", padding:"0 14px", gap:"10px", border:"1px solid rgba(212,183,143,0.5)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4B78F" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="m21 21-3.5-3.5"/></svg>
          <input placeholder="Search for products, styles, brands..." style={{background:"transparent", border:"none", outline:"none", color:"#777", flex:1, fontSize:"12.5px"}}/>
        </div>
      </div>

      {/* BANNER - NEW ARRIVALS - Exact */}
      <div style={{margin:"14px 16px", borderRadius:"14px", height:"152px", position:"relative", overflow:"hidden", background:"#111", border:"1px solid #1f1f1f"}}>
        <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"right top"}} alt=""/>
        <div style={{position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,15,15,0.98) 0%, rgba(15,15,15,0.75) 50%, rgba(15,15,15,0.1) 100%)"}}></div>
        <div style={{position:"relative", padding:"16px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", width:"65%"}}>
          <div style={{color:"#D4B78F", fontSize:"10px", fontWeight:"700", letterSpacing:"0.5px"}}>NEW ARRIVALS</div>
          <div style={{fontSize:"22px", fontFamily:"serif", marginTop:"4px", lineHeight:"1.1", fontWeight:"500"}}>Fall Collection 2026</div>
          <div style={{color:"#9ca3af", fontSize:"10px", marginTop:"4px"}}>Luxury. Timeless. Curated for you.</div>
          <button style={{marginTop:"12px", background:"#D4B78F", color:"#000", border:"none", padding:"6px 10px", borderRadius:"4px", fontWeight:"700", fontSize:"9px", width:"fit-content"}}>SHOP NOW</button>
        </div>
      </div>

      {/* SHOP BY STYLE - Exact circles */}
      <div style={{padding:"4px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <b style={{fontSize:"14px", fontWeight:"700"}}>Shop by Style</b>
          <span style={{color:"#D4B78F", fontSize:"11px"}}>See all ›</span>
        </div>
        <div style={{display:"flex", gap:"12px", marginTop:"12px", overflowX:"auto"}}>
          {styles.map(s=>(
            <div key={s.n} style={{minWidth:"56px", textAlign:"center"}}>
              <div style={{width:"56px", height:"56px", borderRadius:"999px", overflow:"hidden", border:"1px solid rgba(212,183,143,0.6)", background:"#151515", padding:"2px"}}>
                <img src={s.img} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"999px"}} alt=""/>
              </div>
              <div style={{fontSize:"9.5px", marginTop:"6px", color:"#ddd", fontWeight:"500"}}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING NOW - Exact 2 cards */}
      <div style={{padding:"18px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <b style={{fontSize:"14px", fontWeight:"700"}}>Trending Now</b>
          <span style={{color:"#D4B78F", fontSize:"11px"}}>See all ›</span>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginTop:"10px"}}>
          <div style={{background:"#151515", borderRadius:"12px", padding:"8px", border:"1px solid #222"}}>
            <div style={{height:"155px", borderRadius:"8px", overflow:"hidden", position:"relative", background:"#000"}}>
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" style={{width:"100%", height:"100%", objectFit:"cover", opacity:0.9}} alt=""/>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 50%)"}}></div>
              <div style={{position:"absolute", bottom:"12px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"11px", fontWeight:"600"}}>Silk Blazer</div><div style={{color:"#D4B78F", fontSize:"10px", marginTop:"3px"}}>Rs.1899</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"8px", background:"transparent", border:"1px solid rgba(212,183,143,0.7)", color:"#D4B78F", borderRadius:"6px", padding:"7px", fontSize:"9px", fontWeight:"700"}}>ADD TO CART</button>
          </div>
          <div style={{background:"#151515", borderRadius:"12px", padding:"8px", border:"1px solid #222"}}>
            <div style={{height:"155px", borderRadius:"8px", overflow:"hidden", position:"relative", background:"#000"}}>
              <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" style={{width:"100%", height:"100%", objectFit:"cover", opacity:0.9}} alt=""/>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 15%, transparent 50%)"}}></div>
              <div style={{position:"absolute", bottom:"12px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"11px", fontWeight:"600"}}>Leather Bag</div><div style={{color:"#D4B78F", fontSize:"10px", marginTop:"3px"}}>Rs.2450</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"8px", background:"transparent", border:"1px solid rgba(212,183,143,0.7)", color:"#D4B78F", borderRadius:"6px", padding:"7px", fontSize:"9px", fontWeight:"700"}}>ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV - Exact like image - Gold border top */}
      <div style={{position:"fixed", bottom:"0", left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:"390px", background:"#151515", borderTop:"1.5px solid #D4B78F", borderLeft:"1px solid rgba(212,183,143,0.3)", borderRight:"1px solid rgba(212,183,143,0.3)", borderRadius:"18px 18px 0 0", display:"flex", justifyContent:"space-around", padding:"12px 0 8px", zIndex:50}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", color:"#D4B78F"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5L3 11.5h2.2v9h5.8v-6h4v6h5.8v-9H21L12 2.5z"/></svg>
          <span style={{fontSize:"9px", fontWeight:"600"}}>Home</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", color:"#555"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 5h4v2H9V5z"/></svg>
          <span style={{fontSize:"9px"}}>Shop</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", color:"#555"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M9.5 8.5l6 3.5-6 3.5v-7z" fill="#151515"/></svg>
          <span style={{fontSize:"9px"}}>Reels</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", color:"#555", position:"relative"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-2V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v1h18V9a2 2 0 0 0-2-2zM9 6h4v1H9V6z"/><path d="M4 11v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6H4z"/></svg>
          {cart>0 && <span style={{position:"absolute", top:"-4px", right:"-4px", background:"#D4B78F", color:"#000", fontSize:"8px", width:"12px", height:"12px", borderRadius:"999px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>{cart}</span>}
          <span style={{fontSize:"9px"}}>Bag</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", color:"#555"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="3.5"/><path d="M12 12c-4.5 0-7 2-7 3.5V18h14v-2.5c0-1.5-2.5-3.5-7-3.5z"/></svg>
          <span style={{fontSize:"9px"}}>Profile</span>
        </div>
      </div>

      {menu && (
        <div style={{position:"fixed", inset:0, zIndex:99, display:"flex", justifyContent:"flex-end"}}>
          <div style={{position:"absolute", inset:0, background:"rgba(0,0,0,0.8)"}} onClick={()=>setMenu(false)}></div>
          <div style={{position:"relative", width:"78%", background:"#0a0a0a", height:"100%", padding:"20px", borderLeft:"1px solid rgba(212,183,143,0.4)"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <img src="/k-logo.png" style={{height:"36px"}} alt=""/><span style={{color:"#D4B78F", letterSpacing:"0.35em"}}>KAIHA</span>
              </div>
              <button onClick={()=>setMenu(false)} style={{width:"26px", height:"26px", border:"1px solid #D4B78F", borderRadius:"999px", background:"none", color:"#D4B78F"}}>✕</button>
            </div>
            <div style={{marginTop:"22px", color:"#D4B78F", lineHeight:"38px", fontSize:"12px"}}>Home<br/>Shop<br/>My Orders<br/>Wishlist<br/>Contact Us<br/>About Us</div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
      }
