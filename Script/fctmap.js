var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(2, 2);
ctx.imageSmoothingEnabled = false;

var tuile = new Image();
tuile.src = "Ressource/tile.png";

dessinerTile = function(numero, context, xDestination, yDestination) {
  var xSource, ySource;
  if(numero <= 8) {
    xSource = numero * 16 - 16;
    ySource = 0;
  } else {
    if (numero <= 16) {
      xSource = (numero - 8) * 16 - 16;
      ySource = 16;
    } else {
      xSource = (numero - 16) *16 - 16;
      ySource = 32;
    }
  }
    context.drawImage(tuile, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};


var creeMap = function (map) {
  for (var i = 0; map[i]; i++) {
    for (var j = 0; map[i][j]; j++) {
      dessinerTile(map[i][j], ctx, j*16, i*16);
    }
  }
};
