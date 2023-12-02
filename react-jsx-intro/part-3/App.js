const ppl = [
    {name: "john",
    age: 17,
    hobbies: ["skiing", "polo", "antiquing"]},
    {name: "susanopolis",
    age: 38,
    hobbies: ["clubbing", "skydiving"]},
    {name: "Lucius",
    age: 84,
    hobbies: ["Sport racing", "roller skating", "Yelling at children"]}
]

const App = (props) => {
    return(<div>
        {props.people.map(p => {
            return <Person age={p.age} name={p.name} hobbies={p.hobbies}/>
        })}
    </div>)
}

ReactDOM.render(<App people={ppl}/>, document.getElementById("root"))