import {Request} from "express";
import {FindOptions} from "sequelize";

interface IRead<T> {
    findOne(options: FindOptions): Promise<T>;

    findByPk(id: string): Promise<T>;

    findAndCountAll(req: Request): Promise<T[]>
}

export default IRead