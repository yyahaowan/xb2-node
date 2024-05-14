import { Request, Response, NextFunction, response } from 'express';
// 非自定义的模块一般放上面点
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';

// 验证用户数据
export const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('验证用户登录数据');

  const { username, password } = req.body;

  // 验证必填数据
  if (!username) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  const user = await userService.getUser(username, { password: true });
  if (!user) {
    return next(new Error('USER_DOES_NOT_EXISTS'));
  }

  // 验证密码
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return next(new Error('PASSWORD_DOES_NOT_EXISTS'));
  }

  // 在请求主体里添加用户
  req.body.user = user;

  // 执行下一步
  next();
};

// 验证用户身份
export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('验证用户身份');

  try {
    const authorization = req.header('Authorization');

    // 这里的异常全部交给catch 统一去处理
    if (!authorization) throw new Error();

    // 提取 JWT 令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    // 验证令牌
    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

    // 在请求里面添加当前用户
    req.body.user = decoded as TokenPayload;

    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};
