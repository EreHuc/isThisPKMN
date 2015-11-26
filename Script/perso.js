var myCanvas2 = document.getElementById('myCanvas2');
var ctx2 = myCanvas2.getContext('2d');
var x = 0;
var y = 26;


var character = "sacha";
var Perso = new Image();
Perso.src = "Ressource/sacha.png";

var switchChar = function(){
	var inputs = window.document.getElementsByName('Personnage');
	for(i=0;inputs[i];i++){
		if(inputs[i].checked){
			character = inputs[i].value;
		}
	}
  if (character == "sacha") {
    Perso.src = "Ressource/sacha.png";
  } else {
    Perso.src = "Ressource/pikachu.png";
  }
  switch (key) {
    case 37:
      ctx2.clearRect(x, y, 16, 16);
      dessinerPerso(7, ctx2, x, y);
      break;
    case 39:
      ctx2.clearRect(x, y, 16, 16);
      dessinerPerso(5, ctx2, x, y);
      break;
    case 38:
      ctx2.clearRect(x, y, 16, 16);
      dessinerPerso(3, ctx2, x, y);
      break;
    case 40:
      ctx2.clearRect(x, y, 16, 16);
      dessinerPerso(1, ctx2, x, y);
      break;
    default:
      ctx2.clearRect(x, y, 16, 16);
      dessinerPerso(5, ctx2, x, y);
  }
};

dessinerPerso = function(numero, context, xDestination, yDestination) {
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
    context.drawImage(Perso, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};

var deplacementy = function (arg) {
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=8;
      dessinerPerso(2, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=8;
      dessinerPerso(1, ctx2, x, y);
  }, 250);
  console.log(y);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=8;
      dessinerPerso(4, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=8;
      dessinerPerso(3, ctx2, x, y);
    }, 250);
    console.log(y);
  }
};

var deplacementx = function (arg) {
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=8;
      dessinerPerso(6, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=8;
      dessinerPerso(5, ctx2, x, y);
  }, 250);
  console.log(x);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=8;
      dessinerPerso(8, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=8;
      dessinerPerso(7, ctx2, x, y);
    }, 250);
    console.log(x);
  }
};
