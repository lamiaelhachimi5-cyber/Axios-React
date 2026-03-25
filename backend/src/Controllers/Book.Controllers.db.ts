import { Request, Response } from 'express';
import { getAllBooks, getBookById } from '../Models/book.model';
import { addBookToDb } from '../Models/book.dbmysql.model';

export const getBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await getAllBooks();
        console.log('Libri recuperati dal database:', allBooks);
        res.json(allBooks);
    } catch (error) {
        console.error('Errore durante il recupero dei libri:', error);
        res.status(500).json({ message: 'Errore durante il recupero dei libri', error: String(error) });
    }
};

export const getBook = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    const book = await getBookById(bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Libro non trovato' });
    }
};


