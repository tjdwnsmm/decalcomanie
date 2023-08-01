import { Main } from '../../style';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { useEffect, useState } from 'react';
import { ScentNotes } from '../../components/Perfume/Detail/ScentNotes';
import axios, { USERID } from '../../api/apiController';
import { useNavigate, useParams } from 'react-router-dom';
import PerfumeInfoSection from '../../components/Perfume/PerfumeInfoSection';
import PerfumeImageSection from '../../components/Perfume/PerfumeImageSection';
import ActionButtons from '../../components/Perfume/DetailActionButtons';
import DetailEtcInfoSection from '../../components/Perfume/DetailEtcInfoSection';

const PerfumeDetailPage: React.FC = () => {
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
      {/* Use the imported components */}
      <PerfumeInfoSection perfume={perfume} />
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
