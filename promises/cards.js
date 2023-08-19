

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

const DECK = get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.then(res => {
    console.log(res["deck_id"])
    return res["deck_id"]
})
.catch(err => console.log(err))