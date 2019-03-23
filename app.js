"use strict"
const player = "X";
const enemy = "O";
//Create an arrray that contains 0 to 8
let emptyCells = Array.from(Array(9).keys());
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8,],
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

  document.getElementById("restart").addEventListener("click", startGame)
  startGame();

  function startGame(){
    //Run through all the cells and add a click event listener
    Array.prototype.forEach.call(boxClass, function(e){
      e.addEventListener("click", turn);
      e.innerText = "";
      e.style.backgroundColor = "grey";
    });
    //Create an arrray that contains 0 to 8 again
    emptyCells = Array.from(Array(9).keys());
  }
  
  function turn(cell){
    document.getElementById(cell.target.id).innerText = player;
    document.getElementById(cell.target.id).removeEventListener("click", turn);
    emptyFunc(cell.target.id);
    winCheck(player);
    enemyMove();
    winCheck(enemy);
    console.log(emptyCells)
  }

  function winCheck(character){
    let combination = [];
    Array.prototype.forEach.call(boxClass, function(cell){
      if(cell.innerText === character){
        combination.push(cell.id);
      }
    });
    Array.prototype.forEach.call(winCombination, function(comb){
      let matches = 0;
      let winMatches;
      for(let i = 0; i < comb.length; i++){
        for(let j = 0; j < combination.length; j++){
          if(comb[i] == combination[j].toString()){
            matches++;
            winMatches = comb;
          }
        }
      }
      if(matches >= comb.length){
        gameOver(character, winMatches);
      }
    });
  }

  function tieCheck(){
    if(emptyCells.length <= 1){
      alert("TIE");
      return true;
    }
  }

  function emptyFunc(cell){
    let i = 0;
    while(i < emptyCells.length){
      if(emptyCells[i] == cell){
        break;
      }
      i++;
    }
    emptyCells.splice(i, 1);
  }
  
  function enemyMove(){
    if(!tieCheck()){
    let rand = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    emptyFunc(rand);
    document.getElementById(rand).innerText = enemy;
    document.getElementById(rand).removeEventListener("click", turn);
    }
  }
  

  function gameOver(player, winningCombination){
    let color;
    player === "X" ? color = "red" : color = "blue";
    Array.prototype.forEach.call(winningCombination, function(e){ document.getElementById(e).style.backgroundColor = color })
    Array.prototype.forEach.call(boxClass, function(e){
      e.removeEventListener("click", turn);
    });
  }
}