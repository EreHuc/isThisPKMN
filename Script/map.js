var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tuile = new Image();
tuile.src = "tile.png";

dessinerTile = function(numero, context, xDestination, yDestination) {
  if(numero <= 8){
    var xSource = numero * 16 - 16;
    var ySource = 0;
  } else {
    xSource = (numero - 8) * 16 - 16;
    ySource = 16;
  }
    ctx.drawImage(tuile, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};

var map =
[
  [07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [13  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,15  ],
  [07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ]
  ];

var creeMap = function () {
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      dessinerTile(map[i][j], ctx, j*16, i*16);
      console.log('passage dans la boucle j, valeur de j : ' + j + ' valeur de map[i][j] : ' + map[i][j]);
    }
    console.log('passage dans la boucle i, valeur de i : ' + i);
  }
};
