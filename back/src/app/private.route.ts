import express, { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ensureTokenIsValid } from './token.utils';

export const privateRouter: Router = express.Router()
    .get(
        '/private',
        expressAsyncHandler(async (req: Request, res: Response) => {
            try {
                const token = req.headers.authorization?.split(' ')[1];
                ensureTokenIsValid(token);

                //
                // ensure the user for this token is valid and has the necessary permissions
                //

                res.send({ data: 'super secret data' });
            } catch (error) {
                res.send({ data: 'not have access' });
            }
        }),
    );
