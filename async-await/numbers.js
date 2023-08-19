
let $factList = $("#details")
let faveNumber = 4

let numberData = []

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


function createList(resultArray){
    for (result of resultArray){
        listItem = $("<li>").text(result["text"])
        console.log(result["text"])
        $factList.append(listItem)
    }
}

get(`http://numbersapi.com/${faveNumber}?json`)
.then(res => {
    numberData.push(res)
    return get(`http://numbersapi.com/${faveNumber}?json`)
    })
.then(res => {
    numberData.push(res)
    return get(`http://numbersapi.com/${faveNumber}?json`)
})
.then(res => {
    numberData.push(res)
    return get(`http://numbersapi.com/${faveNumber}?json`)
        })
.then(res => {
    numberData.push(res)
    createList(numberData)
})
.catch(err => console.log(err))

