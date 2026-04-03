const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,

    createdAt: {
        type: Date,
        default: Date.now
    },

    tags: [String]
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
