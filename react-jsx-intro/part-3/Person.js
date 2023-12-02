const Person = (props) => {
    return(<div>
        <p>learn more about this person</p>
        {props.age > 18 ? 
            <h3>please go vote!</h3> :
            <h3>You must be 18</h3>}
        {props.name.length > 8 ? 
            <p>{props.name.slice(0, 6)}...</p> :
            <p>{props.name}</p>}
        <ul>
            {props.hobbies.map(h => <li>{h}</li>)}
        </ul>
    </div>)
}