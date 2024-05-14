import dotenv from 'dotenv';

// 读取载入环境变量
dotenv.config();

export const { APP_PORT } = process.env;

export const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } =
  process.env;
