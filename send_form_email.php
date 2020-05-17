<?php

$name_error = $email_error = $comments_error = "";
$name = $email = $comments = $success = "";

//form is submitted with POST method
if ($_SERVER["REQUEST_METHOD"]=="POST"){
  if (empty($_POST["name"])) {
    $name_error = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
      $name_error = "Only letters and white space allowed";
    }
  }

  if (empty($_POST["email"])) {
    $email_error = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    if (!preg_match('/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/', $email)) {
      $email_error = "Invalid email format";
    }
  }

  if (empty($_POST["comments"])) {
    $comments_error = "A message is required";
  } else {
    $comments = test_input($_POST["comments"]);
  }
  if ($name_error == '' and $email_error == '' and $comments_error == '') {
    $message_body='';
    unset($_POST['submit']);
    foreach ($_POST as $key => $value){
      $message_body .= "$key: $value\n";
    }
    $to = 'j6ke@uwaterloo.ca';
    $subject = "Web Contact Form";
    $headers = 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    if (mail($to, $subject, $comments, $headers)){
      $success = "Thank you for contacting me! I will be in touch with you very soon.";
      $name = $email = $comments = '';
    }
  }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}