import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import _ from 'lodash';

export const indexOne = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { username } = request.params;
  try {
    const user = await userService.getUser(username);
    response.send(user);
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
  try {
    const users = await userService.getUsers();
    response.send(users);
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
  const { username, password } = request.body;
  try {
    const data = await userService.createUser({ username, password });
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
  const { userId } = request.params;
  // const { title, content } = request.body;
  // 用loadsh准备所需数据
  const user = _.pick(request.body, ['username', 'password']);

  try {
    const data = await userService.updateUser(parseInt(userId, 10), user);
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
  const { userId } = request.params;
  try {
    const data = await userService.deleteUser(parseInt(userId, 10));
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
