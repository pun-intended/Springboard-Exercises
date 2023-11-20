// Set to test environment
process.env.NODE_ENV = 'test';

// Import supertest
const request = require('supertest');

const app = require('../app');
const db = require('../db')

beforeEach( async () => {
    // Create company
    const comResult = await db.query(
        `INSERT INTO companies (code, name, description)
        VALUES ('apple', 'Apple Computers', 'Makers of the iPhone')
        RETURNING code, name, description`
        )
    // Create invoice
    const invResult = await db.query(
        `INSERT INTO invoices(comp_code, amt) 
        VALUES ('apple', 700)
        RETURNING id, comp_code, amt, paid, add_date, paid_date`,
    )

    testCompany = comResult.rows;
    testInvoice = invResult.rows;
})

afterEach(async () => {
    await db.query('DELETE FROM companies')
    await db.query('DELETE FROM invoices')
})

afterAll(async () => {
    await db.end()
})

describe('GET /companies', function(){
    test('Gets a list of 1 company', async () => {
        const comResult = await db.query(
            `SELECT code, name
            FROM companies
            WHERE code = $1`,
            [testCompany[0].code]
            )

        response = await request(app).get('/companies')
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            companies: comResult.rows
        })
    })
})

describe('GET /companies/code', function(){
    test('Gets company with given code', async () => {
        const code = testCompany[0].code
        const response = await request(app).get(`/companies/${code}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({company: testCompany[0]})
    })
})

describe('POST /companies', function(){
    test('Adds company to db', async () => {
        const company = {
            code: 'test', 
            name: 'Test Company', 
            description: 'Company to test post request'
        }
        response  = await request(app)
            .post('/companies')
            .send(company)
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({company: company})
    })
})

describe('PUT /companies/code', function(){
    test('Updates data in db', async () => {
        const code = testCompany[0].code 
        const newInfo = {
            name: 'New Name',
            description: 'new Desciption'
        }
        response = await request(app)
            .put(`/companies/${code}`)
            .send(newInfo)
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            company: {
                code: code,
                name: newInfo.name,
                description: newInfo.description
            }
        })

    })
})

describe('DELETE /companies/code', function(){
    test('Deletes record from db', async () => {
        const code = testCompany[0].code 
        response = await request(app)
            .delete(`/companies/${code}`)

        secondResponse = await request(app)
        .delete(`/companies/${code}`)

        expect(response.statusCode).toBe(200)
        expect(secondResponse.statusCode).toBe(404)
        expect(response.body).toEqual({status: "deleted"})
    })
})