<?php
include 'config.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
$response = ['success' => false];

// Check if both id and user_id are valid
if ($id > 0 && $user_id > 0) {
    // Step 1: Fetch the current supervisor1 and co-supervisor1 IDs
    $query = "SELECT supervisor2_id, supervisor3_id FROM assigned_theses WHERE id = $id";
    $result = mysqli_query($link, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $supervisor2_id = $row['supervisor2_id'];
        $supervisor3_id = $row['supervisor3_id'];
        
        // Step 2: Determine which co-supervisor1 field matches the user_id
        if ($user_id == $supervisor2_id) {
            // Set supervisor2_id and supervisor2_accepted to NULL
            $queryUpdate = "UPDATE assigned_theses 
                            SET supervisor2_id = NULL, updated_at = NOW()
                            WHERE id = $id";
        } elseif ($user_id == $supervisor3_id) {
            // Set supervisor3_id and supervisor3_accepted to NULL
            $queryUpdate = "UPDATE assigned_theses 
                            SET supervisor3_id = NULL, updated_at = NOW()
                            WHERE id = $id";
        } else {
            $response['error'] = 'User is not a co-supervisor1 for this thesis.';
            echo json_encode($response);
            mysqli_close($link);
            exit;
        }

        // Step 3: Execute the update query
        $updateResult = mysqli_query($link, $queryUpdate);

        if ($updateResult) {
            $response['success'] = true;
        } else {
            $response['error'] = 'Failed to update the thesis selections.';
        }
    } else {
        $response['error'] = 'Invalid thesis selection ID.';
    }
} else {
    $response['error'] = 'Invalid input parameters.';
}

echo json_encode($response);
mysqli_close($link);
?>
