import {Sequelize} from "sequelize-typescript";

const sequelize = new Sequelize({
    models: [__dirname + '/models/*.ts'],
    database: 'ts',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "mysql",
    logging: false
});


export default sequelize
