<!-- <?php
$conn = mysqli_connect("localhost:3307", "root", "1234", "herbal");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);

    if (password_verify($password, $row['password'])) {
        echo "Login Successful!";
        // redirect to dashboard
        // header("Location: dashboard.php");
    } else {
        echo "Invalid Password!";
    }
} else {
    echo "Email not found!";
}

mysqli_close($conn);
?> -->
<?php
$conn = mysqli_connect("localhost:3307", "root", "1234", "herbal");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_assoc($result);

    if (password_verify($password, $row['password'])) {

        // Start session (optional but recommended)
        session_start();
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['name'] = $row['name'];

        // Redirect to home page
        header("Location: plants.html");
        exit();

    } else {
        echo "Invalid Password!";
    }
} else {
    echo "Email not found!";
}

mysqli_close($conn);
?>
