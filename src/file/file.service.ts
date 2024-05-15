import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';
import Jimp from 'jimp';
import path from 'path';

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

/**
 * 调整图像尺寸
 */
export const imageResize = async (image: Jimp, file: Express.Multer.File) => {
  // 图像尺寸
  const { imageSize } = image['_exif'];

  // 文件路径
  const filePath = path.join(file.destination, 'resized', file.filename);

  // 大尺寸
  if (imageSize.width > 1280) {
    image.resize(1280, Jimp.AUTO).quality(85).write(`${filePath}-large`);
  }

  // 中等尺寸
  if (imageSize.width > 640) {
    image.resize(640, Jimp.AUTO).quality(85).write(`${filePath}-medium`);
  }

  // 小尺寸
  if (imageSize.width > 320) {
    image.resize(320, Jimp.AUTO).quality(85).write(`${filePath}-thumbnail`);
  }
};
