import { ScentDto } from '../../../types/PerfumeInfoType';
import { styled } from 'styled-components';

interface ScentListProp {
  accord: ScentDto[];
}
const ScentList = ({ accord }: ScentListProp) => {
  return (
    <Scent>
      {accord.map((scent) => (
        <AccordBox>{scent.name}</AccordBox>
      ))}
    </Scent>
  );
};

export default ScentList;

const Scent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top : 15px;
}
`;

const AccordBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 400;
  background: var(--primary-color);
  color: var(--white-color);
  // width: 60px;
  padding: 2px 10px;
  height: 24px;
  letter-spacing: 0.8px;
  margin: 5px 5px 0 0;
`;
