import jsonwebtoken from 'jsonwebtoken';
const JWT = jsonwebtoken;

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1];
  try {
    await JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: 401,
          message: 'Invalid Token',
        });
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(401).send({
      status: 401,
      message: 'Invalid Token',
    });
  }
};

export { verifyToken };
