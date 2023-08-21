const fs = require('fs')
const axios = require('axios')

let url = process.argv[2]

async function webCat(url){
    resp = await axios.get(url)
    console.log(resp.data)
}

function cat(file){
    fs.readFile(file, "utf8", (err, data) => {
    if(err){
        console.log("Error: ", err)}
    console.log(data)
})}

if(path.slice(0, 4) === "http"){
    webCat(path)
} else{
    cat(path)
}