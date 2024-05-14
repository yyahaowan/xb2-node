import dotenv from 'dotenv';

// 读取载入环境变量
dotenv.config();

export const { APP_PORT } = process.env;
