import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { request, Request, response, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';

import trim from './middleware/trim';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(trim);
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/routes', postRoutes);
app.use('/api/routes', subRoutes);

app.get('/', (_, res) => {
  res.send('hello bro!');
});

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port: ${process.env.PORT}`);
  try {
    await createConnection();
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
  }
});
