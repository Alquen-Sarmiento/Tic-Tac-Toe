"use strict"
const player = "X";
const enemy = "O";
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
    Array.prototype.forEach.call(boxClass, function(e){ e.style.fontSize = (winHeight * 0.2) + "px"});
  }
  else{
    //Beware of the spelling of width
    document.getElementById("main").style.width = (winWidth * 0.8) + "px";
    document.getElementById("main").style.height = (winWidth * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, function(e){ e.style.fontSize = (winWidth * 0.2) + "px"});
  }


  function startGame(){
    //Run through all the cells and add a click event listener
    Array.prototype.forEach.call(boxClass, e => {
      e.addEventListener("click", clickEvent);
    });
  }
  
  function clickEvent(cell){
    document.getElementById(cell.target.id).innerText = "X";
    document.getElementById(cell.target.id).style.backgroundColor = "red";
    winCheck();
  }

  function winCheck(){
    let Xcombination = [];
    Array.prototype.forEach.call(boxClass, cell => {
      if(cell.innerText === "X"){
        Xcombination.push(cell.id);
      }
    });
    console.log(Xcombination);
  }


  startGame();

}