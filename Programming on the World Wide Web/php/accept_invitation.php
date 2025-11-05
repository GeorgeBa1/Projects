<?php
include 'config.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
$action = isset($_POST['action']) ? $_POST['action'] : '';
$response = ['success' => false];

if ($id > 0 && !empty($action) && $user_id > 0) {
    $status = ($action === 'accept') ? 1 : 0;

    // Step 1: Fetch the current supervisors for the given thesis selection ID
    $query = "SELECT supervisor2_id, supervisor3_id, supervisor2_accepted, supervisor3_accepted 
              FROM assigned_theses WHERE id = $id";
    $result = mysqli_query($link, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        // Determine which co-supervisor1 is trying to accept or decline
        if ($user_id == $row['supervisor2_id']) {
            // If supervisor2, check if they have already accepted
            if ($row['supervisor2_accepted'] !== $status) {
                $queryUpdate = "UPDATE assigned_theses SET supervisor2_accepted = $status WHERE id = $id";
            } else {
                $response['error'] = 'You have already taken this action.';
                echo json_encode($response);
                mysqli_close($link);
                exit;
            }
        } elseif ($user_id == $row['supervisor3_id']) {
            // If supervisor3, check if they have already accepted
            if ($row['supervisor3_accepted'] !== $status) {
                $queryUpdate = "UPDATE assigned_theses SET supervisor3_accepted = $status WHERE id = $id";
            } else {
                $response['error'] = 'You have already taken this action.';
                echo json_encode($response);
                mysqli_close($link);
                exit;
            }
        } else {
            // User is not a valid co-supervisor1 for this thesis
            $response['error'] = 'You are not authorized to perform this action.';
            echo json_encode($response);
            mysqli_close($link);
            exit;
        }

        // Step 3: Execute the update query if it's set
        if (isset($queryUpdate)) {
            $updateResult = mysqli_query($link, $queryUpdate);
            if ($updateResult) {
                $response['success'] = true;
                $response['message'] = 'Action completed successfully.';
            } else {
                $response['error'] = 'Database update failed: ' . mysqli_error($link);
            }
        }
    } else {
        $response['error'] = 'Invalid thesis selection ID.';
    }
} else {
    $response['error'] = 'Invalid input data.';
}

echo json_encode($response);
mysqli_close($link);
?>
