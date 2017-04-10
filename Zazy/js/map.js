var pixelsize = 20;
var mapsize = 12;

function maploading() {
    ajax_getmapinfo("../php_query/get_map_data.php", "start", true);
}

function refreshmap(){
    d.m = map[user[usr].location];
    staminaimage();
    unexplored();
}

function mapcreate() {
    for (i = 0; i < ((mapsize * mapsize)); i++) {
        //This if statement defines the image (background) depending on zone enviroment variable
        var environ = map[i].environ;
        var colour = enviroment[environ].colour;
        //This var creates the x co-ordinate of the box
        var padheight = (Math.round(Math.floor(map[i].location / mapsize)) * pixelsize);
        //This var creates the y co-ordinate of the box
        var padwidth = (((map[i].location + 1) % mapsize) * pixelsize);
        //This creates a unique identifier for each HTML div
        var ident = ("zone" + i);
        $("#start").append("<div id='"+ident+"' class='zone'>" +
            "<img src='../images/unexplored.png' id='unexplored"+i+"' class='mapimages'>" +
            "<img src='../images/depleted.png' id='depleted"+i+"' class='mapimages'>" +
            "</div>");
        $("#"+ident).css({"left":padwidth+"px","top":padheight+"px","background":colour});
        $("#unexplored"+i).css("visibility", "visible");
        $("#depleted"+i).css("visibility", "hidden");
        //This creates a static div boarder around the map based on the map size to allow correct formatting
        var surround = ((mapsize * pixelsize) * 1.1);
        $("#surround").css({"height":surround+"px","width":surround+"px"});
    }
    zoneattributes();
    ajax_getuser_data();
}

function deplete(x){
    var locate = user[usr].location;
    map[locate].depleted = x;
    ajax_postmap(map[locate].depleted, "depleted", "mapzones", locate);
    refreshmap()
}

function zoneattributes() {
    //This function assigns a listener to each zone on creation that detects if the mouse enters or leaves
    for (i = 0; i < ((mapsize * mapsize)); i++) {
        var ident3 = "zone"+i;
        $("#"+ident3).hover(function () {
                $(this).css("border-color", "blue");
            },
            function () {
                $(this).css("border-color", "black")
            })
            .click(function () {
                $("#zonesurround").remove();
                $(this).append("<img src='../images/Surround.png' id='zonesurround' class='mapimages'>").css("z-index", "10");
                infobox(this.id);
            });
    }
}
//This function states what will go into the infobox to the upper right of the map once it has been clicked on
function infobox(location) {
    $("#zonelocation").empty();
    $("#players").empty();
    $("#environment").empty();
    var tempzoneid = parseInt(location.slice(4));
    var gp = user[usr].playergroup;
    if (group[gp].mapping[tempzoneid] == true) {
        var p = playertest(tempzoneid);
        var writing1 = zoneinfo(tempzoneid);
        var yaxis = (Math.round(Math.floor(tempzoneid / mapsize)))+1;
        var xaxis = ((tempzoneid) % mapsize)+1;
        $("#zonelocation").append("<strong>["+ xaxis+" / "+yaxis+"]</strong>");
        $("#players").append("<strong>Players: </strong>"+p);
        $("#environment").append(writing1);
     }
     else {
        $("#zonelocation").append("<div><strong>Unexplored</strong></div>");
     }
}
//This looks for players in the location
function playertest(zone){
    var names = "";
    for (i in user) {
        if (user[i].alive == 1) {
            if (user[i].playergroup == gp) {
                if (user[i].location == zone) {
                    names += user[i].username + ", ";
                }
            }
        }
    }
    if (names == ""){
        names = "None";
    }
    return names;
}
//This gives the information about the zone
function zoneinfo(loc){
    switch (map[loc].environ){
        case 0:
            return "An empty snow covered field. Maybe there's something below all that snow, but it's probably just more snow...";
            break;
        case 1:
            return "Dirt extends in every direction with just patches of snow remaining. It looks as though someone has been clearing away as much of the snow as they can. You wonder what they may have been looking for...";
            break;
        case 2:
            return "Small spiky bushes stick out from the snow around making it difficult to walk through this zone. You could probably find something to burn here though.";
            break;
        case 3:
            return "Tall trees surround you, making it difficult to find your way. If you could chop them down you could probably make a pretty big fire. At least global warming isn't a concern any more";
            break;
        default:
            return "ERROR";
        break;
    }
}