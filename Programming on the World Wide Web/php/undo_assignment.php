<?php
include "config.php";
session_start();

$thesis_id = isset($_POST['thesis_id']) ? intval($_POST['thesis_id']) : 0;
$response = ['success' => false];

if ($thesis_id > 0) {
    $sql1 = "UPDATE theses SET student_id = NULL, supervisor2_id = NULL, supervisor3_id = NULL WHERE thesis_id = $thesis_id";
    $result1 = mysqli_query($link, $sql1);

    $sql2 = "DELETE FROM assigned_theses WHERE thesis_id = $thesis_id"; 
    $result2 = mysqli_query($link, $sql2);


    if ($result1 && $result2) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Database update failed';
    }
} else {
    $response['error'] = 'Invalid thesis ID';
}

// Return response as JSON
echo json_encode($response);
mysqli_close($link);
?>
