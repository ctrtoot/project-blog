const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
.then(() => console.log('Kết nối MongoDB thành công'))
.catch(err => console.log(err));

app.get('/', async (req, res) => {
    const keyword = req.query.search || "";

    const posts = await BlogPost.find({
        title: { $regex: keyword, $options: 'i' }
    }).sort({ _id: -1 });

    res.render('index', { posts });
});

app.get('/blogposts/new', (req, res) => {
    res.render('create');
});

app.post('/blogposts/store', async (req, res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

app.get('/blogposts/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
});

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});