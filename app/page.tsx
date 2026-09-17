"use client";
import { useState } from "react";

// TUMHARA K LOGO PICTURE - DIRECT EMBEDDED - NO PUBLIC NEEDED
const K_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCwoLCg8ODAwODxYQERAREBYiFRkVFRkVIh4kHhweJB42KiYmKjY+NDI0PkxERExfWl98fKcBBgYGBgcGBwgIBwoLCgsKDw4MDA4PFhAREBEQFiIVGRUVGRUiHiQeHB4kHjYqJiYqNj40MjQ+TERETF9aX3x8p//CABEIAKQAlwMBIgACEQEDEQH/xAAwAAEAAwEBAQAAAAAAAAAAAAAAAQMEAgUGAQEBAQEBAAAAAAAAAAAAAAAAAwECBP/aAAwDAQACEAMQAAAC+YAAAAIBJEgDAaAAmB6PdO2neanZn158TEuExaNti3dcWZdRmIcAAwDbtx7KU5z35+t89PcZvSL9oZutY5eeYYAABm7Zj10pzRdx1uD0uuWRE5u+oyHnkGAAAAZu15NlKcWTX31HPWfXOLfjlPgcYAAAAB6G6iytOY6zdIjD6nGQ7jvfL59LzpcQOcAAAA9e2rmlOcdrcx21JcexGD0a98U3x08ltxR4DAAAHo8RfTvmq6rrcIjNryD2ec+q3fGLdB5LRnjwAABqZWtMZxMGAGrKNUZZ1pp4AYAAAAAAAAAAAAAAAAAAAA//xAAC/9oADAMBAAIAAwAAACFBSAATiAEQBgDClSqf3IAEHIzbFUMABAEYkOCMAAwgEYYScAADxgCxWqcgAQDACLwLfWlADACOgBIOcIAQAdsAAJuEADzzwQAAgAADzwByADwAD//EAAL/2gAMAwEAAgADAAAAEPvvqPOog/PPts/trp2U/Py4b9OXEFMvi5am8IXPPvK/bdryNPPvLNverOPPPPvAvzP/APXzzyj/AKQfh33w88P/ADvKy5PPPvPvvPDPPPPPvvPPPvPP/8QAIxEBAAIBAwMFAQAAAAAAAAAAAgADEgEEICIyMxAUIzBTE//aAAgBAgEBPwD7KQWcsJbVWa30emmiSxMo2dZPXLq9rUckI3kuG28ct8bmmiSxM2u1NRyXfLrjUclLrlaslx23jj6q2Zttsajku+XXGo5KXXK1ZLltvHNInjN0bEslz2+mNcbwOUpu/quqY5HFS+lVLlVr8Yj0yraU01RWRlNxZjBZxUsrQWK40H4xLfG/QNBZSm0sy6s2nGMILFcNLrD2z3Fn6eoaHbPcWfpHan3favp//8QAIhEBAAIBBAICAwAAAAAAAAAAAgADEgEgIjIQMxETIzBA/9oACAEDAQE/AP2VAo9IwcfB0ygpJPKPSsGa65bKfXLPXZO0qp+O0bwjaa20+uPkZVThyUbxOUbT5bqfXDNdZdou2+nT8cbxgeai0yOMYxW6rXGuPrkoVjylTzM1OXGMYrbV1EfXwVisoGUYwWYij22fZYZ9lnkpHrPssiaXb+b/xAA7EAAABAAIDAIJBQAAAAAAAAAAAQIDBBAREiEiMvAUIDAxQUJRYXFygYJDsRM0UmKRwdHh8TNQYHOh/9oACAEBAAE/Av2kg21BltmoiOjOUoODM1qDok07QcGarUHnLSHmkIQqSW1JitNms/MxgzW1Qwdn3hgzPvBaYOmisZ48EsvcoV4naFa/EhCbCv7MRts3FSECIkpmlmvTG89qp6nkIJZf5QrxO0K1+JCE2Fc8bbZuKkIESUJmpjed1U9TyMEsv8oV4naFa/EhCbCueJttTipEhKUoTNT+Y3XpKqep5KB2X+UgrxO0K1+JCEWF84bbU4qQglKW0zU9T2g4nnZKqep5OB2X+UK8TtC9fiQUhS5yS9sESUJmpzXpMXvviedkqp6nlIHZf5QrxOCRNnGsuAOjML33xPOzaqc+k8rA7L/KJJxqLcQM9gO99sTi9VPUwTaZJDvvDiDQqQ8pAUyk9wIHe+2Nx3OhPcYQiS/+xLQS0zT6HfQFJNJmR5yycD9W4qBxPuzEzUnW0mEmaTlIIMlpo/G6K/x+Qca9KXvaPoeTgnq3ccTrslVOfSYWmRHdE24bapfiQIyURKI7/UX+PyifanlOK15lkoH6t3mH3ZtVOfyBIz8SD9hXPGw96NVNm9IPjfaJIoQ1nWnuLIsrNEEozzzBJtdAetxIP2Fc2JBnptVR0aD2Ayvs+0V77g+zNrFm8shB/wBJ0getwIK1+JB+wrmxYM9LI2rtP5CS99Iv9xu6fYPMzKSs+WOUJkRNJBSDCTpqkMIOmqVIwg6apUg+GLhTm4YWvYQwpXskMKXsIKMjOhJF/Dv/xAAqEAABAgUDBAMAAwEBAAAAAAABABEhMUFRYXHB8DCBobEQIJHR4fFQYP/aAAgBAQABPyH/AJJBwSHFk4v6Ah4UALBAB3IsA4MR+rPEAOwr6M/7Cy/oI2w4xgEcfbxXxpl+Fj6ftA2QtBCL3yT85VRkAH54Uwm5joeP+NMnz8fPckTQBU2TOcn+Ee788oWE0y5tzHR8evWk6/Hx8AAo1wgORMm4V0T54d1gCKEBPE/4jpcddepJ141Gx6mgVAFQcdkXJ/6Vgc5dMiePIDp+D9r1JMoJqIjYBMZaYk1QTrvFKwEZQ9D+VFnjLYHU8X7+IJBoTOaMmA0AmXF75wjD91jukXAA0HPJTJ2Lw0HV8X7T5M8VDDiAVfFSoL7x3JiYNGUPQwpsc08UGEYcszNrAi7tm46jXuJ+6IAAAFhDPHhGcG2hsPaagBwNd7qOXH8QKBVUCJ4ahAF7EYlfthQcBu0TuQK2mDpgBAIldpwXZ+8hcqZhEnE+UHdPjooW3ohkkQh8w0a/ZZNKYHkNuLLsNv7EKDJA7t5EQQSCGImOlJ73hF3bbb0FHn1kn3Tz8WwiDC4EaEQYvUtsRhbb+zwovI2a7U1srFg5xV16UQY2EyOvOe6aUBvkQh7ptTBRRAETcCEfS60YIfnYoEgzM3/K63TrIXBTIx0SkzwA2gIqDoQG+sl0Gn7B2TJoGgNW5M9CMaU1ClIjHdHLMZiLrdAySZCI1KBglMgP14XEPImakcDbMKaF3y7X4dZCBk4/EWbJcA/c7XoS3DVsie4P+InYWScogS4YLfUCABBQYm7fD+l7FNV3DHOqf2BHRb/wv//EACkQAQABBAECBgMAAwEAAAAAAAERACExQVEQYSBxkaGx8DCB0UDB4fH/2gAIAQEAAT8Qnxsa8T0LeI6JegqKisFS1qs9YqPGCJjeUScTR+R3Xdq8XKhVzjNGvDf0UsVdUyImfBENWfglMGgZsSLyHtGXRTN3Lgl+MXfYq8Aq6ze2DmmQhZA9SKQrdGp8DWqdju+7S5fUUz7eSjWRPWGYAS+Dy0eMC4XX1gp8wjEZTscrfFCrgiIMRu+uTuhLuLB28jgKKGfBmmnc+stZ+Sn3/al6Cj0OwgEv9po4MGES7+PiiZmbnmj9fqpKEKsBjuDo5d0Qm5sdvI4Kb0VvwxV4fWWs/oxS+7xXtVCpKiunA2rxRRzkbO44FN0yWZmLzghy1OC9QqTLgBt5Dxy0QlsFv4Spms1HRYp6NLWVQnN/0K+97ULEwX2ouDlcPK0sKbG+LU9uNqYvMswsF30tgoG0iqkDKu788/oUZSqw4/j0CaPwKQrNl/S1P1/4qJ0uPgkq1GQBBX/1ODdMMsIbjccPN7FAwOALP4nNBIKyHgPhqaz4o64qyjZfVin9LkwC5Wm0mTIK7Ha1+zSQSsll5H0XwVcCVkB9QftgqTAjAEAehOkVHjjpHR5KGC3QP7wbqKhJK2cl3HpNqWRef+HyuipIJKw2+EbaaXEEEumXZU3UkRXfg+Sh6uXDGhO3RYoZ6zR4EqR2CU4LqMMgiZMRHm9BRgSlkTHl8PNLkcW0l9r8LL0VYmxgT+BN1FZNwIutndmeEoUrSVCUtg2pl/Yq5UuBnUvvTxTPUQniLeEEsTbIggO/GigsRKyWgJsHXq8FQxGQQbdMa71guoTxCZncl28tQ/Fkf7RTAEEr8ru3qBoJRDzB7vC9IiyOonLSf2nDQGKHJs7uIap2yIQuPU8cNUF0wRGTo5i7goKQuws+ieX92t2rByTkTtbf0V5BhP6qKKACn43DQuNgCxt8/JQAzG04mP091IFDLc2/IeGXsoszGA/4rZT0PE2oeYAxMMXRt4KRQBEJmGQO1toi0lMnnQ2GB8PV5pLbk9d09ygAiSMyGju11mmCjCITgZBeP5NSKNEWLjlDhrsvVvJjQfLXt+BzX6rXW55qjRuzK7amV77evxR0ihmYZYnvO7ZVinIG4sB518U2oVMAujo9nktQzkG0Ehy82zTTq8jbeZ24eKHpM+CKu9GM6BE9Cgov1XakkCwX2paCOkxWEg1SezdcNOMSvqcnsu6Rbw54PI4ddZoJkCEmyPc8bdIopQLlfW9RasdJ6GbklBgGcKquVdtGzJJWVHXjFdoeygCtPxNoyFDPgeCgRMjCYcnNKckzMOec73zT2GGEMcGcTc4oQrbAih4M3rvqqqe+PwJNebxPQqPxx4orH+G/ieh+B6//2Q==";

export default function Home(){
  const [cart,setCart]=useState(0);
  return(
    <div style={{background:"#000", minHeight:"100vh", display:"flex", justifyContent:"center"}}>
    <div style={{background:"#0a0a0a", width:"100%", maxWidth:"390px", minHeight:"100vh", paddingBottom:"90px", position:"relative", borderRadius:"28px", overflow:"hidden", color:"#fff"}}>

      {/* HEADER - TUMHARA WALA K LOGO PICTURE - NO PUBLIC NEEDED */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 20px 16px", background:"#0a0a0a"}}>
        <div style={{display:"flex", alignItems:"center", gap:"14px"}}>
          <img src={K_LOGO} alt="K" style={{height:"44px", width:"44px", objectFit:"contain", display:"block", background:"#000", borderRadius:"8px"}}/>
          <span style={{color:"#D4B78F", letterSpacing:"0.48em", fontSize:"17px", fontFamily:"serif", fontWeight:"400"}}>KAIHA</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
          <span style={{width:"22px", height:"2px", background:"#D4B78F", borderRadius:"2px", display:"block"}}></span>
        </div>
      </div>

      {/* SEARCH */}
      <div style={{padding:"0 16px"}}>
        <div style={{background:"#141414", borderRadius:"10px", height:"42px", display:"flex", alignItems:"center", padding:"0 14px", gap:"10px", border:"1px solid rgba(212,183,143,0.45)"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4B78F" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="m21 21-3.5-3.5"/></svg>
          <input placeholder="Search for products, styles, brands..." style={{background:"transparent", border:"none", outline:"none", color:"#777", flex:1, fontSize:"12px"}}/>
        </div>
      </div>

      {/* BANNER */}
      <div style={{margin:"14px 16px", borderRadius:"14px", height:"148px", position:"relative", overflow:"hidden", background:"#111", border:"1px solid #1e1e1e"}}>
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600" style={{position:"absolute", right:0, top:0, width:"55%", height:"100%", objectFit:"cover"}} alt=""/>
        <div style={{position:"absolute", inset:0, background:"linear-gradient(90deg, #0a0a0a 0%, #0a0a0a 50%, transparent 100%)"}}></div>
        <div style={{position:"relative", padding:"16px", width:"62%"}}>
          <div style={{color:"#D4B78F", fontSize:"10px", fontWeight:"700"}}>NEW ARRIVALS</div>
          <div style={{fontSize:"22px", fontFamily:"serif", lineHeight:"1.1", marginTop:"4px"}}>Fall Collection 2026</div>
          <div style={{color:"#999", fontSize:"10px", marginTop:"4px"}}>Luxury. Timeless. Curated for you.</div>
          <button style={{marginTop:"12px", background:"#D4B78F", color:"#000", border:"none", padding:"6px 12px", borderRadius:"4px", fontSize:"9px", fontWeight:"700"}}>SHOP NOW</button>
        </div>
      </div>

      {/* SHOP BY STYLE */}
      <div style={{padding:"0 16px"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}><b style={{fontSize:"14px"}}>Shop by Style</b><span style={{color:"#D4B78F", fontSize:"11px"}}>See all ›</span></div>
        <div style={{display:"flex", gap:"10px", marginTop:"12px", overflowX:"auto"}}>
          {[
            {n:"Minimal", img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200"},
            {n:"Evening", img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200"},
            {n:"Casual", img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200"},
            {n:"Streetwear", img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200"},
            {n:"Accessories", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200"},
          ].map(s=>(
            <div key={s.n} style={{minWidth:"54px", textAlign:"center"}}>
              <div style={{width:"54px", height:"54px", borderRadius:"999px", overflow:"hidden", border:"1px solid rgba(212,183,143,0.5)", background:"#151515"}}>
                <img src={s.img} style={{width:"100%", height:"100%", objectFit:"cover"}} alt=""/>
              </div>
              <div style={{fontSize:"9px", marginTop:"6px", color:"#ccc"}}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING NOW */}
      <div style={{padding:"18px 16px 0"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}><b style={{fontSize:"14px"}}>Trending Now</b><span style={{color:"#D4B78F", fontSize:"11px"}}>See all ›</span></div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginTop:"10px"}}>
          <div style={{background:"#141414", borderRadius:"12px", padding:"8px", border:"1px solid #222"}}>
            <div style={{height:"150px", borderRadius:"8px", overflow:"hidden", position:"relative", background:"#000"}}>
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" style={{width:"100%", height:"100%", objectFit:"cover"}} alt=""/>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)"}}></div>
              <div style={{position:"absolute", bottom:"10px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"11px", fontWeight:"600"}}>Silk Blazer</div><div style={{color:"#D4B78F", fontSize:"10px", marginTop:"2px"}}>$189.00</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"8px", background:"transparent", border:"1px solid rgba(212,183,143,0.6)", color:"#D4B78F", borderRadius:"6px", padding:"6px", fontSize:"9px", fontWeight:"600"}}>ADD TO CART</button>
          </div>
          <div style={{background:"#141414", borderRadius:"12px", padding:"8px", border:"1px solid #222"}}>
            <div style={{height:"150px", borderRadius:"8px", overflow:"hidden", position:"relative", background:"#000"}}>
              <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" style={{width:"100%", height:"100%", objectFit:"cover"}} alt=""/>
              <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)"}}></div>
              <div style={{position:"absolute", bottom:"10px", left:0, right:0, textAlign:"center"}}>
                <div style={{fontSize:"11px", fontWeight:"600"}}>Leather Bag</div><div style={{color:"#D4B78F", fontSize:"10px", marginTop:"2px"}}>$245.00</div>
              </div>
            </div>
            <button onClick={()=>setCart(c=>c+1)} style={{width:"100%", marginTop:"8px", background:"transparent", border:"1px solid rgba(212,183,143,0.6)", color:"#D4B78F", borderRadius:"6px", padding:"6px", fontSize:"9px", fontWeight:"600"}}>ADD TO CART</button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:"390px", background:"#151515", borderTop:"1.5px solid #D4B78F", borderRadius:"20px 20px 0 0", display:"flex", justifyContent:"space-around", padding:"12px 0 16px", zIndex:50}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color:"#D4B78F"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L3 10h2v10h6v-6h2v6h6V10h2L12 3z"/></svg><span style={{fontSize:"9px"}}>Home</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color:"#666"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 5h4v2H9V5z"/></svg><span style={{fontSize:"9px"}}>Shop</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color:"#666"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M10 8l6 4-6 4V8z" fill="#151515"/></svg><span style={{fontSize:"9px"}}>Reels</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color:"#666", position:"relative"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-2V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v1h18V9a2 2 0 0 0-2-2z"/><path d="M4 11v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6H4z"/></svg>
          {cart>0 && <span style={{position:"absolute", top:"-6px", right:"-4px", background:"#D4B78F", color:"#000", fontSize:"8px", width:"12px", height:"12px", borderRadius:"999px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold"}}>{cart}</span>}
          <span style={{fontSize:"9px"}}>Bag</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", color:"#666"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7.5" r="3.5"/><path d="M12 12c-4.5 0-7 2.2-7 3.5V18h14v-2.5c0-1.3-2.5-3.5-7-3.5z"/></svg><span style={{fontSize:"9px"}}>Profile</span>
        </div>
      </div>

    </div>
    </div>
  );
      }
