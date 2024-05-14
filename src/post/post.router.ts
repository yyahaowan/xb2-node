import express from 'express';

import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';

const router = express.Router();

// 获取列表
router.get('/posts', requestUrl, postController.index);

// 创建内容（新增条目）
router.post('/post', postController.store);

// 更新内容
router.patch('/post/:postId', postController.update);

// 删除内容
router.delete('/post/:postId', postController.deleteItem);

// 导出路由
export default router;
