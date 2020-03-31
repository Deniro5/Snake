import React, {useState, useEffect} from 'react';
import GameInfo from './GameInfo';
import Intro from './Intro';

const Board = () => {

  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState([])
  const [direction, setDirection] = useState("right");
  const [start, setStart] = useState(false)
  const [inter, setInter] = useState(null)
  const [food, setFood] = useState([])

  window.onkeydown = (e) => {
   if (e.keyCode === 37 && direction !== "left" && direction !== "right") {       // left arrow
      setInter(null);
      clearTimeout(inter);
      setDirection("left")
   }
   else if (e.keyCode === 38 && direction !== "up" && direction !== "down") {     // up arrow
      setInter(null);
      clearTimeout(inter);
      setDirection("up")
    }
   else if (e.keyCode === 39 && direction !== "right" && direction !== "left") {       // right arrow
      setInter(null);
      clearTimeout(inter);
      setDirection("right")
   }
   else if (e.keyCode === 40 && direction !== "up" && direction !== "down") {     // down arrow
      setInter(null);
      clearTimeout(inter);
      setDirection("down")
  }
  }

  useEffect (() => {
    if (start && inter === null) {
      let speed = 500 - (8*score);  
      if (speed < 100) {
        speed = 50;    // maximum speed
      }
      const inter = setTimeout(move, speed)
      setInter(inter);
    }
  }, [snake, start])

  useEffect (() => {
    if (start && inter === null) {
       move();    //want to move as soon as user wants to
    }
  }, [direction])

  useEffect(() => {
    if (start) {
      if (snake[0][1] < 0 || snake[0][1] > 29 || snake[0][0] < 0 || snake[0][0] > 29) {  //user hits wall
        alert("Game Over")
        setStart(false);
      }
      else {
        let count = 1;
        while (count < snake.length) {
          if (snake[0][0] === snake[count][0] && snake[0][1] === snake[count][1]) {  //user hits itself 
            alert("Game Over")
            setStart(false);
          }
          count++;
        }
      }
      
  }
  }, [snake])

  const move = () => {
    let oldSnake = [...snake]
    const oldx = oldSnake[0][0]
    const oldy = oldSnake[0][1]
    if (direction === "up") {
      oldSnake.unshift([oldx, oldy - 1])
    }
    else if (direction === "down") {
      oldSnake.unshift([oldx, oldy + 1])
    }
    else if (direction === "left") {
      oldSnake.unshift([oldx - 1, oldy])
    }
    else if (direction === "right") {
      oldSnake.unshift([oldx + 1, oldy])
    } 
    if (oldSnake[0][0] === food[0] && oldSnake[0][1] === food[1]) { // user got a point
      const colIndex = Math.floor(Math.random() * 29); 
      const rowIndex = Math.floor(Math.random() * 29);  
      setScore(score + 1);
      setFood([rowIndex,colIndex])
    }   
    else {   //if the user didnt get a point, remove last piece of the snake
      oldSnake.pop();
    } 
    console.log(oldSnake)
    setInter(null);
    setSnake(oldSnake);
  }

  const startGame = () => {
    setFood ([15,7])
    setSnake([[10,10]])
    setStart(true);
    setScore(0)
  }

  if (!start) {
    return (
      <div className = "boardContainer">
        <Intro start = {() => {startGame()}}/>
        <GameInfo score = {score}/>
      </div>
      );
  }
  return (
    <div className = "boardContainer">
      <GameInfo score = {score}/>
      {snake.map((square) => (
        <div className = "snake" style = {{background: "white", top: square[1] * 10 + "px", left: square[0] * 10 + "px"}}/>
      ))}
      <div className = "point" style = {{background: "yellow", top: food[1] * 10 + "px", left: food[0] * 10 + "px"}} />
    </div>
    );
  }

export default Board;
