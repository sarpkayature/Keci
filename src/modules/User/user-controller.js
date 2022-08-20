import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import UserRegister from './user-model.js';

const JWT = jsonwebtoken;

const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (email === '') {
    res.status(400).send({ message: 'Email is required' });
  }

  if (password === '') {
    res.status(400).send({ message: 'Password is required' });
  }

  if (email && password) {
    await UserRegister.findOne({ email }).then(checkedUser => {
      if (checkedUser) {
        res.status(400).send({ message: 'Email already exists' });
      } else {
        const newUser = new UserRegister({
          _id: uuidv4(),
          name,
          email: email.toLowerCase(),
          password,
          timestamp: new Date(),
        });
        newUser.save((err, user) => {
          if (err) {
            res
              .status(500)
              .send({ status: 500, message: 'Something went wrong' });
          } else {
            res.status(201).send({
              status: 201,
              message: 'User created successfully',
              user: user,
              accessToken: JWT.sign(
                { user: user },
                process.env.JWT_SECRET,
                {
                  algorithm: process.env.JWT_ALGORITHM,
                  expiresIn: '6h',
                }
              ),
            });
          }
        });
      }
    });
  }
};

export { createUser };
