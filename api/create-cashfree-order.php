<?php
header('Content-Type: application/json');

// Cashfree Credentials
$appId = getenv('CASHFREE_APP_ID') ?: '1348243d704d9df984a32276fc43428431';
$secretKey = getenv('CASHFREE_SECRET_KEY') ?: 'YOUR_SECRET_KEY_HERE';
$apiVersion = '2023-08-01'; // Latest Stable

// Read POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$amount = isset($input['amount']) ? (float)$input['amount'] : 2.00;
$orderId = 'order_' . time() . '_' . rand(1000, 9999);

$baseUrl = "https://" . $_SERVER['HTTP_HOST'];
$returnUrl = $baseUrl . "/cashfree-test.html?order_id={order_id}";

$payload = [
    "order_amount" => $amount,
    "order_currency" => "INR",
    "order_id" => $orderId,
    "customer_details" => [
        "customer_id" => "test_customer_" . time(),
        "customer_name" => "Test User",
        "customer_email" => "test@skilllibrary.shop",
        "customer_phone" => "9999999999"
    ],
    "order_meta" => [
        "return_url" => $returnUrl
    ]
];

$ch = curl_init('https://api.cashfree.com/pg/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-client-id: ' . $appId,
    'x-client-secret: ' . $secretKey,
    'x-api-version: ' . $apiVersion
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error: " . $error]);
    exit;
}

if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo $response;
    exit;
}

echo $response;
?>
