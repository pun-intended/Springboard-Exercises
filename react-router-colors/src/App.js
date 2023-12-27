import './App.css';
import RouteList from './RouteList';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteList />
      </BrowserRouter>
    </div>
  );
}



export default App;
// link to add color
// form to add color
// State to track colors {name, rgb}
// page for color