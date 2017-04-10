var totalstam = 20;
var movestamina = 0;
var town = [];
var d = [];
var minsearches = 5;
var maxsearches = 10;

////DATA////

function map(location, environ, fitems, depleted, searchcount, fuel) {
    //This is the map zone location to double check
    this.location = location;
    //The enviornmental value of the zone (used to change the chances of items found)
    this.environ = environ;
    //This array shows the items on the ground currently
    this.fitems = fitems;
    //This detects if the zone is depleted or not
    this.depleted = depleted;
    //This counts the number of searches performed, eventually depleting the zone
    this.searchcount = searchcount;
    //This is the running total temperature survivable
    this.fuel = fuel;
}

function usernamefind(){
    for (y in user){
        if (user[y].username == username){
            usr = y;
        }
    }
    gp = user[usr].playergroup;
    d.m = map[user[usr].location];
    d.u = user[usr];
    ajax_getday();
}


//This refreshes the players stamina image
function staminaimage(){
    $("#staminawrapper").empty();
    for (x=0;x<(d.u.stamina);x++){
        $("#staminawrapper").append("<img src='../images/stamina2.png' id='stamina"+x+"' class='staminaimage'>");
    }
    var leftover = (totalstam - d.u.stamina);
    for (x=0;x<leftover;x++){
        $("#staminawrapper").append("<img src='../images/staminaempty.png' class='staminaimage'>");
    }
    day_data();
}

function usestamina(num){
    d.u.stamina -= num;
    ajax_postdata(d.u.stamina, "stamina", "ingameavatars", d.u.username, "../php_query/post_data.php");
}

////TEMPERATURE


function day_data(){
    $("#readywrap").empty();
    $("#daynumber").empty()
        .append("<p>DAY: "+town.day+"</p>")
        .css("color", "rgb("+Math.floor(255/town.day)+","+(town.day*3)+","+(town.day%2)*255);
    var calculate = calculatetemp();
    $("#tempdata").empty()
        .append("<div id='tempdatawrite'><span id='tempwrite'>Night Temp: </span><br>"+town.temperature+"&degC<hr><span id='tempwrite'>Survivable Temp: </span>"+calculate+"&degC</div>");
    if (d.u.ready == 1) {
        $("#readywrap").append("<div id='readywriting'>Current Status<button id='readybutton' onclick='setready()'>Ready</button></div>");
    }else{
        $("#readywrap").append("<div id='readywriting'>Current Status<button id='readybutton' onclick='setready()'>Not Ready</button></div>");
    }
    $("#loadingscreen").css("visibility", "hidden");
}

function calculatetemp(){
    var x = 0;
    if (d.m.buildings[3] == building[3].staminacost){
        x -= Math.floor(3*(Math.sqrt(d.m.fuel)));
    }
    for (i in d.u.fitems){
        if (d.u.fitems[i] == "Torch"){
            x-= 1;
        }
    }
    return x;
}



function ajax_getday() {
    var hr = new XMLHttpRequest();
    hr.open("POST", "../php_query/get_day.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            town = JSON.parse(hr.responseText);
            staminaimage();
        }
    };
    hr.send("var1=true");
}

//////DAY ENDING////

function setready(){
    if (d.u.ready == 0) {
        d.u.ready = 1;
        ajax_postready(d.u.ready, "ready", "ingameavatars", "NOT REQUIRED")
    } else {
        d.u.ready = 0;
        ajax_postready(d.u.ready, "ready", "ingameavatars", "NOT REQUIRED")
    }
}

function ajax_postready(data, vari, table, where){
    var hr = new XMLHttpRequest();
    hr.open("POST", "../php_query/post_data.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            ajax_checkready();
        }
    };
    hr.send("data="+data+"&vari="+vari+"&table="+table+"&where="+where);
}

function ajax_checkready(){
    $("#loadingscreen").css("visibility", "visible");
    var hr = new XMLHttpRequest();
    hr.open("POST", "../php_query/check_ready.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            var readyck = JSON.parse(hr.responseText);
            if (readyck.indexOf(0) == -1){
                console.log("Everyone ready");
                dayending();
            } else {
                dayending();
            }
        }
    };
    hr.send("data=true");
}

function dayending(){
    var hr = new XMLHttpRequest();
    hr.open("POST", "dayend.php", true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            $("#loadingscreen").css("visibility", "hidden");
            var test = hr.responseText;
            console.log(test);
        }
    };
    hr.send("data="+d.u.username);
}