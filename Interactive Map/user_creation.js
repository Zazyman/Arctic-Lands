//This is the count of the players in the game
var playercount = 0;

//This creates the player object
function user(xaxis,yaxis,username){
    this.xaxis = xaxis;
    this.yaxis = yaxis;
    this.username = username;
}

//This creates our current player for the button currently
function playerlocal() {
    username1 = prompt("Please enter your player name");
    var xzone = (Math.floor((Math.random() * mapsize)+1));
    var yzone = (Math.floor((Math.random() * mapsize)+1));
    user[username1] = new user(xzone, yzone, username1);
    newlocation();
    directional();
    playercount += 1;
}

//This function will create some random player objects
function NPCcreation(count) {
    for (x = 0; x <= count; x++) {
        user[playercount] = new user((Math.floor((Math.random() * mapsize) + 1)), (Math.floor((Math.random() * mapsize) + 1)), "Player-" + playercount);
        playercount += 1;
    }
}

var testingwriting = ""

function npcmovement (){
    testingwriting = "";
    for (x=1; x<playercount; x++){
        testingwriting += user[x].username+" at "+user[x].xaxis+", "+user[x].yaxis+"</br>";
    }
    document.getElementById("testing").innerHTML = testingwriting;
}
function testing(){
    user[1].xaxis = (Math.floor((Math.random() * mapsize)+1));
    npcmovement();
}