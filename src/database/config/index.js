require('dotenv').config();
// mysql://root:22051999@localhost:3306/ts
module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        database: 'ts',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        logging: false
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        database: 'ts_test',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        logging: false
    },
    production: {
        url: process.env.DATABASE_URL,
        database: 'blog',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        dialect: 'mysql',
        logging: false
    },
};