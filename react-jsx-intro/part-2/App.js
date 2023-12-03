const tweetArray = [
    {
    username: "finneganFree",
    name: "James",
    date: "Sept 21st",
    msg: "Works"
    },
    {
    username: "test1",
    name: "testie Testerson",
    date: "oct 31st",
    msg: "test msg"
    },
    {
    username: "testofalongusername",
    name: "short",
    date: "10/10/2020 ",
    msg: "Works"
    }
]

const App = ({tweets}) => {
    return(
    <div>
        {tweets.map(t => {
            return <Tweet username={t.username} name={t.name} date={t.date} msg={t.msg} />
        })}
    </div>
    )
}


ReactDOM.render(<App tweets={tweetArray}/>, document.getElementById("root"))