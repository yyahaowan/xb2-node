import { Request, Response, NextFunction } from 'express';
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from './post.service';
import _ from 'lodash';

export const indexOne = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = request.params;
    const post = await getPost(postId);
    response.send(post);
  } catch (error) {
    // 异常则交给异常处理器处理
    next(error);
  }
};

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // if (request.headers.authorization === 'SECRET') {
  // next(xxx) 将异常信息交由中间件处理
  // 这里的return只是为了测试终止，不然经过中间件后续代码继续执行
  //   return next(new Error());
  // }
  try {
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    // 异常则交给异常处理器处理
    next(error);
  }
};

// 创建内容
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { title, content } = request.body;

  const { id: userId } = request.body.user;

  try {
    const data = await createPost({ title, content, userId });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

// 更新内容
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { postId } = request.params;
  // const { title, content } = request.body;
  // 用loadsh准备所需数据
  const post = _.pick(request.body, ['title', 'content']);

  try {
    const data = await updatePost(parseInt(postId, 10), post);
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

// 删除内容
export const deleteItem = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { postId } = request.params;
  try {
    const data = await deletePost(parseInt(postId, 10));
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
