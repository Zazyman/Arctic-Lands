<?php
include_once("../login/check_login_status.php");
$u = $_SESSION["username"];
if($user_ok == true){
    header("location: ../login/login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="intro.css">
    <title>Arctic Lands</title>
</head>
<body onload="playerloading()">
<?php include_once("templates/template_pageTop.php"); ?>
<article>
    <section id="intro">
        <h1><strong>Arctic Lands</strong></h1>
        <br>
        <br>
        This game is designed to be a multiplayer real time survival game set in an Arctic wilderness. The aim is to
        survive the night and live for as many days as possible. As the days pass the nights become colder and you'll
        need to work together (or steal from others) to be the last player alive.
        <br>
        <br>
        <strong> Please click <a href="login/signup.php">here</a> to begin helping with the alpha test.
    </section>
</article>
<?php include_once("templates/template_pageBottom.php"); ?>
</body>
</html>