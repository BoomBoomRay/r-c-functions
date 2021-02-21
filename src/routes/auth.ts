import { Request, Response, Router } from 'express';
import { validate } from 'class-validator';
import { User } from '../entity/User';

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
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();

router.post('/register', register);

export default router;
