const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.index);
router.get('/blogposts/new', postController.create);
router.post('/blogposts/store', postController.store);
router.get('/blogposts/:id', postController.show);
router.get('/blogposts/:id/edit', postController.edit);
router.post('/blogposts/:id/update', postController.update);
router.post('/blogposts/:id/delete', postController.delete);

module.exports = router;