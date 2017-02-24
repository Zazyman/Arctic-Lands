//This function states what will go into the infobox to the upper right of the map once it has been clicked on
function infobox(mpinfo){
    mapvarselect2 = parseInt(mpinfo.slice(4));
    infoboxs = map[mapvarselect2].xaxis+', '+map[mapvarselect2].yaxis;
    document.getElementById('zoneinfo').innerHTML = "<strong>Zone: </strong>["+infoboxs+"]";
}