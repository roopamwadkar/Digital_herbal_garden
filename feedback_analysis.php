<?php
include 'db_connect.php';
$result = $conn->query("SELECT rating, COUNT(*) as count FROM feedback GROUP BY rating");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[$row['rating']] = $row['count'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Feedback Analysis</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h2>Feedback Rating Distribution</h2>
    <canvas id="feedbackChart" width="400" height="200"></canvas>

    <script>
        const ctx = document.getElementById('feedbackChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                datasets: [{
                    label: 'Number of Ratings',
                    data: [
                        <?= $data[1] ?? 0 ?>,
                        <?= $data[2] ?? 0 ?>,
                        <?= $data[3] ?? 0 ?>,
                        <?= $data[4] ?? 0 ?>,
                        <?= $data[5] ?? 0 ?>
                    ],
                    backgroundColor: 'rgba(46, 204, 113, 0.7)'
                }]
            }
        });
    </script>
</body>
</html>
