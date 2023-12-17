import { Routes, Route } from 'react-router-dom';

import Tea from "./Tea"
import Soda from "./Soda"
import Coffee from "./Coffee"
import Home from "./Home";

const AllRoutes = () => {
    return (
        <Routes>
          <Route path="/coffee" element={<Coffee />}>Coffee</Route>
          <Route path="/tea" element={<Tea />}>Tea</Route>
          <Route path="/soda" element={<Soda />}>Soda</Route>
          <Route path="/" element={<Home />}>Home</Route>
        </Routes>
    )
}

export default AllRoutes