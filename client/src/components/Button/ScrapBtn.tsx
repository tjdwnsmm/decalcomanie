import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { ReactComponent as UnScrapSvg } from '../../assets/icon/empty-scrap.svg';
import { ReactComponent as ScrapSvg } from '../../assets/icon/fill-scrap.svg';
import axios from '../../api/apiController';

interface ScrapProps {
  articleId: number;
  isScrap: boolean;
}

export const ScrapBtn = ({ isScrap, articleId }: ScrapProps) => {
  const [scrap, setScrap] = useState(false);

  useEffect(() => {
    setScrap(isScrap);
  }, [isScrap]);

  const handleScrapClick = async () => {
    try {
      if (!scrap) {
        await sendScrapStatus('/sns/bookmark');
      } else {
        await sendScrapStatus('/sns/cancelBookmark');
      }
      setScrap(!scrap);
      console.log(scrap);
    } catch (error) {
      console.error('Error sending scrap status:', error);
    }
  };

  const sendScrapStatus = async (url: string) => {
    try {
      const requestData = { articleId: articleId };
      const response = await axios.post(url, requestData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error, url);
      return [];
    }
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
