import { Request, Response, Router } from 'express';
import { validate, isEmpty } from 'class-validator';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import bcrypt from 'bcrypt';

import User from '../entity/User';
import auth from '../middleware/auth';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((total: any, item: any) => {
    const key = item.property;
    const value = Object.values(item.constraints)[0];
    total[key] = value;
    return total;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const emailUser = await User.findOne({ email });
    const userName = await User.findOne({ username });

    let errors: any = {};

    if (emailUser) errors.email = 'Email is already taken';
    if (userName) errors.username = 'Username is already taken';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User({ email, username, password });

    errors = await validate(user);
    const errorObject = mapErrors(errors);
    if (errors.length > 0) {
      return res.status(400).json(errorObject);
    }

    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(username)) errors.username = 'Username must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ username });

    if (!user) res.status(404).json({ username: 'User not found' });

    const passwordMatches = await bcrypt.compare(password, user!.password);

    if (!passwordMatches) {
      return res.status(401).json({ password: 'Password is incorrect' });
    }
    const token = jwt.sign(username, process.env.JWT_SECRET!);

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const authorized = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const logout = async (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );
  return res.status(200).json({ message: 'Successfully logged out' });
};
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/authorized', auth, authorized);
router.get('/logout', auth, logout);

export default router;
