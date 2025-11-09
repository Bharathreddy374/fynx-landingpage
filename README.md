# 🌟 Fynxx Landing Page

> **Influencer Onboarding & Waitlist Platform**  
> Built with **Next.js (Vite React)**, **TailwindCSS**, and **Express + MongoDB**

### 🔗 Live Demo  
🌐 [www.getfynxx.in](https://www.getfynxx.in)

---

## 📖 Overview

**Fynxx Landing Page** is a modern, single-page onboarding platform for **micro-influencers**.  
It introduces the Fynxx ecosystem — a fintech platform empowering creators to earn by promoting brand campaigns — and collects influencer details through an elegant, responsive form stored securely in MongoDB.

This project emphasizes premium **Gen-Z-style UI**, smooth **motion effects**, and a **tech-first** aesthetic with minimalistic dark-theme visuals.

---

## ✨ Key Features

- 🎯 **Influencer Onboarding Form** – Collects name, email, platform, follower count, and stores to MongoDB.  
- 🎬 **High-impact Visuals** – Built with Framer Motion, parallax scroll, and smooth reveal animations.  
- 🧩 **Reusable UI System** – Uses Radix UI + ShadCN component architecture for clean, modular design.  
- 💾 **Express + Mongoose Backend** – Simple REST API to submit and persist onboarding data.  
- 🎨 **Dark, Premium Design** – TailwindCSS + custom typography for an Apple-style feel.  
- 🧠 **Next-Themes Integration** – Auto theme detection and smooth transitions.  
- ☁️ **Deployed on Vercel** – Optimized for speed, scalability, and SEO.

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | Next.js (Vite React), TailwindCSS, Framer Motion, Radix UI, ShadCN UI |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB |
| **Utilities** | React Hook Form, Zod, Lucide Icons, Recharts, React-Query |
| **3D & Motion** | Three.js, @react-three/fiber, @react-three/drei |
| **Hosting** | Vercel (Frontend) |

---

## 🏗️ Folder Structure

fynxx-landingpage/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Landing and API routes
│ ├── hooks/ # Custom hooks
│ ├── lib/ # Config, utilities
│ ├── assets/ # Images & media
│ └── styles/ # Tailwind & global CSS
├── server.js # Express API for form submissions
├── .env # MongoDB credentials
└── package.json


---

## ⚙️ Setup & Installation

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Bharathreddy374/fynxx-landingpage.git
cd fynxx-landingpage

# 2️⃣ Install dependencies
npm install

# 3️⃣ Add environment variables
# .env
MONGO_URI=your_mongodb_connection_string
PORT=5000

# 4️⃣ Run backend + frontend
npm run server
npm run dev

# 5️⃣ Open in browser
http://localhost:5173
```

🚀 Future Improvements

Add admin dashboard to manage influencer leads

Integrate email confirmation on submission

Add analytics for influencer engagement

Improve backend validation and security




