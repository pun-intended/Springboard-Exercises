const express = require("express");
const router = new express.Router()
const db = require("../db")
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
    const id = req.params
    try{
        const invResult = await db.query(
            `SELECT id, amt, paid, add_date, paid_date, company 
            FROM invoices
            WHERE id = $1`
            [id]
        )
        if (results.rows.length === 0){
            throw new ExpressError(`No invoice found with id ${id}`, 404)
        }
        const invoice = invResult.rows[0]
        const comResult = await db.query(
            `SELECT code, name, description 
            FROM companies 
            WHERE code = $1`
            [invoice.comp_code]
        )
        invoice.company = comResult.rows[0]
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
    const id = req.params
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
        inv = results.rows[0]
        return res.json({invoice: results.rows[0]})
    } catch (err) {
        return next(err)
    }
    
})

router.delete('/:id', async (req, res) => {
    const id = req.params
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
    const code = req.params
    try{
        // Fetch company, throw error if not found
        const comResult = await db.query(
            `SELECT code, name, description FROM companies
            WHERE code = $1`
            [code]
        )
        if (result.rows.length === 0){
            throw new ExpressError(`No company found with code ${code}`, 404)
        }
        const company = {company: comResult.rows[0]}

        // Fetch invoices for company
        const invResult = await db.query(
            `SELECT id 
            FROM invoices
            WHERE comp_code = $1`
            [company.code]
        )
        
        // add array of invoice IDs to company
        if (invResult.length > 0){
            invoiceIds = invResult.rows.map(r => r.id)
            company.invoices = inv
        }
        return res.json(company)

    } catch (err) {
        return next(err)
    }
})

modules.export = router;