<?php
include 'get_plants.php';

 if (isset($_GET['query'])) {
     $search_plant = mysqli_real_escape_string($conn, $_GET['query']);
     $sql = "SELECT * FROM plants WHERE name LIKE '%$search_plant%' OR scientific_name LIKE '%$search_plant%'";
     $result = mysqli_query($conn, $sql);

     echo "<h2>Search Results for '$search_plant'</h2>";

     if (mysqli_num_rows($result) > 0) {
         while($row = mysqli_fetch_assoc($result)) {
             echo "<div style='border:1px solid #ccc; padding:100px; margin:10px;'>";
             echo "<h3>" . $row['name'] . " (" . $row['scientific_name'] . ")</h3>";
             echo "<p>" . $row['benefits'] . "</p>";
             echo "<img src='" . $row['image_url'] . "' width='200'><br>";
             echo "</div>";
         }
     } else {
         echo "<p>No plants found.</p>";
     }
 } else {
     echo "No search input provided.";
 }
?>