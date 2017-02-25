var playernames = "";

//This function states what will go into the infobox to the upper right of the map once it has been clicked on
function infobox(mpinfo){
    playernames = "";
    mapvarselect2 = parseInt(mpinfo.slice(4));
    infoboxs = map[mapvarselect2].xaxis+', '+map[mapvarselect2].yaxis;
    playertest(mapvarselect2);
    document.getElementById('zoneinfo').innerHTML = "<strong>Zone: </strong>["+infoboxs+"]</br>"+
        "<strong>Players: </strong>"+playernames+"</br>"+playercount;
}

function playertest(zone){
    for (x=1;x<playercount;x++){
        //This variable has 1 taken from it as each map ID starts from 0
        var playerloc = (((user[x].yaxis-1)*mapsize)+user[x].xaxis)-1;
        if (playerloc == zone) {
            playernames += user[x].username+", ";
        }
    }
}