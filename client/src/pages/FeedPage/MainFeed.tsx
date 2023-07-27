import { useState, useEffect } from 'react';
import { FeedTab } from '../../components/TabBar/FeedTab';
import FeedPage from '../../components/Feed/FeedPage';
import { Main, MarginFrame } from '../../style';
import FloatingWriteBtn from '../../components/Button/FloatingWriteBtn';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { EachFeedInfo } from '../../types/FeedInfoType';
import Spinner from '../../components/common/Spinner';

export const MainFeed = () => {
  //default 탭 : following
  //following , popular , latest
  const [nowActive, setNowActive] = useState('following');
  const [feeds, setFeeds] = useState<EachFeedInfo[] | null>(null);

  useEffect(() => {
    axios.get(`/sns/feed/${nowActive}`).then((res) => {
      setFeeds(res.data);
      console.log(res.data, nowActive);
    });
  }, [nowActive]);

  if (!feeds) {
    return (
      <MarginFrame margin="240px 0 0">
        <Spinner />
        <FloatingWriteBtn />
      </MarginFrame>
    );
  }
  //현재 탭을 설정하는 setNowActive 를 props 로 넘겨서 탭 변경에 따라 페이지 내용이 변경되도록 구현
  return (
    <Main>
      <FeedTab setNowActive={setNowActive} />
      {feeds.map((feed, idx) => (
        <FeedPage key={idx} feed={feed} />
      ))}
      <FloatingWriteBtn />
      <BottomNav />
    </Main>
  );
};
