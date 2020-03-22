import {Body, JsonController, Post, Res} from "routing-controllers";
import {Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../database/models/User";
import {IsEmail, MinLength} from "class-validator";

class SingupValidation {

    @IsEmail()
    email: string;

    @MinLength(1)
    private firstName: string;

    @MinLength(6)
    password: string;
}

class LoginValidation {

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}


@JsonController('/auth')
class AuthController {

    @Post("/signup")
    public async signup(@Body() newUser: SingupValidation, @Res() res: Response): Promise<any> {
        try {
            const hashedPassword = await bcrypt.hash(newUser.password, 12);
            const user = await User.create({
                ...newUser,
                password: hashedPassword
            });
            return await res.status(201).json({
                user,
                msg: 'User created successfully!'
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }

    @Post('/login')
    public async login(@Body() userBody: LoginValidation, @Res() res: Response): Promise<any> {
        try {
            const user = await User.findOne({where: {email: userBody.email}});
            if (!user) {
                throw new Error('User not found!')
            }
            const isEqual = await bcrypt.compare(userBody.password, user.password);
            if (!isEqual) {
                throw new Error('Incorrect Login or password!')
            }
            const token = await jwt.sign({
                email: user.email,
                userId: user.id,
            }, 'secret', {expiresIn: '1h'});
            return await res.status(201).json({
                token,
                user,
            })
        } catch (e) {
            return res.json({
                error: e.message
            })
        }
    }
}

export default AuthController