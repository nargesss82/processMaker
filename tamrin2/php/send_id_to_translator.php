<?php 
$id=@@txt_id;
$query = "SELECT * FROM PMT_TRANSLATION WHERE ID=$id";

$result = executeQuery($query);
var_dump($result);
@@order_name=$result[1]["ORDER_NAME"];
@@user_name=$result[1]["USER_ID"];
@@cost=$result[1]["COST"];
@@time=$result[1]["TIME"];
