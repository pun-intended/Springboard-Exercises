const URL = "https://deckofcardsapi.com/api/deck"
let $draw = $("#draw")
let $table = $("#table")

function get(url){
    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
        xhr.onload = function() {
            if (xhr.readyState !== 4) return;
        
            if (xhr.status >= 200 && xhr.status < 300){
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.status);
            }
        }

        xhr.onerror = function handleError(){
            console.log("Network error")
            request = null;
        }

        xhr.open("GET", url)
        xhr.send()
    })
}
let deckId;
let remaining;

get(`${URL}/new/shuffle/?deck_count=1`)
.then(res => {
    
    deckId = res["deck_id"]
    remaining = res["remaining"]
    console.log("done")
})

function drawCard(){
    let card;
    get(`${URL}/${deckId}/draw`)
    .then( res => {
        cardImage = res["cards"][0]["image"]
        remaining = res["remaining"]
        console.log(`${card}  -  ${remaining}`)
        card = `<img src="${cardImage}"></img>`
        $table.append(card)
    })
}

$draw.click(function(){
    if(remaining > 0){
        drawCard()
    }
});