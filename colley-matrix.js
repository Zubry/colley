'use strict';

const m4th = require('m4th');

/*
  A Colley Matrix is an extension of a Sparse Matrix, with some restrictions:
    * C[i][i] = 2 + n, where n is the number of games team i has played
    * C[i][j] = -n[i][j], where n[i][j] is the number of times team i has played team j
*/

const ColleyMatrix = function(teamCount){
  // This is our Colley Matrix
  let C = m4th.matrix(teamCount);

  // These is our column vector of Colley ratings, initialized to 1
  let colleyRatings = Array.apply(null, {length: teamCount}).map(function(){
    return {
      'wins': 0,
      'losses': 0,
      'rating': 1
    };
  });

  // Initialize the Colley Matrix such that each M[i][j] = 0
  C = C.map(function(element){
    return 0;
  });

  // Initialize the Colley Matrix such that M[i][i] = 2 + n
  for(let i = 0; i < teamCount; ++i){
    C.set(i, i, 2);
  }

  const addGame = function(winner, loser){
    // Figure out how many times these teams have played
    let gameCount = C.get(winner, loser) || 0;

    // Update each team's entries
    C.set(winner, loser, gameCount - 1);
    C.set(loser, winner, gameCount - 1);

    // Restrict M[i][i] to 2 + n
    C.set(winner, winner, C.get(winner, winner) + 1);
    C.set(loser, loser, C.get(loser, loser) + 1);

    // Update the ratings of each team
    updateRatings(winner, loser)
  };

  const updateRatings = function(winner, loser){
    colleyRatings[winner].wins++;
    colleyRatings[loser].losses++;

    // Rating = 1 + (w - l)/2
    colleyRatings[winner].rating = 1 + (colleyRatings[winner].wins - colleyRatings[winner].losses)/2;
    colleyRatings[loser].rating = 1 + (colleyRatings[loser].wins - colleyRatings[loser].losses)/2;
  };

  const getMatrix = function(){
    return C.toString();
  };

  const getRatings = function(){
    return colleyRatings.map(function(team){
      return team.rating;
    });
  };

  const solve = function(){
    let y = m4th.matrix(teamCount, getRatings());
    return m4th.lu(C).solve(y);
  };

  return {
    'addGame': addGame,
    'getMatrix': getMatrix,
    'getRatings': getRatings,
    'solve': solve
  };
};

module.exports = ColleyMatrix
