import express, { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { createToken } from './token.utils';

export const loginRouter: Router = express.Router()
    .get(
        '/login',
        expressAsyncHandler(async (req: Request, res: Response) => {
            const name = req.query.name as string;

            // ...
            // login success
            // ..

            const token = createToken(name);

            res.send({ token });
        }),
    );
