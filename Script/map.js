var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tuile = new Image();
tuile.src = "Ressource/tile.png";

dessinerTile = function(numero, context, xDestination, yDestination) {
  if(numero <= 8) {
    var xSource = numero * 16 - 16;
    var ySource = 0;
  } else {
    if (numero <= 16) {
      xSource = (numero - 8) * 16 - 16;
      ySource = 16;
    } else {
      xSource = (numero - 16) *16 - 16;
      ySource = 32;
    }
  }
    ctx.drawImage(tuile, xSource, ySource, 16, 16, xDestination, yDestination, 16, 16);
};

var map1 =
[
  [07  ,07  ,07  ,07  ,07  ,07  ,16  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ],
  [17  ,18  ,18  ,18  ,18  ,18  ,16  ,18  ,18  ,18  ,18  ,18  ,18  ,18  ,18  ,19  ],
  [10  ,04  ,01  ,01  ,01  ,01  ,04  ,02  ,01  ,01  ,03  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,04  ,01  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,01  ,01  ,05  ,05  ,01  ,12  ],
  [10  ,04  ,01  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,01  ,01  ,05  ,06  ,01  ,12  ],
  [10  ,04  ,01  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,02  ,01  ,02  ,01  ,01  ,12  ],
  [10  ,04  ,01  ,02  ,01  ,01  ,04  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,04  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,04  ,01  ,02  ,04  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,04  ,04  ,04  ,04  ,04  ,04  ,04  ,04  ,01  ,01  ,01  ,12  ],
  [10  ,03  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,02  ,04  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,01  ,01  ,03  ,01  ,01  ,01  ,04  ,01  ,01  ,01  ,12  ],
  [10  ,01  ,01  ,01  ,01  ,02  ,01  ,01  ,01  ,01  ,01  ,04  ,01  ,02  ,01  ,12  ],
  [13  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,14  ,16  ,14  ,14  ,14  ,15  ],
  [07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,07  ,16  ,07  ,07  ,07  ,07  ]
];

var creeMap = function (map) {
  for (var i = 0; map[i]; i++) {
    for (var j = 0; map[i][j]; j++) {
      dessinerTile(map[i][j], ctx, j*16, i*16);
      console.log('passage dans la boucle j, valeur de j : ' + j + ' valeur de map[i][j] : ' + map[i][j]);
    }
    console.log('passage dans la boucle i, valeur de i : ' + i);
  }
};
