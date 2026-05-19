# VelourPulse Frontend-Backend Integration Guide

## New Scripts Created

### 1. `js/api-integration.js`
Main API layer that communicates with Netlify functions.

**Usage:**
```javascript
// Record quiz answers
await API.recordAnswers(sessionId, email, answers, 'free');

// Create payment intent
const paymentData = await API.createPaymentIntent(sessionId, email, 999);

// Get results
const results = await API.getResults(sessionId, email);
```

### 2. `js/quiz-submission.js`
Handles quiz completion workflow.

**Usage:**
```javascript
// Submit free quiz
const result = await QuizSubmission.submitFreeQuiz(answers);

// Submit premium quiz
const result = await QuizSubmission.submitPremiumQuiz(answers);

// Get current session
const session = QuizSubmission.getSession();

// Clear session (for retakes)
QuizSubmission.clearSession();
```

### 3. `js/results-loader.js`
Fetches and manages quiz results.

**Usage:**
```javascript
// Load results from database
const results = await ResultsLoader.loadResults();

// Check if premium user
const isPremium = ResultsLoader.isPremiumUser();

// Get session info
const session = ResultsLoader.getSession();

// Mark as premium after payment
ResultsLoader.markPremiumUnlocked(email);
```

---

## Implementation Steps

### Step 1: Add Script Tags

Add these to your HTML pages (in `<head>` or before closing `</body>`):

```html
<script src="/js/api-integration.js"></script>
<script src="/js/quiz-submission.js"></script>
<script src="/js/results-loader.js"></script>
```

### Step 2: Update Quiz Pages

In your quiz completion handler, call:

```javascript
// When user completes free quiz
const answers = { /* quiz answers */ };
const result = await QuizSubmission.submitFreeQuiz(answers);

if (result.success) {
  window.location.href = '/results-free.html?session=' + result.sessionId;
}
```

### Step 3: Update Checkout

The checkout.html already has Stripe integration. Just make sure it calls:

```javascript
// Email from form
const email = document.getElementById('email').value;

// Initialize session
const sessionId = localStorage.getItem('vp_session_id') || 'session_' + Date.now();
localStorage.setItem('vp_session_id', sessionId);
localStorage.setItem('vp_user_email', email);

// Create payment intent
const paymentData = await API.createPaymentIntent(sessionId, email, 999);
```

### Step 4: Update Results Pages

In results-free.html and results-full.html:

```javascript
// Load results from database
const results = await ResultsLoader.loadResults();
if (results) {
  // Use database results
  dimensionScores = results.dimensionScores;
  archetype = results.primaryArchetype;
  // ... etc
} else {
  // Fall back to localStorage/client-side calculation
  const answers = JSON.parse(localStorage.getItem('vp_free_answers')) || {};
  // ... existing logic
}
```

### Step 5: Success Page

After payment succeeds, update success page to mark premium:

```javascript
const email = localStorage.getItem('vp_user_email');
ResultsLoader.markPremiumUnlocked(email);

// Then redirect to full results
setTimeout(() => {
  window.location.href = '/results-full.html';
}, 2000);
```

---

## Database Flow

### Free Quiz Flow:
1. User completes 20-question quiz
2. `submitFreeQuiz()` saves answers to Supabase
3. Redirect to `/results-free.html`
4. Results page calculates and displays free profile

### Premium Flow:
1. User clicks "Upgrade"
2. Go to `/checkout.html`
3. `createPaymentIntent()` creates Stripe intent
4. User pays with card
5. Stripe webhook calls backend function
6. Database marks payment as complete
7. User redirected to premium results
8. `markPremiumUnlocked()` sets local flag
9. Premium quiz becomes available
10. User completes premium quiz
11. `submitPremiumQuiz()` saves extended answers
12. Full results page shows all 18 archetypes

---

## Testing Checklist

- [ ] Free quiz submits answers to database
- [ ] Results page loads from database
- [ ] Checkout creates payment intent
- [ ] Stripe payment processes
- [ ] Webhook confirms payment
- [ ] Premium unlock message shows
- [ ] Premium quiz becomes available
- [ ] Premium answers save to database
- [ ] Full results display correctly

---

## Deployment

After implementing these integrations:

1. Save all changes
2. Redeploy to Netlify (drag & drop the folder again)
3. Test the full flow on live site

The backend is already live and ready!
