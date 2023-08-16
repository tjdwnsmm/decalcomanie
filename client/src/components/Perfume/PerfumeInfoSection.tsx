import React from 'react';
import styled from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { LikeBtn } from '../Button/LikeBtn';
import { RateBtn } from '../Button/RateBtn';
import ScentList from './Detail/ScentList';
import ScentBall from './Detail/ScentBall';

interface PerfumeInfoSectionProps {
  perfume: PerfumeDetail;
}

const PerfumeInfoSection: React.FC<PerfumeInfoSectionProps> = ({ perfume }) => {
  return (
    <PerfumeInfo>
      <LeftSection>
        <PerfumeIcon>
          <LikeBtn
            picked={perfume.picked}
            count={perfume.pick}
            likeUrl="/perfume/pick"
            dislikeUrl="/perfume/pick"
            perfumeId={perfume.perfumeId}
          />
          <RateBtn count={perfume.rate ? perfume.rate.toFixed(1) : 0} />
        </PerfumeIcon>
        <Brand>{perfume.brandName}</Brand>
        <PerfumeName>{perfume.name}</PerfumeName>
        <ScentList accord={perfume.accord.slice(0, 3)} />
      </LeftSection>
      <ScentBall
        first="white"
        second={perfume.accord[0].rgb}
        third={perfume.accord[1].rgb}
        accords={perfume.accord}
      />
    </PerfumeInfo>
  );
};

export default PerfumeInfoSection;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
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

const Brand = styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 4px;
`;
const PerfumeName = styled.div`
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
