import jwt from "jsonwebtoken";
import User from "../database/models/User";


const isAuth = async ({request, response}) => {
    try {
        const authHeader = await request.get('Authorization');
        if (!authHeader) {
            response.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        const token = authHeader.split(' ')[1];
        let decodedToken = await jwt.verify(token, 'secret') as { userId: number };
        if (!decodedToken) {
            response.statusCode = 401;
            throw new Error('Not authenticated!');
        }
        request.user = await User.findByPk(decodedToken.userId);
        return true;
    } catch (e) {
        response.json({
            error: e.message
        });
        return false;
    }
};

export default isAuth