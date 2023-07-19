import styled from 'styled-components';
import SecondaryBox from '../Box/SecondaryBox';
import { PerfumeInfo } from '../../types/FeedInfoType';

/**
 * @param {PerfumeInfo} PerfumeInfo
 * @summary
 *  TextInfo : 향수 브랜드명, 향수 명, 대표 향 계열 txt
 *  ImgBox : 향수 이미지
 */

const PerfumeInfoBox = ({ brand, name, scent, img }: PerfumeInfo) => (
  <>
    <PerfumeBox>
      <TextInfo>
        <PerfumeBrand>{brand}</PerfumeBrand>
        <PerfumeName>{name}</PerfumeName>
        <PerfumeScent>{scent}</PerfumeScent>
      </TextInfo>
      <ImgBox>
        <img src={img}></img>
      </ImgBox>
    </PerfumeBox>
  </>
);

export default PerfumeInfoBox;
const PerfumeBox = styled(SecondaryBox)`
  justify-content: space-around;
  padding: 25px 0px;
  align-items: center;
`;
const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 5px;
`;
const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 18px;
  font-weight: 600;
`;
const PerfumeScent = styled.div`
  margin-top: 28px;
  color: var(--black-color);
  font-size: 13px;
  font-weight: 400;
`;
const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  background: var(--white-color);
  border-radius: 10px;
  justify-content: center;
`;
