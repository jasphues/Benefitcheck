import { useState } from "react";

const PROVIDERS = [
  { id: 1, name: "Hrmony", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: true, priceFrom: 3.5, rating: 4.6, reviews: 142, founded: 2019, hq: "München", highlights: ["Multi-Benefit-Plattform", "Personio-Integration", "Inkl. 3rd-Party-Rabatte"], employees: "Alle Größen", sachbezugModel: "Digitale Gutscheine", website: "hrmony.de" },
  { id: 2, name: "Spendit", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 3.0, rating: 4.3, reviews: 98, founded: 2014, hq: "München", highlights: ["SpenditCard (Visa)", "60 Regionen", "5.500+ Kunden"], employees: "Ab 10 MA", sachbezugModel: "Prepaid Visa-Karte", website: "spendit.de" },
  { id: 3, name: "Edenred", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 2.5, rating: 4.1, reviews: 76, founded: 1962, hq: "München (DE)", highlights: ["50+ Jahre Erfahrung", "Börsennotiert", "City Card + Online"], employees: "Alle Größen", sachbezugModel: "City Card + Gutscheine", website: "edenred.de" },
  { id: 4, name: "Belonio", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 2.4, rating: 4.4, reviews: 67, founded: 2015, hq: "Münster", highlights: ["Größtes Akzeptanzstellen-Netz", "Ab €29/MA/Jahr", "650+ Arbeitgeber"], employees: "Ab 5 MA", sachbezugModel: "App + Karte", website: "belonio.de" },
  { id: 5, name: "Probonio", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: true, priceFrom: 3.0, rating: 4.5, reviews: 53, founded: 2020, hq: "München", highlights: ["Startup-freundlich", "~100 Gutschein-Partner", "Flexible Module"], employees: "Ab 1 MA", sachbezugModel: "Digitale Gutscheine", website: "probonio.de" },
  { id: 6, name: "Billyard", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 2.9, rating: 4.3, reviews: 41, founded: 2019, hq: "Berlin", highlights: ["Cafeteria-Modell", "Belegprüfung per AI", "DATEV-Schnittstelle"], employees: "Ab 10 MA", sachbezugModel: "App-basiert", website: "billyard.de" },
  { id: 7, name: "LOFINO", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 3.2, rating: 4.2, reviews: 34, founded: 2020, hq: "Deutschland", highlights: ["Automatische Belegprüfung", "Payroll-Integration", "Flexible Budgets"], employees: "Ab 10 MA", sachbezugModel: "App + Belege", website: "lofino.de" },
  { id: 8, name: "Guudcard", type: "Sachbezugskarte", sachbezug: true, essen: false, mobil: false, rabatte: false, priceFrom: 2.0, rating: 4.5, reviews: 29, founded: 2019, hq: "Hamburg", highlights: ["Nachhaltiges Partnernetzwerk", "Impact-Rechner", "B Corp zertifiziert"], employees: "Ab 5 MA", sachbezugModel: "Prepaid-Karte (nachhaltig)", website: "guud-benefits.com" },
  { id: 9, name: "Corporate Benefits", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, rating: 4.0, reviews: 187, founded: 2003, hq: "Berlin", highlights: ["Marktführer Europa", "1.500+ Marken", "Kostenlos für Arbeitgeber"], employees: "Ab 50 MA", sachbezugModel: "—", website: "corporate-benefits.de" },
  { id: 10, name: "FutureBens", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, rating: 4.4, reviews: 38, founded: 2020, hq: "Berlin", highlights: ["Nachhaltige Top-Marken", "Bis 45% Rabatt", "Co-Branded Portal"], employees: "Ab 5 MA", sachbezugModel: "—", website: "futurebens.co" },
  { id: 11, name: "Benefits.me", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, rating: 3.9, reviews: 24, founded: 2018, hq: "Deutschland", highlights: ["Kostenlos", "Employer-Branding-Fokus", "Schnelle Einrichtung"], employees: "Alle Größen", sachbezugModel: "—", website: "benefits.me" },
];

const BENEFITS_CATEGORIES = [
  { key: "sachbezug", label: "Sachbezug (€50)", icon: "🎫", desc: "Steuerfreie €50/Monat als Gutschein oder Karte" },
  { key: "essen", label: "Essenszuschuss", icon: "🍽", desc: "Bis zu €7,67/Tag steuerbegünstigt" },
  { key: "mobil", label: "Mobilität", icon: "🚲", desc: "Jobticket, Jobrad, Mobilitätsbudget" },
  { key: "rabatte", label: "Mitarbeiterrabatte", icon: "🏷", desc: "Exklusive Rabatte & Sonderkonditionen bei Top-Marken" },
];

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  return (
    <span style={{ fontSize: 14, letterSpacing: 1 }}>
      {"★".repeat(full)}{half ? "½" : ""}
      <span style={{ opacity: 0.2 }}>{"★".repeat(5 - full - (half ? 1 : 0))}</span>
      <span style={{ marginLeft: 6, fontSize: 13, fontWeight: 600 }}>{rating}</span>
    </span>
  );
}

function Check({ ok }) {
  return ok
    ? <span style={{ color: "#0F6E56", fontWeight: 600, fontSize: 18 }}>✓</span>
    : <span style={{ color: "#B4B2A9", fontSize: 18 }}>—</span>;
}

function Header({ page, setPage }) {
  return (
    <header style={{ borderBottom: "1px solid #E8E6DF", background: "#FAFAF7", padding: "0 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Instrument Serif', Georgia, serif" }}>B</div>
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#1a1a18", letterSpacing: -0.5 }}>benefitcheck</span>
          <span style={{ fontSize: 13, color: "#0F6E56", fontWeight: 600, marginLeft: -4 }}>.de</span>
        </div>
        <nav style={{ display: "flex", gap: 28, fontSize: 14 }}>
          {[
            { key: "sachbezug", label: "Benefits-Vergleich" },
            { key: "rechner", label: "Steuerrechner" },
            { key: "home", label: "Alle Kategorien" },
          ].map(n => (
            <span key={n.key} onClick={() => setPage(n.key)} style={{ cursor: "pointer", color: page === n.key ? "#0F6E56" : "#5F5E5A", fontWeight: page === n.key ? 600 : 400, borderBottom: page === n.key ? "2px solid #0F6E56" : "2px solid transparent", paddingBottom: 4 }}>{n.label}</span>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <section style={{ background: "#FAFAF7", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#E1F5EE", color: "#085041", fontSize: 13, fontWeight: 600, padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>Unabhängig · Transparent · DACH-fokussiert</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 48, fontWeight: 400, lineHeight: 1.15, color: "#1a1a18", margin: "0 0 20px", letterSpacing: -1 }}>
            Der ehrliche Vergleich für<br />Mitarbeiter-Benefits
          </h1>
          <p style={{ fontSize: 18, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 36px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Finde die passende Benefits-Plattform für dein Unternehmen. Sachbezug, Essenszuschuss, Mobilität — alle Anbieter, ehrliche Bewertungen, steuerliche Einordnung.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("sachbezug")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Sachbezug-Anbieter vergleichen</button>
            <button onClick={() => setPage("rechner")} style={{ background: "#fff", color: "#1a1a18", border: "1px solid #D3D1C7", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>Steuerrechner starten</button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px", letterSpacing: -0.5 }}>Beliebte Benefit-Kategorien</h2>
        <p style={{ color: "#5F5E5A", fontSize: 15, margin: "0 0 32px" }}>Vergleiche Anbieter in den gefragtesten Kategorien für steuerfreie Mitarbeiter-Benefits.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { title: "Sachbezug (€50/Monat)", desc: "Steuerfreie Gutscheine & Karten — der beliebteste Benefit in Deutschland. 8 Anbieter im Vergleich.", count: "8 Anbieter", page: "sachbezug", color: "#E1F5EE", accent: "#0F6E56" },
            { title: "Mitarbeiterrabatte", desc: "Exklusive Sonderkonditionen bei Top-Marken — kostenlos für Arbeitgeber. Von Lifestyle bis Nachhaltigkeit.", count: "5 Anbieter", page: "sachbezug", color: "#FAEEDA", accent: "#854F0B" },
            { title: "Essenszuschuss", desc: "Bis zu €7,67 pro Arbeitstag steuerbegünstigt. Digital oder per Karte.", count: "6 Anbieter", page: "sachbezug", color: "#EEEDFE", accent: "#534AB7" },
            { title: "Mobilität & Jobrad", desc: "Deutschlandticket, Dienstrad-Leasing und flexible Mobilitätsbudgets.", count: "5 Anbieter", page: "sachbezug", color: "#E6F1FB", accent: "#185FA5" },
            { title: "Firmenfitness", desc: "Urban Sports Club, Wellhub & Co. — Fitness als steuerfreier Sachbezug.", count: "4 Anbieter", page: "sachbezug", color: "#FAECE7", accent: "#993C1D" },
            { title: "Mental Health", desc: "Psychologische Beratung, Coaching und Wellbeing-Plattformen als Benefit.", count: "3 Anbieter", page: "sachbezug", color: "#FBEAF0", accent: "#993556" },
          ].map((cat, i) => (
            <div key={i} onClick={() => setPage(cat.page)} style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 12, padding: "24px", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = cat.accent}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <div style={{ display: "inline-block", background: cat.color, color: cat.accent, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 6, marginBottom: 12 }}>{cat.count}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>{cat.title}</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#F5F4F0", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>Steuerfreie Benefits auf einen Blick</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { label: "Sachbezugsfreigrenze", value: "€50", sub: "pro Monat & Mitarbeitender", note: "§8 Abs. 2 S.11 EStG" },
              { label: "Essenszuschuss", value: "€7,67", sub: "pro Arbeitstag (max. 15 Tage)", note: "R 8.1 Abs. 7 LStR" },
              { label: "Anlass-Sachbezug", value: "€60", sub: "pro persönlichem Anlass", note: "Geburtstag, Hochzeit etc." },
              { label: "Erholungsbeihilfe", value: "€156", sub: "pro Jahr (pauschalbesteuert)", note: "§40 Abs. 2 Nr. 3 EStG" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #E8E6DF" }}>
                <p style={{ fontSize: 13, color: "#888780", margin: "0 0 4px", fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: "#0F6E56", margin: "0 0 4px", fontFamily: "'DM Mono', monospace" }}>{item.value}</p>
                <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 4px" }}>{item.sub}</p>
                <p style={{ fontSize: 11, color: "#B4B2A9", margin: 0 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 40px" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, margin: "0 0 8px" }}>Häufige Fragen zu Mitarbeiter-Benefits</h2>
        <p style={{ color: "#5F5E5A", fontSize: 14, margin: "0 0 24px" }}>Was HR-Manager am häufigsten wissen wollen.</p>
        {[
          { q: "Was ist der 50-Euro-Sachbezug?", a: "Arbeitgeber dürfen Mitarbeitenden monatlich bis zu 50 Euro als Sachbezug steuerfrei gewähren. Das können Gutscheinkarten, regionale City-Cards oder digitale Gutscheine sein. Der Sachbezug muss zusätzlich zum Gehalt gewährt werden — eine Gehaltsumwandlung ist nicht erlaubt." },
          { q: "Welche Benefits sind 2026 steuerfrei?", a: "Die wichtigsten steuerfreien Benefits sind: Sachbezug (€50/Monat), Jobticket/ÖPNV-Zuschuss (steuerfrei gem. §3 Nr. 15 EStG), Anlass-Sachgeschenke (€60 pro Anlass), und der Essenszuschuss (bis €7,67/Tag bei 25% Pauschalsteuer auf den AG-Anteil über €3,10)." },
          { q: "Was kostet eine Benefits-Plattform?", a: "Die Kosten variieren von €2–8 pro Mitarbeitenden pro Monat. Einige Anbieter wie Belonio starten ab €29/MA/Jahr. Viele bieten kostenlose Testphasen an. Die Einrichtung ist oft kostenlos oder liegt bei €200–500 einmalig." },
        ].map((faq, i) => (
          <details key={i} style={{ borderBottom: "1px solid #E8E6DF", padding: "16px 0" }}>
            <summary style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", cursor: "pointer", listStyle: "none" }}>
              <span style={{ marginRight: 8, color: "#0F6E56" }}>+</span> {faq.q}
            </summary>
            <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.7, margin: "12px 0 0 24px" }}>{faq.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}

function SachbezugPage({ setPage }) {
  const [sortBy, setSortBy] = useState("rating");
  const [filterType, setFilterType] = useState("all");

  const filtered = PROVIDERS
    .filter(p => filterType === "all" || p.type === filterType)
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : a.priceFrom - b.priceFrom);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.de / Anbieter-Vergleich</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px", letterSpacing: -0.5 }}>Mitarbeiter-Benefits Anbieter Vergleich 2026</h1>
        <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 4px", maxWidth: 680 }}>
          Die besten Anbieter für Sachbezug, Essenszuschuss, Mitarbeiterrabatte und mehr — im unabhängigen Vergleich. Preise, Funktionen und echte Bewertungen.
        </p>
        <p style={{ fontSize: 13, color: "#B4B2A9", margin: "8px 0 0" }}>Letzte Aktualisierung: April 2026 · {PROVIDERS.length} Anbieter verglichen</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#888780", fontWeight: 500 }}>Filtern:</span>
        {["all", "All-in-One", "Sachbezugskarte", "Rabattportal"].map(f => (
          <button key={f} onClick={() => setFilterType(f)} style={{
            background: filterType === f ? "#0F6E56" : "#fff",
            color: filterType === f ? "#fff" : "#5F5E5A",
            border: `1px solid ${filterType === f ? "#0F6E56" : "#D3D1C7"}`,
            padding: "6px 14px", borderRadius: 6, fontSize: 13, cursor: "pointer", fontWeight: 500
          }}>{f === "all" ? "Alle" : f}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#888780" }}>Sortieren:</span>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #D3D1C7", fontSize: 13, color: "#1a1a18", background: "#fff" }}>
          <option value="rating">Beste Bewertung</option>
          <option value="price">Niedrigster Preis</option>
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E8E6DF" }}>
              <th style={{ textAlign: "left", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Anbieter</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Typ</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Sachbezug</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Essen</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Mobilität</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Rabatte</th>
              <th style={{ textAlign: "right", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Ab Preis</th>
              <th style={{ textAlign: "center", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Bewertung</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB", cursor: "pointer" }}
                onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "16px 8px" }}>
                  <div style={{ fontWeight: 600, color: "#1a1a18" }}>{i === 0 && <span style={{ background: "#E1F5EE", color: "#085041", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, marginRight: 6 }}>TOP</span>}{p.name}</div>
                  <div style={{ fontSize: 12, color: "#888780", marginTop: 2 }}>{p.hq} · Seit {p.founded}</div>
                </td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}>
                  <span style={{ fontSize: 12, background: p.type === "All-in-One" ? "#EEEDFE" : p.type === "Rabattportal" ? "#FAEEDA" : "#F5F4F0", color: p.type === "All-in-One" ? "#534AB7" : p.type === "Rabattportal" ? "#854F0B" : "#5F5E5A", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{p.type}</span>
                </td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.sachbezug} /></td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.essen} /></td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.mobil} /></td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.rabatte} /></td>
                <td style={{ textAlign: "right", padding: "16px 8px", fontWeight: 600, color: "#1a1a18" }}>{p.priceFrom === 0 ? <span style={{ color: "#0F6E56" }}>Kostenlos</span> : <span>€{p.priceFrom.toFixed(2)}<span style={{ fontWeight: 400, color: "#888780", fontSize: 11 }}>/MA/Mon.</span></span>}</td>
                <td style={{ textAlign: "center", padding: "16px 8px" }}><Stars rating={p.rating} /><div style={{ fontSize: 11, color: "#B4B2A9" }}>{p.reviews} Bewertungen</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, margin: "0 0 24px" }}>Anbieter im Detail</h2>
        <div style={{ display: "grid", gap: 16 }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 12, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "#888780", margin: "0 0 12px" }}>{p.type} · {p.hq} · Gegründet {p.founded} · {p.employees}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                    {p.highlights.map((h, i) => (
                      <span key={i} style={{ fontSize: 12, background: "#F5F4F0", color: "#5F5E5A", padding: "3px 10px", borderRadius: 6 }}>{h}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 4px" }}>
                    {p.sachbezugModel !== "—" ? <span>Sachbezug-Modell: <strong style={{ color: "#1a1a18" }}>{p.sachbezugModel}</strong></span> : null}
                    {p.rabatte && <span style={{ display: "inline-block", marginLeft: p.sachbezugModel !== "—" ? 12 : 0 }}>
                      <span style={{ background: "#FAEEDA", color: "#854F0B", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>Mitarbeiterrabatte</span>
                    </span>}
                  </p>
                </div>
                <div style={{ textAlign: "right", minWidth: 140 }}>
                  <Stars rating={p.rating} />
                  <p style={{ fontSize: 12, color: "#888780", margin: "4px 0 12px" }}>{p.reviews} Bewertungen</p>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#0F6E56" }}>{p.priceFrom === 0 ? "Kostenlos" : `ab €${p.priceFrom.toFixed(2)}`}</div>
                  <p style={{ fontSize: 11, color: "#888780", margin: "2px 0 0" }}>{p.priceFrom === 0 ? "für Arbeitgeber" : "pro MA/Monat"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RechnerPage() {
  const [employees, setEmployees] = useState(50);
  const [sachbezug, setSachbezug] = useState(true);
  const [essen, setEssen] = useState(true);
  const [mobil, setMobil] = useState(false);

  const sachbezugMonthly = sachbezug ? 50 : 0;
  const essenMonthly = essen ? 115.05 : 0;
  const mobilMonthly = mobil ? 63 : 0;
  const totalPerEmployee = sachbezugMonthly + essenMonthly + mobilMonthly;
  const totalPerYear = totalPerEmployee * 12;
  const totalCompany = totalPerYear * employees;

  const bruttoEquivalent = totalPerYear / 0.52;
  const savingsPerEmployee = bruttoEquivalent - totalPerYear;
  const totalSavings = savingsPerEmployee * employees;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.de / Steuerrechner</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px" }}>Steuerfreie Benefits berechnen</h1>
      <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 36px", maxWidth: 600 }}>
        Berechne, wie viel dein Unternehmen und deine Mitarbeitenden durch steuerfreie Benefits sparen — im Vergleich zu einer klassischen Brutto-Gehaltserhöhung.
      </p>

      <div style={{ background: "#FAFAF7", borderRadius: 12, padding: "28px", border: "1px solid #E8E6DF", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px", color: "#1a1a18" }}>1. Wie viele Mitarbeitende?</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <input type="range" min="1" max="500" value={employees} onChange={e => setEmployees(Number(e.target.value))} style={{ flex: 1 }} />
          <div style={{ minWidth: 80, textAlign: "right" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#0F6E56" }}>{employees}</span>
            <span style={{ fontSize: 13, color: "#888780", marginLeft: 4 }}>MA</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#FAFAF7", borderRadius: 12, padding: "28px", border: "1px solid #E8E6DF", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px", color: "#1a1a18" }}>2. Welche Benefits möchtest du anbieten?</h2>
        {[
          { key: "sachbezug", label: "Sachbezug (€50/Monat)", value: sachbezug, set: setSachbezug, monthly: "€50,00" },
          { key: "essen", label: "Essenszuschuss (max. 15 Tage)", value: essen, set: setEssen, monthly: "€115,05" },
          { key: "mobil", label: "Deutschlandticket / Mobilität", value: mobil, set: setMobil, monthly: "€63,00" },
        ].map(b => (
          <label key={b.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #E8E6DF", cursor: "pointer" }}>
            <input type="checkbox" checked={b.value} onChange={e => b.set(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#0F6E56" }} />
            <span style={{ flex: 1, fontSize: 15, color: "#1a1a18" }}>{b.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#0F6E56" }}>{b.monthly}/MA</span>
          </label>
        ))}
      </div>

      <div style={{ background: "#0F6E56", borderRadius: 12, padding: "32px", color: "#fff" }}>
        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 24px", opacity: 0.8 }}>Ergebnis: Deine Ersparnis</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 4px" }}>Nettovorteil pro MA/Jahr</p>
            <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>€{Math.round(totalPerYear).toLocaleString("de-DE")}</p>
          </div>
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 4px" }}>Gesamt für {employees} MA/Jahr</p>
            <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>€{Math.round(totalCompany).toLocaleString("de-DE")}</p>
          </div>
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 4px" }}>Brutto-Äquivalent (bei ~48% Abzügen)</p>
            <p style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>€{Math.round(bruttoEquivalent).toLocaleString("de-DE")}/MA</p>
          </div>
          <div>
            <p style={{ fontSize: 13, opacity: 0.7, margin: "0 0 4px" }}>Gesamte Steuer- & Abgabenersparnis</p>
            <p style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "#9FE1CB" }}>€{Math.round(totalSavings).toLocaleString("de-DE")}/Jahr</p>
          </div>
        </div>
        <p style={{ fontSize: 12, opacity: 0.5, marginTop: 20, marginBottom: 0 }}>Berechnungsgrundlage: StKl. I, keine Kinder, 54.000€ Brutto, gesetzlich versichert. Tatsächliche Werte können abweichen.</p>
      </div>

      <div style={{ marginTop: 24, padding: "20px", background: "#FAFAF7", borderRadius: 12, border: "1px solid #E8E6DF" }}>
        <p style={{ fontSize: 14, color: "#5F5E5A", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#1a1a18" }}>Was bedeutet das?</strong> Statt einer Brutto-Gehaltserhöhung von €{Math.round(bruttoEquivalent).toLocaleString("de-DE")} können deine Mitarbeitenden den gleichen Nettovorteil über steuerfreie Benefits erhalten — und dein Unternehmen spart sich die Lohnnebenkosten. Die passenden Anbieter findest du in unserem <span style={{ color: "#0F6E56", fontWeight: 600, cursor: "pointer" }}>Sachbezug-Vergleich</span>.
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#1a1a18", color: "#888780", padding: "48px 24px", marginTop: 56 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Instrument Serif', Georgia, serif" }}>B</div>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#D3D1C7" }}>benefitcheck.de</span>
            </div>
            <p style={{ fontSize: 13, color: "#5F5E5A", maxWidth: 300, lineHeight: 1.6, margin: 0 }}>Das unabhängige Vergleichsportal für Mitarbeiter-Benefits im DACH-Raum. Sachbezug, Essenszuschuss, Firmenfitness & mehr.</p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Vergleiche</p>
              {["Sachbezug-Anbieter", "Mitarbeiterrabatte", "Essenszuschuss", "Firmenfitness", "Mobilitätsbudget"].map(l => (
                <p key={l} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780" }}>{l}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Ressourcen</p>
              {["Steuerrechner", "Benefits-Guide 2026", "§8 EStG erklärt", "ZAG-Kriterien", "Newsletter"].map(l => (
                <p key={l} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780" }}>{l}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2C2C2A", marginTop: 32, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#5F5E5A", margin: 0 }}>© 2026 benefitcheck.de · Alle Angaben ohne Gewähr</p>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "#5F5E5A" }}>
            <span>Impressum</span><span>Datenschutz</span><span>Für Anbieter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#1a1a18", background: "#fff", minHeight: "100vh" }}>
      <Header page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "sachbezug" && <SachbezugPage setPage={setPage} />}
      {page === "rechner" && <RechnerPage />}
      <Footer />
    </div>
  );
}
