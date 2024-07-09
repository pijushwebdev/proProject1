import jwt, { JwtPayload } from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';

export const createToken = (jwtPayload: TJwtPayload, secretKey: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, secretKey, { expiresIn });
}

export const verifyToken = (token: string, secretKey: string) => {
    return jwt.verify(token, secretKey) as JwtPayload;
}

