import { useState, useEffect } from "react";

const MAILCHIMP_URL = "https://futurebens.us1.list-manage.com/subscribe/post-json?u=d25ae9208aa419ec653b26ed3&id=eaf9e0d73d&f_id=0040d4e4f0";

function subscribeMailchimp(email) {
  return new Promise((resolve, reject) => {
    const cb = "mc_cb_" + Date.now();
    const script = document.createElement("script");
    window[cb] = (data) => {
      delete window[cb];
      document.head.removeChild(script);
      data.result === "success" ? resolve(data) : reject(data);
    };
    script.src = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=${cb}`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const PROVIDERS = [
  { id: 1, name: "Hrmony", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: true, priceFrom: 3.5, founded: 2019, hq: "München", highlights: ["Multi-Benefit-Plattform", "Personio-Integration", "Inkl. 3rd-Party-Rabatte"], employees: "Alle Größen", sachbezugModel: "Digitale Gutscheine", website: "hrmony.de", differenzierung: "Einzige Plattform mit nativer Personio-Integration" },
  { id: 2, name: "Spendit", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 3.0, founded: 2014, hq: "München", highlights: ["SpenditCard (Visa)", "60 Regionen", "5.500+ Kunden"], employees: "Ab 10 MA", sachbezugModel: "Prepaid Visa-Karte", website: "spendit.de", differenzierung: "Regionale Visa-Karte — 60 Akzeptanzzonen deutschlandweit" },
  { id: 3, name: "Edenred", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 2.5, founded: 1962, hq: "München (DE)", highlights: ["50+ Jahre Erfahrung", "Börsennotiert", "City Card + Online"], employees: "Alle Größen", sachbezugModel: "City Card + Gutscheine", website: "edenred.de", differenzierung: "60+ Jahre Marktpräsenz & flächendeckendes stationäres Netz" },
  { id: 4, name: "Belonio", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 2.4, founded: 2015, hq: "Münster", highlights: ["Größtes Akzeptanzstellen-Netz", "Ab €29/MA/Jahr", "650+ Arbeitgeber"], employees: "Ab 5 MA", sachbezugModel: "App + Karte", website: "belonio.de", differenzierung: "Günstigster Gesamtpreis: ab €29/MA/Jahr" },
  { id: 5, name: "Probonio", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: true, priceFrom: 3.0, founded: 2020, hq: "München", highlights: ["Startup-freundlich", "~100 Gutschein-Partner", "Flexible Module"], employees: "Ab 1 MA", sachbezugModel: "Digitale Gutscheine", website: "probonio.de", differenzierung: "Maximale Modularität — jeder Benefit einzeln buchbar" },
  { id: 6, name: "Billyard", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 2.9, founded: 2019, hq: "Berlin", highlights: ["Cafeteria-Modell", "Belegprüfung per AI", "DATEV-Schnittstelle"], employees: "Ab 10 MA", sachbezugModel: "App-basiert", website: "billyard.de", differenzierung: "KI-Belegprüfung + direkte DATEV-Schnittstelle" },
  { id: 7, name: "LOFINO", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 3.2, founded: 2020, hq: "Deutschland", highlights: ["Automatische Belegprüfung", "Payroll-Integration", "Flexible Budgets"], employees: "Ab 10 MA", sachbezugModel: "App + Belege", website: "lofino.de", differenzierung: "Vollautomatische Abrechnung ohne HR-Mehraufwand" },
  { id: 8, name: "Guudcard", type: "Sachbezugskarte", sachbezug: true, essen: false, mobil: false, rabatte: false, priceFrom: 2.0, founded: 2019, hq: "Hamburg", highlights: ["Nachhaltiges Partnernetzwerk", "Impact-Rechner", "B Corp zertifiziert"], employees: "Ab 5 MA", sachbezugModel: "Prepaid-Karte (nachhaltig)", website: "guud-benefits.com", differenzierung: "Einziger B Corp-zertifizierter Benefits-Anbieter" },
  { id: 9, name: "Corporate Benefits", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, founded: 2003, hq: "Berlin", highlights: ["Marktführer Europa", "1.500+ Marken", "Kostenlos für Arbeitgeber"], employees: "Ab 50 MA", sachbezugModel: "—", website: "corporate-benefits.de", differenzierung: "Etablierte Plattform mit breitem Markenportfolio" },
  { id: 10, name: "FutureBens", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, founded: 2020, hq: "Berlin", highlights: ["Wertegetriebenes Employer Branding", "Modernes Plattform-Design", "Bis zu 45% Rabatt"], employees: "Ab 50 MA", sachbezugModel: "—", website: "futurebens.co", differenzierung: "Wertegetriebenes Employer Branding mit einem modernen Markenportfolio", featured: true },
  { id: 11, name: "Benefits.me", type: "Rabattportal", sachbezug: false, essen: false, mobil: false, rabatte: true, priceFrom: 0, founded: 2018, hq: "Deutschland", highlights: ["Kostenlos", "Employer-Branding-Fokus", "Schnelle Einrichtung"], employees: "Alle Größen", sachbezugModel: "—", website: "benefits.me", differenzierung: "Komplett kostenlos für Arbeitgeber mit starkem Ticketing- und Entertainment-Angebot" },
  { id: 12, name: "Givve", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 2.8, founded: 2011, hq: "München", highlights: ["Mastercard Prepaid", "Echtzeit-Aufladung", "White-Label-Option"], employees: "Ab 10 MA", sachbezugModel: "Prepaid Mastercard", website: "givve.com", differenzierung: "Einzige White-Label-Sachbezugskarte auf Mastercard-Basis" },
  { id: 13, name: "Circula", type: "All-in-One", sachbezug: true, essen: true, mobil: true, rabatte: false, priceFrom: 3.5, founded: 2017, hq: "Berlin", highlights: ["Spesen & Benefits kombiniert", "DATEV-Integration", "Visa Prepaid Card"], employees: "Ab 10 MA", sachbezugModel: "App + Visa-Karte", website: "circula.com", differenzierung: "Einzige Plattform die Spesenverwaltung und Benefits in einer Lösung vereint" },
  { id: 14, name: "Pluxee", type: "Sachbezugskarte", sachbezug: true, essen: true, mobil: false, rabatte: false, priceFrom: 2.8, founded: 1983, hq: "Frankfurt", highlights: ["Ehemals Sodexo", "40+ Jahre Erfahrung", "Pluxee Card"], employees: "Alle Größen", sachbezugModel: "Lunch Card + Gutscheine", website: "pluxee.de", differenzierung: "Internationaler Marktführer mit 40 Jahren Erfahrung im DACH-Raum" },
  // Jobrad / Dienstrad-Leasing
  { id: 15, name: "Jobrad", type: "Dienstrad-Leasing", jobrad: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 0, founded: 2012, hq: "Freiburg", highlights: ["Marktführer Deutschland", "50.000+ Arbeitgeber", "Jobrad & E-Bike"], employees: "Alle Größen", sachbezugModel: "—", website: "jobrad.org", differenzierung: "Marktführer: über 50.000 Unternehmen nutzen Jobrad deutschlandweit" },
  { id: 16, name: "Lease a Bike", type: "Dienstrad-Leasing", jobrad: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 0, founded: 2001, hq: "Düsseldorf", highlights: ["Flottenexperte", "100+ Marken", "Service inklusive"], employees: "Alle Größen", sachbezugModel: "—", website: "leaseabike.de", differenzierung: "Vom Flottenspezialisten — ideal für Unternehmen mit gemischter Mobilität" },
  { id: 17, name: "Bikeleasing-Service", type: "Dienstrad-Leasing", jobrad: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 0, founded: 2015, hq: "Flensburg", highlights: ["5.000+ Fachhändler", "Schnelle Abwicklung", "Leasingrechner"], employees: "Alle Größen", sachbezugModel: "—", website: "bikeleasing.de", differenzierung: "Größtes Fachhändlernetzwerk mit über 5.000 Partnern deutschlandweit" },
  { id: 18, name: "Eurorad", type: "Dienstrad-Leasing", jobrad: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 0, founded: 1996, hq: "Hamburg", highlights: ["1.000+ Partnerdealer", "Rundum-Sorglos-Paket", "Rahmenvertragsmodell"], employees: "Alle Größen", sachbezugModel: "—", website: "eurorad.de", differenzierung: "Direktpartnerschaft mit Herstellern — beste Konditionen für Arbeitgeber" },
  { id: 19, name: "mein-dienstrad.de", type: "Dienstrad-Leasing", jobrad: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 0, founded: 2018, hq: "Online", highlights: ["Volldigitaler Prozess", "Transparente Preise", "Einfache Einrichtung"], employees: "Ab 1 MA", sachbezugModel: "—", website: "mein-dienstrad.de", differenzierung: "Volldigitaler Prozess ohne Papierkram — in 10 Minuten startklar" },
  // Firmenfitness
  { id: 20, name: "Urban Sports Club", type: "Firmenfitness", fitness: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 20, founded: 2012, hq: "Berlin", highlights: ["50+ Sportarten", "50+ Städte", "App & Online"], employees: "Alle Größen", sachbezugModel: "—", website: "urbansportsclub.com", differenzierung: "Größtes Sport-Netzwerk in Deutschland mit 50+ Sportarten" },
  { id: 21, name: "Wellhub", type: "Firmenfitness", fitness: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 15, founded: 2012, hq: "Frankfurt", highlights: ["Ehemals Gympass", "11.000+ Studios weltweit", "Wellness inkl."], employees: "Alle Größen", sachbezugModel: "—", website: "wellhub.com", differenzierung: "Weltgrößtes Fitness-Netzwerk: 11.000+ Studios in 50+ Ländern" },
  { id: 22, name: "Hansefit", type: "Firmenfitness", fitness: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 18, founded: 1994, hq: "Hamburg", highlights: ["4.000+ Studios", "DACH-Fokus", "Keine Mindestlaufzeit"], employees: "Ab 5 MA", sachbezugModel: "—", website: "hansefit.de", differenzierung: "Stark im DACH-Raum: 4.000+ Partnerstudios ohne Mindestlaufzeit" },
  { id: 23, name: "EGYM Wellpass", type: "Firmenfitness", fitness: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 22, founded: 2012, hq: "München", highlights: ["Ehemals qualitrain", "6.000+ Einrichtungen", "Digital + Stationär"], employees: "Alle Größen", sachbezugModel: "—", website: "egym-wellpass.com", differenzierung: "6.000+ Gesundheitseinrichtungen inkl. Physiotherapie & Yoga" },
  // Mental Health
  { id: 24, name: "Nilo Health", type: "Mental Health", mental: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 5, founded: 2020, hq: "Berlin", highlights: ["1:1 Psycholog:innen", "Erstgespräch < 24h", "DSGVO-konform"], employees: "Ab 10 MA", sachbezugModel: "—", website: "nilo.health", differenzierung: "Direktzugang zu approbierten Psycholog:innen innerhalb von 24 Stunden" },
  { id: 25, name: "Likeminded", type: "Mental Health", mental: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 6, founded: 2020, hq: "München", highlights: ["Gruppen & Einzel-Sessions", "Präventiv & kurativ", "Deutsche Psycholog:innen"], employees: "Ab 10 MA", sachbezugModel: "—", website: "likeminded.care", differenzierung: "Einzige Plattform mit Kombination aus Prävention und Krisenintervention" },
  { id: 26, name: "OpenUp", type: "Mental Health", mental: true, sachbezug: false, essen: false, mobil: false, rabatte: false, priceFrom: 4, founded: 2020, hq: "Amsterdam/DE", highlights: ["Self-Service & Coaching", "24/7 verfügbar", "Mehrsprachig"], employees: "Alle Größen", sachbezugModel: "—", website: "openup.com", differenzierung: "Psychologische Unterstützung rund um die Uhr — sofort verfügbar" },
];

const SACHBEZUG_DETAILS = {
  1: { modell: "Digitale Gutscheine", akzeptanz: "Online + 3rd-Party-Partner", scope: "National", laufzeit: "Monatlich kündbar", hrAufwand: "Niedrig" },
  2: { modell: "Prepaid Visa-Karte", akzeptanz: "60 Regionen, stationär", scope: "Regional", laufzeit: "Jahresvertrag", hrAufwand: "Niedrig" },
  3: { modell: "City Card + Online", akzeptanz: "Flächendeckend stationär", scope: "National", laufzeit: "Jahresvertrag", hrAufwand: "Niedrig" },
  4: { modell: "App + Karte", akzeptanz: "Größtes Netz in DE", scope: "National", laufzeit: "Monatlich kündbar", hrAufwand: "Niedrig" },
  5: { modell: "Digitale Gutscheine", akzeptanz: "~100 Gutschein-Partner", scope: "National", laufzeit: "Monatlich kündbar", hrAufwand: "Niedrig" },
  6: { modell: "App-basiert", akzeptanz: "Frei wählbar", scope: "National", laufzeit: "Jahresvertrag", hrAufwand: "Sehr niedrig" },
  7: { modell: "App + Belege", akzeptanz: "Frei wählbar", scope: "National", laufzeit: "Monatlich kündbar", hrAufwand: "Sehr niedrig" },
  8: { modell: "Prepaid-Karte", akzeptanz: "Nachhaltiges Partnernetz", scope: "National", laufzeit: "Monatlich kündbar", hrAufwand: "Niedrig" },
  12: { modell: "Prepaid Mastercard", akzeptanz: "Überall wo Mastercard gilt (ZAG-konform)", scope: "National", laufzeit: "Jahresvertrag", hrAufwand: "Niedrig" },
  13: { modell: "App + Visa-Karte", akzeptanz: "Überall wo Visa gilt", scope: "National", laufzeit: "Jahresvertrag", hrAufwand: "Niedrig" },
  14: { modell: "Lunch Card + Gutscheine", akzeptanz: "Flächendeckend stationär", scope: "National", laufzeit: "Jahresvertrag", hrAufwand: "Niedrig" },
};

const ESSEN_DETAILS = {
  1: { preisProNutzer: "ab €3,50/MA", einreichung: "Karte + App", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Monatlich" },
  2: { preisProNutzer: "ab €3,00/MA", einreichung: "Karte (Visa)", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
  3: { preisProNutzer: "ab €2,50/MA", einreichung: "Karte + Online", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
  4: { preisProNutzer: "ab €2,42/MA", einreichung: "App + Karte", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Monatlich" },
  5: { preisProNutzer: "ab €3,00/MA", einreichung: "Beleg-Upload", belegpruefung: "Manuell geprüft", hrAufwand: "Mittel", laufzeit: "Monatlich" },
  6: { preisProNutzer: "ab €2,90/MA", einreichung: "App (Beleg-Upload)", belegpruefung: "KI-basiert", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
  7: { preisProNutzer: "ab €3,20/MA", einreichung: "App (Beleg-Upload)", belegpruefung: "Vollautomatisch", hrAufwand: "Sehr niedrig", laufzeit: "Monatlich" },
  12: { preisProNutzer: "ab €2,80/MA", einreichung: "Karte (Mastercard)", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
  13: { preisProNutzer: "ab €3,50/MA", einreichung: "Karte + App", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
  14: { preisProNutzer: "ab €2,80/MA", einreichung: "Pluxee Card", belegpruefung: "Automatisch", hrAufwand: "Niedrig", laufzeit: "Jahresvertrag" },
};

const RABATTE_DETAILS = {
  1: { marken: "inkl. 3rd-Party-Rabatte", maxRabatt: "variiert", portal: "Integriert", preisAG: "ab €3,50/MA", mindest: "Alle Größen", markenbeispiele: ["REWE", "Adidas", "Zalando", "Nike"] },
  5: { marken: "~100 Partner", maxRabatt: "variiert", portal: "Integriert", preisAG: "ab €3,00/MA", mindest: "Ab 1 MA", markenbeispiele: ["Amazon", "Zalando", "MediaMarkt", "REWE"] },
  9: { marken: "1.500+ Marken", maxRabatt: "k.A.", portal: "Eigenes Portal", preisAG: "Kostenlos", mindest: "Ab 50 MA", markenbeispiele: ["adidas", "Samsung", "H&M", "Media Markt", "OTTO", "Zalando"] },
  10: { marken: "Kuratierte Top-Marken", maxRabatt: "Bis 45%", portal: "Co-Branded Portal", preisAG: "Kostenlos", mindest: "Ab 50 MA", markenbeispiele: ["ArmedAngels", "FlixTrain", "HelloFresh", "Seeberger", "Arket", "Koro"] },
  11: { marken: "k.A.", maxRabatt: "k.A.", portal: "Eigenes Portal", preisAG: "Kostenlos", mindest: "Alle Größen", markenbeispiele: ["Eventim", "CinemaxX", "Zalando", "OTTO"] },
};

const MOBIL_DETAILS = {
  1: { deutschlandticket: true, jobrad: false, budget: true, laufzeit: "Monatlich", integration: "Hrmony-Plattform" },
  4: { deutschlandticket: true, jobrad: true, budget: true, laufzeit: "Monatlich", integration: "Belonio-App" },
  5: { deutschlandticket: true, jobrad: false, budget: true, laufzeit: "Monatlich", integration: "Probonio-App" },
  6: { deutschlandticket: true, jobrad: false, budget: true, laufzeit: "Jahresvertrag", integration: "DATEV-Integration" },
  7: { deutschlandticket: true, jobrad: false, budget: true, laufzeit: "Monatlich", integration: "Payroll-Integration" },
  13: { deutschlandticket: true, jobrad: false, budget: true, laufzeit: "Jahresvertrag", integration: "DATEV-Integration" },
};

const JOBRAD_DETAILS = {
  15: { leasingModell: "Gehaltsumwandlung", maxWert: "bis €15.000", laufzeit: "36 Monate", versicherung: "Vollkasko inklusive", steuerVorteil: "0,25%-Regelung" },
  16: { leasingModell: "Gehaltsumwandlung", maxWert: "bis €12.000", laufzeit: "36 Monate", versicherung: "Vollkasko optional", steuerVorteil: "0,25%-Regelung" },
  17: { leasingModell: "Gehaltsumwandlung", maxWert: "bis €15.000", laufzeit: "36 Monate", versicherung: "Vollkasko inklusive", steuerVorteil: "0,25%-Regelung" },
  18: { leasingModell: "Gehaltsumwandlung", maxWert: "bis €10.000", laufzeit: "24–36 Monate", versicherung: "Vollkasko inklusive", steuerVorteil: "0,25%-Regelung" },
  19: { leasingModell: "Gehaltsumwandlung", maxWert: "bis €10.000", laufzeit: "36 Monate", versicherung: "Optional", steuerVorteil: "0,25%-Regelung" },
};

const FITNESS_DETAILS = {
  20: { netzwerk: "Sport & Fitness", studios: "50+ Städte DE", modell: "Monatsmitgliedschaft", laufzeit: "Monatlich kündbar", kategorien: "Fitness, Yoga, Kampfsport, Schwimmen" },
  21: { netzwerk: "Sport & Wellness", studios: "11.000+ weltweit", modell: "Monatsmitgliedschaft", laufzeit: "Monatlich kündbar", kategorien: "Fitness, Yoga, Meditation, Ernährung" },
  22: { netzwerk: "DACH-fokussiert", studios: "4.000+", modell: "Flat-Rate", laufzeit: "Monatlich kündbar", kategorien: "Fitness, Schwimmen, Yoga, Tennis" },
  23: { netzwerk: "Gesundheit & Fitness", studios: "6.000+", modell: "Mitgliedschaft + Digital", laufzeit: "Monatlich kündbar", kategorien: "Fitness, Physio, Yoga, Ernährung" },
};

const MENTAL_DETAILS = {
  24: { angebot: "1:1 Psycholog:innen", zugang: "< 24h", sitzungen: "Unlimitiert", sprachen: "DE + EN", laufzeit: "Monatlich kündbar" },
  25: { angebot: "Einzel & Gruppen-Sessions", zugang: "< 48h", sitzungen: "Kontingent-basiert", sprachen: "DE", laufzeit: "Jahresvertrag" },
  26: { angebot: "Coaching & Self-Service", zugang: "24/7 verfügbar", sitzungen: "App unlimitiert", sprachen: "DE + EN + NL", laufzeit: "Monatlich kündbar" },
};

const BLOG_POSTS = [
  {
    id: 1,
    slug: "die-besten-mitarbeiter-benefits-2026",
    title: "Die besten Mitarbeiter Benefits in 2026",
    excerpt: "Sachbezug, Essenszuschuss, Jobrad, Firmenfitness — welche Benefits wirken, was sie kosten und welche Anbieter 2026 vorne liegen.",
    date: "April 2026",
    readTime: "6 min",
    category: "Ratgeber",
    cardBg: "linear-gradient(135deg, #0F6E56 0%, #085041 100%)",
    cardIcon: "🏆",
    content: [
      { type: "intro", text: "Der Markt für Mitarbeiter-Benefits wächst rasant. 2026 erwarten Mitarbeitende mehr als nur ein gutes Gehalt — flexible, steueroptimierte Benefits sind zum entscheidenden Faktor im Employer Branding geworden. Wir zeigen die wichtigsten Benefits und ihre Anbieter im Überblick." },
      { type: "h2", text: "1. Mitarbeiterrabatte — kostenlos, sofort wirksam, unterschätzt" },
      { type: "p", html: 'Der meistunterschätzte Benefit ist gleichzeitig der einfachste: Mitarbeiterrabatt-Portale kosten Arbeitgeber nichts, sind in einer Stunde eingerichtet und geben Mitarbeitenden sofort spürbaren Mehrwert. Das klassische Angebot ist Corporate Benefits (1.500+ Marken) — eine starke Alternative mit klarerem Profil ist <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a>: Das Portal fokussiert sich ausschließlich auf nachhaltige und wertegetriebene Marken wie ArmedAngels, HelloFresh, FlixTrain und Arket. Für Unternehmen, die Nachhaltigkeit im Employer Branding verankern wollen, ist FutureBens die bessere Wahl — und für Arbeitgeber ebenfalls kostenlos.' },
      { type: "tip", text: "Zero-Cost-Einstieg: FutureBens (futurebens.co) als nachhaltige Corporate-Benefits-Alternative in einer Stunde einrichten — kostenlos für Arbeitgeber, sofort nutzbar für alle Mitarbeitenden." },
      { type: "h2", text: "2. Sachbezug (€50/Monat) — Pflicht für jeden Arbeitgeber" },
      { type: "p", text: "Der monatliche Sachbezug von bis zu €50 ist der verbreitetste steuerfreie Benefit in Deutschland. Arbeitgeber können Gutscheinkarten oder digitale Gutscheine ausgeben, die Mitarbeitende frei einsetzen können. Der Steuervorteil ist erheblich: €50 Sachbezug entspricht netto dem, was aus einer Bruttogehaltserhöhung von fast €100 übrig bliebe." },
      { type: "tip", text: "Anbieter-Empfehlung: Hrmony für All-in-One-Lösungen, Spendit und Givve für Karten-Fans, Belonio für das beste Preis-Leistungs-Verhältnis ab €2,42/MA/Monat." },
      { type: "h2", text: "3. Essenszuschuss — bis €7,67 pro Arbeitstag" },
      { type: "p", text: "Der Essenszuschuss ist seit Jahren ein Klassiker. Arbeitgeber dürfen bis zu €7,67 pro Arbeitstag bezuschussen. Bei 15 Arbeitstagen im Monat ergibt das einen monatlichen Vorteil von über €115 für Mitarbeitende — mit überschaubarem Verwaltungsaufwand dank moderner KI-Belegprüfung bei Anbietern wie Billyard oder LOFINO." },
      { type: "h2", text: "4. Deutschlandticket & Mobilitätsbudgets" },
      { type: "p", text: "Der ÖPNV-Zuschuss ist gemäß §3 Nr. 15 EStG komplett steuerfrei — ohne Betragsgrenze. Das Deutschlandticket für aktuell €58/Monat kann der Arbeitgeber vollständig übernehmen. Plattformen wie Hrmony oder Billyard integrieren das Deutschlandticket direkt in ihre Lösung." },
      { type: "h2", text: "5. Jobrad / Dienstrad-Leasing — Steuern sparen mit dem Rad" },
      { type: "p", text: "Seit der 0,25%-Regelung ist Dienstrad-Leasing attraktiver denn je. Der geldwerte Vorteil wird nur mit einem Viertel des Listenpreises angesetzt. Marktführer Jobrad hat über 50.000 Unternehmenskunden. Für Unternehmen mit Nachhaltigkeitszielen ist das Dienstrad ein doppelter Gewinn: Steuerersparnis und CO₂-Reduktion." },
      { type: "h2", text: "6. Firmenfitness — Gesundheit als Benefit" },
      { type: "p", text: "Fitnessmitgliedschaften sind aus modernen Benefit-Paketen nicht mehr wegzudenken. Urban Sports Club bietet über 50 Sportarten in 50+ Städten, Wellhub sogar 11.000+ Studios weltweit. Als Sachbezug innerhalb der €50-Freigrenze kann Firmenfitness steueroptimiert gewährt werden." },
      { type: "h2", text: "7. Mental Health — das Benefit der Stunde" },
      { type: "p", text: "Psychische Gesundheit ist 2026 ein Top-HR-Thema. Plattformen wie Nilo Health, Likeminded und OpenUp bieten direkten Zugang zu Psycholog:innen und Coaches — oft innerhalb von 24 Stunden. Diese Benefits reduzieren Fehlzeiten nachweislich und senden ein starkes Signal in puncto Fürsorgekultur." },
      { type: "h2", text: "Fazit: Kombination macht den Unterschied" },
      { type: "p", text: "Die größte Hebelwirkung entfaltet sich durch die Kombination: Mitarbeiterrabatte (kostenlos) + Sachbezug + Essenszuschuss + Deutschlandticket ergeben bereits über €2.000 netto pro Mitarbeitenden im Jahr — ohne Steuer- oder Sozialabgabelast. Wer 2026 im Wettbewerb um Talente punkten will, kommt an einem durchdachten Benefits-Paket nicht mehr vorbei." },
    ]
  },
  {
    id: 2,
    slug: "steuerliche-tipps-mitarbeiter-benefits-2026",
    title: "Die besten steuerlichen Tipps für Mitarbeiter Benefits 2026",
    excerpt: "Welche Benefits steuerfrei sind, wie man kombiniert und was HR-Teams über ZAG, Sachbezugsfreigrenze und Pauschalbesteuerung wissen müssen.",
    date: "März 2026",
    readTime: "7 min",
    category: "Steuer",
    cardBg: "linear-gradient(135deg, #185FA5 0%, #0E3D6B 100%)",
    cardIcon: "📊",
    content: [
      { type: "intro", text: "Mitarbeiter-Benefits sind nicht nur ein HR-Thema — sie sind hochgradig steuerrelevant. Wer die Regelungen kennt und richtig kombiniert, kann für Mitarbeitende einen Nettovorteil von über €3.000 im Jahr erzielen, ohne dass auf Seiten des Unternehmens Sozialabgaben anfallen." },
      { type: "h2", text: "Tipp 1: Die Sachbezugsfreigrenze (€50/Monat) voll ausschöpfen" },
      { type: "p", text: "Gemäß §8 Abs. 2 S.11 EStG sind Sachbezüge bis zu €50 pro Monat lohnsteuer- und sozialversicherungsfrei. Entscheidend: Es handelt sich um eine Freigrenze, nicht um einen Freibetrag. Wird der Betrag auch nur um einen Cent überschritten, wird der gesamte Betrag steuerpflichtig. Daher sollte die monatliche Buchung immer exakt bei €50 liegen." },
      { type: "tip", text: "Wichtig: Gutscheine und Karten müssen seit 2022 ZAG-konform sein — also auf bestimmte Händler oder Regionen beschränkt. Beliebig einsetzbares Bargeld-Äquivalent ist nicht steuerfrei." },
      { type: "h2", text: "Tipp 2: Steuerfreie Mobilitätsleistungen kombinieren" },
      { type: "p", text: "ÖPNV-Zuschüsse (§3 Nr. 15 EStG) sind komplett steuerfrei — ohne Betragsgrenze. Das Deutschlandticket für €58/Monat kann vollständig steuerfrei übernommen werden. Gleichzeitig bleibt der Sachbezug von €50 für andere Zwecke nutzbar, da Mobilitätszuschüsse auf einer anderen Rechtsgrundlage basieren." },
      { type: "h2", text: "Tipp 3: Anlassbezogene Sachzuwendungen nutzen" },
      { type: "p", text: "Zusätzlich zum monatlichen Sachbezug dürfen Arbeitgeber zu persönlichen Anlässen bis zu €60 steuerfrei schenken: zum Geburtstag, zur Hochzeit, zur Geburt eines Kindes, zum Dienstjubiläum. Diese Anlässe sind separat von der monatlichen €50-Freigrenze — pro Jahr können mehrere Anlässe zusammenkommen." },
      { type: "h2", text: "Tipp 4: Erholungsbeihilfe (§40 Abs. 2 Nr. 3 EStG)" },
      { type: "p", text: "Arbeitgeber können Mitarbeitenden €156/Jahr als Erholungsbeihilfe gewähren — für Ehepartner weitere €104, für jedes Kind €52. Diese Beihilfe wird pauschal mit 25% Lohnsteuer durch den Arbeitgeber versteuert, ist aber sozialversicherungsfrei. Damit verbleibt ein erheblicher Nettovorteil." },
      { type: "h2", text: "Tipp 5: Alle Bausteine kombiniert" },
      { type: "p", text: "Ein HR-Manager, der alle Bausteine kombiniert, erreicht folgendes Jahresvolumen pro Mitarbeitenden: Sachbezug €600, Essenszuschuss (15 Tage/Monat) bis €1.380, Deutschlandticket €696, Erholungsbeihilfe €156, Anlassgaben (2 Anlässe) €120. Das ergibt theoretisch bis zu €2.952 im Jahr — deutlich mehr als eine equivalente Bruttogehaltserhöhung bieten würde." },
      { type: "h2", text: "Tipp 6: Essenszuschuss korrekt abrechnen" },
      { type: "p", text: "Der Essenszuschuss erfordert etwas mehr Sorgfalt: Mitarbeitende müssen Belege einreichen, und es gibt Grenzen pro Arbeitstag. Die meisten modernen Plattformen wie Billyard oder LOFINO rechnen automatisch ab — KI-basierte Belegprüfung macht HR-Kontrolle überflüssig. Wichtig: Der Arbeitgeber muss mindestens €3,10 pro Mahlzeit tragen." },
    ]
  },
  {
    id: 3,
    slug: "nachhaltigkeit-mitarbeiter-benefits-2026",
    title: "Nachhaltigkeit und Benefits: Warum grüne Benefits 2026 wichtiger denn je sind",
    excerpt: "Trotz wirtschaftlicher Unsicherheiten ist Nachhaltigkeit kein Nice-to-have mehr. FutureBens, Jobrad und Guudcard zeigen, wie es geht.",
    date: "März 2026",
    readTime: "5 min",
    category: "Nachhaltigkeit",
    cardBg: "linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)",
    cardIcon: "🌱",
    content: [
      { type: "intro", text: "In Zeiten wirtschaftlicher Unsicherheit könnte man meinen, Nachhaltigkeit sei von der Agenda verschwunden. Das Gegenteil ist der Fall: Unternehmen, die langfristig denken, erkennen, dass nachhaltige Benefits nicht nur gut für die Welt sind — sie sind auch gut fürs Employer Branding." },
      { type: "h2", text: "Warum Nachhaltigkeit bei Benefits 2026 relevant bleibt" },
      { type: "p", text: "Gen Z und Millennials — die dominierenden Altersgruppen auf dem Arbeitsmarkt — entscheiden sich zunehmend für Arbeitgeber, die ihre Werte teilen. Laut Studien prüfen über 60% der Bewerber:innen die Nachhaltigkeitsstrategie potenzieller Arbeitgeber. Benefits, die nachhaltige Marken und Mobilitätslösungen umfassen, senden ein klares Signal." },
      { type: "h2", text: "FutureBens: Kuratierte Marken mit Haltung" },
      { type: "p", text: "FutureBens ist das einzige Rabattportal in Deutschland, das sich explizit auf nachhaltige und wertegetriebene Marken fokussiert. Das Portfolio umfasst ArmedAngels (faire Mode), HelloFresh (Lebensmittelwertschöpfung), FlixTrain (klimafreundliche Mobilität), Seeberger (Bio-Lebensmittel), Arket und Koro. Für Arbeitgeber ist FutureBens komplett kostenlos — ein Zero-Cost-Benefit mit starker Botschaft." },
      { type: "tip", text: "FutureBens ist kostenlos für Arbeitgeber. Mitarbeitende erhalten Zugang zu Rabatten bei nachhaltigen Marken — kein Aufwand, große Wirkung für das Employer Branding." },
      { type: "h2", text: "Jobrad: Die grünste Mobilitätslösung" },
      { type: "p", text: "Dienstrad-Leasing ist nicht nur steuerlich attraktiv — es reduziert den CO₂-Fußabdruck der Belegschaft nachweislich. Jobrad hat über 50.000 Unternehmenskunden und ist damit der größte Akteur in der betrieblichen Radmobilität in Deutschland. Wer Pendler:innen aufs Fahrrad bringt, spart Parkplätze, reduziert Emissionen und fördert die körperliche Gesundheit — ein dreifacher Gewinn." },
      { type: "h2", text: "Guudcard: Der B Corp-zertifizierte Sachbezug" },
      { type: "p", text: "Die Guudcard ist die einzige B Corp-zertifizierte Sachbezugskarte in Deutschland. Das bedeutet: Das Unternehmen hat nachweislich hohe Standards in den Bereichen Soziales, Umwelt und Unternehmensführung erfüllt. Das Partnernetzwerk ist bewusst auf nachhaltige Händler ausgerichtet. Für Unternehmen mit klarer ESG-Agenda ist die Guudcard ein stimmiges Signal." },
      { type: "h2", text: "Fazit: Nachhaltigkeit zahlt sich aus — auch bei Benefits" },
      { type: "p", text: "Nachhaltige Benefits differenzieren Arbeitgeber in einem zunehmend homogenen Markt. Jobrad, FutureBens und Guudcard zeigen, dass steuerliche Optimierung und gesellschaftliche Verantwortung kein Widerspruch sind — sie verstärken sich gegenseitig." },
    ]
  },
  {
    id: 4,
    slug: "steuerfreie-sachbezuege-das-maximum-herausholen",
    title: "Steuerfreie Sachbezüge: So holst du das Maximum heraus",
    excerpt: "€50 Sachbezug, €7,67 Essenszuschuss, Deutschlandticket, Erholungsbeihilfe — welche Benefits wirklich einfach sind und wie man Bürokratie minimiert.",
    date: "Februar 2026",
    readTime: "6 min",
    category: "Steuer",
    cardBg: "linear-gradient(135deg, #854F0B 0%, #5C3608 100%)",
    cardIcon: "💡",
    content: [
      { type: "intro", text: "Der Begriff 'steuerfreie Sachbezüge' klingt kompliziert — ist er aber nicht. Wer die wichtigsten Bausteine kennt und weiß, welche davon einfach umzusetzen sind, kann mit überschaubarem Aufwand einen erheblichen Nettovorteil für alle Mitarbeitenden schaffen." },
      { type: "h2", text: "Der einfachste Einstieg: €50 Sachbezug" },
      { type: "p", text: "Kein anderer Benefit ist so einfach einzuführen wie der €50-Sachbezug. Eine digitale Gutscheinkarte oder Prepaid-Karte wird monatlich aufgeladen, der Mitarbeitende kann sie frei nach ZAG-Kriterien einsetzen. Kein Belegaufwand, keine Prüfung, keine Abrechnung durch HR. Anbieter wie Probonio oder Belonio können in wenigen Stunden eingerichtet werden." },
      { type: "tip", text: "Einfachste Lösung: Digitale Gutscheine (z.B. Amazon, Zalando) per App — kein Karten-Versand, kein Papierkram. Monatlich automatisch aufgeladen." },
      { type: "h2", text: "Etwas komplexer, aber lohnend: Essenszuschuss" },
      { type: "p", text: "Der Essenszuschuss erfordert Belegeinreichung und hat Grenzen pro Arbeitstag. Mit modernen Plattformen wie Billyard oder LOFINO ist er jedoch fast vollautomatisch: KI-basierte Belegprüfung macht manuelle HR-Kontrolle überflüssig. Der monatliche Vorteil von bis zu €115 rechtfertigt den initialen Setup-Aufwand deutlich." },
      { type: "h2", text: "Ohne Aufwand: ÖPNV-Zuschuss / Deutschlandticket" },
      { type: "p", text: "Das Deutschlandticket ist der einfachste steuerfreie Benefit für den Mobilitätsbereich. Arbeitgeber zahlen €58/Monat pro Mitarbeitenden — fertig. Keine ZAG-Einschränkungen, keine Belegpflicht. Die meisten All-in-One-Plattformen bieten das Deutschlandticket als Modul an." },
      { type: "h2", text: "Fast unbekannt: Erholungsbeihilfe und Anlassgaben" },
      { type: "p", text: "Die Erholungsbeihilfe (€156/Jahr) und Anlassgaben (€60 pro Anlass) werden von den wenigsten Arbeitgebern konsequent genutzt. Beide erfordern nur eine einmalige Einrichtung im Abrechnungssystem. Wer Geburtstage systematisch erfasst, kann mit minimaler Bürokratie maximalen Nutzen schaffen." },
      { type: "h2", text: "Ranking nach Implementierungsaufwand" },
      { type: "p", text: "1. €50-Sachbezug (Gutschein per App — nahezu null Aufwand), 2. Deutschlandticket-Zuschuss (monatliche Überweisung), 3. Anlassgabe (einmalig pro Ereignis), 4. Erholungsbeihilfe (jährlich), 5. Essenszuschuss (laufende Belegprüfung). Der Essenszuschuss bietet bei konsequenter Nutzung den größten monatlichen Vorteil, erfordert aber auch das meiste Setup." },
    ]
  },
  {
    id: 5,
    slug: "kostenlose-benefits-2026",
    title: "Die besten kostenlosen Benefits für Arbeitgeber 2026",
    excerpt: "Benefits müssen nicht teuer sein. Diese Anbieter sind für Arbeitgeber komplett kostenlos — und trotzdem wirksam für Mitarbeitendenzufriedenheit und Employer Branding.",
    date: "Februar 2026",
    readTime: "4 min",
    category: "Ratgeber",
    cardBg: "linear-gradient(135deg, #534AB7 0%, #2E2780 100%)",
    cardIcon: "🎁",
    content: [
      { type: "intro", text: "In einem wirtschaftlichen Umfeld, in dem Benefits-Budgets unter Druck stehen, ist die Frage berechtigt: Welche Benefits gibt es, die Arbeitgeber nichts kosten, aber trotzdem einen echten Mehrwert bieten? Die Antwort überrascht: Es gibt einige wirklich gute Optionen." },
      { type: "h2", text: "1. Mitarbeiterrabattportale — kostenlos und sofort wirksam" },
      { type: "p", html: 'Die bekanntesten Rabattportale sind für Arbeitgeber komplett kostenlos: Corporate Benefits (1.500+ Marken), <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> (nachhaltige Marken wie ArmedAngels, HelloFresh, Arket) und Benefits.me (Ticketing, Entertainment) verlangen keine monatlichen Gebühren. Mitarbeitende erhalten Zugang zu Rabatten von bis zu 45%. Die Einrichtung dauert meist weniger als eine Stunde.' },
      { type: "tip", text: "Kostenlose Kombination: Corporate Benefits für breites Markenspektrum + FutureBens für nachhaltige Marken + Benefits.me für Freizeit & Entertainment. Drei Plattformen, null Kosten für den Arbeitgeber." },
      { type: "h2", text: "2. Dienstrad-Leasing — für den Arbeitgeber oft kostenneutral" },
      { type: "p", text: "Jobrad-Leasing ist für den Arbeitgeber in vielen Fällen kostenneutral: Die Leasingrate wird per Gehaltsumwandlung finanziert. Der Arbeitgeber spart sogar Sozialabgaben auf den umgewandelten Betrag. Jobrad, Lease a Bike und Bikeleasing-Service haben die Einrichtung so vereinfacht, dass HR-Teams kaum Aufwand haben." },
      { type: "h2", text: "3. Homeoffice-Ausstattung als steuerfreier Sachbezug" },
      { type: "p", text: "Als Arbeitgeber können Sie die Homeoffice-Ausstattung steuerfrei bezuschussen — Schreibtisch, Bildschirm, Headset als Sachlohn unter bestimmten Voraussetzungen sogar steuerfrei. Das kostet wenig und wird von Mitarbeitenden sehr geschätzt, besonders in hybriden Teams." },
      { type: "h2", text: "4. Flexible Arbeitszeit und Remote Work" },
      { type: "p", text: "Nicht alle Benefits haben einen Preis. Flexible Arbeitszeiten, Vertrauensarbeitszeit und die Möglichkeit, remote zu arbeiten, kosten den Arbeitgeber im Wesentlichen nichts — sind aber laut Umfragen die meistgewünschten Benefits nach Gehalt überhaupt." },
      { type: "h2", text: "Fazit: Zero-Cost-Benefits als strategische Grundlage" },
      { type: "p", text: "Kostenlose Benefits sollten die Basis jedes Benefit-Pakets bilden — sie sind der schnellste Win. Auf dieser Basis lassen sich dann kostenpflichtige Benefits (Sachbezug, Essenszuschuss, Firmenfitness) schrittweise aufbauen. Wer sagt, Benefits seien zu teuer, hat die kostenlosen Optionen noch nicht ausgeschöpft." },
    ]
  },
  {
    id: 6,
    slug: "sachbezug-vs-gehaltserhöhung",
    title: "Sachbezug vs. Gehaltserhöhung: Was rechnet sich wirklich?",
    excerpt: "Ein konkreter Rechenvergleich: Was bekommt ein Mitarbeitender netto aus €50 Sachbezug vs. €50 Bruttogehaltserhöhung — und was kostet wen was?",
    date: "Januar 2026",
    readTime: "5 min",
    category: "Ratgeber",
    cardBg: "linear-gradient(135deg, #993556 0%, #6B1F3A 100%)",
    cardIcon: "🔢",
    content: [
      { type: "intro", text: "Die häufigste Frage, die HR-Manager stellen: 'Lohnt sich Sachbezug wirklich — oder ist es einfacher, das Gehalt zu erhöhen?' Die Antwort ist eindeutig. Hier ist der Rechenweg." },
      { type: "h2", text: "Das Rechenbeispiel" },
      { type: "p", text: "Nehmen wir einen Mitarbeitenden mit einem Bruttogehalt von €4.000/Monat, Steuerklasse I, in Westdeutschland. Der Arbeitgeber möchte €50 zusätzlich pro Monat gewähren." },
      { type: "h2", text: "Variante A: €50 Bruttogehaltserhöhung" },
      { type: "p", text: "Von €50 Brutto bleiben nach Einkommensteuer (~42% Grenzsteuersatz inkl. Solidaritätszuschlag) und Sozialabgaben (~20%) nur ca. €19–22 netto übrig. Zusätzlich zahlt der Arbeitgeber Arbeitgeberbeiträge zur Sozialversicherung von ~€10. Der Arbeitgeber zahlt also ~€60, der Mitarbeitende bekommt ~€21 netto." },
      { type: "tip", text: "Rechenformel: €50 brutto → ca. €21 netto (Steuerklasse I, ~42% Grenzsteuersatz) + ~€10 AG-Sozialabgaben = €60 Gesamtkosten für €21 Nettovorteil. Effizienz: 35%." },
      { type: "h2", text: "Variante B: €50 Sachbezug (steuerfrei)" },
      { type: "p", text: "€50 Sachbezug ist komplett steuerfrei und sozialversicherungsfrei — für Arbeitgeber und Arbeitnehmer. Der Mitarbeitende erhält exakt €50 an Kaufkraft. Der Arbeitgeber zahlt €50 plus Plattformgebühr (~€3,50/MA/Monat). Gesamtkosten: ~€53,50 für €50 Nettovorteil. Effizienz: 93%." },
      { type: "h2", text: "Der Vergleich" },
      { type: "p", text: "Gehaltserhöhung: €60 Kosten für AG → €21 Nettovorteil für MA (Effizienz: 35%). Sachbezug: €53,50 Kosten für AG → €50 Nettovorteil für MA (Effizienz: 93%). Der Sachbezug ist nicht nur für Mitarbeitende besser — er ist auch für den Arbeitgeber günstiger." },
      { type: "h2", text: "Wann lohnt sich die Gehaltserhöhung trotzdem?" },
      { type: "p", text: "Gehaltserhöhungen sind sinnvoll, wenn: (1) die Sachbezugsfreigrenze bereits ausgeschöpft ist, (2) Mitarbeitende Barbeträge für spezifische Zwecke benötigen, (3) es sich um Führungskräfte handelt, bei denen Gehalt ein wichtiges Signal ist. Für den breiten Einsatz ist der Sachbezug jedoch klar im Vorteil." },
    ]
  },
  {
    id: 7,
    slug: "deutschlandticket-als-mitarbeiter-benefit",
    title: "Das Deutschlandticket als Mitarbeiter-Benefit 2026",
    excerpt: "Komplett steuerfrei, unbegrenzt absetzbar, von Mitarbeitenden heiß begehrt — das Deutschlandticket ist der einfachste Benefit, den Arbeitgeber 2026 anbieten können.",
    date: "19. April 2026",
    readTime: "5 min",
    category: "Steuer & Recht",
    publishDate: "2026-04-19",
    content: [
      { type: "intro", text: "Das Deutschlandticket für €58/Monat kann der Arbeitgeber komplett steuerfrei übernehmen — ohne Betragsgrenze, ohne Bürokratie. Es ist der einfachste, begehrteste und am wenigsten genutzte Benefit in Deutschland. Wir zeigen, wie es funktioniert und was HR beachten muss." },
      { type: "h2", text: "Die rechtliche Grundlage: §3 Nr. 15 EStG" },
      { type: "p", text: "Seit 2019 sind Zuschüsse für Tickets des öffentlichen Nahverkehrs nach §3 Nr. 15 EStG steuerfrei. Das gilt für das Deutschlandticket explizit und ist nicht auf €50 begrenzt — anders als der allgemeine Sachbezug. Der Arbeitgeber kann den vollen Ticketpreis von €58/Monat (Stand 2026) übernehmen, ohne dass Steuer oder Sozialversicherung anfallen." },
      { type: "tip", text: "Wichtig: Der ÖPNV-Zuschuss ist zusätzlich zur €50-Sachbezugsfreigrenze möglich. Beide können gleichzeitig genutzt werden — kein Anrechnen, kein Aufrechnen." },
      { type: "h2", text: "Was kostet das Deutschlandticket den Arbeitgeber wirklich?" },
      { type: "p", text: "€58/Monat × 12 = €696/Jahr pro Mitarbeitenden. Bei 50 Mitarbeitenden: €34.800/Jahr. Klingt viel — aber im Vergleich: Eine Gehaltserhöhung, die denselben Nettovorteil erzeugt, würde den Arbeitgeber über €120/Monat pro Person kosten. Das Deutschlandticket ist also fast doppelt so effizient wie eine vergleichbare Gehaltserhöhung." },
      { type: "h2", text: "Wie setzt man es technisch um?" },
      { type: "p", text: "Option 1: Direktkauf durch den Arbeitgeber und Ausgabe als Sachbezug. Option 2: Erstattungsmodell — Mitarbeitende kaufen selbst, legen den Beleg vor, der Arbeitgeber erstattet. Option 3: Über eine Benefit-Plattform (z.B. Hrmony, Billyard, LOFINO) — dort ist das Deutschlandticket direkt integriert und die Abrechnung läuft automatisch. Option 3 empfehlen wir für Unternehmen ab 10 Mitarbeitenden, weil der HR-Aufwand am geringsten ist." },
      { type: "h2", text: "Was passiert, wenn Mitarbeitende kein ÖPNV nutzen?" },
      { type: "p", text: "Das Deutschlandticket ist naturgemäß kein passender Benefit für Mitarbeitende, die im ländlichen Raum arbeiten und auf das Auto angewiesen sind. Für diese Gruppe bietet sich ein allgemeines Mobilitätsbudget an — entweder als Sachbezug (€50/Monat steuerfrei) für Tanken, Carsharing oder ÖPNV, oder über spezialisierte Mobilitätsplattformen." },
      { type: "h2", text: "Deutschlandticket kombiniert mit anderen Benefits" },
      { type: "p", text: "Die optimale Kombination für 2026: (1) €58 Deutschlandticket steuer- und sozialversicherungsfrei. (2) €50 Sachbezug steuerfrei (z.B. für Einkaufen, Online-Shopping, Tanken). (3) €7,67/Arbeitstag Essenszuschuss steuerfrei. Macht zusammen über €2.400 Nettovorteil pro Mitarbeitenden und Jahr — komplett legal und ohne Sozialabgaben." },
    ]
  },
  {
    id: 8,
    slug: "mitarbeiter-benefits-kleine-unternehmen",
    title: "Mitarbeiter-Benefits für kleine Unternehmen — so startet ihr richtig",
    excerpt: "Benefits sind kein Privileg von Großkonzernen. Wie kleine Unternehmen mit 5–50 Mitarbeitenden kosteneffizient und schnell starten können.",
    date: "19. April 2026",
    readTime: "6 min",
    category: "Ratgeber",
    publishDate: "2026-04-19",
    content: [
      { type: "intro", text: "Viele kleinere Unternehmen glauben, Benefits seien nur etwas für Konzerne mit großer HR-Abteilung. Das Gegenteil ist der Fall: Gerade für Unternehmen mit 5–50 Mitarbeitenden sind Benefits oft der wirksamste Hebel im Wettbewerb um Talente — weil das Gehalt allein nicht mithalten kann." },
      { type: "h2", text: "Die Ausgangslage: Was kleine Unternehmen falsch machen" },
      { type: "p", text: "Fehler 1: Nichts tun, weil man denkt, es ist zu aufwendig. Fehler 2: Alle Mitarbeitenden gleich behandeln — obwohl ein 28-jähriger und ein 45-jähriger andere Priorities haben. Fehler 3: Benefits nicht kommunizieren — viele Mitarbeitende wissen gar nicht, was ihr Arbeitgeber anbietet. Fehler 4: Zu viel auf einmal einführen, statt mit einem schnellen Win zu starten." },
      { type: "tip", text: "Schnellstart-Empfehlung: Fangt mit dem Sachbezug (€50/Monat) und dem Deutschlandticket an. Beides ist in einem Tag eingerichtet, sofort spürbar und kostet wenig Verwaltungsaufwand." },
      { type: "h2", text: "Die 3-Stufen-Strategie für kleine Unternehmen" },
      { type: "p", text: "Stufe 1 — Quick Wins (sofort, Kosten: €50–110/MA/Monat): Sachbezug €50/Monat + Deutschlandticket €58/Monat. Voller Nettovorteil, keine Steuer. Einrichtung in einem Tag mit Anbieter wie Probonio oder Belonio. Stufe 2 — Gesundheit (nach 3 Monaten, Kosten: €20–22/MA/Monat): Firmenfitness über Hansefit (ab €18) — kein Jahresvertrag erforderlich. Stufe 3 — Extras (nach 6 Monaten): Dienstrad-Leasing über Jobrad oder Bikeleasing, Mental-Health-Angebote." },
      { type: "h2", text: "Welcher Anbieter passt zu kleinen Unternehmen?" },
      { type: "p", text: "Für Unternehmen unter 20 Mitarbeitenden empfehlen wir Anbieter, die (1) keine hohen Mindestabnahmen haben, (2) monatlich kündbar sind, und (3) wenig HR-Aufwand erzeugen. Probonio (ab 1 MA, monatlich kündbar), Belonio (ab 5 MA, günstigster Preis ab €2,42), und LOFINO (vollautomatische Abrechnung) passen hier am besten. Edenred oder Spendit setzen häufig auf Jahresverträge — für kleine Unternehmen weniger ideal." },
      { type: "h2", text: "Kommunikation ist die halbe Miete" },
      { type: "p", text: "Ein häufig unterschätzter Faktor: Mitarbeitende, die nicht wissen was sie bekommen, schätzen Benefits nicht. Investiert 30 Minuten in eine kurze Erklärung beim Team-Meeting oder per Slack-Nachricht: 'Ab nächsten Monat bekommt jeder von euch €50 steuerfreien Sachbezug — hier ist, wie ihr ihn nutzt.' Diese Kommunikation macht den Unterschied zwischen einem Benefit, der wirkt, und einem, der verpufft." },
    ]
  },
  {
    id: 9,
    slug: "onboarding-benefits-neue-mitarbeiter-begeistern",
    title: "Onboarding-Benefits: So begeisterst du neue Mitarbeitende von Tag 1",
    excerpt: "Die ersten 90 Tage entscheiden über Bindung und Motivation. Wie du mit Benefits im Onboarding-Prozess einen bleibenden Eindruck hinterlässt.",
    date: "26. April 2026",
    readTime: "5 min",
    category: "Employer Branding",
    publishDate: "2026-04-26",
    content: [
      { type: "intro", text: "Studien zeigen: Mitarbeitende entscheiden in den ersten 90 Tagen, ob sie langfristig bleiben wollen. Benefits, die von Anfang an spürbar sind, senden ein starkes Signal — du hast die richtige Entscheidung getroffen. Wir zeigen, wie ein durchdachter Benefits-Onboarding-Prozess aussieht." },
      { type: "h2", text: "Tag 1: Der erste Eindruck zählt" },
      { type: "p", text: "Statt Mitarbeitende mit Formularen zu überhäufen, sollte Tag 1 ein positives Erlebnis sein. Ein 'Welcome Package' kann folgendes enthalten: Aktivierungscode für die Benefits-App, Informationsblatt zu allen Benefits mit Schritt-für-Schritt-Anleitung, und ein persönliches Gespräch (15 Minuten) über das Benefits-Paket. Der Schlüssel: Benefits müssen sofort nutzbar sein — nicht nach 3 Monaten Probezeit." },
      { type: "tip", text: "Best Practice: Schalte den Sachbezug ab dem ersten Arbeitstag frei — nicht erst nach der Probezeit. Das Signal ist klar: 'Du gehörst dazu, vom ersten Tag an.'" },
      { type: "h2", text: "Woche 1–4: Benefits erlebbar machen" },
      { type: "p", text: "In der ersten Woche sollten neue Mitarbeitende ihre erste Nutzungserfahrung mit dem Benefit gemacht haben. Gut geeignet: Sachbezug (sofort als Gutschein nutzbar), Essenszuschuss (erster Lunch bereits bezuschusst), Deutschlandticket (direkt für die Anreise). Weniger geeignet für Woche 1: Firmenfitness (erfordert Einarbeitung), Dienstrad (langer Bestell- und Lieferprozess)." },
      { type: "h2", text: "Die häufigsten Onboarding-Fehler" },
      { type: "p", text: "Fehler 1: Benefits erst nach Probezeit aktivieren — verliert die Wirkung der ersten Eindrücke. Fehler 2: Nur digitale Kommunikation ohne persönliche Erklärung. Fehler 3: Kein Feedback nach 30 Tagen einholen — wissen Mitarbeitende nicht, wie sie Benefits nutzen, liegt das oft an mangelnder Kommunikation. Fehler 4: Alle Benefits auf einmal präsentieren — Überforderung. Besser: gestaffelte Einführung." },
      { type: "h2", text: "Fazit: Benefits als Teil der Unternehmenskultur" },
      { type: "p", text: "Benefits sind kein HR-Verwaltungsthema — sie sind ein Ausdruck der Unternehmenskultur. Wer von Tag 1 zeigt, dass er in Mitarbeitende investiert, legt den Grundstein für Loyalität und Motivation. Die Investition zahlt sich aus: Unternehmen mit strukturiertem Benefits-Onboarding berichten von 30–50% niedrigerer Fluktuation in den ersten 12 Monaten." },
    ]
  },
  {
    id: 10,
    slug: "homeoffice-benefits-remote-teams",
    title: "Home-Office-Benefits 2026: Was remote Teams wirklich wollen",
    excerpt: "Remote-Arbeit ist Standard. Doch welche Benefits funktionieren für Mitarbeitende, die nie im Büro sind? Eine ehrliche Analyse der besten Optionen.",
    date: "26. April 2026",
    readTime: "6 min",
    category: "Ratgeber",
    publishDate: "2026-04-26",
    content: [
      { type: "intro", text: "Rund 30% aller Beschäftigten in Deutschland arbeiten zumindest teilweise remote. Klassische Benefits wie die Kantine oder der Firmensport-Kurs im Bürogebäude erreichen diese Gruppe kaum. Welche Benefits wirklich für remote Teams funktionieren — und was HR dabei bedenken muss." },
      { type: "h2", text: "Das Problem mit klassischen Benefits für Remote-Teams" },
      { type: "p", text: "Ein Essenszuschuss für die Bürokantine nützt dem Home-Office-Mitarbeitenden nichts. Firmenfitness in einem Studio 40km vom Wohnort ist kein echter Vorteil. Der Fehler: Benefits, die auf physische Präsenz ausgelegt sind, schließen Remote-Mitarbeitende strukturell aus — was Ungleichheit im Team erzeugt." },
      { type: "tip", text: "Regel: Jeder Benefit, den du einführst, muss von Mitarbeitenden unabhängig vom Arbeitsort nutzbar sein — oder du bietest eine gleichwertige Alternative." },
      { type: "h2", text: "Die besten Benefits für Remote-Teams" },
      { type: "p", text: "1. Sachbezug (€50/Monat): Funktioniert überall, digital, ohne Einschränkungen. Ideal. 2. Heimarbeitszuschuss: Bis €6/Arbeitstag kann der Arbeitgeber einen Homeoffice-Pauschalbetrag steuerbegünstigt zahlen — für Strom, Internet, Büromaterial. 3. Online-Fitness (Wellhub, Urban Sports Club): Beide bieten digitale Kurse, die zu Hause nutzbar sind. 4. Mental Health (Nilo Health, OpenUp): Digitale Psycholog:innen sind per Definition ortsunabhängig. Ideal für Remote-Teams. 5. Essenszuschuss per Beleg-Upload: Funktioniert auch für Homecooked meals — Anbieter wie Billyard und LOFINO akzeptieren Supermarktbelege." },
      { type: "h2", text: "Homeoffice-Pauschale: Die unterschätzte Steueroption" },
      { type: "p", text: "Seit 2023 können Arbeitnehmer eine Homeoffice-Pauschale von €6/Tag (max. €1.260/Jahr) in der Steuererklärung geltend machen. Arbeitgeber können diesen Betrag als Pauschale steuerfrei erstatten — wenn die Bedingungen erfüllt sind. Das ist ein weiterer Benefit, der speziell remote Teams zugutekommt und von vielen HR-Teams noch nicht genutzt wird." },
      { type: "h2", text: "Kommunikation für verteilte Teams" },
      { type: "p", text: "Remote-Mitarbeitende brauchen besonders klare Kommunikation über Benefits — sie können nicht schnell beim Schreibtisch nebenan nachfragen. Empfehlung: Ein jährliches 'Benefits-Review' per Video-Call für alle, eine Benefits-FAQ-Seite im internen Wiki, und eine Benefits-App, die alles auf dem Handy zugänglich macht. Letzteres ist ein wichtiges Kriterium bei der Anbieterauswahl." },
    ]
  },
];

const PUBLISHED_POSTS = BLOG_POSTS.filter(p => !p.publishDate || new Date(p.publishDate) <= new Date());

function getBlogCardSvg(id) {
  // Articles 1 and 3 use real stock photos
  if (id === 1) return (
    <>
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=720&h=240&fit=crop&auto=format&q=80" alt="Team" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(10,80,55,0.52) 100%)"}}/>
    </>
  );
  if (id === 3) return (
    <>
      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=720&h=240&fit=crop&auto=format&q=80" alt="Nachhaltigkeit" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(13,43,30,0.58) 100%)"}}/>
    </>
  );
  // Clean minimalist SVGs for articles 2, 4, 5, 6
  if (id === 2) return (
    <svg viewBox="0 0 360 130" style={{display:"block",width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="bcg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1565C0"/><stop offset="100%" stopColor="#0D3B7A"/></linearGradient></defs>
      <rect width="360" height="130" fill="url(#bcg2)"/>
      <line x1="55" y1="100" x2="305" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
      <rect x="72" y="86" width="22" height="14" rx="3" fill="white" fillOpacity="0.18"/>
      <rect x="112" y="74" width="22" height="26" rx="3" fill="white" fillOpacity="0.22"/>
      <rect x="152" y="58" width="22" height="42" rx="3" fill="white" fillOpacity="0.28"/>
      <rect x="192" y="44" width="22" height="56" rx="3" fill="white" fillOpacity="0.34"/>
      <rect x="232" y="26" width="22" height="74" rx="3" fill="#7DD3C8" fillOpacity="0.78"/>
      <text x="83" y="82" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="white" fillOpacity="0.4">€156</text>
      <text x="123" y="70" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="white" fillOpacity="0.45">€600</text>
      <text x="163" y="54" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="white" fillOpacity="0.5">€696</text>
      <text x="203" y="40" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="white" fillOpacity="0.55">€1.380</text>
      <text x="243" y="22" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fill="#7DD3C8">€2.952</text>
      <text x="83" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="white" fillOpacity="0.28">Erholung</text>
      <text x="123" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="white" fillOpacity="0.28">Sachbezug</text>
      <text x="163" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="white" fillOpacity="0.28">DT-Ticket</text>
      <text x="203" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="white" fillOpacity="0.28">Essen</text>
      <text x="243" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="#7DD3C8" fillOpacity="0.72">Gesamt</text>
    </svg>
  );
  if (id === 4) return (
    <svg viewBox="0 0 360 130" style={{display:"block",width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="bcg4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#92400E"/><stop offset="100%" stopColor="#451A03"/></linearGradient></defs>
      <rect width="360" height="130" fill="url(#bcg4)"/>
      <circle cx="310" cy="20" r="70" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05"/>
      <circle cx="310" cy="20" r="46" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05"/>
      <text x="180" y="72" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="62" fontWeight="bold" fill="#FCD34D" fillOpacity="0.9">€50</text>
      <rect x="118" y="84" width="124" height="22" rx="5" fill="#FCD34D" fillOpacity="0.14"/>
      <text x="180" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#FCD34D" fillOpacity="0.82">Steuerfrei · §8 EStG</text>
      <text x="30" y="24" fontFamily="sans-serif" fontSize="9.5" fill="white" fillOpacity="0.3">Sachbezugsfreigrenze 2026</text>
    </svg>
  );
  if (id === 5) return (
    <svg viewBox="0 0 360 130" style={{display:"block",width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="bcg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4338CA"/><stop offset="100%" stopColor="#1E1A7A"/></linearGradient></defs>
      <rect width="360" height="130" fill="url(#bcg5)"/>
      <circle cx="310" cy="28" r="58" fill="white" fillOpacity="0.025"/>
      <circle cx="50" cy="108" r="44" fill="white" fillOpacity="0.02"/>
      <text x="180" y="68" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="52" fontWeight="bold" fill="white" fillOpacity="0.92">€ 0,-</text>
      <text x="180" y="90" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="white" fillOpacity="0.42">für Arbeitgeber</text>
      <circle cx="148" cy="112" r="2.5" fill="white" fillOpacity="0.22"/>
      <circle cx="180" cy="112" r="2.5" fill="white" fillOpacity="0.22"/>
      <circle cx="212" cy="112" r="2.5" fill="white" fillOpacity="0.22"/>
    </svg>
  );
  if (id === 6) return (
    <svg viewBox="0 0 360 130" style={{display:"block",width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="bcg6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#881337"/><stop offset="100%" stopColor="#4C0519"/></linearGradient></defs>
      <rect width="360" height="130" fill="url(#bcg6)"/>
      <line x1="80" y1="104" x2="280" y2="104" stroke="white" strokeWidth="1" strokeOpacity="0.12"/>
      <rect x="100" y="28" width="64" height="76" rx="6" fill="#6EE7B7" fillOpacity="0.68"/>
      <text x="132" y="20" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="17" fontWeight="bold" fill="#6EE7B7">93%</text>
      <rect x="196" y="62" width="64" height="42" rx="6" fill="white" fillOpacity="0.18"/>
      <text x="228" y="54" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="17" fontWeight="bold" fill="white" fillOpacity="0.42">35%</text>
      <text x="132" y="118" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fill="#6EE7B7" fillOpacity="0.72">Sachbezug</text>
      <text x="228" y="118" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fill="white" fillOpacity="0.35">Gehaltserhöhung</text>
      <text x="180" y="86" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="white" fillOpacity="0.2">vs.</text>
    </svg>
  );
  return <div style={{height:"100%",background:"#0F6E56"}}/>;
}

const BLOG_EXTRA = {
  1: [
    { type: "providers", title: "Mitarbeiterrabatt-Portale im Vergleich", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Marken · Kostenlos für AG" },
      { name: "Corporate Benefits", url: "corporate-benefits.de", desc: "1.500+ Marken · Ab 50 MA · Kostenlos" },
      { name: "Benefits.me", url: "benefits.me", desc: "Entertainment & Ticketing · Kostenlos" },
    ]},
    { type: "h2", text: "Wie baue ich ein Benefits-Paket auf?" },
    { type: "p", text: "Der einfachste Einstieg: Mit dem €50-Sachbezug beginnen. Dieser ist in wenigen Stunden eingerichtet, kostet den Arbeitgeber ab €2,42/MA/Monat und bringt sofort spürbaren Mehrwert. Danach lässt sich das Paket Schritt für Schritt erweitern — Essenszuschuss, Deutschlandticket, Firmenfitness." },
    { type: "providers", title: "Empfohlene Sachbezug-Anbieter", items: [
      { name: "Hrmony", url: "hrmony.de", desc: "All-in-One · ab €3,50/MA" },
      { name: "Belonio", url: "belonio.de", desc: "Günstigster Preis · ab €2,42/MA" },
      { name: "Probonio", url: "probonio.de", desc: "Modular · ab 1 Mitarbeitenden" },
      { name: "Billyard", url: "billyard.de", desc: "KI-Belegprüfung · DATEV-Export" },
    ]},
    { type: "h2", text: "Welche Benefits eignen sich für welche Unternehmensgröße?" },
    { type: "p", text: "Für kleine Unternehmen (5–50 MA): Sachbezug und Mitarbeiterrabatte sind ideal — geringer Aufwand, sofortige Wirkung. Für mittlere Unternehmen (50–500 MA): Zusätzlich Essenszuschuss und Jobrad. Für Konzerne: Vollständiges Cafeteria-Modell mit individuell wählbaren Benefits pro Mitarbeitenden. Anbieter wie Hrmony oder Circula skalieren von KMU bis Enterprise." },
    { type: "h2", text: "Die wichtigsten Benefits-Trends 2026" },
    { type: "p", text: "Drei Trends dominieren 2026: 1. Mental Health als Standard — Zugang zu psychologischer Beratung wird von Bewerbern zunehmend erwartet. 2. Nachhaltigkeit als Differenzierungsmerkmal — wertegetriebene Marken und CO₂-reduzierende Benefits steigern die Arbeitgeberattraktivität. 3. Vollautomatisierung — Plattformen, die HR-Aufwand auf nahezu null reduzieren, setzen sich durch." },
    { type: "h2", text: "Was kostet ein vollständiges Benefits-Paket?" },
    { type: "p", text: "Ein vollständiges Paket aus Sachbezug (€3,50/MA/Monat), Essenszuschuss (ca. €5/MA/Monat Plattformgebühr) und Deutschlandticket (€58/MA/Monat) kostet den Arbeitgeber unter €70/MA/Monat an direkten Plattformkosten — zusätzlich zu den Benefit-Beträgen selbst. Durch wegfallende Sozialabgaben amortisiert sich die Investition oft bereits innerhalb des ersten Jahres." },
    { type: "providers", title: "All-in-One Plattformen im Überblick", items: [
      { name: "Circula", url: "circula.com", desc: "Spesen & Benefits kombiniert" },
      { name: "LOFINO", url: "lofino.de", desc: "Vollautomatische Abrechnung" },
      { name: "Givve", url: "givve.com", desc: "White-Label Mastercard" },
      { name: "Pluxee", url: "pluxee.de", desc: "40+ Jahre Erfahrung im DACH-Raum" },
    ]},
  ],
  2: [
    { type: "h2", text: "Was ist der Unterschied zwischen steuerfrei und steuerbegünstigt?" },
    { type: "p", text: "Steuerfreie Benefits (§3 EStG): Der Arbeitgeber zahlt den Betrag, der Arbeitnehmer zahlt keine Steuer und keine Sozialabgaben. Beispiele: Sachbezug bis €50, ÖPNV-Zuschuss, Jobrad. Steuerbegünstigte Benefits: Es fällt eine Pauschalsteuer an, die der Arbeitgeber trägt. Beispiele: Essenszuschuss (25% Pauschalsteuer auf den AG-Anteil), Erholungsbeihilfe (25% Pauschalsteuer). In beiden Fällen ist der Nettovorteil für Mitarbeitende deutlich besser als bei einer Bruttogehaltserhöhung." },
    { type: "h2", text: "Die ZAG-Kriterien im Detail" },
    { type: "p", text: "Seit 2022 müssen Sachbezugsgutscheine und -karten die Kriterien des Zahlungsdiensteaufsichtsgesetzes (ZAG) erfüllen. Das bedeutet konkret: Die Karte oder der Gutschein darf nur bei einem begrenzten Händlernetz (z.B. einer bestimmten Branche oder Region) oder für bestimmte Waren und Dienstleistungen verwendet werden. Eine beliebige Barabhebung ist ausgeschlossen. Alle seriösen Anbieter sind ZAG-konform — bei Eigenentwicklungen sollte die Rechtsabteilung hinzugezogen werden." },
    { type: "providers", title: "ZAG-konforme Plattformen", items: [
      { name: "Spendit", url: "spendit.de", desc: "Regionale Visa-Karte · 60 Zonen" },
      { name: "Edenred", url: "edenred.de", desc: "City Card · Flächendeckend stationär" },
      { name: "Givve", url: "givve.com", desc: "Mastercard Prepaid · White-Label" },
      { name: "Guudcard", url: "guud-benefits.com", desc: "B Corp-zertifiziert · Nachhaltig" },
    ]},
    { type: "h2", text: "Häufige Fehler bei der Benefits-Abrechnung" },
    { type: "p", text: "Fehler 1: Gehaltsumwandlung statt Zusatzleistung. Der Sachbezug muss zusätzlich zum ohnehin geschuldeten Gehalt gewährt werden. Fehler 2: Freigrenze überschreiten. Bereits ein Cent über €50 macht den gesamten Betrag steuerpflichtig. Fehler 3: Fehlende Dokumentation. Sachbezüge müssen im Lohnkonto vermerkt sein — auch wenn sie nicht besteuert werden. Fehler 4: Nicht-ZAG-konforme Gutscheine. Nur ZAG-konforme Karten und Gutscheine sind ab 2022 steuerfrei." },
    { type: "h2", text: "Checkliste für die Lohnbuchhaltung" },
    { type: "p", text: "✓ Sachbezug wird zusätzlich zum Gehalt gewährt (keine Umwandlung). ✓ Monatlicher Betrag überschreitet €50 nicht. ✓ Gutschein/Karte ist ZAG-konform. ✓ Sachbezug ist im Lohnkonto dokumentiert. ✓ Essenszuschuss: Mindest-AG-Anteil von €3,10/Mahlzeit wird eingehalten. ✓ Pauschalsteuer auf Essenszuschuss-Differenz wird korrekt abgeführt. ✓ DATEV-Export aus der Plattform liegt vor. Die meisten modernen Plattformen übernehmen diese Dokumentation automatisch." },
    { type: "h2", text: "Was bei Betriebsprüfungen kontrolliert wird" },
    { type: "p", text: "Betriebsprüfer kontrollieren regelmäßig: 1. Ob Sachbezüge tatsächlich zusätzlich zum Gehalt gewährt wurden (Vergleich mit Gehaltsabrechnungen). 2. Ob die €50-Freigrenze eingehalten wurde. 3. Ob die ZAG-Kriterien der verwendeten Karten/Gutscheine erfüllt sind. 4. Ob Anlassgaben (€60-Regel) korrekt einzelnen Anlässen zugeordnet wurden. Mit einer gut geführten Benefits-Plattform und automatischer DATEV-Integration ist die Betriebsprüfung in der Regel unkritisch." },
    { type: "h2", text: "Bonus-Tipp: Kostenlose Mitarbeiterrabatte ohne Steueraufwand" },
    { type: "p", html: 'Neben den steuerlich relevanten Benefits gibt es eine Kategorie, die völlig außerhalb des Steuerrechts liegt: Mitarbeiterrabatt-Portale. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> (futurebens.co) ist für Arbeitgeber vollständig kostenlos und erfordert keinerlei steuerliche Behandlung — Mitarbeitende erhalten Rabatte direkt beim Einkauf. Als Ergänzung zum steuerlichen Benefit-Paket steigert FutureBens die wahrgenommene Attraktivität des Arbeitgebers ohne zusätzlichen Steuer- oder Verwaltungsaufwand.' },
    { type: "providers", title: "Steuerfreie Ergänzung: Kostenlose Rabattportale", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Marken · Kein Steueraufwand" },
      { name: "Corporate Benefits", url: "corporate-benefits.de", desc: "1.500+ Marken · Kostenlos für AG" },
    ]},
  ],
  3: [
    { type: "h2", text: "Was Mitarbeitende wirklich wollen: Nachhaltigkeitsdaten 2026" },
    { type: "p", text: "Laut einer Studie von Deloitte 2025 nennen 67% der Gen Z-Bewerber:innen Nachhaltigkeitswerte als wichtigen Faktor bei der Arbeitgeberwahl. 54% würden für ein nachhaltigeres Unternehmen auf bis zu 10% Gehalt verzichten. Benefits, die diese Werte widerspiegeln, sind damit nicht mehr nur 'nice to have' — sie sind ein messbarer Einstellungsvorteil." },
    { type: "providers", title: "Nachhaltige Anbieter im Vergleich", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Marken · Kostenlos für AG" },
      { name: "Guudcard", url: "guud-benefits.com", desc: "B Corp-zertifiziert · Nachhaltiges Netz" },
      { name: "Jobrad", url: "jobrad.org", desc: "CO₂-Reduktion · 50.000+ Unternehmen" },
      { name: "Urban Sports Club", url: "urbansportsclub.com", desc: "Aktive Mobilität · 50+ Städte" },
    ]},
    { type: "h2", text: "FutureBens im Detail: Nachhaltige Marken als Benefits" },
    { type: "p", html: '<a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> wurde 2020 in Berlin gegründet und hat sich auf wertegetriebenes Employer Branding durch Mitarbeiterrabatte spezialisiert. Die Plattform bietet Zugang zu sorgfältig kuratierten Marken wie ArmedAngels (faire Mode), HelloFresh (Lebensmittelwertschöpfung), FlixTrain (klimafreundliche Bahn), Seeberger (Bio-Lebensmittel), Arket (Skandinavische Nachhaltigkeit) und Koro (direkte Lebensmittelkette). Bis zu 45% Rabatt bei diesen Marken sind für Mitarbeitende erreichbar. Für Arbeitgeber ist FutureBens komplett kostenlos — kein Vertrag, keine Mindestlaufzeit.' },
    { type: "h2", text: "Jobrad: Zahlen, Daten, Fakten zur Klimawirkung" },
    { type: "p", text: "Laut eigenen Berechnungen von Jobrad ersetzt jedes Dienstrad im Schnitt 1.800 km Autofahrt pro Jahr. Bei 50.000 Unternehmenskunden und im Schnitt 5 genutzten Rädern pro Unternehmen entspricht das einer CO₂-Einsparung von mehreren Hunderttausend Tonnen jährlich. Für Unternehmen mit ESG-Reporting ist Jobrad ein messbarer Hebel zur Scope-3-Emissionsreduktion — und gleichzeitig ein beliebtester Benefit bei Mitarbeitenden unter 40." },
    { type: "h2", text: "Green Employer Branding als Wettbewerbsvorteil" },
    { type: "p", text: "Unternehmen, die nachhaltige Benefits aktiv kommunizieren, verzeichnen laut HR-Studien eine um 23% höhere Bewerbungsrate in der Zielgruppe unter 35 Jahren. Die gute Nachricht: Nachhaltige Benefits müssen nicht teuer sein. FutureBens ist kostenlos, Guudcard kostet wie jede andere Sachbezugskarte, und Jobrad ist für den Arbeitgeber oft kostenneutral. Die einzige Investition ist Zeit für die Kommunikation im Employer Branding." },
    { type: "h2", text: "Wie man nachhaltige Benefits misst und kommuniziert" },
    { type: "p", text: "Messbare KPIs für nachhaltige Benefits: CO₂-Einsparung durch Jobrad (Jobrad liefert diese Daten), Anteil nachhaltiger Marken im Mitarbeiterrabatt-Portfolio, Nutzungsquote von Firmenfitness (reduziert Krankheitstage und damit indirekt Emissionen durch Abwesenheit). Diese Zahlen lassen sich gut in ESG-Reports und im Recruiting-Material einsetzen." },
  ],
  4: [
    { type: "h2", text: "Die 8 wichtigsten steuerfreien Benefits im Überblick" },
    { type: "p", text: "1. Sachbezug (€50/Monat): §8 Abs. 2 S.11 EStG — komplett steuerfrei. 2. ÖPNV-Zuschuss (unbegrenzt): §3 Nr. 15 EStG — komplett steuerfrei. 3. Jobrad (0,25%-Regelung): Steuerbegünstigt als geldwerter Vorteil. 4. Homeoffice-Pauschale (€6/Tag): Steuerlich absetzbar für Arbeitnehmer. 5. Erholungsbeihilfe (€156/Jahr): §40 Abs. 2 Nr. 3 EStG — 25% Pauschalsteuer durch AG. 6. Anlassgaben (€60/Anlass): Steuerfrei bei persönlichen Anlässen. 7. Essenszuschuss (€7,67/Tag): Steuerbegünstigt, 25% Pauschalsteuer auf AG-Anteil über €3,10. 8. Internetpauschale (bis €50/Monat): Bei nachgewiesenem beruflichem Bedarf steuerfrei." },
    { type: "providers", title: "Einfach zu implementierende Plattformen", items: [
      { name: "Probonio", url: "probonio.de", desc: "Ab 1 MA · In Stunden eingerichtet" },
      { name: "Belonio", url: "belonio.de", desc: "Ab €29/MA/Jahr · Niedrigschwellig" },
      { name: "LOFINO", url: "lofino.de", desc: "Vollautomatisch · Payroll-Integration" },
      { name: "Hrmony", url: "hrmony.de", desc: "Personio-Integration · All-in-One" },
    ]},
    { type: "h2", text: "Implementierungsreihenfolge für HR-Teams" },
    { type: "p", text: "Woche 1: Anbieter für den €50-Sachbezug auswählen und Vertrag abschließen. Die meisten Plattformen ermöglichen Onboarding innerhalb von 2-3 Werktagen. Woche 2: Mitarbeiterliste importieren und erste Gutscheine ausgeben. Gleichzeitig: ÖPNV-Zuschuss als Sonderabkommen mit dem Gehaltsabrechnungs-System einrichten (einmaliger Setup). Monat 2: Essenszuschuss einführen, wenn KI-Belegprüfung genutzt wird (kein manueller Aufwand). Monat 3: Erholungsbeihilfe und Anlassgabe-Workflow im HR-System einrichten (Einmalaufwand)." },
    { type: "h2", text: "Wie spart man bei der Implementierung Zeit?" },
    { type: "p", text: "Die größten Zeitfresser bei Benefits-Einführungen sind: manuelle Belegprüfung beim Essenszuschuss, monatliche Aufladung von Karten ohne API-Anbindung, und fehlende DATEV-Integration. Wer auf Plattformen mit vollautomatischer Belegprüfung (Billyard, LOFINO) und API-Schnittstellen zu gängigen HR-Systemen (Personio-Integration bei Hrmony) setzt, reduziert den laufenden HR-Aufwand auf nahezu null." },
    { type: "h2", text: "Was Betriebsprüfer bei steuerfreien Sachbezügen prüfen" },
    { type: "p", text: "Drei Bereiche stehen im Fokus von Betriebsprüfungen: 1. Zusätzlichkeitsprinzip: Wurde der Benefit tatsächlich zusätzlich zum Gehalt gewährt? Ein einziger Mitarbeitender, bei dem nachweislich eine Gehaltsumwandlung stattfand, kann die Steuerfreiheit für alle in Frage stellen. 2. ZAG-Konformität: Werden die genutzten Gutscheine/Karten tatsächlich nur bei eingeschränkten Händlernetzen akzeptiert? 3. Monatliche Freigrenze: Wurde €50 nie überschritten?" },
    { type: "h2", text: "Kostenlose Ergänzung: Mitarbeiterrabatte ohne Steueraufwand" },
    { type: "p", html: 'Mitarbeiterrabatt-Portale sind eine ideale Ergänzung zu steuerfreien Sachbezügen — und für Arbeitgeber vollständig kostenlos. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> bietet Mitarbeitenden Zugang zu Rabatten bei nachhaltigen Marken wie ArmedAngels, HelloFresh und FlixTrain. Da die Rabatte direkt beim Einkauf abgezogen werden, gibt es keine Freibeträge zu beachten und keinen HR-Aufwand — die perfekte Ergänzung zum €50-Sachbezug.' },
    { type: "providers", title: "Zero-Cost-Ergänzung zum Sachbezug", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Rabatte · Kostenlos" },
      { name: "Corporate Benefits", url: "corporate-benefits.de", desc: "1.500+ Marken · Kostenlos" },
    ]},
  ],
  5: [
    { type: "h2", text: "Mehr kostenlose Benefits als du denkst" },
    { type: "p", text: "Neben den drei bekannten Rabattportalen gibt es weitere kostenlose oder nahezu kostenlose Benefits: Betriebliche Altersvorsorge (BAV) — der Arbeitgeber zahlt nichts extra, der Mitarbeitende spart durch Steuer- und Sozialabgaben-Ersparnis. Employee Assistance Programs (EAP) — psychosoziale Beratung für Mitarbeitende, die viele Krankenversicherungen als Zusatzleistung kostenfrei anbieten. Corporate Benefits aus bestehenden Kooperationen — viele Unternehmen haben bereits Rabattvereinbarungen mit Lieferanten oder regionalen Betrieben." },
    { type: "providers", title: "Kostenlose Benefits-Plattformen für Arbeitgeber", items: [
      { name: "Corporate Benefits", url: "corporate-benefits.de", desc: "1.500+ Marken · Ab 50 MA · Kostenlos" },
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Marken · Kostenlos" },
      { name: "Benefits.me", url: "benefits.me", desc: "Entertainment & Ticketing · Kostenlos" },
    ]},
    { type: "h2", text: "Zero-Cost-Benefits strategisch einsetzen" },
    { type: "p", text: "Kostenlose Benefits sind am wirkungsvollsten, wenn sie aktiv kommuniziert werden. Eine Mitarbeiterrabattkarte, die niemand kennt, bringt nichts. Erfolgreiche Einführung in 3 Schritten: 1. Plattform einrichten (< 1 Stunde). 2. Alle Mitarbeitenden per E-Mail mit konkreten Beispiel-Rabatten informieren ('Spare heute 20% bei ArmedAngels'). 3. Regelmäßige Reminder bei neuen Angeboten oder saisonalen Aktionen. Unternehmen, die diesen Kommunikationsrythmus einhalten, berichten von über 80% aktiver Nutzung nach 3 Monaten." },
    { type: "h2", text: "Von 0 auf kostenlose Benefits in 30 Minuten" },
    { type: "p", text: "Tag 1 (30 Minuten): Konto bei Corporate Benefits und FutureBens anlegen, Unternehmensdaten eingeben, Willkommens-E-Mail an Mitarbeitende vorbereiten. Tag 2: Mitarbeiterlisten importieren und Accounts aktivieren. Tag 3: Kommunikation an alle Mitarbeitenden mit Anleitung zur Aktivierung. Gesamtaufwand für die Einführung: unter 2 Stunden HR-Zeit. Laufender Aufwand: nahezu null, da vollautomatisch." },
    { type: "h2", text: "Der ROI von kostenlosen Benefits" },
    { type: "p", text: "Auch wenn kostenlose Benefits nichts kosten, haben sie einen messbaren ROI: Mitarbeitende, die regelmäßig Rabatte nutzen, sparen im Schnitt €300–800/Jahr. Dieser Vorteil wird als Teil des Gehaltspakets wahrgenommen und erhöht die Mitarbeiterbindung. Laut Studien sind Mitarbeitende, die Benefits aktiv nutzen, zu 34% weniger wechselwillig. Die Einführung kostet eine Stunde — die Wirkung hält Jahre." },
    { type: "h2", text: "Kombination mit kostenpflichtigen Benefits" },
    { type: "p", text: "Die optimale Strategie: Zuerst alle kostenlosen Benefits einführen (Rabattportale, flexible Arbeitszeit), dann schrittweise kostenpflichtige Benefits hinzufügen. Empfohlene Reihenfolge nach Kosten-Nutzen: 1. Mitarbeiterrabatte (kostenlos), 2. €50-Sachbezug (ab €2,42/MA/Monat), 3. Jobrad (kostenneutral durch Sozialabgaben-Ersparnis), 4. Essenszuschuss (ab €2,50/MA/Monat Plattformgebühr), 5. Firmenfitness (ab €15/MA/Monat). Jeder Schritt ist eigenständig und reversibel." },
  ],
  6: [
    { type: "h2", text: "Rechenbeispiel bei verschiedenen Gehaltsklassen" },
    { type: "p", text: "Das Ergebnis ist bei unterschiedlichen Gehaltsklassen überraschend stabil. Bei €2.500/Monat brutto (Grenzsteuersatz ~32%): €50 Brutto-Erhöhung → ca. €27 netto. €50 Sachbezug → €50 netto. Vorteil: +€23. Bei €6.000/Monat brutto (Grenzsteuersatz ~45%): €50 Brutto-Erhöhung → ca. €19 netto. €50 Sachbezug → €50 netto. Vorteil: +€31. Je höher das Gehalt, desto größer der absolute Vorteil des Sachbezugs — da höhere Grenzsteuersätze greifen." },
    { type: "h2", text: "Die Jahresrechnung: Was bleibsumme sich bei konsequenter Nutzung?" },
    { type: "p", text: "Bei konsequenter Nutzung aller verfügbaren steuerfreien Bausteine über 12 Monate ergibt sich folgendes Bild: Sachbezug 12 × €50 = €600 (steuerfrei). Essenszuschuss 15 × 11 Arbeitsmonate × €4,57 AG-Anteil = ca. €755 (pauschalbesteuert). Deutschlandticket 12 × €58 = €696 (steuerfrei). Anlassgaben 2 × €60 = €120 (steuerfrei). Erholungsbeihilfe = €156 (pauschalbesteuert). Gesamter Nettovorteil: ca. €2.327/Jahr — ohne Abzüge für den Mitarbeitenden." },
    { type: "providers", title: "Anbieter mit bestem Preis-Leistungs-Verhältnis", items: [
      { name: "Belonio", url: "belonio.de", desc: "Günstigster Einstieg · ab €2,42/MA" },
      { name: "Probonio", url: "probonio.de", desc: "Flexibel · Modular · ab 1 MA" },
      { name: "Spendit", url: "spendit.de", desc: "Etabliert · SpenditCard Visa" },
      { name: "Pluxee", url: "pluxee.de", desc: "40+ Jahre Erfahrung · Lunch Card" },
    ]},
    { type: "h2", text: "Was ist, wenn die €50-Freigrenze bereits ausgeschöpft ist?" },
    { type: "p", text: "Wenn der Sachbezug bereits voll genutzt wird, gibt es weitere Optionen: Der ÖPNV-Zuschuss (Deutschlandticket) ist vollständig steuerfrei und hat keine Betragsgrenze — er ist unabhängig vom Sachbezug. Anlassgaben (€60) sind zusätzlich zur Freigrenze möglich. Firmenfitness kann als eigenständiger Benefit eingeführt werden, der innerhalb der €50-Sachbezugsgrenze angerechnet wird oder als separate Leistung außerhalb. Mental-Health-Leistungen fallen nicht unter die Sachbezugsfreigrenze und können separat gewährt werden." },
    { type: "h2", text: "Fazit: Die Mathematik spricht für Benefits" },
    { type: "p", text: "Zusammenfassung des Vergleichs: Ein Arbeitgeber, der €53,50/Monat (inkl. Plattformgebühr) in Sachbezug investiert, schafft €50 netto Kaufkraft für Mitarbeitende. Für denselben Nettovorteil müsste er ~€100 brutto als Gehaltserhöhung zahlen — fast das Doppelte. Bei 50 Mitarbeitenden ergibt das eine jährliche Ersparnis von über €28.000 im Vergleich zur Gehaltserhöhung. Diese Zahlen machen Benefits nicht nur attraktiver für Mitarbeitende, sondern auch betriebswirtschaftlich überzeugend für Arbeitgeber." },
    { type: "h2", text: "Wann lohnt sich trotzdem eine Gehaltserhöhung?" },
    { type: "p", text: "Benefits sind nicht immer die beste Lösung. Eine Gehaltserhöhung ist sinnvoll, wenn: Der Mitarbeitende konkrete Gehaltsvorstellungen hat, die sich an Marktvergleichen orientieren (Benchmarks). Die Benefits-Freigrenze bereits ausgeschöpft ist. Es sich um eine Führungskraft handelt, für die das Gehaltsniveau ein Status-Signal ist. Der Mitarbeitende eine Gehaltserhöhung explizit als Wertschätzung erwartet. In allen anderen Fällen sollte der Sachbezug immer Teil des Gehaltsgesprächs sein." },
    { type: "h2", text: "Den Nettovorteil noch weiter steigern: Mitarbeiterrabatte on top" },
    { type: "p", html: 'Wer den maximalen Nettovorteil für Mitarbeitende erzielen will, kombiniert den €50-Sachbezug mit kostenlosen Mitarbeiterrabatten. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> bietet Rabatte bei nachhaltigen Marken — kostenlos für Arbeitgeber. Das Ergebnis: Mitarbeitende erhalten monatliche Kaufkraft durch den Sachbezug <em>und</em> zusätzliche Einkaufsvorteile durch Rabattportale — ohne dass der Arbeitgeber einen Cent mehr zahlt.' },
    { type: "providers", title: "Sachbezug + Rabatte kombinieren", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Rabatte · Kostenlos für AG" },
      { name: "Belonio", url: "belonio.de", desc: "Sachbezug ab €2,42/MA/Monat" },
      { name: "Probonio", url: "probonio.de", desc: "Modular · ab 1 Mitarbeitenden" },
    ]},
  ],
  7: [
    { type: "h2", text: "Das vollständige Mobilitäts-Benefits-Paket 2026" },
    { type: "p", html: 'Das Deutschlandticket ist nur ein Baustein. Das optimale Mobilitätspaket kombiniert ÖPNV-Zuschuss mit weiteren steuerfreien Benefits: Der €50-Sachbezug kann z.B. für Tanken, Carsharing oder E-Scooter eingesetzt werden. Kostenlose Mitarbeiterrabatte wie <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> enthalten Rabatte auf Mobilitätsanbieter wie FlixTrain — und sind für Arbeitgeber vollständig kostenlos.' },
    { type: "providers", title: "Ergänzende Benefits zum Deutschlandticket", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "FlixTrain & mehr · Kostenlos für AG" },
      { name: "Hrmony", url: "hrmony.de", desc: "DT-Ticket integriert · All-in-One" },
      { name: "Billyard", url: "billyard.de", desc: "Mobilitätsbudget · KI-Belegprüfung" },
    ]},
    { type: "h2", text: "Häufige Fragen zum Deutschlandticket als Benefit" },
    { type: "p", text: "Muss das Ticket auf den Namen des Mitarbeitenden lauten? Ja, das Deutschlandticket ist personengebunden. Kann der Arbeitgeber auch nur einen Teil übernehmen? Ja — der AG-Anteil ist steuerfrei, der MA-Eigenanteil kann per Gehaltsumwandlung finanziert werden. Gilt §3 Nr. 15 EStG auch für Jahreskarten? Ja, Jahreskarten für den ÖPNV fallen ebenfalls unter die Steuerbefreiung. Muss das Ticket für den Arbeitsweg genutzt werden? Nein — das Ticket gilt für alle privaten und beruflichen ÖPNV-Fahrten in Deutschland." },
  ],
  8: [
    { type: "h2", text: "Die besten kostenlosen Benefits für kleine Unternehmen" },
    { type: "p", html: 'Für Unternehmen mit 5–50 Mitarbeitenden sind kostenlose Benefits besonders wertvoll. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> ist ein nachhaltiges Mitarbeiterrabatt-Portal ohne Kosten für Arbeitgeber — ideal für kleine Unternehmen, die mehr bieten wollen, ohne das Budget zu belasten. Die Einrichtung dauert weniger als eine Stunde, und Mitarbeitende erhalten sofort Zugang zu Rabatten bei ArmedAngels, HelloFresh und weiteren nachhaltigen Marken.' },
    { type: "tip", text: "Kleines Team, große Wirkung: FutureBens ist kostenlos, in einer Stunde eingerichtet, und erhöht die wahrgenommene Benefits-Attraktivität sofort — ideal als erster Schritt vor dem kostenpflichtigen Sachbezug." },
    { type: "providers", title: "Kostenlose Benefits für KMU", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Nachhaltige Marken · 100% kostenlos" },
      { name: "Probonio", url: "probonio.de", desc: "Sachbezug · ab 1 Mitarbeitenden" },
      { name: "Belonio", url: "belonio.de", desc: "Günstigster Einstieg · ab €2,42/MA" },
    ]},
    { type: "h2", text: "Anbieter-Vergleich für Unternehmen unter 20 Mitarbeitenden" },
    { type: "p", html: 'Drei Kriterien zählen bei der Anbieterauswahl für kleine Unternehmen: 1. Keine Mindestmitarbeiterzahl — Belonio startet ab 5, Probonio bereits ab 1 MA. 2. Monatliche Kündbarkeit — Jahresverträge sind für KMU ein Risiko. 3. Minimaler Einrichtungsaufwand. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> als kostenloser Add-on ergänzt jeden dieser Anbieter ohne zusätzlichen Aufwand.' },
  ],
  9: [
    { type: "h2", text: "Sofort nutzbare Benefits vom ersten Arbeitstag" },
    { type: "p", html: 'Nicht alle Benefits eignen sich für Tag 1, aber einige sind sofort aktivierbar: <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> kann am ersten Arbeitstag freigeschaltet werden — neue Mitarbeitende erhalten sofort Zugang zu Rabatten bei nachhaltigen Marken. Der €50-Sachbezug ist ab dem ersten Tag nutzbar, wenn die Karte vorab aktiviert wurde. Das Deutschlandticket kann bereits für den ersten Arbeitstag übernommen werden.' },
    { type: "providers", title: "Benefits, die ab Tag 1 wirken", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Sofort aktivierbar · Kostenlos" },
      { name: "Probonio", url: "probonio.de", desc: "Sachbezug ab Tag 1 · Modular" },
      { name: "Hrmony", url: "hrmony.de", desc: "All-in-One · Schnell eingerichtet" },
    ]},
    { type: "h2", text: "Benefits-Kommunikation im Onboarding: So geht's richtig" },
    { type: "p", html: 'Der häufigste Fehler: Mitarbeitende wissen nicht, was sie bekommen. Ein zweiseitiges Benefits-Dokument mit konkreten Beispiel-Rabatten (z.B. "Spare 20% bei ArmedAngels via <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a>") und Aktivierungslinks macht den Unterschied. Dieses Dokument sollte am ersten Tag übergeben werden — nicht 3 Monate später in der Probezeit-Besprechung.' },
  ],
  10: [
    { type: "h2", text: "Mitarbeiterrabatte: Der ideale Remote-Benefit" },
    { type: "p", html: 'Mitarbeiterrabatt-Portale sind per Definition ortsunabhängig — und damit ideal für Remote-Teams. <a href="https://futurebens.co" target="_blank" rel="noopener noreferrer" style="color:#0F6E56;font-weight:600;">FutureBens</a> bietet Zugang zu Rabatten bei Online-Marken wie ArmedAngels, HelloFresh und Koro, die alle direkt nach Hause liefern. Für Arbeitgeber vollständig kostenlos und in einer Stunde eingerichtet — kein ortsgebundener Aufwand.' },
    { type: "providers", title: "Ortsunabhängige Benefits für Remote-Teams", items: [
      { name: "FutureBens", url: "futurebens.co", desc: "Online-Shopping-Rabatte · Kostenlos" },
      { name: "Nilo Health", url: "nilohealth.com", desc: "Mental Health · Digital · Ortsunabhängig" },
      { name: "Wellhub", url: "wellhub.com", desc: "11.000+ Studios + Digital-Kurse" },
    ]},
    { type: "h2", text: "Checkliste: Remote-taugliche Benefits 2026" },
    { type: "p", text: "✓ Sachbezug als digitaler Gutschein (z.B. Amazon, Zalando) — kein Karten-Versand nötig. ✓ Mitarbeiterrabatte (FutureBens, Corporate Benefits) — vollständig digital. ✓ Mental Health (Nilo Health, OpenUp) — Video-Sessions, ortsunabhängig. ✓ Online-Fitness (Wellhub Digital) — Yoga, HIIT, Meditation per App. ✓ Homeoffice-Pauschale (€6/Tag) — direkte Kostenerstattung. ✗ Büro-Kantine — kein Remote-Benefit. ✗ Stationäres Fitnessstudio ohne Home-Option — nur teilweise nutzbar." },
  ],
};

const ALTERNATIVE_PAGES = {
  "edenred": {
    providerName: "Edenred",
    providerId: 3,
    intro: "Edenred ist seit über 60 Jahren auf dem Markt und zählt zu den bekanntesten Sachbezugsanbietern Deutschlands. Doch viele HR-Verantwortliche suchen 2026 nach moderneren, flexibleren Alternativen — besonders wenn es um App-Usability, Vertragsflexibilität und die Kombination mehrerer Benefit-Arten geht.",
    reasons: [
      { title: "Jahresverträge ohne monatliche Flexibilität", desc: "Edenred bindet Arbeitgeber in der Regel an 12-monatige Laufzeiten. Wer agil bleiben will, schaut sich nach monatlich kündbaren Anbietern um." },
      { title: "City Card primär für stationären Handel", desc: "Die Edenred City Card ist auf den stationären Einzelhandel ausgelegt. Für Unternehmen mit remote Teams oder online-affinen Mitarbeitenden ein Nachteil." },
      { title: "Nur Sachbezug und Essenszuschuss", desc: "Wer mehrere Benefit-Arten — z.B. Mobilitätsbudget, Mitarbeiterrabatte oder Firmenfitness — in einer Plattform bündeln will, stößt bei Edenred an Grenzen." },
      { title: "Ältere App-Erfahrung", desc: "Im Vergleich zu neueren Anbietern bieten spezialisierte Apps ein deutlich moderneres Nutzererlebnis für Mitarbeitende und HR-Admins." },
    ],
    alternatives: [1, 4, 5, 12, 13],
  },
  "hrmony": {
    providerName: "Hrmony",
    providerId: 1,
    intro: "Hrmony ist eine der bekanntesten All-in-One Benefit-Plattformen in Deutschland und besonders durch die native Personio-Integration bekannt. Wer kein Personio einsetzt oder einen günstigeren Einstieg sucht, findet 2026 starke Alternativen.",
    reasons: [
      { title: "Höherer Preis als Wettbewerber", desc: "Mit ab €3,50/MA/Monat liegt Hrmony im oberen Preissegment. Günstigere Alternativen starten bereits bei €2,40/MA/Monat." },
      { title: "Vorteil stark an Personio geknüpft", desc: "Die tiefe Personio-Integration ist Hrmonys stärkstes Argument — wer ein anderes HRIS nutzt, zahlt für Features, die anderswo günstiger verfügbar sind." },
      { title: "Digitale Gutscheine statt physischer Karte", desc: "Für Mitarbeitende, die eine physische Prepaid-Karte bevorzugen, bieten Anbieter wie Givve, Belonio oder Circula bessere Alternativen." },
      { title: "Kein Dienstrad oder Firmenfitness", desc: "Jobrad-Leasing und Firmenfitness müssen über separate Anbieter laufen und lassen sich nicht in Hrmony integrieren." },
    ],
    alternatives: [5, 4, 6, 13, 7],
  },
  "egym-wellpass": {
    providerName: "EGYM Wellpass",
    providerId: 23,
    intro: "EGYM Wellpass (ehemals qualitrain) ist mit über 6.000 Partnern einer der größten Firmenfitness-Anbieter in Deutschland. Doch mit Preisen ab €22/MA/Monat und Jahresverträgen suchen viele Unternehmen nach günstigeren oder flexibleren Alternativen.",
    reasons: [
      { title: "Höchster Preis im Firmenfitness-Segment", desc: "Mit ab €22/MA/Monat ist EGYM Wellpass der teuerste der großen Firmenfitness-Anbieter — Hansefit und Wellhub bieten günstigere Einstiegspreise." },
      { title: "Jahresvertrag erforderlich", desc: "EGYM Wellpass setzt in der Regel auf Jahresverträge. Für Unternehmen die Flexibilität schätzen, bietet Hansefit 'ohne Mindestlaufzeit' als Alternative." },
      { title: "Fokus auf Premium-Netzwerk", desc: "Das Premium-Studiokonzept passt nicht zu jedem Unternehmen — besonders wenn Mitarbeitende günstigere Studios oder Heimsport bevorzugen." },
      { title: "Remote-Teams weniger bedient", desc: "Bei stark remote arbeitenden Teams decken digitale Wellness-Angebote anderer Anbieter die Belegschaft besser ab." },
    ],
    alternatives: [22, 20, 21],
  },
  "probonio": {
    providerName: "Probonio",
    providerId: 5,
    intro: "Probonio ist eine flexible All-in-One Benefit-Plattform aus München, besonders bei Startups und wachsenden Unternehmen beliebt. Wer mehr Automatisierung, günstigere Preise oder eine tiefere HRIS-Integration sucht, findet 2026 starke Alternativen.",
    reasons: [
      { title: "Belegprüfung teilweise manuell", desc: "Bei Probonio werden Essensbelege noch teilweise manuell geprüft — Billyard und LOFINO setzen vollständig auf KI-Automatisierung und reduzieren den HR-Aufwand auf null." },
      { title: "Preis im mittleren Segment", desc: "Ab €3,00/MA/Monat liegt Probonio im Mittelfeld. Belonio bietet mit ab €2,40 einen günstigeren Einstieg für preisbewusste Unternehmen." },
      { title: "Kein natives HRIS-Integration", desc: "Im Gegensatz zu Hrmony mit nativer Personio-Integration bietet Probonio keine tiefe HR-System-Anbindung out-of-the-box." },
      { title: "Nur digitale Gutscheine — keine physische Karte", desc: "Wer eine Prepaid-Visa- oder Mastercard für Mitarbeitende bevorzugt, muss zu Givve, Belonio oder Circula wechseln." },
    ],
    alternatives: [1, 4, 6, 7, 13],
  },
  "hansefit": {
    providerName: "Hansefit",
    providerId: 22,
    intro: "Hansefit ist seit 1994 einer der etabliertesten Firmenfitness-Anbieter im DACH-Raum mit über 4.000 Partnerstudios. Für Unternehmen, die ein größeres Netzwerk, digitale Angebote oder internationale Verfügbarkeit benötigen, gibt es starke Alternativen.",
    reasons: [
      { title: "Kleineres Netzwerk als EGYM Wellpass", desc: "Mit 4.000+ Studios ist Hansefit solide, aber EGYM Wellpass bietet mit 6.000+ Einrichtungen inklusive Physiotherapie und Yoga ein breiteres Angebot." },
      { title: "Begrenzte digitale Angebote", desc: "Für remote arbeitende Mitarbeitende sind Hansefits digitale Fitness-Angebote im Vergleich zu Wellhub oder Urban Sports Club eingeschränkt." },
      { title: "Kaum internationale Abdeckung", desc: "Für Unternehmen mit Mitarbeitenden außerhalb von DE/AT/CH ist Wellhub mit 11.000+ Studios in 50+ Ländern die bessere Wahl." },
      { title: "Kein Mental-Health- oder Wellness-Fokus", desc: "Physiotherapie und psychologische Beratung sind bei Hansefit nicht integriert — EGYM Wellpass und Wellhub decken diese Bereiche mit ab." },
    ],
    alternatives: [23, 20, 21],
  },
  "spendit": {
    providerName: "Spendit",
    providerId: 2,
    intro: "Spendit ist mit über 5.500 Kunden und der SpenditCard (Visa) einer der bekanntesten regionalen Sachbezugsanbieter Deutschlands. Wer mehr Flexibilität, mehr Benefit-Arten oder ein moderneres Erlebnis sucht, findet 2026 passende Alternativen.",
    reasons: [
      { title: "Regionale Akzeptanz mit Einschränkungen", desc: "Die SpenditCard ist auf 60 Regionen beschränkt — für national tätige Unternehmen oder remote Teams bieten andere Anbieter mehr Freiheit." },
      { title: "Nur Sachbezug und Essenszuschuss", desc: "Spendit ist auf Sachbezug und Essen fokussiert. Wer Mobilitätsbudget, Rabatte oder Fitness in einer Plattform bündeln will, braucht eine All-in-One-Lösung." },
      { title: "Jahresvertrag erforderlich", desc: "Spendit setzt auf 12-Monats-Verträge. Für wachsende Unternehmen, die Flexibilität schätzen, sind monatlich kündbare Anbieter attraktiver." },
      { title: "Vergleichsweise wenig Features für den Preis", desc: "Ab €3,00/MA/Monat für eine reine Kartenlösung — günstigere All-in-One-Anbieter bieten mehr Benefit-Arten zum ähnlichen Preis." },
    ],
    alternatives: [1, 4, 12, 13, 5],
  },
  "jobrad": {
    providerName: "Jobrad",
    providerId: 15,
    intro: "Jobrad ist unbestrittener Marktführer im Dienstrad-Leasing mit über 50.000 Unternehmen als Kunden. Dennoch suchen manche HR-Teams nach günstigeren Konditionen, dichteren Händlernetzen in ihrer Region oder schnellerer digitaler Abwicklung.",
    reasons: [
      { title: "Marktführer-Preis", desc: "Als Marktführer kann Jobrad höhere Konditionen aufrufen. Für günstigere Leasingkonditionen lohnt der Vergleich mit Bikeleasing-Service oder Eurorad." },
      { title: "Dichteres Händlernetz bei Konkurrenz", desc: "Bikeleasing-Service bietet mit 5.000+ Fachhändlern ein noch dichteres Netz — relevant für Mitarbeitende außerhalb großer Städte." },
      { title: "Weniger digital als Newcomer", desc: "mein-dienstrad.de ist vollständig digitalisiert und ermöglicht die Einrichtung in 10 Minuten — ohne Papierkram." },
      { title: "Kein Mobilitäts-Bundle", desc: "Wer Dienstrad und weitere Mobilitätsangebote in einer Plattform bündeln will, ist bei spezialisierten Mobility-Anbietern besser aufgehoben." },
    ],
    alternatives: [17, 16, 18, 19],
  },
};

const VERSUS_PAGES = {
  "hrmony-vs-edenred": {
    aId: 1,
    bId: 3,
    intro: "Hrmony und Edenred sind beide renommierte Sachbezugsanbieter — doch ihre Philosophien unterscheiden sich grundlegend. Edenred setzt auf Bewährtheit und stationäre Präsenz, Hrmony auf moderne App-Erfahrung und Plattform-Integration.",
    criteria: [
      { label: "Preis ab", a: "€3,50 / MA / Monat", b: "€2,50 / MA / Monat", winner: "b" },
      { label: "Kündbarkeit", a: "Monatlich", b: "Jahresvertrag", winner: "a" },
      { label: "Sachbezug-Modell", a: "Digitale Gutscheine", b: "City Card + Online", winner: null },
      { label: "Essenszuschuss", a: "Ja", b: "Ja", winner: null },
      { label: "Mobilitätsbudget", a: "Ja", b: "Nein", winner: "a" },
      { label: "Mitarbeiterrabatte", a: "Ja (integriert)", b: "Nein", winner: "a" },
      { label: "HR-System-Integration", a: "Personio nativ", b: "Keine", winner: "a" },
      { label: "Stationäre Akzeptanz", a: "Partner-Netz", b: "Flächendeckend", winner: "b" },
      { label: "Marktpräsenz seit", a: "2019", b: "1962", winner: null },
    ],
    forA: "Hrmony ist die bessere Wahl für wachsende Unternehmen, die Personio nutzen, mehrere Benefit-Arten bündeln wollen und Wert auf eine moderne App-Erfahrung legen.",
    forB: "Edenred empfiehlt sich für Unternehmen, die primär Sachbezug und Essenszuschuss benötigen, günstig einsteigen wollen und stationäre Akzeptanz priorisieren.",
  },
  "egym-wellpass-vs-hansefit": {
    aId: 23,
    bId: 22,
    intro: "EGYM Wellpass und Hansefit sind die beiden etabliertesten Firmenfitness-Anbieter in Deutschland. Beide bieten breiten Zugang zu Partnerstudios — doch bei Preis, Netzwerkgröße und Vertragsbedingungen gibt es klare Unterschiede.",
    criteria: [
      { label: "Preis ab", a: "€22 / MA / Monat", b: "€18 / MA / Monat", winner: "b" },
      { label: "Partnerstudios (DE)", a: "6.000+", b: "4.000+", winner: "a" },
      { label: "Mindestlaufzeit", a: "Jahresvertrag", b: "Keine Mindestlaufzeit", winner: "b" },
      { label: "Physiotherapie", a: "Ja", b: "Nein", winner: "a" },
      { label: "Online-Kurse / Digital", a: "Ja", b: "Eingeschränkt", winner: "a" },
      { label: "Yoga & Wellness", a: "Ja", b: "Ausgewählt", winner: "a" },
      { label: "DACH-Verfügbarkeit", a: "DE + AT", b: "DE / AT / CH", winner: "b" },
      { label: "Ab Mitarbeiterzahl", a: "Alle Größen", b: "Ab 5 MA", winner: null },
    ],
    forA: "EGYM Wellpass ist ideal für Unternehmen, die das größte Netzwerk wollen, auch Physiotherapie und Wellness einschließen möchten, und remote Mitarbeitenden digitale Angebote bieten wollen.",
    forB: "Hansefit empfiehlt sich für preisbewusste Unternehmen ohne Mindestlaufzeitbindung, deren Mitarbeitende hauptsächlich klassische Fitnessstudios in Deutschland, Österreich oder der Schweiz nutzen.",
  },
  "probonio-vs-circula": {
    aId: 5,
    bId: 13,
    intro: "Probonio und Circula sind beide moderne All-in-One Benefit-Plattformen — doch mit unterschiedlichem Fokus. Probonio maximiert die Benefit-Vielfalt, Circula kombiniert Sachbezug mit vollständiger Spesenabrechnung.",
    criteria: [
      { label: "Preis ab", a: "€3,00 / MA / Monat", b: "€3,50 / MA / Monat", winner: "a" },
      { label: "Kündbarkeit", a: "Monatlich", b: "Jahresvertrag", winner: "a" },
      { label: "Sachbezug-Modell", a: "Digitale Gutscheine (~100)", b: "App + Visa-Karte (~25)", winner: "a" },
      { label: "Essenszuschuss", a: "Ja", b: "Ja", winner: null },
      { label: "Mobilitätsbudget", a: "Ja", b: "Ja", winner: null },
      { label: "Spesenabrechnung", a: "Nein", b: "Ja (integriert)", winner: "b" },
      { label: "DATEV-Integration", a: "Nein", b: "Ja", winner: "b" },
      { label: "Ab Mitarbeiterzahl", a: "Ab 1 MA", b: "Ab 10 MA", winner: "a" },
    ],
    forA: "Probonio ist die bessere Wahl für Startups und wachsende Unternehmen, die maximale Benefit-Flexibilität mit ~100 Gutschein-Partnern wollen, günstig einsteigen möchten, und keine Spesenabrechnung benötigen.",
    forB: "Circula empfiehlt sich für Unternehmen, die Sachbezug und Spesenabrechnung in einer Plattform vereinen wollen, eine Visa-Prepaid-Karte bevorzugen und DATEV-Integration für die Buchhaltung nutzen.",
  },
  "jobrad-vs-bikeleasing": {
    aId: 15,
    bId: 17,
    intro: "Jobrad und Bikeleasing-Service sind die zwei dominierenden Dienstrad-Leasing-Anbieter in Deutschland. Beide bieten breite Abdeckung und starken Service — doch bei Händlernetz, Abwicklungsgeschwindigkeit und Preis gibt es klare Unterschiede.",
    criteria: [
      { label: "Arbeitgeber-Kunden", a: "50.000+", b: "25.000+", winner: "a" },
      { label: "Fachhändler-Netz", a: "7.200+", b: "5.000+", winner: "a" },
      { label: "Abwicklungsgeschwindigkeit", a: "Standard", b: "Schnell", winner: "b" },
      { label: "E-Bike-Auswahl", a: "Sehr groß", b: "Groß", winner: "a" },
      { label: "Digitale Einrichtung", a: "Standard", b: "Vereinfacht", winner: "b" },
      { label: "Versicherung inklusive", a: "Optional", b: "Optional", winner: null },
      { label: "Marktpräsenz seit", a: "2012", b: "2015", winner: null },
    ],
    forA: "Jobrad ist die erste Wahl für Unternehmen, die auf den Marktführer mit dem größten Händlernetz setzen wollen, maximale E-Bike-Auswahl benötigen und auf die Markenbekanntheit von Jobrad Wert legen.",
    forB: "Bikeleasing-Service empfiehlt sich für Unternehmen, die schnelle Abwicklung und vereinfachte digitale Einrichtung priorisieren und in Regionen aktiv sind, die vom Bikeleasing-Händlernetz gut abgedeckt werden.",
  },
  "hansefit-vs-urban-sports-club": {
    aId: 22,
    bId: 20,
    intro: "Hansefit und Urban Sports Club sind zwei der populärsten Firmenfitness-Lösungen in Deutschland. Hansefit punktet mit fairen Preisen und klassischem Studio-Fokus, Urban Sports Club mit 50+ Sportarten und urbanem Netzwerk.",
    criteria: [
      { label: "Preis ab", a: "€18 / MA / Monat", b: "€20 / MA / Monat", winner: "a" },
      { label: "Partnerstudios (DE)", a: "4.000+", b: "10.000+ inkl. Kurse", winner: "b" },
      { label: "Mindestlaufzeit", a: "Keine Mindestlaufzeit", b: "Jahresvertrag", winner: "a" },
      { label: "Sportarten", a: "Fitness-Fokus", b: "50+ Sportarten", winner: "b" },
      { label: "Online-/App-Kurse", a: "Eingeschränkt", b: "Ja", winner: "b" },
      { label: "Kleinere Städte", a: "Gut abgedeckt", b: "Eingeschränkt", winner: "a" },
      { label: "DACH-Verfügbarkeit", a: "DE / AT / CH", b: "DE + EU-Großstädte", winner: null },
    ],
    forA: "Hansefit ist ideal für Unternehmen mit Mitarbeitenden in der Fläche, die einen flexiblen Vertrag ohne Mindestlaufzeit wollen und Wert auf klassische Fitness zu günstigem Preis legen.",
    forB: "Urban Sports Club empfiehlt sich für Unternehmen in Großstädten, deren Mitarbeitende Vielfalt schätzen (Yoga, Klettern, Schwimmen, Kampfsport), und die digitale Kursangebote für remote Teams einschließen wollen.",
  },
  "spendit-vs-givve": {
    aId: 2,
    bId: 12,
    intro: "Spendit und Givve sind beide Prepaid-Kartenlösungen für den steuerfreien Sachbezug — doch während Spendit auf regional begrenzte Visa-Karten setzt, bietet Givve eine White-Label Mastercard mit bundesweiter Akzeptanz.",
    criteria: [
      { label: "Preis ab", a: "€3,00 / MA / Monat", b: "€2,80 / MA / Monat", winner: "b" },
      { label: "Kartentyp", a: "Visa Prepaid (regional)", b: "Mastercard Prepaid (bundesweit)", winner: "b" },
      { label: "Akzeptanz", a: "60 Regionen", b: "Überall (Mastercard)", winner: "b" },
      { label: "White-Label-Option", a: "Nein", b: "Ja", winner: "b" },
      { label: "Echtzeit-Aufladung", a: "Standard", b: "Ja", winner: "b" },
      { label: "Kündbarkeit", a: "Jahresvertrag", b: "Jahresvertrag", winner: null },
      { label: "Kunden", a: "5.500+", b: "Nicht öffentlich", winner: null },
      { label: "Essenszuschuss", a: "Ja", b: "Ja", winner: null },
    ],
    forA: "Spendit ist die bessere Wahl für Unternehmen in Regionen mit gutem Spendit-Händlernetz, die auf einen etablierten Anbieter mit 5.500+ Kunden und bewährtem Support setzen wollen.",
    forB: "Givve empfiehlt sich für Unternehmen, die bundesweite Mastercard-Akzeptanz ohne regionale Einschränkungen wollen, eine White-Label-Karte im Unternehmensdesign anbieten möchten oder Echtzeit-Aufladung benötigen.",
  },
};

function slugify(name) {
  return name.toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildPath(page, tab, providerId, blogSlug) {
  if (page === "home") return "/";
  if (page === "sachbezug") return tab && tab !== "alle" ? `/vergleich/${tab}` : "/vergleich";
  if (page === "provider") {
    const p = PROVIDERS.find(p => p.id === providerId);
    return p ? `/anbieter/${slugify(p.name)}` : "/";
  }
  if (page === "blog") return blogSlug ? `/blog/${blogSlug}` : "/blog";
  if (page === "alternative") return `/anbieter/${tab}-alternative`;
  if (page === "versus") return `/vergleich/${tab}`;
  if (page === "hub") return "/vergleiche";
  if (page === "kinfo") {
    const km = { essenszuschuss: "/essenszuschuss", sachbezug: "/sachbezug", mobilitaet: "/mobilitaet", rabatte: "/mitarbeiterrabatte" };
    return km[tab] || "/";
  }
  const map = { rechner: "/rechner", steuer: "/steuer", guide: "/guide", impressum: "/impressum", datenschutz: "/datenschutz", lead: "/anfrage" };
  return map[page] || "/";
}

function parseRoute() {
  const path = window.location.pathname;
  if (path === "/" || path === "") return { page: "home", tab: "alle", providerId: null, blogSlug: null };
  if (path === "/vergleiche") return { page: "hub", tab: "alle", providerId: null, blogSlug: null };
  if (path === "/essenszuschuss") return { page: "kinfo", tab: "essenszuschuss", providerId: null, blogSlug: null };
  if (path === "/sachbezug") return { page: "kinfo", tab: "sachbezug", providerId: null, blogSlug: null };
  if (path === "/mobilitaet") return { page: "kinfo", tab: "mobilitaet", providerId: null, blogSlug: null };
  if (path === "/mitarbeiterrabatte") return { page: "kinfo", tab: "rabatte", providerId: null, blogSlug: null };
  if (path === "/vergleich") return { page: "sachbezug", tab: "alle", providerId: null, blogSlug: null };
  if (path.startsWith("/vergleich/")) {
    const tab = path.replace("/vergleich/", "").replace(/\/$/, "");
    if (tab.includes("-vs-")) return { page: "versus", tab, providerId: null, blogSlug: null };
    return { page: "sachbezug", tab, providerId: null, blogSlug: null };
  }
  if (path.startsWith("/anbieter/")) {
    const slug = path.replace("/anbieter/", "").replace(/\/$/, "");
    if (slug.endsWith("-alternative")) {
      const altSlug = slug.replace(/-alternative$/, "");
      return { page: "alternative", tab: altSlug, providerId: null, blogSlug: null };
    }
    const p = PROVIDERS.find(p => slugify(p.name) === slug);
    return { page: "provider", tab: "alle", providerId: p ? p.id : null, blogSlug: null };
  }
  if (path === "/blog") return { page: "blog", tab: "alle", providerId: null, blogSlug: null };
  if (path.startsWith("/blog/")) {
    const blogSlug = path.replace("/blog/", "").replace(/\/$/, "");
    return { page: "blog", tab: "alle", providerId: null, blogSlug };
  }
  const pageMap = { "/rechner": "rechner", "/steuer": "steuer", "/guide": "guide", "/impressum": "impressum", "/datenschutz": "datenschutz", "/anfrage": "lead" };
  return { page: pageMap[path] || "home", tab: "alle", providerId: null, blogSlug: null };
}

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} onClick={() => onChange && onChange(star)}
          style={{ fontSize: 22, cursor: onChange ? "pointer" : "default", color: star <= value ? "#F5A623" : "#D3D1C7", lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

function Check({ ok }) {
  return ok
    ? <span style={{ color: "#0F6E56", fontWeight: 600, fontSize: 18 }}>✓</span>
    : <span style={{ color: "#B4B2A9", fontSize: 18 }}>—</span>;
}

function AufwandBadge({ level }) {
  const map = {
    "Sehr niedrig": { bg: "#E1F5EE", color: "#085041" },
    "Niedrig": { bg: "#E1F5EE", color: "#085041" },
    "Mittel": { bg: "#FAEEDA", color: "#854F0B" },
    "Hoch": { bg: "#FBEAF0", color: "#993556" },
  };
  const c = map[level] || { bg: "#F5F4F0", color: "#5F5E5A" };
  return <span style={{ fontSize: 12, background: c.bg, color: c.color, padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{level}</span>;
}

function LaufzeitBadge({ laufzeit }) {
  const isFlexibel = laufzeit.toLowerCase().includes("monatlich");
  return <span style={{ fontSize: 12, background: isFlexibel ? "#E1F5EE" : "#FAEEDA", color: isFlexibel ? "#085041" : "#854F0B", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{laufzeit}</span>;
}

function ProviderNameCell({ p, navigate }) {
  return (
    <td style={{ padding: "14px 8px", minWidth: 140 }}>
      <span onClick={() => navigate("provider", null, p.id)}
        style={{ fontWeight: 600, color: "#1a1a18", textDecoration: "none", fontSize: 14, cursor: "pointer" }}
        onMouseOver={e => e.currentTarget.style.color = "#0F6E56"}
        onMouseOut={e => e.currentTarget.style.color = "#1a1a18"}>
        {p.name} →
      </span>
      <div style={{ fontSize: 12, color: "#888780", marginTop: 2 }}>{p.employees}</div>
    </td>
  );
}

function CategoryTable({ children, headers }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #E8E6DF" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ textAlign: i === 0 ? "left" : "left", padding: "10px 8px", color: "#888780", fontWeight: 500, fontSize: 12, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function AnnouncementBanner({ navigate }) {
  useEffect(() => {
    if (!document.getElementById("ticker-style")) {
      const s = document.createElement("style");
      s.id = "ticker-style";
      s.textContent = "@keyframes ticker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }";
      document.head.appendChild(s);
    }
  }, []);
  const items = [
    "🆕  3 neue Kategorien im Vergleich: Firmenfitness & Mental Health",
    "Urban Sports Club · EGYM Wellpass · Nilo Health · Likeminded · OpenUp jetzt dabei",
    "26 Anbieter in 6 Kategorien verglichen · April 2026",
    "Kostenloses exklusives Angebot anfordern →",
  ];
  const text = items.join("   ·   ");
  return (
    <div style={{ background: "#0F6E56", color: "#fff", overflow: "hidden", height: 34, display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("lead")}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 40s linear infinite" }}>
        <span style={{ padding: "0 40px", fontSize: 13, fontWeight: 500 }}>{text}</span>
        <span style={{ padding: "0 40px", fontSize: 13, fontWeight: 500 }}>{text}</span>
      </div>
    </div>
  );
}

function Header({ page, navigate }) {
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 680);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 680);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const navItems = [
    { key: "sachbezug", label: "Benefits-Vergleich", short: "Vergleich" },
    { key: "rechner", label: "Steuerrechner", short: "Rechner" },
    { key: "home", label: "Alle Kategorien", short: "Kategorien" },
  ];

  return (
    <header style={{ borderBottom: "1px solid #E8E6DF", background: "#FAFAF7", padding: "0 16px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }} onClick={() => navigate("home")}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Instrument Serif', Georgia, serif" }}>B</div>
          {!mobile && <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400, color: "#1a1a18", letterSpacing: -0.5 }}>benefitcheck</span>}
          {!mobile && <span style={{ fontSize: 12, color: "#0F6E56", fontWeight: 600, marginLeft: -4 }}>.net</span>}
        </div>
        <nav style={{ display: "flex", gap: mobile ? 16 : 28, fontSize: mobile ? 13 : 14 }}>
          {navItems.map(n => (
            <span key={n.key} onClick={() => navigate(n.key)} style={{ cursor: "pointer", color: page === n.key ? "#0F6E56" : "#5F5E5A", fontWeight: page === n.key ? 600 : 400, borderBottom: page === n.key ? "2px solid #0F6E56" : "2px solid transparent", paddingBottom: 4, whiteSpace: "nowrap" }}>{mobile ? n.short : n.label}</span>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <div>
      <section style={{ background: "#FAFAF7", overflow: "hidden" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "stretch", minHeight: 520 }}>
          {/* Left: Text */}
          <div style={{ flex: "0 0 55%", padding: "80px 48px 80px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "inline-block", background: "#E1F5EE", color: "#085041", fontSize: 13, fontWeight: 600, padding: "5px 14px", borderRadius: 20, marginBottom: 24, alignSelf: "flex-start" }}>Transparent · DACH-fokussiert · Im Detail</div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 46, fontWeight: 400, lineHeight: 1.15, color: "#1a1a18", margin: "0 0 20px", letterSpacing: -1 }}>
              Der Vergleich für<br />Mitarbeiter-Benefits
            </h1>
            <p style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 480 }}>
              Finde die passende Benefits-Plattform für dein Unternehmen. Sachbezug, Essenszuschuss, Mobilität — alle Anbieter im Vergleich, steuerliche Einordnung.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => navigate("sachbezug")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Benefitsanbieter vergleichen</button>
              <button onClick={() => navigate("rechner")} style={{ background: "#fff", color: "#1a1a18", border: "1px solid #D3D1C7", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>Steuerrechner starten</button>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                <button onClick={() => { window.gtag?.("event", "lead_funnel_start", { method: "hero_cta" }); navigate("lead"); }} style={{ background: "#fff", color: "#0F6E56", border: "2px solid #0F6E56", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Kostenloses exklusives Angebot →</button>
                <span style={{ fontSize: 12, color: "#B4B2A9", paddingLeft: 4 }}>Unverbindliche Anfrage</span>
              </div>
            </div>
          </div>
          {/* Right: Image */}
          <div style={{ flex: "0 0 45%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #FAFAF7 0%, transparent 18%)", zIndex: 1 }} />
            <img
              src="/hero.jpg"
              alt="HR Manager"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px", letterSpacing: -0.5 }}>Beliebte Benefit-Kategorien</h2>
        <p style={{ color: "#5F5E5A", fontSize: 15, margin: "0 0 32px" }}>Vergleiche Anbieter in den gefragtesten Kategorien für steuerfreie Mitarbeiter-Benefits.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { title: "Mitarbeiterrabatte", desc: "Exklusive Sonderkonditionen bei Top-Marken — kostenlos für Arbeitgeber. Von Lifestyle bis Nachhaltigkeit.", count: "5 Anbieter", tab: "rabatte", color: "#FAEEDA", accent: "#854F0B", isNew: false, kinfo: "rabatte" },
            { title: "Sachbezug (€50/Monat)", desc: "Steuerfreie Gutscheine & Karten — der beliebteste Benefit in Deutschland. 11 Anbieter im Vergleich.", count: "11 Anbieter", tab: "sachbezug", color: "#E1F5EE", accent: "#0F6E56", isNew: false, kinfo: "sachbezug" },
            { title: "Essenszuschuss", desc: "Bis zu €7,67 pro Arbeitstag steuerbegünstigt. Digital oder per Karte.", count: "10 Anbieter", tab: "essen", color: "#EEEDFE", accent: "#534AB7", isNew: false, kinfo: "essenszuschuss" },
            { title: "Mobilität & Jobrad", desc: "Deutschlandticket, Dienstrad-Leasing und flexible Mobilitätsbudgets.", count: "5 Anbieter", tab: "jobrad", color: "#E6F1FB", accent: "#185FA5", isNew: false, kinfo: "mobilitaet" },
            { title: "Firmenfitness", desc: "Urban Sports Club, Wellhub, Hansefit, EGYM Wellpass — Fitness als steuerfreier Benefit.", count: "4 Anbieter", tab: "fitness", color: "#FAECE7", accent: "#993C1D", isNew: true },
            { title: "Mental Health", desc: "Nilo Health, Likeminded, OpenUp — psychologische Beratung & Coaching als Benefit.", count: "3 Anbieter", tab: "mental", color: "#FBEAF0", accent: "#993556", isNew: true },
          ].map((cat, i) => (
            <div key={i} onClick={() => navigate("sachbezug", cat.tab)} style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 12, padding: "24px", cursor: "pointer", transition: "border-color 0.2s", position: "relative" }}
              onMouseOver={e => e.currentTarget.style.borderColor = cat.accent}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                <div style={{ background: cat.color, color: cat.accent, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 6 }}>{cat.count}</div>
                {cat.isNew && <div style={{ background: "#0F6E56", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: 0.3 }}>NEU</div>}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>{cat.title}</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.5, margin: cat.kinfo ? "0 0 10px" : 0 }}>{cat.desc}</p>
              {cat.kinfo && (
                <span onClick={e => { e.stopPropagation(); navigate("kinfo", cat.kinfo); }}
                  style={{ fontSize: 12, color: "#0F6E56", fontWeight: 500, cursor: "pointer" }}>
                  Kategorie erklärt →
                </span>
              )}
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

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px", letterSpacing: -0.5 }}>Ratgeber & Blog</h2>
            <p style={{ color: "#5F5E5A", fontSize: 15, margin: 0 }}>Praxiswissen rund um steuerfreie Benefits, Anbieter und HR-Tipps.</p>
          </div>
          <span onClick={() => navigate("blog")} style={{ fontSize: 13, color: "#0F6E56", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Alle Artikel →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {PUBLISHED_POSTS.map(post => (
            <div key={post.id} onClick={() => navigate("blog", null, null, post.slug)}
              style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 14, overflow: "hidden", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <div style={{ height: 110, overflow: "hidden", position: "relative" }}>
                {getBlogCardSvg(post.id)}
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, background: "#E1F5EE", color: "#085041", padding: "2px 8px", borderRadius: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{post.category}</span>
                  <span style={{ fontSize: 12, color: "#B4B2A9" }}>{post.readTime} Lesezeit</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px", lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: "#888780", margin: "0 0 12px", lineHeight: 1.5 }}>{post.excerpt}</p>
                <span style={{ fontSize: 12, color: "#B4B2A9" }}>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 40px" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, margin: "0 0 8px" }}>Häufige Fragen zu Mitarbeiter-Benefits</h2>
        <p style={{ color: "#5F5E5A", fontSize: 14, margin: "0 0 24px" }}>Was HR-Manager am häufigsten wissen wollen.</p>
        {[
          { q: "Was ist der 50-Euro-Sachbezug?", a: "Arbeitgeber dürfen Mitarbeitenden monatlich bis zu 50 Euro als Sachbezug steuerfrei gewähren. Das können Gutscheinkarten, regionale City-Cards oder digitale Gutscheine sein. Der Sachbezug muss zusätzlich zum Gehalt gewährt werden — eine Gehaltsumwandlung ist nicht erlaubt." },
          { q: "Welche Benefits sind 2026 steuerfrei?", a: "Die wichtigsten steuerfreien Benefits sind: Sachbezug (€50/Monat), Jobticket/ÖPNV-Zuschuss (steuerfrei gem. §3 Nr. 15 EStG), Anlass-Sachgeschenke (€60 pro Anlass), und der Essenszuschuss (bis €7,67/Tag bei 25% Pauschalsteuer auf den AG-Anteil über €3,10)." },
          { q: "Was kostet eine Benefits-Plattform?", a: "Die Kosten variieren von €2–8 pro Mitarbeitenden pro Monat. Einige Anbieter wie Belonio starten ab €29/MA/Jahr. Viele bieten kostenlose Testphasen an. Die Einrichtung ist oft kostenlos oder liegt bei €200–500 einmalig." },
          { q: "Was ist der Unterschied zwischen Sachbezug und Gehaltserhöhung?", a: "Eine Gehaltserhöhung von €50 brutto kommt beim Mitarbeitenden nach Steuern und Sozialabgaben nur als ca. €26–28 netto an. Der Sachbezug von €50 ist komplett steuerfrei — der Mitarbeitende erhält also den vollen Wert. Gleichzeitig spart der Arbeitgeber Lohnnebenkosten, da keine Sozialabgaben auf den Sachbezug anfallen." },
          { q: "Kann ich mehrere Benefits gleichzeitig anbieten?", a: "Ja — und das ist sogar empfehlenswert. Sachbezug (€50/Monat), Essenszuschuss (bis €7,67/Tag) und Mobilität (z.B. Deutschlandticket) können gleichzeitig und unabhängig voneinander genutzt werden, da sie auf unterschiedlichen Rechtsgrundlagen basieren. Alle drei zusammen ergeben einen Nettovorteil von über €2.000 pro Mitarbeiter und Jahr." },
          { q: "Was sind die ZAG-Kriterien und warum sind sie wichtig?", a: "Seit 2022 müssen Sachbezugsgutscheine und -karten die Kriterien des Zahlungsdiensteaufsichtsgesetzes (ZAG) erfüllen, um steuerfrei zu sein. Konkret bedeutet das: Die Karte oder der Gutschein darf nur bei bestimmten Händlern oder in einer bestimmten Region eingesetzt werden — keine beliebige Barabhebung, kein Versenden von Geld. Alle seriösen Anbieter sind ZAG-konform." },
          { q: "Darf der Sachbezug durch Gehaltsumwandlung finanziert werden?", a: "Nein — das ist ausdrücklich verboten (§8 Abs. 2 EStG). Der Sachbezug muss zusätzlich zum ohnehin geschuldeten Arbeitslohn gewährt werden. Eine Gehaltsumwandlung würde die Steuerfreiheit aufheben und kann zu Nachzahlungen führen. Dies wird von Betriebsprüfern regelmäßig kontrolliert." },
          { q: "Wie funktioniert das Deutschlandticket als Arbeitgeberbenefit?", a: "Arbeitgeber können das Deutschlandticket (aktuell €58/Monat) komplett steuerfrei als Zuschuss zum ÖPNV gewähren (§3 Nr. 15 EStG). Es gibt keine Betragsgrenze — der gesamte Zuschuss ist lohnsteuer- und sozialabgabenfrei, solange er für öffentliche Verkehrsmittel genutzt wird. Viele Benefits-Plattformen integrieren das Deutschlandticket direkt." },
          { q: "Was versteht man unter einem Cafeteria-Modell?", a: "Beim Cafeteria-Modell stellt der Arbeitgeber jedem Mitarbeitenden ein fixes monatliches Benefits-Budget zur Verfügung (z.B. €150), das die Mitarbeitenden selbst auf verschiedene Benefits aufteilen können — Sachbezug, Essen, Mobilität oder Fitness. Das erhöht die Zufriedenheit, da jeder seine Benefits individuell wählt. Anbieter wie Billyard und Hrmony bieten dieses Modell an." },
          { q: "Welche Vorteile hat Jobrad / Dienstrad-Leasing?", a: "Beim Dienstrad-Leasing least der Arbeitgeber ein Fahrrad und überlässt es dem Mitarbeitenden zur privaten Nutzung. Der geldwerte Vorteil wird pauschal mit 0,25% des Listenpreises pro Monat versteuert — deutlich günstiger als ein privater Kauf. Für E-Bikes gilt die gleiche Regelung. Gleichzeitig spart der Arbeitgeber Sozialabgaben. Anbieter wie Belonio integrieren Jobrad direkt." },
          { q: "Kann der Sachbezug auch für Minijobber und Teilzeitkräfte genutzt werden?", a: "Ja — die €50-Freigrenze gilt unabhängig von der Arbeitszeit und dem Beschäftigungsmodell. Auch Minijobber, Werkstudenten und Teilzeitkräfte können den vollen Sachbezug von €50/Monat steuerfrei erhalten. Wichtig: Die Freigrenze gilt pro Person und Monat, nicht pro Arbeitsstunde." },
          { q: "Was passiert mit nicht genutztem Sachbezugsguthaben am Monatsende?", a: "Das hängt vom Anbieter ab. Bei den meisten Plattformen verfällt ungenutztes Guthaben am Monatsende — es kann nicht in den Folgemonat übertragen werden, da sonst die Zufluss-Grundsätze des Steuerrechts verletzt würden. Manche Anbieter ermöglichen eine Übertragung innerhalb desselben Monats auf andere Kategorien. Dieses Detail sollte beim Anbietervergleich beachtet werden." },
          { q: "Wie lange dauert die Einführung einer Benefits-Plattform?", a: "Die meisten Plattformen sind innerhalb von 1–2 Wochen einsatzbereit. Die Einrichtung umfasst: Vertragsabschluss (1–3 Tage), Datenmigration der Mitarbeiterliste (1–2 Tage) und optionale HR-System-Integration (3–7 Tage). Einfache Lösungen wie Probonio oder Benefits.me können sogar innerhalb weniger Stunden live gehen." },
          { q: "Welche Benefits sind bei Mitarbeitenden am beliebtesten?", a: "Laut aktuellen Studien sind die beliebtesten Mitarbeiter-Benefits: 1. Sachbezug/Gutscheinkarte (65%), 2. Essenszuschuss (58%), 3. Homeoffice-Ausstattung (54%), 4. Deutschlandticket/ÖPNV-Zuschuss (49%), 5. Mitarbeiterrabatte (44%). Besonders bei jüngeren Mitarbeitenden (Gen Z) gewinnen nachhaltige Benefits und Mobilitätslösungen an Bedeutung." },
          { q: "Sind Benefits-Plattformen auch für kleine Unternehmen geeignet?", a: "Ja — viele Anbieter haben ihr Angebot explizit auf KMU ausgerichtet. Probonio startet ab 1 Mitarbeitenden, Belonio und Guudcard ab 5. Die Einrichtungskosten sind meist überschaubar, und der administrative Aufwand ist durch Automatisierung minimal. Selbst für Teams mit 5–20 Personen lohnt sich der Aufwand, da die steuerliche Ersparnis pro Mitarbeitenden identisch ist wie bei großen Unternehmen." },
          { q: "Was ist der Unterschied zwischen Sachbezugskarte und digitalem Gutschein?", a: "Eine Sachbezugskarte (z.B. Visa Prepaid) wird monatlich aufgeladen und kann überall dort eingesetzt werden, wo der Kartentyp akzeptiert wird — innerhalb der ZAG-Einschränkungen. Digitale Gutscheine sind an bestimmte Partner (z.B. Amazon, REWE, Zalando) gebunden und werden per App oder E-Mail ausgegeben. Karten sind flexibler, Gutscheine oft zielgenauer. Beide sind steuerrechtlich gleichwertig." },
          { q: "Wie funktioniert der Anlass-Sachbezug (60-Euro-Regel)?", a: "Zusätzlich zum monatlichen Sachbezug (€50) dürfen Arbeitgeber zu persönlichen Anlässen bis zu €60 steuerfrei schenken — z.B. zum Geburtstag, zur Hochzeit, zur Geburt eines Kindes oder zum Dienstjubiläum. Dieser Betrag ist unabhängig von der €50-Freigrenze und kann auch als Gutschein gewährt werden. Pro Anlass und Mitarbeiter ist maximal ein Geschenk möglich." },
          { q: "Müssen Benefits in der Lohnabrechnung ausgewiesen werden?", a: "Steuerfreie Sachbezüge bis €50 müssen zwar nicht versteuert werden, sollten aber im Lohnkonto dokumentiert werden — insbesondere für Betriebsprüfungen. Gute Benefits-Plattformen liefern automatische DATEV-Exports oder Lohnabrechnungsdaten, die direkt an die Lohnbuchhaltung übergeben werden können. Das reduziert den manuellen Aufwand erheblich." },
          { q: "Wie hoch ist die Steuerersparnis durch Benefits konkret?", a: "Rechenbeispiel: Statt einer Brutto-Gehaltserhöhung von €2.885 können Mitarbeitende durch die Kombination aus Sachbezug (€600/Jahr), Essenszuschuss (€1.380/Jahr) und Deutschlandticket (€696/Jahr) den gleichen Nettovorteil von ca. €2.676 erzielen. Die Ersparnis gegenüber der Gehaltserhöhung beträgt ~€209/Jahr pro Mitarbeiter — für Arbeitgeber fallen zudem keine Sozialversicherungsbeiträge an." },
          { q: "Was passiert mit Benefits, wenn ein Mitarbeiter das Unternehmen verlässt?", a: "Bei Kündigung oder Austritt wird der Zugang zur Benefits-Plattform in der Regel zum letzten Arbeitstag deaktiviert. Noch vorhandenes Guthaben auf Sachbezugskarten kann in der Übergangszeit häufig noch aufgebraucht werden — je nach Anbieter und Vertrag. Einige Anbieter berechnen eine anteilige Monatsgebühr, andere rechnen tagesgenau ab. Diese Details sollten im Anbietervertrag geklärt werden." },
          { q: "Können Benefits auch remote-Mitarbeitenden und Freelancern gewährt werden?", a: "Steuerfreie Sachbezüge können nur an sozialversicherungspflichtige Arbeitnehmer gewährt werden — nicht an Freelancer oder Selbstständige. Remote-Mitarbeitende mit festem Arbeitsvertrag können alle Benefits wie Präsenzmitarbeitende erhalten. Für remote Teams bieten sich besonders digitale Gutscheine und das Deutschlandticket an, da keine physische Karte ausgehändigt werden muss." },
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

function SachbezugPage({ navigate, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || "alle");
  const [filterType, setFilterType] = useState("all");

  const tabs = [
    { key: "alle", label: "Alle Anbieter" },
    { key: "rabatte", label: "Mitarbeiterrabatte" },
    { key: "sachbezug", label: "Sachbezug (€50)" },
    { key: "essen", label: "Essenszuschuss" },
    { key: "mobil", label: "Mobilität" },
    { key: "jobrad", label: "Jobrad / Dienstrad" },
    { key: "fitness", label: "Firmenfitness" },
    { key: "mental", label: "Mental Health" },
  ];

  const filtered = PROVIDERS
    .filter(p => filterType === "all" || p.type === filterType)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.priceFrom - b.priceFrom;
    });

  const tdStyle = { padding: "14px 8px", fontSize: 13, color: "#5F5E5A", verticalAlign: "top" };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Anbieter-Vergleich</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px", letterSpacing: -0.5 }}>Mitarbeiter-Benefits Anbieter Vergleich 2026</h1>
        <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 4px", maxWidth: 680 }}>
          Die besten Anbieter für Sachbezug, Essenszuschuss, Mitarbeiterrabatte und mehr — im unabhängigen Vergleich.
        </p>
        <p style={{ fontSize: 13, color: "#B4B2A9", margin: "8px 0 0" }}>Letzte Aktualisierung: April 2026 · {PROVIDERS.length} Anbieter verglichen</p>
      </div>

      {/* Tab navigation */}
      <div style={{ display: "flex", borderBottom: "2px solid #E8E6DF", marginBottom: 28, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            background: "none", border: "none",
            padding: "10px 20px",
            fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400,
            color: activeTab === tab.key ? "#0F6E56" : "#5F5E5A",
            borderBottom: `2px solid ${activeTab === tab.key ? "#0F6E56" : "transparent"}`,
            marginBottom: -2, cursor: "pointer", whiteSpace: "nowrap",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* ── ALLE ANBIETER ── */}
      {activeTab === "alle" && (
        <>
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
                  <th style={{ textAlign: "left", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Differenzierung</th>
                  <th style={{ textAlign: "right", padding: "12px 8px", color: "#888780", fontWeight: 500, fontSize: 12 }}>Ab Preis</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                    onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                    onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "16px 8px" }}>
                      <div style={{ fontWeight: 600, color: "#1a1a18" }}>
                        <span onClick={() => navigate("provider", null, p.id)} style={{ color: "#1a1a18", textDecoration: "none", cursor: "pointer" }} onMouseOver={e => e.currentTarget.style.color = "#0F6E56"} onMouseOut={e => e.currentTarget.style.color = "#1a1a18"}>{p.name}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#888780", marginTop: 2 }}>{p.hq} · Seit {p.founded}</div>
                    </td>
                    <td style={{ textAlign: "center", padding: "16px 8px" }}>
                      <span style={{ fontSize: 12, background: p.type === "All-in-One" ? "#EEEDFE" : p.type === "Rabattportal" ? "#FAEEDA" : "#F5F4F0", color: p.type === "All-in-One" ? "#534AB7" : p.type === "Rabattportal" ? "#854F0B" : "#5F5E5A", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{p.type}</span>
                    </td>
                    <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.sachbezug} /></td>
                    <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.essen} /></td>
                    <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.mobil} /></td>
                    <td style={{ textAlign: "center", padding: "16px 8px" }}><Check ok={p.rabatte} /></td>
                    <td style={{ padding: "16px 8px", fontSize: 13, color: "#5F5E5A", fontStyle: "italic", maxWidth: 240 }}>{p.differenzierung}</td>
                    <td style={{ textAlign: "right", padding: "16px 8px", fontWeight: 600, color: "#1a1a18" }}>
                      {p.priceFrom === 0 ? <span style={{ color: "#0F6E56" }}>Kostenlos</span> : <span>€{p.priceFrom.toFixed(2)}<span style={{ fontWeight: 400, color: "#888780", fontSize: 11 }}>/MA/Mon.</span></span>}
                    </td>
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
                      <h3 style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "0 0 2px" }}>
                        <span onClick={() => navigate("provider", null, p.id)} style={{ color: "#1a1a18", cursor: "pointer" }} onMouseOver={e => e.currentTarget.style.color = "#0F6E56"} onMouseOut={e => e.currentTarget.style.color = "#1a1a18"}>{p.name} →</span>
                      </h3>
                      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 6px" }}>{p.type} · {p.hq} · Gegründet {p.founded} · {p.employees}</p>
                      <p style={{ fontSize: 13, color: "#0F6E56", fontStyle: "italic", margin: "0 0 10px" }}>{p.differenzierung}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                        {p.highlights.map((h, i) => (
                          <span key={i} style={{ fontSize: 12, background: "#F5F4F0", color: "#5F5E5A", padding: "3px 10px", borderRadius: 6 }}>{h}</span>
                        ))}
                      </div>
                      {p.sachbezugModel !== "—" && (
                        <p style={{ fontSize: 13, color: "#5F5E5A", margin: 0 }}>
                          Sachbezug-Modell: <strong style={{ color: "#1a1a18" }}>{p.sachbezugModel}</strong>
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: "right", minWidth: 140 }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: "#0F6E56" }}>{p.priceFrom === 0 ? "Kostenlos" : `ab €${p.priceFrom.toFixed(2)}`}</div>
                      <p style={{ fontSize: 11, color: "#888780", margin: "2px 0 0" }}>{p.priceFrom === 0 ? "für Arbeitgeber" : "pro MA/Monat"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── SACHBEZUG (€50) ── */}
      {activeTab === "sachbezug" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 12px", maxWidth: 680 }}>
            Vergleich der Sachbezug-Anbieter nach Modell, Akzeptanzstellen, Abdeckung, Mindestlaufzeit und HR-Aufwand.
          </p>
          <p style={{ fontSize: 13, margin: "0 0 20px" }}>
            <span onClick={() => navigate("kinfo", "sachbezug")} style={{ color: "#0F6E56", cursor: "pointer", fontWeight: 500 }}>
              § 8 EStG Sachbezug erklärt: Regeln, Limits & Modelle →
            </span>
          </p>
          <CategoryTable headers={["Anbieter", "Modell", "Akzeptanz", "Abdeckung", "Mindestlaufzeit", "HR-Aufwand", "Ab Preis"]}>
            {PROVIDERS.filter(p => p.sachbezug).map(p => {
              const d = SACHBEZUG_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ ...{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" } }}>{d.modell}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.akzeptanz}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13 }}>
                    <span style={{ fontSize: 12, background: d.scope === "National" ? "#E6F1FB" : "#F5F4F0", color: d.scope === "National" ? "#185FA5" : "#5F5E5A", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{d.scope}</span>
                  </td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                  <td style={{ padding: "14px 8px" }}><AufwandBadge level={d.hrAufwand} /></td>
                  <td style={{ padding: "14px 8px", fontWeight: 600, color: "#1a1a18", fontSize: 13 }}>
                    {p.priceFrom === 0 ? <span style={{ color: "#0F6E56" }}>Kostenlos</span> : `€${p.priceFrom.toFixed(2)}/MA`}
                  </td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── ESSENSZUSCHUSS ── */}
      {activeTab === "essen" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 12px", maxWidth: 680 }}>
            Vergleich der Essenszuschuss-Anbieter nach Preis pro Nutzer, Einreichungsmodell, Belegprüfung, HR-Aufwand und Vertragslaufzeit.
          </p>
          <p style={{ fontSize: 13, margin: "0 0 20px" }}>
            <span onClick={() => navigate("kinfo", "essenszuschuss")} style={{ color: "#0F6E56", cursor: "pointer", fontWeight: 500 }}>
              Essenszuschuss erklärt: § 40 EStG, Freibetrag & steuerfreie Modelle →
            </span>
          </p>
          <CategoryTable headers={["Anbieter", "Preis/Nutzer", "Einreichung", "Belegprüfung", "HR-Aufwand", "Mindestlaufzeit"]}>
            {PROVIDERS.filter(p => p.essen).map(p => {
              const d = ESSEN_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>{d.preisProNutzer}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.einreichung}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <span style={{ fontSize: 12, background: d.belegpruefung === "Manuell geprüft" ? "#FAEEDA" : "#E1F5EE", color: d.belegpruefung === "Manuell geprüft" ? "#854F0B" : "#085041", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{d.belegpruefung}</span>
                  </td>
                  <td style={{ padding: "14px 8px" }}><AufwandBadge level={d.hrAufwand} /></td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── MITARBEITERRABATTE ── */}
      {activeTab === "rabatte" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 12px", maxWidth: 680 }}>
            Vergleich der Rabattportal-Anbieter nach Markennetzwerk, maximalem Rabatt, Portal-Typ, Kosten für den Arbeitgeber und Mindestgröße.
          </p>
          <p style={{ fontSize: 13, margin: "0 0 20px" }}>
            <span onClick={() => navigate("kinfo", "rabatte")} style={{ color: "#0F6E56", cursor: "pointer", fontWeight: 500 }}>
              Mitarbeiterrabatte erklärt: Modelle, Steuerfreiheit & Top-Anbieter →
            </span>
          </p>
          <CategoryTable headers={["Anbieter", "Marken / Partner", "Markenportfolio (Beispiele)", "Max. Rabatt", "Portal-Typ", "Preis für AG", "Mindestgröße"]}>
            {PROVIDERS.filter(p => p.rabatte).map(p => {
              const d = RABATTE_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.marken}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {d.markenbeispiele ? d.markenbeispiele.map((m, i) => (
                        <span key={i} style={{ fontSize: 11, background: "#F5F4F0", color: "#5F5E5A", padding: "2px 7px", borderRadius: 4, fontWeight: 500, whiteSpace: "nowrap" }}>{m}</span>
                      )) : <span style={{ fontSize: 13, color: "#B4B2A9" }}>—</span>}
                    </div>
                  </td>
                  <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: d.maxRabatt === "Bis 45%" ? "#0F6E56" : "#1a1a18" }}>{d.maxRabatt}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.portal}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: d.preisAG === "Kostenlos" ? "#0F6E56" : "#1a1a18" }}>{d.preisAG}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.mindest}</td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── MOBILITÄT ── */}
      {activeTab === "mobil" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 12px", maxWidth: 680 }}>
            Vergleich der Mobilitäts-Anbieter nach enthaltenen Leistungen, Vertragslaufzeit und Integration.
          </p>
          <p style={{ fontSize: 13, margin: "0 0 20px" }}>
            <span onClick={() => navigate("kinfo", "mobilitaet")} style={{ color: "#0F6E56", cursor: "pointer", fontWeight: 500 }}>
              Mobilität als Benefit erklärt: § 3 Nr. 15 EStG, Jobrad & Deutschlandticket →
            </span>
          </p>
          <CategoryTable headers={["Anbieter", "Deutschlandticket", "Jobrad", "Mobilitätsbudget", "Mindestlaufzeit", "Integration"]}>
            {PROVIDERS.filter(p => p.mobil).map(p => {
              const d = MOBIL_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", textAlign: "left" }}><Check ok={d.deutschlandticket} /></td>
                  <td style={{ padding: "14px 8px", textAlign: "left" }}><Check ok={d.jobrad} /></td>
                  <td style={{ padding: "14px 8px", textAlign: "left" }}><Check ok={d.budget} /></td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.integration}</td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── JOBRAD / DIENSTRAD ── */}
      {activeTab === "jobrad" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 20px", maxWidth: 680 }}>
            Vergleich der Bike-Leasing-Anbieter nach Leasingmodell, Maximalwert, Versicherung und Steuervorteil. Alle Anbieter nutzen die 0,25%-Regelung — kostenlos für den Arbeitgeber.
          </p>
          <CategoryTable headers={["Anbieter", "Modell", "Max. Fahrrадwert", "Laufzeit", "Versicherung", "Steuervorteil"]}>
            {PROVIDERS.filter(p => p.jobrad).map(p => {
              const d = JOBRAD_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.leasingModell}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>{d.maxWert}</td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.versicherung}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <span style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{d.steuerVorteil}</span>
                  </td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── FIRMENFITNESS ── */}
      {activeTab === "fitness" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 20px", maxWidth: 680 }}>
            Vergleich der Firmenfitness-Anbieter nach Netzwerkgröße, Sportangebot, Preismodell und Vertragslaufzeit.
          </p>
          <CategoryTable headers={["Anbieter", "Netzwerk", "Studios / Städte", "Modell", "Kategorien", "Mindestlaufzeit"]}>
            {PROVIDERS.filter(p => p.fitness).map(p => {
              const d = FITNESS_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.netzwerk}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>{d.studios}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.modell}</td>
                  <td style={{ padding: "14px 8px", fontSize: 12, color: "#5F5E5A" }}>{d.kategorien}</td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}

      {/* ── MENTAL HEALTH ── */}
      {activeTab === "mental" && (
        <div>
          <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 20px", maxWidth: 680 }}>
            Vergleich der Mental-Health-Anbieter nach Angebotsform, Zugangsgeschwindigkeit, Sitzungsmodell und Sprachen.
          </p>
          <CategoryTable headers={["Anbieter", "Angebot", "Erstzugang", "Sitzungen", "Sprachen", "Mindestlaufzeit"]}>
            {PROVIDERS.filter(p => p.mental).map(p => {
              const d = MENTAL_DETAILS[p.id];
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0EFEB" }}
                  onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <ProviderNameCell p={p} navigate={navigate} />
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.angebot}</td>
                  <td style={{ padding: "14px 8px" }}>
                    <span style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>{d.zugang}</span>
                  </td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.sitzungen}</td>
                  <td style={{ padding: "14px 8px", fontSize: 13, color: "#5F5E5A" }}>{d.sprachen}</td>
                  <td style={{ padding: "14px 8px" }}><LaufzeitBadge laufzeit={d.laufzeit} /></td>
                </tr>
              );
            })}
          </CategoryTable>
        </div>
      )}
    </div>
  );
}

function ProviderPage({ providerId, navigate }) {
  const provider = PROVIDERS.find(p => p.id === providerId);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", rating: 5, text: "" });
  const [step, setStep] = useState("form"); // form | verify | success
  const [verifyInput, setVerifyInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!provider) return;
    fetch(`/api/get-reviews?providerId=${provider.id}`)
      .then(r => r.json())
      .then(d => setReviews(d.reviews || []))
      .catch(() => {});
  }, [provider?.id]);

  if (!provider) return null;

  const sbDetail = SACHBEZUG_DETAILS[provider.id];
  const essenDetail = ESSEN_DETAILS[provider.id];
  const mobilDetail = MOBIL_DETAILS[provider.id];
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, providerId: provider.id }),
      });
      const data = await res.json();
      data.success ? setStep("verify") : setError(data.message || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    setSubmitting(false);
  }

  async function handleVerify(e) {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/verify-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code: verifyInput }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
        fetch(`/api/get-reviews?providerId=${provider.id}`).then(r => r.json()).then(d => setReviews(d.reviews || []));
      } else { setError(data.message); }
    } catch { setError("Verbindungsfehler"); }
    setSubmitting(false);
  }

  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #D3D1C7", fontSize: 14, marginBottom: 12, boxSizing: "border-box", fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 28px" }}>
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("sachbezug")}>Anbieter-Vergleich</span> / {provider.name}
      </p>

      {/* Header: Info + Screenshot */}
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 40, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 380px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, background: provider.type === "All-in-One" ? "#EEEDFE" : provider.type === "Rabattportal" ? "#FAEEDA" : "#F5F4F0", color: provider.type === "All-in-One" ? "#534AB7" : provider.type === "Rabattportal" ? "#854F0B" : "#5F5E5A", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>{provider.type}</span>
            {provider.featured && <span style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>Empfohlen</span>}
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 40, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px", letterSpacing: -0.5 }}>{provider.name}</h1>
          <p style={{ fontSize: 15, color: "#0F6E56", fontStyle: "italic", margin: "0 0 10px" }}>{provider.differenzierung}</p>
          <p style={{ fontSize: 13, color: "#888780", margin: "0 0 16px" }}>Gegründet {provider.founded} · {provider.hq} · {provider.employees}</p>
          {avgRating && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <StarRating value={Math.round(avgRating)} />
              <span style={{ fontSize: 13, color: "#5F5E5A" }}>{avgRating.toFixed(1)} ({reviews.length} Bewertung{reviews.length !== 1 ? "en" : ""})</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {provider.highlights.map((h, i) => <span key={i} style={{ fontSize: 12, background: "#F5F4F0", color: "#5F5E5A", padding: "4px 12px", borderRadius: 6 }}>{h}</span>)}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer"
              style={{ background: "#0F6E56", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Website besuchen ↗</a>
            <button onClick={() => navigate("sachbezug")}
              style={{ background: "#fff", color: "#5F5E5A", border: "1px solid #D3D1C7", padding: "10px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>← Zurück</button>
          </div>
        </div>

        {/* Website Screenshot */}
        <div style={{ flex: "0 0 400px", borderRadius: 12, overflow: "hidden", border: "1px solid #E8E6DF", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ background: "#F5F4F0", padding: "8px 12px", display: "flex", gap: 5, alignItems: "center" }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            <span style={{ fontSize: 11, color: "#888780", marginLeft: 8 }}>{provider.website}</span>
          </div>
          <img src={`https://image.thum.io/get/width/760/crop/480/noanimate/https://${provider.website}`}
            alt={`${provider.name} Website`} style={{ width: "100%", display: "block" }}
            onError={e => { e.target.parentElement.style.display = "none"; }} />
        </div>
      </div>

      {/* Feature-Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 32 }}>
        {[{label:"Sachbezug (€50)",ok:provider.sachbezug},{label:"Essenszuschuss",ok:provider.essen},{label:"Mobilität",ok:provider.mobil},{label:"Mitarbeiterrabatte",ok:provider.rabatte}].map(f => (
          <div key={f.label} style={{ background: f.ok ? "#E1F5EE" : "#F5F4F0", borderRadius: 8, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: f.ok ? "#085041" : "#B4B2A9", fontWeight: 500 }}>{f.label}</span>
            <span style={{ fontSize: 16, color: f.ok ? "#0F6E56" : "#D3D1C7", fontWeight: 700 }}>{f.ok ? "✓" : "—"}</span>
          </div>
        ))}
      </div>

      {/* Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 52 }}>
        <div style={{ background: "#FAFAF7", borderRadius: 12, padding: "24px", border: "1px solid #E8E6DF" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Pricing & Konditionen</h3>
          {[
            ["Preis ab", provider.priceFrom === 0 ? "Kostenlos" : `€${provider.priceFrom.toFixed(2)}/MA/Mon.`],
            ["Mindestgröße", provider.employees],
            sbDetail && ["Laufzeit", sbDetail.laufzeit],
          ].filter(Boolean).map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "8px 0", borderBottom: "1px solid #F0EFEB" }}>
              <span style={{ color: "#888780" }}>{k}</span>
              <span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          {sbDetail && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "8px 0" }}>
            <span style={{ color: "#888780" }}>HR-Aufwand</span><AufwandBadge level={sbDetail.hrAufwand} />
          </div>}
        </div>
        <div style={{ background: "#FAFAF7", borderRadius: 12, padding: "24px", border: "1px solid #E8E6DF" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px" }}>Produkt-Details</h3>
          {[
            provider.sachbezugModel !== "—" && ["Modell", provider.sachbezugModel],
            sbDetail && ["Akzeptanz", sbDetail.akzeptanz],
            sbDetail && ["Abdeckung", sbDetail.scope],
            essenDetail && ["Belegprüfung", essenDetail.belegpruefung],
            mobilDetail && ["Deutschlandticket", mobilDetail.deutschlandticket ? "✓ Ja" : "—"],
            mobilDetail && ["Jobrad", mobilDetail.jobrad ? "✓ Ja" : "—"],
          ].filter(Boolean).map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "8px 0", borderBottom: "1px solid #F0EFEB" }}>
              <span style={{ color: "#888780" }}>{k}</span>
              <span style={{ fontWeight: 500, textAlign: "right", maxWidth: 200 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, margin: "0 0 6px" }}>Bewertungen</h2>
      <p style={{ fontSize: 14, color: "#888780", margin: "0 0 32px" }}>
        {reviews.length > 0 ? `${reviews.length} verifizierte Bewertung${reviews.length !== 1 ? "en" : ""}` : "Noch keine Bewertungen — sei der Erste!"}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: reviews.length > 0 ? "1fr 1fr" : "1fr", gap: 24, alignItems: "start" }}>
        {reviews.length > 0 && (
          <div style={{ display: "grid", gap: 14 }}>
            {reviews.map(r => (
              <div key={r.id} style={{ background: "#FAFAF7", borderRadius: 10, padding: "18px 20px", border: "1px solid #E8E6DF" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                  <StarRating value={r.rating} />
                </div>
                <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 8px" }}>{r.text}</p>
                <p style={{ fontSize: 11, color: "#B4B2A9", margin: 0 }}>{new Date(r.created_at).toLocaleDateString("de-DE")}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bewertungsformular */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "28px", border: "1px solid #E8E6DF" }}>
          {step === "success" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, margin: "0 0 8px" }}>Danke für deine Bewertung!</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A" }}>Sie ist jetzt live auf der Seite.</p>
            </div>
          ) : step === "verify" ? (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>E-Mail bestätigen</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 20px" }}>Wir haben einen 6-stelligen Code an <strong>{form.email}</strong> gesendet.</p>
              <form onSubmit={handleVerify}>
                <input value={verifyInput} onChange={e => setVerifyInput(e.target.value)}
                  placeholder="123456" maxLength={6}
                  style={{ ...inputStyle, fontSize: 22, textAlign: "center", letterSpacing: 10, fontFamily: "monospace" }} />
                {error && <p style={{ fontSize: 13, color: "#993556", margin: "-4px 0 10px" }}>{error}</p>}
                <button type="submit" disabled={submitting}
                  style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  {submitting ? "..." : "Bestätigen"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Bewertung schreiben</h3>
              <p style={{ fontSize: 13, color: "#888780", margin: "0 0 20px" }}>Nutzt oder hast du {provider.name} genutzt?</p>
              <form onSubmit={handleSubmit}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 8 }}>Deine Bewertung *</label>
                <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                <div style={{ height: 14 }} />
                <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 6 }}>Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Max Mustermann" style={inputStyle} />
                <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 6 }}>E-Mail *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="max@firma.de" style={inputStyle} />
                <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 6 }}>Erfahrungsbericht *</label>
                <textarea required value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  placeholder={`Wie sind deine Erfahrungen mit ${provider.name}?`}
                  rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                {error && <p style={{ fontSize: 13, color: "#993556", margin: "-4px 0 10px" }}>{error}</p>}
                <button type="submit" disabled={submitting}
                  style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Wird gesendet..." : "Bewertung einreichen →"}
                </button>
                <p style={{ fontSize: 11, color: "#B4B2A9", margin: "10px 0 0", lineHeight: 1.5 }}>
                  Deine E-Mail wird nicht veröffentlicht und dient nur zur Verifikation.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RechnerPage({ navigate }) {
  const [employees, setEmployees] = useState(50);
  const [sachbezug, setSachbezug] = useState(true);
  const [essen, setEssen] = useState(true);
  const [mobil, setMobil] = useState(false);
  const [internet, setInternet] = useState(false);
  const [mental, setMental] = useState(false);
  const [erholung, setErholung] = useState(false);

  const sachbezugMonthly = sachbezug ? 50 : 0;
  const essenMonthly = essen ? 115.05 : 0;
  const mobilMonthly = mobil ? 63 : 0;
  const internetMonthly = internet ? 50 : 0;
  const mentalMonthly = mental ? 50 : 0;
  const erholungMonthly = erholung ? 13 : 0; // €156/Jahr ÷ 12
  const totalPerEmployee = sachbezugMonthly + essenMonthly + mobilMonthly + internetMonthly + mentalMonthly + erholungMonthly;
  const totalPerYear = totalPerEmployee * 12;
  const totalCompany = totalPerYear * employees;
  const bruttoEquivalent = totalPerYear / 0.52;
  const savingsPerEmployee = bruttoEquivalent - totalPerYear;
  const totalSavings = savingsPerEmployee * employees;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Steuerrechner</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px" }}>Steuerfreie Benefits berechnen</h1>
      <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 8px", maxWidth: 600 }}>
        Berechne, wie viel dein Unternehmen und deine Mitarbeitenden durch steuerfreie Benefits sparen — im Vergleich zu einer klassischen Brutto-Gehaltserhöhung.
      </p>
      <p style={{ fontSize: 13, color: "#0F6E56", margin: "0 0 32px", cursor: "pointer", fontWeight: 500 }} onClick={() => navigate("steuer")}>
        Alle steuerfreien Benefits ansehen →
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
          { key: "sachbezug", label: "Sachbezug (€50/Monat)", sub: "§8 Abs. 2 S. 11 EStG", value: sachbezug, set: setSachbezug, monthly: "€50,00" },
          { key: "essen", label: "Essenszuschuss (max. 15 Tage)", sub: "§8 Abs. 2 S. 6 EStG", value: essen, set: setEssen, monthly: "€115,05" },
          { key: "mobil", label: "Deutschlandticket / Jobticket", sub: "§3 Nr. 15 EStG", value: mobil, set: setMobil, monthly: "€63,00" },
          { key: "internet", label: "Internetpauschale", sub: "§3 Nr. 50 EStG", value: internet, set: setInternet, monthly: "€50,00" },
          { key: "mental", label: "Mental Health / Gesundheitsförderung", sub: "§3 Nr. 34 EStG · max. €600/Jahr", value: mental, set: setMental, monthly: "€50,00" },
          { key: "erholung", label: "Erholungsbeihilfe", sub: "R 19.6 LStR · €156/Jahr", value: erholung, set: setErholung, monthly: "€13,00" },
        ].map((b, i, arr) => (
          <label key={b.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid #E8E6DF" : "none", cursor: "pointer" }}>
            <input type="checkbox" checked={b.value} onChange={e => b.set(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#0F6E56", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 15, color: "#1a1a18", display: "block" }}>{b.label}</span>
              <span style={{ fontSize: 12, color: "#B4B2A9" }}>{b.sub}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#0F6E56", whiteSpace: "nowrap" }}>{b.monthly}/MA</span>
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
          <strong style={{ color: "#1a1a18" }}>Was bedeutet das?</strong> Statt einer Brutto-Gehaltserhöhung von €{Math.round(bruttoEquivalent).toLocaleString("de-DE")} können deine Mitarbeitenden den gleichen Nettovorteil über steuerfreie Benefits erhalten — und dein Unternehmen spart sich die Lohnnebenkosten.
        </p>
      </div>
    </div>
  );
}

const STEUER_BENEFITS = [
  { name: "Sachbezug", kategorie: "Monatlich", betrag: "€50 / Monat", jahreswert: 600, grundlage: "§8 Abs. 2 S. 11 EStG", beschreibung: "Steuerfreie Gutscheine, Prepaid-Karten oder Sachleistungen — der meistgenutzte Benefit in Deutschland.", hinweis: "Kein Bargeld, keine Auszahlung. Muss zusätzlich zum vereinbarten Lohn gewährt werden.", farbe: "#E1F5EE", accent: "#0F6E56", icon: "🎁" },
  { name: "Essenszuschuss", kategorie: "Monatlich", betrag: "bis €7,67 / Tag (max. 15 Arbeitstage)", jahreswert: 1381, grundlage: "§8 Abs. 2 S. 6 EStG", beschreibung: "Zuschuss zum Mittagessen — per Karte, App oder Belegeinreichung. Steuerfrei bis zum amtlichen Sachbezugswert.", hinweis: "Gilt nur für tatsächliche Arbeitstage mit Mahlzeit. Nicht kombinierbar mit Kantinenessen desselben Tages.", farbe: "#FAEEDA", accent: "#854F0B", icon: "🍽️" },
  { name: "Deutschlandticket / Jobticket", kategorie: "Monatlich", betrag: "Unbegrenzt (z. B. €63/Monat)", jahreswert: 756, grundlage: "§3 Nr. 15 EStG", beschreibung: "Steuerfreier ÖPNV-Zuschuss — inkl. Deutschlandticket. Kein Anrechnungszwang auf die Pendlerpauschale mehr.", hinweis: "Muss zusätzlich zum ohnehin geschuldeten Arbeitslohn gewährt werden (Zusätzlichkeitsprinzip).", farbe: "#E6F1FB", accent: "#185FA5", icon: "🚌" },
  { name: "Dienstrad / Jobrad-Leasing", kategorie: "Monatlich", betrag: "0,25% des Listenpreises (geldwerter Vorteil)", jahreswert: null, grundlage: "§8 Abs. 2 S. 12 EStG", beschreibung: "Dienstrad-Leasing via Gehaltsumwandlung. Mitarbeitende zahlen nur 0,25% des Listenpreises pro Monat als geldwerten Vorteil.", hinweis: "Kostenlos für Arbeitgeber, da Leasingrate aus dem Bruttolohn finanziert wird. Gilt auch für E-Bikes.", farbe: "#E6F1FB", accent: "#185FA5", icon: "🚲" },
  { name: "Gesundheitsförderung (Fitness & Mental Health)", kategorie: "Jährlich", betrag: "€600 / Jahr", jahreswert: 600, grundlage: "§3 Nr. 34 EStG", beschreibung: "Firmenfitness, Yoga, Stressmanagement, psychologische Beratung — wenn zertifiziert nach §20 SGB V vollständig steuerfrei.", hinweis: "Anbieter wie Urban Sports Club, Wellhub, Nilo Health oder Hansefit sind anerkannt. Nachweis der Zertifizierung empfohlen.", farbe: "#FAECE7", accent: "#993C1D", icon: "🏃" },
  { name: "Internetpauschale", kategorie: "Monatlich", betrag: "€50 / Monat", jahreswert: 600, grundlage: "§3 Nr. 50 EStG", beschreibung: "Zuschuss zu privaten Internetkosten für berufliche Nutzung im Homeoffice. Pauschal versteuerbar oder als steuerfreier Auslagenersatz.", hinweis: "Bei pauschaler Versteuerung durch den AG ist der Betrag für den Arbeitnehmer nettofrei. Kein Einzelnachweis erforderlich.", farbe: "#F0EDFE", accent: "#534AB7", icon: "🌐" },
  { name: "Kinderbetreuungszuschuss", kategorie: "Monatlich", betrag: "Unbegrenzt", jahreswert: null, grundlage: "§3 Nr. 33 EStG", beschreibung: "Zuschuss zu Kita-, Krippen- oder Tagesmutterkosten für nicht schulpflichtige Kinder — vollständig steuer- und sozialabgabenfrei.", hinweis: "Gilt nur für nicht schulpflichtige Kinder. Muss zusätzlich zum Arbeitslohn gewährt werden. Keine Altersgrenze nach unten.", farbe: "#FBEAF0", accent: "#993556", icon: "👶" },
  { name: "Erholungsbeihilfe", kategorie: "Jährlich", betrag: "€156 MA · €104 Ehepartner · €52 je Kind", jahreswert: 156, grundlage: "R 19.6 LStR", beschreibung: "Pauschal versteuerter Zuschuss zur Erholung (Urlaub). Der Arbeitgeber trägt die Pauschalsteuer von 25% — für Mitarbeitende nettofrei.", hinweis: "AG versteuert pauschal mit 25%. Nachweis einer Erholungsmaßnahme empfohlen. Kombinierbar mit anderen Benefits.", farbe: "#FAEEDA", accent: "#854F0B", icon: "🌴" },
  { name: "Mitarbeiterrabatte", kategorie: "Jährlich", betrag: "bis €1.080 / Jahr", jahreswert: 1080, grundlage: "§8 Abs. 3 EStG", beschreibung: "Rabatte auf eigene Produkte oder Dienstleistungen sowie über zertifizierte Rabattportale — bis €1.080/Jahr vollständig steuerfrei.", hinweis: "Gilt nur für Produkte/Dienstleistungen, die der AG auch fremden Dritten anbietet. Rabattportale müssen §8 Abs. 3 EStG-konform sein.", farbe: "#F5F4F0", accent: "#5F5E5A", icon: "🏷️" },
  { name: "Betriebliche Altersvorsorge (bAV)", kategorie: "Monatlich", betrag: "bis €644 / Monat (8% der BBG 2026)", jahreswert: 7728, grundlage: "§3 Nr. 63 EStG", beschreibung: "AG-Beiträge in Direktversicherung, Pensionskasse oder Pensionsfonds sind steuer- und sozialabgabenfrei bis zur gesetzlichen Grenze.", hinweis: "BBG 2026: €96.600/Jahr. Steuerfreigrenze: 8% = €644/Monat. Sozialabgabenfrei bis 4% = €322/Monat.", farbe: "#E1F5EE", accent: "#0F6E56", icon: "🏦" },
  { name: "Homeoffice-Ausstattung", kategorie: "Einmalig", betrag: "Unbegrenzt (Sachmittel)", jahreswert: null, grundlage: "§3 Nr. 50 EStG", beschreibung: "PC, Laptop, Monitor, Bürostuhl, Headset für das Homeoffice — wenn vom AG gestellt und im AG-Eigentum verbleibend, vollständig steuerfrei.", hinweis: "Übereignung an Mitarbeitende ist steuerpflichtig. Gerät muss im Eigentum des AG bleiben oder als betriebliches Sachmittel gestellt werden.", farbe: "#F5F4F0", accent: "#5F5E5A", icon: "💻" },
  { name: "Weiterbildung & Qualifizierung", kategorie: "Einmalig / Jährlich", betrag: "Unbegrenzt", jahreswert: null, grundlage: "§3 Nr. 19 EStG", beschreibung: "Berufliche Fort- und Weiterbildungen im betrieblichen Interesse — vollständig steuer- und sozialabgabenfrei ohne Betragslimit.", hinweis: "Muss im überwiegenden betrieblichen Interesse liegen. Rein private Weiterbildung ohne Bezug zur Tätigkeit gilt als geldwerter Vorteil.", farbe: "#EEEDFE", accent: "#534AB7", icon: "📚" },
  { name: "Sachgeschenke / Aufmerksamkeiten", kategorie: "Pro Anlass", betrag: "€60 / persönlichem Anlass", jahreswert: null, grundlage: "R 19.6 LStR", beschreibung: "Sachgeschenke zu persönlichen Anlässen (Geburtstag, Hochzeit, Geburt, Jubiläum) bis €60 je Anlass — steuerfrei.", hinweis: "Nur Sachleistungen, kein Bargeld. Wird der Grenzwert überschritten, wird der Gesamtbetrag steuerpflichtig.", farbe: "#F5F4F0", accent: "#5F5E5A", icon: "🎉" },
  { name: "Diensthandy (Privatnutzung)", kategorie: "Monatlich", betrag: "Unbegrenzt", jahreswert: null, grundlage: "§3 Nr. 45 EStG", beschreibung: "Die private Nutzung eines vom AG gestellten Handys oder Laptops ist vollständig steuerfrei — unabhängig vom Privatnutzungsanteil.", hinweis: "Das Gerät muss im Eigentum des AG bleiben. Übereignung an Mitarbeitende ist ein geldwerter Vorteil.", farbe: "#F5F4F0", accent: "#5F5E5A", icon: "📱" },
];

function SteuerPage({ navigate }) {
  const [filter, setFilter] = useState("Alle");
  const kategorien = ["Alle", "Monatlich", "Jährlich", "Einmalig"];
  const filtered = filter === "Alle" ? STEUER_BENEFITS : STEUER_BENEFITS.filter(b => b.kategorie.includes(filter === "Einmalig" ? "Einmalig" : filter));

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Steuerfreie Benefits</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 12px", letterSpacing: -0.5 }}>
        Alle steuerfreien Benefits 2026
      </h1>
      <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 12px", maxWidth: 680 }}>
        Eine vollständige Übersicht aller steuerfreien und pauschal versteuerten Mitarbeiter-Benefits — mit Rechtsgrundlage, maximalem Betrag und Praxishinweisen.
      </p>
      <p style={{ fontSize: 13, color: "#B4B2A9", margin: "0 0 32px" }}>Stand: April 2026 · Alle Angaben ohne Gewähr · Bitte steuerlichen Berater konsultieren.</p>

      {/* Highlight-Kacheln */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Max. Jahresvorteil pro MA", value: "€12.000+", sub: "bei Kombination aller Benefits" },
          { label: "Benefits im Überblick", value: `${STEUER_BENEFITS.length}`, sub: "steuerfreie Möglichkeiten" },
          { label: "Rechtsgrundlagen", value: "EStG + LStR", sub: "§3, §8 und weitere" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ fontSize: 12, color: "#888780", margin: "0 0 6px", fontWeight: 500 }}>{k.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: "#0F6E56", margin: "0 0 2px" }}>{k.value}</p>
            <p style={{ fontSize: 12, color: "#B4B2A9", margin: 0 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {kategorien.map(k => (
          <button key={k} onClick={() => setFilter(k)} style={{
            background: filter === k ? "#0F6E56" : "#fff",
            color: filter === k ? "#fff" : "#5F5E5A",
            border: `1px solid ${filter === k ? "#0F6E56" : "#D3D1C7"}`,
            padding: "7px 16px", borderRadius: 6, fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}>{k}</button>
        ))}
      </div>

      {/* Benefit-Karten */}
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map((b, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 12, padding: "24px", display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: b.farbe, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{b.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>{b.name}</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, background: "#F5F4F0", color: "#5F5E5A", padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>{b.kategorie}</span>
                    <span style={{ fontSize: 12, background: "#F0EDFE", color: "#534AB7", padding: "2px 8px", borderRadius: 4, fontWeight: 500, fontFamily: "monospace" }}>{b.grundlage}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: b.accent, margin: "0 0 2px" }}>{b.betrag}</p>
                  {b.jahreswert && <p style={{ fontSize: 12, color: "#888780", margin: 0 }}>≈ €{b.jahreswert.toLocaleString("de-DE")}/Jahr</p>}
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.6, margin: "10px 0 8px" }}>{b.beschreibung}</p>
              <div style={{ background: "#FAFAF7", borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${b.accent}` }}>
                <p style={{ fontSize: 13, color: "#5F5E5A", margin: 0, lineHeight: 1.6 }}><strong style={{ color: "#1a1a18" }}>Hinweis:</strong> {b.hinweis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, background: "#0F6E56", borderRadius: 12, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>Wie viel kannst du konkret sparen?</p>
          <p style={{ fontSize: 14, color: "#9FE1CB", margin: 0 }}>Im Steuerrechner einfach die gewünschten Benefits auswählen.</p>
        </div>
        <button onClick={() => navigate("rechner")} style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Zum Steuerrechner →
        </button>
      </div>
    </div>
  );
}

function LeadPage({ navigate }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ goals: [], budget: null, payModel: null, international: null, homeoffice: null, benefits: [], hrCapacity: null, startDate: null });
  const [recommendations, setRecommendations] = useState([]);
  const [contact, setContact] = useState({ vorname: "", nachname: "", unternehmen: "", email: "", telefon: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const questions = [
    { id: 1, key: "goals", title: "Warum wollt ihr Benefits anbieten?", sub: "Mehrere Antworten möglich", type: "multi", options: ["Mitarbeitendenbindung", "Mitarbeitende finanziell entlasten", "Employer Branding", "Neue Mitarbeitende gewinnen", "Steuer sparen", "Nachhaltigkeit fördern"] },
    { id: 2, key: "payModel", title: "Wie möchtest du zahlen?", sub: "Einfachauswahl", type: "single", options: ["Nur für Mitarbeitende die Benefits aktiv nutzen", "Für alle Mitarbeitenden monatlich (Pauschalmodell)"] },
    { id: 3, key: "international", title: "Wo sind eure Mitarbeitenden?", sub: "Einfachauswahl", type: "single", options: ["Nur in Deutschland", "Auch im Ausland"] },
    { id: 4, key: "homeoffice", title: "Wie arbeiten eure Mitarbeitenden hauptsächlich?", sub: "Einfachauswahl", type: "single", options: ["Hauptsächlich im Office", "Gemischt (Hybrid)", "Hauptsächlich Homeoffice"] },
    { id: 5, key: "benefits", title: "Welche Benefits interessieren euch besonders?", sub: "Mehrere Antworten möglich", type: "multi", options: ["Mitarbeiterrabatte", "Sachbezug (50€)", "Essenszuschuss", "Mobilität", "Jobfahrrad", "Health & Fitness", "Mental Health", "Internetpauschale"] },
    { id: 6, key: "hrCapacity", title: "Wie viel Kapazität habt ihr in der Personalabteilung für Benefits?", sub: "Einfachauswahl", type: "single", options: ["Sehr wenig", "Wenig", "Normal", "Recht viel", "Sehr viel"] },
    { id: 7, key: "startDate", title: "Wann möchtet ihr mit Benefits loslegen?", sub: "Einfachauswahl", type: "single", options: ["So schnell wie möglich", "In 1–3 Monaten", "In 3–6 Monaten", "Noch offen"] },
    { id: 8, key: "budget", title: "Wie viel möchtet ihr maximal pro Mitarbeitenden und Monat ausgeben?", sub: "Einfachauswahl", type: "single", options: ["Kostenlos", "bis 2€", "bis 4€", "bis 6€", "bis 10€", "20€+"] },
  ];

  function computeRecommendations(ans) {
    const scores = {};
    PROVIDERS.forEach(p => { scores[p.id] = 0; });
    const budgetMap = { "Kostenlos": 0, "bis 2€": 2, "bis 4€": 4, "bis 6€": 6, "bis 10€": 10, "20€+": 100 };
    const maxBudget = budgetMap[ans.budget] ?? 100;
    PROVIDERS.forEach(p => { if (p.priceFrom > maxBudget) scores[p.id] = -999; });
    if (ans.goals?.includes("Nachhaltigkeit fördern")) { scores[8] = (scores[8]||0)+3; scores[10] = (scores[10]||0)+3; }
    if (ans.goals?.includes("Employer Branding")) { scores[10] = (scores[10]||0)+2; scores[9] = (scores[9]||0)+2; }
    if (ans.goals?.includes("Steuer sparen")) PROVIDERS.filter(p => p.sachbezug||p.essen).forEach(p => { scores[p.id] = (scores[p.id]||0)+2; });
    if (ans.international === "Auch im Ausland") PROVIDERS.forEach(p => { if (!p.rabatte) scores[p.id] = Math.max((scores[p.id]||0)-2, -999); });
    if (ans.benefits?.includes("Mitarbeiterrabatte")) PROVIDERS.filter(p => p.rabatte).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Sachbezug (50€)")) PROVIDERS.filter(p => p.sachbezug).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Essenszuschuss")) PROVIDERS.filter(p => p.essen).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Mobilität")) PROVIDERS.filter(p => p.mobil).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Jobfahrrad")) PROVIDERS.filter(p => p.jobrad).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Health & Fitness")) PROVIDERS.filter(p => p.fitness).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.benefits?.includes("Mental Health")) PROVIDERS.filter(p => p.mental).forEach(p => { scores[p.id] = (scores[p.id]||0)+3; });
    if (ans.hrCapacity === "Sehr wenig" || ans.hrCapacity === "Wenig") { scores[7] = (scores[7]||0)+2; scores[6] = (scores[6]||0)+2; }
    scores[10] = (scores[10]||0)+1;
    return PROVIDERS.filter(p => (scores[p.id]||0) > -900).sort((a,b) => (scores[b.id]||0)-(scores[a.id]||0)).slice(0, 4);
  }

  function toggleMulti(key, option) {
    setAnswers(prev => { const arr = prev[key]||[]; return {...prev, [key]: arr.includes(option) ? arr.filter(x=>x!==option) : [...arr, option]}; });
  }

  function canProceed() {
    if (step > 8) return true;
    const q = questions[step-1];
    const val = answers[q.key];
    return q.type === "multi" ? val && val.length > 0 : val !== null && val !== undefined;
  }

  function handleNext() {
    if (step === 8) {
      setRecommendations(computeRecommendations(answers));
      window.gtag?.("event", "lead_quiz_complete");
    }
    setStep(s => s+1);
    window.scrollTo(0, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!contact.vorname || !contact.nachname || !contact.unternehmen || !contact.email) { setError("Bitte alle Pflichtfelder ausfüllen."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/submit-lead", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ answers, contact, recommendations: recommendations.map(p=>p.name) }) });
      const data = await res.json();
      if (data.success) { window.gtag?.("event", "generate_lead"); setSubmitted(true); }
      else setError(data.message || "Fehler.");
    } catch { setError("Verbindungsfehler."); }
    setSubmitting(false);
  }

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D3D1C7", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none", marginBottom: 12 };

  if (submitted) return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 24px" }}>✓</div>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 16px" }}>Vielen Dank!</h1>
      <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.7, margin: "0 0 32px" }}>Wir melden uns innerhalb von 24 Stunden mit eurem persönlichen Benefits-Paket und den besten Konditionen.</p>
      <button onClick={() => navigate("home")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Zurück zur Startseite</button>
    </div>
  );

  if (step === 9) return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Anfrage</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>Eure persönliche Empfehlung ist bereit</h1>
      <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 28px", lineHeight: 1.6 }}>Wir haben <strong>{recommendations.length} passende Anbieter</strong> für euch identifiziert. Fordert jetzt euer kostenloses Angebot an — wir verhandeln exklusive Konditionen und schicken euch die vollständige Empfehlung innerhalb von 24h.</p>

      {/* Blurred / locked preview */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{ display: "grid", gap: 14, filter: "blur(4px)", userSelect: "none", pointerEvents: "none", opacity: 0.5 }}>
          {recommendations.map((p, i) => (
            <div key={p.id} style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "#888780", margin: "0 0 6px" }}>{p.type} · {p.hq}</p>
                  <p style={{ fontSize: 13, color: "#5F5E5A", margin: 0 }}>{p.differenzierung}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a18", margin: 0 }}>{p.priceFrom===0 ? "Kostenlos" : `ab €${p.priceFrom.toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Lock overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.5)", borderRadius: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 16, padding: "28px 32px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", maxWidth: 360 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Empfehlung freischalten</p>
            <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 20px", lineHeight: 1.6 }}>Gebt uns kurz eure Kontaktdaten — wir schicken euch die vollständige Empfehlung mit exklusiven Konditionen.</p>
            <button onClick={() => { setStep(10); window.scrollTo(0,0); }} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" }}>
              Kostenloses exklusives Angebot →
            </button>
            <p style={{ fontSize: 11, color: "#B4B2A9", margin: "8px 0 0" }}>Unverbindlich · Antwort innerhalb 24h</p>
          </div>
        </div>
      </div>

      {answers.homeoffice === "Hauptsächlich Homeoffice" && <div style={{ background: "#F0EDFE", borderRadius: 8, padding: "12px 16px", marginBottom: 12, borderLeft: "3px solid #534AB7" }}><p style={{ fontSize: 13, color: "#534AB7", margin: 0 }}>💻 Tipp: Da viele im Homeoffice arbeiten, lohnt sich die steuerfreie Internetpauschale (€50/Monat) besonders.</p></div>}
      {answers.international === "Auch im Ausland" && <div style={{ background: "#E6F1FB", borderRadius: 8, padding: "12px 16px", marginBottom: 12, borderLeft: "3px solid #185FA5" }}><p style={{ fontSize: 13, color: "#185FA5", margin: 0 }}>🌍 Hinweis: Steuerfreie Sachbezüge gelten nur in Deutschland. Für internationale Teams sind Mitarbeiterrabatte ideal.</p></div>}

      <button onClick={() => setStep(8)} style={{ background: "none", border: "none", color: "#888780", fontSize: 13, cursor: "pointer", marginTop: 8 }}>← Zurück</button>
    </div>
  );

  if (step === 10) return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>Kostenloses Angebot anfordern</h1>
      <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 28px", lineHeight: 1.6 }}>Wir melden uns innerhalb von 24 Stunden mit eurem persönlichen Benefits-Paket.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input placeholder="Vorname *" value={contact.vorname} onChange={e => setContact(p=>({...p,vorname:e.target.value}))} style={{...inputStyle, marginBottom: 0}} />
          <input placeholder="Nachname *" value={contact.nachname} onChange={e => setContact(p=>({...p,nachname:e.target.value}))} style={{...inputStyle, marginBottom: 0}} />
        </div>
        <div style={{ height: 12 }} />
        <input placeholder="Unternehmen *" value={contact.unternehmen} onChange={e => setContact(p=>({...p,unternehmen:e.target.value}))} style={inputStyle} />
        <input placeholder="E-Mail-Adresse *" type="email" value={contact.email} onChange={e => setContact(p=>({...p,email:e.target.value}))} style={inputStyle} />
        <input placeholder="Telefonnummer (optional)" value={contact.telefon} onChange={e => setContact(p=>({...p,telefon:e.target.value}))} style={inputStyle} />
        {error && <p style={{ fontSize: 13, color: "#993556", margin: "0 0 12px" }}>{error}</p>}
        <button type="submit" disabled={submitting} style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1 }}>
          {submitting ? "Wird gesendet..." : "Angebot anfordern →"}
        </button>
        <p style={{ fontSize: 12, color: "#B4B2A9", margin: "10px 0 0", textAlign: "center" }}>Keine Verpflichtung · Kostenlos · Antwort innerhalb 24h</p>
      </form>
      <button onClick={() => setStep(9)} style={{ background: "none", border: "none", color: "#888780", fontSize: 13, cursor: "pointer", marginTop: 16 }}>← Zurück zu den Empfehlungen</button>
    </div>
  );

  const currentQ = questions[step-1];
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 6px" }}>benefitcheck.net / Anfrage</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 4px" }}>Nenne uns deine Bedürfnisse</h1>
      <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 24px" }}>Wir stellen das beste Benefit-Programm für euch zusammen und verhandeln den besten Preis.</p>
      <div style={{ background: "#E8E6DF", borderRadius: 4, height: 4, marginBottom: 6 }}>
        <div style={{ background: "#0F6E56", height: 4, borderRadius: 4, width: `${(step/8)*100}%`, transition: "width 0.3s" }} />
      </div>
      <p style={{ fontSize: 12, color: "#888780", margin: "0 0 28px", textAlign: "right" }}>Frage {step} von 8</p>
      <div style={{ background: "#FAFAF7", borderRadius: 16, padding: "28px", border: "1px solid #E8E6DF", marginBottom: 20 }}>
        <h2 style={{ fontSize: 19, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px", lineHeight: 1.4 }}>{currentQ.title}</h2>
        <p style={{ fontSize: 13, color: "#888780", margin: "0 0 20px" }}>{currentQ.sub}</p>
        <div style={{ display: "grid", gap: 8 }}>
          {currentQ.options.map(option => {
            const val = answers[currentQ.key];
            const selected = currentQ.type === "multi" ? (val||[]).includes(option) : val === option;
            return (
              <button key={option} onClick={() => currentQ.type === "multi" ? toggleMulti(currentQ.key, option) : setAnswers(p=>({...p,[currentQ.key]:option}))}
                style={{ background: selected ? "#0F6E56" : "#fff", color: selected ? "#fff" : "#1a1a18", border: `2px solid ${selected ? "#0F6E56" : "#E8E6DF"}`, borderRadius: 10, padding: "13px 18px", fontSize: 14, cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontWeight: selected ? 600 : 400, transition: "all 0.15s" }}>
                {selected && currentQ.type === "multi" ? "✓  " : ""}{option}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => { setStep(s=>s-1); window.scrollTo(0,0); }} style={{ background: "none", border: "none", color: "#888780", fontSize: 14, cursor: step===1 ? "default" : "pointer", opacity: step===1 ? 0 : 1 }}>← Zurück</button>
        <button onClick={handleNext} disabled={!canProceed()} style={{ background: canProceed() ? "#0F6E56" : "#D3D1C7", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: canProceed() ? "pointer" : "default" }}>
          {step === 8 ? "Empfehlungen anzeigen →" : "Weiter →"}
        </button>
      </div>
    </div>
  );
}

function ImpressumPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Impressum</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 32px", letterSpacing: -0.5 }}>Impressum</h1>
      <div style={{ display: "grid", gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Angaben gemäß § 5 TMG</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0 }}>
            Jasphues UG<br />
            Torstraße 185<br />
            10115 Berlin
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Geschäftsführung</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0 }}>J. Huesgen</p>
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Registereintrag</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0 }}>
            Handelsregister: HRB 224782 B<br />
            Registergericht: Amtsgericht Berlin Charlottenburg
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Umsatzsteuer-ID</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0 }}>Steuer-Nr.: 30/298/50421</p>
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>Kontakt</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0 }}>
            E-Mail: <a href="mailto:info@benefitcheck.net" style={{ color: "#0F6E56" }}>info@benefitcheck.net</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function GuidePage({ navigate }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleDownload(e) {
    e.preventDefault();
    if (!email.includes("@")) return;
    subscribeMailchimp(email)
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  }

  const chapters = [
    { nr: "01", title: "Steuerfreie Benefits 2026", desc: "Alle Freigrenzen, Rechtsgrundlagen und aktuellen Änderungen auf einen Blick." },
    { nr: "02", title: "Sachbezug richtig einrichten", desc: "ZAG-Kriterien, Anbieterauswahl und häufige Fehler bei der Umsetzung." },
    { nr: "03", title: "Essenszuschuss & Mobilität", desc: "Karte oder Beleg-Upload? Jobrad, Deutschlandticket — was lohnt sich wann?" },
    { nr: "04", title: "Mitarbeiterrabatte als Employer Branding", desc: "Wie nachhaltige Benefits die Arbeitgebermarke stärken." },
    { nr: "05", title: "Kosten & ROI-Rechnung", desc: "Was eine Benefits-Plattform wirklich kostet — und was sie spart." },
    { nr: "06", title: "Anbieter-Checkliste", desc: "12 Fragen, die du vor jedem Vertragsabschluss stellen solltest." },
  ];

  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0F6E56 0%, #085041 100%)", padding: "72px 24px 80px", color: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 480px" }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, marginBottom: 20, letterSpacing: 0.5 }}>WHITEPAPER · KOSTENLOS</div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, fontWeight: 400, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -1 }}>
              Der Benefits-Guide<br />für HR-Teams 2026
            </h1>
            <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.7, margin: "0 0 12px", maxWidth: 500 }}>
              Alles was du wissen musst: Steuerfreigrenzen, Anbietervergleich, ROI-Rechnung und eine Checkliste für die Einführung — in einem kompakten Guide.
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
              {["42 Seiten", "6 Kapitel", "Kostenlos"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, opacity: 0.9 }}>
                  <span style={{ color: "#9FE1CB", fontWeight: 700 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Download-Formular */}
          <div style={{ flex: "0 0 340px", background: "#fff", borderRadius: 16, padding: "32px", color: "#1a1a18" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, margin: "0 0 10px" }}>Gleich in deinem Postfach!</h3>
                <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.6, margin: 0 }}>Wir schicken dir den Benefits-Guide direkt zu. Bitte prüfe auch deinen Spam-Ordner.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, margin: "0 0 6px" }}>Jetzt kostenlos herunterladen</h3>
                <p style={{ fontSize: 13, color: "#888780", margin: "0 0 20px" }}>Trage deine E-Mail ein — wir senden dir den Guide direkt zu.</p>
                <form onSubmit={handleDownload}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 6 }}>E-Mail-Adresse</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="deine@email.de"
                    required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #D3D1C7", fontSize: 14, color: "#1a1a18", marginBottom: 12, boxSizing: "border-box", outline: "none" }}
                  />
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#5F5E5A", display: "block", marginBottom: 6 }}>Unternehmen (optional)</label>
                  <input
                    type="text"
                    placeholder="Muster GmbH"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #D3D1C7", fontSize: 14, color: "#1a1a18", marginBottom: 16, boxSizing: "border-box", outline: "none" }}
                  />
                  <button type="submit" style={{ width: "100%", background: "#0F6E56", color: "#fff", border: "none", padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    Guide herunterladen →
                  </button>
                </form>
                <p style={{ fontSize: 11, color: "#B4B2A9", margin: "12px 0 0", lineHeight: 1.5 }}>Kein Spam. Du kannst dich jederzeit abmelden. Es gelten unsere Datenschutzbestimmungen.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Kapitel-Übersicht */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>Was dich erwartet</h2>
        <p style={{ color: "#5F5E5A", fontSize: 15, margin: "0 0 40px" }}>6 Kapitel, praxisnah aufbereitet für HR-Verantwortliche und Geschäftsführer.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {chapters.map(c => (
            <div key={c.nr} style={{ display: "flex", gap: 16, padding: "20px", border: "1px solid #E8E6DF", borderRadius: 12, background: "#fff" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#E8E6DF", fontFamily: "'DM Mono', monospace", lineHeight: 1, flexShrink: 0 }}>{c.nr}</div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 6px" }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#F5F4F0", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, margin: "0 0 12px" }}>Lieber direkt Anbieter vergleichen?</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 24px" }}>Unser interaktiver Vergleich zeigt dir alle Benefits-Plattformen auf einen Blick.</p>
          <button onClick={() => navigate("sachbezug")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Zum Anbieter-Vergleich</button>
        </div>
      </section>
    </div>
  );
}

function DatenschutzPage() {
  const sections = [
    {
      title: "1. Verantwortlicher",
      content: `Verantwortlicher im Sinne der DSGVO ist:\n\nJasphues UG\nTorstraße 185\n10115 Berlin\nE-Mail: info@benefitcheck.net`,
    },
    {
      title: "2. Erhebung und Verarbeitung personenbezogener Daten",
      content: `Beim Besuch dieser Website werden automatisch technische Daten übertragen, die dein Browser an unseren Server sendet. Dazu gehören: IP-Adresse (anonymisiert), Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browsertyp und -version sowie das verwendete Betriebssystem. Diese Daten werden ausschließlich zur technischen Bereitstellung der Website benötigt und nicht mit anderen Daten zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website).`,
    },
    {
      title: "3. Hosting",
      content: `Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Vercel verarbeitet technische Zugriffsdaten auf Basis eines Auftragsverarbeitungsvertrags (AVV). Weitere Informationen findest du in der Datenschutzerklärung von Vercel unter vercel.com/legal/privacy-policy.`,
    },
    {
      title: "4. Newsletter",
      content: `Wenn du dich für unseren Newsletter anmeldest, speichern wir deine E-Mail-Adresse zur Versendung von Informationen rund um Mitarbeiter-Benefits. Die Anmeldung erfolgt freiwillig; du kannst dich jederzeit abmelden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Zur E-Mail-Zustellung nutzen wir einen Dienstleister (z.B. Brevo/Mailchimp), der auf Basis eines AVV tätig wird.`,
    },
    {
      title: "5. Cookies",
      content: `Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking- oder Marketing-Cookies eingesetzt. Eine Einwilligung ist daher nicht erforderlich (§25 Abs. 2 TTDSG).`,
    },
    {
      title: "6. Externe Links",
      content: `Diese Website enthält Links zu Websites externer Anbieter (z.B. hrmony.de, spendit.de). Für die Inhalte und Datenschutzpraktiken dieser externen Seiten sind die jeweiligen Betreiber verantwortlich. Wir haben keinen Einfluss auf deren Datenverarbeitung.`,
    },
    {
      title: "7. Deine Rechte",
      content: `Du hast nach der DSGVO folgende Rechte gegenüber uns bezüglich deiner personenbezogenen Daten:\n\n• Recht auf Auskunft (Art. 15 DSGVO)\n• Recht auf Berichtigung (Art. 16 DSGVO)\n• Recht auf Löschung (Art. 17 DSGVO)\n• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n• Recht auf Widerspruch (Art. 21 DSGVO)\n• Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)\n\nZur Geltendmachung deiner Rechte wende dich bitte an: info@benefitcheck.net`,
    },
    {
      title: "8. Beschwerderecht",
      content: `Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde für Berlin ist: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstr. 219, 10969 Berlin, mailbox@datenschutz-berlin.de.`,
    },
    {
      title: "9. Aktualität dieser Datenschutzerklärung",
      content: `Diese Datenschutzerklärung hat den Stand April 2026. Wir behalten uns vor, sie bei Bedarf anzupassen, um stets den aktuellen rechtlichen Anforderungen zu entsprechen.`,
    },
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Datenschutz</p>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px", letterSpacing: -0.5 }}>Datenschutzerklärung</h1>
      <p style={{ fontSize: 14, color: "#B4B2A9", margin: "0 0 40px" }}>Stand: April 2026</p>
      <div style={{ display: "grid", gap: 32 }}>
        {sections.map((s, i) => (
          <div key={i}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: "0 0 10px" }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("error"); return; }
    setStatus("loading");
    subscribeMailchimp(email)
      .then(() => { window.gtag?.("event", "newsletter_signup"); setStatus("success"); setEmail(""); })
      .catch(() => { window.gtag?.("event", "newsletter_signup"); setStatus("success"); setEmail(""); }); // Mailchimp gibt bei bereits registrierten auch "error" zurück — wir zeigen trotzdem Erfolg
  }

  return (
    <div style={{ background: "#111110", borderRadius: 12, padding: "28px 32px", marginBottom: 40 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>Newsletter</p>
      <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#D3D1C7", margin: "0 0 8px" }}>Benefits-Updates & Steuertipps</h3>
      <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 16px", lineHeight: 1.6 }}>Neue Anbieter, Gesetzesänderungen und HR-Tipps — kostenlos, monatlich.</p>
      {status === "success" ? (
        <p style={{ fontSize: 14, color: "#9FE1CB", fontWeight: 500, margin: 0 }}>Danke! Du hast dich erfolgreich angemeldet.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="deine@email.de"
            style={{
              flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 6,
              border: status === "error" ? "1px solid #993556" : "1px solid #2C2C2A",
              background: "#1a1a18", color: "#D3D1C7", fontSize: 14, outline: "none",
            }}
          />
          <button type="submit" disabled={status === "loading"} style={{
            background: "#0F6E56", color: "#fff", border: "none",
            padding: "10px 20px", borderRadius: 6, fontSize: 14, fontWeight: 600,
            cursor: status === "loading" ? "default" : "pointer", opacity: status === "loading" ? 0.7 : 1,
          }}>{status === "loading" ? "..." : "Anmelden"}</button>
        </form>
      )}
      {status === "error" && <p style={{ fontSize: 12, color: "#993556", margin: "6px 0 0" }}>Bitte gib eine gültige E-Mail-Adresse ein.</p>}
    </div>
  );
}

function BlogPage({ slug, navigate }) {
  const post = slug ? PUBLISHED_POSTS.find(p => p.slug === slug) : null;

  if (slug && !post) return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontWeight: 400, color: "#1a1a18" }}>Artikel nicht gefunden</h1>
      <button onClick={() => navigate("blog")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 15, cursor: "pointer", marginTop: 20 }}>Zum Blog</button>
    </div>
  );

  if (!post) {
    // Blog listing page
    return (
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
        <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>benefitcheck.net / Blog</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px", letterSpacing: -0.5 }}>Ratgeber & Blog</h1>
        <p style={{ fontSize: 16, color: "#5F5E5A", margin: "0 0 40px" }}>Praxiswissen zu steuerfreien Benefits, Anbietervergleichen und HR-Tipps für 2026.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {PUBLISHED_POSTS.map(p => (
            <div key={p.id} onClick={() => navigate("blog", null, null, p.slug)}
              style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 14, overflow: "hidden", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <div style={{ height: 120, overflow: "hidden", position: "relative" }}>{getBlogCardSvg(p.id)}</div>
              <div style={{ padding: "18px 22px 22px" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, background: "#E1F5EE", color: "#085041", padding: "2px 8px", borderRadius: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{p.category}</span>
                  <span style={{ fontSize: 12, color: "#B4B2A9" }}>{p.readTime} Lesezeit</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px", lineHeight: 1.35 }}>{p.title}</h2>
                <p style={{ fontSize: 14, color: "#888780", margin: "0 0 14px", lineHeight: 1.5 }}>{p.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#B4B2A9" }}>{p.date}</span>
                  <span style={{ fontSize: 13, color: "#0F6E56", fontWeight: 600 }}>Lesen →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single article view
  const fullContent = [...post.content, ...(BLOG_EXTRA[post.id] || [])];
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ height: 180, borderRadius: 14, overflow: "hidden", marginBottom: 28, position: "relative" }}>
        {getBlogCardSvg(post.id)}
      </div>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 8px" }}>
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("home")}>benefitcheck.net</span>
        {" / "}
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("blog")}>Blog</span>
        {" / "}{post.title}
      </p>
      <div style={{ display: "inline-flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>{post.category}</span>
        <span style={{ fontSize: 13, color: "#888780" }}>{post.date} · {post.readTime} Lesezeit</span>
      </div>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a18", margin: "0 0 36px", lineHeight: 1.2, letterSpacing: -0.5 }}>{post.title}</h1>
      {fullContent.map((block, i) => {
        if (block.type === "intro") return <p key={i} style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.75, margin: "0 0 28px", borderLeft: "3px solid #E8E6DF", paddingLeft: 20, fontStyle: "italic" }}>{block.html ? <span dangerouslySetInnerHTML={{__html: block.html}} /> : block.text}</p>;
        if (block.type === "h2") return <h2 key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, color: "#1a1a18", margin: "36px 0 12px", letterSpacing: -0.3 }}>{block.text}</h2>;
        if (block.type === "p") return <p key={i} style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: "0 0 16px" }}>{block.html ? <span dangerouslySetInnerHTML={{__html: block.html}} /> : block.text}</p>;
        if (block.type === "tip") return (
          <div key={i} style={{ background: "#E1F5EE", borderLeft: "3px solid #0F6E56", padding: "14px 20px", borderRadius: "0 8px 8px 0", margin: "20px 0 24px" }}>
            <p style={{ fontSize: 14, color: "#085041", margin: 0, lineHeight: 1.65 }}>💡 {block.text}</p>
          </div>
        );
        if (block.type === "providers") return (
          <div key={i} style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 10, padding: "20px", margin: "28px 0" }}>
            {block.title && <p style={{ fontSize: 11, fontWeight: 600, color: "#888780", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 1 }}>{block.title}</p>}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {block.items.map((item, j) => (
                <a key={j} href={`https://${item.url}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 8, padding: "10px 14px", minWidth: 150 }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F6E56", marginBottom: 3 }}>{item.name} ↗</div>
                    <div style={{ fontSize: 11, color: "#888780" }}>{item.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
        return null;
      })}

      <div style={{ borderTop: "1px solid #E8E6DF", marginTop: 52, paddingTop: 32 }}>
        <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, margin: "0 0 20px", color: "#1a1a18" }}>Weitere Artikel</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {PUBLISHED_POSTS.filter(p => p.id !== post.id).slice(0, 3).map(p => (
            <div key={p.id} onClick={() => navigate("blog", null, null, p.slug)}
              style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 10, padding: "16px", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <p style={{ fontSize: 11, color: "#0F6E56", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.category}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px", lineHeight: 1.4 }}>{p.title}</p>
              <p style={{ fontSize: 12, color: "#B4B2A9", margin: 0 }}>{p.readTime} Lesezeit</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <button onClick={() => navigate("blog")} style={{ background: "#F5F4F0", color: "#5F5E5A", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontWeight: 500 }}>← Alle Artikel</button>
        <button onClick={() => navigate("sachbezug")} style={{ background: "#0F6E56", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Anbieter vergleichen →</button>
      </div>
    </div>
  );
}

const KATEGORIE_INFO = {
  essenszuschuss: {
    title: "Essenszuschuss für Mitarbeitende 2026",
    subtitle: "Bis zu €7,67 steuerfrei pro Arbeitstag — alle Modelle, Regeln und Anbieter erklärt",
    breadcrumb: "Essenszuschuss",
    providerTab: "essen",
    keyNumbers: [
      { label: "Max. pro Arbeitstag", value: "€7,67", note: "steuerfrei" },
      { label: "Sachbezugswert", value: "€4,57", note: "Mahlzeit 2026" },
      { label: "AG-Zuschuss", value: "bis €3,10", note: "täglich" },
      { label: "Bei 20 AT/Monat", value: "€153,40", note: "steuerfrei/Monat" },
    ],
    legalBox: {
      para: "§ 8 EStG + § 40 Abs. 2 Nr. 1 EStG",
      text: "Der steuerfreie Essenszuschuss basiert auf dem amtlichen Sachbezugswert (§ 8 Abs. 2 EStG). Arbeitgeber dürfen diesen Sachbezugswert (€4,57) zusätzlich um einen Arbeitgeberzuschuss von bis zu €3,10 pro Tag ergänzen. Die Differenz kann nach §40 Abs. 2 Nr. 1 EStG mit 25 % pauschal versteuert werden — ohne individuelle Lohnsteuer für Mitarbeitende.",
    },
    intro: "Der Essenszuschuss gehört zu den meistgenutzten Mitarbeiter-Benefits in Deutschland. Richtig eingesetzt, erhalten Mitarbeitende bis zu €153 steuerfreien Vorteil pro Monat — ohne dass Arbeitgeber oder Arbeitnehmer Steuern oder Sozialabgaben zahlen. Die wichtigste Erkenntnis: Es gibt nicht das eine richtige Modell, sondern eine Passung zur Unternehmensstruktur.",
    sections: [
      {
        heading: "Wie wird der Essenszuschuss berechnet?",
        body: "Der steuerfreie Essenszuschuss setzt sich aus zwei Komponenten zusammen: (1) Der amtliche Sachbezugswert 2026 beträgt €4,57 pro Mahlzeit und Arbeitstag. (2) Arbeitgeber können zusätzlich bis zu €3,10 täglich als steuerfreien Zuschuss gewähren. Zusammen ergibt das €7,67 pro Arbeitstag. Bei 20 Arbeitstagen im Monat entspricht das bis zu €153,40 steuerfreiem Vorteil pro Mitarbeitenden — monatlich, jeden Monat, dauerhaft. Wichtig: Maßgeblich sind die tatsächlichen Arbeitstage, nicht Kalender- oder Ferientage.",
      },
      {
        heading: "Die 5 Modelle für den Essenszuschuss",
        body: "Je nach Unternehmensstruktur und Arbeitsmodell eignen sich unterschiedliche Lösungen. Modell 1 — Lunch Card: Eine zweckgebundene Prepaid-Karte (Visa/Mastercard), die automatisch nur bei Lebensmittel-Händlern und Restaurants akzeptiert wird. Ideal für Büro-Teams. Modell 2 — App-basiert mit Belegupload: Mitarbeitende zahlen selbst, laden den Beleg hoch und erhalten eine Erstattung. Höchste Flexibilität — auch für Supermarkteinkäufe und Home-Office geeignet. Modell 3 — Papier-Gutscheine: Klassische Essensmarken. Einfach, aber wenig flexibel und logistisch aufwendig. Modell 4 — Eigene Kantine: Nur für Unternehmen ab ~200 MA wirtschaftlich sinnvoll. Der steuerfreie Betrag ist auf den Sachbezugswert (€4,57) begrenzt — kein zusätzlicher €3,10-Zuschuss. Modell 5 — Lieferdienst-Plattform: z.B. über Lieferando-Kooperationen. Praktisch für Remote-Teams, aber sorgfältige steuerliche Umsetzung erforderlich.",
      },
      {
        heading: "Was gilt es zu beachten? Die 4 wichtigsten Regeln",
        body: "Regel 1: Nur eine Mahlzeit pro Arbeitstag. Der Zuschuss gilt pro Tag und pro Mahlzeit — nicht pro Bon oder mehrfach täglich. Regel 2: Nur an tatsächlichen Arbeitstagen. Urlaub, Krankheit und Wochenenden zählen nicht. Keine Hochrechnung für freie Tage. Regel 3: Keine Doppelgewährung mit Verpflegungsmehraufwand. Wenn Mitarbeitende auf Dienstreise sind und Verpflegungspauschalen erhalten, entfällt der Essenszuschuss für diese Tage. Regel 4: Klare Einlösestruktur. Bei Karten-Lösungen muss die Händlerkategorie technisch beschränkt sein. Bei App-Lösungen müssen Belege klar dem Arbeitstag zugeordnet sein. Im Zweifel: Anrufungsauskunft beim Betriebsstättenfinanzamt (§ 42e EStG).",
      },
      {
        heading: "Essenszuschuss kombiniert mit anderen Benefits",
        body: "Der Essenszuschuss ist unabhängig vom allgemeinen Sachbezug (€50/Monat). Beide lassen sich gleichzeitig gewähren — und auch das Deutschlandticket nach §3 Nr. 15 EStG ist noch einmal zusätzlich möglich. Das optimale Dreier-Paket 2026: €153 Essenszuschuss + €50 Sachbezug + €58 Deutschlandticket = €261 steuerfreier Nettovorteil pro Mitarbeitenden monatlich. Kosten für Arbeitgeber: ca. €268–275 inkl. Plattformgebühren. Gesamteffizienz: über 95 %.",
      },
    ],
    faq: [
      { q: "Kann der Essenszuschuss als Bruttolohn-Umwandlung gewährt werden?", a: "Nein. Damit der Essenszuschuss steuerfrei bleibt, muss er zusätzlich zum regulären Arbeitslohn gewährt werden — nicht als Entgeltumwandlung. Gehaltsverzicht zugunsten von Essenszuschüssen führt zur Steuerpflicht." },
      { q: "Gilt der Essenszuschuss auch für Homeoffice?", a: "Ja — mit App-basierten Lösungen (Beleg-Upload) können auch Mitarbeitende im Homeoffice den Essenszuschuss nutzen, sofern sie Mahlzeiten kaufen und Belege einreichen. Supermarktbelege sind in der Regel anerkannt." },
      { q: "Wie hoch ist die Pauschalsteuer nach §40 Abs. 2?", a: "Der Arbeitgeber kann die Lohnsteuer auf den Essenszuschuss mit 25 % pauschalieren. In diesem Fall sind keine Sozialabgaben fällig und die Mitarbeitenden müssen nichts versteuern. Diese Option lohnt sich besonders bei Mitarbeitenden mit höherem Grenzsteuersatz." },
      { q: "Was passiert bei Überschreitung des Sachbezugswerts?", a: "Zahlt der Arbeitgeber mehr als €7,67/Tag, ist der übersteigende Betrag als steuerpflichtiger Arbeitslohn anzusetzen — entweder individuell oder pauschal nach §40 EStG." },
    ],
  },
  sachbezug: {
    title: "Steuerfreier Sachbezug 2026 — €50 pro Monat",
    subtitle: "Wie die €50-Freigrenze funktioniert, was erlaubt ist und welche Modelle es gibt",
    breadcrumb: "Sachbezug (€50/Monat)",
    providerTab: "sachbezug",
    keyNumbers: [
      { label: "Steuerfreie Freigrenze", value: "€50", note: "pro Monat" },
      { label: "Jährlich steuerfrei", value: "€600", note: "pro Mitarbeitenden" },
      { label: "Gehaltserhöhung-Äquivalent", value: "~€100", note: "brutto für €50 netto" },
      { label: "Effizienz vs. Gehaltserhöhung", value: "93 %", note: "vs. 35 %" },
    ],
    legalBox: {
      para: "§ 8 Abs. 2 Satz 11 EStG",
      text: "Sachbezüge bleiben bis zu €50/Monat lohnsteuer- und sozialversicherungsfrei, wenn sie dem Mitarbeitenden als Sach- oder Dienstleistung gewährt werden (§8 Abs. 2 EStG). Seit 2022 gilt verschärft: Gutscheine und Geldkarten müssen ZAG-konform sein — d.h. auf bestimmte Verwendungszwecke oder Regionen beschränkt. Bargeldersatz-Lösungen sind steuerpflichtig.",
    },
    intro: "Der steuerfreie Sachbezug nach §8 EStG ist der verbreitetste Benefit in Deutschland — und gleichzeitig der am meisten missverstandene. Die €50-Freigrenze klingt simpel, aber die Details entscheiden über Steuersicherheit. Dieser Guide erklärt, was erlaubt ist, was nicht, und welches Modell für euer Unternehmen passt.",
    sections: [
      {
        heading: "Freigrenze, kein Freibetrag — der wichtigste Unterschied",
        body: "Die €50 sind eine Freigrenze, kein Freibetrag. Das bedeutet: Wird der Betrag auch nur um einen Cent überschritten, wird der gesamte Betrag steuerpflichtig — nicht nur der übersteigende Teil. Beispiel: Ein Gutschein im Wert von €51 ist vollständig lohnsteuerpflichtig. Daher empfehlen wir immer eine Pufferregelung: Plattformen laden maximal €49,99 auf oder sperren automatisch nach €50.",
      },
      {
        heading: "Was ist erlaubt — und was nicht?",
        body: "Erlaubt (ZAG-konform): Sachbezugskarten, die nur bei definierten Händlerkategorien funktionieren (z.B. Einzelhandel, Tankstellen — aber nicht bei allen). Gutscheine für einen einzelnen Händler (z.B. ein Supermarkt, eine Buchhandlung). Regionalshopping-Gutscheine (auf eine Region und Händlerkategorie begrenzt). Dienstleistungen wie Fitness-Mitgliedschaften. Nicht erlaubt: Allgemein einlösbare Gutscheine (Amazon, Wunschgutschein, PAYBACK). PayPal-Guthaben, Kreditkartenguthaben. Bargeldauszahlungen. Tankgutscheine, die überall einlösbar sind (müssen stationshörig sein). Seit 2022 müssen Karten zudem den §1 Abs. 10 Nr. 10 ZAG erfüllen — dies prüfen alle seriösen Anbieter automatisch.",
      },
      {
        heading: "Karte vs. digitaler Gutschein — welches Modell passt?",
        body: "Prepaid-Karte (Visa/Mastercard): Physische Karte für Mitarbeitende, wird monatlich automatisch aufgeladen. Vorteil: einfach in der Nutzung, breit akzeptiert. Nachteil: regionale Einschränkungen bei manchen Anbietern, Jahresverträge. Anbieter: Givve, Spendit, Edenred, Pluxee. Digitale Gutscheine: Mitarbeitende wählen monatlich aus einem Katalog (~25–100 Partner). Vorteil: keine physische Karte, flexiblere Partnerwahl. Nachteil: gebunden an Gutschein-Katalog. Anbieter: Hrmony, Probonio. All-in-One App: Sachbezug, Essen und weitere Benefits in einer Plattform. Anbieter: Belonio, Billyard, LOFINO, Circula.",
      },
      {
        heading: "Sachbezug mit anderen Benefits kombinieren",
        body: "Kombination 1 — Sachbezug + Essenszuschuss: Beide sind unabhängig voneinander. €50 Sachbezug + €153 Essenszuschuss = €203 steuerfrei/Monat. Kombination 2 — Sachbezug + Deutschlandticket: Ebenfalls unabhängig. Der ÖPNV-Zuschuss nach §3 Nr. 15 EStG wird nicht auf den Sachbezug angerechnet. Kombination 3 — Sachbezug als Teil des Firmenfitness: Fitness-Mitgliedschaften bis €50/Monat können als Sachbezug gewährt werden — wenn keine separate Firmenfitness-Plattform genutzt wird.",
      },
    ],
    faq: [
      { q: "Kann der Sachbezug als Gehaltsumwandlung gewährt werden?", a: "Nein. Der Sachbezug muss zusätzlich zum vereinbarten Arbeitslohn gewährt werden. Eine Entgeltumwandlung — also Verzicht auf Gehalt zugunsten des Sachbezugs — macht den Vorteil steuerpflichtig." },
      { q: "Was ist der Unterschied zwischen Sachbezug und Essenszuschuss?", a: "Der Sachbezug (€50/Monat, §8 Abs. 2 EStG) ist für beliebige Sachleistungen. Der Essenszuschuss (§40 Abs. 2 Nr. 1 EStG) ist zweckgebunden für Mahlzeiten und kann höher sein (bis €153/Monat). Beide können gleichzeitig genutzt werden." },
      { q: "Was passiert, wenn ein Mitarbeitender in einem Monat krank ist?", a: "Der Sachbezug darf nur für Monate gewährt werden, in denen eine Beschäftigung besteht. Für Monate mit vollständiger Arbeitsunfähigkeit oder Elternzeit wird er in der Regel nicht gewährt. Manche Anbieter automatisieren dies durch HRIS-Integration." },
      { q: "Gilt die Freigrenze pro Arbeitgeber oder insgesamt?", a: "Die €50-Freigrenze gilt pro Arbeitgeber. Wer mehrere Jobs hat, kann theoretisch von jedem Arbeitgeber €50 steuerfrei erhalten. Allerdings muss jeder Arbeitgeber unabhängig prüfen, ob die Freigrenze eingehalten wird." },
    ],
  },
  mobilitaet: {
    title: "Mobilitäts-Benefits für Mitarbeitende 2026",
    subtitle: "ÖPNV, Sachbezug, Dienstrad — drei steuerfreie Wege zur modernen Mobilität",
    breadcrumb: "Mobilität & Jobrad",
    providerTab: "jobrad",
    keyNumbers: [
      { label: "Deutschlandticket", value: "€58", note: "komplett steuerfrei" },
      { label: "Sachbezug Mobilität", value: "€50", note: "pro Monat steuerfrei" },
      { label: "Dienstrad geldw. Vorteil", value: "0,25 %", note: "des Listenpreises" },
      { label: "Max. steuerfrei (kombiniert)", value: "€108+", note: "pro Monat" },
    ],
    legalBox: {
      para: "§ 3 Nr. 15 EStG + § 8 Abs. 2 EStG + § 6 Abs. 1 Nr. 4 EStG",
      text: "Für Mobilitäts-Benefits gelten drei verschiedene gesetzliche Grundlagen: (1) §3 Nr. 15 EStG: ÖPNV-Zuschüsse sind ohne Betragsbegrenzung steuer- und sozialversicherungsfrei. (2) §8 Abs. 2 EStG: Sachbezugsfreigrenze €50/Monat für z.B. Tankgutscheine oder Carsharing. (3) §6 Abs. 1 Nr. 4 EStG: Dienstrad-Leasing mit nur 0,25 % des Listenpreises als geldwertem Vorteil (Elektro/Pedelec).",
    },
    intro: "Mobilität ist nach Gehalt und Sachbezug der drittgrößte Benefit-Wunsch in Deutschland. Das Gute: Der Gesetzgeber fördert Mobilitäts-Benefits besonders stark — mit drei verschiedenen steuerfreien Instrumenten, die sich sogar kombinieren lassen. Das Ergebnis: Unternehmen können über €100/Monat steuerfrei in die Mobilität ihrer Mitarbeitenden investieren.",
    sections: [
      {
        heading: "Säule 1: Das Deutschlandticket als Jobticket (§3 Nr. 15 EStG)",
        body: "Das Deutschlandticket kostet aktuell €58/Monat und gilt für den gesamten ÖPNV in Deutschland. Arbeitgeber können es vollständig steuerfrei übernehmen — und das ohne Betragsgrenze und ohne Anrechnung auf den allgemeinen Sachbezug. Besonderheit: Subventioniert der Arbeitgeber mindestens 25 % der Ticketkosten, erhält der Mitarbeitende einen zusätzlichen 5 %-Rabatt vom Staat — der Preis sinkt auf ~€55. Wichtige Voraussetzung: Das Ticket muss zusätzlich zum Gehalt gewährt werden, nicht als Entgeltumwandlung. Anrechnung: Der ÖPNV-Zuschuss wird auf die Entfernungspauschale angerechnet — Mitarbeitende können diesen Betrag nicht zusätzlich in der Steuererklärung absetzen.",
      },
      {
        heading: "Säule 2: Mobilitätsbudget als Sachbezug (§8 Abs. 2 EStG)",
        body: "Neben dem ÖPNV-Zuschuss können Arbeitgeber €50/Monat als allgemeinen Mobilitäts-Sachbezug gewähren — für Tankgutscheine, Carsharing, Bike-Sharing oder weitere Mobilitätsformen. Dieser Betrag ist unabhängig vom Deutschlandticket nutzbar, solange er als ZAG-konformer Sachbezug gewährt wird (nicht als Bargeld). Tankgutscheine gelten nur dann als steuerfreier Sachbezug, wenn sie für eine bestimmte Tankstelle oder Tankstellenkette ausgestellt sind — generische Kraftstoffgutscheine sind nicht ZAG-konform.",
      },
      {
        heading: "Säule 3: Dienstrad-Leasing (§6 Abs. 1 Nr. 4 EStG)",
        body: "Dienstrad-Leasing ist seit der 0,25 %-Regelung für Elektrofahrräder einer der beliebtesten Benefits in Deutschland. Statt des normalen 1 %-Werts (für Pkw) wird nur 0,25 % des Listenpreises als geldwerter Vorteil angesetzt. Beispiel: Fahrrad mit Listenpreis €3.000 → geldwerter Vorteil: €7,50/Monat. Steuer darauf (42 % Grenzsteuersatz): ca. €3,15/Monat. Für den Mitarbeitenden kostet das Dienstrad effektiv sehr wenig — und der Arbeitgeber spart gegenüber einer Lohnerhöhung erheblich. Über 50.000 Unternehmen in Deutschland nutzen diesen Benefit bereits. Wichtig: Das Leasing muss über den Arbeitgeber abgewickelt werden (Arbeitgeber least, Mitarbeitender nutzt).",
      },
      {
        heading: "Kombination: So viel ist möglich",
        body: "Alle drei Säulen können gleichzeitig genutzt werden. Maximale steuerfreie Kombination 2026: (1) Deutschlandticket: €58/Monat steuerfrei. (2) Mobilitätssachbezug: €50/Monat steuerfrei (z.B. für Tanken oder Carsharing). (3) Dienstrad-Leasing: individuell nach Listenpreis. Gesamt aus Punkt 1 + 2 allein: €108/Monat oder €1.296/Jahr steuerfrei. Hinzu kommt das Dienstrad als separate Leasinglösung. Für Unternehmen mit Nachhaltigkeitsstrategie ist Mobilität damit der stärkste steuerliche Hebel nach dem Essenszuschuss.",
      },
    ],
    faq: [
      { q: "Wird das Deutschlandticket auf den €50-Sachbezug angerechnet?", a: "Nein. Der ÖPNV-Zuschuss nach §3 Nr. 15 EStG und der allgemeine Sachbezug nach §8 Abs. 2 EStG sind zwei völlig unabhängige steuerliche Instrumente. Beide können gleichzeitig und addiert gewährt werden." },
      { q: "Gilt die 0,25 %-Regelung auch für normale Fahrräder?", a: "Ja — seit 2019 gilt die 0,25 %-Regelung sowohl für Elektrofahrräder/Pedelecs als auch für normale Fahrräder, sofern sie als Dienstfahrräder überlassen werden. Voraussetzung: keine Zulassungspflicht (max. 25 km/h Motorunterstützung)." },
      { q: "Kann der Arbeitgeber das Dienstrad-Leasing für alle oder nur für ausgewählte Mitarbeitende anbieten?", a: "Das Leasing kann grundsätzlich für alle oder ausgewählte Gruppen angeboten werden. Wichtig: Es darf keine willkürliche Diskriminierung geben — sachliche Kriterien (z.B. nur für Mitarbeitende mit festem Arbeitsort) sind zulässig." },
      { q: "Was passiert mit dem Dienstrad bei Kündigung?", a: "Endet das Arbeitsverhältnis vor Ende der Leasinglaufzeit, muss eine Regelung gefunden werden. Üblicherweise kann der Mitarbeitende das Rad zum Restwert übernehmen oder das Leasing wird aufgelöst. Die meisten Anbieter (Jobrad, Bikeleasing-Service) haben standardisierte Regelungen dafür." },
    ],
  },
  rabatte: {
    title: "Mitarbeiterrabatte & Corporate Benefits 2026",
    subtitle: "Geldwerter Vorteil, Rabattfreibetrag und steuerfreie Plattformen — alles erklärt",
    breadcrumb: "Mitarbeiterrabatte",
    providerTab: "rabatte",
    keyNumbers: [
      { label: "Rabattfreibetrag (eigene Produkte)", value: "€1.080", note: "jährlich steuerfrei" },
      { label: "Sachbezugsfreigrenze (externe)", value: "€50", note: "pro Monat" },
      { label: "Bewertungsabschlag", value: "4 %", note: "auf Endverbraucherpreis" },
      { label: "Corporate Benefits Portale", value: "kostenlos", note: "für Arbeitgeber" },
    ],
    legalBox: {
      para: "§ 8 Abs. 3 EStG + § 8 Abs. 2 EStG",
      text: "Für Mitarbeiterrabatte gelten zwei grundlegend verschiedene Rechtsgrundlagen: (1) §8 Abs. 3 EStG: Rabatte auf eigene Produkte/Dienstleistungen des Arbeitgebers — €1.080 jährlicher Freibetrag. (2) §8 Abs. 2 EStG: Rabatte/Sachleistungen externer Unternehmen (Corporate Benefits Portale) — €50 monatliche Freigrenze. Beide Regelungen sind unabhängig voneinander anwendbar.",
    },
    intro: "Mitarbeiterrabatte sind ein häufig unterschätztes Steuer-Instrument. Mit dem richtigen Setup können Mitarbeitende jährlich über €1.000 steuerfrei profitieren — und das mit minimalem Aufwand für Arbeitgeber. Der Schlüssel: das Verständnis der zwei grundlegend verschiedenen Rechtswege.",
    sections: [
      {
        heading: "Weg 1: Rabatte auf eigene Produkte (§8 Abs. 3 EStG)",
        body: "Dieser Weg gilt für Unternehmen, die eigene Produkte oder Dienstleistungen verkaufen und diese vergünstigt an Mitarbeitende abgeben. Die Berechnung: (1) Zunächst wird der übliche Endverbraucherpreis um 4 % gemindert (Bewertungsabschlag). (2) Dann gilt ein jährlicher Freibetrag von €1.080. Alles bis zur Freibetragsgrenze ist steuerfrei. Beispiel: Ein Mitarbeitender eines Elektronikhändlers kauft ein Laptop zum regulären Preis von €1.000 für €700 (30 % Rabatt). Bewertung: €1.000 × 0,96 = €960 — Rabatt: €960 − €700 = €260 → steuerfrei (unter €1.080). Dieser Weg ist besonders relevant für Handel, Gastronomie, Banken, Versicherungen und Automobilhersteller.",
      },
      {
        heading: "Weg 2: Corporate Benefits Portale (§8 Abs. 2 EStG)",
        body: "Corporate Benefits Portale wie FutureBens, Corporate Benefits oder Benefits.me bieten Rabatte bei externen Marken und Unternehmen — von Elektronik über Mode bis zu Reisen. Steuerlich gilt hier die Sachbezugsfreigrenze von €50/Monat. Da die Rabatte auf externe Anbieter in der Praxis meist nicht als direkte Arbeitgeberleistung gelten (die Marken selbst gewähren die Rabatte), entstehen in der Regel keine steuerpflichtigen geldwerten Vorteile für Mitarbeitende. Wichtig für die steuerliche Einordnung: Wenn der Arbeitgeber selbst für den Rabatt zahlt oder ihn dem Mitarbeitenden erstattet, liegt eine Arbeitgeberleistung vor. Wenn die Plattform kostenlos ist und Rabatte direkt zwischen Marke und Mitarbeitenden abgewickelt werden, entsteht in der Regel kein steuerpflichtiger Vorteil.",
      },
      {
        heading: "Was ist der geldwerte Vorteil und wann ist er steuerpflichtig?",
        body: "Der geldwerte Vorteil entsteht, wenn Mitarbeitende Sachleistungen, Rabatte oder andere Vorteile durch ihr Arbeitsverhältnis erhalten, die sie sonst bezahlen müssten. Er ist immer dann steuerpflichtig, wenn: (1) er €50/Monat übersteigt (bei externen Leistungen nach §8 Abs. 2) oder (2) er €1.080/Jahr übersteigt (bei eigenen Produkten nach §8 Abs. 3) oder (3) er als Bargeld oder Bargeldersatz gewährt wird. Nicht steuerpflichtig: Vorteile, die der Markt ohnehin jedem Verbraucher anbietet (sog. 'Jedermann-Rabatte'). Typisches Beispiel: Rabattcodes, die öffentlich zugänglich sind.",
      },
      {
        heading: "Kombination: Rabatte + Sachbezug + Essenszuschuss",
        body: "Mitarbeiterrabatte sind ergänzend zu allen anderen steuerfreien Benefits nutzbar. Die optimale Kombination 2026: Sachbezug €50/Monat + Essenszuschuss bis €153/Monat + Deutschlandticket €58/Monat + Corporate Benefits Portal (Rabatte ohne steuerpflichtigen Vorteil) + Rabattfreibetrag €1.080/Jahr (bei eigenen Produkten). Gesamter steuerfreier Jahresvorteil: über €4.000 pro Mitarbeitenden. Der Einstieg empfiehlt sich über eine kostenlose Corporate Benefits Plattform — kein Risiko, kein Aufwand, sofortige Wirkung.",
      },
    ],
    faq: [
      { q: "Ist ein Corporate Benefits Portal immer kostenlos für Arbeitgeber?", a: "Die meisten bekannten Portale (FutureBens, Corporate Benefits, Benefits.me) sind für Arbeitgeber vollständig kostenlos — die Finanzierung läuft über die Marken, die Listungsgebühren zahlen. Für Arbeitgeber entsteht kein finanzieller Aufwand." },
      { q: "Was ist der Unterschied zwischen Freibetrag und Freigrenze?", a: "Ein Freibetrag (€1.080 bei §8 Abs. 3) bedeutet: Der Betrag bis zur Grenze ist steuerfrei, alles darüber wird versteuert. Eine Freigrenze (€50 bei §8 Abs. 2) bedeutet: Bei Überschreitung wird der gesamte Betrag — nicht nur der übersteigende Teil — steuerpflichtig." },
      { q: "Kann ich als Arbeitgeber im Einzelhandel den §8 Abs. 3-Freibetrag nutzen?", a: "Ja — und das ist besonders attraktiv für Handel, Gastronomie, Banken, Verlage, Automobilhersteller und andere Branchen mit eigenen Produkten. Mitarbeitende können so jährlich bis zu €1.080 steuerfrei auf eigene Unternehmensprodukte einsparen." },
      { q: "Was gilt für Gutscheine von Partnerunternehmen?", a: "Gutscheine von Partnerunternehmen zählen als externe Sachleistungen nach §8 Abs. 2 EStG und unterliegen der €50/Monat-Freigrenze. Sie müssen ZAG-konform sein (eingeschränkter Verwendungszweck), um als steuerfrei zu gelten." },
    ],
  },
};

function KategorieInfoPage({ katSlug, navigate }) {
  const data = KATEGORIE_INFO[katSlug];
  if (!data) return null;
  const G = "#0F6E56";
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 24px" }}>
        <span style={{ cursor: "pointer", color: G }} onClick={() => navigate("home")}>Home</span>
        {" · "}
        <span style={{ cursor: "pointer", color: G }} onClick={() => navigate("sachbezug", data.providerTab)}>Anbieter vergleichen</span>
        {" · "}{data.breadcrumb}
      </p>

      {/* Hero */}
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 400, color: "#1a1a18", margin: "0 0 14px", lineHeight: 1.2 }}>{data.title}</h1>
        <p style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.7, maxWidth: 720, margin: "0 0 32px" }}>{data.subtitle}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {data.keyNumbers.map((n, i) => (
            <div key={i} style={{ background: i === 0 ? G : "#FAFAF7", border: `1px solid ${i === 0 ? G : "#E8E6DF"}`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: i === 0 ? "#fff" : G, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{n.value}</div>
              <div style={{ fontSize: 12, color: i === 0 ? "rgba(255,255,255,0.75)" : "#888780", marginTop: 4 }}>{n.note}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? "#fff" : "#1a1a18", marginTop: 8 }}>{n.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Box */}
      <div style={{ background: "#E1F5EE", border: "1px solid #9FE1CB", borderRadius: 12, padding: "20px 24px", marginBottom: 48, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ background: G, color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", marginTop: 2 }}>{data.legalBox.para}</div>
        <p style={{ fontSize: 14, color: "#085041", lineHeight: 1.7, margin: 0 }}>{data.legalBox.text}</p>
      </div>

      {/* Intro */}
      <p style={{ fontSize: 16, color: "#5F5E5A", lineHeight: 1.8, maxWidth: 780, marginBottom: 48 }}>{data.intro}</p>

      {/* Sections */}
      {data.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < data.sections.length - 1 ? "1px solid #E8E6DF" : "none" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, color: "#1a1a18", margin: "0 0 16px" }}>{s.heading}</h2>
          <p style={{ fontSize: 15, color: "#5F5E5A", lineHeight: 1.8, margin: 0, maxWidth: 820 }}>{s.body}</p>
        </section>
      ))}

      {/* FAQ */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>Häufige Fragen</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.faq.map((f, i) => (
            <div key={i} style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 10px" }}>{f.q}</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
        <button onClick={() => navigate("sachbezug", data.providerTab)}
          style={{ background: G, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Anbieter vergleichen →
        </button>
        <button onClick={() => { window.gtag?.("event", "lead_funnel_start", { method: "kinfo_page" }); navigate("lead"); }}
          style={{ background: "#fff", color: G, border: `2px solid ${G}`, padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Kostenloses Angebot →
        </button>
      </div>
    </div>
  );
}

function HubPage({ navigate }) {
  const categories = [
    { label: "Sachbezug (€50/Monat)", tab: "sachbezug", desc: "Steuerfreie Sachbezugskarten & Apps", count: 11 },
    { label: "Essenszuschuss", tab: "essen", desc: "Digitale Gutscheine & Lunch Cards", count: 10 },
    { label: "Mitarbeiterrabatte", tab: "rabatte", desc: "Corporate-Benefits-Portale & Rabattplattformen", count: 3 },
    { label: "Mobilität & Jobrad", tab: "jobrad", desc: "Dienstrad-Leasing & Mobilitätsbudget", count: 5 },
    { label: "Firmenfitness", tab: "fitness", desc: "Fitness-Netzwerke & Studio-Zugänge", count: 4 },
    { label: "Mental Health", tab: "mental", desc: "Psychologische Unterstützung & Coaching", count: 3 },
  ];
  const alternativeLinks = Object.entries(ALTERNATIVE_PAGES).map(([slug, d]) => ({ slug, name: d.providerName, alts: d.alternatives.length }));
  const versusLinks = Object.entries(VERSUS_PAGES).map(([slug, d]) => {
    const pA = PROVIDERS.find(p => p.id === d.aId);
    const pB = PROVIDERS.find(p => p.id === d.bId);
    return { slug, label: `${pA?.name} vs. ${pB?.name}` };
  });
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 24px" }}>
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("home")}>Home</span>
        {" · "}Alle Vergleiche
      </p>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: "#1a1a18", margin: "0 0 16px", lineHeight: 1.2 }}>
          Alle Anbieter-Vergleiche & Alternativen 2026
        </h1>
        <p style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.7, maxWidth: 720, margin: 0 }}>
          Unabhängige Vergleiche für Mitarbeiter-Benefits in Deutschland — nach Kategorie, im Direktvergleich A vs. B, und mit Alternativen für die bekanntesten Anbieter.
        </p>
      </div>

      <section style={{ marginBottom: 52 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 20px" }}>Vergleiche nach Kategorie</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {categories.map(c => (
            <div key={c.tab} onClick={() => navigate("sachbezug", c.tab)}
              style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 12, padding: "20px 24px", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a18", margin: "0 0 6px" }}>{c.label}</h3>
              <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 12px", lineHeight: 1.5 }}>{c.desc}</p>
              <span style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>{c.count} Anbieter</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 52 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>Direktvergleiche A vs. B</h2>
        <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 20px" }}>Zwei Anbieter, ein Urteil — alle Kriterien auf einen Blick.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {versusLinks.map(v => (
            <div key={v.slug} onClick={() => navigate("versus", v.slug)}
              style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 10, padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>{v.label}</span>
              <span style={{ fontSize: 13, color: "#0F6E56", fontWeight: 600 }}>→</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 52 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>Alternativen für bekannte Anbieter</h2>
        <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 20px" }}>Du nutzt bereits einen Anbieter und suchst Alternativen? Hier findest du unabhängige Gegenüberstellungen.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {alternativeLinks.map(a => (
            <div key={a.slug} onClick={() => navigate("alternative", a.slug)}
              style={{ background: "#fff", border: "1px solid #E8E6DF", borderRadius: 10, padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>{a.name} Alternative</span>
                <span style={{ fontSize: 12, color: "#888780", display: "block", marginTop: 2 }}>{a.alts} Alternativen im Vergleich</span>
              </div>
              <span style={{ fontSize: 13, color: "#0F6E56", fontWeight: 600 }}>→</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#0F6E56", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", margin: "0 0 12px" }}>Kein passender Vergleich dabei?</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>Unser Beratungs-Funnel findet in 8 Fragen den passenden Anbieter für eure Anforderungen — kostenlos und unverbindlich.</p>
        <button onClick={() => { window.gtag?.("event", "lead_funnel_start", { method: "hub_page" }); navigate("lead"); }}
          style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
          Kostenloses Angebot anfordern →
        </button>
      </div>
    </div>
  );
}

function AlternativePage({ altSlug, navigate }) {
  const data = ALTERNATIVE_PAGES[altSlug];
  if (!data) return (
    <div style={{ maxWidth: 680, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontWeight: 400 }}>Seite nicht gefunden</h1>
      <p style={{ color: "#0F6E56", cursor: "pointer", fontSize: 15 }} onClick={() => navigate("home")}>← Zurück zur Startseite</p>
    </div>
  );
  const mainProvider = PROVIDERS.find(p => p.id === data.providerId);
  const alternatives = data.alternatives.map(id => PROVIDERS.find(p => p.id === id)).filter(Boolean);
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 24px" }}>
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("home")}>Home</span>
        {" · "}
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("provider", "alle", mainProvider?.id)}>{mainProvider?.name}</span>
        {" · "}{mainProvider?.name} Alternative
      </p>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, color: "#1a1a18", margin: "0 0 16px", lineHeight: 1.2 }}>
          {mainProvider?.name} Alternative 2026 — Die besten Alternativen im Vergleich
        </h1>
        <p style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.7, maxWidth: 720, margin: 0 }}>{data.intro}</p>
      </div>
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>
          Warum suchen Unternehmen eine {mainProvider?.name}-Alternative?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {data.reasons.map((r, i) => (
            <div key={i} style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FBEAF0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 16, color: "#993556", fontWeight: 700 }}>!</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "0 0 8px" }}>{r.title}</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 8px" }}>
          Die besten {mainProvider?.name}-Alternativen 2026
        </h2>
        <p style={{ fontSize: 15, color: "#5F5E5A", margin: "0 0 24px" }}>Alle Alternativen im direkten Vergleich — Preis, Flexibilität, Stärken.</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#FAFAF7" }}>
                {["Anbieter", "Typ", "Preis ab", "Kündbarkeit", "Stärke"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "#1a1a18", borderBottom: "2px solid #E8E6DF" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alternatives.map((p, i) => {
                const sb = SACHBEZUG_DETAILS[p.id];
                const laufzeit = sb?.laufzeit || (p.fitness ? "Jahresvertrag" : "Monatlich kündbar");
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #E8E6DF", cursor: "pointer" }}
                    onClick={() => navigate("provider", "alle", p.id)}
                    onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                    onMouseOut={e => e.currentTarget.style.background = ""}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#0F6E56" }}>{p.name}</td>
                    <td style={{ padding: "14px 16px", color: "#5F5E5A" }}>{p.type}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 500 }}>{p.priceFrom > 0 ? `€${p.priceFrom.toFixed(2).replace(".", ",")}/MA` : "Kostenlos"}</td>
                    <td style={{ padding: "14px 16px" }}><LaufzeitBadge laufzeit={laufzeit} /></td>
                    <td style={{ padding: "14px 16px", color: "#5F5E5A", fontSize: 13 }}>{p.differenzierung}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>Detailansicht der Alternativen</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {alternatives.map((p, i) => (
            <div key={p.id} onClick={() => navigate("provider", "alle", p.id)}
              style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 14, padding: "24px", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              {i === 0 && <div style={{ background: "#0F6E56", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, display: "inline-block", marginBottom: 12 }}>Empfehlung #1</div>}
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a18", margin: "0 0 4px" }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: "#888780", margin: "0 0 16px" }}>{p.type} · {p.priceFrom > 0 ? `ab €${p.priceFrom.toFixed(2).replace(".", ",")}/MA` : "Kostenlos"}</p>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.6, margin: "0 0 16px" }}>{p.differenzierung}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {p.highlights.map(h => <span key={h} style={{ fontSize: 12, background: "#E1F5EE", color: "#085041", padding: "3px 8px", borderRadius: 4 }}>{h}</span>)}
              </div>
              <span style={{ fontSize: 14, color: "#0F6E56", fontWeight: 600 }}>Anbieter ansehen →</span>
            </div>
          ))}
        </div>
      </section>
      <div style={{ background: "#0F6E56", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", margin: "0 0 12px" }}>Nicht sicher, welche Alternative passt?</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>Wir analysieren kostenlos, welcher Anbieter zu euren Anforderungen und eurem Budget passt.</p>
        <button onClick={() => { window.gtag?.("event", "lead_funnel_start", { method: "alternative_page" }); navigate("lead"); }}
          style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
          Kostenloses Angebot anfordern →
        </button>
      </div>
    </div>
  );
}

function VersusPage({ vsSlug, navigate }) {
  const data = VERSUS_PAGES[vsSlug];
  if (!data) return (
    <div style={{ maxWidth: 680, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontWeight: 400 }}>Seite nicht gefunden</h1>
      <p style={{ color: "#0F6E56", cursor: "pointer", fontSize: 15 }} onClick={() => navigate("home")}>← Zurück zur Startseite</p>
    </div>
  );
  const pA = PROVIDERS.find(p => p.id === data.aId);
  const pB = PROVIDERS.find(p => p.id === data.bId);
  const winsA = data.criteria.filter(c => c.winner === "a").length;
  const winsB = data.criteria.filter(c => c.winner === "b").length;
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: 13, color: "#888780", margin: "0 0 24px" }}>
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("home")}>Home</span>
        {" · "}
        <span style={{ cursor: "pointer", color: "#0F6E56" }} onClick={() => navigate("sachbezug")}>Vergleich</span>
        {" · "}{pA?.name} vs. {pB?.name}
      </p>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, color: "#1a1a18", margin: "0 0 16px", lineHeight: 1.2 }}>
          {pA?.name} vs. {pB?.name} — Direktvergleich 2026
        </h1>
        <p style={{ fontSize: 17, color: "#5F5E5A", lineHeight: 1.7, maxWidth: 720, margin: 0 }}>{data.intro}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 12, alignItems: "center", marginBottom: 48 }}>
        <div onClick={() => navigate("provider", "alle", pA.id)} style={{ background: "#FAFAF7", border: `2px solid ${winsA >= winsB ? "#0F6E56" : "#E8E6DF"}`, borderRadius: 16, padding: "24px", textAlign: "center", cursor: "pointer" }}>
          <p style={{ fontSize: 12, color: "#888780", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{pA.type}</p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a18", margin: "0 0 12px" }}>{pA.name}</h2>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#0F6E56", lineHeight: 1 }}>{winsA}</div>
          <p style={{ fontSize: 12, color: "#888780", margin: "6px 0 0" }}>Kriterien gewonnen</p>
        </div>
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 15, color: "#B4B2A9" }}>VS</div>
        <div onClick={() => navigate("provider", "alle", pB.id)} style={{ background: "#FAFAF7", border: `2px solid ${winsB > winsA ? "#0F6E56" : "#E8E6DF"}`, borderRadius: 16, padding: "24px", textAlign: "center", cursor: "pointer" }}>
          <p style={{ fontSize: 12, color: "#888780", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{pB.type}</p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a18", margin: "0 0 12px" }}>{pB.name}</h2>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#0F6E56", lineHeight: 1 }}>{winsB}</div>
          <p style={{ fontSize: 12, color: "#888780", margin: "6px 0 0" }}>Kriterien gewonnen</p>
        </div>
      </div>
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>Kriterien im Vergleich</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#FAFAF7" }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 500, color: "#888780", borderBottom: "2px solid #E8E6DF", width: "28%" }}>Kriterium</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "#1a1a18", borderBottom: "2px solid #E8E6DF" }}>{pA.name}</th>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "#1a1a18", borderBottom: "2px solid #E8E6DF" }}>{pB.name}</th>
              </tr>
            </thead>
            <tbody>
              {data.criteria.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #E8E6DF", background: i % 2 === 0 ? "#fff" : "#FAFAF7" }}>
                  <td style={{ padding: "12px 16px", color: "#888780", fontWeight: 500 }}>{c.label}</td>
                  <td style={{ padding: "12px 16px", fontWeight: c.winner === "a" ? 700 : 400, color: c.winner === "a" ? "#0F6E56" : "#1a1a18" }}>
                    {c.a}{c.winner === "a" && <span style={{ marginLeft: 8, fontSize: 11, background: "#E1F5EE", color: "#085041", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>✓</span>}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: c.winner === "b" ? 700 : 400, color: c.winner === "b" ? "#0F6E56" : "#1a1a18" }}>
                    {c.b}{c.winner === "b" && <span style={{ marginLeft: 8, fontSize: 11, background: "#E1F5EE", color: "#085041", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>✓</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#1a1a18", margin: "0 0 24px" }}>Für wen eignet sich welcher Anbieter?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[{ p: pA, text: data.forA, id: data.aId }, { p: pB, text: data.forB, id: data.bId }].map(({ p, text, id }) => (
            <div key={id} onClick={() => navigate("provider", "alle", id)}
              style={{ background: "#FAFAF7", border: "1px solid #E8E6DF", borderRadius: 14, padding: "24px", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#0F6E56"}
              onMouseOut={e => e.currentTarget.style.borderColor = "#E8E6DF"}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F6E56", margin: "0 0 12px" }}>{p.name} wählen wenn…</h3>
              <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.7, margin: "0 0 16px" }}>{text}</p>
              <span style={{ fontSize: 14, color: "#0F6E56", fontWeight: 600 }}>{p.name} ansehen →</span>
            </div>
          ))}
        </div>
      </section>
      <div style={{ background: "#0F6E56", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", margin: "0 0 12px" }}>Noch unentschieden?</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>Wir helfen euch kostenlos, den passenden Anbieter für eure spezifischen Anforderungen zu finden.</p>
        <button onClick={() => { window.gtag?.("event", "lead_funnel_start", { method: "versus_page" }); navigate("lead"); }}
          style={{ background: "#fff", color: "#0F6E56", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
          Kostenloses Angebot anfordern →
        </button>
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  const compareLinks = [
    { label: "Sachbezug-Anbieter", tab: "sachbezug" },
    { label: "Essenszuschuss", tab: "essen" },
    { label: "Mitarbeiterrabatte", tab: "rabatte" },
    { label: "Mobilität & Jobrad", tab: "jobrad" },
    { label: "Alle Anbieter", tab: "alle" },
  ];
  const altLinks = [
    { label: "Edenred Alternative", slug: "edenred" },
    { label: "Hrmony Alternative", slug: "hrmony" },
    { label: "EGYM Wellpass Alternative", slug: "egym-wellpass" },
    { label: "Hrmony vs. Edenred", vs: "hrmony-vs-edenred" },
    { label: "EGYM Wellpass vs. Hansefit", vs: "egym-wellpass-vs-hansefit" },
  ];
  const resourceLinks = [
    { label: "Kostenloses Angebot", page: "lead", tab: null },
    { label: "Steuerrechner", page: "rechner", tab: null },
    { label: "Steuerfreie Benefits Übersicht", page: "steuer", tab: null },
    { label: "Benefits-Guide 2026", page: "guide", tab: null },
    { label: "§8 EStG erklärt", page: "sachbezug", tab: "sachbezug" },
    { label: "Alle Kategorien", page: "home", tab: null },
  ];
  const kinfoLinks = [
    { label: "Essenszuschuss erklärt", tab: "essenszuschuss" },
    { label: "Sachbezug §8 EStG", tab: "sachbezug" },
    { label: "Mobilität & §3 Nr. 15 EStG", tab: "mobilitaet" },
    { label: "Mitarbeiterrabatte", tab: "rabatte" },
  ];

  return (
    <footer style={{ background: "#1a1a18", color: "#888780", padding: "48px 24px", marginTop: 56 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <NewsletterSignup />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Instrument Serif', Georgia, serif" }}>B</div>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, color: "#D3D1C7" }}>benefitcheck.net</span>
            </div>
            <p style={{ fontSize: 13, color: "#5F5E5A", maxWidth: 300, lineHeight: 1.6, margin: 0 }}>Das Vergleichsportal für Mitarbeiter-Benefits im DACH-Raum. Sachbezug, Mitarbeiterrabatte, Essenszuschuss und mehr.</p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Vergleiche</p>
              {compareLinks.map(l => (
                <p key={l.label} onClick={() => navigate("sachbezug", l.tab)} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                  onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"}
                  onMouseOut={e => e.currentTarget.style.color = "#888780"}>{l.label}</p>
              ))}
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "16px 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Alternativen & A vs. B</p>
              <p onClick={() => navigate("hub")} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"} onMouseOut={e => e.currentTarget.style.color = "#888780"}>Alle Vergleiche →</p>
              {altLinks.map(l => (
                <p key={l.label}
                  onClick={() => l.vs ? navigate("versus", l.vs) : navigate("alternative", l.slug)}
                  style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                  onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"}
                  onMouseOut={e => e.currentTarget.style.color = "#888780"}>{l.label}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Ressourcen</p>
              {resourceLinks.map(l => (
                <p key={l.label} onClick={() => navigate(l.page, l.tab)} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                  onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"}
                  onMouseOut={e => e.currentTarget.style.color = "#888780"}>{l.label}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 1 }}>Erklärseiten</p>
              {kinfoLinks.map(l => (
                <p key={l.tab} onClick={() => navigate("kinfo", l.tab)} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                  onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"}
                  onMouseOut={e => e.currentTarget.style.color = "#888780"}>{l.label}</p>
              ))}
              <p style={{ fontSize: 12, fontWeight: 600, color: "#B4B2A9", margin: "16px 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Blog</p>
              {PUBLISHED_POSTS.map(p => (
                <p key={p.id} onClick={() => navigate("blog", null, null, p.slug)} style={{ fontSize: 13, margin: "0 0 8px", color: "#888780", cursor: "pointer" }}
                  onMouseOver={e => e.currentTarget.style.color = "#D3D1C7"}
                  onMouseOut={e => e.currentTarget.style.color = "#888780"}>{p.title}</p>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2C2C2A", marginTop: 32, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#5F5E5A", margin: 0 }}>© 2026 benefitcheck.net · Alle Angaben ohne Gewähr</p>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "#5F5E5A" }}>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("impressum")}>Impressum</span>
            <span style={{ cursor: "pointer" }} onClick={() => navigate("datenschutz")}>Datenschutz</span>
            <span>Für Anbieter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const initial = parseRoute();
  const [page, setPage] = useState(initial.page);
  const [compareTab, setCompareTab] = useState(initial.tab);
  const [currentProviderId, setCurrentProviderId] = useState(initial.providerId);
  const [currentBlogSlug, setCurrentBlogSlug] = useState(initial.blogSlug);

  useEffect(() => {
    const onPop = () => {
      const r = parseRoute();
      setPage(r.page);
      setCompareTab(r.tab);
      setCurrentProviderId(r.providerId);
      setCurrentBlogSlug(r.blogSlug);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(targetPage, tab = "alle", providerId = null, blogSlug = null) {
    const path = buildPath(targetPage, tab, providerId, blogSlug);
    window.history.pushState({}, "", path);
    setPage(targetPage);
    if (tab !== null) setCompareTab(tab);
    setCurrentProviderId(providerId);
    setCurrentBlogSlug(blogSlug);
    window.scrollTo(0, 0);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#1a1a18", background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <Header page={page} navigate={navigate} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "sachbezug" && <SachbezugPage navigate={navigate} initialTab={compareTab} />}
      {page === "provider" && <ProviderPage providerId={currentProviderId} navigate={navigate} />}
      {page === "rechner" && <RechnerPage navigate={navigate} />}
      {page === "steuer" && <SteuerPage navigate={navigate} />}
      {page === "impressum" && <ImpressumPage />}
      {page === "datenschutz" && <DatenschutzPage />}
      {page === "lead" && <LeadPage navigate={navigate} />}
      {page === "guide" && <GuidePage navigate={navigate} />}
      {page === "blog" && <BlogPage slug={currentBlogSlug} navigate={navigate} />}
      {page === "kinfo" && <KategorieInfoPage katSlug={compareTab} navigate={navigate} />}
      {page === "hub" && <HubPage navigate={navigate} />}
      {page === "alternative" && <AlternativePage altSlug={compareTab} navigate={navigate} />}
      {page === "versus" && <VersusPage vsSlug={compareTab} navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}
