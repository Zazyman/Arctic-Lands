//These are the functions that happen when the page is loaded. Most simply create variables that will eventually be stored on the server
function onloading(){
    //Creates the map. This appears complex as the map is created based on variables each time
    mapcreate();
    //Creates the player character, eventually this will be replaced by a function to call the details from the server
    playerlocal();
    //Creates the attributes of each zone, much of this can remain in the function but when the map size is static this can be replaced with static coding
    zoneattributes();
    //This creates NPCs as real players don't exist at this time
    NPCcreation(2);
    //This is so that I can currently see all the NPC locations to cross reference
    npcmovement();
}