<?php

$path = $_GET["endpoint"];

switch($path){

case "login":
require "login.php";
break;

case "chats":
require "chats.php";
break;

case "messages":
require "messages.php";
break;

default:
echo json_encode(["error"=>"endpoint not found"]);

}