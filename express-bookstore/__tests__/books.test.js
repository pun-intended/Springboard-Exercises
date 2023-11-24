process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");


beforeEach(async () => {
    //set up database for testing
    const bookResult = await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
    })
    testBook = bookResult
})

afterEach( async () => {
    await db.query("DELETE FROM books")
})

afterAll(async () => {
    await db.end()
})

describe("POST /books/", () => {
    test("Can create new book", async () => {
        // Create object to pass to route
        const bookData = {
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPty2",
            "author": "test",
            "language": "French",
            "pages": 900,
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).post("/books/").send(bookData) 
        expect(resp.statusCode).toBe(201)
        console.log(resp.body)
        expect(resp.body).toEqual({book: bookData})

    })
    
    test("Invalid data types are rejected and logged", async () => {
        // Create object with invalid types
        const invalidBookData = {
            "isbn": 2691161519,
            "amazon_url": "asdfnwe;lkkgn;skl",
            "author": true,
            "language": "French",
            "pages": '900',
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).post("/books").send(invalidBookData) 
        expect(resp.statusCode).toBe(400)

    })

    test("Objects missing required fields are rejected and logged", async () => {
        // Create object with isbn missing
        const bookData = {
            "amazon_url": "http://a.co/eobPty2",
            "author": "test",
            "language": "French",
            "pages": 900,
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).post("/books").send(bookData) 
        expect(resp.statusCode).toBe(400)
    })
})

describe("PUT /books/isbn", () => {
    test("Can change details of book", async () => {
        // Create object to pass to route
        const updateIsbn = testBook.isbn
        const bookData = {
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPty2",
            "author": "test",
            "language": "English",
            "pages": 900,
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).put(`/books/${updateIsbn}`).send(bookData) 
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({book: bookData})
    })
    test("Invalid data types are rejected and logged", async () => {
        // Create object with invalid types
        const updateIsbn = testBook.isbn
        const invalidBookData = {
            "isbn": 2691161519,
            "amazon_url": "asdfnwe;lkkgn;skl",
            "author": true,
            "language": "French",
            "pages": '900',
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).put(`/books/${updateIsbn}`).send(invalidBookData) 
        expect(resp.statusCode).toBe(400)

    })

    test("Objects missing required fields are rejected and logged", async () => {
        // Create object with isbn missing
        const updateIsbn = testBook.isbn
        const bookData = {
            "amazon_url": "http://a.co/eobPty2",
            "author": "test",
            "language": "English",
            "pages": 900,
            "publisher": "Oxford University Press",
            "title": "The test book title",
            "year": 2020
            }
        const resp = await request(app).put(`/books/${updateIsbn}`).send(bookData) 
        expect(resp.statusCode).toBe(400)
    })
})

