require('dotenv').config();
import {useExpressServer} from "routing-controllers";
import isAuth from "./middlewares/isAuth";
import currentUserChecker from "./middlewares/currentUserChecker";
import db from "./database";
import app from "./app";

const server = useExpressServer(app, {
    authorizationChecker: async (action) => isAuth(action),
    currentUserChecker: (action) => currentUserChecker(action),
    cors: true,
    routePrefix: "/api/v1",
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: []
});

db.sync({force: false}).then(r => {
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        if (process.env.NODE_ENV !== 'test')
            console.log(`Server up and running on port ${port}`)
    })
});

export default server