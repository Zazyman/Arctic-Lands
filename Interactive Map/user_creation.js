//This is the count of the players in the game
var playercount = 0;
//This is used to show the players location in the lowest box (mostly used for testing)
var testingwriting = "";
//This variable exists to overlap some code due to laziness (Used to make the players ID = 0 instead of the typed name)
var username2 = ""

//This creates the player object
function user(xaxis,yaxis,username){
    this.xaxis = xaxis;
    this.yaxis = yaxis;
    this.username = username;
}

//This creates our current player in the game and places them at a random location
function playerlocal() {
    username2 = prompt("Please enter your player name");
    var xzone = (Math.floor((Math.random() * mapsize)+1));
    var yzone = (Math.floor((Math.random() * mapsize)+1));
    user[playercount] = new user(xzone, yzone, username2);
    newlocation();
    directional();
    playercount += 1;
}

//This function will create some random NPC objects, used for testing the detection of other players on the map
function NPCcreation(count) {
    for (x = 1; x <= count; x++) {
        user[playercount] = new user((Math.floor((Math.random() * mapsize) + 1)), (Math.floor((Math.random() * mapsize) + 1)), "Player-" + playercount);
        playercount += 1;
    }
}

//This shows the location of all the NPCs, used to test the creation of the NPCs
function npcmovement (){
    testingwriting = user[username1].username+" is at: "+user[username1].xaxis+", "+user[username1].yaxis+"</br>";
    for (x=1; x<playercount; x++){
        testingwriting += user[x].username+" at "+user[x].xaxis+", "+user[x].yaxis+"</br>";
    }
    document.getElementById("testing").innerHTML = testingwriting;
}

//This makes one of the NPC's randomly change its xaxis location, used to test if the map is able to detect changes in the variables
function testing(){
    var moving = (Math.floor((Math.random() * playercount)));
    user[moving].xaxis = (Math.floor((Math.random() * mapsize)+1));
    npcmovement();
}