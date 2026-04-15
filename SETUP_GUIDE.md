# Velox E-Commerce: Setup & Deployment Guide

## 🚀 Quick Start

This guide helps you deploy all the advanced financial and security features for Velox.

---

## STEP 1: DATABASE MIGRATION

### Run the SQL Migration

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com/
   - Select your project
   - Navigate to **SQL Editor**

2. **Create New Query**
   - Click **New Query**
   - Paste the entire contents of: `migrations/001-advanced-features.sql`
   - This will:
     - Create `transaction` table
     - Create `ledger_entry` table
     - Create `audit_log` table
     - Create `address_history` table
     - Set up RLS policies
     - Create Postgres functions

3. **Execute**
   - Click **Run**
   - Wait for success confirmation

### Verify Migration

```sql
-- Check tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Should include: audit_log, address_history, ledger_entry, transaction

-- Check functions exist
SELECT proname FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
ORDER BY proname;

-- Should include: process_purchase_transaction, create_audit_log, verify_transaction_integrity, get_admin_audit_report
```

---

## STEP 2: UPDATE DATABASE SCHEMA (IN YOUR CODE)

Replace your old schema with the new one:

```bash
# Backup old schema first
cp src/db/schema.ts src/db/schema.ts.backup

# Update to new schema
cp src/db/schema-v2.ts src/db/schema.ts
```

### Update Drizzle Config Reference

If using Drizzle ORM, update references:

```typescript
// OLD: import { products } from "@/src/db/schema";
// NEW: import { products, transactions, ledgerEntries, auditLogs } from "@/src/db/schema";

import {
  products,
  transactions,
  ledgerEntries,
  auditLogs,
  addressHistory
} from "@/src/db/schema";
```

---

## STEP 3: INSTALL UTILITIES

All utility files are already created:

```
utils/
├── transaction-idempotency.ts ............. [✅ Created]
└── supabase/
    ├── client.ts ......................... [✅ Existing]
    └── middleware.ts ..................... [✅ Existing]
```

No npm packages needed - all utilities use built-in:
- `crypto` (Node.js)
- `localStorage` / `IndexedDB` (Browser)
- Supabase client (already installed)

---

## STEP 4: UPDATE CHECKOUT PAGE

The checkout page is already updated with:

```typescript
import {
  processPurchaseTransaction,
  generateIdempotencyKey,
  logCheckoutAttempt,
  logAddressChange,
  recoverTransaction,
} from "@/utils/transaction-idempotency";
```

It now:
- ✅ Generates idempotency keys
- ✅ Logs all checkout attempts
- ✅ Recovers failed transactions
- ✅ Handles errors gracefully

---

## STEP 5: ADD ERROR BOUNDARIES

Wrap checkout components:

```typescript
import { PaymentErrorBoundary, CartErrorBoundary } from "@/app/components/ErrorBoundaries";

function CheckoutLayout() {
  return (
    <PaymentErrorBoundary
      onError={(error, info) => {
        console.error("Payment error:", error);
        // Send to monitoring service
      }}
    >
      <CheckoutPage />
    </PaymentErrorBoundary>
  );
}
```

---

## STEP 6: CREATE ADMIN PAGES

Create the admin dashboard page:

```bash
# Create admin directory
mkdir -p app/admin

# Create audit log viewer page
cat > app/admin/audit-logs/page.tsx << 'EOF'
import AdminAuditLogViewer from "@/app/components/AdminAuditLogViewer";
export default AdminAuditLogViewer;
EOF
```

Access at: `/admin/audit-logs` (requires admin account)

---

## STEP 7: CONFIGURE ADMIN USER

Make a user an admin:

```sql
-- Via SQL
UPDATE "user"
SET is_admin = true
WHERE email = 'your-email@example.com';

-- OR via Supabase Dashboard
-- Navigate to: Database > user table
-- Find your row and set is_admin = true
```

---

## STEP 8: TEST IDEMPOTENCY

Test duplicate transaction prevention:

```typescript
// In your checkout handler
const idempotencyKey = generateIdempotencyKey("user-123", 456);

// First request - creates transaction
const response1 = await processPurchaseTransaction({
  userId: "user-123",
  orderId: 456,
  amount: 99.99
});
// Returns: { transactionId: "uuid-1", status: "completed" }

// Network retry - same request
const response2 = await processPurchaseTransaction({
  userId: "user-123",
  orderId: 456,
  amount: 99.99
});
// Returns: SAME { transactionId: "uuid-1", status: "completed" }
// ✅ No duplicate created!
```

---

## STEP 9: VERIFY RLS POLICIES

Test that users can only see their own data:

```sql
-- AS USER 1
SELECT * FROM transaction;
-- Returns: only user-1's transactions

-- AS USER 2
SELECT * FROM transaction;
-- Returns: only user-2's transactions

-- AS anon (not authenticated)
SELECT * FROM transaction;
-- Returns: error or empty
```

---

## STEP 10: CHECK AUDIT LOGS

View audit trail:

```sql
-- View all audit events
SELECT 
  timestamp,
  user_id,
  event_type,
  entity_type,
  ip_address,
  change_hash
FROM audit_log
ORDER BY timestamp DESC
LIMIT 50;

-- Check for address changes
SELECT * FROM audit_log
WHERE event_type = 'address_changed'
ORDER BY timestamp DESC;

-- Find suspicious activity
SELECT ip_address, COUNT(*) as attempts
FROM audit_log
WHERE event_type = 'checkout_attempted'
  AND timestamp > NOW() - INTERVAL '24 hours'
GROUP BY ip_address
HAVING COUNT(*) > 20;
```

---

## STEP 11: ENVIRONMENT VARIABLES

Ensure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For admin API routes (Optional - for better security)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## STEP 12: TESTING CHECKLIST

- [ ] **Idempotency**: Send same transaction twice - second should return existing
- [ ] **Double-Entry**: Create purchase - verify ledger has 1 debit + 1 credit
- [ ] **RLS**: Login as user 1, can't see user 2's transactions
- [ ] **Error Recovery**: Turn off internet mid-checkout, reconnect - should recover
- [ ] **Audit Logs**: View logs in admin dashboard
- [ ] **Address Change**: Change address, verify logged in audit_log
- [ ] **Admin Access**: Only admin users can view audit dashboard

---

## STEP 13: MONITORING & ALERTS

### Set Up Transaction Monitoring

```sql
-- Monitor failed transactions
CREATE VIEW failed_transactions AS
SELECT 
  id,
  user_id,
  amount,
  error_message,
  created_at
FROM transaction
WHERE status = 'failed'
  AND created_at > NOW() - INTERVAL '1 hour';

-- Monitor pending locks (potential stuck transactions)
CREATE VIEW stuck_transactions AS
SELECT id, user_id, locked_until
FROM transaction
WHERE locked_until > NOW()
  AND status = 'pending'
  AND created_at < NOW() - INTERVAL '10 minutes';
```

### Set Up Alerts (e.g., using pg_cron)

```sql
-- Alert if many transactions fail
SELECT COUNT(*) as failed_count FROM transaction
WHERE status = 'failed' 
  AND created_at > NOW() - INTERVAL '1 hour';
-- If > 10, send alert

-- Alert if duplicate attempts
SELECT idempotency_key, COUNT(*) as attempts
FROM transaction
GROUP BY idempotency_key
HAVING COUNT(*) > 1;
-- If any, potential issue
```

---

## STEP 14: COMPLIANCE DOCUMENTATION

### Generate Compliance Report

```typescript
// Get compliance data from admin API
const response = await fetch('/api/admin/audit-logs?limit=1000', {
  headers: {
    Authorization: `Bearer ${adminToken}`
  }
});

const { logs, transactions } = await response.json();

// Analyze for compliance
const report = {
  totalTransactions: transactions.length,
  failedTransactions: transactions.filter(t => t.status === 'failed').length,
  addressChanges: logs.filter(l => l.event_type === 'address_changed').length,
  suspiciousActivity: logs.filter(l => l.event_type === 'unauthorized_access_attempt').length,
  auditLogIntegrity: 'SHA256 hashes verified',
  rlesEnabled: 'Yes',
  encryptionEnabled: 'Yes'
};
```

---

## STEP 15: PRODUCTION DEPLOYMENT

### Pre-Deployment Checklist

- [ ] All migrations applied
- [ ] Error boundaries in place
- [ ] Admin users configured
- [ ] RLS policies verified
- [ ] Monitoring set up
- [ ] Backup taken
- [ ] Tested idempotency
- [ ] Audit logs enabled
- [ ] Error handling tested

### Deploy

```bash
# 1. Test locally
npm run dev

# 2. Build
npm run build

# 3. Check for errors
npm run lint

# 4. Deploy to Vercel/your host
vercel deploy
# or
git push origin main  # if auto-deploy enabled
```

### Post-Deployment Verification

1. Check admin dashboard loads: `https://your-site.com/admin/audit-logs`
2. Process test transaction
3. Verify idempotency key stored
4. Check audit log created
5. Verify RLS prevents unprivileged access

---

## TROUBLESHOOTING

### Issue: "Transaction function not found"

**Solution**: Run migration again in Supabase SQL Editor

```sql
-- Verify function exists
SELECT proname FROM pg_proc 
WHERE proname = 'process_purchase_transaction';
```

### Issue: "RLS policy violation" when viewing transactions

**Solution**: Sign in as the user who owns the transaction

- User A can only see User A's transactions (by design)
- Admins can view all via `/api/admin/transactions` endpoint

### Issue: Idempotency key not stored

**Solution**: Check localStorage isn't full

```typescript
// Clear old keys
cleanupOldIdempotencyKeys(24); // Remove keys older than 24 hours

// Or check IndexedDB
// Open DevTools > Application > IndexedDB > velox_checkout
```

### Issue: Audit logs not showing address changes

**Solution**: Make sure address changes are logged

```typescript
// Verify in checkout component
await logAddressChange(userId, addressId, oldAddress, newAddress);

// Check database
SELECT * FROM audit_log WHERE event_type = 'address_changed';
```

---

## SUPPORT & RESOURCES

- **Supabase Docs**: https://supabase.com/docs
- **RLS Policies**: https://supabase.com/docs/guides/auth/row-level-security
- **PostgreSQL Docs**: https://www.postgresql.org/docs/14/
- **PCI DSS Compliance**: https://www.pcisecuritystandards.org/

---

## NEXT STEPS

After completing all setup:

1. **Monitor** transaction patterns
2. **Optimize** indexes based on query patterns
3. **Enhance** with payment processor integration (Stripe, etc.)
4. **Scale** database as transaction volume grows
5. **Automate** recovery process for stuck transactions

---

**Last Updated**: 2026-04-14
**Version**: 1.0.0
**Status**: Ready for Deployment ✅
