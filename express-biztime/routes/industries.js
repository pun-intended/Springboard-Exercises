const express = require('express');
const slugify = require('slugify')
const router = new express.Router();

const db = require('../db');
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try{
        const results = await db.query(
            `SELECT code, industry
            FROM industries`
        )
        return res.json({industries: results.rows})
    } catch (err) {
        return next(err)
    }
})

router.push('/', async (req, res, next) => {
    const {code, industry} = req.body;
    try{
        const result = await db.query(
            `INSERT INTO industries
            VALUES $1, $2
            RETURNING code, industry`,
            [code, industry]
        )
        res.json({industry: result.rows[0]})
    } catch(err){
        return next(err);
    }
})

router.push('/:code', async (req, res, next) => {
    const ind_code = req.params.code;
    const {comp_code} = request.body;
    try{
        const result = await db.query(
            `INSERT INTO company_industry
            VALUES $1, $2
            RETURNING comp_code, ind_code`,
            [comp_code, ind_code]
        )
        res.json({company_industry: result.rows[0]})
    } catch(err){
        return next(err);
    }
})


module.exports = router;