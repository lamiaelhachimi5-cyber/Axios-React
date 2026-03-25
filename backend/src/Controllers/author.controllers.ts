import { Request, Response } from "express";
import { addAuthor, getAuthors } from "../Models/Author.model";
import { AuthorCreateSchema } from "../Models/Author.model";



export const getAuthorsController = (req: Request, res: Response) => {
    res.status(200).json(getAuthors());
};



export const AddAuthorsController = (req: Request, res: Response) => {

    const parsedBody = AuthorCreateSchema.safeParse(req.body);

    if (parsedBody.success === false) {
        res.status(400).statusMessage = 'Bad parameters';
        res.json(parsedBody.error.flatten());
        return;
    }
    const authorInfo = parsedBody.data
    const newAuthor = addAuthor(authorInfo);
    res.status(201).json(newAuthor);
};