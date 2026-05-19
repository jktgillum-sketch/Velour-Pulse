# PHASE 1: Database Setup
## Step-by-Step Supabase Configuration

**Timeline:** 1 day  
**Outcome:** Live Supabase project with 6 tables, indexes, and security policies

---

## STEP 1: Create Supabase Project

### 1.1 Sign Up / Log In
- [ ] Go to https://supabase.com
- [ ] Click "Start your project"
- [ ] Sign up with email OR GitHub
- [ ] Verify email

### 1.2 Create New Project
- [ ] Click "New Project"
- [ ] **Organization:** Create or select
- [ ] **Project Name:** `velour-pulse-prod`
- [ ] **Database Password:** Create strong password (save it!)
- [ ] **Region:** Choose closest to your users (US-East recommended)
- [ ] Click "Create new project"
- [ ] **Wait 2-3 minutes** for project to initialize

### 1.3 Get Your API Keys
Once project is ready:

- [ ] Left sidebar → "Settings" → "API"
- [ ] Copy and **SAVE** these immediately:
  - [ ] **Project URL:** (format: `https://xxxxx.supabase.co`)
  - [ ] **anon key:** (public, safe to use in frontend)
  - [ ] **service_role key:** (SECRET! Only for backend)

**Store these securely** (password manager, not in code):
```
Project: velour-pulse-prod
URL: https://xxxxx.supabase.co
Anon Key: eyJhbGc...
Service Role: eyJhbGc...
```

---

## STEP 2: Create Tables

### 2.1 Access SQL Editor
- [ ] Left sidebar → "SQL Editor"
- [ ] Click "New Query"
- [ ] You should see a blank SQL editor

### 2.2 Create Table 1: quiz_sessions
Copy and paste this ENTIRE block:

```sql
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Core identity
  email TEXT NOT NULL UNIQUE,
  session_token TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Quiz progress
  free_answers JSONB DEFAULT '{}',
  premium_answers JSONB DEFAULT '{}',
  all_answers JSONB DEFAULT '{}',
  
  -- Payment status
  payment_status TEXT DEFAULT 'unpaid',
  payment_intent_id TEXT,
  payment_completed_at TIMESTAMP,
  
  -- State tracking
  free_quiz_completed_at TIMESTAMP,
  premium_quiz_started_at TIMESTAMP,
  premium_quiz_completed_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create indexes
CREATE INDEX idx_sessions_email ON quiz_sessions(email);
CREATE INDEX idx_sessions_token ON quiz_sessions(session_token);
CREATE INDEX idx_sessions_payment_id ON quiz_sessions(payment_intent_id);
```

- [ ] Click "Run"
- [ ] Should see: "Success. 0 rows affected" (tables don't have data yet)

### 2.3 Create Table 2: quiz_answers_log
```sql
CREATE TABLE quiz_answers_log (
  id BIGSERIAL PRIMARY KEY,
  
  session_id UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  answer_value INTEGER NOT NULL,
  
  answered_at TIMESTAMP DEFAULT NOW(),
  time_to_answer_seconds INTEGER,
  
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id)
);

CREATE INDEX idx_answers_session ON quiz_answers_log(session_id);
```

- [ ] Click "Run"

### 2.4 Create Table 3: quiz_results
```sql
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  session_id UUID NOT NULL UNIQUE REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  
  dimension_scores JSONB,
  archetype_scores JSONB,
  primary_archetype TEXT,
  
  bdsm_profile JSONB,
  recommended_products JSONB,
  
  result_tier TEXT DEFAULT 'free',
  calculated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id)
);

CREATE INDEX idx_results_email ON quiz_results(email);
```

- [ ] Click "Run"

### 2.5 Create Table 4: payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  session_id UUID NOT NULL REFERENCES quiz_sessions(id),
  email TEXT NOT NULL,
  
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  stripe_charge_id TEXT,
  
  amount_cents INTEGER DEFAULT 999,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  
  stripe_webhook_received BOOLEAN DEFAULT FALSE,
  webhook_received_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES quiz_sessions(id)
);

CREATE INDEX idx_payments_email ON payments(email);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_intent_id);
```

- [ ] Click "Run"

### 2.6 Create Table 5: product_clicks
```sql
CREATE TABLE product_clicks (
  id BIGSERIAL PRIMARY KEY,
  
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE SET NULL,
  email TEXT,
  
  product_id TEXT NOT NULL,
  product_name TEXT,
  affiliate_url TEXT,
  
  user_type TEXT,
  quiz_tier_completed TEXT,
  
  clicked_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  utm_source TEXT DEFAULT 'velour-pulse'
);

CREATE INDEX idx_clicks_session ON product_clicks(session_id);
CREATE INDEX idx_clicks_email ON product_clicks(email);
CREATE INDEX idx_clicks_product ON product_clicks(product_id);
```

- [ ] Click "Run"

### 2.7 Create Table 6: email_subscribers (Optional V1+)
```sql
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  email TEXT NOT NULL UNIQUE,
  
  quiz_completed BOOLEAN DEFAULT FALSE,
  quiz_tier TEXT,
  last_active_at TIMESTAMP,
  
  opt_in_marketing BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscribers_email ON email_subscribers(email);
```

- [ ] Click "Run"

### Verification:
- [ ] Left sidebar → "Table Editor"
- [ ] Should see all 6 tables listed:
  - [ ] quiz_sessions
  - [ ] quiz_answers_log
  - [ ] quiz_results
  - [ ] payments
  - [ ] product_clicks
  - [ ] email_subscribers

---

## STEP 3: Set Up Row-Level Security (RLS)

**Why:** Prevent users from directly editing their payment_status or accessing other users' data

### 3.1 Enable RLS on quiz_sessions
- [ ] Go to "Table Editor"
- [ ] Click on `quiz_sessions` table
- [ ] Click "RLS" button at top (or look for security icon)
- [ ] Toggle: "Enable RLS"

### 3.2 Create RLS Policy: Users can read their own sessions
- [ ] Click "Add RLS Policy"
- [ ] **Target roles:** `authenticated`, `anon`
- [ ] **Permitted level:** `SELECT` (read)
- [ ] **Using:** Leave empty for now (or we can add email checking later)
- [ ] Save

### 3.3 Disable direct UPDATE on payment_status
For V1, you can allow this for now (we'll lock it down later via webhook-only updates).

**For now, just document:**
- [ ] Only the Stripe webhook function can update payment_status
- [ ] Frontend NEVER updates it directly

### 3.4 Enable RLS on payments table
- [ ] Click on `payments` table
- [ ] Toggle: "Enable RLS"
- [ ] Add policy: Only service role (backend) can update

---

## STEP 4: Verify All Indexes

Supabase creates indexes automatically when you include CREATE INDEX in your SQL. Verify:

- [ ] Go to "Table Editor"
- [ ] Click `quiz_sessions` → scroll right to "Indexes" tab
- [ ] Should see:
  - [ ] `idx_sessions_email`
  - [ ] `idx_sessions_token`
  - [ ] `idx_sessions_payment_id`

Repeat for other tables with indexes.

---

## STEP 5: Enable Webhooks (For Stripe)

We'll use webhooks for Stripe to update payment status.

### 5.1 Set Up Database Webhook
- [ ] Go to "Database" → "Webhooks" (or "Webhooks" in left sidebar)
- [ ] Click "Create a new webhook"
- [ ] **Name:** `stripe-payment-webhook`
- [ ] **Table:** `payments`
- [ ] **Event:** `UPDATE`
- [ ] **HTTP Request:** We'll configure this in Phase 2
- [ ] **Save** (for now, leave HTTP request blank)

We'll come back to this in Phase 2 when we build the webhook function.

---

## STEP 6: Backup & Settings

### 6.1 Enable Automatic Backups
- [ ] Settings → "Backups"
- [ ] Verify automatic daily backups are enabled
- [ ] Should see: "7-day retention" (free tier)

### 6.2 Connection String
You might need this later for Netlify functions:

- [ ] Settings → "Database"
- [ ] Under "Connection Pooling": Copy the connection string
- [ ] Save it (we'll use in Phase 2)

---

## STEP 7: Verification CHECKLIST

Complete this checklist to confirm Phase 1 is done:

- [ ] Supabase project created: `velour-pulse-prod`
- [ ] All 6 tables exist in Table Editor
- [ ] All indexes created (verify in Indexes tab)
- [ ] RLS enabled on quiz_sessions and payments
- [ ] API keys saved securely:
  - [ ] Project URL
  - [ ] Anon key
  - [ ] Service role key
- [ ] Connection string saved
- [ ] Auto-backups enabled
- [ ] Webhook created (stripe-payment-webhook)

---

## NEXT STEPS (Phase 2)

Once Phase 1 is verified:

1. **Save your Supabase credentials** to Netlify environment variables
2. **Create Netlify functions** (Phase 2)
3. **Wire up Stripe webhook** to point to your function URL

---

## TROUBLESHOOTING

**Q: Getting "column does not exist" error?**
A: Make sure you ran the SQL for that table. Check Table Editor to see if it exists.

**Q: Can't enable RLS?**
A: RLS should toggle on automatically. If stuck, refresh the page.

**Q: Missing indexes?**
A: The CREATE INDEX commands should have run automatically. Go back to SQL Editor and re-run just the CREATE INDEX lines.

**Q: Connection fails?**
A: Check your Project URL and API keys are correct. They're case-sensitive.

---

## TIME ESTIMATE

- Create project: 5 min
- Create 6 tables: 10 min
- Set up RLS: 10 min
- Verify everything: 5 min
- **Total: ~30 minutes**

Once complete, let me know and we'll start **Phase 2: Netlify Functions**.
