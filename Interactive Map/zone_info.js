//Variable for the currently selected zone, used when changing zones
var currentselection = "";
//Variable for the number of the zone selected - used in currentselection
var mapvarselect;
//Variable for the number of the zone selected - used in infobox
var mapvarselect2 = 1;
//Used to compact the information regarding the selected zone information
var maplocstring = "";
//Used to compact the information regarding the players in the zone
var playernames = "";
//Used to show the items in the currently selected zone
var mapitems = "";
//Used to show images for each item
var itemimages = [];

function zoneattributes() {
    //This function assigns a listener to each zone on creation that detects if the mouse enters or leaves
    for (i = 0; i < ((mapsize * mapsize)); i++) {
        var ident3 = "zone"+i;
        if (map[i].environ > 0) {
            document.getElementById(ident3).addEventListener("mouseenter", function () {
                calling('grey', this, 'blue', 'A bleak and snowy wasteland');
            });
            document.getElementById(ident3).addEventListener("mouseleave", function () {
                calling('lightblue', this, 'black', 'This is the info window');
            });
        }
        else {
            document.getElementById(ident3).addEventListener("mouseenter", function(){
                calling('lightgreen', this, 'blue', 'Snow covered forest');
            });
            document.getElementById(ident3).addEventListener("mouseleave", function() {
                calling('lightblue', this, 'black', 'This is the info window');
            });
        }
        //This is what happens when a zone is clicked on
        document.getElementById(ident3).addEventListener("click", function () {
            this.style.background = "red";
            mapvarselect = parseInt(currentselection.slice(4));
            if (currentselection != "") {
                if (map[mapvarselect].environ > 0){
                    document.getElementById(currentselection).style.background = "grey";
                }
                else {
                    document.getElementById(currentselection).style.background = "lightgreen";
                }
            }
            currentselection = this.id;
            infobox(currentselection);
        });
    }
}
//This is the function for when the mouse enters and leaves each zone
function calling(colours, zone, border, info){
    document.getElementById('infowindow').style.background = colours;
    document.getElementById('infowindow').innerHTML = info;
    zone.style.borderColor = border;
}

//This function states what will go into the infobox to the upper right of the map once it has been clicked on
function infobox(mpinfo){
    playernames = "";
    mapvarselect2 = parseInt(mpinfo.slice(4));
    maplocstring = map[mapvarselect2].xaxis+', '+map[mapvarselect2].yaxis;
    //This gives the writing for if there are no items in the zone
    if (map[mapvarselect2].fitems.length == 0) {
        mapitems = "None";
    }
    else {
        //This is to reset the "Mapitems" variable
        mapitems = "";
        //This adds each item of the array and inserts a comma between. The array can be printed in full but this allows the display to have images used instead
        for (x=0;x<(map[mapvarselect2].fitems.length);x++){
            if (x>0)
                mapitems += ", ";
            mapitems += map[mapvarselect2].fitems[x];
        }
    }
    playertest(mapvarselect2);
    document.getElementById('zoneinfo').innerHTML = "<strong>Zone: </strong>["+maplocstring+"]</br>"+
        "<strong>Players: </strong>"+playernames+"</br><strong>Items: </strong>"+mapitems+'</br>';
    //This function adds the images, it occurs after the innerHTML else it gets deleted
    addimages();
}

function playertest(zone){
    for (x=0;x<playercount;x++){
        //This variable has 1 taken from it as each map ID starts from 0
        var playerloc = (((user[x].yaxis-1)*mapsize)+user[x].xaxis)-1;
        if (playerloc == zone) {
            playernames += user[x].username+", ";
        }
    }
}
//This is the option to add item images to the screen
function addimages() {
    //This cycles through the items on the zone
    for (x=0;x<(map[mapvarselect2].fitems.length);x++){
        //This make the zone item name into a single variable for ease
        var testingname = map[mapvarselect2].fitems[x];
        //This checks that the item name is a real item
        if (typeof item[testingname] !== 'undefined'){
            //If the item is real an image is created
            var img = document.createElement("img");
            //This image gets its picture from the item object
            img.src = item[testingname].icon;
            //The item is named with both the region and the point on the array that it exists
            var imagename = mapvarselect2+"+"+x;
            img.id = imagename;
            document.getElementById('zoneinfo').appendChild(img);
            document.getElementById(imagename).addEventListener("click", function () {
                var idlength = this.id.indexOf("+");
                var temparrayid = parseInt(this.id.slice(idlength));
                var tempzoneid = parseInt(this.id.slice(0,idlength));
                map[tempzoneid].fitems.splice(temparrayid, 1);
                var tempmapid = ("zone"+tempzoneid);
                document.getElementById(tempmapid).click();
            });
        }
    }
}