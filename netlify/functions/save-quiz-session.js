/**
 * SAVE QUIZ SESSION
 * Called after successful payment to store user's quiz answers with their email
 *
 * In production: Replace this with Supabase, Firebase, or your database
 * For MVP: This stores in memory (will reset on function reload)
 */

// Simple in-memory store for MVP
const savedSessions = {};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { sessionId, email, freeAnswers, premiumAnswers, paymentIntentId } = JSON.parse(event.body);

    if (!email || !sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email or sessionId' })
      };
    }

    // Save session to database (MVP: in-memory)
    savedSessions[email] = {
      sessionId,
      email,
      freeAnswers: freeAnswers || {},
      premiumAnswers: premiumAnswers || {},
      allAnswers: { ...freeAnswers, ...premiumAnswers },
      paymentIntentId,
      savedAt: new Date().toISOString(),
      status: 'completed'
    };

    console.log(`Quiz session saved for ${email}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Quiz session saved',
        sessionId: sessionId,
        email: email
      })
    };
  } catch (error) {
    console.error('Save Quiz Session Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message || 'Failed to save quiz session'
      })
    };
  }
};
