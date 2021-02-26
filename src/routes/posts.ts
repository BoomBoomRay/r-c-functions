import { Router, Request, Response } from 'express';
import Comments from '../entity/Comment';
import Post from '../entity/Post';
import Sub from '../entity/Sub';
import auth from '../middleware/auth';

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === '') {
    return res.status(400).json({ title: 'Title must not be empty' });
  }

  try {
    const subRecord = await Sub.findOneOrFail({ name: sub });
    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: 'DESC' },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Something went wrong' });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneOrFail(
      {
        identifier,
        slug,
      },
      { relations: ['sub'] }
    );
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Post not found' });
  }
};

const commentOnPost = async (req: Request, res: Response) => {
  const { body } = req.body;
  const { identifier, slug } = req.params;
  const user = res.locals.user;

  try {
    const post = await Post.findOneOrFail({
      identifier,
      slug,
    });

    const comment = new Comments({ body, user, post });
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Something went wrong' });
  }
};
const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:identifier/:slug', getPost);
router.post('/:identifier/:slug/comments', auth, commentOnPost);

export default router;
