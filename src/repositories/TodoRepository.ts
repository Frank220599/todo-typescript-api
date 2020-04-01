import CrudRepository from "./base/CrudRepository";
import Todo from "../database/models/Todo";
import User from "../database/models/User";

export class TodoRepository extends CrudRepository<Todo> {

    public async getTodoWithUser(id: number) {
        return this.model.findByPk(id, {include: [User]});
    }

}