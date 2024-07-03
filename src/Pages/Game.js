import React, { useState } from 'react';
import Board from '../components/Board/Board';
import "./Game.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
    const [boardSize, setBoardSize] = useState(3); 

    const handleInputChange = (event) => {
      const value = parseInt(event.target.value);
    
      if (value < 3 || value > 6) {
      
        if (value < 3) {
            showToast("Value must be at least 3");
        } else {
            showToast("Value cannot be more than 6");
        }
        return; 
    }
   


  setBoardSize(value);
    };

    const showToast = (message) => {
        toast.error(message, {
           
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };
  return (
    <>
    <ToastContainer/>

   <div className='container '>
   <h1 className='mt-3'>Tic Tac Toe</h1>
      <div className='col py-3 '>
        <h1>Set Board Size</h1>
        <input
          type="number"
          className="form-control "
          value={boardSize}
          onChange={handleInputChange}
          placeholder="Enter board size"
        />
      </div>
    
    <div className='col mt-3'>
      <div className='col'>
        <Board boardSize={boardSize} />
      </div>
    </div>
</div>
  
  </>
  );
};

export default Game;
