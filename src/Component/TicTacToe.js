import React, { useState , useEffect } from 'react';
import AIPlayer from './AIplayer';
import './TicTacToe.css';
import gameIcon from '../Component/Images/tic-tac-toe.png'; 
import restartIcon from '../Component/Images/restart.png'; 
import winIcon from '../Component/Images/trophy.png'; 
import drawIcon from '../Component/Images/partners.png'; 



const TicTacToe = () => {
    const [gamePattern, setGamePattern] = useState('Player1 vs Player2');
    const [showAIPlayer, setShowAIPlayer] = useState(false);
    const [ currentPattern,setCurrentPattern] = useState("");
    const[currentplayer,setCurrentPlayer] = useState("X");
    const[cells,setCells] = useState(Array(9).fill(""));
    const[error,setError] = useState("");
    const[winner,setWinner] = useState("");
    const[draw,setDraw] = useState("");
    const[lastwinner,setLastWinner] = useState("");
    const[gamestatus,setGameStatus] = useState("");
    const [gameEnded, setGameEnded] = useState(false);

// to reset all when another game mode is selected.
    const resetGameState = () => {
      setCells(Array(9).fill(""));
      setWinner("");
      setDraw("");
      setError("");
      setLastWinner("");
      setGameEnded(false);
    };
    


    useEffect(() => {
      if (currentPattern === "Player1 vs Player2" || currentPattern === "Player vs AI") {
        if (lastwinner !== "") {
          setCurrentPlayer(lastwinner);
        } else {
          setCurrentPlayer("X");
        }
      }
    }, [lastwinner, currentPattern]);

 //to handle the game mode as per user selected from UI 

    function handleGamePattern(pattern){
        setGamePattern(pattern);
        setCurrentPlayer("X")
         setLastWinner("");
        // Update the 'active' class for the buttons
         const buttons = document.getElementsByClassName('selectbtn');
         for (let i = 0; i < buttons.length; i++) {
           if (buttons[i].getAttribute('data-mode') === pattern) {
              buttons[i].classList.add('active');
            } else {
              buttons[i].classList.remove('active');
           }
        }

        //to change gamemode to AI vs Player when user clicks on it

        if(pattern === "Player vs AI"){
          setShowAIPlayer(true);
          setCurrentPattern(pattern);
          resetGameState();
        } else if(pattern === "Player1 vs Player2"){
          setShowAIPlayer(false);
          setCurrentPattern(pattern);
          resetGameState();
        }
      
    }

   
    // to declare whether the game is win or draw of current game board which is cellblock

   function handleWinner(cellblock){
     const combinations = {
        horizontal : 
        [
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ],
        vertical : 
        [
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ],
        diagonal : 
        [
            [0,4,8],
            [2,4,6]
        ]
     };
     let isDraw = true;
     for(let combination in combinations){
        combinations[combination].forEach((pattern)=>{
            if(cellblock[pattern[0]] === "" || cellblock[pattern[1]] === "" || cellblock[pattern[2]] === "" ){
                isDraw=false;
              return ;
            } else if(cellblock[pattern[0]] === cellblock[pattern[1]] && cellblock[pattern[1]] === cellblock[pattern[2]]) {
               setWinner(cellblock[pattern[0]]); 
               setLastWinner(cellblock[pattern[0]]);
               setGameStatus(cellblock[pattern[0]]);
               setCurrentPlayer(cellblock[pattern[0]]);
               setGameEnded(true);
               setDraw("");               
            } 
        });
     }
     if(isDraw){
        setDraw("draw");
        setGameStatus("draw");
        setGameEnded(true);
     }
   }
    

  //handle click events of cells 
  
    function handleClick(num){
        if(gameEnded){
            return;
        }
        if(cells[num]!= ""){
          setError("Please select an empty cell !!!");
        } else{
            const cellblock = [...cells];
            if(currentplayer === "X"){
                cellblock[num] = "X";
                setCurrentPlayer("O");
            } else{
                cellblock[num] = "O";
                setCurrentPlayer("X");
            }
            setError("");
            setCells(cellblock);
            handleWinner(cellblock);
        }
        
    }

    //adding differnt images based on gamestatus state

    let imageResult = " ";
    if(gamestatus === "X" || gamestatus === "O"){
        imageResult= <img className='resicon1' src={winIcon} alt='winicon'/>;
    } else if(gamestatus === "draw"){
        imageResult = <img className='resicon2' src={drawIcon} alt='drawicon' />
    }

    //handling reset button

    function handleRestart(){
        setWinner("");
        setDraw("");
        setError("");
        setCells(Array(9).fill(""));
        setGameEnded(false);
    }

  return (
    <div className='Container'>
        <div className='header'>
            <div className='dropdown'>
              <button className={`selectbtn ${gamePattern === 'Player1 vs Player2' ? 'active' : ''}`} data-mode="Player1 vs Player2" onClick={()=>handleGamePattern("Player1 vs Player2")}>TwoPlayers X vs O</button>
              <button className={`selectbtn ${gamePattern === 'Player1 vs AI' ? 'active' : ''}`} data-mode="Player vs AI"  onClick={()=>handleGamePattern("Player vs AI")}>Player vs AI</button>
            </div> 
           <div className='gameheading'>
              <img className='imageone' src={gameIcon} alt='tictactoeIcon'/>
              <h1 className='headingone'> TIC TAC TOE </h1>
            </div> 
            <div className='btn1'>
            <button className='restartbtn' onClick={()=>handleRestart()}><img className='imagetwo' src={restartIcon} /></button>
            </div>        
        </div>
        <div><h1 className='headingtwo'>CurrentPlayer : <span className={currentplayer === "X" ? "x-player" : "o-player"} >{currentplayer}</span></h1></div>
        {error&&<h2 className='errortext'>{error}</h2>}
      <div className='tableblock'>
        <table>
            <tbody>
                <tr>
                  <td onClick={()=>handleClick(0)}  className={cells[0] === "X" ? "x-player" : "o-player"}>{cells[0]} </td>
                  <td onClick={()=>handleClick(1)}  className={cells[1] === "X" ? "x-player" : "o-player"}>{cells[1]}</td>
                  <td onClick={()=>handleClick(2)}  className={cells[2] === "X" ? "x-player" : "o-player"}>{cells[2]}</td>
                </tr>
                <tr>
                  <td onClick={()=>handleClick(3)} className={cells[3] === "X" ? "x-player" : "o-player"}>{cells[3]}</td>
                  <td onClick={()=>handleClick(4)} className={cells[4] === "X" ? "x-player" : "o-player"}>{cells[4]}</td>
                  <td onClick={()=>handleClick(5)} className={cells[5] === "X" ? "x-player" : "o-player"}>{cells[5]}</td>
                </tr>
                <tr>
                  <td onClick={()=>handleClick(6)} className={cells[6] === "X" ? "x-player" : "o-player"}>{cells[6]}</td>
                  <td onClick={()=>handleClick(7)} className={cells[7] === "X" ? "x-player" : "o-player"}>{cells[7]}</td>
                  <td onClick={()=>handleClick(8)} className={cells[8] === "X" ? "x-player" : "o-player"}>{cells[8]}</td>
                </tr>
            </tbody>
        </table>
      </div>
      {(winner || draw) && 
      <div className='finalresult'>
       <div>{winner ? <h2 className='headingthree'>Congratulations !! {winner} is winner </h2>:<h2 className='headingthree'>It's a {draw} match !!!</h2>}</div> 
       <div>{imageResult}</div>
      </div>}
      {showAIPlayer && (
        <AIPlayer
          currentPlayer={currentplayer}
          cells={cells}
          gameEnded={gameEnded}
          handleAIPlay={handleClick}
          />
      )}
    </div>
  )
}

export default TicTacToe