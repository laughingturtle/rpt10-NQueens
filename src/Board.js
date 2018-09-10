// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // if (nRow : nCol) = 1, and any in nRow or nCol = 1,
    // and any in loop nRow+1 : nCol+1 and nRow-1 : nCol-1 = 1,
    // then return true
    // else return false
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var test = 0;
      var n = this.attributes.n;

      for(var i = 0; i < n; i++){
        if(this.get(rowIndex)[i] === 1) {
          test++;
        }
      }
      if (test > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var test = false;
      var n = this.attributes.n;

        for(var i = 0; i < n; i++){
          if(this.hasRowConflictAt(i)){
            test = true;
          }
        }

      return test;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var test = 0;
      var n = this.attributes.n;
     for(var i = 0; i < n; i++){
        if(this.get(i)[colIndex] === 1) {
          test++;
        }
     }
      if (test > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let test = false;
        for(var i = 0; i < this.attributes.n; i++){
          if(this.hasColConflictAt(i)){
            test = true;
          }
        }
       return test;
    },


    // git test comment

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
     // console.log('passed in number = ', majorDiagonalColumnIndexAtFirstRow);
      var n = this.attributes.n;
      let rowIndex = 0;
      let colIndex = majorDiagonalColumnIndexAtFirstRow;
      let test = 0;
      if(colIndex < 0){
        rowIndex = Math.abs(colIndex);
        colIndex = 0;
      }
      //console.log(`coordinates = ( Row: ${rowIndex}, ColIndex: ${colIndex})`);

      let that = this;

      function traverse(row, col){

        // get the row element index and col index, check row + 1 and column + 1 to see if it === 1
        if(row === n || col === n){
          return test;
        }

        if(that.get(row)[col] === 1){
          test++;
        }
        if(test > 1){
          return test;
        }
        traverse(row +1, col +1);
      }

      traverse(rowIndex, colIndex);
      if (test > 1) {
        return true;
      }
      return false; // fix me - NO!

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let test = false;
      //debugger;
        for(var i = -3; i < this.attributes.n; i++){
          console.log('my this = ', this.hasMajorDiagonalConflictAt(i));
          if(this.hasMajorDiagonalConflictAt(i)){
           test = true;
          }
        }
      return test; // fixme - ok
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.attributes.n;
      let rowIndex = 0;
      let colIndex = minorDiagonalColumnIndexAtFirstRow;
      let test = 0;
      if(colIndex > n -1){
        rowIndex = colIndex - (n-1);
        colIndex = n-1;
      }
      console.log('input = ', minorDiagonalColumnIndexAtFirstRow)
      console.log(`coordinates = ( Row: ${rowIndex}, ColIndex: ${colIndex})`);

      let that = this;

      //debugger;
      function traverse(row, col){

        // get the row element index and col index, check row - 1 and column - 1 to see if it === 1
        if(row === n || col < 0){
          return test;
        }

        if(that.get(row)[col] === 1){
          test++;
        }
        if(test > 1){
          return test;
        }
        traverse(row +1, col -1);
      }

      traverse(rowIndex, colIndex);
      if (test > 1) {
        return true;
      }
      return false; // fix me - NO!
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let test = false;
      let n = (this.attributes.n -1) * 2;
      //debugger;
        for(var i = 0; i < n; i++){
         // console.log('my this = ', this.hasMinorDiagonalConflictAt(i));
          if(this.hasMinorDiagonalConflictAt(i)){
           test = true;
          }
        }
      return test; // fixme - ok
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
