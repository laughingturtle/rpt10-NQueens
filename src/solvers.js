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
window.findNQueensSolution = function(n) {
  console.log('outer function = ', n);
  console.log(`__NEW BOARD__`)
  let board = new Board({ n: n });
  let solution = board.rows();
  let colIndex = 0;

  if (n === 2 || n === 3) {
    return solution;
  }

  var queens = 0;

  var loopThru = function(row, col) {
    // if (n === 1){
    // debugger;
    // }

    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++){

        if(i === 0 && j === 0){
            j = col;
            board.togglePiece(i, j);
            console.log('first = ', board.rows());
            console.log("j = ", j)
            queens++;
           // j++;
        }

        if(board.get(i)[j] === 0) {
          board.togglePiece(i, j);
          console.log('after = ', board.rows());
          queens++;
          if(board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
            queens--;
          }
        }
      }
    }

    console.log('col after loops = ', col);
    console.log('n after loops = ', n);
    console.log('queens after loops = ', queens);
    if (queens === n) {
      return board.rows();
    } else if (col < n-1) {
      col++;
      loopThru(0, col);
    }
      /* else if (col >= n && row < n){
        col = 0
        row++
        loopThru(row, col)
      }*/
  };

  loopThru(0, 0);

  /*
  if(queens === n) {
    return solution;
  } else if (queens !== n) {
    if (col < n) {
      col++;
      //and go back into the loops -->
      //loopThru()
    } else if (col >= n && row < n) {
      row++;
      col = 0;
      //and go back into the loops -->
      //loopThru()
    }
  }
  */

  this.console.log(`number of queens on board: ${queens}`)
  console.log(`Solution: ${solution}`)
  console.log(`** end of function **`)
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
