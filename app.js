import express from 'express';
import fs from 'fs/promises'; // השימוש ב-fs/promises
const app = express();
let id = 5;

app.use(express.json());

const readBooksFromFile = async () => {
    const data = await fs.readFile('books.json', 'utf-8');
    return JSON.parse(data);
};

const writeBooksToFile = async (books) => {
    await fs.writeFile('books.json', JSON.stringify(books, null, 2));
};

app.get("/", (req, res) => {
    res.send("Welcome To Our Site");
});

app.get("/books", async (req, res) => {
    const booksArr = await readBooksFromFile();
    res.send(booksArr);
});

app.get("/books/:id", async (req, res) => {
    const booksArr = await readBooksFromFile();
    const bookCode = parseInt(req.params.id);
    const book = booksArr.find(b => b.code === bookCode);

    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

app.post("/books", async (req, res) => {
    const booksArr = await readBooksFromFile();
    let book = { code: ++id, name: req.body.name, price: req.body.price };
    booksArr.push(book);
    await writeBooksToFile(booksArr);
    res.json({ message: "The book has been added successfully", book: book });
});

app.put("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;

    const booksArr = await readBooksFromFile();
    const bookIndex = booksArr.findIndex(b => b.code === bookId);

    if (bookIndex !== -1) {
        booksArr[bookIndex] = { ...booksArr[bookIndex], ...updatedBook };
        await writeBooksToFile(booksArr);
        res.json({ message: "The book has been updated successfully", book: booksArr[bookIndex] });
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

app.delete("/books/:id", async (req, res) => {
    const bookCode = parseInt(req.params.id);
    const booksArr = await readBooksFromFile();

    const bookIndex = booksArr.findIndex(b => b.code === bookCode);

    if (bookIndex !== -1) {
        const bookFilter = booksArr.filter(b => b.code !== bookCode);
        await writeBooksToFile(bookFilter);
        res.send("The book has been dropped successfully");
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

app.listen(5003, () => {
    console.log("Server is running on port 5003");
});
