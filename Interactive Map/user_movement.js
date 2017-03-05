//The main players username, this is different to the other user items as it is currently a single player game
var username1 = playercount;

//This function disables the directional buttons when you reach the edge of the map
function directional(){
    if (user[username1].xaxis == mapsize){
        $("#buteast").attr('title', 'false');
    }
    else{
        $("#buteast").attr('title', 'true');
    }
    if (user[username1].xaxis == 1){
        $("#butwest").attr('title', 'false');
    }
    else{
        $("#butwest").attr('title', 'true');
    }
    if (user[username1].yaxis == mapsize){
        $("#butsouth").attr('title', 'false');
    }
    else{
        $("#butsouth").attr('title', 'true');
    }
    if (user[username1].yaxis == 1){
        $("#butnorth").attr('title', 'false');
    }
    else{
        $("#butnorth").attr('title', 'true');
    }
    //document.getElementById("buteast").disabled = user[username1].xaxis == mapsize ? true : false;
    //document.getElementById("butwest").disabled = user[username1].xaxis == 1 ? true : false;
    //document.getElementById("butsouth").disabled = user[username1].yaxis == mapsize ? true : false;
    //document.getElementById("butnorth").disabled = user[username1].yaxis == 1 ? true : false;
 }

//This function creates the player location in the new zone
function newlocation() {
    var userlocation = ((((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis)-1);
    var ident = "zone" + userlocation;
    $("#"+ident).append("<img src='images/playerlocation.png' id='playerimg' class='mapimages'>");
    $("#playerimg").css("z-index", "100");
}

//This function moves the player direction when the button is pressed
function movedirection(xdir, ydir, id){
    if (id.getAttribute("title") === "true") {
        if (staminacheck() == true) {
            $("#playerimg").remove();
            user[username1].xaxis += xdir;
            user[username1].yaxis += ydir;
            newlocation();
            directional();
            user[username1].stamina -= 1;
            refreshimages();
        }
        else {
            nostamina();
        }
    }
}

//This is used to filter "1None" items from the list
function checknone(item){
    return item !== "ZZNone"
}

//This checks if the players backpack can fit the object being picked up
function bagchecker(){
    //This counts the number of items that are not "1None"
    var count = user[username1].fitems.filter(checknone).length;
    //And then compares it to the bag size to see if the bag is full
    pickupitem = count < user[username1].bagsize;
}

//This function adds the images to the backpack window
function bagimages() {
    $("#backpack").empty();
    user[username1].fitems.sort();
    //All images are then re-added to ensure it is up to date from the variable
    for (x=0;x<(user[username1].fitems.length);x++) {
        //This make the zone item name into a single variable for ease
        var testingname = user[username1].fitems[x];
        //This checks that the item name is a real item
        if (typeof item[testingname] !== 'undefined') {
            var itemname = username1+"+"+x+"?"+testingname;
            $("#backpack").append("<img src='"+item[testingname].icon+"' id ='"+itemname+"' class = 'foundobject'>");
            //This causes the item to be dropped up when clicked on
            if (testingname !== "ZZNone") {
                document.getElementById(itemname).addEventListener("click", function () {
                    //This gives the players location to drop the item at
                    var playerlocation = (((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis) - 1;
                    //This seperates the images id into the information regarding its object type
                    var idlength2 = this.id.indexOf("?");
                    //This creates the array ID
                    var thisitem = this.id.slice(idlength2 + 1);
                    //This adds the item to the zones item array
                    map[playerlocation].fitems.push(thisitem);
                    //This seperates the images id into the information regarding its point on the array and username
                    var idlength = this.id.indexOf("+");
                    //This creates the array ID
                    var temparrayid = parseInt(this.id.slice(idlength, idlength2));
                    //This removes the item from the backpack
                    user[username1].fitems.splice(temparrayid, 1, "ZZNone");
                    refreshimages();
                });
            }
        }
    }
}