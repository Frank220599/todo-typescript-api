import {Request, Response} from "express";
import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
} from "routing-controllers"

import Todo from "../database/models/Todo"
import User from "../database/models/User";
import {TodoValidator} from "../validators";
import {TodoRepository} from "../repositories/TodoRepository";


@JsonController("/todos")
class TodoController {

    todoRepository = new TodoRepository('Todo');

    @Get("/")
    public async getTodos(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.todoRepository.findAndCountAll(req);
            return await res.json({
                todos: data,
                msg: "Todos fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get("/:id")
    public async getTodo(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const todo = await this.todoRepository.getTodoWithUser(id);
            return await res.json({
                todo,
                msg: "Todos fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Post("/")
    public async createTodo(@CurrentUser() user: User, @Body() newTodo: TodoValidator, @Res() res: Response): Promise<any> {
        try {
            const todo = await this.todoRepository.create({
                ...newTodo,
                userId: user.id
            });
            return await res.status(201).json({
                todo,
                msg: 'Todo created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Put('/:id')
    public async updateTodo(@CurrentUser() user: User, @Param("id") id: number, @Body() newValues: TodoValidator,
                            @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const todo = await this.todoRepository.update(newValues, {where: {id, userId: user.id}});
            return await res.json({
                todo,
                msg: 'Todo updated successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Authorized()
    @Delete('/:id')
    public async deleteTodo(@CurrentUser() user: User, @Param("id") id: number, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const todo = await this.todoRepository.delete({where: {id, userId: user.id}});
            return await res.json({
                todo: id,
                msg: 'Todo deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

export default TodoController