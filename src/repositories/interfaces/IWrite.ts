import {FindOptions} from "sequelize";

interface IWrite <T> {
    create(values): Promise<T>;
    update(newValues, options: FindOptions): Promise<T>;
    delete(options: FindOptions): Promise<T>;
}

export default IWrite