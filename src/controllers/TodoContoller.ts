import {Response, Request} from "express";
import {Get, Res, Post, Body, JsonController, Put, Param, Delete, Authorized} from "routing-controllers"
import Todo from "../database/models/Todo"
import {MinLength} from "class-validator";
import User from "../database/models/User";

class TodoBody {
    @MinLength(6)
    title: String;
}

@JsonController("/todos")
class TodoController {
    @Get("/")
    public async getTodos(@Res() res: Response): Promise<any> {
        try {
            const todos = await Todo.findAll();
            return await res.json({
                todos,
                msg: "Posts fetched successfully!"
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
            const todo = await Todo.findByPk(id, {include: [User]});
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
    public async createTodo(@Body() newTodo: TodoBody, @Res() res: Response): Promise<any> {
        try {
            const todo = await Todo.create({
                ...newTodo
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

    @Put('/:id')
    public async updateTodo(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const todo = await Todo.findByPk(id);
            if (!todo) {
                throw new Error('Todo not found!')
            }
            return await res.json({
                todo,
                msg: 'Todo fetched successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Delete('/:id')
    public async deleteTodo(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const todo = await Todo.findByPk(id);
            if (!todo) {
                throw new Error('Todo not found!')
            }
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