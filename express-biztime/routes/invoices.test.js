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

    testCompany = comResult.rows[0];
    testInvoice = invResult.rows[0];
})

afterEach(async () => {
    await db.query('DELETE FROM companies')
    await db.query('DELETE FROM invoices')
})

afterAll(async () => {
    await db.end()
})

describe('GET /invoices', function (){
    test('gets a list of all invoices', async () => {

        const invResult = await db.query(`
        SELECT id, comp_code
        FROM invoices`)
        
        const response = await request(app).get('/invoices')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            invoices: invResult.rows
        })
    })
})

describe('GET /invoices/id', function (){
    test('Gets invoice to match id parameter', async () => {
        const id = testInvoice.id
        const invResult = await db.query(
            `SELECT id, amt, paid, add_date, paid_date 
            FROM invoices
            WHERE id = $1`,
            [id]
        )
        const invoice = invResult.rows[0]
        const comResult = await db.query(
            `SELECT c.code, c.name, c.description 
            FROM companies AS c, invoices AS i
            WHERE i.id = $1`,
            [id]
        )

        invoice.company = comResult.rows[0]

        const response = await request(app).get(`/invoices/${id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({invoice: invoice})
        // TODO: response and expected type for add_date not matching
    })
})

describe('POST /invoices', function (){
    test('adds invoice to db', async () => {
        const invoice = {comp_code: 'apple', amt: 500}

        const response  = await request(app)
        .post('/invoices')
        .send(invoice)

        // TODO: How to test this route?

        expect(response.statusCode).toBe(201)
    })
})

describe('PUT /invoices/id', function (){
    test('Updates invoice in db', async () => {
        const id = testInvoice.id

        const newInfo = {
            amt: 100,
            paid: true
        }

        const response = await request(app)
        .put(`/invoices/${id}`)
        .send(newInfo)

        expect(response.statusCode).toBe(200)
        expect(response.body.invoice.paid).toEqual(newInfo.paid)
        expect(response.body.invoice.amt).toEqual(newInfo.amt)

    })
})

describe('DELETE /invoices/id', function (){
    test('Removes invoice from DB', async () => {
        const id = testInvoice.id;

        const response = await request(app)
            .delete(`/invoices/${id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({status: "deleted"})
    })
})

describe('GET /invoices/companies/code', function (){
    test('returns all invoice numbers for given company', async () => {
        const code = testCompany.code

        const response = await request(app)
            .get(`/invoices/companies/${code}`)

        const expectation = {company: 
            {code: code, 
            name: testCompany.name, 
            description: testCompany.description,
            invoices: [
                testInvoice.id
            ]}}

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expectation)

    })
})