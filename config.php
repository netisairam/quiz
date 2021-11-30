<?php
// error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

session_start();
require 'vendor/autoload.php';
$google_client = new Google_Client();
$google_client->setClientId('816951312594-dj2a73c3m1qvhqm28fvp0l6avtrfh2u3.apps.googleusercontent.com');
$google_client->setClientSecret('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');
$google_client->setRedirectUri('http://localhost/quiz/');
$email = $google_client->addScope('email');

$profile = $google_client->addScope('profile');

?>