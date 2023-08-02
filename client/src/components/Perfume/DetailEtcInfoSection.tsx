import React from 'react';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { styled } from 'styled-components';
import SeasonSuitabilityChart from './Detail/SeasonSuitabilityChart';
import { Progress, ProgressBar, Bar } from './Detail/MoreInfo';
import { CenterFrame } from '../../style';

interface DetailEtcProps {
  perfume: PerfumeDetail;
}

const gender = ['남성', '여성', '남녀모두'];
const season = ['봄', '여름', '가을', '겨울'];
const time = ['낮', '밤'];

const seasonSuitabilityData = [
  { season: season[0], degree: 80 },
  { season: season[1], degree: 90 },
  { season: season[2], degree: 70 },
  { season: season[3], degree: 60 },
];

const DetailEtcInfoSection = ({ perfume }: DetailEtcProps) => {
  return (
    <EtcFrame>
      <EtcTitle>추천해요 👍</EtcTitle>
      <EtcTxt>
        이 향수는 <span>{gender[perfume.gender]}</span>에게 인기있어요 !
      </EtcTxt>
      <EtcTxt>
        <span>{season[0]}</span>에 뿌리기 좋은 향수에요 !
      </EtcTxt>
      <SeasonSuitabilityChart data={seasonSuitabilityData} />
      <EtcTxt>
        {time[1]}보다는
        <span> {time[0]}</span>에 어울려요 !
      </EtcTxt>
      <CenterFrame2>
        <>🌞</>
        <ProgressBar2>
          <Progress2 score={7} total={10}>
            <Bar2></Bar2>
          </Progress2>
        </ProgressBar2>{' '}
        <>🌚</>
      </CenterFrame2>
    </EtcFrame>
  );
};

export default DetailEtcInfoSection;

const CenterFrame2 = styled(CenterFrame)`
  display: flex;
  align-items: center;
  justify-contents: center;
  gap: 10px;
  margin-left: -20px;
  margin-top: 20px;
`;

const EtcFrame = styled.div`
  margin: 40px 0 40px 30px;
`;
const EtcTitle = styled.div`
  font-size: 21px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const EtcTxt = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 6px;
  span {
    color: var(--primary-color);
    font-weight: 700;
  }
`;

const ProgressBar2 = styled(ProgressBar)`
  width: 270px;
  height: 16px;
  border-radius: 6px;
`;

const Progress2 = styled(Progress)`
  border-radius: 6px;
  box-shadow: none;
`;

const Bar2 = styled(Bar)`
  height: 11px;
  border-radius: 6px;
  background-image: var(--primary-color);
`;
