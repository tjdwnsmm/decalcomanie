import { styled } from 'styled-components';
import { useState } from 'react';
import { ReactComponent as UnScrapSvg } from '../../assets/icon/empty-scrap.svg';
import { ReactComponent as ScrapSvg } from '../../assets/icon/fill-scrap.svg';

export const ScrapBtn = () => {
  const [scrap, setScrap] = useState(false);

  const handleScrapClick = () => {
    setScrap(!scrap);
  };

  return (
    <>
      <Button onClick={handleScrapClick}>
        {scrap ? <ScrapSvg /> : <UnScrapSvg />}
      </Button>
    </>
  );
};

export const Button = styled.div`
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
`;
