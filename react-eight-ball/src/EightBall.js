import React from "react"
import "./Eightball.css"

function EightBall({ans}){
    return (
        <div className="EightBall" style={{backgroundColor: ans.color}}>
            <p className="EightBall-answer">
                {ans.msg}
            </p>
        </div>
    );
}

export default EightBall