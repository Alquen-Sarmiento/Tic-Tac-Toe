window.onload = function() {

  //Setting the size of the main box by globally adjusting if phone or desktop.
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  boxClass = document.getElementsByClassName("box");

  //If the window's width is larger, the main box should depend on the window's height to properly fit;
  if (winWidth >= winHeight){
    document.getElementById("main").style.width = (winHeight * 0.8) + "px"; 
    document.getElementById("main").style.height = (winHeight * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, e => e.style.fontSize = (winHeight * 0.2) + "px")
  }
  else{
    //Beware of the spelling of width
    document.getElementById("main").style.width = (winWidth * 0.8) + "px";
    document.getElementById("main").style.height = (winWidth * 0.8) + "px";
    Array.prototype.forEach.call(boxClass, e => e.style.fontSize = (winWidth * 0.2) + "px")
  }
}