import app from './app';

import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});

connection.connect((error) => {
  if (error) {
    console.log('💀 连接数据库失败', error.message);
    return;
  }

  console.log('🍻 成功连接数据库服务~~~');
});
