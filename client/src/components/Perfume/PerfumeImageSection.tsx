import React from 'react';
import styled from 'styled-components';
import MoreInfo from './Detail/MoreInfo';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

interface PerfumeImageSectionProps {
  perfume: PerfumeDetail;
}

const PerfumeImageSection: React.FC<PerfumeImageSectionProps> = ({
  perfume,
}) => {
  return (
    <InfoSection>
      <PerfumeImg>
        <img src={perfume.picture} alt="Perfume" />
      </PerfumeImg>
      <MoreInfo longevity={perfume.longevity} sillage={perfume.sillage} />
    </InfoSection>
  );
};

export default PerfumeImageSection;
const InfoSection = styled.div`
  display: flex;
  margin: 30px 20px;
`;

const PerfumeImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 158px;
  border-radius: 10px;
  background-color: var(--white-color);
  object-fit: cover;
  img{
    width: 100px;
  }}
  
`;
