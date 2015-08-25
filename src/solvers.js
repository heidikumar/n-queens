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

  function helper(n, rowStart, board){
    // base case
    if (n === rowStart){
      boardArray.push(board);
      return;
    }

    for (var i=0; i<n; i++) {
      // we need new board here, with previous value
       if (rowStart===0){
       //if (!board){
        var newBoard = new Board({'n':n});
       //}
       } else {
        var newBoard = board.duplicateBoard();
       }
      
      newBoard.togglePiece(rowStart,i);
      if (newBoard.hasAnyRowConflicts() || newBoard.hasAnyColConflicts()){
        newBoard.togglePiece(rowStart, i);
        continue;
      } else {
        helper(n, rowStart+1, newBoard);
      }
    };
  };

  helper(n, 0);

  console.log('Number of solutions for ' + n + ' rooks:', boardArray.length);
  return boardArray.length;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // var solution = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};

window.test = function() {
  var board = new Board({n:10});
  // board.togglePiece(8,0);
  // board.togglePiece(9,1);
  // board.togglePiece(0,8);
  // board.togglePiece(1,9);
  displayBoard(board.rows());
}