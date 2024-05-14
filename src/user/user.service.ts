import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

export const getUser = async (username: string) => {
  const statement = `
    SELECT id,username
    from user 
    WHERE username = ?
  `;

  const [data] = await connection.promise().query(statement, username);

  // 只返回一项
  return data[0];
};

export const getUsers = async () => {
  const statement = `
    SELECT 
      * from user
  `;

  const [data] = await connection.promise().query(statement);

  return data;
};

export const createUser = async (user: UserModel) => {
  const statement = `
    INSERT INTO user
    SET ?
  `;

  const [data] = await connection.promise().query(statement, user);

  return data;
};

export const updateUser = async (userId: number, user: UserModel) => {
  const statement = `
    UPDATE user
    SET ?
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, [user, userId]);

  return data;
};

export const deleteUser = async (userId: number) => {
  const statement = `
    DELETE FROM user
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, userId);

  return data;
};
