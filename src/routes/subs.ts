import { isEmpty } from 'class-validator';
import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Sub from '../entity/Sub';
import User from '../entity/User';
import auth from '../middleware/auth';

const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = 'Name must not be empty';
    if (isEmpty(title)) errors.title = 'Title must not be empty';

    const sub = await getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = 'Sub exists already';

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();
    return res.json(sub);
  } catch (error) {
    return res.status(400).json({ error: 'There was an error' });
  }
};

const router = Router();

router.post('/sub', auth, createSub);

export default router;
