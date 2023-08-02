import { useState } from 'react';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import NoRecommend from '../../components/Main/NoRecommend';
import FloatingDrawerBtn from '../../components/Button/FloatingDrawerBtn';
import BottomNav from '../../components/common/BottomNav';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { LikeBtn } from '../../components/Button/LikeBtn';
import { USERID } from '../../api/apiController';
import { ScentDto } from '../../types/PerfumeInfoType';
import MainSwiper from '../../components/Carousel/MainSwiper';

const nowDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;
  return dateString;
};

const season = '여름';
const MainPage = () => {
  const [isDrawer, setDrawer] = useState(true);
  const navigate = useNavigate();

  const handleSearchPerfume = () => {
    navigate('/search-myperfume');
  };

  const getScentString = (perfumeInfo: ScentDto[]) => {
    let scentString = perfumeInfo
      .slice(0, 3)
      .map((scent) => scent.name)
      .join(', ');
    if (scentString.length > 20) {
      scentString = scentString.slice(0, 20) + '...';
    }

    return scentString;
  };

  return (
    <Main>
      <Frame>
        {isDrawer && <MainRecommend />}
        <BackFrame>
          {isDrawer ? (
            <>
              <MainSwiper perfumes={perfumes} />
            </>
          ) : (
            <>
              <NoRecommend />
              <MarginFrame margin="20px auto">
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
          <RecommendTab>
            <Info>
              <div className="title">{season}에 잘 어울려요</div>
              <div className="subtitle">{nowDate()} 기준</div>
              {perfumes.map((perfume) => (
                <PerfumeEach>
                  <img src={perfume.picture} alt="" />
                  <div className="info">
                    <div className="txt">
                      <div className="brand">{perfume.brandName}</div>
                      <div className="title">{perfume.name}</div>
                      <div className="scent">
                        {getScentString(perfume.accord)}
                      </div>
                    </div>
                    <LikeBtn
                      count={perfume.pick}
                      dislikeUrl="/perfume/pick"
                      likeUrl="/perfume/pick"
                      picked={perfume.picked}
                      perfumeId={perfume.perfumeId}
                      userId={USERID}
                    />
                  </div>
                </PerfumeEach>
              ))}
            </Info>
          </RecommendTab>
        </BackFrame>
      </Frame>
      <FloatingDrawerBtn />
      <BottomNav />
    </Main>
  );
};

export default MainPage;

const BackFrame = styled.div`
  background-color: var(--background-color);
  padding: 10px 0 120px;
  border-radius: 25px 25px 0 0;
`;
const Frame = styled.div`
  overflow: scroll;
  background: linear-gradient(
    180deg,
    rgba(249, 202, 245, 0.64) 0%,
    rgba(209, 167, 226, 0.74) 10.67%,
    #6d51b4 28%
  );
`;

const RecommendTab = styled.div`
  display: flex;
  margin: 45px 0 0 30px;
`;

const Info = styled.div`
  .title {
    font-weight: 700;
    font-size: 23px;
  }
  .subtitle {
    font-size: 11px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
`;

const PerfumeEach = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 55px;
    border-radius: 10px;
  }

  .info {
    width: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .title {
    font-size: 15px;
  }

  .brand {
    font-size: 11px;
    font-weight: 600;
  }

  .scent {
    margin-top: 8px;
  }
`;
const perfumes = [
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
