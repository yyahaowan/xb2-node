import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import _ from 'lodash';

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { username, password } = request.body;

  try {
    // const user = await authService.login(username, password);
    response.send({ message: `欢迎回来 ${username}` });
  } catch (error) {
    next(error);
  }
};
