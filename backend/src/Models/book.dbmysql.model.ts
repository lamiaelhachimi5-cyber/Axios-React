import { pool } from '../db/db.connection';
import { Book } from './book.model';

export const getAllBooksFromDb = async (): Promise<Book[]> => {
    try {
        const connection = await pool.getConnection();
        const [books] = await connection.query('SELECT * FROM books');
        connection.release();
        return books as Book[];
    } catch (error) {
        console.error('Errore nel recupero dei libri:', error);
        throw error;
    }
};

export const getBookByIdFromDb = async (id: number): Promise<Book | undefined> => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);
        connection.release();
        const books = rows as Book[];
        return books[0];
    } catch (error) {
        console.error('Errore nel recupero del libro:', error);
        throw error;
    }
};

export const addBookToDb = async (book: Book): Promise<string> => {
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO books (id, title, author) VALUES (?, ?, ?)',
            [book.id, book.title, book.author]);
        connection.release();
        return 'Libro aggiunto con successo al database';
    } catch (error) {
        console.error('Errore nell\'aggiunta del libro:', error);
        throw error;
    }
};
