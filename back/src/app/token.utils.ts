/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';

export function createToken(name: string): string {
    return jwt.sign(
        {
            id: Math.random(),
            name,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '24h',
        },
    );
}

export function ensureTokenIsValid(token?: string): void {
    if (!token) {
        throw new Error('There is no token');
    }

    jwt.verify(token, process.env.JWT_SECRET!, { complete: true });
}
