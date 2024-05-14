import jwt from 'jsonwebtoken';

import { PRIVATE_KEY } from '../app/app.config';
import { connection } from '../app/database/mysql';

// 签发信息
interface SignTokenOptions {
  payload?: any;
}

export const signToken = (options: SignTokenOptions) => {
  // 准备选项
  const { payload } = options;

  // 签发JWT
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

  // 提供token
  return token;
};

// 检查用户是否有权限
interface PossessOptions {
  resourceId: number;
  resourceType: string;
  userId: number;
}

export const possess = async (options: PossessOptions) => {
  // 解构选项
  const { resourceId, resourceType, userId } = options;

  // 检查权限
  const statement = `
    SELECT COUNT(${resourceType}.id) as count
    FROM ${resourceType}
    WHERE ${resourceType}.id = ? AND ${resourceType}.user_id = ?
  `;

  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);

  // 检查权限结果
  return data[0].count ? true : false;
};
