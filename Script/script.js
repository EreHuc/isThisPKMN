creeMap(map1);



window.onkeydown = function(e) {
  var key = e.keyCode || e.which;
  switch (key) {
      case 37:
      deplacementx(0);
      ctx2.clearRect(x, y, 16, 16);
      dessinerSacha(7, ctx2, x, y);
      break;
  case 39:
        deplacementx(1);
        ctx2.clearRect(x, y, 16, 16);
        dessinerSacha(5, ctx2, x, y);
      break;
  case 38:
      deplacementy(0);
      ctx2.clearRect(x, y, 16, 16);
      dessinerSacha(3, ctx2, x, y);
      break;
  case 40:
      deplacementy(1);
      ctx2.clearRect(x, y, 16, 16);
      dessinerSacha(1, ctx2, x, y);
      //-Move down
      break;
  default:
      break;
  }
};

var x = 0;
var y = 26;
dessinerSacha(5, ctx2, x, y);
var deplacementy = function (arg) {
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=8;
      dessinerSacha(2, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y+=8;
      dessinerSacha(1, ctx2, x, y);
  }, 250);
  console.log(y);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=8;
      dessinerSacha(4, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      y-=8;
      dessinerSacha(3, ctx2, x, y);
    }, 250);
    console.log(y);
  }
};

var deplacementx = function (arg) {
  if (arg==1) {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=8;
      dessinerSacha(6, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x+=8;
      dessinerSacha(5, ctx2, x, y);
  }, 250);
  console.log(x);
  } else {
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=8;
      dessinerSacha(8, ctx2, x, y);
    }, 125);
    setTimeout(function () {
      ctx2.clearRect(x, y, 16, 16);
      x-=8;
      dessinerSacha(7, ctx2, x, y);
    }, 250);
    console.log(x);
  }
};




/*-----------------ZONE DE TEST-----------------*/
// var d = 1;
// while (d<17) {
//   if(d<9){
//     dessinerTile(d, ctx, (d*16)-16, 0);
//   } else {
//     dessinerTile(d, ctx, ((d-8)*16)-16, 16);
//   }
//   console.log(d);
//   d++;
// }

/*ctx.drawImage(tuile, 200, 10);                      drawImage(image, dx, dy)
ctx.drawImage(red, 200, 30, 100, 100);                drawImage(image, dx, dy, dw, dh)

drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
ctx.drawImage(red, 0, 0, 16, 16, 0, 0, 16, 16);
ctx.drawImage(red, 16, 0, 16, 16, 16, 0, 16, 16);
ctx.drawImage(red, 0, 16, 16, 16, 0, 16, 16, 16);
ctx.drawImage(red, 16, 16, 16, 16, 16, 16, 16, 16);
ctx.drawImage(red, 0, 32, 16, 16, 0, 32, 16, 16);
ctx.drawImage(red, 16, 32, 16, 16, 16, 32, 16, 16);
ctx.drawImage(red, 0, 48, 16, 16, 0, 48, 16, 16);
ctx.drawImage(red, 16, 32, 16, 16, 16, 48, 16, 16);*/
