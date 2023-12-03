import './App.css';
import React, {useState} from 'react';
import EightBall from './EightBall';
import answers from './answers';

function newAnswer(){
  const randIdx = Math.floor(Math.random() * answers.length)
  return answers[randIdx]
}
function reset(){
  return {msg: "Think of a Question", color: "black"}
}

function App() {
  const [ans, changeAns] = useState({msg: "Think of a Question", color: "black"})
  return (
    <div className="App">
      <EightBall ans={ans}/>
      <button className='App-button' onClick={() => {changeAns(newAnswer)}}>Shake</button>
      <button className='App-button' onClick={() => {changeAns(reset)}}>Reset</button>
    </div>
    
  );
}

export default App;
