export const dynamic = 'force-dynamic';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rlsmcomxugstuoerdam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsc21jb214dWdzdHVvZXVyZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzc0NzYsImV4cCI6MjEwNDk1MzQ3Nn0.ULyXgr3vMPSZnxRa7qzHf3mmuVqax7u3jfyiGfQB7Nk"
);

export async function POST(req: Request) {
  try{
    const body = await req.json();
    
    // Chota image - base64 hatao agar bada hai
    let img = body.image_url || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
    if(img.length > 50000){
      img = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400";
    }

    const { data, error } = await supabase.from("products").insert([{
      name: body.name,
      price: Number(body.price),
      category: body.category || "FASHION",
      subcategory: "MALE",
      image_url: img,
      shop_name: body.shop_name || "Kaiba",
      stock: Number(body.stock) || 10,
      is_active: true
    }]).select();

    if(error){
      console.log("SUPABASE ERROR:", error);
      return new Response(JSON.stringify({error:error.message, details:error}), {status:400});
    }
    return new Response(JSON.stringify({success:true, data}), {status:200});
  }catch(e:any){
    console.log("API CATCH ERROR:", e);
    return new Response(JSON.stringify({error:"internal error: "+e.message}), {status:500});
  }
}

export async function GET(){
  const {data} = await supabase.from("products").select("*").order("created_at",{ascending:false}).limit(20);
  return new Response(JSON.stringify(data), {status:200});
  }
