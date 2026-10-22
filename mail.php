<?php
/**
 * Contact form handler for index.html.
 * Sends the message by e-mail, then redirects back to the contact section
 * with ?contact=sent or ?contact=error so the page can show the result.
 */

const RECIPIENT = 'k.kulczycki03@gmail.com';
const REDIRECT  = 'index.html';

function redirect_with_status(string $status): void
{
    header('Location: ' . REDIRECT . '?contact=' . $status . '#contact');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_with_status('error');
}

// Strip line breaks from single-line fields so they can't inject extra mail headers
function clean_line(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

$name    = clean_line($_POST['name'] ?? '');
$email   = clean_line($_POST['email'] ?? '');
$subject = clean_line($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with_status('error');
}

$body = "Name: {$name}\nEmail: {$email}\n\n{$message}";

// Most hosts reject mail whose From: is a foreign domain, so the visitor's
// address goes in Reply-To instead – hitting "Reply" still answers them.
$headers = "Reply-To: {$name} <{$email}>\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail(RECIPIENT, $subject, $body, $headers);

redirect_with_status($sent ? 'sent' : 'error');
