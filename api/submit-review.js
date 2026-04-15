import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { providerId, name, email, rating, text } = req.body;
  if (!providerId || !name || !email || !rating || !text) {
    return res.status(400).json({ success: false, message: "Alle Felder sind erforderlich." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Remove existing unverified from same email + provider
  await supabase.from("reviews")
    .delete()
    .eq("email", email)
    .eq("provider_id", providerId)
    .eq("verified", false);

  const { error } = await supabase.from("reviews").insert({
    provider_id: providerId,
    name, email,
    rating: parseInt(rating),
    text,
    verified: false,
    verification_code: code,
  });

  if (error) return res.status(500).json({ success: false, message: "Datenbankfehler." });

  await resend.emails.send({
    from: "BenefitCheck <noreply@benefitcheck.net>",
    to: email,
    subject: "Deine Bewertung bestätigen — BenefitCheck",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 32px; background: #fff;">
        <div style="margin-bottom: 28px;">
          <div style="width: 36px; height: 36px; background: #0F6E56; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 18px; margin-bottom: 16px;">B</div>
          <h2 style="color: #1a1a18; margin: 0 0 8px; font-size: 22px;">Bewertung bestätigen</h2>
          <p style="color: #5F5E5A; margin: 0;">Hallo ${name}, gib diesen Code auf benefitcheck.net ein:</p>
        </div>
        <div style="background: #F5F4F0; padding: 28px; border-radius: 12px; text-align: center; margin: 24px 0;">
          <span style="font-size: 40px; font-weight: 700; letter-spacing: 10px; color: #0F6E56; font-family: monospace;">${code}</span>
        </div>
        <p style="color: #B4B2A9; font-size: 13px; margin: 0;">Der Code ist 30 Minuten gültig. Wenn du keine Bewertung abgegeben hast, ignoriere diese E-Mail.</p>
      </div>
    `,
  });

  res.json({ success: true });
}
