<?php
include "config.php";
session_start();

$student_AM = isset($_GET['student_AM']) ? intval($_GET['student_AM']) : 0;
$thesis_id = isset($_GET['thesis_id']) ? intval($_GET['thesis_id']) : 0;

// Check if student_AM and thesis_id are provided
if (!$student_AM || !$thesis_id) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

// Fetch invitation statuses and details of the supervisors
$sql = "SELECT 
            ts.supervisor_accepted AS supervisor_status, 
            ts.supervisor2_accepted AS supervisor2_status, 
            ts.supervisor3_accepted AS supervisor3_status,
            u1.name AS supervisor_name, u1.surname AS supervisor_surname, u1.user_id AS supervisor_id,
            u2.name AS supervisor2_name, u2.surname AS supervisor2_surname, u2.user_id AS supervisor2_id,
            u3.name AS supervisor3_name, u3.surname AS supervisor3_surname, u3.user_id AS supervisor3_id,
            updated_at as last_update
            FROM assigned_theses ts
            LEFT JOIN users u1 ON u1.user_id = ts.supervisor_id
            LEFT JOIN users u2 ON u2.user_id = ts.supervisor2_id
            LEFT JOIN users u3 ON u3.user_id = ts.supervisor3_id
            WHERE ts.student_AM = $student_AM AND ts.thesis_id = $thesis_id";

$result = mysqli_query($link, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    $invitations = [
        'supervisor1' => [
            'name' => $row['supervisor_name'],
            'supervisorId' => $row['supervisor_id'],
            'surname' => $row['supervisor_surname'],
            'accepted' => $row['supervisor_status'],
            'lastUpdate' => $row['last_update']
        ],
        'supervisor2' => [
            'name' => $row['supervisor2_name'],
            'coSupervisor1Id' => $row['supervisor2_id'],
            'surname' => $row['supervisor2_surname'],
            'accepted' => $row['supervisor2_status']
        ],
        'supervisor3' => [
            'name' => $row['supervisor3_name'],
            'coSupervisor2Id' => $row['supervisor3_id'],
            'surname' => $row['supervisor3_surname'],
            'accepted' => $row['supervisor3_status']
        ]
    ];

    echo json_encode(['success' => true, 'invitations' => $invitations]);
} else {
    echo json_encode(['success' => false, 'error' => 'No invitations found']);
}

mysqli_close($link);
?>
