import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
// 获取内容列表

export const getPosts = async () => {
  const statement = `
    SELECT 
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id',user.id,
        'name',user.name
      ) as user
    FROM post 
    LEFT JOIN user 
      ON post.userId=user.id
  `;

  // const data = [
  //   {
  //     content: '明月出天山,苍茫云海间',
  //   },
  //   {
  //     content: '长风几万里,吹度玉门关',
  //   },
  //   {
  //     content: ' 汉家天子，玉关征戍难',
  //   },
  // ];

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
