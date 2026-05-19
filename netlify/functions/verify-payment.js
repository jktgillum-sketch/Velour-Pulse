/**
 * Verify Payment Status
 * Backend-only verification that user has paid for premium access
 * Cannot be bypassed by client-side manipulation
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

    const { sessionId, email } = JSON.parse(event.body);

    if (!sessionId || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId or email' })
      };
    }

    // Query quiz_sessions table for payment status
    const { data: session, error } = await supabase
      .from('quiz_sessions')
      .select('id, email, payment_status, payment_completed_at')
      .eq('id', sessionId)
      .eq('email', email)
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error' })
      };
    }

    // Session not found
    if (!session) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          isPaid: false,
          error: 'Session not found'
        })
      };
    }

    // Check payment status from database
    const isPaid = session.payment_status === 'paid';
    const paidDate = session.payment_completed_at;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        isPaid: isPaid,
        paidDate: paidDate,
        sessionId: sessionId,
        email: email
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
