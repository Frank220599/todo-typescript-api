import {AllowNull, Column, HasMany, Model, Table} from "sequelize-typescript";
import Todo from "./Todo";

@Table({timestamps: true, paranoid: true})
class User extends Model<User> {
    @AllowNull(false)
    @Column
    public email: string;

    @AllowNull(false)
    @Column
    public firstName: string;

    @AllowNull(false)
    @Column
    public password: string;

    @HasMany(() => Todo)
    todos: Todo[]

}


export default User;