<h1 align="center">Temesgen Meharie — Portfolio</h1>

<p align="center">
  A fast, responsive full-stack developer portfolio built with React 19 and Vite, featuring dark/light theme, smooth scroll animations, a project showcase with image galleries, and a live contact form.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-EF4B82?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License" />
</p>

---

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contact](#contact)
- [License](#license)

---

## Live Demo

🔗 [temesgen-portfolio.vercel.app](https://temesgen-portfolio.vercel.app) *(update this link once deployed)*

---

## Features

| Feature | Details |
|---|---|
| **Dark / Light Theme** | Persistent toggle with full contrast support across all sections |
| **Responsive Layout** | Fluid design optimized for mobile, tablet, and desktop |
| **Scroll Animations** | Framer Motion entrance animations triggered on scroll |
| **Tech Badge Strip** | Interactive icon grid in the Hero section showing core stack |
| **Project Showcase** | Cards with image galleries, tech tags, GitHub and live demo links |
| **PIMS Gallery** | Multi-screenshot showcase for the Pharmacy Inventory Management System |
| **Skills Section** | Tabbed view — Technical skills, Soft skills, and Dev tools |
| **Contact Form** | Live form backed by a Vercel serverless function and Resend email API |
| **Resume Download** | One-click CV download from the Hero section |
| **Social Links** | GitHub, LinkedIn, and Telegram integrated in the Contact section |

---

## Tech Stack

### Frontend
- **React 19** — UI library
- **Vite 6** — Build tool with HMR
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 12** — Declarative animations
- **React Icons 5** — Icon sets (Feather, Simple Icons)

### Backend (Serverless)
- **Vercel Functions** — Serverless API routes (`/api/contact`, `/api/health`)
- **Resend** — Transactional email delivery
- **Zod** — Request validation

### Tooling
- ESLint, PostCSS, Autoprefixer
- Git & GitHub

---

## Project Structure

```
temesgen_portfolio/
├── public/
│   ├── profile-placeholder.png   # Profile photo
│   ├── developer-bg.png          # Hero background image
│   └── resume.pdf                # Downloadable CV
│
├── api/
│   ├── contact.js                # Vercel serverless contact handler
│   └── health.js                 # Health check endpoint
│
├── src/
│   ├── assets/
│   │   ├── pims/                 # PIMS project gallery (6 screenshots)
│   │   ├── amazon-clone.png
│   │   ├── chatapp.png
│   │   ├── pharmacy.png
│   │   ├── todolist.png
│   │   └── resume.pdf
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar with theme toggle
│   │   ├── Hero.jsx              # Landing section with tech badges & CV download
│   │   ├── About.jsx             # About me section
│   │   ├── Projects.jsx          # Project cards with gallery modal
│   │   ├── ShowcaseModal.jsx     # Full-screen image gallery modal
│   │   ├── Skills.jsx            # Tabbed skills section
│   │   ├── Contact.jsx           # Contact form + social links
│   │   └── Footer.jsx            # Footer
│   ├── data/
│   │   └── projects.js           # All project data (title, tags, links, gallery)
│   ├── index.css                 # Global styles and CSS variables
│   └── main.jsx                  # App entry point
│
├── .env.example
├── vercel.json
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/temesgenmeharie/temesgen_portfolio.git

# 2. Navigate into the project directory
cd temesgen_portfolio

# 3. Install dependencies
npm install

# 4. Create your environment file
cp .env.example .env

# 5. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
EMAIL_API_KEY=your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_email@example.com

# Leave empty when frontend and API are deployed together on Vercel
VITE_API_BASE_URL=
```

- `EMAIL_API_KEY` — API key from [Resend](https://resend.com)
- `CONTACT_RECEIVER_EMAIL` — The address that receives contact form submissions
- `VITE_API_BASE_URL` — Leave blank for Vercel; set to `http://localhost:5174` for local API testing

---

## Deployment

This project is configured for zero-config deployment on Vercel.

1. Push the repository to GitHub
2. Import the repo in the [Vercel dashboard](https://vercel.com/new)
3. Set the following environment variables in Vercel project settings:
   - `EMAIL_API_KEY`
   - `CONTACT_RECEIVER_EMAIL`
4. Deploy — Vercel will run `npm run build` and serve the output automatically

The `vercel.json` uses `rewrites` so React Router handles client-side navigation correctly while static assets are served with proper MIME types.

---

## Customization

### Personal Information
- **Hero section** — Update name, role, and description in `src/components/Hero.jsx`
- **About section** — Edit your bio in `src/components/About.jsx`

### Profile Photo & Resume
Replace the files in `public/`:
```
public/profile-placeholder.png  →  your photo
public/resume.pdf               →  your CV
```

### Projects
Edit the `projects` array in `src/data/projects.js`. Each project supports:
- `title`, `description`, `tags`
- `image` (cover), `gallery` (array for modal slideshow)
- `githubUrl`, `liveUrl`

### Skills
Update the `TECHNICAL_SKILLS`, `SOFT_SKILLS`, and `TOOLS` arrays in `src/components/Skills.jsx`.

### Social Links
Update URLs in `src/components/Contact.jsx`:
```
GitHub:   https://github.com/temesgenmeharie
Telegram: https://t.me/Ethiopia2063
LinkedIn: your LinkedIn profile URL
```

### Theme Colors
Modify CSS custom properties in `src/index.css` under the `:root` (light) and `.dark` (dark) selectors.

---

## Contact

**Temesgen Meharie** — Full Stack Developer

| | |
|---|---|
| Email | temesgenmeharie71@gmail.com |
| GitHub | [github.com/temesgenmeharie](https://github.com/temesgenmeharie) |
| LinkedIn | [linkedin.com/in/temesgenmeharie](https://linkedin.com/in/temesgenmeharie) |
| Telegram | [@Ethiopia2063](https://t.me/Ethiopia2063) |
| Phone | +251 985 250 001 |
| Location | Addis Ababa, Ethiopia |

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it with attribution.

---

<p align="center">Built by <strong>Temesgen Meharie</strong></p>
