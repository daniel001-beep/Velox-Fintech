# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

### Environment Variables
Set these in your Vercel project settings under "Environment Variables":

```
NEXTAUTH_SECRET=generate-a-random-32-char-string
NEXTAUTH_URL=https://your-domain.vercel.app
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
POSTGRES_URL=your-supabase-pooling-url
POSTGRES_URL_NON_POOLING=your-supabase-non-pooling-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key
```

### Database Setup

1. **Ensure tables exist** - Run locally first:
   ```bash
   npm run db:push
   ```

2. **Set admin user** - Before deploying, set yourself as admin:
   ```bash
   npx ts-node set-admin.ts your-email@gmail.com
   ```

### Build Optimization

The app uses:
- ✅ Next.js 15.1.3 (Latest stable)
- ✅ NextAuth 5.0.0 (Production ready - updated from beta)
- ✅ React 19.2.4
- ✅ Tailwind 4.2.2

### SSL/Database Connection

The database configuration has been optimized for Vercel:
- ✅ Fixed production connection pooling
- ✅ SSL configuration for Supabase
- ✅ Automatic connection reuse in production

## Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Add environment variables in project settings
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

Then set environment variables in the Vercel dashboard.

## Post-Deployment

### Verify Deployment

1. Visit your Vercel URL
2. Test authentication flow (sign in with Google)
3. Check `/admin` page loads (after setting yourself as admin)
4. Test core features

### Monitor

- Check Vercel Analytics dashboard
- Monitor database connections via Supabase dashboard
- Set up error tracking (Sentry, LogRocket, etc.)

## Common Issues

### Database Connection Timeouts
- Verify `POSTGRES_URL_NON_POOLING` is correct
- Check Supabase project is running
- Ensure firewall allows Vercel IPs

### NextAuth Not Working
- Verify `NEXTAUTH_URL` matches your domain
- Check Google OAuth credentials are correct
- Ensure `NEXTAUTH_SECRET` is set (min 32 chars)

### Build Failures
- Check that `npm run build` works locally
- Verify all environment variables are set
- Look at Vercel build logs for details

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| NEXTAUTH_SECRET | Yes | Random string (>32 chars) for session encryption |
| NEXTAUTH_URL | Yes | Your production URL |
| AUTH_GOOGLE_ID | Yes | Google OAuth Client ID |
| AUTH_GOOGLE_SECRET | Yes | Google OAuth Client Secret |
| POSTGRES_URL | Yes | Supabase connection pool URL |
| POSTGRES_URL_NON_POOLING | Yes | Supabase direct connection URL |
| NEXT_PUBLIC_SUPABASE_URL | Yes | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Yes | Supabase anon key |
| GOOGLE_GENERATIVE_AI_API_KEY | No | For AI features |

## Rollback Plan

If deployment fails:
1. Check Vercel deployment logs
2. Verify environment variables
3. Redeploy previous version using Vercel dashboard
4. Fix issues locally and push new commit

---

**Questions?** Check:
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- NextAuth docs: https://authjs.dev
