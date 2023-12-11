import "./Box.css"

function Box({width, height, color, id, remove}){
    
    function handleRemove(evt) {
        evt.preventDefault()
        remove(id)
    }

    const styles = {
        'width': `${width}em`,
        'height': `${height}em`,
        'backgroundColor': `${color}`
    }
    return (
        
        <div>
            {console.log(width, height, color, id)}
            <div className="Box" 
                style={styles}
                id={id}>
                <form className="BoxForm">
                    <button className="BoxButton" 
                        onClick={handleRemove}>X</button>
                </form >
            </div>
        </div>
    )
}

export default Box