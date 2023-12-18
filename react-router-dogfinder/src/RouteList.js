import React from 'react'
import DogDetails from './DogDetails';
import DogList from './DogList';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Redirect } from 'react-router';
const RouteList = ({dogList}) => {
    return (
        <Routes>
            <Route exact path="/dogs/:name" element={<DogDetails dogs={dogList}/>} />
            <Route exact path="/dogs" element={<DogList list={dogList}/>} />
            <Route path="/" element={<Navigate to="/dogs" />} />
        </Routes>
    );
}

export default RouteList