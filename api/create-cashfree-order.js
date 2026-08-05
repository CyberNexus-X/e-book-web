export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const appId     = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const apiVersion = '2023-08-01';

  if (!appId || !secretKey) {
    console.error('[create-cashfree-order] Missing Cashfree credentials in environment variables.');
    return res.status(500).json({ success: false, error: 'Cashfree API credentials not configured.' });
  }

  try {
    const { amount, name, email, mobile } = req.body || {};

    if (!name || !email || !mobile) {
      return res.status(400).json({ success: false, error: 'Missing customer details (name, email, mobile).' });
    }

    const orderAmount = parseFloat(amount) || 1.00;
    const orderId     = 'order_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const returnPath  = req.body.returnPath || '../payment/cashfree/test/';
    const returnUrl   = `https://${req.headers.host}/${returnPath}?order_id={order_id}`;

    const payload = {
      order_amount:   orderAmount,
      order_currency: 'INR',
      order_id:       orderId,
      customer_details: {
        customer_id:    'cust_' + Date.now(),
        customer_name:  name,
        customer_email: email,
        customer_phone: mobile
      },
      order_meta: {
        return_url: returnUrl
      }
    };

    console.log('[Backend] req.body:', req.body);
    console.log('[Backend] customer_details:', payload.customer_details);
    console.log('[Backend] Cashfree Request:', payload);

    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-client-id':     appId,
        'x-client-secret': secretKey,
        'x-api-version':   apiVersion
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('[Backend] Cashfree Response:', data);

    if (!response.ok) {
      console.error('[create-cashfree-order] Cashfree API error:', response.status, JSON.stringify(data));
      return res.status(response.status).json({ success: false, error: data.message || 'Cashfree order creation failed' });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('[create-cashfree-order] Unexpected error:', error.message);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
