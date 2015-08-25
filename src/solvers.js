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

window.findNRooksSolution = function(n) {      //every time we recurse, n = n-1
  //if no start, write default start
  board1 = new Board({'n':n});
  function helper(n, rowStart, board){
    if (n === rowStart){
      return board;
    }
    board.togglePiece(rowStart, 0);
    var i = 0;
    
    while(board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      board.togglePiece(rowStart,i);
      board.togglePiece(rowStart,++i);
    }
    return helper(n, rowStart+1, board);
  };
  var ans = helper(n, 0, board1);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(ans.rows()));
  return ans.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var boardArray = [];

  function helper(n, rowStart, board, columns){
    // base case
    if (n === rowStart){
      boardArray.push(board);
      return;
    }

    for (var i=0; i<columns.length; i++) {
      // we need new board here, with previous value
       if (rowStart===0){
        var newBoard = new Board({'n':n});
        var columns = _.range(n);
       } else {
        var newBoard = board.duplicateBoard();
       }
      newBoard.togglePiece(rowStart,columns[i]);

      if (newBoard.hasRowConflictAt(rowStart) || newBoard.hasColConflictAt(columns[i])){
        newBoard.togglePiece(rowStart, columns[i]);
        continue;
      } else {
        //duplicate board here
        var newColumns = columns.slice();
        newColumns.splice(i,1)
        helper(n, rowStart+1, newBoard, newColumns);
      }
    };
  };


  helper(n, 0, undefined, _.range(n));

  console.log('Number of solutions for ' + n + ' rooks:', boardArray.length);
  return boardArray.length;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boardArray = [];

  function helper(n, rowStart, board, columns){
    // base case
    if (n === rowStart){
      boardArray.push(board);
      return;
    }

    for (var i=0; i<columns.length; i++) {
      // we need new board here, with previous value
       if (rowStart===0){
        var newBoard = new Board({'n':n});
        var columns = _.range(n);
       } else {
        var newBoard = board.duplicateBoard();
       }
      newBoard.togglePiece(rowStart,columns[i]);

      if (newBoard.hasAnyQueenConflictsOn(rowStart, columns[i])){
        newBoard.togglePiece(rowStart, columns[i]);
        continue;
      } else {
        //duplicate board here
        var newColumns = columns.slice();
        newColumns.splice(i,1)
        helper(n, rowStart+1, newBoard, newColumns);
      }
    };
  };
  helper(n, 0, undefined, _.range(n));

  console.log(n,boardArray)
  var newBoard = new Board({n:n});
  if(boardArray[0]===undefined) {return newBoard.rows();}
  return boardArray[0].rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var boardArray = [];

  function helper(n, rowStart, board, columns){
    // base case
    if (n === rowStart){
      boardArray.push(board);
      return;
    }

    for (var i=0; i<columns.length; i++) {
      // we need new board here, with previous value
       if (rowStart===0){
        var newBoard = new Board({'n':n});
        var columns = _.range(n);
       } else {
        var newBoard = board.duplicateBoard();
       }
      newBoard.togglePiece(rowStart,columns[i]);

      if (newBoard.hasAnyQueenConflictsOn(rowStart, columns[i])){
        newBoard.togglePiece(rowStart, columns[i]);
        continue;
      } else {
        //duplicate board here
        var newColumns = columns.slice();
        newColumns.splice(i,1)
        helper(n, rowStart+1, newBoard, newColumns);
      }
    };
  };
  helper(n, 0, undefined, _.range(n));

  console.log('Number of solutions for ' + n + ' queens:', boardArray.length);
  return boardArray.length;

};

window.test = function() {
  var board = new Board({n:10});
  // board.togglePiece(8,0);
  // board.togglePiece(9,1);
  // board.togglePiece(0,8);
  // board.togglePiece(1,9);
  displayBoard(board.rows());
}