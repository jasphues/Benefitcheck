import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, code } = req.body;

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("email", email)
    .eq("verification_code", code)
    .eq("verified", false)
    .single();

  if (error || !data) {
    return res.json({ success: false, message: "Code falsch oder abgelaufen." });
  }

  const ageMs = Date.now() - new Date(data.created_at).getTime();
  if (ageMs > 30 * 60 * 1000) {
    return res.json({ success: false, message: "Code abgelaufen. Bitte erneut einreichen." });
  }

  await supabase.from("reviews")
    .update({ verified: true, verification_code: null })
    .eq("id", data.id);

  res.json({ success: true });
}
