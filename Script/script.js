var key, wall, animation = 0, tempo = 80, distance=16;

window.onload = function () {
  creeMap(map1);
  dessinerPerso(5, ctx2, x, y);
};


var fct = function (e) {
  if (!animation) {
    key = e.keyCode || e.which;
    wall = mur(key, x, y, map1);
    if (!wall) {
      switch (key) {
      case 37:
          deplacementx(0);
          //-Moveleft
          break;
      case 39:
          deplacementx(1);
          //-Move Right
          break;
      case 38:
          deplacementy(0);
          //-Move Up
          break;
      case 40:
          deplacementy(1);
          //-Move down
          break;
      default:
          break;
      }
    }
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
