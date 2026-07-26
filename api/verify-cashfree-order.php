<?php
header('Content-Type: application/json');

$appId = getenv('CASHFREE_APP_ID') ?: '1348243d704d9df984a32276fc43428431';
$secretKey = getenv('CASHFREE_SECRET_KEY') ?: 'YOUR_SECRET_KEY_HERE';
$apiVersion = '2023-08-01';

$orderId = isset($_GET['order_id']) ? $_GET['order_id'] : '';

if (empty($orderId)) {
    http_response_code(400);
    echo json_encode(["error" => "Order ID is required"]);
    exit;
}

$ch = curl_init("https://api.cashfree.com/pg/orders/" . $orderId);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
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
