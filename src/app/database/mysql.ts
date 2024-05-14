import mysql from 'mysql2';

import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
  MYSQL_PORT,
} from '../app.config';

export const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  port: parseInt(MYSQL_PORT, 10),
});
