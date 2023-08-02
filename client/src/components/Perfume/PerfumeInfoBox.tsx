import styled from 'styled-components';
import SecondaryBox from '../Box/SecondaryBox';
import { PerfumeDetail, ScentDto } from '../../types/PerfumeInfoType';
import { ReactComponent as StarSvg } from '../../assets/icon/fill-star.svg';

/**
 * @param {PerfumeDetail} PerfumeInfo
 * @summary
 *  TextInfo : 향수 브랜드명, 향수 명, 대표 향 계열 txt
 *  ImgBox : 향수 이미지
 */

interface PerfumeInfoBoxProps {
  feed: PerfumeDetail;
}

const extractAccordNames = (accord: ScentDto[]): string => {
  return accord
    .slice(0, 3)
    .map((scent) => scent.name)
    .join(', ');
};

const PerfumeInfoBox = ({ feed }: PerfumeInfoBoxProps) => (
  <>
    <PerfumeBox>
      <TextInfo>
        <PerfumeRate>
          <StarSvg />
          {feed.rate ? feed.rate : 4.2}
        </PerfumeRate>
        <PerfumeBrand>{feed.brandName}</PerfumeBrand>
        <PerfumeName>
          {feed.name.length > 14 ? feed.name.slice(0, 14) + '...' : feed.name}
        </PerfumeName>
        <PerfumeScent>{extractAccordNames(feed.accord)}</PerfumeScent>
      </TextInfo>
      <ImgBox>
        <img src={feed.picture}></img>
      </ImgBox>
    </PerfumeBox>
  </>
);

export default PerfumeInfoBox;

const PerfumeRate = styled.div`
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 3px;
  // color: var(--primary-color);
  margin-bottom: 10px;
`;
const PerfumeBox = styled(SecondaryBox)`
  justify-content: space-between;
  padding: 15px 20px;
  align-items: center;
`;
const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 18px;
  font-weight: 600;
`;
const PerfumeScent = styled.div`
  margin-top: 20px;
  color: var(--black-color);
  font-size: 13px;
  font-weight: 500;
`;
const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  background: var(--white-color);
  border-radius: 10px;
  justify-content: center;

  img {
    width: 70px;
  }
`;
