import express from 'express';
import { authGuard, accessControl } from '../auth/auth.middleware';
import { requestUrl } from '../app/app.middleware';
import * as postController from './post.controller';

const router = express.Router();

// 获取列表
router.get('/post/:postId', requestUrl, postController.indexOne);

// 获取列表
router.get('/posts', requestUrl, postController.index);

// 创建内容（新增条目）
router.post('/post', requestUrl, authGuard, postController.store);

// 更新内容
router.patch(
  '/post/:postId',
  requestUrl,
  authGuard,
  accessControl({ possession: false }),
  postController.update,
);

// 删除内容
router.delete(
  '/post/:postId',
  authGuard,
  accessControl({ possession: false }),
  postController.deleteItem,
);

// 导出路由
export default router;
