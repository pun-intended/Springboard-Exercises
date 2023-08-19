
let $factList = $("#details")
let faveNumber = 4

async function createList(){
    resultArray = await getNumberInfo()
    for (result of resultArray){
        listItem = $("<li>").text(result.data.text)
        $factList.append(listItem)
    }
}


async function getNumberInfo(){
    let data = []
    d1 = axios.get(`http://numbersapi.com/${faveNumber}?json`)
    d2 = axios.get(`http://numbersapi.com/${faveNumber}?json`)
    d3 = axios.get(`http://numbersapi.com/${faveNumber}?json`)
    d4 = axios.get(`http://numbersapi.com/${faveNumber}?json`)
    for (dpromise of [d1, d2, d3, d4])
        data.push(await dpromise)
    return data
}

createList()


