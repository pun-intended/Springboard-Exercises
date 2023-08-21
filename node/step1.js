const fs = require('fs')

let doc = process.argv[2]

function cat(file){
    fs.readFile(file, "utf8", (err, data) => {
    if(err){
        console.log("Error: ", err)}
    console.log(data)
})}

cat(doc)