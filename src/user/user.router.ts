import express from 'express';
import * as userController from './user.controller';
import { validateUserData, hashPassword } from './user.middleware';

const router = express.Router();

router.get('/user/:username', userController.indexOne);

// 获取列表
router.get('/users', userController.index);

// 创建内容（新增条目）- 注意中间件的顺序
router.post('/user', validateUserData, hashPassword, userController.store);

// 更新内容
router.patch('/user/:userId', userController.update);

// 删除内容
router.delete('/user/:userId', userController.deleteItem);

// 导出路由
export default router;
