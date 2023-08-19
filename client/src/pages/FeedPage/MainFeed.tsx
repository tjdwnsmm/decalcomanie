import { useState, useEffect, useMemo } from 'react';
import { FeedTab } from '../../components/TabBar/FeedTab';
import FeedPage from '../../components/Feed/FeedPage';
import { CenterFrame, Main, MarginFrame } from '../../style';
import FloatingWriteBtn from '../../components/Button/FloatingWriteBtn';
import BottomNav from '../../components/common/BottomNav';
import { EachFeedInfo } from '../../types/FeedInfoType';
import Spinner from '../../components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useFetchDatas } from '../../components/Feed/useFetchData';
import useIntersect from '../../hooks/useIntersect';

// 탭의 상태를 세션 스토리지에 저장
const saveActiveTab = (tab: string) => {
  sessionStorage.setItem('activeTab', tab);
};

// 세션 스토리지에서 탭의 상태를 불러옴
const loadActiveTab = () => {
  return sessionStorage.getItem('activeTab');
};

export const MainFeed = () => {
  //default 탭 : following
  //following , popular , latest
  const [nowActive, setNowActive] = useState('following');
  const [feeds, setFeeds] = useState<EachFeedInfo[] | null>(null);
  const navigate = useNavigate();
  const [heartCnt, setHeartCnt] = useState(-1);
  const [lastArticleId, setLastArticleId] = useState(-1);

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchDatas({
      heartCnt,
      lastArticleId,
      urlTab: loadActiveTab() || 'following',
    });

  const datas = useMemo(() => (data ? data : []), [data]);

  useEffect(() => {
    // 세션 스토리지에서 이전에 저장한 탭 상태를 불러옴
    const savedTab = loadActiveTab();
    // 이전 탭 상태가 있다면 그 탭을 설정하고, 없으면 기본 탭인 'following'으로 설정
    setNowActive(savedTab || 'following');
  }, []);
  useEffect(() => {
    // console.log(isFetching);
    // console.log('feed전', feeds);
    setFeeds(datas);
    // console.log('feed후', feeds);
  }, [datas]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      //console.log('✅ 이전까지 받아온 데이터!', datas);
      if (datas.length > 0) {
        setLastArticleId(datas[datas.length - 1].articleDtos.articleId);
        setHeartCnt(datas[datas.length - 1].articleDtos.heart);
      }
      fetchNextPage();
    }
  });

  useEffect(() => {
    setFeeds([]);
    setLastArticleId(-1);
    setHeartCnt(-1);
    saveActiveTab(nowActive);
  }, [nowActive]);

  const handleDetail = (articleId: number) => {
    navigate(`/post-detail/${articleId}`);
  };

  const handleTabClick = (tab: string) => {
    setNowActive(tab);
  };

  const handleFollow = (userId: string, followed: boolean) => {
    // 팔로우 상태를 업데이트하는 로직 구현
    setFeeds((prevFeeds) => {
      if (!prevFeeds) return null;
      return prevFeeds.map((feed) => {
        if (feed.userInfoDto.user.userId === userId) {
          return {
            ...feed,
            followed,
          };
        }
        return feed;
      });
    });
  };

  //현재 탭을 설정하는 setNowActive 를 props 로 넘겨서 탭 변경에 따라 페이지 내용이 변경되도록 구현
  return (
    <Main>
      <FeedTab
        setNowActive={handleTabClick}
        nowActive={loadActiveTab() || 'following'}
      />
      <Feeds>
        {feeds ? (
          feeds.length === 0 && isFetching ? (
            <>
              <MarginFrame margin="100px auto">
                <CenterFrame className="errorTitle">
                  작성된 글이 없습니다 😥
                </CenterFrame>
              </MarginFrame>
            </>
          ) : (
            <>
              {feeds.map((feed, idx) => (
                <FeedPage
                  key={idx}
                  feed={feed}
                  handleDetail={handleDetail}
                  handleFollow={handleFollow}
                />
              ))}
              {!isFetching && isLoading && <Spinner />}
              <MarginFrame margin="10px auto" />
              <Target ref={ref} />
            </>
          )
        ) : (
          <MarginFrame margin="240px 0 0">
            <Spinner />
          </MarginFrame>
        )}
      </Feeds>
      <FloatingWriteBtn />
      <BottomNav />
    </Main>
  );
};
const Target = styled.div`
  height: 3px;
`;

const Feeds = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: clip;
  padding-bottom: 100px;

  .errorTitle {
    font-weight: 700;
  }
`;
