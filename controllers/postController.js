const BlogPost = require('../models/BlogPost');

// Trang chủ
exports.index = async (req, res) => {
    const keyword = req.query.search || "";
    const type = req.query.type || "";
    const tag = req.query.tag || "";

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    let query = {};

    if (tag) {
        query.tags = tag;
    }

    if (keyword) {
        if (type === 'title') {
            query.title = { $regex: keyword, $options: 'i' };
        } else if (type === 'body') {
            query.body = { $regex: keyword, $options: 'i' };
        } else {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { body: { $regex: keyword, $options: 'i' } }
            ];
        }
    }

    const total = await BlogPost.countDocuments(query);

    const posts = await BlogPost.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.render('index', {
        posts,
        keyword,
        type,
        tag,
        currentPage: page,
        totalPages
    });
};

// Trang tạo
exports.create = (req, res) => {
    res.render('create');
};

// Lưu bài viết
exports.store = async (req, res) => {
    const { title, body, tags } = req.body;

    // 🔥 chặn rỗng
    if (!title || title.trim() === "" || !body || body.trim() === "") {
        return res.redirect('/blogposts/new');
    }

    const tagList = tags
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];

    await BlogPost.create({
        title: title.trim(),
        body: body.trim(),
        tags: tagList
    });

    res.redirect('/');
};
// Chi tiết
exports.show = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
};

// Trang sửa
exports.edit = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
};

// Cập nhật
exports.update = async (req, res) => {
    const tags = req.body.tags.split(',').map(tag => tag.trim());

    await BlogPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        tags: tags
    });

    res.redirect('/');
};

// Xóa
exports.delete = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
};