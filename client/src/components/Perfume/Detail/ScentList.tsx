import { ScentDto } from '../../../types/PerfumeInfoType';
import { styled } from 'styled-components';

interface ScentListProp {
  accord: ScentDto[];
}
const ScentList = ({ accord }: ScentListProp) => {
  return (
    <Scent>
      {accord.map((scent) => (
        <AccordBox rgb={scent.rgb}>{scent.name}</AccordBox>
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

interface AccordProps {
  rgb: string;
}

const calculateBrightness = (rgb: string) => {
  const hexToRgb = (hex: string): number[] => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const [r, g, b] = rgb.startsWith('#')
    ? hexToRgb(rgb.slice(1))
    : rgb.split(',').map((c) => parseInt(c.trim(), 10));

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128 ? 'dark' : 'light';
};

const AccordBox = styled.div<AccordProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => props.rgb};
  color: ${(props) =>
    calculateBrightness(props.rgb) === 'light'
      ? 'var(--black-color)'
      : 'var(--white-color)'};
  padding: 2px 10px;
  height: 24px;
  letter-spacing: 0.8px;
  margin: 5px 5px 0 0;
`;
