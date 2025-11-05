<?php
include "config.php";
session_start();

$title = $_POST['title'];
$abstract = $_POST['abstract'];
$supervisor_id = $_POST['supervisor_id'];

// Define the directory where the PDF will be uploaded
$uploadDir = __DIR__ . '/../attachments/';
$pdf_attachment = '';

// Handle the PDF file upload if it exists
if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] == 0) {
    $pdfName = basename($_FILES['pdf']['name']);
    $pdf_attachment = 'attachments/' . $pdfName;
    $uploadPath = $uploadDir . $pdfName;

    // Move the uploaded file to the attachments directory
    if (!move_uploaded_file($_FILES['pdf']['tmp_name'], $uploadPath)) {
        echo json_encode(['success' => false, 'error' => 'Failed to upload PDF']);
        exit;
    }
}

// Insert the new thesis into the database
$sql = "INSERT INTO theses (title, abstract, pdf_attachment, status, supervisor_id, created_at) 
        VALUES ('$title', '$abstract', '$pdf_attachment', 'under_assignment', '$supervisor_id', NOW())";

$result = mysqli_query($link, $sql);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to create thesis']);
}

mysqli_close($link);
?>
