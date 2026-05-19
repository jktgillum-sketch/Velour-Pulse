/**
 * RETRIEVE QUIZ RESULTS
 * Called to fetch a user's saved profile by email
 *
 * In production: Query your database (Supabase, Firebase, etc.)
 * For MVP: Retrieves from in-memory store (shared with save-quiz-session)
 */

// This would be replaced with database in production
const savedSessions = {};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email' })
      };
    }

    // Look up session by email (MVP: in-memory)
    const session = savedSessions[email];

    if (!session) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'No profile found for this email',
          found: false
        })
      };
    }

    // Return session data (don't expose sensitive payment info)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        found: true,
        sessionId: session.sessionId,
        email: session.email,
        allAnswers: session.allAnswers,
        savedAt: session.savedAt,
        accessUrl: `/results-full.html?sessionId=${encodeURIComponent(session.sessionId)}`
      })
    };
  } catch (error) {
    console.error('Retrieve Quiz Results Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message || 'Failed to retrieve quiz results',
        found: false
      })
    };
  }
};
