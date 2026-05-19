/**
 * VelourPulse Quiz Submission Handler
 * Manages quiz completion and database saving
 */

const QuizSubmission = {
  /**
   * Submit free quiz answers
   */
  async submitFreeQuiz(answers) {
    try {
      console.log('Submitting free quiz...');

      // Get session and email (should already be set by email modal)
      let sessionId = localStorage.getItem('vp_session_id');
      let email = localStorage.getItem('vp_user_email');

      if (!sessionId) {
        sessionId = 'session_' + Date.now();
        localStorage.setItem('vp_session_id', sessionId);
      }

      // Email must be set by modal before quiz submission
      if (!email) {
        console.error('Email not found - should have been set by email modal');
        return { success: false, error: 'Email required' };
      }

      // Save answers to database
      await API.recordAnswers(sessionId, email, answers, 'free');

      // Store locally for immediate use
      localStorage.setItem('vp_free_answers', JSON.stringify(answers));
      localStorage.setItem('vp_free_quiz_completed', 'true');

      console.log('✓ Free quiz submitted successfully');
      return { success: true, sessionId, email };

    } catch (error) {
      console.error('✗ Error submitting free quiz:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Submit premium quiz answers
   */
  async submitPremiumQuiz(answers) {
    try {
      console.log('Submitting premium quiz...');

      const sessionId = localStorage.getItem('vp_session_id');
      const email = localStorage.getItem('vp_user_email');

      if (!sessionId || !email) {
        throw new Error('Session or email not found');
      }

      // Save premium answers to database
      await API.recordAnswers(sessionId, email, answers, 'premium');

      // Store locally
      localStorage.setItem('vp_premium_answers', JSON.stringify(answers));
      localStorage.setItem('vp_premium_quiz_completed', 'true');

      // Merge free + premium answers into vp_all_answers
      const freeAnswers = JSON.parse(localStorage.getItem('vp_free_answers')) || {};
      const allAnswers = { ...freeAnswers, ...answers };
      localStorage.setItem('vp_all_answers', JSON.stringify(allAnswers));

      console.log('✓ Premium quiz submitted successfully');
      return { success: true, sessionId, email };

    } catch (error) {
      console.error('✗ Error submitting premium quiz:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get current session info
   */
  getSession() {
    return {
      sessionId: localStorage.getItem('vp_session_id'),
      email: localStorage.getItem('vp_user_email'),
      freeCompleted: localStorage.getItem('vp_free_quiz_completed') === 'true',
      premiumCompleted: localStorage.getItem('vp_premium_quiz_completed') === 'true'
    };
  },

  /**
   * Clear session (for testing/retakes)
   */
  clearSession() {
    localStorage.removeItem('vp_session_id');
    localStorage.removeItem('vp_user_email');
    localStorage.removeItem('vp_free_answers');
    localStorage.removeItem('vp_premium_answers');
    localStorage.removeItem('vp_all_answers');
    localStorage.removeItem('vp_free_quiz_completed');
    localStorage.removeItem('vp_premium_quiz_completed');
    console.log('Session cleared');
  }
};
