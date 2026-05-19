const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async (event) => {
  // Initialize Supabase inside handler to ensure env vars are loaded
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  try {
    // Handle the event
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(stripeEvent.data.object, supabase);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object, supabase);
        break;
      default:
        console.log(`Unhandled event type ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function handlePaymentSuccess(paymentIntent, supabase) {
  const { sessionId, email } = paymentIntent.metadata;

  // Update payment record
  await supabase
    .from('payments')
    .update({
      status: 'succeeded',
      stripe_charge_id: paymentIntent.charges.data[0]?.id,
      completed_at: new Date().toISOString(),
      stripe_webhook_received: true,
      webhook_received_at: new Date().toISOString()
    })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  // Update quiz session
  await supabase
    .from('quiz_sessions')
    .update({
      payment_status: 'paid',
      payment_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', sessionId);

  console.log(`Payment succeeded for session: ${sessionId}`);
}

async function handlePaymentFailed(paymentIntent, supabase) {
  const { sessionId } = paymentIntent.metadata;

  // Update payment record
  await supabase
    .from('payments')
    .update({
      status: 'failed',
      stripe_webhook_received: true,
      webhook_received_at: new Date().toISOString()
    })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  console.log(`Payment failed for session: ${sessionId}`);
}
