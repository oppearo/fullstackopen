const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./testHelper');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');

describe('BlogsAPI users test suite', () => {
  describe('getting existing users', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      await User.insertMany(helper.initialUsers);
    });

    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('all users are returned', async () => {
      const response = await api.get('/api/users');

      expect(response.body).toHaveLength(helper.initialUsers.length);
    });
  });

  describe('a user is added', () => {
    test('successfully, with return code 201 given', async () => {
      const newUser = {
        username: 'barney',
        name: 'Raymond van Barneveld',
        password: 'worldchamp123'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAfterAdding = await helper.usersInDb();

      expect(usersAfterAdding).toHaveLength(helper.initialUsers.length + 1);

      const users = usersAfterAdding.map(user => user.username);
      expect(users).toContain(newUser.username);

    });

    test('without a username and fails', async () => {
      const newUser = {
        name: 'Raymond van Barneveld',
        password: 'worldchamp123'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });

    test('without a password and fails', async () => {
      const newUser = {
        username: 'barney',
        name: 'Raymond van Barneveld',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });

    test('with a password too short and fails', async () => {
      const newUser = {
        username: 'barney',
        name: 'Raymond van Barneveld',
        password: '12'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});