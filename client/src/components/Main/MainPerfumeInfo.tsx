import { styled } from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

interface perfumeInfoProps {
  perfumeInfo: PerfumeDetail;
}
const MainPerfumeInfo = ({ perfumeInfo }: perfumeInfoProps) => {
  let scentString = perfumeInfo.accord
    .slice(0, 3)
    .map((scent) => scent.name)
    .join(', ');
  if (scentString.length > 10) {
    scentString = scentString.slice(0, 10) + '..';
  }
  return (
    <PerfumeInfoBox>
      <Image>
        <img src={perfumeInfo.picture}></img>
        <PerfumeScent>
          {perfumeInfo.accord.slice(0, 3).map((scent, idx) => (
            <ScentBox key={idx} color={scent.rgb} />
          ))}
        </PerfumeScent>
      </Image>
      <InfoBox>
        <Brand>{perfumeInfo.brandName}</Brand>

        <PerfumeName>
          {perfumeInfo.name.length > 9
            ? perfumeInfo.name.slice(0, 8) + '..'
            : perfumeInfo.name}
        </PerfumeName>
      </InfoBox>
    </PerfumeInfoBox>
  );
};

export default MainPerfumeInfo;

const PerfumeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  flex-wrap: wrap;
  margin: 0;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 11px;
  margin-left: 5px;
`;

const Brand = styled.div`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const PerfumeName = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const PerfumeScent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 5px;
`;

const ScentBox = styled.div<{ color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const Image = styled.div`
  width: 100px;
  height: 120px;
  border-radius: 10px;
  background-color: var(--white-color);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 62px;
    height: 95px;
  }
`;
