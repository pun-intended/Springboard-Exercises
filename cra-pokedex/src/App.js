import logo from './logo.svg';
import './App.css';
import Pokecard from "./Pokecard.js"
import Pokedex from './Pokedex';

function App() {
  return (
    <div className="App">
      <h2 className='App-header'>Pokedex</h2>
        {Pokedex.map(mon => {
          return(
        <Pokecard mon={mon} />
         )
        } )}
    </div>
  );
}

export default App;
