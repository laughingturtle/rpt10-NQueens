/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// *** do we return a matrix array of arrays, or an object with arrays such as a new Board? is new Board really an object with arrays?
// *** test row 1 against itself, row 2 etc, and column 1, col 2 etc, using a double for loop.

window.findNRooksSolution = function(n) {
  let board = new Board({n: n});
  var solution = board.rows();
  var rooksTest = 0;

  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j ++){
      if(rooksTest === n){
        return solution;
      }
      if(rooksTest < n){
        board.togglePiece(i, j);
        rooksTest++;

        if(board.hasAnyRowConflicts()){
          board.togglePiece(i, j);
          rooksTest--;
        }
        if(board.hasAnyColConflicts()){
          board.togglePiece(i, j);
          rooksTest--;
        }
      }
    }
    // place a 2nd rook on the next row element, run hasAnyRowConflicts , if yay, remove rook, move to next line,
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n, row, col) {
  console.log(`NEW BOARD ==>`)
  console.log('  input = ', n);
  console.log('  algorithm running . . .')
  let board = new Board({ n: n });
  let solution = board.rows();
  var queens = 0;

  /* this if-block checks for two specific cases that need no iteration */
  if (n === 2 || n === 3) {
    return solution;
  }

  var loopThru = function (row, col) {

    /*
      these loops interate through the board squares
    */
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {

        /*
          this if-block sets board afresh and places new FIRST QUEEN
        */
        if (i === 0 && j === 0) {

          //this loop ensures board is set afresh
          for (var k = 0; k < n; k++) {
            board.attributes[k].fill(0);
            queens = 0;
          }

          //sets FIRST QUEEN on fresh board.
          //this Queen remians at this position within the i & j for-loops.
          board.togglePiece(row, col);
          queens = queens + 1;
        }

        /*
          this if-block places a subsequent queen,
          then checks for conflicts,
          and removes subsequent queen if conflict is found
        */
        if (board.get(i)[j] === 0) {
          board.togglePiece(i, j);
          queens = queens + 1;
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
            queens = queens - 1;
          }
        }
      }
    }

    //this if-block checks if correct number of queens has been placed.
    //it returns board if so.
    if (queens === n) {
      return board.rows();
    }

    /*
      the following two if-blocks ensure that each board square
      is tested as a starting position.
    */

    //this if-block increases the column index of the FIRST QUEEN
    if (col < n - 1) {
      col = col + 1;
      loopThru(row, col);
    }

    //this if-block increases the row index of the FIRST QUEEN
    if (col === n - 1 && row < n -1) {
      col = 0;
      row = row + 1;
      loopThru(row, col)
    }
  };

  loopThru(0, 0);

  this.console.log(`  number of queens on final board = ${queens}`)
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  console.log(`** end of function **`)
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
/*
 -- if queens = n, increment solutionCount.
 -- jump out of the recursion with empty return, (or maybe break? check).
 -- if we get through a row without placing a queen, remove last placed piece, place it on the next space without conflict.
 -- so you need to end that recursive call(exit a failure basecase with a return), and do the work of removing that last placed piece.
 -- if we reach the final square.

after defining each base case, now define what you want each recursive call to do.

*/




  var solutionCount = 0; //fixme
  // arr = [];

  // if(row !== n-1 && col !== n-1) {
  //   arr.push(board.findNQueensSolution(n, row, col));
  //   solutionCount = solutionCount + 1;
  // }
  console.log(`NEW BOARD ==>`)
  console.log('  input = ', n);
  console.log('  algorithm running . . .')
  let board = new Board({ n: n });
  let solution = board.rows();
  let queens = 0;
  let arr = [];
  let row = 0;
  let col = 0;


  /* this if-block checks for two specific cases that need no iteration */
  if (n === 2 || n === 3) {
    return solution;
  }

  var loopThru = function (row, col) {

    /*
      these loops interate through the board squares
    */
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {

        /*
          this if-block sets board afresh and places new FIRST QUEEN
        */
        if (i === 0 && j === 0) {

          //this loop ensures board is set afresh
          for (var k = 0; k < n; k++) {
            board.attributes[k].fill(0);
            queens = 0;
          }

          //sets FIRST QUEEN on fresh board.
          //this Queen remians at this position within the i & j for-loops.
          board.togglePiece(row, col);
          queens = queens + 1;
        }

        /*
          this if-block places a subsequent queen,
          then checks for conflicts,
          and removes subsequent queen if conflict is found
        */
        if (board.get(i)[j] === 0) {
          board.togglePiece(i, j);
          queens = queens + 1;
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
            queens = queens - 1;
          }
        }
      }
    }

    //this if-block checks if correct number of queens has been placed.
    //it returns board if so.
    if (queens === n) {
    //  arr.push(board.rows());
      console.log('arr = ', arr);
      solutionCount = solutionCount +1;
      console.log('solutionCount = ', solutionCount);
      if(row === n -1){
        row = row +1;
      }
      col = col +1;
      loopThru(row, col);
      if(row === n -1 && col === n -1){
        return solutionCount;
      }
    }

    /*
      the following two if-blocks ensure that each board square
      is tested as a starting position.
    */

    //this if-block increases the column index of the FIRST QUEEN
    if (col < n - 1) {
      col = col + 1;
      loopThru(row, col);
    }

    //this if-block increases the row index of the FIRST QUEEN
    if (col === n - 1 && row < n -1) {
      col = 0;
      row = row + 1;
      loopThru(row, col)
    }
  };

  loopThru(row, col);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
