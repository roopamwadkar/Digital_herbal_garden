<?php
    if (isset($_GET['query'])) {
        $search = mysqli_real_escape_string($conn, $_GET['query']);
        $sql = "SELECT * FROM plants WHERE name LIKE '%$search%' OR scientific_name LIKE '%$search%'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                echo "<div>";
                echo "<h3>" . $row['name'] . " (" . $row['scientific_name'] . ")</h3>";
                echo "<p>" . $row['benefits'] . "</p>";
                echo "<img src='" . $row['image_url'] . "' width='200'>";
                echo "</div><hr>";
            }
        } else {
            echo "<p>No plants found.</p>";
        }
    } else {
        echo "<p>Please enter a search term.</p>";
    }
    ?>