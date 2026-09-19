export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try{
    const body = await req.json();
    let img = body.image_url || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
    if(img.length > 50000) img = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";

    const supaRes = await fetch("https://rlsmcomxugstuoerdam.supabase.co/rest/v1/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk",
        "Prefer":"return=representation"
      },
      body: JSON.stringify({
        name: body.name,
        price: Number(body.price),
        category: body.category || "FASHION",
        image_url: img,
        shop_name: body.shop_name || "KAIHA",
        stock: Number(body.stock) || 10,
        is_active: true
      })
    });

    const data = await supaRes.json();
    if(!supaRes.ok){
      return new Response(JSON.stringify({error: data.message || JSON.stringify(data)}), {status:400});
    }
    return new Response(JSON.stringify({success:true, data}), {status:200});
  }catch(e:any){
    return new Response(JSON.stringify({error:e.message}), {status:500});
  }
}

export async function GET(){
  const res = await fetch("https://rlsmcomxugstuoerdam.supabase.co/rest/v1/products?order=created_at.desc&limit=20",{
    headers:{
      "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk",
      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk"
    }
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {status:200});
}
