import jwt from "jsonwebtoken";
import User from "../database/models/User";


const isAuth =  async (req, res, next) => {
    try {
        const authHeader = await req.get('Authorization');
        if (!authHeader) {
            res.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        const token = authHeader.split(' ')[1];
        let decodedToken = await jwt.verify(token, 'secret');
        if (!decodedToken) {
            res.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        req.user = await User.findByPk(decodedToken.userId);
        next()
    } catch (e) {
        throw res.status(500).json({
            error: e.message
        })
    }
};

export default isAuth