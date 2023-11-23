const express = require('express')
const router = new express.Router()
const db = require('../db')
const ExpressError = require('../expressError')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = require(`../config`)

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
    const {username, password} = req.body
    let user;

    if(!username || !body){
        return next(new ExpressError("Must provide both username and password", 400))
    }
    try{
        if(await User.authenticate(username, password)){
            User.updateLoginTimestamp(username)
            const payload = {username: username}
            const token = jwt.sign(payload, SECRET_KEY)
        } else {
            return next( new ExpressError("Invalid username/password", 400))
        }

    } catch (e) {
        return next(e)
    }
    return res.json({token})
})



/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
    const { username, password, first_name, last_name, phone } = req.body
    let user;
    if (!username || !password || !first_name || !last_name || !phone){
        return next(new ExpressError(
            "Must provide username, password, first name, last name, and phone number", 400))
    }
    try{
        user = await User.register(username, password, first_name, last_name, phone)
        User.updateLoginTimestamp(username) //NOTE: Is this ok? no await as promise is not used
        const payload = {username: user.username}
        const token = jwt.sign(payload, SECRET_KEY)
    } catch(e) {
        return next(e)
    }
    return res.json({token});
})