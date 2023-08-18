import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import { Main } from '../../style';
import { ReactComponent as NextArrowSvg } from '../../assets/icon/nextArrow.svg';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { ScentNotes } from '../../components/Perfume/Detail/ScentNotes';
import PerfumeInfoSection from '../../components/Perfume/PerfumeInfoSection';
import PerfumeImageSection from '../../components/Perfume/PerfumeImageSection';
import ActionButtons from '../../components/Perfume/DetailActionButtons';
import DetailEtcInfoSection from '../../components/Perfume/DetailEtcInfoSection';
import { ReactComponent as LeftArrow } from '../../assets/img/close.svg';

const PerfumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<PerfumeDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`/perfume/detail/${id}`).then((res) => {
      setPerfume(res.data);
      //console.log(res.data);
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

  const handleSearch = (perfumeName: string) => {
    const searchName = perfumeName.replace(/\s+/g, '+');
    const newWindow = window.open('about:blank');
    if (newWindow) {
      newWindow.location.href = `https://www.google.com/search?q=${searchName}&tbm=shop`;
    }
  };
  const handleLeftArrowClick = () => {
    navigate(-1);
  };

  if (!perfume) {
    return null;
  }

  return (
    <Main>
      <Button onClick={handleLeftArrowClick}>
        <LeftArrow />
      </Button>
      <PerfumeInfoSection perfume={perfume} />
      <SearchPerfume
        onClick={() => {
          handleSearch(perfume.nameOrg);
        }}
      >
        향수 가격 정보 보러가기
        <NextArrowSvg />
      </SearchPerfume>
      <PerfumeImageSection perfume={perfume} />
      <DetailEtcInfoSection perfume={perfume} />
      <ActionButtons
        handleOpenModal={handleOpenModal}
        handleFeed={handleFeed}
        handleBack={handleBack}
      />

      {modalOpen && (
        <ScentNotes noteLists={perfume.note} closeModal={handleCloseModal} />
      )}
    </Main>
  );
};

export default PerfumeDetailPage;

const Button = styled.button`
  background: none;
  border: none;
  margin: 20px 18px 1px;
  cursor: pointer;
  position: relative;
  left: 85%;
`;
const SearchPerfume = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  margin: 25px 20px -20px 20px;
  width: fit-content;
  height: fit-content;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 700;
  gap: 5px;
  cursor: pointer;
  svg {
    margin-top: 1px;
  }
  svg g path {
    stroke: var(--primary-color);
    stroke-width: 2;
  }
`;
