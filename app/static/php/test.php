<?php
// 获取输入框的值
$json = file_get_contents("php://input");
// 将输入框的字符串格式转换成对象
$json = json_decode($json);
// 定义两个变量存储该对象的两个值
$username = $json -> username;
echo json_encode($username);
?>