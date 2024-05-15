import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

// 创建一个 Multer
const fileUpload = multer({
  dest: 'uploads/', // 设置上传文件的保存路径
  limits: {
    fileSize: 1024 * 1024 * 5, // 设置上传文件的大小限制为5MB
  },
});

// 文件拦截器（file字段与request中对应）
export const fileInterceptor = fileUpload.single('file');
