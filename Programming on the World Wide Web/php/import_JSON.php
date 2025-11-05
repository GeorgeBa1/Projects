<?php
include 'config.php'; // your database connection

$response = ['success' => false];


$file = $_FILES['file']['tmp_name'];
$jsonData = file_get_contents($file);
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON format']);
    exit;
}

foreach ($data as $user) {
    $user_id = isset($user['user_id']) ? $user['user_id'] : 0;
    $password = $user['password'];
    $role = $user['role'];
    $name = $user['name'];
    $surname = $user['surname'];
    $email = $user['email'];
    $phone = $user['phone'];
    $address = $user['address'];
    $mobile = isset($user['mobile']) ? $user['mobile'] : null;
    $created_at = date('Y-m-d H:i:s');

    // Check if user already exists
    $check = mysqli_query($link, "SELECT user_id FROM users WHERE user_id = '$user_id'");
    if (mysqli_num_rows($check) > 0) {
        // Update existing
        $update = "UPDATE users SET 
                    password = '$password',
                    role = '$role',
                    name = '$name',
                    surname = '$surname',
                    email = '$email',
                    phone = '$phone',
                    address = '$address',
                    mobile = " . ($mobile ? "'$mobile'" : "NULL") . "
                    WHERE user_id = '$user_id'";
        mysqli_query($link, $update);
    } else {
        // Insert new
        $insert = "INSERT INTO users (user_id, password, role, name, surname, email, phone, address, mobile, created_at)
                    VALUES (
                        '$user_id', 
                        '$password', 
                        '$role', 
                        '$name', 
                        '$surname', 
                        '$email', 
                        '$phone', 
                        '$address', 
                        " . ($mobile ? "'$mobile'" : "NULL") . ", 
                        '$created_at')";
        mysqli_query($link, $insert);
    }
}

$response['success'] = true;

echo json_encode($response);
mysqli_close($link);
?>
