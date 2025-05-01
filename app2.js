import express from 'express';
import userRoutes from './Routes/user.route.js'
import booksRoutes from './Routes/book.route.js'

const app = express();

app.use(express.json()); 

app.use('/users', userRoutes); 

app.use('/books', booksRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Our Site");
});

app.listen(5003, () => {
    console.log('Server is running on port 5003');
});
