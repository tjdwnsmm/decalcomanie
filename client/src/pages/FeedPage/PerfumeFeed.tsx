import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import { EachFeedInfo, FeedDetail } from '../../types/FeedInfoType';
import PerfumeInfoBox from '../../components/Perfume/PerfumeInfoBox';
import { styled } from 'styled-components';
import FeedPageOnly from '../../components/Feed/FeedPageByPerfume';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/apiController';
import Spinner from '../../components/common/Spinner';
import { ReactComponent as BackSvg } from '../../assets/icon/prevBack.svg';

export const PerfumeFeed = () => {
  const { id } = useParams<{ id: string }>();
  const [feed, setFeed] = useState<EachFeedInfo[] | null>(null);

  useEffect(() => {
    axios.get(`/sns/perfume/${id}`).then((res) => {
      setFeed(res.data);
      console.log(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/perfume-detail/${id}`);
  };

  if (!feed) {
    return <Spinner />;
  }

  if (feed.length === 0) {
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
  return (
    <Main>
      <MarginFrame margin="20px 25px 0">
        <BackSvg onClick={handleBack} />
      </MarginFrame>

      <PerfumeFeedBox>
        <PerfumeInfoBox feed={feed[0].perfumeDtos} />
      </PerfumeFeedBox>

      <FeedBody>
        {feed.map((eachFeed, idx) => (
          <FeedPageOnly key={idx} feed={eachFeed.articleDtos} />
        ))}
      </FeedBody>
    </Main>
  );
};

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
  color: var(--primary-color);
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  margin-top: 270px;
`;
