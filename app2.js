import express from 'express';
import userRoutes from './Routes/user.route.js'
import booksRoutes from './Routes/book.route.js'
import {addCurrentDate} from'./middleWeares/addDate.js'
import {printDate} from './middleWeares/printDate.js';
import {blockServer} from './middleWeares/blockServer.js';
import cors from 'cors';
import morgan from 'morgan';   
import { notFound ,errorHandler} from './middleWeares/errorHandling.js';
import { config } from 'dotenv'; 
import {connectDB} from './Config/db.js';

config(); 
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors())

app.use(morgan('dev'));

app.use(addCurrentDate)
app.use(printDate)
app.use(blockServer);

app.use('/users', userRoutes); 

app.use('/books', booksRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Our Site");
});
app.use(notFound)

app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
