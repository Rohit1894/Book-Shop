const express = require('express');
const bookRoutes = require('./routes/book.routes');
const loggerMiddleware = require('./middlewares/logger.middleware');


const app = express();
const port = 8000;

// Json body parser middleware
app.use(express.json());

// Logger middleware
// app.use(loggerMiddleware);

// Book routes
app.use('/books', bookRoutes);

//Default route
app.get('/' , (req , res) => {
    res.send('Welcome to the Bookstore API');
});


// Start the server


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);          
});