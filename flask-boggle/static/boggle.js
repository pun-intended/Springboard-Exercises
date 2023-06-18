$guessInput = $("#guessInput");
$submitButton = $("#submitButton");
$timer = $("#timer")
$time = $("#time")
$score = $("#playerScore")

let time = 60
let score = 0

$submitButton.on("click", async (evt) => {
    evt.preventDefault();
        if (time > 0){
        guess = $guessInput.val()
        result = await validationRequest(guess);
        console.log(result.data['result'])
        if (result.data['result'] == 'ok'){
            time = 60
            score = result.data['score']
            $score.text(score)
        }
        $guessInput.val("")
    }
})

async function validationRequest(word){
    result = await axios({
        method: 'post',
        url: '/validate',
        data: {
            guess: word
        }
    })
    return result;
}

const timer = setInterval(() => {
    if (time > 0){
        time -= 1
        setTime(time);
    }
    else{
        $time.text(`Time Up`)
    }
}, 1000)

function setTime(num){
    num = num.toString();
    $time.text(`0:${num.padStart(2, '0')}`)
}
