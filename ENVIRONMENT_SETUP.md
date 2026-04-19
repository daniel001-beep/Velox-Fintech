# 🔧 Environment Setup Guide - Velox Store

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier available at https://supabase.com)
- (Optional) Google OAuth credentials for authentication

## 1. Supabase Setup

### Step 1: Create a Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `velox-store` (or your choice)
   - **Database Password**: Create a secure password
   - **Region**: Choose closest to you
4. Click "Create new project" and wait for it to initialize

### Step 2: Get Your Credentials
1. In Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **Database**
3. You'll see your connection details:
   - **Host**: `aws-1-us-east-1.pooler.supabase.com` (or your region)
   - **Database**: postgres
   - **User**: postgres
   - **Password**: [the password you set]

### Step 3: Create Connection String
Construct your `POSTGRES_URL` in this format:
```
postgresql://postgres:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres
```

Replace:
- `[PASSWORD]` with your database password
- `aws-1-us-east-1` with your region if different

## 2. Configure Environment Variables

### Create `.env.local` File
In the project root directory, create a file named `.env.local`:

```bash
# Database Connection
POSTGRES_URL="postgresql://postgres:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (Optional)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# API Keys (Optional)
NEXT_PUBLIC_VERCEL_URL="http://localhost:3000"
```

### Generating NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Then paste the output into your `.env.local` as `NEXTAUTH_SECRET`.

## 3. Database Setup

### Initialize Database Tables
Run the following command to create all database tables:

```bash
npm run migrate
```

This will:
- Create `products` table
- Create `reviews` table
- Create `users` table
- Create `orders` table
- Create `audit_logs` table

### Seed Sample Data
After tables are created, populate with sample data:

```bash
npm run seed
```

Or visit: `http://localhost:3000/api/seed`

## 4. Run the Application

### Development Mode
```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

### Check Database Connection
Visit: `http://localhost:3000/db-status`

This page will show you whether the database is properly connected and what the status is.

## 5. Troubleshooting

### Error: "ENOTFOUND aws-1-us-east-1.pooler.supabase.com"
**Cause**: Network cannot reach Supabase servers

**Solutions**:
1. Check your internet connection
2. Verify the hostname is correct in `.env.local`
3. Ensure your Supabase project is active
4. Check firewall/proxy settings
5. Visit https://status.supabase.com to see if there are outages

### Error: "Connection refused" or "ECONNREFUSED"
**Cause**: Database credentials are incorrect

**Solutions**:
1. Double-check `POSTGRES_URL` in `.env.local`
2. Verify the password hasn't changed in Supabase
3. Ensure you're using the **pooler** hostname (not the direct connection)
4. Try resetting the database password in Supabase dashboard

### Products Page Shows "No Products Available"
**Cause**: Database connection works but no data

**Solutions**:
1. Run `npm run seed` to add sample products
2. Visit `/api/seed` endpoint to trigger seeding
3. Check Supabase dashboard to verify tables exist

### Admin Dashboard Not Showing Data
**Cause**: Not logged in as admin user

**Solutions**:
1. Sign in with a Google account
2. Run: `npm run set-admin` to mark your account as admin
3. Restart the server after running the command

## 6. Project Structure

```
my-react-store/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── db-health/       # Database health check
│   │   ├── seed/            # Data seeding endpoint
│   │   ├── admin/           # Admin endpoints
│   │   └── ...
│   ├── components/          # React components
│   └── [pages]/             # Page routes
├── src/
│   └── db/                  # Database configuration
│       ├── schema.ts        # Table schemas
│       └── index.ts         # Connection setup
├── migrations/              # SQL migrations
├── .env.local              # Environment variables (DO NOT COMMIT)
└── package.json            # Dependencies
```

## 7. Deployment (Vercel)

### Set Environment Variables on Vercel
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add:
   - `POSTGRES_URL`: Your Supabase connection string
   - `NEXTAUTH_URL`: Your Vercel domain (https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Your generated secret
   - Other API keys as needed

### Deploy
```bash
git push            # Deploys automatically
```

## 8. Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run migrate

# Seed sample data
npm run seed

# Check database health
npm run test-db

# Set user as admin
npm run set-admin
```

## 9. Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **NextAuth.js**: https://next-auth.js.org

## 10. Security Best Practices

⚠️ **IMPORTANT**: Never commit `.env.local` to git!

- ✅ Add `.env.local` to `.gitignore`
- ✅ Use strong database passwords
- ✅ Keep `NEXTAUTH_SECRET` secure
- ✅ Rotate secrets if accidentally exposed
- ✅ Use environment variables for all sensitive data
- ✅ Enable database backups in Supabase

---

**Last Updated**: 2024
**Version**: 1.0
