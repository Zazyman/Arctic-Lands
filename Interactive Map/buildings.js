//Count of the buildings for the function to make them all "Not built"
var buildingscount = 2;
//This is a variable function used to count the items on the ground of the zone
var itemcounter = function(value) {
    if(value == this) return value;
};


function building(name, locationarray, parentbuilding, material1, material2, material3, material4, staminaspent, staminacost, buildicon){
    //The name of the building to be printed
    this.name = name;
    //This array hold the information regarding if the building has been built in each zone (the array point refers to the zone number)
    this.locationarray = locationarray;
    //If there is a parent building required this is the number for it
    this.parentbuilding = parentbuilding;
    //The material name and how much is needed. Can use 4 different materials currently
    this.material1 = material1;
    this.material2 = material2;
    this.material3 = material3;
    this.material4 = material4;
    //The stamina required to build the item
    this.staminacost = staminacost;
    //The stamina used in each zone (the array point refers to the zone number)
    this.staminaspent = staminaspent;
    //The icon for the building
    this.buildicon = buildicon;
}

building[1] = new building("Firepit", [], 0, ["Wood", 3], ["ZZNone", 0], ["ZZNone", 0], ["ZZNone", 0], 10, [], "x");
building[2] = new building("Chest", [], 0, ["Snow", 4], ["Wood", 1], ["Wood", 5], ["ZZNone", 0], 10, [], "x");

//This makes all the buildings register as not built at the start of the game
function startingbuildings(){
    var zonecount = mapsize*mapsize;
    for (x=0;x<zonecount;x++){
        for (i=1;i<=buildingscount;i++){
            building[i].locationarray[x]=false;
        }
    }
    var userlocation = (((user[username1].yaxis-1)*mapsize)+user[username1].xaxis);
    building[1].locationarray[userlocation] = true;
}

function buildingstab() {
    $('#zonebuildings').empty();
    var userlocation = (((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis) - 1;
    for (x = 1; x <= buildingscount; x++) {
        var wrap = building[x].name+userlocation+"wrap";
        $("#zonebuildings").append("<div class='buildingdivwrapper' id='"+wrap+"'></div>");
        var testingblank1 = false;
        var testingblank2 = false;
        var testingblank3 = false;
        var testingblank4 = false;
        for (i=0;i<4;i++){
            var buildinfo = "";
            var thing = "";
            var thing2 = "";
            var itemcount = "";
            var innerwriting = "";
            var create = true;
            switch(i) {
                case 0:
                    buildinfo = "text";
                    innerwriting = building[x].name;
                    create = true;
                    break;
                case 1:
                    buildinfo = "matt1";
                    thing = map[userlocation].fitems;
                    thing2 = building[x].material1[0];
                    itemcount = (thing.filter(itemcounter, thing2).length);
                    innerwriting = building[x].material1[0] + ": " + itemcount + "/" + building[x].material1[1];
                    create = true;
                    testingblank1 = itemcount >= building[x].material1[1];
                    break;
                case 2:
                    if (building[x].material2[1] !== 0) {
                        buildinfo = "matt2";
                        thing = map[userlocation].fitems;
                        thing2 = building[x].material2[0];
                        itemcount = (thing.filter(itemcounter, thing2).length);
                        innerwriting = building[x].material2[0] + ": " + itemcount + "/" + building[x].material2[1];
                        create = true;
                        testingblank2 = itemcount >= building[x].material2[1];
                    }
                    else {
                        create = false;
                        testingblank2 = true;
                    }
                    break;
                case 3:
                    if (building[x].material3[1] !== 0) {
                        buildinfo = "matt3";
                        thing = map[userlocation].fitems;
                        thing2 = building[x].material3[0];
                        itemcount = (thing.filter(itemcounter, thing2).length);
                        innerwriting = building[x].material3[0] + ": " + itemcount + "/" + building[x].material3[1];
                        create = true;
                        testingblank3 = itemcount >= building[x].material3[1];
                    }
                    else {
                        create = false;
                        testingblank3 = true;
                    }
                    break;
                case 4:
                    if (building[x].material4[1] !== 0) {
                        buildinfo = "matt4";
                        thing = map[userlocation].fitems;
                        thing2 = building[x].material4[0];
                        itemcount = (thing.filter(itemcounter, thing2).length);
                        innerwriting = building[x].material4[0] + ": " + itemcount + "/" + building[x].material4[1];
                        create = true;
                        testingblank4 = itemcount >= building[x].material4[1];
                    }
                    else {
                        create = false;
                        testingblank4 = true;
                    }
                    break;
            }
            var ident3 = building[x].name + userlocation + buildinfo;
            if (create == true) {
                $("#"+wrap).append("<div class='building"+buildinfo+"' id='"+ident3+"'>"+innerwriting+"</div>");
            }
        }
        var ident2 = x+"+"+userlocation+"?"+building[x].name;
        $("#"+wrap).append("<button class='buildingbutton' id='"+ident2+"' disabled='false'></button>");
        if (testingblank1 !== true || testingblank2 !== true || testingblank3 !== true) {
            var testingthing = building[x].name + userlocation + "wrap";
            document.getElementById(testingthing).style.backgroundImage = 'url("images/unexplored.png")';
            document.getElementById(ident2).disabled = false;
            document.getElementById(ident2).style.backgroundColor = "lightgrey";
        }
    }
}