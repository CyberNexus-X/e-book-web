export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  // Load from Vercel Environment Variables
  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const apiVersion = '2023-08-01';

  if (!appId || !secretKey) {
    return res.status(500).json({ error: 'Cashfree API credentials are not configured in Vercel.' });
  }

  try {
    const response = await fetch(`https://api.cashfree.com/pg/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': apiVersion
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error verifying order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
