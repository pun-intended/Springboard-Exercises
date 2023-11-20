const express = require("express");
const router = new express.Router()
const db = require("../db")
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try{
        const result = await db.query(
            `SELECT id, comp_code FROM invoices`
        )
        return res.json({invoices: result.rows})
    } catch (err) {
        return next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try{
        const invResult = await db.query(
            `SELECT id, amt, paid, add_date, paid_date 
            FROM invoices
            WHERE id = $1`,
            [id]
        )
        if (invResult.rows.length === 0){
            return next(new ExpressError(`No invoice found with id ${id}`, 404))
        }
        const invoice = invResult.rows[0]
        const comResult = await db.query(
            `SELECT c.code, c.name, c.description 
            FROM companies AS c, invoices AS i
            WHERE i.id = $1`,
            [id]
        )
        invoice.company = comResult.rows[0]
        return res.json({invoice: invoice})
    } catch (err) {
        return next(err)
    }
})

router.post('/', async (req, res, next) => {
    const {comp_code, amt} = req.body
    try{
        const result = await db.query(
            `INSERT INTO invoices(comp_code, amt) 
            VALUES ($1, $2)
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [comp_code, amt]
        )
        return res.status(201).json({invoice: result.rows[0]})
    } catch (err) {
        return next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const {amt, paid} = req.body
    const id = req.params.id

    try{
        const invoice = await db.query(
            `SELECT id, paid, paid_date
            FROM invoices
            WHERE id = $1`,
            [id]
        )
        if(invoice.rows.length === 0){
            return next(new ExpressError(`No invoice found with id ${id}`, 404))
        }
        let paid_date = new Date().toJSON().slice(0, 10)
        if(paid && !invoice.rows[0].paid){
            paid_date = new Date().toJSON().slice(0, 10)
        } else if(!paid && invoice.rows[0].paid){
            paid_date = null
        } else {
            paid_date = invoice.rows[0].paid_date
        }

        try{
            const result = await db.query(
                `UPDATE invoices SET amt=$1, paid_date=$2, paid=$3
                WHERE id = $4
                RETURNING id, comp_code, amt, paid, add_date, paid_date`,
                [amt, paid_date, paid, id]
            )
            
            return res.json({invoice: result.rows[0]})
        } catch (err) {
            return next(err)
        }
    } catch (err){
        return next(err)
    }
    
    
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try{
        const result = await db.query(
            `DELETE FROM invoices
            WHERE id = $1
            RETURNING id`,
            [id]
        )
        if (result.rows.length === 0){
            return next(new ExpressError(`No invoice found with id ${id}`, 404))
        }
        return res.json({status: "deleted"})
    } catch (err) {
        return next(err)
    }
})

router.get('/companies/:code', async (req, res, next) => {
    const code = req.params.code
    try{
        // Fetch company, throw error if not found
        const comResult = await db.query(
            `SELECT code, name, description FROM companies
            WHERE code = $1`,
            [code]
        )
        if (comResult.rows.length === 0){
            throw new ExpressError(`No company found with code ${code}`, 404)
        }
        const company = {company: comResult.rows[0]}

        // Fetch invoices for company
        const invResult = await db.query(
            `SELECT id 
            FROM invoices
            WHERE comp_code = $1`,
            [company.company.code]
        )
        
        // add array of invoice IDs to company
        if (invResult.rows.length > 0){
            invoiceIds = invResult.rows.map(r => {return r.id})
            company.company.invoices = invoiceIds
        }
        return res.json(company)

    } catch (err) {
        return next(err)
    }
})

module.exports = router;