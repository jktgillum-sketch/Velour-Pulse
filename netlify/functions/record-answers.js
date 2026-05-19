const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    // Initialize Supabase inside handler to ensure env vars are loaded
    console.log('ENV SUPABASE_URL:', process.env.SUPABASE_URL);
    console.log('ENV SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { sessionId, email, answers, tier } = JSON.parse(event.body);
    console.log('Request data:', { sessionId, email, tier, answersCount: Object.keys(answers || {}).length });

    if (!sessionId || !email || !answers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields', got: { sessionId, email, answers: !!answers } })
      };
    }

    // Update quiz session with answers
    console.log('Attempting to update quiz_sessions for sessionId:', sessionId);
    const { data, error } = await supabase
      .from('quiz_sessions')
      .update({
        [tier === 'premium' ? 'premium_answers' : 'free_answers']: answers,
        all_answers: answers,
        [`${tier}_quiz_completed_at`]: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select();

    if (error) {
      console.error('Supabase update error:', { message: error.message, code: error.code, details: error.details });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message, code: error.code, details: error.details })
      };
    }

    console.log('Quiz session updated successfully:', { sessionId, rowsAffected: data?.length });

    // Log individual answers
    for (const [questionId, answerValue] of Object.entries(answers)) {
      await supabase
        .from('quiz_answers_log')
        .insert({
          session_id: sessionId,
          question_id: parseInt(questionId),
          answer_value: answerValue,
          answered_at: new Date().toISOString()
        });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        sessionId,
        message: `${tier} quiz answers recorded`
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
