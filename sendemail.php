<?php
$name = @trim(stripslashes($_POST['name']));
$from = @trim(stripslashes($_POST['email']));
$subject = @trim(stripslashes($_POST['subject']));
$message = @trim(stripslashes($_POST['message']));
$to = "vipakpawar26@gmail.com";

$mensaje = "Name: $name \nEmail: $from \nAsunto: $subject \nMensaje: $message";

$pagetitle = "New message from the web";

$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/plain; charset=\"utf-8\"\n";
$headers[] = "From: {$name} <{$from}>";
$headers[] = "Reply-To: <{$from}>";
$headers[] = "Subject: {$subject}";
$headers[] = "X-Mailer: PHP/".phpversion();
$headers = implode("\r\n", $headers);

mail($to, $pagetitle, $mensaje, $headers);

die();
?>