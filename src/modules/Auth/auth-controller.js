import UserRegister from '../User/user-model.js';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

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
            console.log(err);
            res
              .status(500)
              .send({ status: 500, message: 'Something went wrong' });
          } else {
            res.status(201).send({
              status: 201,
              message: 'User created successfully',
              payload: {
                user: user,
                credentials: {
                  tokenType: 'Bearer',
                  accessToken: JWT.sign(
                    { user: user },
                    process.env.JWT_SECRET,
                    {
                      algorithm: process.env.JWT_ALGORITHM,
                      expiresIn: '6h',
                    }
                  ),
                },
              },
            });
          }
        });
      }
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === '') {
    res.status(400).send({ message: 'Email is required' });
  }

  if (password === '') {
    res.status(400).send({ message: 'Password is required' });
  }

  if (email && password) {
    await UserRegister.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(400).send({ message: 'User not found' });
        } else {
          const compare = bcryptjs.compareSync(password, user.password);
          if (compare) {
            res.status(200).send({
              status: 200,
              message: 'User logged in successfully',
              payload: {
                user: user,
                credentials: {
                  tokenType: 'Bearer',
                  accessToken: JWT.sign(
                    { user: user },
                    process.env.JWT_SECRET,
                    {
                      algorithm: process.env.JWT_ALGORITHM,
                      expiresIn: '6h',
                    }
                  ),
                },
              },
            });
          } else {
            res.status(400).send({
              status: 400,
              message: 'Incorrect Password or Email',
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Something went wrong' });
      });
  }
};

export { createUser, loginUser };