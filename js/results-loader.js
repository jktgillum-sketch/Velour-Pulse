/**
 * VelourPulse Results Loader
 * Fetches and displays quiz results from the database
 */

const ResultsLoader = {
  /**
   * Load results from database
   */
  async loadResults() {
    try {
      const sessionId = localStorage.getItem('vp_session_id');
      const email = localStorage.getItem('vp_user_email');

      if (!sessionId || !email) {
        console.warn('No session or email found, using local results');
        return null;
      }

      console.log('Loading results from database...');
      const result = await API.getResults(sessionId, email);

      if (result.success && result.results) {
        console.log('✓ Results loaded from database');
        return result.results;
      }

      return null;

    } catch (error) {
      console.warn('Could not load from database, using local results:', error);
      return null;
    }
  },

  /**
   * Get results from localStorage (fallback)
   */
  getLocalResults() {
    const freeAnswers = JSON.parse(localStorage.getItem('vp_free_answers')) || {};
    const premiumAnswers = JSON.parse(localStorage.getItem('vp_premium_answers')) || {};

    return {
      freeAnswers,
      premiumAnswers,
      allAnswers: { ...freeAnswers, ...premiumAnswers }
    };
  },

  /**
   * Check if user has premium access
   */
  isPremiumUser() {
    return localStorage.getItem('vp_premium_unlocked') === 'true' ||
           localStorage.getItem('velourPulseUnlocked') === 'true';
  },

  /**
   * Get session info
   */
  getSession() {
    return {
      sessionId: localStorage.getItem('vp_session_id'),
      email: localStorage.getItem('vp_user_email'),
      premiumEmail: localStorage.getItem('vp_premium_email') || localStorage.getItem('velourPulseEmail'),
      isPremium: this.isPremiumUser()
    };
  },

  /**
   * Mark premium as unlocked (after successful payment)
   */
  markPremiumUnlocked(email) {
    localStorage.setItem('vp_premium_unlocked', 'true');
    localStorage.setItem('vp_premium_email', email);
    localStorage.setItem('vp_premium_date', new Date().toISOString());
  }
};
