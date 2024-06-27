
import { pgTable, serial, text, varchar,integer, primaryKey } from "drizzle-orm/pg-core";
import { number } from "zod";

// Book table
export const BooksTable = pgTable("books", {
    id: serial("id").primaryKey(),
    title: text("title"),
    author: text("author"),
    publicationYear: varchar("publication_year"),
});

// Types
export type TIBook = typeof BooksTable.$inferInsert;
export type TSBook = typeof BooksTable.$inferSelect;
