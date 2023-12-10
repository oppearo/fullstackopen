const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password === undefined) {
    logger.error('no password given');
    return response.status(400).json({ error: 'no password given' });
  }

  if (password.length < 3) {
    logger.error('password too short');
    return response.status(400).json({ error: 'password too short' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    logger.error('error caught when POST');
    if (error.name === 'ValidationError') {
      logger.error('ValidationError, returning 400');
      response.status(400).json({ error: 'no username given' });
    }
  }
});

module.exports = usersRouter;