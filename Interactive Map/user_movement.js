var username1 = "Player 1";

//This function disables the directional buttons when you reach the edge of the map
function directional(){
    document.getElementById("buteast").disabled = user[username1].xaxis == mapsize ? true : false;
    document.getElementById("butwest").disabled = user[username1].xaxis == 1 ? true : false;
    document.getElementById("butsouth").disabled = user[username1].yaxis == mapsize ? true : false;
    document.getElementById("butnorth").disabled = user[username1].yaxis == 1 ? true : false;
 }

//This function removes the player location from the current zone
function removelocation() {
    var userlocation = ((((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis)-1);
    var ident = "zone" + userlocation;
    document.getElementById(ident).innerHTML = "";
}

//This function creates the player location in the new zone
function newlocation() {
    userlocation = ((((user[username1].yaxis - 1) * mapsize) + user[username1].xaxis)-1);
    ident = "zone" + userlocation;
    document.getElementById(ident).innerHTML = "X";
}

//This function moves the player direction when the button is pressed
function movedirection(xdir, ydir){
    removelocation();
    user[username1].xaxis += xdir;
    user[username1].yaxis += ydir;
    newlocation();
    directional();
    testing();
}

