export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxylCE-zdZ0mlLH8g1F-H6Nb9fMNABOXoAqN26OFg570DtNsX41YRrSiI_kle_xgtXw/exec';

  try {
    const { name, email, mobile, source, product, paymentStatus } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Google Apps Script doPost(e) usually works best with application/x-www-form-urlencoded
    // if using e.parameter. Or if parsing JSON, it needs application/json.
    // We will send application/json, but the user must ensure their GAS doPost parses JSON from e.postData.contents.
    // To be safe and compatible with standard Google Forms / Apps Script defaults, we can send it as URL-encoded.
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('mobile', mobile);
    params.append('source', source || 'cashfree-test.html');
    params.append('product', product || 'Cashfree Test Payment');
    params.append('paymentStatus', paymentStatus || 'Pending');

    console.log("Forwarding to Google Apps Script...");

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const text = await response.text();
    console.log("GAS Response Status:", response.status);
    console.log("GAS Response Text:", text);

    if (!response.ok) {
      console.error("GAS Error:", response.status, text);
      return res.status(502).json({ error: 'Failed to save lead in Google Apps Script.', details: text });
    }

    // Try parsing as JSON if possible, otherwise just return success
    try {
      const json = JSON.parse(text);
      if (json.result === 'error') {
        return res.status(400).json({ error: json.error || 'GAS returned an error' });
      }
      return res.status(200).json(json);
    } catch (e) {
      return res.status(200).json({ result: 'success', raw: text });
    }

  } catch (error) {
    console.error('Server error saving lead:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
