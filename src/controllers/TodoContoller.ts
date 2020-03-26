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
    Redirect
} from "routing-controllers"

import Todo from "../database/models/Todo"
import User from "../database/models/User";
import {TodoValidator} from "../validators";


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
    public async createTodo(@CurrentUser() user: User, @Body() newTodo: TodoValidator, @Res() res: Response): Promise<any> {
        console.log(user);
        try {
            const todo = await user.$create('todo', {
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

    @Authorized()
    @Put('/:id')
    public async updateTodo(@CurrentUser() user: User, @Param("id") id: number, @Body() updatedTodo: TodoValidator, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const todo = await Todo.findOne({where: {id, userId: user.id}});
            if (!todo) {
                throw new Error('Todo not found!')
            }
            Object.keys(updatedTodo).map(key => {
                todo[key] = updatedTodo[key]
            });
            await todo.save();

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
            const todo = await Todo.findOne({where: {id, userId: user.id}});
            if (!todo) {
                throw new Error('Todo not found!')
            }
            await todo.destroy();
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