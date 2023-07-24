import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import { styled } from 'styled-components';
import { LikeBtn } from '../../components/Button/LikeBtn';
import { RateBtn } from '../../components/Button/RateBtn';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import ScentList from '../../components/Perfume/Detail/ScentList';
import ScentBall from '../../components/Perfume/Detail/ScentBall';
import { useState } from 'react';
import { ScentNotes } from '../../components/Perfume/Detail/ScentNotes';

const perfumeEx: PerfumeDetail = {
  perfumeId: 11,
  nameOrg: 'Chanel N019',
  brandName: 'Chanel',
  brandId: 1,
  picture: '이미지 없음 이미지',
  gender: 1,
  rate: null,
  longevity: 3.18,
  sillage: 2.36,
  pick: 0,
  accord: [
    {
      scentId: 3,
      weight: 0.0,
      name: 'green',
      rgb: '#0E8C1D',
    },
    {
      scentId: 20,
      weight: 0.0,
      name: 'earthy',
      rgb: '#544838',
    },
    {
      scentId: 9,
      weight: 0.0,
      name: 'woody',
      rgb: '#774414',
    },
    {
      scentId: 27,
      weight: 0.0,
      name: 'iris',
      rgb: '#b7a7d7',
    },
    {
      scentId: 10,
      weight: 0.0,
      name: 'powdery',
      rgb: '#EEDDCC',
    },
    {
      scentId: 5,
      weight: 0.0,
      name: 'aromatic',
      rgb: '#37a089',
    },
    {
      scentId: 11,
      weight: 0.0,
      name: 'floral',
      rgb: '#FF5F8D',
    },
    {
      scentId: 21,
      weight: 0.0,
      name: 'mossy',
      rgb: '#5B6B32',
    },
    {
      scentId: 6,
      weight: 0.0,
      name: 'white floral',
      rgb: '#edf2fb',
    },
    {
      scentId: 2,
      weight: 0.0,
      name: 'fresh spicy',
      rgb: '#83C928',
    },
  ],
  note: [
    {
      noteListId: 284,
      perfumeId: 11,
      type: 'Top',
      noteId: 45,
      noteName: 'Galbanum',
    },
    {
      noteListId: 285,
      perfumeId: 11,
      type: 'Top',
      noteId: 22,
      noteName: 'Hyacinth',
    },
    {
      noteListId: 286,
      perfumeId: 11,
      type: 'Top',
      noteId: 75,
      noteName: 'Bergamot',
    },
    {
      noteListId: 287,
      perfumeId: 11,
      type: 'Top',
      noteId: 17,
      noteName: 'Neroli',
    },
    {
      noteListId: 288,
      perfumeId: 11,
      type: 'Middle',
      noteId: 11,
      noteName: 'Iris',
    },
    {
      noteListId: 289,
      perfumeId: 11,
      type: 'Middle',
      noteId: 101,
      noteName: 'Orris Root',
    },
    {
      noteListId: 290,
      perfumeId: 11,
      type: 'Middle',
      noteId: 105,
      noteName: 'Rose',
    },
    {
      noteListId: 291,
      perfumeId: 11,
      type: 'Middle',
      noteId: 109,
      noteName: 'Lily of the Valley',
    },
    {
      noteListId: 292,
      perfumeId: 11,
      type: 'Middle',
      noteId: 18,
      noteName: 'Narcissus',
    },
    {
      noteListId: 293,
      perfumeId: 11,
      type: 'Middle',
      noteId: 14,
      noteName: 'Jasmine',
    },
    {
      noteListId: 294,
      perfumeId: 11,
      type: 'Middle',
      noteId: 24,
      noteName: 'Ylang Ylang',
    },
    {
      noteListId: 295,
      perfumeId: 11,
      type: 'Base',
      noteId: 39,
      noteName: 'Oakmoss',
    },
    {
      noteListId: 296,
      perfumeId: 11,
      type: 'Base',
      noteId: 2,
      noteName: 'Vetiver',
    },
    {
      noteListId: 297,
      perfumeId: 11,
      type: 'Base',
      noteId: 156,
      noteName: 'Leather',
    },
    {
      noteListId: 298,
      perfumeId: 11,
      type: 'Base',
      noteId: 41,
      noteName: 'Cedar',
    },
    {
      noteListId: 299,
      perfumeId: 11,
      type: 'Base',
      noteId: 4,
      noteName: 'Musk',
    },
    {
      noteListId: 300,
      perfumeId: 11,
      type: 'Base',
      noteId: 33,
      noteName: 'Sandalwood',
    },
  ],
};
const PerfumeDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Main>
      <PerfumeInfo>
        <LeftSection>
          <PerfumeIcon>
            <LikeBtn count={perfumeEx.pick}></LikeBtn>
            <RateBtn count={perfumeEx.rate ? perfumeEx.rate : 0} />
          </PerfumeIcon>
          <Brand>{perfumeEx.brandName}</Brand>
          <PerfumeName>{perfumeEx.nameOrg}</PerfumeName>
          <ScentList accord={perfumeEx.accord.slice(0, 3)} />
        </LeftSection>
        <PerfumeImg>
          <img src="src/assets/img/perfume1.png" />
        </PerfumeImg>
      </PerfumeInfo>
      <ScentBall
        first="white"
        second={perfumeEx.accord[0].rgb}
        third={perfumeEx.accord[1].rgb}
      />
      <MarginFrame margin="40px 0 0 ">
        <CenterFrame>
          <ConfirmButton fontweight="600" onClick={handleOpenModal}>
            자세한 노트 정보 확인하기
          </ConfirmButton>
        </CenterFrame>
        <MarginFrame margin="10px"></MarginFrame>
        <CenterFrame>
          <ConfirmButton color="primary" background="primary" fontweight="500">
            다른 사용자들의 글을 구경해보세요
          </ConfirmButton>
        </CenterFrame>
      </MarginFrame>
      {modalOpen && (
        <ScentNotes noteLists={perfumeEx.note} closeModal={handleCloseModal} />
      )}
    </Main>
  );
};

export default PerfumeDetail;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const PerfumeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const PerfumeIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 7px;
`;

const PerfumeImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 178px;
  border-radius: 10px;
  background-color: var(--white-color);
  object-fit: cover;
  img{
    width: 100px;
  }}
  
`;

const Brand = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 4px;
`;
const PerfumeName = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
