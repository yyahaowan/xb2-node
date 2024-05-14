import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
// 获取内容列表

export const getPost = async (postId: string) => {
  const statement = `
    SELECT 
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id',user.id,
        'username',user.username
      ) as user
    FROM post 
    LEFT JOIN user 
      ON post.userId=user.id where post.id=?
  `;

  const [data] = await connection.promise().query(statement, postId);

  return data[0];
};

export const getPosts = async () => {
  const statement = `
    SELECT 
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id',user.id,
        'username',user.username
      ) as user
    FROM post 
    LEFT JOIN user 
      ON post.userId=user.id
  `;

  const [data] = await connection.promise().query(statement);

  return data;
};

export const createPost = async (post: PostModel) => {
  const statement = `
    INSERT INTO post
    SET ?
  `;

  const [data] = await connection.promise().query(statement, post);

  return data;
};

export const updatePost = async (postId: number, post: PostModel) => {
  const statement = `
    UPDATE post
    SET ?
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, [post, postId]);

  return data;
};

export const deletePost = async (postId: number) => {
  const statement = `
    DELETE FROM post
    WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, postId);

  return data;
};
