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
import axios, { USERID } from '../../api/apiController';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as InfoSvg } from '../../assets/icon/info.svg';

const PerfumeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<PerfumeDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`/perfume/detail/${USERID}/${id}`).then((res) => {
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

  const navigate = useNavigate();

  const handleFeed = () => {
    navigate(`/perfume-feed/${id}`);
  };

  const handleBack = () => {
    navigate('/search');
  };

  if (!perfume) {
    return null;
  }

  return (
    <Main>
      <PerfumeInfo>
        <LeftSection>
          <PerfumeIcon>
            <LikeBtn
              picked={perfume.picked}
              count={perfume.pick}
              likeUrl="/perfume/pick"
              dislikeUrl="/perfume/dispick"
              perfumeId={perfume.perfumeId}
              userId={USERID}
            />
            <RateBtn count={perfume.rate ? perfume.rate : 0} />
          </PerfumeIcon>
          <Brand>{perfume.brandName}</Brand>
          <PerfumeName>{perfume.name}</PerfumeName>
          <ScentList accord={perfume.accord.slice(0, 3)} />
        </LeftSection>
        <PerfumeImg>
          <img src={perfume.picture} />
        </PerfumeImg>
      </PerfumeInfo>
      <ScentBall
        first="white"
        second={perfume.accord[0].rgb}
        third={perfume.accord[1].rgb}
        accords={perfume.accord}
      />
      <CenterFrame>
        <AddInfo>
          <InfoSvg />
          볼을 클릭해보세요
        </AddInfo>
      </CenterFrame>
      <MoreInfo longevity={perfume.longevity} sillage={perfume.sillage} />
      <MarginFrame margin="30px 0 20px ">
        <CenterFrame>
          <ConfirmButton fontweight="600" onClick={handleOpenModal}>
            자세한 노트 정보 확인하기
          </ConfirmButton>
        </CenterFrame>
        <MarginFrame margin="10px"></MarginFrame>
        <CenterFrame>
          <ConfirmButton
            color="primary"
            background="primary"
            fontweight="500"
            onClick={handleFeed}
          >
            다른 사용자들의 글을 구경해보세요
          </ConfirmButton>
        </CenterFrame>
        <CenterFrame>
          <BackToList onClick={handleBack}>목록으로 돌아가기</BackToList>
        </CenterFrame>
      </MarginFrame>
      {modalOpen && (
        <ScentNotes noteLists={perfume.note} closeModal={handleCloseModal} />
      )}
    </Main>
  );
};

export default PerfumeDetail;

const AddInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 14px;
  margin: 20px 0;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const PerfumeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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
  width: 120px;
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

const BackToList = styled.div`
  color: var(--primary-color);
  margin-top: 18px;
  font-weight: 700;
`;
