import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResize } from './file.service';

// 创建一个 Multer
const fileUpload = multer({
  dest: 'uploads/', // 设置上传文件的保存路径
  limits: {
    fileSize: 1024 * 1024 * 5, // 设置上传文件的大小限制为5MB
  },
});

// 文件拦截器（file字段与request中对应）
export const fileInterceptor = fileUpload.single('file');

/**
 * 处理文件用中间件
 */
export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 文件路径
  const { path } = request.file;

  let image: Jimp;

  try {
    // 读取图像文件
    image = await Jimp.read(path);
  } catch (error) {
    next(error);
  }

  // 准备文件所需数据
  const { imageSize, tags } = image['_exif'];

  // 在请求中添加文件数据(这里request通过express.d.ts扩展了属性)
  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  // 调整图像尺寸
  imageResize(image, request.file);

  next();
};
