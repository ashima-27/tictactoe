import React ,{useEffect} from "react";
import "./Board.css";
import useTicTacToe from "../../hooks/tictactoe";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGamepad } from '@fortawesome/free-solid-svg-icons';
const Board = ({ boardSize }) => {
    console.log("boa",boardSize)
  const { board, handleClick, resetGame, getStatusMessage } = useTicTacToe(boardSize);
 
  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const cells = [];
      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j;
        cells.push(
          <button
            className="cell"
            key={index}
            onClick={() => handleClick(index)}
            disabled={board[index] != null}
          >
            {board[index]}
          </button>
        );
      }
      rows.push(
        <div className="row" key={i}>
          {cells}
        </div>
      );
    }
    return rows;
  };
 
  return (
    <>    
      <div className="container">
      <ToastContainer/>
      <div className="row">
    <div className="col-12 col-md-6 msgBox">
      <FontAwesomeIcon icon={faUsers} color='black' /> {getStatusMessage()}
    </div>
    <div className="col-12 col-md-6">
      <button className="button msgBox" onClick={resetGame}>
        <FontAwesomeIcon icon={faGamepad} color='black' /> Reset Game
      </button>
    </div>
  </div>
  <div className="board">{renderBoard()}</div>
  </div>
    </>
  );
};

export default Board;
