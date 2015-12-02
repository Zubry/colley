# Colley Rankings

Colley’s bias free ranking method was designed to rank college football teams fairly and without bias, using only wins and losses as the only inputs.

From the [Colley Rankings website](http://www.colleyrankings.com/matrate.pdf):

> The method is based on very simple statistical principles, and uses only Div. I-A wins and losses as input — margin of victory does not matter. The scheme adjusts effectively for strength of schedule, in a way that is free of bias toward conference, tradition, or region. Comparison of rankings produced by this method to those produced by the press polls shows that despite its simplicity, the scheme produces common sense results.

Although the Colley ranking method was designed for college football, it can be applied to any other system where bias-free rankings are desired.

It should be noted, however, that the Colley ranking method does not attempt to determine the strength of each competitor, but rather the "deservedness" of the competitor. That is, the Colley matrix favors teams who play well against difficult schedules over teams that skate through easier ones.

# Installation

`npm install --save colley-rankings`

# Use

The API exposes two methods:

## Colley.addGame(winner, loser)

Records a game between two teams in the Colley matrix. The parameters `winner` and `loser` represent the IDs of each team. Each ID should be between 0 and n-1, where n is the number of teams in the league.

## Colley.solve()

Solves the Colley matrix, outputting an n x 1 column matrix (see [m4th](https://github.com/hhelwich/m4th) for more information).

# Example

    let Colley = require('colley-rankings');
    let C = Colley(5) // Create a 5-team league

    let winner_id = 4;
    let loser_id = 2;
    C.addGame(winner_id, loser_id);

    console.log(C.solve());

**Result**

    { columns: 1,
      rows: 5,
      array: [ 0.5, 0.5, 0.375, 0.5, 0.6250000000000001 ] }
