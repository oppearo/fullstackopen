const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');
const initialBlogs = require('./unitTestBlogList');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('BlogsAPI tests', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('identifier field of blogs is correctly named', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('a blog is added to the database with the correct title', async () => {
    const newBlog = {
      title: '25 years on, my first win. PS. Buy the darts celebrating the win here',
      author: 'Raymond van Barneveld',
      url: 'www.pdc.tv',
      likes: 25
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfterAdding = await api.get('/api/blogs');

    const titles = blogsAfterAdding.body.map(blog => blog.title);

    expect(blogsAfterAdding.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});