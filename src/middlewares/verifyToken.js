import jsonwebtoken from 'jsonwebtoken';
const JWT = jsonwebtoken;

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  try {
    const jt = await JWT.verify(token, process.env.JWT_SECRET);
    if (jt) {
      next();
    } else {
      res.status(400).send({
        status: 400,
        message: 'Invalid Token',
      });
    }
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

export { verifyToken };
