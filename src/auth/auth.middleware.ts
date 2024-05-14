import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import * as userService from '../user/user.service';
import bcrypt from 'bcrypt';

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

  // 执行下一步
  next();
};
