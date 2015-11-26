var myCanvas2 = document.getElementById('myCanvas2');
var ctx2 = myCanvas2.getContext('2d');

// var DIRECTION = {
// 	"BAS"    : 0,
// 	"HAUT"   : 1,
// 	"DROITE" : 2,
// 	"GAUCHE" : 3,
// 	"MARCHEGAUCHE" : 6
// };

var sacha = new Image();
sacha.src = "Ressource/character.png";

dessinerSacha = function(numero, context, xDestination, yDestination) {
  if(numero <= 2) {
    var xSource = numero * 16 - 16;
    var ySource = 0;
  } else {
    if (numero <= 4) {
      xSource = (numero - 2) * 16 - 16;
      ySource = 16;
    } else {
      if (numero <= 6) {
        xSource = (numero - 4) *16 - 16;
        ySource = 32;
      } else {
        xSource = (numero - 6) *16 - 16;
        ySource = 48;
      }
    }
  }
    context.drawImage(sacha, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};

// function Personnage(context, x, y, direction) {
// 	context.drawImage(
// 	sacha,
// 	0, direction * 16, // Point d'origine du rectangle source à prendre dans notre image
// 	16, 16, // Taille du rectangle source (c'est la taille du personnage)
// 	(x * 16), (y * 16), // Point de destination (dépend de la taille du personnage)
// 	16, 16 // Taille du rectangle destination (c'est la taille du personnage)
//   );
// }

// ctx.drawImage(sacha,0, 0, 16, 16, 12, 12, 16, 16);
//Personnage(ctx,1,1,DIRECTION.BAS);
