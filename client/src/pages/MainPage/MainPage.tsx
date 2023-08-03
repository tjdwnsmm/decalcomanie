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

/**
 * !API 로 바꿀것!
 */
const season = '여름';
const time = '낮';

const favScent: ScentDto[] = [
  { scentId: 1, weight: 100, name: '시트러스', rgb: '#F9FF52' },
  { scentId: 20, weight: 93, name: '흙 내음', rgb: '#544838' },
  { scentId: 9, weight: 86, name: '우디', rgb: '#774414' },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [isDrawer, setDrawer] = useState(true);
  const [backFrameSticky, setBackFrameSticky] = useState(false);
  const backFrameRef = useRef<HTMLDivElement>(null);

  const handleSearchPerfume = () => {
    navigate('/search-myperfume');
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setBackFrameSticky(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (backFrameRef.current) {
      observer.observe(backFrameRef.current);
    }

    return () => {
      if (backFrameRef.current) {
        observer.unobserve(backFrameRef.current);
      }
    };
  }, []);

  return (
    <Main>
      <Frame>
        {isDrawer ? (
          <MainRecommend />
        ) : (
          <>
            <NoRecommend />
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
          <BackFrame sticky={backFrameSticky}>
            {isDrawer && (
              <>
                <Info>
                  <div className="title">김수민님을 위한 추천</div>
                  <div className="subtitle">
                    서랍에 담은 향수들에 기반한 맞춤 추천 결과입니다
                  </div>
                  <>
                    <MainScent accord={favScent} />
                  </>
                </Info>
                <MainSwiper perfumes={perfumes} />
              </>
            )}
            {isDrawer ? (
              <MoreRateInfo
                title={`${season}에 잘어울려요 🌞`}
                perfumes={perfumes}
              />
            ) : (
              <MoreRateInfo
                title={`${season}에 잘어울려요 🌞`}
                perfumes={perfumes}
                first={true}
              />
            )}
            <MoreRateInfo
              title={`${time} 시간대에 인기가 많아요 🌞`}
              perfumes={perfumes}
            />
          </BackFrame>
        </div>
      </Frame>
      <FloatingDrawerBtn />
      <BottomNav />
    </Main>
  );
};

export default MainPage;
interface BackFrameProps {
  sticky: boolean;
}

const BackFrame = styled.div<BackFrameProps>`
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

const perfumes: PerfumeDetail[] = [
  {
    perfumeId: 1004,
    name: '알루어 홈므 스포츠 콜롱',
    nameOrg: 'Allure Homme Sport Cologne',
    brandName: '샤넬',
    brandId: 1,
    picture: 'https://fimgs.net/mdimg/perfume/375x500.1004.jpg',
    gender: 0,
    rate: null,
    longevity: 3.06,
    sillage: 2.22,
    picked: false,
    pick: 0,
    accord: [
      {
        scentId: 1,
        weight: 100.0,
        name: '시트러스',
        rgb: '#F9FF52',
      },
      {
        scentId: 2,
        weight: 62.0,
        name: '프레시 스파이시',
        rgb: '#83C928',
      },
      {
        scentId: 5,
        weight: 61.0,
        name: '아로마틱',
        rgb: '#37a089',
      },
      {
        scentId: 9,
        weight: 54.0,
        name: 'woody',
        rgb: '#774414',
      },
      {
        scentId: 16,
        weight: 53.0,
        name: 'fresh',
        rgb: '#9be5ed',
      },
    ],
    note: [
      {
        noteListId: 135,
        perfumeId: 1004,
        type: 'Top',
        noteId: 77,
        noteName: 'Lemon',
      },
      {
        noteListId: 136,
        perfumeId: 1004,
        type: 'Top',
        noteId: 75,
        noteName: 'Bergamot',
      },
      {
        noteListId: 137,
        perfumeId: 1004,
        type: 'Top',
        noteId: 80,
        noteName: 'Orange',
      },
      {
        noteListId: 138,
        perfumeId: 1004,
        type: 'Top',
        noteId: 76,
        noteName: 'Grapefruit',
      },
      {
        noteListId: 139,
        perfumeId: 1004,
        type: 'Top',
        noteId: 82,
        noteName: 'Mandarin Orange',
      },
      {
        noteListId: 140,
        perfumeId: 1004,
        type: 'Top',
        noteId: 165,
        noteName: 'Aldehydes',
      },
      {
        noteListId: 141,
        perfumeId: 1004,
        type: 'Top',
        noteId: 17,
        noteName: 'Neroli',
      },
      {
        noteListId: 142,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 205,
        noteName: 'Fir',
      },
      {
        noteListId: 143,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 321,
        noteName: 'Spicy Notes',
      },
      {
        noteListId: 144,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 390,
        noteName: 'Elemi',
      },
      {
        noteListId: 145,
        perfumeId: 1004,
        type: 'Base',
        noteId: 4,
        noteName: 'Musk',
      },
      {
        noteListId: 146,
        perfumeId: 1004,
        type: 'Base',
        noteId: 158,
        noteName: 'Pepper',
      },
      {
        noteListId: 147,
        perfumeId: 1004,
        type: 'Base',
        noteId: 41,
        noteName: 'Cedar',
      },
      {
        noteListId: 148,
        perfumeId: 1004,
        type: 'Base',
        noteId: 2,
        noteName: 'Vetiver',
      },
      {
        noteListId: 149,
        perfumeId: 1004,
        type: 'Base',
        noteId: 73,
        noteName: 'Tonka Bean',
      },
    ],
  },
  {
    perfumeId: 1004,
    name: '알루어 홈므 스포츠 콜롱',
    nameOrg: 'Allure Homme Sport Cologne',
    brandName: '샤넬',
    brandId: 1,
    picture: 'https://fimgs.net/mdimg/perfume/375x500.1004.jpg',
    gender: 0,
    rate: null,
    longevity: 3.06,
    sillage: 2.22,
    picked: false,
    pick: 0,
    accord: [
      {
        scentId: 1,
        weight: 100.0,
        name: 'citrus',
        rgb: '#F9FF52',
      },
      {
        scentId: 2,
        weight: 62.0,
        name: 'fresh spicy',
        rgb: '#83C928',
      },
      {
        scentId: 5,
        weight: 61.0,
        name: 'aromatic',
        rgb: '#37a089',
      },
      {
        scentId: 9,
        weight: 54.0,
        name: 'woody',
        rgb: '#774414',
      },
      {
        scentId: 16,
        weight: 53.0,
        name: 'fresh',
        rgb: '#9be5ed',
      },
    ],
    note: [
      {
        noteListId: 135,
        perfumeId: 1004,
        type: 'Top',
        noteId: 77,
        noteName: 'Lemon',
      },
      {
        noteListId: 136,
        perfumeId: 1004,
        type: 'Top',
        noteId: 75,
        noteName: 'Bergamot',
      },
      {
        noteListId: 137,
        perfumeId: 1004,
        type: 'Top',
        noteId: 80,
        noteName: 'Orange',
      },
      {
        noteListId: 138,
        perfumeId: 1004,
        type: 'Top',
        noteId: 76,
        noteName: 'Grapefruit',
      },
      {
        noteListId: 139,
        perfumeId: 1004,
        type: 'Top',
        noteId: 82,
        noteName: 'Mandarin Orange',
      },
      {
        noteListId: 140,
        perfumeId: 1004,
        type: 'Top',
        noteId: 165,
        noteName: 'Aldehydes',
      },
      {
        noteListId: 141,
        perfumeId: 1004,
        type: 'Top',
        noteId: 17,
        noteName: 'Neroli',
      },
      {
        noteListId: 142,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 205,
        noteName: 'Fir',
      },
      {
        noteListId: 143,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 321,
        noteName: 'Spicy Notes',
      },
      {
        noteListId: 144,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 390,
        noteName: 'Elemi',
      },
      {
        noteListId: 145,
        perfumeId: 1004,
        type: 'Base',
        noteId: 4,
        noteName: 'Musk',
      },
      {
        noteListId: 146,
        perfumeId: 1004,
        type: 'Base',
        noteId: 158,
        noteName: 'Pepper',
      },
      {
        noteListId: 147,
        perfumeId: 1004,
        type: 'Base',
        noteId: 41,
        noteName: 'Cedar',
      },
      {
        noteListId: 148,
        perfumeId: 1004,
        type: 'Base',
        noteId: 2,
        noteName: 'Vetiver',
      },
      {
        noteListId: 149,
        perfumeId: 1004,
        type: 'Base',
        noteId: 73,
        noteName: 'Tonka Bean',
      },
    ],
  },
  {
    perfumeId: 1004,
    name: '알루어 홈므 스포츠 콜롱',
    nameOrg: 'Allure Homme Sport Cologne',
    brandName: '샤넬',
    brandId: 1,
    picture: 'https://fimgs.net/mdimg/perfume/375x500.1004.jpg',
    gender: 0,
    rate: null,
    longevity: 3.06,
    sillage: 2.22,
    picked: false,
    pick: 0,
    accord: [
      {
        scentId: 1,
        weight: 100.0,
        name: 'citrus',
        rgb: '#F9FF52',
      },
      {
        scentId: 2,
        weight: 62.0,
        name: 'fresh spicy',
        rgb: '#83C928',
      },
      {
        scentId: 5,
        weight: 61.0,
        name: 'aromatic',
        rgb: '#37a089',
      },
      {
        scentId: 9,
        weight: 54.0,
        name: 'woody',
        rgb: '#774414',
      },
      {
        scentId: 16,
        weight: 53.0,
        name: 'fresh',
        rgb: '#9be5ed',
      },
    ],
    note: [
      {
        noteListId: 135,
        perfumeId: 1004,
        type: 'Top',
        noteId: 77,
        noteName: 'Lemon',
      },
      {
        noteListId: 136,
        perfumeId: 1004,
        type: 'Top',
        noteId: 75,
        noteName: 'Bergamot',
      },
      {
        noteListId: 137,
        perfumeId: 1004,
        type: 'Top',
        noteId: 80,
        noteName: 'Orange',
      },
      {
        noteListId: 138,
        perfumeId: 1004,
        type: 'Top',
        noteId: 76,
        noteName: 'Grapefruit',
      },
      {
        noteListId: 139,
        perfumeId: 1004,
        type: 'Top',
        noteId: 82,
        noteName: 'Mandarin Orange',
      },
      {
        noteListId: 140,
        perfumeId: 1004,
        type: 'Top',
        noteId: 165,
        noteName: 'Aldehydes',
      },
      {
        noteListId: 141,
        perfumeId: 1004,
        type: 'Top',
        noteId: 17,
        noteName: 'Neroli',
      },
      {
        noteListId: 142,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 205,
        noteName: 'Fir',
      },
      {
        noteListId: 143,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 321,
        noteName: 'Spicy Notes',
      },
      {
        noteListId: 144,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 390,
        noteName: 'Elemi',
      },
      {
        noteListId: 145,
        perfumeId: 1004,
        type: 'Base',
        noteId: 4,
        noteName: 'Musk',
      },
      {
        noteListId: 146,
        perfumeId: 1004,
        type: 'Base',
        noteId: 158,
        noteName: 'Pepper',
      },
      {
        noteListId: 147,
        perfumeId: 1004,
        type: 'Base',
        noteId: 41,
        noteName: 'Cedar',
      },
      {
        noteListId: 148,
        perfumeId: 1004,
        type: 'Base',
        noteId: 2,
        noteName: 'Vetiver',
      },
      {
        noteListId: 149,
        perfumeId: 1004,
        type: 'Base',
        noteId: 73,
        noteName: 'Tonka Bean',
      },
    ],
  },
  {
    perfumeId: 1004,
    name: '알루어 홈므 스포츠 콜롱',
    nameOrg: 'Allure Homme Sport Cologne',
    brandName: '샤넬',
    brandId: 1,
    picture: 'https://fimgs.net/mdimg/perfume/375x500.1004.jpg',
    gender: 0,
    rate: null,
    longevity: 3.06,
    sillage: 2.22,
    picked: false,
    pick: 0,
    accord: [
      {
        scentId: 1,
        weight: 100.0,
        name: 'citrus',
        rgb: '#F9FF52',
      },
      {
        scentId: 2,
        weight: 62.0,
        name: 'fresh spicy',
        rgb: '#83C928',
      },
      {
        scentId: 5,
        weight: 61.0,
        name: 'aromatic',
        rgb: '#37a089',
      },
      {
        scentId: 9,
        weight: 54.0,
        name: 'woody',
        rgb: '#774414',
      },
      {
        scentId: 16,
        weight: 53.0,
        name: 'fresh',
        rgb: '#9be5ed',
      },
    ],
    note: [
      {
        noteListId: 135,
        perfumeId: 1004,
        type: 'Top',
        noteId: 77,
        noteName: 'Lemon',
      },
      {
        noteListId: 136,
        perfumeId: 1004,
        type: 'Top',
        noteId: 75,
        noteName: 'Bergamot',
      },
      {
        noteListId: 137,
        perfumeId: 1004,
        type: 'Top',
        noteId: 80,
        noteName: 'Orange',
      },
      {
        noteListId: 138,
        perfumeId: 1004,
        type: 'Top',
        noteId: 76,
        noteName: 'Grapefruit',
      },
      {
        noteListId: 139,
        perfumeId: 1004,
        type: 'Top',
        noteId: 82,
        noteName: 'Mandarin Orange',
      },
      {
        noteListId: 140,
        perfumeId: 1004,
        type: 'Top',
        noteId: 165,
        noteName: 'Aldehydes',
      },
      {
        noteListId: 141,
        perfumeId: 1004,
        type: 'Top',
        noteId: 17,
        noteName: 'Neroli',
      },
      {
        noteListId: 142,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 205,
        noteName: 'Fir',
      },
      {
        noteListId: 143,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 321,
        noteName: 'Spicy Notes',
      },
      {
        noteListId: 144,
        perfumeId: 1004,
        type: 'Middle',
        noteId: 390,
        noteName: 'Elemi',
      },
      {
        noteListId: 145,
        perfumeId: 1004,
        type: 'Base',
        noteId: 4,
        noteName: 'Musk',
      },
      {
        noteListId: 146,
        perfumeId: 1004,
        type: 'Base',
        noteId: 158,
        noteName: 'Pepper',
      },
      {
        noteListId: 147,
        perfumeId: 1004,
        type: 'Base',
        noteId: 41,
        noteName: 'Cedar',
      },
      {
        noteListId: 148,
        perfumeId: 1004,
        type: 'Base',
        noteId: 2,
        noteName: 'Vetiver',
      },
      {
        noteListId: 149,
        perfumeId: 1004,
        type: 'Base',
        noteId: 73,
        noteName: 'Tonka Bean',
      },
    ],
  },
];
