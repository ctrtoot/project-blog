const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

connectDB();

app.use('/', postRoutes);

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});