import { Hono } from "hono";
import { listBooks, getBook, createBook, updateBook, deleteBook } from "./book.controller";
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../validators";



export const bookRouter = new Hono();

// Get all books: /api/books
bookRouter.get("/books", listBooks);

// Get a single book by ID: /api/books/1
bookRouter.get("/books/:id", getBook);

// Create a new book: /api/books
bookRouter.post("/books", zValidator('json', bookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createBook);

// Update a book by ID: /api/books/1
bookRouter.put("/books/:id", updateBook);

// Delete a book by ID: /api/books/1
bookRouter.delete("/books/:id", deleteBook);
