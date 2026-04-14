# Manual Database Setup via Supabase SQL Editor

Since the automated scripts cannot connect to the database due to network issues, use these SQL commands directly in Supabase.

## Step 1: Add Missing Columns to User Table

Go to: **Supabase Dashboard** → **Your Project** → **SQL Editor** → **New Query**

Copy and paste each query below and click **Execute**:

### Query 1: Add is_admin column
```sql
ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
```

### Query 2: Add createdAt column
```sql
ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

## Step 2: Create Orders Table

```sql
CREATE TABLE IF NOT EXISTS "order" (
  id SERIAL PRIMARY KEY,
  userid TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  productid INTEGER NOT NULL REFERENCES "product"(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DOUBLE PRECISION NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 3: Set Yourself as Admin

```sql
UPDATE "user" 
SET is_admin = true 
WHERE email = 'idowuisdaniel1@gmail.com';
```

Replace `idowuisdaniel1@gmail.com` with your actual email if needed.

## Step 4: Verify Changes

### Check user table has new columns:
```sql
SELECT id, email, is_admin, createdat
FROM "user"
WHERE email = 'idowuisdaniel1@gmail.com';
```

### Check orders table was created:
```sql
SELECT * FROM "order" LIMIT 1;
```

---

## Once Database is Updated

1. Your admin dashboard at `/admin` will be ready to use
2. Sign in with your Google account
3. Visit `http://localhost:3000/admin` to see all users and orders

---

**Note:** Run each query one at a time. If you get any errors about columns already existing, that's fine - they were probably already added. The `IF NOT EXISTS` clauses prevent duplicate errors.
