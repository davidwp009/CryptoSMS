<?php
require "db.php";
$method = $_SERVER["REQUEST_METHOD"];
if($method == "GET"){
    $stmt = $conn->query("
        SELECT chats.id, chats.name
        FROM chats
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

}

if($method == "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data["name"];
    $stmt = $conn->prepare("INSERT INTO chats(name) VALUES(?)");
    $stmt->execute([$name]);
    echo json_encode(["status"=>"ok"]);
}

if($method == "DELETE"){
    $id = $_GET["id"];
    $stmt = $conn->prepare("DELETE FROM chats WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(["status"=>"deleted"]);
}