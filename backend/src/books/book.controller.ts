import { Context } from "hono";
import { booksService, getBookService, createBookService, updateBookService, deleteBookService } from "./book.service";

// List books with optional limit
export const listBooks = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await booksService(limit);
        if (data == null || data.length == 0) {
            return c.text("Books not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Get a single book by ID
export const getBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await getBookService(id);
    if (book == undefined) {
        return c.text("Book not found", 404);
    }
    return c.json(book, 200);
}

// Create a new book
export const createBook = async (c: Context) => {
    try {
        const book = await c.req.json();
        const createdBook = await createBookService(book);

        if (!createdBook) return c.text("Book not created", 404);
        return c.json({ msg: createdBook }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Update an existing book by ID
export const updateBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await c.req.json();
    try {
        // search for the book
        const searchedBook = await getBookService(id);
        if (searchedBook == undefined) return c.text("Book not found", 404);
        // get the data and update it
        const res = await updateBookService(id, book);
        // return a success message
        if (!res) return c.text("Book not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Delete a book by ID
export const deleteBook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // search for the book
        const book = await getBookService(id);
        if (book == undefined) return c.text("Book not found", 404);
        // deleting the book
        const res = await deleteBookService(id);
        if (!res) return c.text("Book not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
