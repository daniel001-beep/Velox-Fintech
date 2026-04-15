# Velox E-Commerce: Quick Reference Guide

## 🎯 6 Advanced Features - Quick Lookup

---

## 1. IDEMPOTENCY

**Purpose**: Prevent duplicate transactions if request sent twice

**How**: Unique `idempotency_key` per transaction

**Usage**:
```typescript
const key = generateIdempotencyKey(userId, orderId);
storeIdempotencyKey(key, orderId);
const response = await processPurchaseTransaction({ userId, orderId, amount });
```

**Database**: `transactions.idempotency_key` (UNIQUE)

**Test**: Send same transaction twice, should return same transaction ID

---

## 2. DOUBLE-ENTRY BOOKKEEPING

**Purpose**: Ensure financial accuracy with debit/credit pairs

**How**: Every transaction creates 2 ledger entries (must match)

**Schema**:
```sql
Ledger Entry 1 (Debit):  Customer Balance -$100
Ledger Entry 2 (Credit): Store Revenue +$100
```

**Database**: `ledger_entry` table + `process_purchase_transaction()` function

**Verify**: `select * from verify_transaction_integrity(tx_id)`

---

## 3. ROW-LEVEL SECURITY (RLS)

**Purpose**: Users can only see their own data

**How**: RLS policies at database level

**What's Protected**:
- Users can't see other users' transactions
- Users can't see other users' audit logs
- Users can't directly modify ledger entries

**Database**: ENABLE ROW LEVEL SECURITY on transaction, ledger_entry, audit_log tables

**Test**: Try accessing another user's transaction (should fail)

---

## 4. AUDIT LOGGING

**Purpose**: Track all financial/cart changes for compliance

**What's Logged**:
- ✅ Cart modifications
- ✅ Address changes
- ✅ Checkout attempts
- ✅ Transaction status changes (auto via trigger)

**Usage**:
```typescript
await logCartModification(userId, cartId, { action: "add" });
await logAddressChange(userId, addressId, oldAddr, newAddr);
await logCheckoutAttempt(userId, orderId, { email, city });
```

**Database**: `audit_log` table (immutable - can't delete)

**Tamper Detection**: SHA256 hash of changes

---

## 5. ERROR BOUNDARIES & RECOVERY

**Purpose**: App doesn't crash, user data recovers from network failures

**How**: React Error Boundaries + localStorage + IndexedDB

**Usage**:
```tsx
<PaymentErrorBoundary onError={(error, info) => {}}>
  <CheckoutForm />
</PaymentErrorBoundary>
```

**What Happens When Error**:
1. Save checkpoint to sessionStorage
2. Show recovery UI
3. Try reconnect every 5s
4. User can restore data manually

**localStorage Keys**: All `idempotency_*` keys store transaction state

---

## 6. ADMIN AUDIT VIEWER

**Purpose**: Admin sees all transactions & audit logs (compliance)

**Access**: `/admin/audit-logs` (requires `is_admin: true`)

**What Admin Can See**:
- All audit logs (searches by user/IP)
- All transactions with ledger verification
- Analysis dashboard

**Safety**: 
- ✅ JWT verification required
- ✅ Admin status checked in DB
- ✅ Unauthorized attempts logged

**API Endpoints**:
- `GET /api/admin/transactions` - All transactions
- `GET /api/admin/audit-logs` - All audit logs

---

## 📁 FILES CHEAT SHEET

| Feature | Files | Where |
|---------|-------|-------|
| Idempotency | `transaction-idempotency.ts` | `/utils/` |
| Double-Entry | `schema-v2.ts` + SQL migration | Both |
| RLS | SQL migration | `migrations/001-*.sql` |
| Audit | Multiple files | Schema + Utility |
| Error Boundaries | `ErrorBoundaries.tsx` | `/components/` |
| Admin Viewer | `AdminAuditLogViewer.tsx` + API routes | `/components/` + `/api/admin/` |

---

## 🧪 COMMON TESTING SCENARIOS

### Test 1: Duplicate Transaction Prevention
```typescript
// Send same transaction twice
await processPurchaseTransaction({ orderId: 123, amount: 99.99 });
await processPurchaseTransaction({ orderId: 123, amount: 99.99 });
// Result: Both return same transaction ID ✅
```

### Test 2: Verify Ledger Balance
```sql
SELECT debit_sum, credit_sum
WHERE transaction_id = 'xxx'
-- Result: Both should be $99.99 ✅
```

### Test 3: Cross-User Data Isolation
```sql
-- As User A
SELECT * FROM transaction;
-- Result: Only User A's data

-- As User B
SELECT * FROM transaction;
-- Result: Only User B's data (RLS blocks cross-access) ✅
```

### Test 4: Error Recovery
1. Open checkout
2. Turn off internet
3. Submit (should error)
4. Turn on internet
5. Click "Retry" or "Restore"
6. Should recover ✅

### Test 5: Make User Admin
```sql
UPDATE "user" SET is_admin = true WHERE email = 'admin@example.com';
-- Then navigate to /admin/audit-logs
```

---

## 🚨 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Function not found" | Run migration in Supabase SQL Editor |
| "RLS violation" | User trying to access another user's data - by design |
| Idempotency key not stored | localStorage full - run `cleanupOldIdempotencyKeys()` |
| Admin dashboard 403 | User not admin - set `is_admin: true` |
| Error boundary not showing | Component not wrapped with boundary |
| Audit logs not showing | Make sure `logAuditEvent()` called |

---

## 📊 DATABASE QUERIES

### Get User's Transactions
```sql
SELECT * FROM transaction 
WHERE user_id = 'user-123'
ORDER BY created_at DESC;
```

### Get Ledger for Transaction
```sql
SELECT entry_type, amount, description
FROM ledger_entry
WHERE transaction_id = 'tx-uuid'
ORDER BY created_at;
```

### Get User's Audit Logs
```sql
SELECT * FROM audit_log
WHERE user_id = 'user-123'
ORDER BY timestamp DESC
LIMIT 50;
```

### Find Failed Transactions
```sql
SELECT id, amount, error_message, created_at
FROM transaction
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### Check Transaction Integrity
```sql
SELECT * FROM verify_transaction_integrity('tx-uuid');
-- Result: is_valid=true/false, debit_count, credit_count, matches
```

---

## 🔐 SECURITY QUICK CHECKLIST

- [ ] RLS enabled on transaction table
- [ ] RLS enabled on ledger_entry table
- [ ] RLS enabled on audit_log table
- [ ] No direct user access to /api/admin routes
- [ ] JWT verified before admin operations
- [ ] Admin status checked in database
- [ ] Unauthorized access attempts logged
- [ ] Idempotency key unique at database level
- [ ] Pessimistic lock prevents race conditions
- [ ] Audit logs immutable (can't delete)

---

## 💡 BEST PRACTICES

1. **Always generate idempotency key** before transaction
2. **Always wrap checkout in ErrorBoundary**
3. **Always verify admin manually before first use**
4. **Always log checkout attempts** for compliance
5. **Always run test suite** after deployment
6. **Monitor failed transactions** - set alerts
7. **Review audit logs weekly** for anomalies
8. **Backup database regularly** before changes

---

## 📞 QUICK HELP

**Need to...**

**Process a transaction?**
```typescript
import { processPurchaseTransaction } from "@/utils/transaction-idempotency";
await processPurchaseTransaction({ userId, orderId, amount });
```

**Log an action?**
```typescript
import { logAuditEvent } from "@/utils/transaction-idempotency";
await logAuditEvent({ userId, eventType, entityType, entityId, changes });
```

**Verify transactions?**
```typescript
import { verifyTransactionIntegrity } from "@/utils/transaction-idempotency";
await verifyTransactionIntegrity(transactionId);
```

**Make user admin?**
```sql
UPDATE "user" SET is_admin = true WHERE email = 'email@example.com';
```

**View admin dashboard?**
Navigate to `/admin/audit-logs` (requires admin)

**Run tests?**
```typescript
import { runAllTests } from "@/utils/test-suite";
await runAllTests();
```

---

## 🎯 DEPLOYMENT SUMMARY

```
1. Run migration (SQL)
2. Update schema reference  
3. Update checkout page ✅ (already done)
4. Deploy error boundaries ✅ (already done)
5. Deploy admin viewer ✅ (already done)
6. Make first admin user
7. Run test suite
8. Monitor in production
```

---

**Last Updated**: 2026-04-14  
**Version**: 1.0.0
