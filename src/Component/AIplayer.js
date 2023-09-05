import  { useEffect } from 'react';

const AIPlayer = ({ currentPlayer, cells, gameEnded, handleAIPlay }) => {
  useEffect(() => {
    if (currentPlayer === 'O' && !gameEnded) {
      // AI's turn to play
      makeAIMove();
    }
  }, [currentPlayer, gameEnded]);

  const makeAIMove = () => {
    //using reduce method
   const emptyCells = cells.reduce((acc, cell, index) => {
      if (cell === '') {
        acc.push(index);
      }
      return acc;
    }, []);
    console.log(emptyCells);

   //using map and filter methods
    /*const emptyCells = cells.map((cell,index)=>
      (cell === "") ? index : null
    ).filter((index)=>{
      if(index!==null){
        return index;
      }
    });*/
   // console.log(emptyCells);

   //using for loop 
  /* const emptyCells = [];
   for(let index=0;index<cells.length;index++){
    if(cells[index] === ""){
      emptyCells.push(index);
    }
   }
   console.log(emptyCells);*/
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomMove = emptyCells[randomIndex];
      handleAIPlay(randomMove);
    }
  };

  return null; // AIPlayer doesn't render anything
};

export default AIPlayer;
