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
  id: '1',
  brand: '아쿠아 디 파르마',
  korName: '미르토 디 파나레아',
  engName: '미르토 디 파나레아',
  picture: 'src/assets/img/perfume1.png',
  accord: [
    { scentId: 1, name: '우디', rgb: 'brown' },
    { scentId: 2, name: '플로럴', rgb: 'pink' },
    { scentId: 2, name: '플로럴', rgb: 'pink' },
  ],
  noteList: [
    {
      noteListId: 1,
      noteId: 1,
      perfumeId: 1,
      type: '머틀, 바질, 이탈리안 레몬, 이탈리안 베르가못',
    },
    {
      noteListId: 2,
      noteId: 1,
      perfumeId: 1,
      type: '마린 브리즈, 자스민 앱솔루드, 다마스크 로즈 앱솔루트',
    },
    {
      noteListId: 3,
      noteId: 1,
      perfumeId: 1,
      type: '렌티스크 앱솔루트, 주니퍼, 버지니안 시더우드, 앰버',
    },
  ],
  pick: 1059,
  rate: 4.5,
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
            <RateBtn count={perfumeEx.rate} />
          </PerfumeIcon>
          <Brand>{perfumeEx.brand}</Brand>
          <PerfumeName>{perfumeEx.korName}</PerfumeName>
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
        <ScentNotes
          noteLists={perfumeEx.noteList}
          closeModal={handleCloseModal}
        />
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
