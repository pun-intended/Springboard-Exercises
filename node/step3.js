const fs = require('fs')
const axios = require('axios')

async function webCat(url, out){
    resp = await axios.get(url)
    handleOutput(resp.data, out)
}

function cat(path, out){
    fs.readFile(path, "utf8", (err, data) => {
    if(err){
        console.log("Error: ", err)}
    handleOutput(path, data)
})}

function handleOutput(data, filename){
    if (filename){
        fs.appendFile(filename, data, "utf8", (err) => {
            if (err){
                console.log("Error: ", err)
            }
            console.log("Writing successful")
        })
        console.log(`Writing to file ${filename}`)
    }
    else{
        console.log(data)
    }
}


let filename;
let path;

if (process.argv[2] === '--out'){
    filename = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if(path.slice(0, 4) === "http"){
    webCat(path, filename)
} else{
    cat(path, filename)
}

// If then statements to filter through file types
// slice string to check for URL