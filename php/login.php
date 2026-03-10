<?php

require "db.php";
$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"];
$password = $data["password"];
$stmt = $conn->prepare("SELECT * FROM users WHERE login=?");
$stmt->execute([$login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user && $password == $user["password"]){
    $token = base64_encode($user["id"].":".time());
    echo json_encode([
        "token"=>$token,
        "expire"=>time()+86400
    ]);
}else{
    echo json_encode([
        "error"=>"wrong login"
    ]);
}