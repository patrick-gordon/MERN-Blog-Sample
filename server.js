const express = require('express');
const mongoose = require('mongoose');
const posts = require('./Routes/api/posts');
const config = require('config')

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    app.use('/api/posts', require('./Routes/api/posts'));
    app.use('/api/users', require('./Routes/api/users'));
    app.use('/api/auth', require('./Routes/api/auth'));


    const port = process.env.PORT || 4444;

    app.listen(port, () => console.log(`Server running on port ${port}`));