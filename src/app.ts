import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import {useContainer} from "routing-controllers";
import {Container} from "typedi";
import debug from "debug";
import logger from "morgan";
import compression from "compression";


useContainer(Container);
const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('tiny'));
app.get('/', (req, res) => {
   res.send('Hello World!')
});
debug('http');

export default app




