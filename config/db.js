const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
        console.log('Kết nối MongoDB thành công');
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;