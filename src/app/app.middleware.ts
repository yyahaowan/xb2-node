import { Request, Response, NextFunction } from 'express';

// 输出请求里面的地址，在xxx.router.ts 中使用
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  // 中间件要执行这个函数，不然会卡在这里
  next();
};

// 默认异常处理器
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('😱😱😱😱', error.message);
  }

  let statusCode: number, message: string;
  // 处理异常
  switch (error.message) {
    default:
      statusCode = 500;
      message = '服务器暂时出了点问题 ~~ 😭';
      break;
  }

  response.status(statusCode).send({ message });
};
