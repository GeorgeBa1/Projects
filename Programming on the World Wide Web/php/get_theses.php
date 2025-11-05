<?php
include 'config.php';
session_start();

$supervisor_id = isset($_GET['supervisor_id']) ? intval($_GET['supervisor_id']) : 0;

if ($supervisor_id === 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid supervisor_id']);
    exit;
}

$sql = "SELECT t.thesis_id, t.title, t.abstract, t.status, t.pdf_attachment, t.assigned_at, s.name AS student_name, 
        s.surname AS student_surname, s.AM AS student_AM, CONCAT(u1.name, ' ', u1.surname) AS supervisor_name, 
        CONCAT(u2.name, ' ', u2.surname) AS supervisor2_name, CONCAT(u3.name, ' ', u3.surname) AS supervisor3_name, 
        CASE WHEN ts.supervisor2_accepted = 1 THEN 'Accepted' ELSE 'Not assigned' END AS supervisor2_status, CASE WHEN ts.supervisor3_accepted = 1 
        THEN 'Accepted' ELSE 'Not assigned' END AS supervisor3_status, ts.created_at AS invite_date, ts.updated_at as acceptance_date FROM theses t 
        LEFT JOIN students s ON t.student_id = s.AM LEFT JOIN users u1 ON u1.user_id = t.supervisor_id AND u1.role = 'prof' LEFT JOIN users u2 ON 
        u2.user_id = t.supervisor2_id AND u2.role = 'prof' LEFT JOIN users u3 ON u3.user_id = t.supervisor3_id AND u3.role = 'prof' 
        LEFT JOIN assigned_theses ts ON ts.thesis_id = t.thesis_id WHERE t.supervisor_id = $supervisor_id GROUP BY t.thesis_id ORDER BY t.title";

$result = mysqli_query($link, $sql);
$theses = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $thesis_id = $row['thesis_id'];
        $co_supervisors_query = "SELECT CONCAT(u1.name, ' ', u1.surname) AS supervisor2_name, CONCAT(u2.name, ' ', u2.surname) AS supervisor3_name 
                                 FROM assigned_theses ts LEFT JOIN users u1 ON u1.user_id = ts.supervisor2_id LEFT JOIN users u2 ON u2.user_id = ts.supervisor3_id WHERE ts.thesis_id = $thesis_id";
        $co_supervisors_result = mysqli_query($link, $co_supervisors_query);

        if ($co_supervisors_result && mysqli_num_rows($co_supervisors_result) > 0) {
            $co_supervisors_data = mysqli_fetch_assoc($co_supervisors_result);
            $row['supervisor2_name'] = $co_supervisors_data['supervisor2_name'];
            $row['supervisor3_name'] = $co_supervisors_data['supervisor3_name'];
        }

        $theses[] = $row;
    }
    echo json_encode(['success' => true, 'theses' => $theses]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to fetch theses data']);
}

mysqli_free_result($result);
mysqli_close($link);
?>
