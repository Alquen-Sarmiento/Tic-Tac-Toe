"use strict"
const human = "O";
const enemy = "X";
//Create an array that contains 0 to 8
let globalBoard = Array.from(Array(9).keys());
let gameCounter = 0;
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

window.onload = function() {
  //Setting the size of the main box by globally adjusting if phone or desktop.
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const boxClass = document.getElementsByClassName("box");

  //If the window's width is larger, the main box should depend on the window's height to properly fit;
  if (winWidth >= winHeight){
    document.getElementById("main").style.width = (winHeight * 0.8) + "px"; 
    document.getElementById("main").style.height = (winHeight * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, function(e){ e.style.fontSize = (winHeight * 0.11) + "px"});
  }
  else{
    //Beware of the spelling of width
    document.getElementById("main").style.width = (winWidth * 0.8) + "px";
    document.getElementById("main").style.height = (winWidth * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, function(e){ e.style.fontSize = (winWidth * 0.11) + "px"});
  }

  //Add click listener to the restart button
  document.getElementById("restart").addEventListener("click", startGame)
  startGame();

  function startGame(){
    //Run through all the cells and add click listeners
    Array.prototype.forEach.call(boxClass, function(e){
      e.addEventListener("click", playerTurn);
      e.innerText = "";
      e.style.backgroundColor = "white";
    });
    //Set the globalBoard to an array from 0-8
    globalBoard = Array.from(Array(9).keys());
    //Determine who to move first
    firstMove()
    gameCounter++;
  }
  
  function playerTurn(cell){
    //Called the turn function with the index of cell and the player
    turn(cell.target.id, human);
    turn(enemyMove(), enemy);
  }

function firstMove(){
  //If gameCounter is odd, the enemy attack first
  if(gameCounter % 2 == 1){
    turn(enemyMove(), enemy);
  }
}

  function turn(cellID, player){
    //Set the player's character to the globalBoard and set the main box according to the move
    globalBoard[cellID] = player;
    document.getElementById(cellID).innerText = player;
    document.getElementById(cellID).removeEventListener("click", playerTurn);
    let winState = winCheck(globalBoard, player);
    if(winState){
      gameOver(winState);
    }
  }

  function winCheck(board, player){
    //The collection of player's moves
    let combination = [];
    for(let i = 0; i < board.length; i++){
      if(board[i] === player){
        combination.push(i);
      }
    }
    //Run through the winCombination and check if all elements are present via Array.prototype.every() function
    for(let j = 0; j < winCombination.length; j++){
      if(winCombination[j].every(function(comb){
        return combination.indexOf(comb) != -1;
      })){
        return {winnerComb: winCombination[j], player: player}
      }
    }
    return false;
  }

  function gameOver({winnerComb, player}){
    //Get the winner's combination and the winner as arguments then display
    let color;
    player == human ? color = "red" : color = "blue";
    Array.prototype.forEach.call(winnerComb, function(e){ document.getElementById(e).style.backgroundColor = color })
    //Remove the listener to make unclickable
    Array.prototype.forEach.call(boxClass, function(e){
      e.removeEventListener("click", playerTurn);
    });
  }

  function emptyCells(){
    let tempBoard = [];
    let i = 0;
    //If the type of the cell is still a number (no player move in that cell), collect it as empty cells
    while(i < globalBoard.length){
      if(typeof globalBoard[i] === "number"){
        tempBoard.push(globalBoard[i])
      }
      i++;
    }
    return tempBoard;

    //Higher order function implementation
    //return globalBoard.filter(function(s){return typeof s === "number"});
  }

  
  function tieCheck(){
    if(emptyCells().length == 0){
      Array.prototype.forEach.call(boxClass, function(e){ e.style.backgroundColor = "green"});
      return true;
    }
    return false;
  }

  function enemyMove(){
    let rand = emptyCells()[Math.floor(Math.random() * emptyCells().length)];
    return rand;
  }
}