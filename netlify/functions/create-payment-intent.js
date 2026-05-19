const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

/**
 * Generate a proper UUID v4 for session IDs
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Validate UUID format (v4)
 */
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

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

    let { sessionId, email, amount = 999 } = JSON.parse(event.body);

    if (!sessionId || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId or email' })
      };
    }

    // Validate and fix sessionId format - if not a valid UUID, generate one
    if (!isValidUUID(sessionId)) {
      console.warn(`Invalid sessionId format: ${sessionId}, generating new UUID`);
      sessionId = generateUUID();
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

    // Ensure quiz_sessions record exists (create if missing, or get existing by email)
    let existingSessionId = sessionId;
    const { data: existingSession, error: sessionCheckError } = await supabase
      .from('quiz_sessions')
      .select('id')
      .eq('email', email)
      .single();

    if (existingSession) {
      // Session exists for this email, but validate its ID format
      if (!isValidUUID(existingSession.id)) {
        // If existing session has bad UUID format, fix it
        console.warn(`Existing session has invalid UUID: ${existingSession.id}, updating to new UUID`);
        const newValidUUID = generateUUID();
        await supabase
          .from('quiz_sessions')
          .update({ id: newValidUUID })
          .eq('email', email);
        existingSessionId = newValidUUID;
      } else {
        existingSessionId = existingSession.id;
      }
    } else {
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

    // Use the correct sessionId for all subsequent operations
    const finalSessionId = existingSessionId;

    // Record payment in Supabase
    const { data, error } = await supabase
      .from('payments')
      .insert({
        session_id: finalSessionId,
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
      .eq('id', finalSessionId);

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
