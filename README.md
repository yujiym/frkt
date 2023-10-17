# FRKT

No-Code tool for Web2 & 3.<br />
FRKT(/furɪkt/) provides a frictionless UX for any app.<br />
<br />
This repo is build for [ETHOnline 2023](https://ethglobal.com/events/ethonline2023).

[FRKT demos](https://frkt-demo.web.app/)

### Folder structure

```
├── apps
│   ├── contracts   -> 🎩 Smart contracts
│   ├── dashboard   -> 🛠️ Dashboard frontend
│   ├── demo        -> ⚽ Demo app frontend
│   ├── widget      -> 👓 Widget
│   └── www         -> ✈️ Landing page (frkt.io)
├── packages
│   └── common      -> Common libs
...
```

### 🎩 Contracts

Smart contracts for FRKT widget.

- Hardhat

### 🛠️ Dashboard

Dashborad for setup app, configre recipe and generate widget code.

- Next.js (React, TypeScript)
- Tailwind CSS
- Hosted on Vercel
- Vercel Postgres

### ⚽ Demo

FRKT widget integration demo app.
-> [FRKT demos](https://frkt-demo.web.app/)

- Vite (React, TypeScript)
- Tailwind CSS, daisyUI
- Firebase Hosting, Firebase Auth(Google OAuth)

### 👓 Widget

Widget component for recipes.

- Next.js (React, TypeScript)
- Tailwind CSS
- Hosted on Vercel
- Vercel Postgres

### ✈️ Landing page

[FRKT LP](https://frkt.io/)

- Hono, Vite (React, TypeScript)
- Tailwind CSS
- Hosted on Cloudflare Pages
