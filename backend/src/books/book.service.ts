import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBook, TSBook, BooksTable } from "../drizzle/schema";

// Fetch multiple books with an optional limit
export const booksService = async (limit?: number): Promise<TSBook[] | null> => {
    if (limit) {
        return await db.query.BooksTable.findMany({
            limit: limit
        });
    }
    return await db.query.BooksTable.findMany();
}

// Fetch a single book by ID
export const getBookService = async (id: number): Promise<TSBook | undefined> => {
    return await db.query.BooksTable.findFirst({
        where: eq(BooksTable.id, id)
    });
}

// Create a new book
export const createBookService = async (book: TIBook) => {
    await db.insert(BooksTable).values(book);
    return "Book created successfully";
}

// Update an existing book by ID
export const updateBookService = async (id: number, book: TIBook) => {
    await db.update(BooksTable).set(book).where(eq(BooksTable.id, id));
    return "Book updated successfully";
}

// Delete a book by ID
export const deleteBookService = async (id: number) => {
    await db.delete(BooksTable).where(eq(BooksTable.id, id));
    return "Book deleted successfully";
}
