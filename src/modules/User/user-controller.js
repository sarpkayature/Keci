import UserRegister from './user-model.js';

const getUser = async (req, res) => {
  const { userId } = req.params;
  await UserRegister.findById(userId)
    .then(user => {
      if (!user) {
        res.status(400).send({ status: 400, message: 'User not found' });
      } else {
        res.status(200).send({
          status: 200,
          message: 'User found',
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
          },
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: 500, message: 'Something went wrong' });
    });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await UserRegister.findByIdAndDelete(userId)
    .then(user => {
      if (!user) {
        res.status(400).send({ status: 400, message: 'User not found' });
      } else {
        res.status(200).send({
          status: 200,
          message: 'User deleted successfully',
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
          },
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: 500, message: 'Something went wrong' });
    });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  await UserRegister.findByIdAndUpdate(userId, {
    name,
    email,
    password,
  })
    .then(user => {
      if (!user) {
        res.status(400).send({ status: 400, message: 'User not found' });
      } else {
        res.status(200).send({
          status: 200,
          message: 'User updated successfully',
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            timestamp: user.timestamp,
          },
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: 500, message: 'Something went wrong' });
    });
};

export { deleteUser, getUser, updateUser };
