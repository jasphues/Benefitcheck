# BenefitCheck.de

Unabhängiges Vergleichsportal für Mitarbeiter-Benefits im DACH-Raum.

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:5173

## Deployment auf Vercel

1. Push dieses Repo auf GitHub
2. Gehe zu [vercel.com](https://vercel.com) → "New Project"
3. Importiere das GitHub Repo
4. Framework: Vite (wird automatisch erkannt)
5. Klick "Deploy"
6. Custom Domain (`benefitcheck.de`) unter Settings → Domains verbinden

## Projektstruktur

```
benefitcheck/
├── index.html          ← SEO-Meta-Tags, Font-Loading
├── vercel.json         ← SPA-Routing für Vercel
├── vite.config.js      ← Build-Config
├── package.json
└── src/
    ├── main.jsx        ← React Entry Point
    └── App.jsx         ← Gesamte App (Startseite, Vergleich, Rechner)
```

## Anbieter hinzufügen / bearbeiten

Alle Anbieter-Daten stehen im `PROVIDERS`-Array in `src/App.jsx` (ganz oben).
Einfach ein neues Objekt zum Array hinzufügen:

```js
{ id: 12, name: "Neuer Anbieter", type: "All-in-One", sachbezug: true, essen: false, mobil: false, rabatte: true, priceFrom: 4.0, rating: 4.2, reviews: 15, founded: 2023, hq: "Berlin", highlights: ["Feature 1", "Feature 2"], employees: "Ab 10 MA", sachbezugModel: "App-basiert", website: "example.de" }
```
