const express = require("express");
const router = new express.Router()
const db = require("./db")
const ExpressError = require("../expressError");

router.get('/', async (req, res) => {
    try{
        const result = await db.query(
            `SELECT id, comp_code FROM invoices`
        )
        return res.json({invoice: results.rows})
    } catch (err) {
        return next(err)
    }
})
router.get('/:id', async (req, res) => {
    try{
        const result = await db.query(
            `SELECT id, amt, paid, add_date, paid_date, company 
            FROM invoices
            WHERE id = $1`
            [id]
        )
        if (results.rows.length === 0){
            throw new ExpressError(`No invoice found with id ${id}`, 404)
        }
        return res.json({invoice: results.rows[0]})
    } catch (err) {
        return next(err)
    }
})

router.post('/', async (req, res) => {
    const {comp_code, amt} = req.body
    try{
        const result = await db.query(
            `INSERT INTO invoices(comp_code, amt) 
            VALUES $1, $2
            RETURNING id, comp_code, amt, paid, add_date, paid_date`
            [comp_code, amt]
        )
        return res.json({invoice: results.rows[0]})
    } catch (err) {
        return next(err)
    }
})
router.put('/:id', async (req, res) => {
    const {comp_code, amt} = req.body
    try{
        const result = await db.query(
            `UPDATE invoices SET $1, $2 
            WHERE id = $3
            RETURNING id, comp_code, amt, paid, add_date, paid_date`
            [comp_code, amt, id]
        )
        if (results.rows.length === 0){
            throw new ExpressError(`No invoice found with id ${id}`, 404)
        }
        return res.json({invoice: results.rows[0]})
    } catch (err) {
        return next(err)
    }
    
})
router.delete('/:id', async (req, res) => {
    try{
        const result = await db.query(
            `DELETE FROM invoices
            WHERE id = $1`
            [id]
        )
        if (result.rows.length === 0){
            throw new ExpressError(`No invoice found with id ${id}`, 404)
        }
        return res.json({status: "deleted"})
    } catch (err) {
        return next(err)
    }
})
router.get('companies/:code', async (req, res) => {
    try{
        const result = await db.query(
            `SELECT code, name, description, invoices FROM company
            WHERE id = $1`
            [id]
        )
        if (result.rows.length === 0){
            throw new ExpressError(`No invoice found with id ${id}`, 404)
        }
        return res.json({status: "deleted"})
    } catch (err) {
        return next(err)
    }
})
