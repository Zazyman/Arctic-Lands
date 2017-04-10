<?php
include_once("../login/check_login_status.php");
$u = $_SESSION['username'];
$map = $_SESSION['mapid'];

//This checks to make sure all the users are ready
$ready_check = "SELECT ready FROM ingameavatars WHERE mapid='$map'";
$ready_query = mysqli_query($db_conx, $ready_check);
while ($row = mysqli_fetch_assoc($ready_query)){
    if ($row["ready"] == 0){
	//echo "ERROR - Not all players are ready";
    //exit();
    }
}
//This checks if each player survived
$day_state = "UPDATE maps SET day+=1 WHERE mapid='$map' LIMIT 1";
$day_query = mysqli_query($db_conx, $day_state);

$day_state = "SELECT day FROM maps WHERE mapid='$map' LIMIT 1";
$day_query = mysqli_query($db_conx, $day_state);
while ($row = mysqli_fetch_assoc($day_query)){
    $day = $row["day"];
}
echo $day;
?>