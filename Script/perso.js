var myCanvas2 = document.getElementById('myCanvas2');
var ctx2 = myCanvas2.getContext('2d');

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
	var xSource, ySource;
	if(numero <= 2) {
    xSource = numero * 16 - 16;
    ySource = 0;
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
	console.log(animation);
	setTimeout(function () {
		animation = 0;
		console.log(animation);
	}, tempo * 2);
  switch (arg) {
  	case 0:
	    setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y+=distance/4;
	      dessinerPerso(2, ctx2, x, y);
	    }, tempo);
			setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y+=distance/4;
	      dessinerPerso(1, ctx2, x, y);
	    }, tempo * 2);
  		break;
  	case 1:
			setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y+=distance/4;
	      dessinerPerso(9, ctx2, x, y);
	    }, tempo);
	    setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y+=distance/4;
	      dessinerPerso(1, ctx2, x, y);
	  	}, tempo * 2);
  	  break;
  	case 2:
	    setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y-=distance/4;
	      dessinerPerso(4, ctx2, x, y);
	    }, tempo );
			setTimeout(function () {
				ctx2.clearRect(x, y, 16, 16);
				y-=distance/4;
				dessinerPerso(3, ctx2, x, y);
			}, tempo * 2);
  	  break;
		case 3:
			setTimeout(function () {
				ctx2.clearRect(x, y, 16, 16);
				y-=distance/4;
				dessinerPerso(10, ctx2, x, y);
			}, tempo);
	    setTimeout(function () {
	      ctx2.clearRect(x, y, 16, 16);
	      y-=distance/4;
	      dessinerPerso(3, ctx2, x, y);
	    }, tempo * 2);
		  break;
		default:
	}
};

var deplacementx = function (arg) {
	animation = 1 ;
	console.log(animation);
	setTimeout(function () {
		animation = 0;
		console.log(animation);
	}, tempo * 2);
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

  }
};

var mur = function (direction, x, y, map) {
	var i, j, val;
	switch (direction) {
		case 37:
					x-=16;
					j=Math.ceil(x/16);
					i=Math.ceil(y/16);
					if (((y%16 == 2) && map[i-1][j] >= 9 && map[i+1][j] <= 21) || (map[i][j] >= 9 && map[i][j] <= 21)) {
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
				j=Math.floor(x/16);
				i=Math.ceil(y/16);
				if (((y%16 == 2) && map[i-1][j] >= 9 && map[i+1][j] <= 21) || (map[i][j] >= 9 && map[i][j] <= 21)) {
					val = true;
					ctx2.clearRect(x-16, y, 16, 16);
          dessinerPerso(5, ctx2, x-16, y);
				} else {
					val = false;
				}
	        //-Move Right
	      break;
	  case 38:
				if(y !== 0){
					y-=16;
					j=Math.ceil(x/16);
					i=Math.ceil(y/16);
					if (((x%16 == 8) && map[i][j-1] >= 9 && map[i][j-1] <= 21) || (map[i][j] >= 9 && map[i][j] <= 21)) {
						val = true;
						ctx2.clearRect(x, y+16, 16, 16);
						dessinerPerso(3, ctx2, x, y+16);
					} else {
						val = false;
					}
				}
	      //-Move Up
	      break;
	  case 40:
				if (x != 500) {
					y+=16;
					j=Math.ceil(x/16);
					i=Math.round(y/16);
					if (((x%16 == 8) && map[i][j-1] >= 9 && map[i][j-1]<= 21) || (map[i][j] >= 9 && map[i][j] <= 21)){
						val = true;
						ctx2.clearRect(x, y-16, 16, 16);
						dessinerPerso(1, ctx2, x, y-16);
					} else {
						val = false;
					}
				}
	      //-Move down
	      break;
	  default:
	      break;
	}
	return val;
};

var fct = function (e) {
  if (!animation) {
    key = e.keyCode || e.which;
    wall = mur(key, x, y, map1);
    if (!wall) {
      switch (key) {
      case 37:
          if(x !== 0){
            deplacementx(0);
          }
          //-Moveleft
          break;
      case 39:
          if (x != 500) {
          	deplacementx(1);
          }
          //-Move Right
          break;
      case 38:
          if(anim){
            deplacementy(2);
            anim=0;
          } else {
            deplacementy(3);
            anim=1;
          }
          //-Move Up
          break;
      case 40:
        if(anim){
          deplacementy(0);
          anim=0;
        } else {
          deplacementy(1);
          anim=1;
        }
          //-Move down
          break;
      default:
          break;
      }
    }
  }
};
