<?php
include "config.php";
session_start();

$prof_id = $_POST['prof_id'];
$student_AM = $_POST['student_AM'];
$thesis_id = $_POST['thesis_id'];
$role = $_POST['role'];

$field = '';
if ($role === 'supervisor1') {
    $field = 'supervisor_id';
} elseif ($role === 'co-supervisor1') {
    $field = 'supervisor2_id';
} elseif ($role === 'co-supervisor2') {
    $field = 'supervisor3_id';
}

// Remove the invitation for the given role
$sql = "UPDATE assigned_theses SET $field = NULL WHERE student_AM = '$student_AM' AND thesis_id = '$thesis_id' AND $field = '$prof_id'";
$result = mysqli_query($link, $sql);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
}

mysqli_close($link);
?>
