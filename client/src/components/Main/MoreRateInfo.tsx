import { styled } from 'styled-components';
import { PerfumeDetail, ScentDto } from '../../types/PerfumeInfoType';
import MainSwiper from '../Carousel/MainSwiper';

export const nowDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;
  return dateString;
};

const getScentString = (perfumeInfo: ScentDto[]) => {
  let scentString = perfumeInfo
    .slice(0, 3)
    .map((scent) => scent.name)
    .join(', ');
  if (scentString.length > 20) {
    scentString = scentString.slice(0, 20) + '...';
  }

  return scentString;
};

interface MoreInfoProps {
  title: string;
  perfumes: PerfumeDetail[];
  first?: boolean;
}

const MoreRateInfo = ({ title, perfumes, first }: MoreInfoProps) => {
  return (
    <>
      <RecommendTab first={first}>
        <Info>
          <div className="title">{title}</div>
          <div className="subtitle">{nowDate()} 기준</div>
        </Info>
      </RecommendTab>
      <MainSwiper perfumes={perfumes} />
    </>
  );
};

export default MoreRateInfo;

interface Props {
  first: boolean | undefined;
}
const RecommendTab = styled.div<Props>`
  display: flex;
  margin: 73px 0 15px 30px;
  margin: ${(props) => (props.first ? '48px 0 15px 30px' : '73px 0 15px 30px')};
`;

const Info = styled.div`
  .title {
    font-weight: 700;
    font-size: 22px;
  }
  .subtitle {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
`;
