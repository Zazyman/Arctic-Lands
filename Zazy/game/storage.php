<?php
include_once("../login/check_login_status.php");
if(!isset($_SESSION["username"])){
    header("location: ../login/login.php");
}else {
    $u = $_SESSION["username"];
}
$mapstatement = "SELECT currentgame FROM users WHERE username='$u' LIMIT 1";
$mapquery = mysqli_query($db_conx, $mapstatement);
while ($row = mysqli_fetch_assoc($mapquery)){
    $_SESSION["mapid"] = $row['currentgame'];
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script>var username = <?php echo json_encode($_SESSION["username"]); ?></script>
    <link rel="stylesheet" href="main.css">
    <script src="../js/jquery-3.1.1.js"></script>
    <script src="../js/item_stats.js"></script>
    <script src="../js/stamina.js"></script>
    <title>Arctic Land - Storage</title>
</head>
<body>
    <?php include_once("../templates/template_pageTop.php"); ?>
<article>
    <section id="windowwrap">
        <section id="HUD">
            <div id="daynumber">
            </div>
            <div id="staminabox">
                Stamina
                <div id="staminawrapper">
                </div>
            </div>
            <div id="tempwrapper">
                <div id="currenttemp">
                    <img src="../images/thermometer.png">
                    <div id="tempdata">
                    </div>
                </div>
            </div>
        </section>
        <section id="menuwrap">
            <section id="gamemenu">
                <div class="menutab2" id="maptab">
                    <a class="menulink" href="map.php">Map</a>
                </div>
                <div class="menutab2" id="playerstab">
                    <a class="menulink" href="players.php">Players</a>
                </div>
                <div class="menutab2" id="zonetab">
                    <a class="menulink" href="zone.php">Zone</a>
                </div>
                <div class="menutab" id="buildingtab">
                    <a class="menulink2" href="overview.php">Buildings</a>
                </div>
            </section>
            <section id="zonepagewrap">
                <section id="buildingspagewrap">
                    <section id="buildingstabs">
                        <div class="bmenutab" id="fencetab">
                            <a class="menulink" href="overview.php">Overview</a>
                        </div>
                        <div class="bmenutab" id="buildingtab">
                            <a class="menulink" href="buildings.php">Construct</a>
                        </div>
                        <div class="bmenutab" id="firetab">
                            <a class="menulink" href="firepit.php">Firepit</a>
                        </div>
                        <div class="bmenutab2" id="banktab">
                            <a class="menulink2" href="storage.php">Storage</a>
                        </div>
                    </section>
                    <section id="buildingswindow">
                    NO STORAGE BUILT YET
                    </section>
                </section>
            </section>
        </section>
    </section>
</article>
<div id="loadingscreen">
    <div id="loadingwriting">
    <img src="../images/loading.png">
    </div>
</div>
<?php include_once("../templates/template_pageBottom.php"); ?>
</body>
</html>