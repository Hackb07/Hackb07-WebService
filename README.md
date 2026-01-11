# Hackb07 - Web & AI Solutions

Hackb07 is a premium digital agency dashboard specializing in High-Performance Web Development and Advanced AI/ML Solutions. Built with React.js, TailwindCSS, and Supabase.

![Hackb07 Preview](public/vite.svg)

## 🚀 Features

-   **Premium UI/UX**: Dark-themed, glassmorphism design with Framer Motion animations.
-   **Dynamic Services**: Displays a catalog of 9 specialized services ranging from Web Apps to Computer Vision.
-   **Dynamic Pricing**:
    -   Auto-detects user region (India/UK/Europe/Global).
    -   Currency Toggle (USD, INR, EUR, GBP).
    -   real-time price conversion.
-   **Contact & Leads**:
    -   Direct Email Integration via [FormSubmit.co](https://formsubmit.co).
    -   Database Backup via **Supabase** (failsafe included).
-   **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

## 🛠 Tech Stack

-   **Frontend**: React.js, Vite
-   **Styling**: TailwindCSS (v3), Framer Motion, Lucide React (Icons)
-   **Backend/DB**: Supabase (PostgreSQL)
-   **Form Handling**: FormSubmit (Email), Supabase (Storage)

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Hackb07/Hackb07-WebService.git
cd hackb07
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note**: If you don't set this up, the app will use safe fallback data and won't crash.

### 4. Database Setup (Supabase)
1.  Create a new project on [Supabase.com](https://supabase.com).
2.  Go to the **SQL Editor**.
3.  Copy the contents of `supabase_schema.sql` (found in this repo) and run it.
4.  This will create the `services` and `leads` tables and populate the initial data.

### 5. Run Locally
```bash
npm run dev
```

## 🚀 Building for Production

```bash
npm run build
```
The output will be in the `dist/` folder, ready for deployment on Vercel, Netlify, or any static host.

## 📧 Contact Logic

The contact form attempts two actions:
1.  **Email**: Sends the message to `balat4880@gmail.com` using FormSubmit.
2.  **Database**: Inserts the lead into Supabase `leads` table.

If Supabase is not configured (e.g., in a preview environment), it logs a warning but still shows "Success" if the email is sent.

---

© 2026 Hackb07 Services. All rights reserved.
