import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  const sql = `
    INSERT INTO file 
      SET ?
  `;
  const [data] = await connection.promise().query(sql, file);

  // 提供数据
  return data;
};

/**
 * 查询文件信息
 */
export const findFileById = async (fileId: number) => {
  const sql = `
    SELECT * FROM file 
    WHERE id=?
  `;
  const [data] = await connection.promise().query(sql, fileId);

  // 提供数据
  return data[0];
};
