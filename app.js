"use strict"
const human = "O";
const enemy = "X";
let firstMover;
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
    document.getElementById("sup").style.width = (winHeight * 0.3) + "px";
    document.getElementById("sup").style.height = (winHeight * 0.2) + "px";
    document.getElementById("sup").style.fontSize = (winHeight * 0.05) + "pt";
    document.getElementById("restart").style.width = (winHeight * 0.15) + "px";
    document.getElementById("restart").style.height = (winHeight * 0.08) + "px";
  }
  else{
    //Beware of the spelling of width
    document.getElementById("main").style.width = (winWidth * 0.8) + "px";
    document.getElementById("main").style.height = (winWidth * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, function(e){ e.style.fontSize = (winWidth * 0.11) + "px"});
    document.getElementById("sup").style.width = (winWidth * 0.3) + "px";
    document.getElementById("sup").style.height = (winWidth * 0.2) + "px";
    document.getElementById("sup").style.fontSize = (winWidth * 0.05) + "pt";
    document.getElementById("restart").style.width = (winWidth * 0.15) + "px";
    document.getElementById("restart").style.height = (winWidth * 0.08) + "px";
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
    //Reset the declaration of winners
    document.getElementById("sup").style.display = "none";
    //Reset the globalBoard to an array from 0-8
    globalBoard = Array.from(Array(9).keys());
    //Determine who to move first
    firstMove()
    gameCounter++;
  }
  
  function playerTurn(cell){
    //Called the turn function with the index of cell and the player
    turn(cell.target.id, human);
    if(!winCheck(globalBoard, human) && !tieCheck()){
      turn(enemyMove(), enemy);
    }
  }

  function randomMove(length){
    return Math.floor(Math.random() * length)
  }

  function firstMove(){
  //If gameCounter is odd, the enemy attack first
  if(gameCounter % 2 == 1){
    firstMover = enemy;
    //The first move is random to avoid long recursion (at minimax)
    turn(randomMove(globalBoard.length), enemy);
  }
  else{
    firstMover = human;
  }
}

  function turn(cellID, player){
    //Set the player's character to the globalBoard and set the main box according to the move
    globalBoard[cellID] = player;
    document.getElementById(cellID).innerText = player;
    document.getElementById(cellID).removeEventListener("click", playerTurn);
    //Get the state of winning or tie
    let winState = winCheck(globalBoard, player);
    let tieState = tieCheck();
    if(winState) gameOver(winState);
    else if(tieState) gameOver(tieState);
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
        return {toBeDisplay: winCombination[j], player: player, message: player + " wins"}
      }
    }
    return false;
  }

  function gameOver(state){
    //Get the winner's combination and the winner as arguments then display
    let color;
    //Human wins
    if(state.player == human){
      color = "red";
      document.getElementById("win").value++;
    }
    //Enemy wins
    else if(state.player == enemy){
      color = "blue";
      document.getElementById("loss").value++;
    }
    //Tie
    else{
      color = "green";
      document.getElementById("tie").value++;
    }
    Array.prototype.forEach.call(state.toBeDisplay, function(e){ document.getElementById(e).style.backgroundColor = color })
    //Remove the listener to make unclickable
    Array.prototype.forEach.call(boxClass, function(e){
      e.removeEventListener("click", playerTurn);
    });
    //Declare winners
    document.getElementById("sup").style.display = "block";
    document.getElementById("disp").innerText = state.message;
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
      return {toBeDisplay: Array.from(Array(9).keys()), player: undefined, message: "It's a tie"};
    }
    return false;
  }

  function enemyMove(){
    //Just a random mover enemy
    //return emptyCells()[Math.floor(Math.random() * emptyCells().length)];
    return minimax(globalBoard, enemy).index;
  }

  function minimax(newBoard, player){
    //Check for available spots
    let availableSpots = emptyCells();

    //Terminal State
    if(winCheck(newBoard, human)){
      return {score : -10};
    }
    else if(winCheck(newBoard, enemy)){
      return {score: 10};
    } 
    else if(tieCheck()){
      return {score : 0};
    }

    //Loop through all available spots 
    let moves = [];
    for(let i = 0; i < availableSpots.length; i++){
      let move = {};
      move.index = newBoard[availableSpots[i]];
      //Assign the spots to the player
      newBoard[availableSpots[i]] = player

      //If the mover is the enemy, the human should move after
      if(player == enemy){
        move.score = minimax(newBoard, human).score;
      }
      else if(player === human){
        move.score = minimax(newBoard, enemy).score;
      }
      //Return to the normal state without assigning
      newBoard[availableSpots[i]] = move.index
      //Collect the score and the index
      moves.push(move);
    }

    let bestMove;
    //If the player is enemy get the biggest score
    if(player == enemy){
      let bestScore = -Infinity;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    //If the player is human get the lowest score
    else if(player == human){
      let bestScore = Infinity;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
}