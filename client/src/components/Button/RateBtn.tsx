import { styled } from 'styled-components';
import { ReactComponent as StarSvg } from '../../assets/icon/empty-star.svg';

interface RateBtnProps {
  count: number | string;
}

/** @param {number} count : 평점*/
export const RateBtn = ({ count }: RateBtnProps) => {
  return (
    <Button>
      <StarSvg2 />
      {count}
    </Button>
  );
};

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
`;
const StarSvg2 = styled(StarSvg)`
  width: 20px;
  height: 20px;
`;
