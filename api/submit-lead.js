import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { answers, contact, recommendations } = req.body;
  if (!contact?.email || !contact?.unternehmen) {
    return res.status(400).json({ success: false, message: "Pflichtfelder fehlen." });
  }

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
      <div style="background: #0F6E56; color: #fff; padding: 20px 24px; border-radius: 10px; margin-bottom: 28px;">
        <h2 style="margin: 0; font-size: 20px;">Neuer Lead — BenefitCheck Beratung</h2>
        <p style="margin: 6px 0 0; opacity: 0.8; font-size: 14px;">${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })} Uhr</p>
      </div>

      <h3 style="color: #1a1a18; font-size: 16px; margin: 0 0 12px;">Kontaktdaten</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr><td style="padding: 8px 0; color: #888; font-size: 14px; width: 160px;">Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${contact.vorname} ${contact.nachname}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Unternehmen</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${contact.unternehmen}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">E-Mail</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${contact.email}" style="color: #0F6E56;">${contact.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 14px;">Telefon</td><td style="padding: 8px 0; font-size: 14px;">${contact.telefon || "—"}</td></tr>
      </table>

      <h3 style="color: #1a1a18; font-size: 16px; margin: 0 0 12px;">Antworten im Fragebogen</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
        <tr style="background: #FAFAF7;"><td style="padding: 10px 12px; color: #888; font-size: 13px; width: 200px;">Ziele</td><td style="padding: 10px 12px; font-size: 13px;">${answers.goals?.join(", ") || "—"}</td></tr>
        <tr><td style="padding: 10px 12px; color: #888; font-size: 13px;">Budget/MA/Monat</td><td style="padding: 10px 12px; font-size: 13px; font-weight: 600;">${answers.budget || "—"}</td></tr>
        <tr style="background: #FAFAF7;"><td style="padding: 10px 12px; color: #888; font-size: 13px;">Zahlungsmodell</td><td style="padding: 10px 12px; font-size: 13px;">${answers.payModel || "—"}</td></tr>
        <tr><td style="padding: 10px 12px; color: #888; font-size: 13px;">International</td><td style="padding: 10px 12px; font-size: 13px;">${answers.international || "—"}</td></tr>
        <tr style="background: #FAFAF7;"><td style="padding: 10px 12px; color: #888; font-size: 13px;">Arbeitsmodell</td><td style="padding: 10px 12px; font-size: 13px;">${answers.homeoffice || "—"}</td></tr>
        <tr><td style="padding: 10px 12px; color: #888; font-size: 13px;">Gewünschte Benefits</td><td style="padding: 10px 12px; font-size: 13px;">${answers.benefits?.join(", ") || "—"}</td></tr>
        <tr style="background: #FAFAF7;"><td style="padding: 10px 12px; color: #888; font-size: 13px;">HR-Kapazität</td><td style="padding: 10px 12px; font-size: 13px;">${answers.hrCapacity || "—"}</td></tr>
        <tr><td style="padding: 10px 12px; color: #888; font-size: 13px;">Startzeitpunkt</td><td style="padding: 10px 12px; font-size: 13px;">${answers.startDate || "—"}</td></tr>
      </table>

      <h3 style="color: #1a1a18; font-size: 16px; margin: 0 0 12px;">Empfohlene Anbieter</h3>
      <p style="font-size: 14px; color: #5F5E5A; background: #E1F5EE; padding: 12px 16px; border-radius: 8px;">${recommendations?.join(" · ") || "—"}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "BenefitCheck <noreply@benefitcheck.net>",
      to: "info@benefitcheck.net",
      subject: `🎯 Neuer Lead: ${contact.unternehmen} (${contact.vorname} ${contact.nachname})`,
      html,
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: "E-Mail konnte nicht gesendet werden." });
  }
}
