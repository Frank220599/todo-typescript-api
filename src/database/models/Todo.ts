import {Model, Table, Column, AllowNull, Default, BelongsTo, ForeignKey} from "sequelize-typescript";
import User from "./User";

@Table({timestamps: true, paranoid: true})
class Todo extends Model<Todo> {
    @AllowNull(false)
    @Column
    title: string;

    @Default(false)
    @Column
    completed: boolean;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number;

    //use for include option
    @BelongsTo(() => User)
    user: User

}

export default Todo