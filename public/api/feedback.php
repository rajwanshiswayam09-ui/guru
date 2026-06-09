<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

$dataFile = __DIR__ . '/feedback-data.json';
$rateLimitFile = __DIR__ . '/feedback-rate-limit.json';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$notificationEmails = ['gurukripaholiday79@gmail.com', 'info@gurukripaholiday.com'];

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text($value, int $limit): string
{
    $text = trim(strip_tags((string) $value));
    $text = preg_replace('/\s+/', ' ', $text) ?? '';
    return substr($text, 0, $limit);
}

function read_feedback(string $dataFile): array
{
    if (!file_exists($dataFile)) {
        return [];
    }

    $json = file_get_contents($dataFile);
    if ($json === false || $json === '') {
        return [];
    }

    $items = json_decode($json, true);
    return is_array($items) ? $items : [];
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function rate_limit_ok(string $rateLimitFile, string $ip): bool
{
    $now = time();
    $windowSeconds = 3600;
    $maxSubmissions = 4;
    $items = [];

    if (file_exists($rateLimitFile)) {
        $json = file_get_contents($rateLimitFile);
        $decoded = $json ? json_decode($json, true) : [];
        $items = is_array($decoded) ? $decoded : [];
    }

    $freshItems = [];
    $ipCount = 0;
    foreach ($items as $entry) {
        if (!is_array($entry)) {
            continue;
        }

        if (($now - (int) ($entry['time'] ?? 0)) >= $windowSeconds) {
            continue;
        }

        if (($entry['ip'] ?? '') === $ip) {
            $ipCount++;
        }

        $freshItems[] = $entry;
    }
    $items = $freshItems;

    if ($ipCount >= $maxSubmissions) {
        file_put_contents($rateLimitFile, json_encode(array_values($items), JSON_PRETTY_PRINT));
        return false;
    }

    $items[] = ['ip' => $ip, 'time' => $now];
    file_put_contents($rateLimitFile, json_encode(array_values($items), JSON_PRETTY_PRINT));
    return true;
}

function send_feedback_email(array $emails, array $item): bool
{
    $subject = 'New website feedback - Guru Kripa Travels';
    $body = implode("\n", [
        'New feedback submitted from Guru Kripa Travels website.',
        '',
        'Name: ' . $item['name'],
        'City: ' . $item['city'],
        'Rating: ' . $item['rating'] . '/5',
        'Feedback: ' . $item['message'],
        'Date: ' . $item['createdAt'],
        '',
        'Website: https://gurukripaholiday.com/#feedback',
    ]);

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Guru Kripa Website <info@gurukripaholiday.com>',
        'Reply-To: info@gurukripaholiday.com',
    ]);

    return @mail(implode(',', $emails), $subject, $body, $headers);
}

if ($method === 'GET') {
    json_response(200, ['items' => array_slice(read_feedback($dataFile), 0, 50)]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    json_response(405, ['error' => 'Method not allowed']);
}

$rawInput = file_get_contents('php://input') ?: '';
if (strlen($rawInput) > 2000) {
    json_response(413, ['error' => 'Request too large']);
}

$payload = json_decode($rawInput, true);
if (!is_array($payload)) {
    json_response(400, ['error' => 'Invalid request']);
}

$honeypot = clean_text($payload['website'] ?? '', 120);
if ($honeypot !== '') {
    json_response(200, ['items' => array_slice(read_feedback($dataFile), 0, 50)]);
}

$name = clean_text($payload['name'] ?? '', 60);
$city = clean_text($payload['city'] ?? '', 60);
$message = clean_text($payload['message'] ?? '', 280);
$rating = max(1, min(5, (int) ($payload['rating'] ?? 5)));

if ($name === '' || $city === '' || strlen($message) < 10) {
    json_response(422, ['error' => 'Please provide name, city, and feedback.']);
}

if (!rate_limit_ok($rateLimitFile, client_ip())) {
    json_response(429, ['error' => 'Please wait before submitting more feedback.']);
}

$item = [
    'id' => 'feedback-' . bin2hex(random_bytes(8)),
    'name' => $name,
    'city' => $city,
    'rating' => $rating,
    'message' => $message,
    'createdAt' => date('M j, Y'),
];

$handle = fopen($dataFile, 'c+');
if ($handle === false) {
    json_response(500, ['error' => 'Feedback storage is not writable.']);
}

flock($handle, LOCK_EX);
$existing = stream_get_contents($handle);
$items = $existing ? json_decode($existing, true) : [];
$items = is_array($items) ? $items : [];
array_unshift($items, $item);
$items = array_slice($items, 0, 100);
ftruncate($handle, 0);
rewind($handle);
fwrite($handle, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);

$emailSent = send_feedback_email($notificationEmails, $item);

json_response(201, [
    'item' => $item,
    'items' => array_slice($items, 0, 50),
    'notifications' => [
        'emailSent' => $emailSent,
        'whatsappRequiresVisitorClick' => true,
    ],
]);
