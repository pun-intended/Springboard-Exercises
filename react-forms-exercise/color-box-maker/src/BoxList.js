import "./BoxList.css"
import Box from "./Box.js"
import NewBoxForm from "./NewBoxForm.js"
import React, { useState } from "react"
import {v4 as uuid } from "uuid"



function BoxList(){
    const [boxes, setBoxes] = useState([]);
    function remove(id){
        const filteredBoxes = boxes.filter((box) =>{ return ( box.id !== id)})
        setBoxes([...filteredBoxes])
    }

    function addBox(box){
        const newBox = {
            width: box.width,
            height: box.height,
            color: box.color,
            id: uuid()
        }
        
        setBoxes([...boxes, newBox])
    }
    

    return(
        <div className="BoxList">    
            <NewBoxForm newBox={addBox}/>
            <div>
            {boxes.map(box => {
                console.log(box)
                return (
                    <Box 
                        width={box.width}
                        height={box.height}
                        color={box.color}
                        id={box.id}
                        key={box.id}
                        remove={remove}/>)
            })}
            </div>
        </div>
    )
}

export default BoxList