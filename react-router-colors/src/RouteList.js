import React, { useState }from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Color from './Color';
import Colors from './Colors';
import NewColorForm from './NewColorForm';

function RouteList() {
    
    const INITIAL_STATE = [
        { 
      name: "red",
      rgb: "#ff0000"
    },
        { 
      name: "green",
      rgb: "#00ff00"
    },
        { 
      name: "blue",
      rgb: "#0000ff"
    },
]

    const addColor = (data) => {
        const newColor = {name: data.name, rgb: data.color}
        setColors([...colors, newColor])
    }

    const [colors, setColors] = useState(INITIAL_STATE)

    return (
        <Routes>
            <Route exact path="/colors/:color" element={<Color colors={colors}/>} />
            <Route exact path="/colors/new" element={<NewColorForm addColor={addColor}/>} />
            <Route exact path="/colors/*" element={<Navigate to="/colors" />} />
            <Route exact path="/colors" element={<Colors colorList={colors}/>} />
            <Route path="/" element={<Navigate to="/colors" />} />
        </Routes>
    );
}

export default RouteList