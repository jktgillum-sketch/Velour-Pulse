const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    // Initialize Supabase inside handler to ensure env vars are loaded
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { sessionId, email, amount = 999 } = JSON.parse(event.body);

    if (!sessionId || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId or email' })
      };
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        sessionId,
        email
      }
    });

    // Ensure quiz_sessions record exists (create if missing)
    const { data: existingSession, error: sessionCheckError } = await supabase
      .from('quiz_sessions')
      .select('id')
      .eq('id', sessionId)
      .single();

    if (!existingSession) {
      // Session doesn't exist, create it
      const { error: createSessionError } = await supabase
        .from('quiz_sessions')
        .insert({
          id: sessionId,
          email: email,
          payment_status: 'pending',
          created_at: new Date().toISOString()
        });

      if (createSessionError) {
        console.error('Error creating session:', createSessionError);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: createSessionError.message })
        };
      }
    }

    // Record payment in Supabase
    const { data, error } = await supabase
      .from('payments')
      .insert({
        session_id: sessionId,
        email,
        stripe_payment_intent_id: paymentIntent.id,
        amount_cents: amount,
        currency: 'usd',
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }

    // Update session with payment intent ID and set payment_status to pending
    await supabase
      .from('quiz_sessions')
      .update({
        payment_intent_id: paymentIntent.id,
        payment_status: 'pending',
        premium_quiz_started_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
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
