import { Request, Response, NextFunction } from 'express';
import { getPosts } from './post.service';

export const index = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('++++++++++', request.headers.authorization);
  if (request.headers.authorization !== 'SECRET') {
    // next(xxx) 将异常信息交由中间件处理
    // 这里的return只是为了测试终止，不然经过中间件后续代码继续执行
    return next(new Error());
  }
  const posts = getPosts();
  response.send({ data: posts });
};
