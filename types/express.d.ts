import { TokenPayload } from '../src/auth/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      // 添加可请求类型
      fileMetaData: { width?: number; height?: number; metadata?: {} };
    }
  }
}
