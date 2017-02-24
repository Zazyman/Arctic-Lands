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