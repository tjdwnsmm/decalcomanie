import React from 'react';
import styled from 'styled-components';
import MoreInfo from './Detail/MoreInfo';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

interface PerfumeImageSectionProps {
  perfume: PerfumeDetail;
}

const gender = ['For men', 'For women', 'For unisex'];
const PerfumeImageSection: React.FC<PerfumeImageSectionProps> = ({
  perfume,
}) => {
  return (
    <InfoSection>
      <PerfumeImg gender={perfume.gender}>
        <img src={perfume.picture} alt="Perfume" />
      </PerfumeImg>
      <Info>
        <Gender>{gender[perfume.gender]}</Gender>
        <MoreInfo longevity={perfume.longevity} sillage={perfume.sillage} />
      </Info>
    </InfoSection>
  );
};

export default PerfumeImageSection;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const InfoSection = styled.div`
  display: flex;
  margin: 30px 20px;
`;
const Gender = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: var(--primary-color);
  color: var(--white-color);
  margin: 3px -25px -2px 0px;
  padding: 3px 6px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
`;

const PerfumeImg = styled.div<{ gender: number }>`
  display: flex;
  flex-direction : column;
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
