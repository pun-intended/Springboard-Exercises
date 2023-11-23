process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

describe("Books routes test", () => {
    beforeEach(async () => {
        //set up database for testing
        const bookResult = await Book.create({
            isbn: "0691161518",
            amazon_url: "http://a.co/eobPtX2",
            author: "Matthew Lane",
            language: "english",
            pages: 264,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            year: 2017
        })
    })

    afterEach( async () => {
        await db.query("DELETE FROM books")
    })

    describe("POST /books/", () => {
        test("Can create new book", async () => {
            // Create object to pass to route
            const bookData = {
                isbn: "0691161519",
                amazon_url: "http://a.co/eobPty2",
                author: "test",
                language: "French",
                pages: 900,
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post("/books/").send(bookData) 
            expect(resp.statusCode).toBe(201)
            console.log(resp.body)
            expect(resp.body).toEqual(bookData)

        })
        
        test("Invalid data types are rejected and logged", async () => {
            // Create object with invalid types
            const invalidBookData = {
                isbn: 2691161519,
                amazon_url: "asdfnwe;lkkgn;skl",
                author: true,
                language: "French",
                pages: '900',
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post("/books").send(invalidBookData) 
            expect(resp.statusCode).toBe(400)
            console.log(resp)
            // pass to post books
            // expect status code to be 400
            // expect message to contain # strings

        })

        test("Objects missing required fields are rejected and logged", async () => {
            // Create object with isbn missing
            const bookData = {
                amazon_url: "http://a.co/eobPty2",
                author: "test",
                language: "French",
                pages: 900,
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post("/books").send(bookData) 
            expect(resp.statusCode).toBe(400)
            // pass  to post /books
            // expect status code to be 400
            // expect message to contain error message
        })
    })

    describe("PUT /books/isbn", () => {
        test("Can change details of book", async () => {
            // Create object to pass to route
            const updateIsbn = bookResult.isbn
            const bookData = {
                isbn: "0691161518",
                amazon_url: "http://a.co/eobPty2",
                author: "test",
                language: "English",
                pages: 900,
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post(`/books/${updateIsbn}`).send(bookData) 
            expect(resp.statusCode).toBe(200)
            expect(resp.body).toEqual(bookData)
            // pass to route
            // expect status code to be 200
            // expect response to equal book object
        })
        test("Invalid data types are rejected and logged", async () => {
            // Create object with invalid types
            const updateIsbn = bookResult.isbn
            const invalidBookData = {
                isbn: 2691161519,
                amazon_url: "asdfnwe;lkkgn;skl",
                author: true,
                language: "French",
                pages: '900',
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post(`/books/${updateIsbn}`).send(invalidBookData) 
            expect(resp.statusCode).toBe(400)
            // pass to post books
            // expect status code to be 400
            // expect message to contain # strings

        })

        test("Objects missing required fields are rejected and logged", async () => {
            // Create object with isbn missing
            const updateIsbn = bookResult.isbn
            const bookData = {
                amazon_url: "http://a.co/eobPty2",
                author: "test",
                language: "English",
                pages: 900,
                publisher: "Oxford University Press",
                title: "The test book title",
                year: 2020
                }
            const resp = await request(app).post(`/books/${updateIsbn}`).send(bookData) 
            expect(resp.statusCode).toBe(400)
            // pass  to post /books
            // expect status code to be 400
            // expect message to contain error message
        })
    })
})
