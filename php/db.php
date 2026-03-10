<?php

$host = "localhost";
$db = "messenger";
$user = "root";
$pass = "";

$conn = new PDO(
    "mysql:host=$host;dbname=$db;charset=utf8",
    $user,
    $pass
);

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);