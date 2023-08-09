import { useState, useEffect } from 'react';
import { FeedTab } from '../../components/TabBar/FeedTab';
import FeedPage from '../../components/Feed/FeedPage';
import { CenterFrame, Main, MarginFrame } from '../../style';
import FloatingWriteBtn from '../../components/Button/FloatingWriteBtn';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { EachFeedInfo } from '../../types/FeedInfoType';
import Spinner from '../../components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const MainFeed = () => {
  //default 탭 : following
  //following , popular , latest
  const [nowActive, setNowActive] = useState('following');
  const [feeds, setFeeds] = useState<EachFeedInfo[] | null>(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const fetchFeedsForTab = (tab: string) => {
    // setFeeds(null);
    setLoading(true);
    axios.get(`/sns/feed/${tab}`).then((res) => {
      setFeeds(res.data);
      setLoading(false);
      // console.log(res.data);
    });
  };

  useEffect(() => {
    fetchFeedsForTab(nowActive);
  }, [nowActive]);

  const handleDetail = (articleId: number) => {
    navigate(`/post-detail/${articleId}`);
  };

  const handleTabClick = (tab: string) => {
    setNowActive(tab);
    fetchFeedsForTab(tab);
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
      <FeedTab setNowActive={handleTabClick} />
      <Feeds>
        {!isLoading && feeds ? (
          feeds.length === 0 ? (
            <>
              <MarginFrame margin="100px auto">
                <CenterFrame className="errorTitle">
                  작성된 글이 없습니다 😥
                </CenterFrame>
              </MarginFrame>
            </>
          ) : (
            feeds.map((feed, idx) => (
              <FeedPage
                key={idx}
                feed={feed}
                handleDetail={handleDetail}
                handleFollow={handleFollow}
              />
            ))
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
