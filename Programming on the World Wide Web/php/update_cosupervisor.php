<?php
include 'config.php';
session_start();

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$thesis_id = isset($_POST['thesis_id']) ? intval($_POST['thesis_id']) : 0;
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;

$response = ['success' => false];

// Validate input parameters
if ($id > 0 && $thesis_id > 0 && $user_id > 0) {
    // Step 1: Fetch co-supervisor1 information from the assigned_theses table
    $query = "SELECT supervisor2_id, supervisor3_id FROM assigned_theses WHERE id = $id";
    $result = mysqli_query($link, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $supervisor2_id = $row['supervisor2_id'];
        $supervisor3_id = $row['supervisor3_id'];

        // Step 2: Determine which co-supervisor1 field to update based on whether the field is empty (NULL or 0)
        if ($user_id == $supervisor2_id) {
            // Assign to supervisor2_id if it's empty
            $queryUpdate = "UPDATE theses SET supervisor2_id = $user_id WHERE thesis_id = $thesis_id";
        } elseif ($user_id == $supervisor3_id) {
            // Assign to supervisor3_id if it's empty
            $queryUpdate = "UPDATE theses SET supervisor3_id = $user_id WHERE thesis_id = $thesis_id";
        } else {
            $response['error'] = 'Failed to upate theses table';
            echo json_encode($response);
            mysqli_close($link);
            exit;
        }

        // Step 3: Execute the update query
        $updateResult = mysqli_query($link, $queryUpdate);

        if ($updateResult) {
            $response['success'] = true;
        } else {
            $response['error'] = 'Failed to update co-supervisor1 in the theses table.';
        }
    } else {
        $response['error'] = 'Invalid thesis selection ID.';
    }
} else {
    $response['error'] = 'Invalid input parameters.';
}

// Return the JSON response
echo json_encode($response);
mysqli_close($link);
?>
