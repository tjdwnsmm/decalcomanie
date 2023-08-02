import { styled } from 'styled-components';
import { ScentDto } from '../../types/PerfumeInfoType';

interface ScentListProp {
  accord: ScentDto[];
}

const MainScent = ({ accord }: ScentListProp) => {
  return (
    <Scent>
      {accord.map((scent, idx) => (
        <AccordBox key={idx} rgb={scent.rgb}>
          {scent.name}
        </AccordBox>
      ))}
    </Scent>
  );
};

export default MainScent;

const Scent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
`;

interface AccordProps {
  rgb: string;
}

const AccordBox = styled.div<AccordProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 14.5px;
  font-weight: 800;
  background: var(--white-color);
  color: var(--primary-color);
  padding: 3px 10px;
  height: 24px;
  letter-spacing: 1.4px;
  margin: 0px 8px 0 0;
`;
