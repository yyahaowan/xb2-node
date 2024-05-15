import express from 'express';
import * as fileController from './file.controller';
import { authGuard } from '../auth/auth.middleware';
import { fileInterceptor, fileProcessor } from './file.middleware';

const router = express.Router();

router.post(
  '/file',
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store,
);

// 文件服务接口
router.get('/files/:fileId', fileController.serve);
export default router;
