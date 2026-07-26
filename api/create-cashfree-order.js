export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Load from Vercel Environment Variables
  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const apiVersion = '2023-08-01';

  if (!appId || !secretKey) {
    return res.status(500).json({ error: 'Cashfree API credentials are not configured in Vercel.' });
  }

  try {
    const amount = req.body?.amount || 2.00;
    const orderId = 'order_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const returnUrl = `https://${req.headers.host}/cashfree-test.html?order_id={order_id}`;

    const payload = {
      order_amount: amount,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: 'test_customer_' + Date.now(),
        customer_name: 'Test User',
        customer_email: 'test@skilllibrary.shop',
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: returnUrl
      }
    };

    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': apiVersion
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
