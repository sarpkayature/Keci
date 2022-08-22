import userRouter from '../modules/User/user-router.js';
import authRouter from '../modules/Auth/auth-router.js';

const privateRoutes = [userRouter];
const publicRoutes = [authRouter];

export { privateRoutes, publicRoutes };
