import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import SecondaryBox from '../Box/SecondaryBox';
import { PerfumeDetail, ScentDto } from '../../types/PerfumeInfoType';
import Spinner from '../common/Spinner';

interface SearchResultsProps {
  results: PerfumeDetail[] | null;
  isButton: boolean;
}

/**
 * @param results : API 호출 결과 데이터
 * @param isButton : 등록 버튼 있는 지 없는 지 여부
 */
const SearchResults: React.FC<SearchResultsProps> = ({ results, isButton }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [results]);

  return (
    <>
      {!loading && results?.length ? (
        <PerfumeList>
          <MarginFrame margin="-4px 0" />
          {results.map((feed) => (
            <>
              <PerfumeBox>
                <PerfumeInfo>
                  <TextInfo>
                    <PerfumeBrand>{feed.brandName}</PerfumeBrand>
                    <PerfumeName>{feed.nameOrg}</PerfumeName>
                    <PerfumeScent>
                      {feed.accord.splice(0, 3).map((scent: ScentDto, idx) => (
                        <Scent>
                          {scent.name}
                          {idx === 2 ? '' : ', '}
                        </Scent>
                      ))}
                    </PerfumeScent>
                  </TextInfo>
                  <ImgBox>
                    <img src={feed.picture}></img>
                  </ImgBox>
                </PerfumeInfo>
                <ButtonFrame>
                  {isButton && <Button>추가하기</Button>}
                </ButtonFrame>
              </PerfumeBox>
              <MarginFrame margin="10px 0" />
            </>
          ))}
        </PerfumeList>
      ) : (
        <MarginFrame margin="100px auto">
          <Spinner />
        </MarginFrame>
      )}
    </>
  );
};

export default SearchResults;

const PerfumeList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const PerfumeBox = styled(SecondaryBox)`
  padding: 25px 15px;
  flex-direction: column;
`;

const PerfumeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
}
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
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

  img {
    width: 80px;
  }
`;

const ButtonFrame = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Button = styled.button`
  border: none;
  padding: 8px 8px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: var(--primary-color);
  background: var(--white-color);
  border-radius: 5px;
  margin: 15px 0px -10px;

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
`;

const Scent = styled.span``;
/*
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <>
              <li key={index}>{result.brand}</li>
              <li key={index}>{result.name}</li>
            </>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
*/
