<?php
include 'config.php';

session_start();
$user_id = $_POST['user_id'];
$response = ['success' => false];

// Fetch invitations where the prof is a co-supervisor1 and hasn't accepted yet
$query = "SELECT ts.id, ts.student_AM, ts.thesis_id, ts.supervisor_id, 
          ts.supervisor2_id, ts.supervisor3_id, 
          ts.supervisor_accepted, ts.supervisor2_accepted, ts.supervisor3_accepted, 
          t.title, t.abstract, CONCAT(s.name ,' ', s.surname) as info
          FROM assigned_theses ts 
          LEFT JOIN theses t ON ts.thesis_id = t.thesis_id 
          RIGHT JOIN students s ON t.student_id = s.AM
          WHERE (ts.supervisor2_id = $user_id AND ts.supervisor2_accepted = 0) 
          OR (ts.supervisor3_id = $user_id AND ts.supervisor3_accepted = 0)";

$result = mysqli_query($link, $query);

if ($result) {
    $invitations = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $invitations[] = $row;
    }
    $response['success'] = true;
    $response['data'] = $invitations;
}

echo json_encode($response);
mysqli_close($link);
?>
