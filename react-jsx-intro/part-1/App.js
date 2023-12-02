const App = () => {
    return(<div>
        <FirstComponent />
        <NamedComponent name="Tom" />
    </div>)
    
}

ReactDOM.render(<App/>, document.getElementById("root"));