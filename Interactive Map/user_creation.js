//This is the count of the players in the game
var playercount = 0;
//This variable is the players starting bag size
var bagsizes = 4;
//This is the players starting stamina (AP)
var startstamina = 10;

//This creates the player object
function user(xaxis,yaxis,username, fitems, bagsize, stamina, mapping){
    this.xaxis = xaxis;
    this.yaxis = yaxis;
    this.username = username;
    this.fitems = fitems;
    this.bagsize = bagsize;
    this.stamina = stamina;
    this.mapping = mapping;
}

//This creates our current player in the game and places them at a random location
function playerlocal() {
    var xzone = (Math.floor((Math.random() * mapsize)+1));
    var yzone = (Math.floor((Math.random() * mapsize)+1));
    user[playercount] = new user(xzone, yzone, username1, [], bagsizes, startstamina,[]);
    addnone();
    startingmap();
    newlocation();
    directional();
    bagimages();
    playercount += 1;
}

function addnone(){
    var userbag = user[username1].fitems;
    while(userbag.length !== bagsizes){
        userbag.push("ZZNone");
    }
}

//This function will create some random NPC objects, used for testing the detection of other players on the map
function NPCcreation(count) {
    for (x = 1; x <= count; x++) {
        user[playercount] = new user((Math.floor((Math.random() * mapsize) + 1)), (Math.floor((Math.random() * mapsize) + 1)), "Player-" + playercount, [], bagsizes);
        playercount += 1;
    }
}
//This makes all of the map grey to start with
function startingmap(){
    var mapcount = mapsize*mapsize;
    var x=0;
    while (x<mapcount){
        user[username1].mapping[x]=false;
        x++
    }
}

/*

//This shows the location of all the NPCs, used to test the creation of the NPCs (not for use at the moment)
function npcmovement (){
    testingwriting = user[username1].username+" is at: "+user[username1].xaxis+", "+user[username1].yaxis+"</br>";
    for (x=1; x<playercount; x++){
        testingwriting += user[x].username+" at "+user[x].xaxis+", "+user[x].yaxis+"</br>";
    }
    document.getElementById("testing").innerHTML = testingwriting;
}

//This makes one of the NPC's randomly change its xaxis location, used to test if the map is able to detect changes in the variables (Not for use at the moment)
function testing(){
    var moving = (Math.floor((Math.random() * playercount)));
    user[moving].xaxis = (Math.floor((Math.random() * mapsize)+1));
    npcmovement();
}

*/