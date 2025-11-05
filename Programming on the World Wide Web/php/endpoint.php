<?php
include "config.php";

// Get query parameters
$from = isset($_GET['from']) ? $_GET['from'] : null;
$to = isset($_GET['to']) ? $_GET['to'] : null;
$format = isset($_GET['format']) ? strtolower($_GET['format']) : 'json';

// Base query
$sql = "SELECT * FROM presentations WHERE 1";

// Add filters if provided
if ($from) {
    $from = mysqli_real_escape_string($link, $from);
    $sql .= " AND presentation_date >= '$from'";
}

if ($to) {
    $to = mysqli_real_escape_string($link, $to);
    $sql .= " AND presentation_date <= '$to'";
}

$sql .= " ORDER BY presentation_date ASC";

$result = mysqli_query($link, $sql);

$data = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

// Output in desired format
if ($format === 'xml') {
    header("Content-Type: application/xml; charset=utf-8");
    $xml = new SimpleXMLElement('<presentations/>');

    foreach ($data as $row) {
        $item = $xml->addChild('presentation');
        foreach ($row as $key => $value) {
            $item->addChild($key, htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'));
        }
    }

    echo $xml->asXML();
} else {
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        'success' => true,
        'count' => count($data),
        'data' => $data
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

mysqli_close($link);
?>
