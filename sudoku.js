// TODO: Make rows, cols actually changeable to a 6x6 board or a 9x9 board
//       --> right now its just hard-coded.

window.onload = function() {
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length;i++) {
    rows[i].setAttribute("id", "row_" + i);
    cells = rows[i].getElementsByTagName("td");
    for (var j=0; j<cells.length; j++) {
      cells[j].setAttribute("id", "cell_"+i+"_"+j);
    }
  }
  
  // TODO: we don't want to keep this part hardcoded and doing 
  //       document.getElementById for each sudoku cell like this...
  document.getElementById("howamidoing").onclick = function() {
    // TODO: this is quite a bit of DOM traversal...
    //alert(document.getElementById("cell_0_0").getElementsByTagName("input")[0].value);
    
    // check horizontal lines
    for (var i=0; i<4; i++) {
      // TODO I know an object ain't a hash, but does it act like one O(1)?  
      //      I guess even if its O(n) its O(size) = O(4|9) which essentially
      //      is just O(1)?
      var this_row_hash = {};
      for (var j=0; j<4; j++) {
        var val = document.getElementById("cell_" + i + "_" + j).getElementsByTagName("input")[0].value;
        if (val != undefined && val.length > 0) {
          if (this_row_hash[val] != undefined) {
            alert("Found '" + val + "' twice, row " + i + " (zero-indexed)!");
          }
          this_row_hash[val] = (this_row_hash[val] == undefined) ? 1 : this_row_hash[val]+1;
        }
      }
    }
  };
};

