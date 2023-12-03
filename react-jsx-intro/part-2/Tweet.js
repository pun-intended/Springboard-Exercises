const Tweet = ({username, name, date, msg}) => {
    return(
    <div class="tweet">
        <h3>{username} - {name} ({date})</h3>
        <p>{msg}</p>
    </div>
    )
}