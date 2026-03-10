<?php

require "db.php";

$method = $_SERVER["REQUEST_METHOD"];

if($method == "GET"){

    $chat = $_GET["chat"];

    $stmt = $conn->prepare("
        SELECT *
        FROM messages
        WHERE chat_id=?
        ORDER BY id DESC
        LIMIT 50
    ");

    $stmt->execute([$chat]);

    echo json_encode([
        "messages"=>$stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

}

if($method == "POST"){

    $data = json_decode(file_get_contents("php://input"), true);

    $chat = $data["chat_id"];
    $text = $data["text"];

    $stmt = $conn->prepare("
        INSERT INTO messages(chat_id,text)
        VALUES(?,?)
    ");

    $stmt->execute([$chat,$text]);

    echo json_encode(["status"=>"sent"]);
}