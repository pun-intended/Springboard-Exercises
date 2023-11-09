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
    return res.json({"Added": item})
})

app.get('/items/:name', function(req, res){
    item = fakeDb.items.find(itm => {
        return itm.name == req.params.name})
    return res.json(item)
})

app.patch('/items/:name', function(req, res){
    item = fakeDb.items.find(itm => {
        return itm.name == req.params.name})
    if (item){
        item.name = req.body.name
        item.price = req.body.price
    }
    return res.json({"updated": item})
})

app.delete('/items/:name', function(req, res){
    item = fakeDb.items.find(itm => {
        return itm.name == req.params.name})
    idx = fakeDb.items.indexOf(item)
    fakeDb.items.splice(idx, 1)
    return res.json({message: "Deleted"})
})

app.listen(3000, function(){
    console.log("App on port 3000");
})





