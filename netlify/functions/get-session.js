/**
 * Get Session by Email
 * Retrieve user's most recent session and payment status by email
 * Used for session recovery when user returns
 */

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    // Initialize Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email required' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Find most recent session for this email
    const { data: sessions, error } = await supabase
      .from('quiz_sessions')
      .select('id, email, free_answers, premium_answers, payment_status, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Database error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error' })
      };
    }

    // No session found
    if (!sessions || sessions.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          found: false,
          error: 'No session found for this email'
        })
      };
    }

    const session = sessions[0];
    const isPremiumPaid = session.payment_status === 'paid';
    const hasFreeAnswers = session.free_answers && Object.keys(session.free_answers).length > 0;
    const hasPremiumAnswers = session.premium_answers && Object.keys(session.premium_answers).length > 0;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        found: true,
        sessionId: session.id,
        email: session.email,
        isPremiumPaid: isPremiumPaid,
        hasFreeResults: hasFreeAnswers,
        hasPremiumResults: hasPremiumAnswers && isPremiumPaid,
        lastUpdated: session.created_at
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
