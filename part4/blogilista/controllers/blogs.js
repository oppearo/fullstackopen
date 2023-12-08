const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (error) { // not an elegant solution
    if (error.name === 'ValidationError') {
      response.status(400).end();
    }
  }
});

module.exports = blogsRouter;