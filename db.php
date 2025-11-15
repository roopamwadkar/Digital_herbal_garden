<?php
$host = "localhost:3307";
$user = "root";
$password = "1234";
$db = "herbal";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>