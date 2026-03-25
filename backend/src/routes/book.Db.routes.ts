import { Router, Express } from 'express';
import { getBooks, getBook, addNewBook } from '../Controllers/book.controller';
import cors from 'cors';


export const DbBookRoutes = (app: Express) => {
    const DbBookRouter = Router();
    DbBookRouter.get('/all', getBooks);
    DbBookRouter.get('/:id', getBook);
    DbBookRouter.post('/add', addNewBook);

    app.use('/book', [cors()], DbBookRouter);

}