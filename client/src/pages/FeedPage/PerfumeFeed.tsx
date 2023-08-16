import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import { EachFeedInfo, FeedDetail } from '../../types/FeedInfoType';
import PerfumeInfoBox from '../../components/Perfume/PerfumeInfoBox';
import { styled } from 'styled-components';
import FeedPageOnly from '../../components/Feed/FeedPageByPerfume';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Spinner from '../../components/common/Spinner';
import { ReactComponent as BackSvg } from '../../assets/icon/prevBack.svg';
import { useFetchPerfumeDatas } from '../../components/Feed/useFetchPerfumeData';
import useIntersect from '../../hooks/useIntersect';

const SEARCH_RESULT_TIMEOUT = 5000; // 5 seconds

export const PerfumeFeed = () => {
  const { id } = useParams<{ id: string }>();
  const [feeds, setFeeds] = useState<EachFeedInfo[] | null>(null);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const navigate = useNavigate();
  const [heartCnt, setHeartCnt] = useState(-1);
  const [lastArticleId, setLastArticleId] = useState(-1);

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchPerfumeDatas({
      heartCnt,
      lastArticleId,
      id: id ? id : '',
    });

  const datas = useMemo(() => (data ? data : []), [data]);
  console.log(datas);

  useEffect(() => {
    if (!datas || datas.length === 0) {
      const timeoutId = setTimeout(() => {
        setShowNoResultsMessage((prevShowNoResultsMessage) => {
          if (prevShowNoResultsMessage || !datas || datas.length === 0) {
            return true;
          }
          return prevShowNoResultsMessage;
        });
      }, SEARCH_RESULT_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [datas]);

  useEffect(() => {
    console.log('datas', datas);
    setFeeds(datas);
  }, [datas]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
      console.log('✅ 이전까지 받아온 데이터!', datas);
      setLastArticleId(datas[datas.length - 1].articleDtos.articleId);
      setHeartCnt(datas[datas.length - 1].articleDtos.heart);
    }
  });

  const handleBack = () => {
    setFeeds(null);
    navigate(`/perfume-detail/${id}`);
  };

  const handleFollow = (userId: string, followed: boolean) => {
    // 팔로우 상태를 업데이트하는 로직 구현
    setFeeds((prevFeeds) => {
      if (!prevFeeds) return null;
      return prevFeeds.map((feed) => {
        if (feed.userInfoDto.user.userId === userId) {
          // console.log(userId);
          return {
            ...feed,
            followed,
          };
        }
        return feed;
      });
    });
  };

  if (showNoResultsMessage) {
    return (
      <>
        <ErrorTxt>검색 결과가 없습니다 😥</ErrorTxt>
        <MarginFrame margin="15px 25px 0">
          <CenterFrame>
            <ConfirmButton
              color="primary"
              background="primary"
              onClick={handleBack}
            >
              상세 페이지로 돌아가기
            </ConfirmButton>
          </CenterFrame>
        </MarginFrame>
      </>
    );
  }

  if (!feeds || feeds.length === 0) {
    return (
      <MarginFrame margin="200px auto">
        <Spinner />
      </MarginFrame>
    );
  }

  return (
    <Main>
      <MarginFrame margin="20px 25px 0">
        <BackSvg onClick={handleBack} />
      </MarginFrame>

      <PerfumeFeedBox>
        <PerfumeInfoBox feed={feeds[0].perfumeDtos} />
      </PerfumeFeedBox>

      <FeedBody>
        {feeds.map((eachFeed, idx) => (
          <FeedPageOnly key={idx} feed={eachFeed} handleFollow={handleFollow} />
        ))}
        {!isFetching && isLoading && <Spinner />}
        <MarginFrame margin="10px auto" />
        <Target ref={ref} />
      </FeedBody>
    </Main>
  );
};
const Target = styled.div`
  height: 3px;
`;

const PerfumeFeedBox = styled.div`
  margin-top: 12px;
  padding: 0 18px;
`;
const FeedBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ErrorTxt = styled.div`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-top: 270px;
`;
