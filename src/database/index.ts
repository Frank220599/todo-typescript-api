import {Sequelize} from "sequelize-typescript";
// @ts-ignore
import config from './config'

const options = config[process.env.NODE_ENV];

const sequelize = new Sequelize({
    ...options,
    models: [__dirname + '/models/*.ts'],
});


export default sequelize
