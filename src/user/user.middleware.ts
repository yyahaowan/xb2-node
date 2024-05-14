import { Request, Response, NextFunction } from 'express';
import * as UserService from './user.service';
import bcrypt from 'bcrypt';
// 验证用户数据
export const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;

  // 验证必填数据
  if (!username) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  const user = await UserService.getUser(username);

  if (user) {
    return next(new Error('USER_ALREADY_EXISTS'));
  }

  // 执行下一步
  next();
};

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 解析出密码，然后加密
  const { password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
  }
  next();
};
