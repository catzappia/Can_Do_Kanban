import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  } else {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET as string, {}, (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        return res.status(403).send('Forbidden');
      }
      req.user = decoded as JwtPayload;
      return next();
    });
  }
  return; // Ensure all code paths return a value
};
