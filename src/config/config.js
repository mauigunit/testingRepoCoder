import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    DEFAULT_LIMIT: process.env.DEFAULT_LIMIT,
    DEFAULT_PAGE: process.env.DEFAULT_PAGE,
    DEFAULT_SORT: process.env.DEFAULT_SORT,
    TYPE_RESULT: process.env.TYPE_RESULT,
    CONNECTION_DB: process.env.CONNECTION_DB,
    SECRET_SESSION: process.env.SECRET_SESSION,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    PRIVATE_KET_JWT: process.env.PRIVATE_KET_JWT,
    EXPIRED_SESSION: process.env.EXPIRED_SESSION
}