'use strict';

let ColleyMatrix = require('./colley-matrix.js');

let C = new ColleyMatrix(5);

console.log(C.getMatrix());

const a = 0, b = 1, c = 2, d = 3, e = 4;

C.addGame(a, c);
C.addGame(d, a);
C.addGame(e, a);

C.addGame(c, b);
C.addGame(b, e);

C.addGame(c, d);
C.addGame(e, c);

console.log(C.getMatrix());
// console.log(C.getRatings());
console.log(C.solve());
