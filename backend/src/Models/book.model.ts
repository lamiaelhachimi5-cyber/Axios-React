export interface Book {
    id: number;
    title: string;
    author: string;
}

let books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },

];

export const getAllBooks = (): Book[] => {
    return books;
};

export const getBookById = (id: number): Book | undefined => {
    return books.find(book => book.id === id);
};

export const addBook = (book: Book): string => {
    if (books.find(b => b.id === book.id)) {
        return `Un libro con l'id ${book.id} esiste già.`;
    }
    books.push(book);
    return `Il libro è stato aggiunto con successo`;
};