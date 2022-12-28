import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../../../apis/axios';
import PostsList from '../../post/PostsList';
import PostAlbum from '../../post/PostAlbum';

import * as S from './style';

const MyPosts = () => {
  const { accountname } = useParams();
  const [postsList, setPostsList] = useState([]);
  const [selectList, setSelectList] = useState(true);
  const filteredPostsList = postsList.filter((item) => item.image);

  useEffect(() => {
    const getAllPosts = async () => {
      const {
        data: { post },
      } = await axiosPrivate.get(`/post/${accountname}/userpost`);

      setPostsList(post);
    };
    getAllPosts();
  }, [accountname]);

  return (
    <>
      <S.PostHeader>
        {selectList ? (
          <>
            <S.PostListOnIcon />
            <S.PostAlbumOffIcon onClick={() => setSelectList(false)} />
          </>
        ) : (
          <>
            <S.PostListOffIcon onClick={() => setSelectList(true)} />
            <S.PostAlbumOnIcon />
          </>
        )}
      </S.PostHeader>
      {selectList ? (
        <PostsList postsList={postsList} setPostsList={setPostsList} />
      ) : (
        <PostAlbum postsList={filteredPostsList} />
      )}
    </>
  );
};

export default MyPosts;
