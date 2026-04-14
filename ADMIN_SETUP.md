# Admin Dashboard Setup Guide

## ✅ What's Been Done

### 1. Admin Dashboard Page Created
- **Location**: `/app/admin/page.tsx`
- **Features**:
  - Protected route (requires authentication)
  - Shows total users and orders statistics
  - Users tab: Lists all registered users with their email and admin status
  - Orders tab: Shows all orders with customer info, products, quantities, prices, and status

### 2. Admin API Endpoint Created
- **Location**: `/app/api/admin/dashboard/route.ts`
- **Features**:
  - Fetches all users and orders from the database
  - Verifies user is an admin before returning data
  - Returns aggregated dashboard metrics

### 3. Database Schema Updated
- **File**: `/src/db/schema.ts`
- **Changes**:
  - Added `isAdmin` boolean field to users table
  - Added `createdAt` timestamp to users table
  - Added new `orders` table with:
    - userId, productId (foreign keys)
    - quantity, totalPrice
    - status (pending, shipped, delivered, cancelled)
    - createdAt, updatedAt timestamps

### 4. Authentication Updated
- **File**: `/auth.ts`
- **Change**: Added `isAdmin` to session callback so it's available on the client

### 5. Fixed Errors
- Fixed import syntax in schema.ts (pgEnum import)
- Fixed malformed .env.local file
- Fixed sellers page imports

## 🚀 Remaining Setup Steps

### Step 1: Push Database Schema
When network connectivity is stable, run:
```bash
npm run db:push
```

This will create:
- The new `orders` table
- Add `isAdmin` and `createdAt` columns to the users table

### Step 2: Set Yourself as Admin
Once the database is synced, run:
```bash
npx ts-node set-admin.ts your-email@gmail.com
```

Replace `your-email@gmail.com` with your actual Google account email.

### Step 3: Access Admin Dashboard
1. Sign in at `/account` with your Google account
2. Visit `http://localhost:3000/admin` to see your dashboard

## 📊 Admin Dashboard Features

### Users Tab
Shows all registered users:
- User name
- Email address
- Account status (Admin/User)
- Join date

### Orders Tab
Shows all customer orders:
- Order ID
- Customer name & email
- Product name
- Quantity ordered
- Total price
- Order status (Pending, Shipped, Delivered, Cancelled)
- Order date

## 🛠️ Scripts Created

- **set-admin.ts**: Sets a user as admin by email
  ```bash
  npx ts-node set-admin.ts user@example.com
  ```

- **check-tables.ts**: Verifies database schema (for troubleshooting)
  ```bash
  npx ts-node check-tables.ts
  ```

## 🔒 Security

✅ Only users with `isAdmin: true` can access the admin dashboard
✅ API endpoint checks admin status before returning data
✅ Non-admin users are redirected away from `/admin`

## 📝 Current Dev Server Status

The dev server is running and ready to use!

Visit: `http://localhost:3000`

## ⚠️ Troubleshooting Database Push

If `npm run db:push` times out or fails:

1. **Check network connection** - Ensure you have internet access
2. **Verify credentials** - Check `.env.local` has correct POSTGRES_URL_NON_POOLING
3. **Try Supabase Dashboard** - Go to https://app.supabase.com and manually create tables
4. **Use Drizzle Studio** - `npm run db:studio` for interactive database management

## 📱 When Orders Start Appearing

Once orders are in the database, the admin dashboard will automatically:
- Show them in the Orders tab
- Update the total orders count
- Display customer information
- Show order status and timeline

---

**Next**: Try visiting `/admin` now (it may show no users/orders until database sync is complete)
