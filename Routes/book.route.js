import express from 'express';
import fs from 'fs'; 
const router = express.Router();

let id = 5;

router.use(express.json());

// שימוש ב- fs.promises לקריאת קובץ בצורה אסינכרונית עם async/await
const readBooksFromFile = async () => {
    try {
        const data = await fs.promises.readFile('books.json', 'utf-8');
        return JSON.parse(data); // המרת הנתונים מ-JSON למערך
    } catch (error) {
        console.error("Error reading file", error);
        throw error;
    }
};

const writeBooksToFile = async (books) => {
    try {
        await fs.promises.writeFile('books.json', JSON.stringify(books, null, 2));
    } catch (error) {
        console.error("Error writing to file", error);
        throw error;
    }
};

router.get("/", async (req, res) => {
    const booksArr = await readBooksFromFile();
    res.send(booksArr);
});

router.get("/:id", async (req, res) => {
    const booksArr = await readBooksFromFile();
    const bookCode = parseInt(req.params.id);
    const book = booksArr.find(b => b.code === bookCode);

    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: 'Book not found' });
    }
});

router.post("/", async (req, res) => {
    const booksArr = await readBooksFromFile();
    let book = { code: ++id, name: req.body.name, price: req.body.price };
    booksArr.push(book);
    await writeBooksToFile(booksArr);
    res.json({ message: "The book has been added successfully", book: book });
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;
