import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import { styled } from 'styled-components';
import { LikeBtn } from '../../components/Button/LikeBtn';
import { RateBtn } from '../../components/Button/RateBtn';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import ScentList from '../../components/Perfume/Detail/ScentList';
import ScentBall from '../../components/Perfume/Detail/ScentBall';
import { useEffect, useState } from 'react';
import { ScentNotes } from '../../components/Perfume/Detail/ScentNotes';
import MoreInfo from '../../components/Perfume/Detail/MoreInfo';
import axios from '../../api/apiController';

const PerfumeDetail = () => {
  const [perfume, setPerfume] = useState<PerfumeDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('/perfume/detail/11').then((res) => {
      setPerfume(res.data);
      console.log(res.data);
    });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!perfume) {
    return null;
  }

  return (
    <Main>
      <PerfumeInfo>
        <LeftSection>
          <PerfumeIcon>
            <LikeBtn count={perfume.pick}></LikeBtn>
            <RateBtn count={perfume.rate ? perfume.rate : 0} />
          </PerfumeIcon>
          <Brand>{perfume.brandName}</Brand>
          <PerfumeName>{perfume.nameOrg}</PerfumeName>
          <ScentList accord={perfume.accord.slice(0, 3)} />
        </LeftSection>
        <PerfumeImg>
          <img src="src/assets/img/perfume1.png" />
        </PerfumeImg>
      </PerfumeInfo>
      <ScentBall
        first="white"
        second={perfume.accord[0].rgb}
        third={perfume.accord[1].rgb}
      />
      <MoreInfo longevity={perfume.longevity} sillage={perfume.sillage} />
      <MarginFrame margin="30px 0 20px ">
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
        <ScentNotes noteLists={perfume.note} closeModal={handleCloseModal} />
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
  margin-top: 20px;
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
