import { z } from 'zod';

// Define the book schema using Zod
export const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    publicationYear: z.number(),
});
