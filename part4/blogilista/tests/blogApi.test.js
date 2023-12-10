const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./testHelper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

describe('BlogsAPI blogs test suite', () => {
  describe('getting existing blogs', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(helper.initialBlogs);
    });

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs');

      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('identifier field of blogs is correctly named', async () => {
      const response = await api.get('/api/blogs');

      expect(response.body[0].id).toBeDefined();
    });

  });
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  describe('a blog is added', () => {
    test('to the database successfully with the correct title', async () => {
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

      const blogsAfterAdding = await helper.blogsInDb();

      const titles = blogsAfterAdding.map(blog => blog.title);

      expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1);
      expect(titles).toContain(newBlog.title);
    });

    test('with no initial likes is successfully added and has zero likes', async () => {
      await Blog.deleteMany({});

      const newBlogWithoutLikes = {
        title: '25 years on, my first win. PS. Buy the darts celebrating the win here',
        author: 'Raymond van Barneveld',
        url: 'www.pdc.tv',
      };

      await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfterAdding = await helper.blogsInDb();

      const likes = blogsAfterAdding.map(blog => blog.likes);

      expect(blogsAfterAdding).toHaveLength(1); // only the one that we just added
      expect(likes).toContain(0);
    });

    test('without a title and is rejected with a 400 error code', async () => {
      const newBlogWithoutTitle = {
        author: 'Phil Taylor',
        url: 'www.pdc.tv',
        likes: 1
      };

      await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400);
    });

    test('without an url and is rejected with a 400 error code', async () => {
      const newBlogWithoutUrl = {
        title: '25 years on, my first win. PS. Buy the darts celebrating the win here',
        author: 'Raymond van Barneveld',
        likes: 25
      };

      await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400);
    });
  });

  describe('a blog is deleted', () => {
    test('successfully, 204 is returned', async () => {
      const blogsBeforeDelete = await helper.blogsInDb();
      const blogToBeDeleted = blogsBeforeDelete[0];

      await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .expect(204);

      const blogsAfterDelete = await helper.blogsInDb();

      expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1);

      const titles = blogsAfterDelete.map(b => b.title);

      expect(titles).not.toContain(blogToBeDeleted.title);
    });
  });

  describe('a blog is updated', () => {
    test('successfully, returns 200', async () => {
      const initialBlogs = await helper.blogsInDb();
      let blogToBeUpdated = initialBlogs[0];
      const initialLikes = blogToBeUpdated.likes; // 7
      const newLikes = initialLikes + 5; // 12

      blogToBeUpdated.title = 'Edited Title';
      blogToBeUpdated.author = 'The Editor';
      blogToBeUpdated.likes = newLikes;

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(blogToBeUpdated)
        .expect(200);

      const blogsAfterUpdate = await helper.blogsInDb();

      expect(blogsAfterUpdate).toHaveLength(initialBlogs.length); // no new items
      expect(blogsAfterUpdate[0].title).toContain('Edited Title');
      expect(blogsAfterUpdate[0].author).toContain('The Editor');

      const updatedLikes = blogsAfterUpdate.map(b => b.likes);
      expect(updatedLikes[0]).toBe(newLikes);
      expect(updatedLikes[0]).not.toBe(initialLikes);
    });

    test('unsuccessfully as title is missing, returns 400', async () => {
      const initialBlogs = await helper.blogsInDb();
      let blogToBeUpdated = initialBlogs[0];

      blogToBeUpdated.title = '';

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(blogToBeUpdated)
        .expect(400);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});