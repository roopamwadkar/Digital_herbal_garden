<?php
$host = "localhost:3307";
$user = "root";
$password = "";
$dbname = "herbal_garden";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>