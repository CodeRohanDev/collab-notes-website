# CollabNotes Website

A modern, animated showcase website for CollabNotes - a feature-rich note-taking mobile application.

## 🚀 Features

- **Modern Design**: Sleek, techy design with glassmorphism effects
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Static Export**: Fully static site for fast loading and easy deployment
- **Responsive**: Works perfectly on all devices
- **External Icons**: Using Tabler Icons for modern, consistent iconography

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Tabler Icons & Lucide React
- **TypeScript**: Full type safety

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Build

Build the static site:

```bash
npm run build
```

This will generate a static export in the `out` directory.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features showcase
│   ├── HowItWorks.tsx   # Step-by-step guide
│   ├── Showcase.tsx     # Feature highlights
│   ├── Download.tsx     # Download CTA
│   └── Footer.tsx       # Footer
└── public/              # Static assets
```

## 🎨 Design System

### Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Background: `#0a0a0a` (Dark)

### Components
- Glassmorphism cards
- Gradient backgrounds
- Smooth hover effects
- Animated sections

## 🚀 Deployment

The site is configured for static export and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply run `npm run build` and deploy the `out` directory.

## 📄 License

Copyright © 2024 CollabNotes. All rights reserved.
