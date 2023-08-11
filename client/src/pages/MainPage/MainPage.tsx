import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import NoRecommend from '../../components/Main/NoRecommend';
import FloatingDrawerBtn from '../../components/Button/FloatingDrawerBtn';
import BottomNav from '../../components/common/BottomNav';
import { PerfumeDetail, ScentDto } from '../../types/PerfumeInfoType';
import MainSwiper from '../../components/Carousel/MainSwiper';
import MoreRateInfo from '../../components/Main/MoreRateInfo';
import MainScent from '../../components/Main/MainScent';
import axios from '../../api/apiController';
import Spinner from '../../components/common/Spinner';

const favScent: ScentDto[] = [
  { scentId: 1, weight: 100, name: '시트러스', rgb: '#F9FF52' },
  { scentId: 20, weight: 93, name: '흙 내음', rgb: '#544838' },
  { scentId: 9, weight: 86, name: '우디', rgb: '#774414' },
];

interface BaseInfoProps {
  curSeason: string;
  curTime: string;
  gender: number;
  age: number;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [isDrawer, setDrawer] = useState(true);
  const backFrameRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState('');
  const [recommendPerfume, setRecommendPerfume] = useState<
    PerfumeDetail[] | null
  >(null);
  const [weatherPerfumes, setWeatherPerfumes] = useState<
    PerfumeDetail[] | null
  >(null);
  const [dayNightPerfumes, setDayNightPerfumes] = useState<
    PerfumeDetail[] | null
  >(null);
  const [ageGenderPerfumes, setAgeGenderPerfumes] = useState<
    PerfumeDetail[] | null
  >(null);
  const [overallPerfumes, setOverallPerfumes] = useState<
    PerfumeDetail[] | null
  >(null);

  const [baseInfo, setBaseInfo] = useState<BaseInfoProps | null>(null);

  const handleSearchPerfume = () => {
    navigate('/search-myperfume');
  };

  const getSeasonTime = (season: string) => {
    switch (season) {
      case 'summer':
        return '여름';
      case 'spring':
        return '봄';
      case 'fall':
        return '가을';
      case 'winter':
        return '겨울';
    }
    return '';
  };

  useEffect(() => {
    axios.get('/user/user/recommend').then((res) => {
      const datas = res.data;
      datas.length === 0 ? setDrawer(false) : setDrawer(true);
      setRecommendPerfume(datas);
    });

    axios.get('/perfume/today').then((res) => {
      console.log(`today data : ${JSON.stringify(res.data)}`);
      setWeatherPerfumes(res.data.season);
      setDayNightPerfumes(res.data.dayNight);
      setAgeGenderPerfumes(res.data.ageGender);
      setOverallPerfumes(res.data.overall);
      setBaseInfo({
        curSeason: res.data.curSeason,
        curTime: res.data.curTime,
        gender: res.data.gender,
        age: res.data.age,
      });
    });
  }, []);

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      setNickname(nickname);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Main>
      <Frame>
        {isDrawer ? (
          <MainRecommend nickname={nickname} />
        ) : (
          <>
            <NoRecommend nickname={nickname} />
            <MarginFrame margin="25px auto 40px">
              <CenterFrame>
                <ConfirmButton
                  color="primary"
                  background="primary"
                  onClick={handleSearchPerfume}
                >
                  내 향수 찾으러 가기
                </ConfirmButton>
              </CenterFrame>
            </MarginFrame>
          </>
        )}
        <div ref={backFrameRef}>
          <BackFrame>
            {isDrawer && (
              <>
                <Info>
                  <div className="title">{nickname}님을 위한 추천</div>
                  <div className="subtitle">
                    서랍에 담은 향수들에 기반한 맞춤 추천 결과입니다
                  </div>
                  <>
                    <MainScent accord={favScent} />
                  </>
                </Info>
                {recommendPerfume ? (
                  <MainSwiper perfumes={recommendPerfume} />
                ) : (
                  <Spinner info="맞춤 추천 중입니다. 잠시만 기다려주세요 😄" />
                )}
              </>
            )}
            {weatherPerfumes &&
            dayNightPerfumes &&
            ageGenderPerfumes &&
            overallPerfumes &&
            baseInfo ? (
              <>
                {isDrawer && overallPerfumes.length > 0 ? (
                  <MoreRateInfo
                    title={`오늘은 이런 향수 어떠신가요 ? 🧙‍♀️`}
                    perfumes={overallPerfumes}
                  />
                ) : (
                  overallPerfumes.length > 0 && (
                    <MoreRateInfo
                      title={`오늘은 이런 향수 어떠신가요 ? 🧙‍♀️`}
                      perfumes={overallPerfumes}
                      first={true}
                    />
                  )
                )}
                {ageGenderPerfumes.length > 0 && (
                  <MoreRateInfo
                    title={`${baseInfo.age}대 ${
                      baseInfo.gender === 1 ? '여성' : '남성'
                    }분들에게 인기가 많아요 😌`}
                    perfumes={ageGenderPerfumes}
                  />
                )}
                <MoreRateInfo
                  title={`${
                    baseInfo.curTime === 'day' ? '낮' : '밤'
                  } 시간대에 인기가 많아요 ${
                    baseInfo.curTime === 'day' ? '🌞' : '🌚'
                  } `}
                  perfumes={dayNightPerfumes}
                />
                <MoreRateInfo
                  title={`${getSeasonTime(baseInfo.curSeason)}에 잘어울려요 🌏`}
                  perfumes={weatherPerfumes}
                />
              </>
            ) : (
              <MarginFrame margin="100px auto">
                <Spinner />
              </MarginFrame>
            )}
          </BackFrame>
        </div>
      </Frame>
      <FloatingDrawerBtn />
      <BottomNav />
    </Main>
  );
};

export default MainPage;

const BackFrame = styled.div`
  background: linear-gradient(
    180deg,
    var(--white-color) 0%,
    var(--background-color) 15%
  );
  // background-color: var(--background-color);
  padding: 10px 0 120px;
  border-radius: 30px 30px 0 0;
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.1);
  width: 390px;
`;

const Frame = styled.div`
  overflow-y: scroll;
  overflow-x: clip;
  background: linear-gradient(
    180deg,
    rgba(249, 202, 245, 0.44) 0%,
    rgba(239, 223, 251, 0.63) 7.31%,
    rgba(236, 228, 252, 0.68) 15%
  );
`;

const Info = styled.div`
  margin: 40px 30px 20px;
  .title {
    font-weight: 700;
    font-size: 23px;
  }
  .subtitle {
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  span {
    color: var(--primary-color);
  }
`;
