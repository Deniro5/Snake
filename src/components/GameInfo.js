import React from 'react';


const GameInfo = props => {

  return (
    <div className = "gameInfoContainer">
        <div className = "infoDiv">
          <p>Score</p>
          <p>{props.score}</p> 
        </div>
    </div>
    );
  }


export default GameInfo;
