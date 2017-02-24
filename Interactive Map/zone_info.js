var currentselection = "";
var mapvarselect;
var mapvarselect2 = 1;
var infoboxs = "";

function zoneattributes() {
    //This function assigns a listener to each zone on creation that detects if the mouse enters or leaves
    for (i = 0; i < ((mapsize * mapsize)); i++) {
        var ident3 = "zone"+i;
        if (map[i].environ > 0) {
            document.getElementById(ident3).addEventListener("mouseenter", function () {
                calling('grey', this, 'blue', 'A bleak and snowy wasteland');
            });
            document.getElementById(ident3).addEventListener("mouseleave", function () {
                calling('lightblue', this, 'black', 'This is the info window');
            });
        }
        else {
            document.getElementById(ident3).addEventListener("mouseenter", function(){
                calling('lightgreen', this, 'blue', 'Snow covered forest');
            });
            document.getElementById(ident3).addEventListener("mouseleave", function() {
                calling('lightblue', this, 'black', 'This is the info window');
            });
        }
        //This is what happens when a zone is clicked on
        document.getElementById(ident3).addEventListener("click", function () {
            this.style.background = "red";
            mapvarselect = parseInt(currentselection.slice(4));
            if (currentselection != "") {
                if (map[mapvarselect].environ > 0){
                    document.getElementById(currentselection).style.background = "grey";
                }
                else {
                    document.getElementById(currentselection).style.background = "lightgreen";
                }
            }
            currentselection = this.id;
            infobox(currentselection);
        });
    }
}
//This is the function for when the mouse enters and leaves each zone
function calling(colours, zone, border, info){
    document.getElementById('infowindow').style.background = colours;
    document.getElementById('infowindow').innerHTML = info;
    zone.style.borderColor = border;
}

