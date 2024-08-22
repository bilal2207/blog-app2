const Post = require('../models/Post');
const CustomError = require('../errors/customError');

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'name');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) {
      throw new CustomError('Post not found', 404);
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the logged-in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      throw new CustomError('Unauthorized', 401);
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
