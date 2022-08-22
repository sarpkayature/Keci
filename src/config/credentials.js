import dotenv from 'dotenv';

dotenv.config();

const mongoUri = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?${process.env.DB_CLUSTER_CONFIG}`;
const port = process.env.PORT || 8080;

export { mongoUri, port };
