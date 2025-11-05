<?php
include "config.php";
session_start();

$thesis_id = isset($_GET['thesis_id']) ? intval($_GET['thesis_id']) : 0;

$response = ['success' => false, 'grades' => [], 'error' => 'Invalid thesis ID'];

if ($thesis_id > 0) {
    $sql = "SELECT * FROM grades WHERE thesis_id = $thesis_id";
    $result = mysqli_query($link, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $grades = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $response = ['success' => true, 'grades' => $grades];
    } else {
        $response['error'] = 'No grades data found';
    }
}

echo json_encode($response);
mysqli_close($link);
?>
