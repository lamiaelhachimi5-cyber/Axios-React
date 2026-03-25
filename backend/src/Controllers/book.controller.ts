import { Request, Response } from 'express';

import { addBookToDb, getAllBooksFromDb, getBookByIdFromDb } from '../Models/book.dbmysql.model';

export const getBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await getAllBooksFromDb();
        console.log('Libri recuperati dal database:', allBooks);
        res.json(allBooks);
    } catch (error) {
        console.error('Errore nel recupero dei libri:', error);
        res.status(500).json({ message: 'Errore nel recupero dei libri', error: String(error) });
    }
}

export const getBook = async (req: Request, res: Response) => {
    try {
        const bookId = Number(req.params.id);
        const book = await getBookByIdFromDb(bookId);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Libro non trovato' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero del libro' });
    }
}

export const addNewBook = async (req: Request, res: Response) => {
    const { id, title, author } = req.body;
    try {
        if (!id || !title || !author) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }
        const result = await addBookToDb({ id, title, author });
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiunta del libro' });
    }
}