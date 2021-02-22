import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();
import authRoutes from './routes/auth';

import trim from './middleware/trim';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(trim);
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (_, res) => {
  res.send('hello bro!');
});

app.listen(5000, async () => {
  console.log('Server running at http://localhost:5000');
  try {
    await createConnection();
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
  }
});
