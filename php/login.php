<?php
    // 返回的数据类型为json结构
    header("Content-Type: application/json");
    // 允许所有域名跨域
    header("Access-Control-Allow-Origin:*");
    //通过 include 或 require 语句，可以将 PHP 文件的内容插入另一个 PHP 文件（在服务器执行它之前）
    include "public/connect_db.php";
    // 获取传输的json字符串
    //json_decode() 对JSON数据进行解码，转换为PHP变量
    // 获取用户名
    $json = json_decode(file_get_contents("php://input"));
    $username = $json -> username;
    $password = $json -> password;
    $sql = "SELECT * from user WHERE username='$username' and password='$password'";
    $coon = new db();
    
    $rows = $coon -> Query($sql, 2); 
    // 如果可以找到,返回关联数组, 找不到返回null
    if($rows) {
      // 输入正确
      $arr = array("code" => "200", "msg" => "", "data" => array("id" => $rows["id"],"username"=>$rows["username"], "token"=> "1112233"));

    } else {
      // 输入错误
      $arr = array("code" => "1000", "msg" => "用户名或者密码错误");
    }
    echo json_encode($arr);

  ?>