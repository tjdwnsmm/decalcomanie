import { useState } from 'react';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import MainRecommend from '../../components/Main/MainRecommend';
import NoRecommend from '../../components/Main/NoRecommend';
import FloatingDrawerBtn from '../../components/Button/FloatingDrawerBtn';
import BottomNav from '../../components/common/BottomNav';
import { useNavigate } from 'react-router-dom';
import MainCarousel from '../../components/Carousel/MainCarousel';
import { styled } from 'styled-components';

const MainPage = () => {
  const [isDrawer, setDrawer] = useState(true);
  const navigate = useNavigate();

  const handleSearchPerfume = () => {
    navigate('/search-myperfume');
  };

  return (
    <Main>
      {isDrawer ? (
        <Frame>
          <MainRecommend />
          <MainCarousel perfumes={perfumes} />
        </Frame>
      ) : (
        <Frame>
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
        </Frame>
      )}
      <FloatingDrawerBtn />
      <BottomNav />
    </Main>
  );
};

export default MainPage;

const Frame = styled.div`
  padding-bottom: 130px;
  overflow: scroll;
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
    brandName: 'Chanel',
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
