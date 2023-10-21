![Test Image 3](/packages/common/assets/img/ogp-dark.png)

# FRKT

No-Code tools for Web2 & 3.<br />
FRKT(/furɪkt/) provides a frictionless UX for any app.<br />
<br />
This repo is build for [ETHOnline 2023](https://ethglobal.com/events/ethonline2023).

[Demo](https://frkt-demo.web.app/) is here.

## About this project

### 🤔 Problem

When I was thinking about dApps ideas, I always ran into two onboarding UX issues. User's wallet and initial gas-fee.

### 💡 Solution

Based on Account Abstraction by Biconomy (we can also use other AA stack) and MPC by Lit protocol, we wrap protocols, smart contracts, and other APIs etc. And we made integrating them together as a toolkit. This toolkit provides Zapier or IFTTT like functionality with embedded widgets into any app.

### 🏓 Workflow

1. [App owner] Setup App, Select a recipe to use, Generate widget code in FRKT dashboard
1. [App owner] Install widget code into apps. (paste 1 javascript file & script tag)
1. [App users] When the application user opens the widget.
   1. Create a user's wallet (a. Google Oauth or b. webauthn).
   1. Execute function in a widget (gas-less tx by AA).

[Architecture]() link here

## Tech

### Folder structure

```
├── apps
│   ├── dashboard      -> 🛠️ Dashboard frontend
│   ├── demo           -> ⚽ Demo app frontend
│   ├── frkt-subgraph  -> 📈 Subgraph for widget
│   ├── widget         -> 👓 Widget
│   └── www            -> ✈️ Landing page (frkt.io)
├── packages
│   ├── contracts      -> 🎩 Smart contracts
│   └── common         -> Common libs
...
```

### 🎩 Contracts

Smart contracts for FRKT widget.

- Hardhat

### 🛠️ Dashboard

Dashborad for generationg widget code.

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
