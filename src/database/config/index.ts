const env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `.env.${env}`});

const options = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        database: process.env.DEV_DATABASE_NAME,
        host: process.env.DEV_DATABASE_HOST,
        port: process.env.DEV_DATABASE_PORT,
        username: process.env.DEV_DATABASE_USER,
        password: process.env.DEV_DATABASE_PASSWORD,
        dialect: 'mysql',
        logging: false
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        database: process.env.TEST_DATABASE_NAME,
        host: process.env.TEST_DATABASE_HOST,
        port: process.env.TEST_DATABASE_PORT,
        username: process.env.TEST_DATABASE_USER,
        password: process.env.TEST_DATABASE_PASSWORD,
        dialect: 'mysql',
        logging: false
    },
    production: {
        url: process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        dialect: 'mysql',
        logging: false
    },
};


module.exports = options;