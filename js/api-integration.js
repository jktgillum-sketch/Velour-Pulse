/**
 * VelourPulse Frontend → Netlify Functions Integration
 * Handles all API calls to backend functions
 */

const API = {
  BASE_URL: '/.netlify/functions',

  /**
   * Record quiz answers to database
   */
  async recordAnswers(sessionId, email, answers, tier = 'free') {
    try {
      const response = await fetch(`${this.BASE_URL}/record-answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          email,
          answers,
          tier
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Answers recorded:', data);
      return data;
    } catch (error) {
      console.error('✗ Error recording answers:', error);
      throw error;
    }
  },

  /**
   * Create Stripe payment intent
   */
  async createPaymentIntent(sessionId, email, amount = 999) {
    try {
      const response = await fetch(`${this.BASE_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          email,
          amount
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Payment intent created:', data);
      return data;
    } catch (error) {
      console.error('✗ Error creating payment intent:', error);
      throw error;
    }
  },

  /**
   * Fetch quiz results
   */
  async getResults(sessionId, email) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/get-results?sessionId=${encodeURIComponent(sessionId)}&email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Results fetched:', data);
      return data;
    } catch (error) {
      console.error('✗ Error fetching results:', error);
      throw error;
    }
  },

  /**
   * Initialize or get session
   */
  async initSession(email) {
    try {
      const sessionId = localStorage.getItem('vp_session_id') || 'session_' + Date.now();
      localStorage.setItem('vp_session_id', sessionId);
      localStorage.setItem('vp_user_email', email);

      console.log('✓ Session initialized:', sessionId);
      return sessionId;
    } catch (error) {
      console.error('✗ Error initializing session:', error);
      throw error;
    }
  },

  /**
   * Verify payment status with backend
   */
  async verifyPaymentStatus(sessionId, email) {
    try {
      const response = await fetch(`${this.BASE_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          email
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✓ Payment verified:', data);
      return data;
    } catch (error) {
      console.error('✗ Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Retrieve session by email for recovery
   */
  async getSessionByEmail(email) {
    try {
      const response = await fetch(`${this.BASE_URL}/get-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Session not found');
      }

      const data = await response.json();
      console.log('✓ Session retrieved:', data);
      return data;
    } catch (error) {
      console.error('✗ Error retrieving session:', error);
      throw error;
    }
  }
};

/**
 * Quiz Flow Helpers
 */
const QuizFlow = {
  /**
   * Complete free quiz and save answers
   */
  async completeFreQuiz(answers) {
    try {
      const sessionId = localStorage.getItem('vp_session_id');
      const email = localStorage.getItem('vp_user_email');

      if (!sessionId || !email) {
        throw new Error('Session or email not found');
      }

      // Save answers to database
      await API.recordAnswers(sessionId, email, answers, 'free');

      // Mark free quiz as completed
      localStorage.setItem('vp_free_quiz_completed', 'true');
      localStorage.setItem('vp_free_answers', JSON.stringify(answers));

      return { success: true, sessionId };
    } catch (error) {
      console.error('Error completing free quiz:', error);
      throw error;
    }
  },

  /**
   * Complete premium quiz and save answers
   */
  async completePremiumQuiz(answers) {
    try {
      const sessionId = localStorage.getItem('vp_session_id');
      const email = localStorage.getItem('vp_user_email');

      if (!sessionId || !email) {
        throw new Error('Session or email not found');
      }

      // Save premium answers to database
      await API.recordAnswers(sessionId, email, answers, 'premium');

      // Mark premium quiz as completed
      localStorage.setItem('vp_premium_quiz_completed', 'true');
      localStorage.setItem('vp_premium_answers', JSON.stringify(answers));

      return { success: true, sessionId };
    } catch (error) {
      console.error('Error completing premium quiz:', error);
      throw error;
    }
  },

  /**
   * Initiate checkout and create payment intent
   */
  async initiateCheckout(email) {
    try {
      const sessionId = localStorage.getItem('vp_session_id');

      if (!sessionId) {
        throw new Error('Session not found');
      }

      // Create payment intent
      const paymentData = await API.createPaymentIntent(sessionId, email, 999);

      // Store for use in Stripe payment
      localStorage.setItem('vp_payment_intent_id', paymentData.paymentIntentId);
      localStorage.setItem('vp_client_secret', paymentData.clientSecret);

      return paymentData;
    } catch (error) {
      console.error('Error initiating checkout:', error);
      throw error;
    }
  }
};

/**
 * Export for use in other scripts
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API, QuizFlow };
}
