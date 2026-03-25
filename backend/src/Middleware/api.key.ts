import { NextFunction, Request, Response } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-api-key'] === '123456') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};