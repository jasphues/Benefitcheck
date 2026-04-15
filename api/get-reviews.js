import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { providerId } = req.query;
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, text, created_at")
    .eq("provider_id", parseInt(providerId))
    .eq("verified", true)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ reviews: [] });
  res.json({ reviews: data || [] });
}
