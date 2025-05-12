import Book from '../models/book.model.js';  

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        next({ message: error.message });
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        next({ message: error.message });
    }
};

export const createBook = async (req, res, next) => {
    try {
       
        const { name, price, categories, author } = req.body;
        const newBook = new Book({ name, price, categories, author });
        
        const savedBook = await newBook.save();

        res.status(201).json({ message: 'The book has been added successfully', book: savedBook });
    } catch (error) {
        next({ message: error.message });
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (updatedBook) {
            res.json({ message: 'The book has been updated successfully', book: updatedBook });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        next({ message: error.message });
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.json({ message: 'The book has been deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        next({ message: error.message });
    }
};
