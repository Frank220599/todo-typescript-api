import {Delete, Get, JsonController, Param, Put, Res} from "routing-controllers";
import {Response} from "express";
import User from "../database/models/User";
import Todo from "../database/models/Todo";


@JsonController('/users')
class UserController {
    @Get("/")
    public async getUsers(@Res() res: Response): Promise<any> {
        try {
            const users = await User.findAll({attributes: {exclude: ['password']}});
            return await res.json({
                users,
                msg: "Users fetched successfully!"
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Get('/:id')
    public async getUser(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await User.findByPk(id, {include: [Todo], attributes: {exclude: ['password']}});
            if (!user) {
                throw new Error('User not found!');
            }
            return await res.json({
                user,
                msg: "Users fetched successfully!"
            });
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }


    @Put('/:id')
    public async updateUser(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found!')
            }
            return await res.json({
                user,
                msg: 'User fetched successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Delete('/:id')
    public async deleteUser(@Param("id") id: number, @Res() res: Response): Promise<any> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found!')
            }
            return await res.json({
                user: id,
                msg: 'User deleted successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

export default UserController