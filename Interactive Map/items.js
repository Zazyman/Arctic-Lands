//This is the random number based on the zone environment and depletion (different results will call different items)
var itemnumber = 0;

//This is the function for when the player presses the search button
function searchbutton(){
    itemrandomiser();
}

//This function defines what item is found based on the zone type
function itemrandomiser(){
    var zonelocation = (((user[username1].yaxis-1)*mapsize)+user[username1].xaxis)-1;
    if (map[zonelocation].depleted == false) {
        //This is used to give a maximum for the random number generator
        var generatornum;
        switch (map[zonelocation].environ) {
            case 0:
                generatornum = 5;
                break;
            case 1:
                generatornum = 10;
                break;
            case 2:
                generatornum = 10;
                break;
            default:
                generatornum = 1;
        }
        //This generates a random number based on the zone environment
        itemnumber = (Math.floor(Math.random() * generatornum)+1);
        map[zonelocation].searchcount += 1;
    }
    else {
        //If the zone is depleted then no items are returned
        itemnumber = 0;
    }
    //This switch statement places the item that is found based on the random number
    switch(itemnumber) {
        case 0:
            founditem = "Depleted";
        case 1:
        case 2:
            founditem = "None";
            break;
        case 3:
        case 4:
            founditem = "Wood";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            founditem = "Snow";
            break;
        default:
            founditem = "None";
    }
    searchcheckz(founditem);
}

//This function drops the item onto the floor once found
function searchcheckz(founditem){
    if (founditem == "None"){
        alert("Nothing was found");
    }
    else if (founditem == "Depleted"){
        alert("The zone is depleted");
    }
    else {
        var tempzoneid = (((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis) - 1;
        map[tempzoneid].fitems.push(founditem);
        alert("You have found "+founditem);
    }
}

//This function is used to remove the most recent item
function removesearch(){
    var zonelocation = (((user[username1].yaxis-1)*mapsize)+user[username1].xaxis)-1;
    map[zonelocation].fitems.pop();

}