import { Express, Router } from "express";
import { AddAuthorsController, getAuthorsController } from "../Controllers/author.controllers";



export const AuthorRoutes = (app: Express) => {
    const AuthorRouter = Router();

    AuthorRouter.get('/', getAuthorsController);
    AuthorRouter.post('/add', AddAuthorsController);


    app.use('/author', AuthorRouter);
}