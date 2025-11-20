# How to Update Links

## 🔗 Google Play Store Link

### Primary Download Button (Hero Section)
**File**: `components/Hero.tsx`

Find and replace:
```typescript
<motion.a
  href="#download"  // Change this to your Google Play Store URL
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
>
```

**Replace with**:
```typescript
<motion.a
  href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
>
```

### Download Section
**File**: `components/Download.tsx`

Find and replace:
```typescript
<motion.a
  href="https://play.google.com/store"  // Change this
  target="_blank"
  rel="noopener noreferrer"
```

**Replace with**:
```typescript
<motion.a
  href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
  target="_blank"
  rel="noopener noreferrer"
```

### Navbar CTA
**File**: `components/Navbar.tsx`

Find and replace:
```typescript
<motion.a
  href="#download"  // Change this
  whileHover={{ scale: 1.05 }}
```

**Replace with**:
```typescript
<motion.a
  href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
```

## 📱 Social Media Links

### Footer Social Links
**File**: `components/Footer.tsx`

Find and update:
```typescript
const socialLinks = [
  { icon: IconBrandGithub, href: '#', label: 'GitHub' },
  { icon: IconBrandTwitter, href: '#', label: 'Twitter' },
  { icon: IconBrandLinkedin, href: '#', label: 'LinkedIn' },
  { icon: IconMail, href: 'mailto:support@collabnotes.com', label: 'Email' },
];
```

**Replace with your links**:
```typescript
const socialLinks = [
  { icon: IconBrandGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: IconBrandTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: IconBrandLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: IconMail, href: 'mailto:your-email@example.com', label: 'Email' },
];
```

## 📄 Footer Links

### Footer Navigation
**File**: `components/Footer.tsx`

Find and update:
```typescript
const footerLinks = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Download', href: '#download' },
  ],
  Support: [
    { name: 'Documentation', href: '#' },  // Update these
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },  // Update these
    { name: 'Terms of Service', href: '#' },
    { name: 'License', href: '#' },
  ],
};
```

## 🎯 Quick Find & Replace

Use your editor's find and replace feature:

1. **Find**: `href="#download"`
   **Replace**: `href="YOUR_GOOGLE_PLAY_STORE_URL"`

2. **Find**: `href="https://play.google.com/store"`
   **Replace**: `href="YOUR_GOOGLE_PLAY_STORE_URL"`

3. **Find**: `href="#"`
   **Replace**: `href="YOUR_ACTUAL_URL"`

## ✅ Checklist

After updating links, verify:

- [ ] Hero download button works
- [ ] Navbar CTA works
- [ ] Download section button works
- [ ] All buttons open in new tab
- [ ] Social media links work
- [ ] Footer links work
- [ ] Email link works
- [ ] No broken links remain

## 🔍 Testing

Test all links:
```bash
# Run dev server
npm run dev

# Open http://localhost:3000
# Click every link to verify
```

## 📝 Notes

- Always use `target="_blank"` for external links
- Add `rel="noopener noreferrer"` for security
- Test on mobile devices
- Verify links work after deployment

## 🚀 After Updating

1. Save all files
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy: Follow DEPLOYMENT.md

---

**Pro Tip**: Create a `.env.local` file for environment-specific URLs if you have multiple environments (dev, staging, production).
