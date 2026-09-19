export const dynamic = 'force-dynamic';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rlsmcomxugstuoerdam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk"
);

export async function POST(req: Request) {
  try{
    const body = await req.json();
    let img = body.image_url || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
    if(img.length > 50000) img = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";

    // Sirf wahi columns jo aapki table me hain
    const { data, error } = await supabase.from("products").insert([{
      name: body.name,
      price: Number(body.price),
      category: body.category || "FASHION",
      image_url: img,
      shop_name: body.shop_name || "Kaiba",
      stock: Number(body.stock) || 10,
      is_active: true
    }]).select();

    if(error) return new Response(JSON.stringify({error:error.message}), {status:400});
    return new Response(JSON.stringify({success:true, data}), {status:200});
  }catch(e:any){
    return new Response(JSON.stringify({error:e.message}), {status:500});
  }
}
