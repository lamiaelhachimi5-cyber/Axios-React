import express, { Router } from 'express';
import cors from 'cors';
import { getBooks, getBook, addNewBook } from './Controllers/book.controller';
import { testConnection } from './db/db.connection';
import dotenv from 'dotenv';
import { DbBookRoutes } from './routes/book.Db.routes';
import { AuthorRoutes } from './routes/Author.routes';



dotenv.config();


const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
    res.send('Benvenuto al server express!');
});

app.get('/Db', async (req, res) => {
    try {
        const connection = await testConnection();
        console.log('Database conection test:', connection);
        res.json({ message: 'Database connection is healthy!', connection });
    } catch (error) {
        console.error('Errore durante il test di connessione al database:', error);
        res.status(500).json({ message: 'Database connection test failed', error });
    }
});

DbBookRoutes(app);
AuthorRoutes(app);


const DbBookRouter = Router();
DbBookRouter.get('/all', getBooks);
DbBookRouter.get('/:id', getBook);
DbBookRouter.post('/add', addNewBook);


app.use('/book', DbBookRouter);

app.get('/book/all', getBooks);
app.get('/book/:id', getBook);
app.post('/book/add', addNewBook);




const PORT = parseInt(process.env.PORT ?? '3000');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});