import express from 'express';

import postRouter from '../post/post.router';
import userRouter from '../user/user.router';

import { defaultErrorHandler } from './app.middleware';

const app = express();

app.use(express.json());

app.use(userRouter, postRouter);

// 默认全局异常处理器
app.use(defaultErrorHandler);

export default app;
