import { useEffect, useState } from 'react';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { styled } from 'styled-components';
import SeasonSuitabilityChart, {
  SeasonSuitability,
} from './Detail/SeasonSuitabilityChart';
import { Progress, ProgressBar, Bar } from './Detail/MoreInfo';
import { CenterFrame } from '../../style';

interface DetailEtcProps {
  perfume: PerfumeDetail;
}

const gender = ['남성', '여성', '남녀모두'];
const season = ['봄', '여름', '가을', '겨울'];
const time = [
  ['낮', '🌞'],
  ['밤', '🌚'],
];

function calculateRatioScore(dayWeight: number, nightWeight: number): number {
  const totalScore = 10;
  const minWeight = Math.min(dayWeight, nightWeight);
  const maxWeight = Math.max(dayWeight, nightWeight);

  if (maxWeight === 0) {
    return 0;
  }

  const ratio = (maxWeight / (maxWeight + minWeight)) * 100;
  return ratio / totalScore;
}

const DetailEtcInfoSection = ({ perfume }: DetailEtcProps) => {
  const [maxScore, setMaxScoreTime] = useState(0);
  const [betterTimeIdx, setBetterTimeIdx] = useState(0);
  const [betterWeatherIdx, setBetterWeatherIdx] = useState<number[]>([]);
  const [perfumeWeatherWeights, setWeatherWeights] = useState<
    SeasonSuitability[]
  >([]);

  useEffect(() => {
    //계절정보 업데이트
    // if (perfume.occasion.length !== 0) {
    const perfumeOccasionWeights: number[] = [
      perfume.spring,
      perfume.summer,
      perfume.fall,
      perfume.winter,
    ];

    const sum = perfumeOccasionWeights.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const transformedData = perfumeOccasionWeights.map((item, idx) => {
      const degree = item; //(item / sum) * 100;
      return { season: season[idx], degree };
    });

    const maxWeight = Math.max(...perfumeOccasionWeights);

    const maxWeightIndices: number[] = [];
    perfumeOccasionWeights.forEach((weight, index) => {
      if (weight === maxWeight) {
        maxWeightIndices.push(index);
      }
    });

    setWeatherWeights(transformedData);
    setBetterWeatherIdx(maxWeightIndices);

    //시간정보 업데이트
    perfume.night > perfume.day ? setBetterTimeIdx(1) : setBetterTimeIdx(0);

    //시간 비율 계산
    setMaxScoreTime(calculateRatioScore(perfume.night, perfume.day));
    // }
  }, []);

  return (
    <EtcFrame>
      <EtcTitle>이런 날 추천해요 👍</EtcTitle>
      <>
        <EtcTxt>
          <span>
            {betterWeatherIdx.map((index) => season[index]).join(', ')}
          </span>
          에 뿌리기 좋은 향수에요 !
        </EtcTxt>
        <SeasonSuitabilityChart data={perfumeWeatherWeights} />
        <EtcTxt>
          {time[Math.abs(1 - betterTimeIdx)][0]}보다는
          <span> {time[betterTimeIdx][0]}</span>에 어울려요 !
        </EtcTxt>
        <CenterFrame2>
          <>{time[betterTimeIdx][1]}</>
          <ProgressBar2>
            <Progress2 score={maxScore} total={10}>
              <Bar2></Bar2>
            </Progress2>
          </ProgressBar2>{' '}
          <>{time[Math.abs(1 - betterTimeIdx)][1]}</>
        </CenterFrame2>
      </>
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
