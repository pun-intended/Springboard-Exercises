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
    let cells = []
    for(let i = 0; i < nrows; i++){
      let row = []
      for (let j = 0; j < ncols; j++){
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function createCells(board){
    let cellArray = []
      for(let row in board){
        cellArray[row] = []
        console.log(board[row])
        for(let col in board[row]) {
          cellArray[row][col] = <Cell flipCellsAroundMe={() => 
            {return (flipCellsAround(`${row}-${col}`))}}
            isLit={board[row][col]} />
        }
      }
      return cellArray;
  }

  function hasWon() {
    console.log("Calling hasWon")
    // TODO: check the board in state to determine whether the player has won.
    const winState = board.every(row => row.every(c => c === false))
    console.log(winState)
    return winState;
  }

  function flipCellsAround(coord) {
    console.log("Calling flip cells around")
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = JSON.parse(JSON.stringify(board))

      flipCell(y, x, newBoard)
      flipCell(y+1, x, newBoard)
      flipCell(y, x+1, newBoard)
      flipCell(y-1, x, newBoard)
      flipCell(y, x-1, newBoard)

      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  let cells = createCells(board)
  if(hasWon()){
    return(
      <div>
        YOU WIN!
      </div>
    )
  } else {
    return (
      <table>
        Making Board
        {cells.map((row) => {
          return(
            <tr>
              {row.map((cell) => {
                return(
                  cell
                )
              })}
            </tr> 
          )
        })}
      </table>
    )
  }
  // make table board

}

export default Board;
