const express = require('express')

const app = express()
const itemRoutes = require('./itemRoutes')

app.use('/items', itemRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message
    })
})

module.exports = app