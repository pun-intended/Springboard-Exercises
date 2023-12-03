const Person = ({age, name, hobbies}) => {
    return(<div>
        <p>learn more about this person</p>
        {age > 18 ? 
            <h3>please go vote!</h3> :
            <h3>You must be 18</h3>}
        {name.length > 8 ? 
            <p>{name.slice(0, 6)}...</p> :
            <p>{name}</p>}
        <ul>
            {hobbies.map(h => <li>{h}</li>)}
        </ul>
    </div>)
}