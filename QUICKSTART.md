# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

The static site will be generated in the `out` folder.

## 📝 Customization

### Update Google Play Store Link
Edit `components/Download.tsx`:
```typescript
href="YOUR_GOOGLE_PLAY_STORE_LINK"
```

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #6366f1;    /* Change this */
  --secondary: #8b5cf6;  /* Change this */
  --accent: #ec4899;     /* Change this */
}
```

### Update Content
- **Hero Section**: `components/Hero.tsx`
- **Features**: `components/Features.tsx`
- **How It Works**: `components/HowItWorks.tsx`
- **Showcase**: `components/Showcase.tsx`
- **Download**: `components/Download.tsx`
- **Footer**: `components/Footer.tsx`

### Add Social Links
Edit `components/Footer.tsx`:
```typescript
const socialLinks = [
  { icon: IconBrandGithub, href: 'YOUR_GITHUB_URL', label: 'GitHub' },
  { icon: IconBrandTwitter, href: 'YOUR_TWITTER_URL', label: 'Twitter' },
  // Add more...
];
```

## 🎨 Design Customization

### Animations
All animations use Framer Motion. Adjust in component files:
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

### Glassmorphism Effect
Defined in `app/globals.css`:
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 📦 Project Structure

```
collabnotes-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── AnimatedBackground.tsx  # Animated background
│   ├── Navbar.tsx             # Navigation
│   ├── Hero.tsx               # Hero section
│   ├── Features.tsx           # Features grid
│   ├── HowItWorks.tsx         # Steps section
│   ├── Showcase.tsx           # Feature showcase
│   ├── Download.tsx           # Download CTA
│   └── Footer.tsx             # Footer
├── public/                 # Static assets
├── next.config.ts         # Next.js config
├── package.json           # Dependencies
└── README.md             # Documentation
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (not needed for static export)
- `npm run lint` - Run ESLint

## 🎯 Next Steps

1. **Update Content**: Replace placeholder text with your actual content
2. **Add Images**: Add app screenshots to showcase
3. **Update Links**: Add real Google Play Store link
4. **Customize Colors**: Match your brand colors
5. **Deploy**: Follow DEPLOYMENT.md guide

## 💡 Tips

- Use `npm run dev` for hot reload during development
- Test the build locally before deploying
- Optimize images before adding them
- Keep animations smooth (avoid heavy computations)
- Test on mobile devices

## 🐛 Common Issues

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Build errors?**
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

**Animations laggy?**
- Reduce animation complexity
- Check browser performance
- Disable animations on low-end devices

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Tabler Icons](https://tabler-icons.io/)

## 🤝 Need Help?

Check the documentation files:
- `README.md` - Overview
- `DEPLOYMENT.md` - Deployment guide
- `COMPLETE_APP_DOCUMENTATION.md` - App details

Happy coding! 🚀
