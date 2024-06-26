import { pgTable, serial, text, integer, primaryKey } from "drizzle-orm/pg-core";

// Book table
export const BooksTable = pgTable("books", {
    id: serial("id").primaryKey(),
    title: text("title"),
    author: text("author"),
    publicationYear: integer("publication_year"),
});

// Types
export type TIBook = typeof BooksTable.$inferInsert;
export type TSBook = typeof BooksTable.$inferSelect;
