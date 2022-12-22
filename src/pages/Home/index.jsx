import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosPrivate } from '../../apis/axios';
import PostsList from '../../components/post/PostsList';
import HomeHeader from '../../components/common/Header/HomeHeader'
import * as S from './style';

const Home = () => {
  const [postsList, setPostList] = useState([]);
  const [hasNextFeed, setHasNextFeed] = useState(true);
  const page = useRef(0);
  const observerTargetEl = useRef(null);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextFeed) return;

    const getFeed = async () => {
      const { data: { posts } } = await axiosPrivate.get(`/post/feed/?limit=10&skip=${page.current}`);
      setPostList((prev) => [...prev, ...posts]);
      setHasNextFeed(posts.length % 10 === 0);
      page.current += 10;
    }
    
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getFeed();
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    }
  }, [hasNextFeed]);

  return (
    <>
      <HomeHeader />
      <S.Container>
        <PostsList postsList={postsList} />

        <div ref={observerTargetEl} />
      </S.Container>
    </>
  );
};

export default Home;
