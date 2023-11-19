const express = require('express')
const items = require('./fakeDb')
const router = new express.Router()

class ExpressError extends Error {
    constructor(msg, status){
        super();
        this.message = msg;
        this.status = status;
        console.error(this.stack);
    }
}

// Get items
//return all items from db items
router.get('/', (res, req) => {
    return res.json(items);
})

// Post items
router.post('/', (res, req) => {
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.status(201).json({item: newItem})
})

// Get items/:name
router.patch('/', (req, res) => {
	const patchItem = items.find(i => i.name == req.params.name)
    if (patchItem === undefined){
        throw new ExpressError(`Item ${req.params.name} not found`)
    }
    res.json({item: patchItem})
})

// Patch items/:name
router.patch('/:name', (res, req) => {
    const patchItem = items.find(i => i.name == req.params.name)
    if (patchItem === undefined){
        throw new ExpressError(`Item ${req.params.name} not found`)
    }
    patchItem.name = req.params.name
    res.json({updated: patchItem})
})

// Delete items/:name
router.delete('/:name', (res, req) => {
    const idx = items.findIndex(i => i.name == req.params.name)
    items.splice(idx, 1)
    return res.json({message: `Item ${req.params.name} - deleted`})
})

module.exports = router