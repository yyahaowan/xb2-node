import { Request, Response, NextFunction } from 'express';
import * as fileService from './file.service';
import _ from 'lodash';

/**
 * 上传文件
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.file);

  try {
    const { id: userId } = request.user;
    const { post: postId } = request.query;
    const fileInfo = _.pick(request.file, [
      'originalname',
      'filename',
      'mimetype',
      'size',
    ]);

    console.log(fileInfo);

    const data = await fileService.createFile({
      ...fileInfo,
      userId,
      postId: parseInt(postId as string, 10),
      ...request.fileMetaData,
    });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 获取文件信息
 */
export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fileId } = request.params;
  try {
    const file = await fileService.findFileById(parseInt(fileId, 10));

    console.log(file);

    // 响应
    response.sendFile(file.filename, {
      root: './uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
