# Deployment Guide

## Quick Deploy

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build the site:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### GitHub Pages
1. Build the site:
```bash
npm run build
```

2. Push the `out` folder to `gh-pages` branch:
```bash
cd out
git init
git add -A
git commit -m "Deploy"
git push -f git@github.com:username/repo.git main:gh-pages
```

### Custom Server
1. Build the site:
```bash
npm run build
```

2. Upload the `out` folder to your server
3. Configure your web server to serve static files

## Environment Variables

No environment variables required for the static site.

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## Performance Tips

- The site is already optimized for static export
- All images are unoptimized for static hosting
- Consider using a CDN for better global performance
- Enable compression on your hosting provider

## Troubleshooting

### Build Fails
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild
- Run `npm install` to ensure all dependencies are installed

### Animations Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify Framer Motion is installed

### Icons Not Showing
- Verify `@tabler/icons-react` is installed
- Check network tab for failed requests
- Clear browser cache

## Support

For issues or questions, please open an issue on GitHub.
