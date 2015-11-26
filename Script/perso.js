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
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=4;
      dessinerPerso(2, ctx2, x, y);
    }, 100);
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=4;
      dessinerPerso(9, ctx2, x, y);
    }, 200);
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=4;
      dessinerPerso(2, ctx2, x, y);
    }, 300);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=4;
      dessinerPerso(1, ctx2, x, y);
  	}, 400);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=4;
      dessinerPerso(4, ctx2, x, y);
    }, 100);
		setTimeout(function () {
			ctx2.clearRect(x, y, 16, 16);
			y-=4;
			dessinerPerso(10, ctx2, x, y);
		}, 200);
		setTimeout(function () {
			ctx2.clearRect(x, y, 16, 16);
			y-=4;
			dessinerPerso(4, ctx2, x, y);
		}, 300);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=4;
      dessinerPerso(3, ctx2, x, y);
    }, 400);
  }
};

var deplacementx = function (arg) {
  if (arg==1) {
		setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=4;
      dessinerPerso(6, ctx2, x, y);
    }, 100);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=4;
      dessinerPerso(5, ctx2, x, y);
  }, 200);
	setTimeout(function () {
		ctx2.clearRect(x, y, 16, 16);
		x+=4;
		dessinerPerso(6, ctx2, x, y);
	}, 300);
	setTimeout(function () {
		ctx2.clearRect(x, y, 16, 16);
		x+=4;
		dessinerPerso(5, ctx2, x, y);
	}, 400);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=4;
      dessinerPerso(8, ctx2, x, y);
    }, 100);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=4;
      dessinerPerso(7, ctx2, x, y);
    }, 200);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=4;
      dessinerPerso(8, ctx2, x, y);
    }, 300);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=4;
      dessinerPerso(7, ctx2, x, y);
    }, 400);
  }
};

var mur = function (direction, x, y, map) {
	var i, j, val;
	switch (direction) {
		case 37:
					// console.log("x.current : " + x);
					// console.log("y.current : " + y);
					x-=16;
					j=x/16;
					i=(y+6)/16;
					// console.log("x.modified : " + j);
					// console.log("y.modified : " + j);
					if (map[i][j] == 7 || map[i][j] == 9 || map[i][j] == 10 || map[i][j] == 11 || map[i][j] == 12 || map[i][j] == 13 || map[i][j] == 14 || map[i][j] == 15 || map[i][j] == 17 || map[i][j] == 18 || map[i][j] == 19) {
						val = false;
						ctx2.clearRect(x+16, y, 16, 16);
		        dessinerPerso(7, ctx2, x+16, y);
					} else {
						val = true;
					}
					// console.log(map[i][j]);
					// console.log(val);
	      //-Moveleft
	      break;
	  case 39:
				// console.log("x.current : " + x);
				// console.log("y.current : " + y);
				x+=16;
				j=x/16;
				i=(y+6)/16;
				// console.log("x.modified : " + j);
				// console.log("y.modified : " + j);
				if (map[i][j] == 7 || map[i][j] == 9 || map[i][j] == 10 || map[i][j] == 11 || map[i][j] == 12 || map[i][j] == 13 || map[i][j] == 14 || map[i][j] == 15 || map[i][j] == 17 || map[i][j] == 18 || map[i][j] == 19) {
					val = false;
					ctx2.clearRect(x-16, y, 16, 16);
          dessinerPerso(5, ctx2, x-16, y);
				} else {
					val = true;
				}
				// console.log(map[i][j]);
				// console.log(val);
	        //-Move Right
	      break;
	  case 38:
				y-=10;
				j=x/16;
				i=y/16;
				if (map[i][j] == 7 || map[i][j] == 9 || map[i][j] == 10 || map[i][j] == 11 || map[i][j] == 12 || map[i][j] == 13 || map[i][j] == 14 || map[i][j] == 15 || map[i][j] == 17 || map[i][j] == 18 || map[i][j] == 19) {
					val = false;
					ctx2.clearRect(x, y+10, 16, 16);
					dessinerPerso(3, ctx2, x, y+10);
				} else {
					val = true;
				}
	      //-Move Up
	      break;
	  case 40:
				y+=22;
				j=x/16;
				i=y/16;
				if (map[i][j] == 7 || map[i][j] == 9 || map[i][j] == 10 || map[i][j] == 11 || map[i][j] == 12 || map[i][j] == 13 || map[i][j] == 14 || map[i][j] == 15 || map[i][j] == 17 || map[i][j] == 18 || map[i][j] == 19) {
					val = false;
					ctx2.clearRect(x, y-22, 16, 16);
					dessinerPerso(1, ctx2, x, y-22);
				} else {
					val = true;
				}
	      //-Move down
	      break;
	  default:
	      break;
	}
	return val;
};
