const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const eventRoutes = require('./routes/event');
const { mongo, Mongoose } = require('mongoose');

// app
const app = express();

// mongo
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('DB connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `$(process.env.CLIENT_URL)` }));
}

//routes middleware
app.use(eventRoutes);

// routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() });
});

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});