# VelourPulse Testing Checklist

**Server Running:** `http://localhost:8000`

---

## 🎯 STEP 1: Test Free Quiz (20 Questions)

**URL:** http://localhost:8000/quiz.html

### What to Check:
- [ ] Progress bar shows "1 of 20"
- [ ] Quiz title shows "Velour Pulse"
- [ ] Scale buttons appear **without numbers** (just 7 clean boxes)
- [ ] Legend shows: "Strongly Disagree" | "Neutral" | "Strongly Agree"
- [ ] Click a scale button → it highlights in pink
- [ ] Answer all 20 questions
- [ ] Click "View Results" on question 20

---

## 💎 STEP 2: Free Results Page

**URL:** http://localhost:8000/results-free.html

### What to Check:
- [ ] Shows top 3 dimensions with percentage scores
- [ ] Primary archetype displays (e.g., "Dominant", "Submissive", etc.)
- [ ] Shows BDSM profile summary (top 3 categories)
- [ ] Shows 5 product recommendations in grid
- [ ] **Upgrade CTA visible:** "Continue Your Full Profile — $9.99"
- [ ] Lists 8 unlock features:
  - [ ] All 10 dimension scores
  - [ ] Complete **18-archetype** breakdown (NOT 12)
  - [ ] Full BDSM/kink profile
  - [ ] 15-25 product recommendations
  - [ ] Custom guides
  - [ ] **NO "Partner compatibility"** (should be removed)
  - [ ] Downloadable PDF
  - [ ] Lifetime access
- [ ] "Retake Quiz" button works

---

## 🧪 STEP 3: Test Data Generator

**URL:** http://localhost:8000/test-quiz-data.html

### What to Check:
- [ ] 4 profile options visible (Balanced, Dominant, Submissive, Explorer)
- [ ] Select "Balanced" profile
- [ ] Click "Generate Test Data"
- [ ] Success message appears
- [ ] Click "View Full Results Page"

---

## ✨ STEP 4: Full Premium Results

**URL:** http://localhost:8000/results-full.html

### What to Check - Dimensions & Archetypes:
- [ ] Shows all 10 dimensions with scores
- [ ] Primary archetype card displays
- [ ] **"All 18 Archetypes Breakdown"** section visible
- [ ] All 18 archetypes listed with scores:
  1. [ ] Dominant
  2. [ ] Submissive
  3. [ ] Switch
  4. [ ] Rigger
  5. [ ] Rope Bunny
  6. [ ] Sadist
  7. [ ] Masochist
  8. [ ] Exhibitionist
  9. [ ] Voyeur
  10. [ ] Primal
  11. [ ] Experimentalist
  12. [ ] Caregiver
  13. [ ] Little
  14. [ ] Brat
  15. [ ] Brat Tamer
  16. [ ] Owner
  17. [ ] Pet
  18. [ ] Sensation Seeker

### What to Check - Other Features:
- [ ] Full BDSM/kink profile (6 categories, giving/receiving/combined)
- [ ] 15-25 product recommendations in grid
- [ ] Guide recommendations section
- [ ] **NO "Partner Compatibility" section** (should be removed)
- [ ] PDF download button works
- [ ] Email access form present

---

## 💳 STEP 5: Checkout Page

**URL:** http://localhost:8000/checkout.html

### What to Check:
- [ ] Price shows "$9.99"
- [ ] Features list includes:
  - [ ] All 10 dimension scores
  - [ ] **Complete 18-archetype breakdown** (NOT 12)
  - [ ] Full BDSM/kink profile
  - [ ] 15-25 personalized products
  - [ ] Custom guides
  - [ ] **NO "Partner compatibility V2"** (should be removed)
  - [ ] Downloadable PDF
  - [ ] Lifetime access
- [ ] Email field visible
- [ ] Card element visible
- [ ] Button says "Continue to Full Profile — $9.99"

---

## 🧩 STEP 6: Code Validation ✅

All checks passed:
- ✅ question-framework.js (120 questions)
- ✅ scoring-engine.js (18 archetypes, all scoring functions)
- ✅ product-recommendations.js
- ✅ All Netlify functions valid
- ✅ Quiz scale buttons: No numbers, clean UI
- ✅ Partner Compatibility removed from all pages
- ✅ 18 archetypes wired throughout

---

## 🚀 Ready to Deploy?

If all checks pass:
1. Run: `npm install` (if needed)
2. Deploy to Netlify: `netlify deploy --prod`
3. Verify live site works the same as local

---

## 📝 Notes:
- Test data generator creates random but weighted answers
- All localStorage data clears between tests
- Scale buttons should be clean boxes without any numbers visible
- All text references should say "18 archetypes" not "12"
