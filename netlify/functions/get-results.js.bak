const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    // Initialize Supabase inside handler to ensure env vars are loaded
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { sessionId, email } = event.queryStringParameters || {};

    if (!sessionId || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId or email' })
      };
    }

    // Fetch quiz results
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('session_id', sessionId)
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Results not found' })
      };
    }

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Results not found' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        results: {
          dimensionScores: data.dimension_scores,
          archetypeScores: data.archetype_scores,
          primaryArchetype: data.primary_archetype,
          bdsmProfile: data.bdsm_profile,
          recommendedProducts: data.recommended_products,
          resultTier: data.result_tier,
          calculatedAt: data.calculated_at
        }
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
