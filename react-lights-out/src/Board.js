import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let row in nrows){
      for (let col in ncols){
        initialBoard[col].push(Math.random() < chanceLightStartsOn)
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    winState = board.every(row => row.every(c => c === false))
    return winState;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      newBoard = JSON.parse(JSON.stringify(board))

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y+1, x, newBoard)
      flipCell(y, x+1, newBoard)
      flipCell(y-1, x, newBoard)
      flipCell(y, x-1, newBoard)

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if(hasWon()){
    return(
      <div>
        YOU WIN!
      </div>
    )
  } else {
    return (
      <div>
      for(row in board){
        <tr>
          for(cell in row){
            <Cell 
            flipCellsAroundMe={() => {return flipCellsAround(`${row}-${cell}`)}} 
            isLit={board[row][cell]} />
          }
        </tr>
      }
    </div>
    )
  }
  // make table board

}

export default Board;
