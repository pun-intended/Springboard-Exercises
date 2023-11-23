const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const Message = require('../models/message')
const jwt = require('jsonwebtoken') // not needed?

const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth')

const {SECRET_KEY} = require(`../config`)
/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

// NOTE: I feel I should be using ensureCorrectUser, but that requires the 
// username to be in req.params, which they are not

router.get('/:id', async (req, res, next) => {
    try{
        if(req.user){
            const msg = await Message.get(req.params.id)
            if (req.user == msg.from_user || req.user == msg.to_user){
                return msg
            } else {
                return next(new ExpressError("Invalid permissions", 401))
            }
        } else{
            return next(new ExpressError("Must be logged in to view message", 400))
        }
    } catch (e) {
        return next(e)
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/', ensureLoggedIn, async (req, res, next) => {
    try{
        const msg = Message.create(
            req.body.id, 
            req.user, 
            req.body.to_username, 
            req.body.body,
            Date.now()
        )
        return res.json({message: msg})
    } catch (e) {
        return next(e)
    }
})




/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post('/:id', async (req, res, next) => {
    if(!req.user){
        return next(new ExpressError("Invalid permissions", 401))
    }
    try {
        const msg = await Message.get(req.params.id)
        if (req.user == msg.to_user.username){
            const resp = await Message.markRead(msg.id)
            return res.json({message: resp})
        }
    } catch (e) {
        return next(e)
    }
    // get token
        // error if not valid
    // mark as read with current timestamp
})
