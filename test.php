<?php
$conn = mysqli_connect("localhost", "root", "1234", "herbal");

if ($conn) {
    echo "Connected Successfully!";
} else {
    echo mysqli_connect_error();
}
?>
