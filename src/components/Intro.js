import React from 'react';

const Intro = props => {

  return (
    <div className="introContainer">
      <h2> Snake </h2>
      <p> How to Play: </p>
      <p style = {{fontSize:"12px", marginTop: "20px", lineHeight: "20px"}}> Move the snake with the arrow keys. Eat as much food as possible without colliding with the walls or yourself! </p>
      <button onClick = {props.start}> Start Game</button>
    </div>
  );
}


export default Intro;


