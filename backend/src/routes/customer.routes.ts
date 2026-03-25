import { Express, Router } from 'express';

export const customerRoutes = (app: Express) => {
    const bookRouter = Router();

    app.use('/book', bookRouter);
}