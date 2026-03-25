import { z } from 'zod';

export type Author = {
    id: number;
    name: string;
    booksNumber: number;
    birthDate?: Date;
};

export type AuthorCreate = {
    name: string;
    booksNumber: number;
    birthDate?: Date;
};

export const AuthorCreateSchema = z.object({
    name: z.coerce.string(),
    booksNumber: z.coerce.number()
    //birthDate: z.coerce.date().optional()
});


const authors: Author[] = [];

export const getAuthors = () => authors;

export const addAuthor = (author: AuthorCreate) => {
    const newAuthor = {
        ...author,
        id: nextAuthorId()
    };
    authors.push(newAuthor);
    return newAuthor;
};

export const nextAuthorId = () => {
    const currentMax = Math.max(...authors.map((a) => a.id)) > -Infinity ? Math
        .max(...authors.map((a) => a.id)) : 0;
    return currentMax + 1;
};