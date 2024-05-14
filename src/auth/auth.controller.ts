import { Request, Response, NextFunction } from 'express';
import { signToken } from './auth.service';
import _ from 'lodash';

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // const { username, password } = request.body;

  const {
    user: { id, username },
  } = request.body;

  const payload = {
    id,
    username,
  };

  try {
    const token = signToken({ payload });

    response.send({ id, username, token });
  } catch (error) {
    next(error);
  }
};

// 验证登录
export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req['user']);

  res.sendStatus(200);
};
