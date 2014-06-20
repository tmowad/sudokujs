// TODO: the CSS has a "brighten" focus type setting in the <input type="text"> that I'd like to turn off...

// TODO: Make rows, cols actually changeable to a 6x6 board or a 9x9 board
//       --> right now its just hard-coded.

// TODO: Ahh...so I guess we may need to have SudokuBoard objects that implement something like
//       a list of enumerators, e.g. board.horizontalEnumerators.length == 4 (for 4x4 board), 
//       as well as .verticalEnumerators and .subsquareEnumerators -- hmm...

window.onload = function() {
  // Set the names of each Sudoku square
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length;i++) {
    rows[i].setAttribute("id", "row_" + i);
    cells = rows[i].getElementsByTagName("td");
    for (var j=0; j<cells.length; j++) {
      cells[j].setAttribute("id", "cell_"+i+"_"+j);
    }
  }
  
  var allCellInputs = document.getElementById("sudokuBoard").getElementsByTagName("input");
  for (var i=0; i<allCellInputs.length; i++) {
    allCellInputs[i].setAttribute("maxlength", "1");
  }
  
  function getValueAt(i, j) {
    return document.getElementById("cell_" + i + "_" + j).getElementsByTagName("input")[0].value;
  } 
  
  // TODO: we don't want to keep this part hardcoded and doing 
  //       document.getElementById for each sudoku cell like this...
  document.getElementById("howamidoing").onclick = function() {
    // TODO: this is quite a bit of DOM traversal...
    //alert(document.getElementById("cell_0_0").getElementsByTagName("input")[0].value);
    
    // TODO: de-hardcode 4
    // check horizontal lines
    for (var i=0; i<4; i++) {
      // TODO I know an object ain't a hash, but does it act like one O(1)?  
      //      I guess even if its O(n) its O(size) = O(4|9) which essentially
      //      is just O(1)?
      // TODO this is a ton of DOM traversal...how can we do this in more of an array-traversal type way?
      var this_row_hash = {};
      for (var j=0; j<4; j++) {
        var val = getValueAt(i, j);
        if (val != undefined && val.length > 0) {
          if (this_row_hash[val] != undefined) {
            alert("Found '" + val + "' twice, row " + i + " (zero-indexed)!");
          }
          this_row_hash[val] = (this_row_hash[val] == undefined) ? 1 : this_row_hash[val]+1;
        }
      }
    }
    
    // TODO: de-hardcode 4
    // check vertical lines
    for (var j=0; j<4; j++) {
      var this_col_hash = {};
      for (var i=0; i<4; i++) {
        var val = getValueAt(i, j);
        if (val != undefined && val.length > 0) {
          if (this_col_hash[val] != undefined) {
            alert("Found '" + val + "' twice, col " + j + " (zero-indexed)!");
          }
          this_col_hash[val] = (this_col_hash[val] == undefined) ? 1 : this_col_hash[val]+1;
        }
      }
    }
    
    // TODO: This may have to drastically change for the 3x2 subsquares (for 6x6 board) 
    //       and 3x3 subsquares (for 9x9 board) 
    // Each iteraction of this outer loop represents one subsquare
    for (var sq = 0; sq < 4; sq++) {
      var base_i = Math.floor(sq/2) * 2;
      var base_j = (sq % 2) * 2;
      console.log("i,j="+base_i+","+base_j);
      
      var this_subsquare_hash = {};
      for (var i=0; i<2; i++) {
        for (var j=0; j<2; j++) {
          var val = getValueAt(base_i+i,base_j+j);
          if (val != undefined && val.length > 0) {
            if (this_subsquare_hash[val] != undefined) {
              alert("Found '" + val + "' twice in subsquare " + sq + "!");
            }
            this_subsquare_hash[val] = (this_col_hash[val] == undefined) ? 1 : this_col_hash[val]+1;
          }
        }
      }
    }
  };
};

