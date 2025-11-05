<?php
include "config.php"; 
session_start();

$response = ['success' => false];

// Fetch the user ID from POST request
$prof_id = isset($_POST['prof_id']) ? intval($_POST['prof_id']) : 0;

if ($prof_id > 0) {
    // Query to fetch specialization and department
    $sql = "SELECT specialization, department FROM profs WHERE prof_id = $prof_id LIMIT 1";
    $result = mysqli_query($link, $sql);

    // Check if the query was successful and fetch the row
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $response['success'] = true;
        $response['info'] = $row;
    } else {
        $response['error'] = 'No data found for the specified prof';
    }
} else {
    $response['error'] = 'Invalid user ID';
}

echo json_encode($response);
mysqli_close($link);
?>
