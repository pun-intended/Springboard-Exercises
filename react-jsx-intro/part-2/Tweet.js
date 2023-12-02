const Tweet = (props) => {
    return(
    <div class="tweet">
        <h3>{props.username} - {props.name} ({props.date})</h3>
        <p>{props.msg}</p>
    </div>
    )
}