<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: *');
    // Check if the request method is OPTIONS (preflight request)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    include './db_connect.php';
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "POST":
            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData, true);
            $sql = "INSERT INTO users (firstname, lastname, mission, email, phone, blog) VALUES ('" . $data['firstName'] . "', '" . $data['lastName'] . "', '" . $data['mission'] . "', '" . $data['email'] . "', '" . $data['phone'] . "', '" . $data['blog'] . "')";
            if ($conn->query($sql) === TRUE) {
            } else {
            }
            break;
        case "GET":
            $sql = "SELECT * FROM users";
            $result = $conn->query($sql);
            $data = [];
            if ($result->num_rows > 0) {
            // output data of each row
                while($row = $result->fetch_assoc()) {
                    $data[] = [
                        'id' => $row['id'],
                        'firstName' => $row['firstname'],
                        'lastName' => $row['lastname'],
                        'mission' => $row['mission'],
                        'email' => $row['email'],
                        'phone' => $row['phone'],
                        'blog' => $row['blog']
                    ];
                }
            } else {
            }
            $conn->close();
            // send json response
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'data' => $data
            ]);
            break;
        case "DELETE":
            $requestUri = $_SERVER['REQUEST_URI'];
            $pathSegments = explode('/', trim($requestUri, '/'));
            if (count($pathSegments) >= 2 && $pathSegments[0] === 'server.php') {
                $id = $pathSegments[1];
                $sql = "DELETE FROM users WHERE id=$id";
                if ($conn->query($sql) === TRUE) {
                } else {
                }  
            } else {
            }
            $conn->close();
            break;
    }    
?>