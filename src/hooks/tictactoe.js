import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';

const useTicTacToe = (boardSize) => {
  const initialBoard = () => Array(boardSize * boardSize).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsNext] = useState(true);
  const [WINNING_PATTERNS, setWinningPatterns] = useState([]);


  useEffect(() => {
    
    const generateWinningPatterns = (size) => {
      const patterns = [];
   
      // Rows
      for (let i = 0; i < size; i++) {
        const rowPattern = [];
        for (let j = 0; j < size; j++) {
          rowPattern.push(i * size + j);
        }
        patterns.push(rowPattern);
      }

      // Columns
      for (let i = 0; i < size; i++) {
        const colPattern = [];
        for (let j = 0; j < size; j++) {
          colPattern.push(j * size + i);
        }
        patterns.push(colPattern);
      }

      // Diagonal (top-left to bottom-right)
      const diagonal1 = [];
      for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
      }
      patterns.push(diagonal1);

      // Diagonal (top-right to bottom-left)
      const diagonal2 = [];
      for (let i = 0; i < size; i++) {
        diagonal2.push(i * size + (size - i - 1));
      }
      patterns.push(diagonal2);

      return patterns;
    };

    setWinningPatterns(generateWinningPatterns(boardSize));
  }, [boardSize]);

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      const [a] = pattern;
      if (currentBoard[a] && pattern.every(index => currentBoard[index] === currentBoard[a])) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
//    isXNext ? "X" : "O";
   newBoard[index] =  isXNext ? (
    <FontAwesomeIcon icon={faTimes} style={{ color: "#006fff" }} size='2x' />
  ) : (
    <FontAwesomeIcon icon={faCircle} style={{ color: "white" }} size='2x' />
  )
  
    setBoard(newBoard);
    setIsNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
    
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setIsNext(true);
  };

  return { board, handleClick, getStatusMessage, resetGame };
};

export default useTicTacToe;
