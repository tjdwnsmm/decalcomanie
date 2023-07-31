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
  if (scentString.length > 8) {
    scentString = scentString.slice(0, 8) + '...';
  }
  return (
    <PerfumeInfoBox>
      <Image>
        <img src={perfumeInfo.picture}></img>
      </Image>
      <InfoBox>
        <Brand>{perfumeInfo.brandName}</Brand>
        <Info>
          <PerfumeName>
            {perfumeInfo.name.length > 8
              ? perfumeInfo.name.slice(0, 8) + '...'
              : perfumeInfo.name}
          </PerfumeName>
          <PerfumeScent>{scentString}</PerfumeScent>
        </Info>
      </InfoBox>
    </PerfumeInfoBox>
  );
};

export default MainPerfumeInfo;

const PerfumeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 65px;
  margin-top: 11px;
`;

const Brand = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 261px;
  align-items: center;
`;

const PerfumeName = styled.div`
  font-size: 18px;
  font-weight: 700;
  width: 70%;
`;

const PerfumeScent = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: right;
`;

const Image = styled.div`
  width: 271px;
  height: 271px;
  border-radius: 10px;
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 39px auto 0;
  img {
    width: 130px;
  }
`;
