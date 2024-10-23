import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send('Invalid password');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string);
  return res.send(token);
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
