import Tea from "./Tea"
import Soda from "./Soda"
import Coffee from "./Coffee"
import Home from "./Home";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const VendingMachine = () => {
    return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/coffee" element={<Coffee />}>Coffee</Route>
          <Route path="/tea" element={<Tea />}>Tea</Route>
          <Route path="/soda" element={<Soda />}>Soda</Route>
          <Route path="/" element={<Home />}>Home</Route>
        </Routes>
        </BrowserRouter>
    </div>
    )
}

export default VendingMachine