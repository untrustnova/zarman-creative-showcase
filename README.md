# Zarman Studio — Creative Showcase

An independent creative agency portfolio showcasing **Video Editing**, **Graphic Design** (featuring client campaigns for **Dewa Printing Semarang**), and **3D Animation**. Built with modern frontend architecture featuring **TanStack Start (SSR)**, **React 19**, **Vite 8**, **Nitro**, **Tailwind CSS v4**, **Three.js**, **GSAP**, and **Lenis**.

---

## ✨ Features

- **🌍 Bilingual i18n System (EN ↔ ID)**:
  - Instant reactive language switching between English and Indonesian across all sections, metadata, work cards, and modal popups.
  - **Automatic Location & Locale Detection**: Automatically inspects browser locale and regional timezones (`Asia/Jakarta`, `Asia/Makassar`, `Asia/Jayapura`, `Asia/Pontianak`) to select the ideal language for visitors seamlessly.
  - **Persistent Preference**: User selection is saved to `localStorage`.
- **🇮🇩 / 🇬🇧 Single Flag Toggle Button**:
  - High-precision vector SVG flags (`FlagID` & `FlagEN`) that render with crisp, razor-sharp fidelity on any OS and screen.
  - Single compact toggle button in desktop navbar and mobile drawer.
- **🎬 01 / Selected Work (Video Editing Showcase)**:
  - 4 real YouTube video showcases (_Elden Ring_, _Punishing Gray Raven_, _Star Savior_).
  - High-resolution dynamic YouTube thumbnail facades (`hqdefault.jpg`) with click-to-play direct embeds (`youtube-nocookie.com`).
  - Staggered editorial 2x2 grid layout.
- **🎨 02 / Graphic Design (Dewa Printing Semarang)**:
  - 6 production marketing and print assets (_Brand Welcome_, _Outdoor MMT Promo_, _Order Guide_, _MMT Material Guide_, _Software Guide_, _Idul Adha Greeting_).
  - High-resolution lightbox preview modal with full artwork specs, client details, and reactive bilingual translations.
- **🌀 Interactive 3D Hero Scene**:
  - Procedural Three.js torus knot, wireframe geometry, and ambient particle cloud with interactive pointer physics.
  - Powered by modern `THREE.Timer` (zero deprecation warnings).
- **🧭 Scroll-Responsive Floating Navbar**:
  - Sits flush against the top edge (`top-0`, full width) at scroll position 0.
  - Smoothly transitions into an elevated floating dock (`rounded-xl`, shadow, backdrop blur) upon scrolling down.
- **📐 Compact & Balanced Manifesto**:
  - Refined layout for **04 / Zarman Studio** with compact, proportional vertical spacing.
- **🏛️ Architectural Brutalist Footer**:
  - Clean sitemap, live worldwide availability badge, direct contact links, and smooth back-to-top interaction without oval elements.

---

## 🛠️ Tech Stack

| Layer                | Technology                                                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [TanStack Start](https://tanstack.com/start) (Full-stack React SSR)                                                         |
| **Routing**          | [TanStack Router](https://tanstack.com/router)                                                                              |
| **Data Fetching**    | [TanStack Query](https://tanstack.com/query)                                                                                |
| **Bundler & Server** | [Vite 8](https://vitejs.dev/) + [Nitro](https://nitro.unjs.io/)                                                             |
| **Runtime**          | [Bun](https://bun.sh/) / [Node.js](https://nodejs.org/)                                                                     |
| **Styling**          | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables                                                                 |
| **Components**       | [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)                                                 |
| **3D & Canvas**      | [Three.js](https://threejs.org/) (r185+)                                                                                    |
| **Animation**        | [Motion](https://motion.dev/) + [GSAP ScrollTrigger](https://greensock.com/) + [Lenis](https://lenis.darkroom.engineering/) |

---

## 📁 Project Structure

```text
├── public/                     # Static public assets (favicon, zarman-logo)
├── src/
│   ├── assets/                 # Branding assets & Dewa Printing posters
│   │   ├── dewa-printing/      # 6 Client design assets
│   │   └── zarman-logo.png     # Official Zarman Studio logo
│   ├── components/
│   │   ├── ui/                 # Radix UI primitive components
│   │   ├── FlagIcons.tsx       # Crisp SVG vector flags (EN & ID)
│   │   ├── HeroScene.tsx       # Three.js 3D canvas hero scene
│   │   └── VideoFacade.tsx     # YouTube video embed facade component
│   ├── lib/
│   │   ├── i18n.tsx            # Bilingual dictionary & auto-detection engine
│   │   └── utils.ts            # Class merging utility (clsx + tailwind-merge)
│   ├── routes/
│   │   ├── __root.tsx          # Root layout shell with LanguageProvider
│   │   └── index.tsx           # Main showcase page
│   └── styles.css              # Tailwind v4 theme tokens & styles
├── .env.example                # Example environment variables
├── .env                        # Local / deployment environment configuration
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite & Nitro configuration with Vercel preset
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) (v20+)

### Installation & Development

```bash
# 1. Clone repository
git clone https://github.com/untrustnova/zarman-creative-showcase.git
cd zarman-creative-showcase

# 2. Copy environment file
cp .env.example .env

# 3. Install dependencies
bun install
# or: npm install

# 4. Start local development server
bun run dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal) in your browser.

---

## 🚢 Deploying to Vercel

This project is fully pre-configured to build seamlessly for **Vercel** using Nitro's Vercel preset (`.vercel/output`).

### Step 1: Push Code to GitHub

Ensure all latest commits are pushed to your GitHub repository:

```bash
git push origin main
```

### Step 2: Import Project in Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** > **"Project"**.
3. Select your repository (`zarman-creative-showcase`).

### Step 3: Configure Project Settings on Vercel

In the Vercel deployment screen:

- **Framework Preset**: Select `Other` (or `Vite`).
- **Root Directory**: `./` (leave default).
- **Build & Development Settings**:
  - **Build Command**: `bun run build` (or `npm run build`)
  - **Output Directory**: `.vercel/output` _(Nitro outputs directly to this standard Vercel format)_
  - **Install Command**: `bun install` (or `npm install`)

### Step 4: Add Environment Variables

In the **Environment Variables** section on Vercel, copy the values from `.env.example` or paste directly:

| Variable                 | Value                                   | Description                                                                      |
| :----------------------- | :-------------------------------------- | :------------------------------------------------------------------------------- |
| `NITRO_PRESET`           | `vercel`                                | **Crucial**: Tells Nitro to generate Vercel serverless functions & static assets |
| `NODE_VERSION`           | `20.x`                                  | Specifies Node.js runtime version                                                |
| `VITE_SITE_URL`          | `https://your-project.vercel.app`       | Production URL of your site                                                      |
| `VITE_CONTACT_PHONE`     | `+62 895 1930 5701`                     | Studio contact number                                                            |
| `VITE_CONTACT_EMAIL`     | `zarmanstudio@gmail.com`                | Studio inquiry email                                                             |
| `VITE_CONTACT_INSTAGRAM` | `https://instagram.com/zarman.creative` | Studio Instagram profile                                                         |

### Step 5: Click "Deploy"

Vercel will install dependencies, build client and server functions with Nitro, and publish your live showcase.

---

## 📜 Available Scripts

- `bun run dev`: Launches Vite development server with HMR.
- `bun run build`: Runs production build generating client assets and Nitro server output.
- `bun run preview`: Previews the production build locally.
- `bun run format`: Formats all code files using Prettier.
- `bun run lint`: Runs ESLint analysis across the project.

---

## 📄 License & Credits

- Designed and curated for **Zarman Studio** & **Dewa Printing Semarang**.
- All graphic design artworks and video assets are property of their respective creators.
