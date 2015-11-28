var myCanvas2 = document.getElementById('myCanvas2');
var ctx2 = myCanvas2.getContext('2d');
var x = 0;
var y = 26;
var u = 0;
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
				if (numero <= 8) {
	        xSource = (numero - 6) *16 - 16;
	        ySource = 48;
      } else {
				if (numero == 9) {
					xSource = 32;
					ySource = 0;
				} else {
					xSource = 32;
					ySource = 16;
				}

      }
      }
    }
  }
    context.drawImage(Perso, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};

var deplacementy = function (arg) {
	animation = 1 ;
	setTimeout(function () {
		animation = 0;
	}, tempo * 3);
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=distance/4;
      dessinerPerso(2, ctx2, x, y);
    }, tempo);
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=distance/4;
      dessinerPerso(9, ctx2, x, y);
    }, tempo * 2);
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=distance/4;
      dessinerPerso(2, ctx2, x, y);
    }, tempo * 3);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=distance/4;
      dessinerPerso(1, ctx2, x, y);
  	}, tempo * 4);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=distance/4;
      dessinerPerso(4, ctx2, x, y);
    }, tempo );
		setTimeout(function () {
			ctx2.clearRect(x, y, 16, 16);
			y-=distance/4;
			dessinerPerso(10, ctx2, x, y);
		}, tempo * 2);
		setTimeout(function () {
			ctx2.clearRect(x, y, 16, 16);
			y-=distance/4;
			dessinerPerso(4, ctx2, x, y);
		}, tempo * 3);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=distance/4;
      dessinerPerso(3, ctx2, x, y);
    }, tempo * 4);
  }

};

var deplacementx = function (arg) {
	animation = 1 ;
	setTimeout(function () {
		animation = 0;
	}, tempo * 3);
	if (arg==1) {
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=distance/4;
      dessinerPerso(6, ctx2, x, y);
    }, tempo);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=distance/4;
      dessinerPerso(5, ctx2, x, y);
  }, tempo * 2);
	setTimeout(function () {
		ctx2.clearRect(x, y, 16, 16);
		x+=distance/4;
		dessinerPerso(6, ctx2, x, y);
	}, tempo * 3);
	setTimeout(function () {
		ctx2.clearRect(x, y, 16, 16);
		x+=distance/4;
		dessinerPerso(5, ctx2, x, y);
	}, tempo *4);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=distance/4;
      dessinerPerso(8, ctx2, x, y);
    }, tempo);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=distance/4;
      dessinerPerso(7, ctx2, x, y);
    }, tempo * 2);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=distance/4;
      dessinerPerso(8, ctx2, x, y);
    }, tempo * 3);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=distance/4;
      dessinerPerso(7, ctx2, x, y);
    }, tempo * 4);
  }
};

var mur = function (direction, x, y, map) {
	var i, j, val;
	switch (direction) {
		case 37:
					x-=16;
					j=Math.ceil(x/16);
					i=Math.ceil(y/16);
					if (map[i][j] >= 9 && map[i][j] <= 21) {
						val = true;
						ctx2.clearRect(x+16, y, 16, 16);
		        dessinerPerso(7, ctx2, x+16, y);
					} else {
						val = false;
					}
	      //-Moveleft
	      break;
	  case 39:
				x+=16;
				j=Math.ceil(x/16);
				i=Math.ceil(y/16);
				if (map[i][j] >= 9 && map[i][j] <= 21) {
					val = true;
					ctx2.clearRect(x-16, y, 16, 16);
          dessinerPerso(5, ctx2, x-16, y);
				} else {
					val = false;
				}
	        //-Move Right
	      break;
	  case 38:
				y-=16;
				j=Math.ceil(x/16);
				i=Math.ceil(y/16);
				if (map[i][j] >= 9 && map[i][j] <= 21) {
					val = true;
					ctx2.clearRect(x, y+16, 16, 16);
					dessinerPerso(3, ctx2, x, y+16);
				} else {
					val = false;
				}
	      //-Move Up
	      break;
	  case 40:
				y+=16;
				j=Math.ceil(x/16);
				i=Math.ceil(y/16);
				if (map[i][j] >= 9 && map[i][j] <= 21) {
					val = true;
					ctx2.clearRect(x, y-16, 16, 16);
					dessinerPerso(1, ctx2, x, y-16);
				} else {
					val = false;
				}
	      //-Move down
	      break;
	  default:
	      break;
	}
	return val;
};
