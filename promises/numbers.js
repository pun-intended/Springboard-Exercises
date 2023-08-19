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

get("http://numbersapi.com/3?json")
.then(res => {
    console.log(res)
    return get("http://numbersapi.com/3?json")
    })
.then(res => {
    console.log(res)
    return get("http://numbersapi.com/3?json")
})
.then(res => {
    console.log(res)
    return get("http://numbersapi.com/3?json")
        })
.then(res => {
    console.log(res)})
.catch(err => console.log(err))