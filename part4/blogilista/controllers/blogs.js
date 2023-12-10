const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const users = await User.find({});
  const randomUser = users[0]; // true random ;)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: randomUser._id
  });

  try {
    const savedBlog = await blog.save();
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id);
    await randomUser.save();
    response.status(201).json(savedBlog);
  } catch (error) { // not an elegant solution, mongoose returns 500 if missing fields
    logger.error('error caught when POST');
    if (error.name === 'ValidationError') {
      logger.error('ValidationError, returning 400');
      response.status(400).end();
    }
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  logger.info(`id to DELETE: ${request.params.id}`);
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    );
    response.json(updatedBlog);
  } catch (error) {
    logger.error(`error caught when PUT, id: ${request.params.id}`);
    if (error.name === 'ValidationError') {
      logger.error('ValidationError, returning 400');
      response.status(400).end();
    }
  }
});

module.exports = blogsRouter;