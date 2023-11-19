const express = require('express');
const slugify = require('slugify')
const router = new express.Router();

const db = require('../db');
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try{
        const result = await db.query(
            "SELECT code, name FROM companies"
        )
        return res.json({companies: result.rows})
    } catch (err) {
        return next(err)
    }
})

router.get('/:code', async (req, res, next) => {
    // const code = req.params
    console.log(req.params.code)
    try{
        const result = await db.query(
            `SELECT code, name, description FROM companies WHERE code = $1`, 
            [req.params.code]
        );
        console.log(result)
        if (result.rows.length === 0){
            throw new ExpressError(`No company found with code ${code}`, 404)
        };
        return res.json({company: result.rows[0]});
    } catch (err) {
        return next(err)
    }
})
router.post('/', async (req, res, next) => {
    const {code, name, description} = req.body
    const slugCode = slugify(code, {remove: /[*+~.()'"!:@]/g, lower: true})
    try{
        const result = await db.query(
            `INSERT INTO companies(code, name, description)
            VALUES $1, $2, $3
            RETURNING code, name, description`,
            [slugCode, name, description]
        )
        return res.json({company: results.rows[0]})
    } catch (err) {
        return next(err)
    }
})
router.put('/:code', async (req, res, next) => {
    const code = req.params
    const {name, description} = req.body
    try{
        const result = await db.query(
            `UPDATE companies SET name=$1, description=$2 
            WHERE code = $3
            RETURNING code, name, description`,
            [name, description, code]
        )
        if (result.rows.length === 0){
            throw new ExpressError(`No company found with code ${code}`, 404)
        }
        return res.json({company: results.rows[0]})
    } catch (err) {
        return next(err)
    }
})
router.delete('/:code', async (req, res, next) => {
    const code = req.params
    try{
        const result = await db.query(
            `DELETE FROM companies
            WHERE code = $1`,
            [code]
        )
        if (result.rows.length === 0){
            throw new ExpressError(`No company found with code ${code}`, 404)
        }
        return res.json({status: "deleted"})
    } catch (err) {
        return next(err)
    }
})

module.exports = router;