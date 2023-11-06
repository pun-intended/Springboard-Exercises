import "fakeDb"


const express = require('express')

const app = express()

app.use(express.json())

function logger(req, res, next){
    console.log(`Recieved request ${req.method} to path ${req.path}`)
    return next();
}

app.use(logger)

app.get("/items", function (req, res){
    return res.send(fakeDb.items)
})

app.post("/items", function(req, res){
    const item = {
        name: req.body.name,
        price: req.body.price
    }
    fakeDb.push(item)
})

app.get('/items/:name', function(req, res){
    item = fakeDb.items.find(itm => {
        return itm.name == req.params.name})
    return res.send(item)
})

app.patch('/items/:name', function(req, res){
    
})

app.delete('/items/:name', function(req, res){})

app.listen(3000, function(){
    console.log("App on port 3000");
})





