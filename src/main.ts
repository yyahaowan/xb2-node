import express from 'express';

import { Request, Response } from 'express';

const app = express();

const port = 3000;
// 全局中间件
app.use(express.json({}));

const data = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the first post',
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the Second post',
  },
  {
    id: 3,
    title: 'Three Post',
    content: 'This is the Three post',
  },
];

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World');
});

app.get('/posts', (request: Request, response: Response) => {
  response.setHeader('Content-Type', 'application/json;charset=utf-8');
  response.send(data);
});

app.get('/posts/:id', (request: Request, response: Response) => {
  // 其实会自动设置 response.setHeader('Content-Type','application/json;charset=utf-8')
  const { id } = request.params;
  response.send(data.filter((item) => item.id === parseInt(id, 10)));
});

app.post('/posts', (request: Request, response: Response) => {
  console.log('新增数据~~~', request.body);
  const { content } = request.body;

  // 用户头部自定义数据（没定义也不会报错）
  console.log(request.headers['user-header']);

  response.status(201);
  response.setHeader('user-header', 'yyyyyyyyy');
  response.send({
    message: `成功创建了内容:${content}`,
  });
});

app.put('/posts/:id', (request: Request, response: Response) => {
  console.log('修改数据~~~', request.params.id);
});

app.delete('/posts/:id', (request: Request, response: Response) => {
  console.log('删除数据~~~', request.params.id);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
