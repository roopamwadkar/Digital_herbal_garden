<?php
include 'db_connect.php';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$rating = $_POST['rating'];

$sql = "INSERT INTO feedback (name, email, message, rating) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $name, $email, $message, $rating);
$stmt->execute();

echo "Feedback submitted successfully!";
$conn->close();
?>
