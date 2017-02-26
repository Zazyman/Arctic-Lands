//This variable is the size of the map and will eventually become static but is required for testing for the correct size currently
var mapsize=4;

function map(xaxis,yaxis,environ, fitems, depleted, searchcount) {
    //The x axis of the zone
    this.xaxis = xaxis;
    //The y axis of the zone
    this.yaxis = yaxis;
    //The enviornmental value of the zone (used to change the chances of items found)
    this.environ = environ;
    //This array shows the items on the ground currently
    this.fitems = fitems;
    //This detects if the zone is depleted or not
    this.depleted = depleted;
    //This counts the number of searches performed, eventually depleting the zone
    this.searchcount = searchcount;
}

for (x=0;x<=mapsize;x++){
    for (y=0;y<=mapsize;y++) {
        map[(((y-1)*mapsize)+x)-1] = new map(x, y, (Math.floor(Math.random() * 3)), [], false, 0);
        }
    }

function mapcreate() {
    for (i = 0; i < ((mapsize * mapsize)); i++) {
        //This if statement defines the image (background) depending on zone enviroment variable
        if (map[i].environ > 0) {
            var colour = "grey"
        }
        else {
            var colour = "lightgreen"
        }
        //This var creates the x co-ordinate of the box
        var padwidth = (map[i].xaxis * 20);
        //This var creates the y co-ordinate of the box
        var padheight = (map[i].yaxis * 20);
        //This creates a unique identifier for each HTML div
        var ident = ("zone" + i);
        var div1 = document.createElement('div');
        var att2 = document.createAttribute('id');
        var node2 = document.createAttribute('onmouseleave');
        att2.value = ident;
        div1.setAttributeNode(att2);
        var node = document.getElementById('start');
        node.appendChild(div1);
        document.getElementById(ident).setAttribute('class', 'zone');
        document.getElementById(ident).style.background = colour;
        document.getElementById(ident).style.left = padwidth + 'px';
        document.getElementById(ident).style.top = padheight + 'px';
        document.getElementById(ident).style.top = padheight + 'px';

        //This creates a static div boarder around the map based on the map size to allow correct formating
        var surround = ((mapsize * 20)*1.1);
        document.getElementById('surround').style.height = surround + 'px';
        document.getElementById('surround').style.width = surround + 'px';
    }
}