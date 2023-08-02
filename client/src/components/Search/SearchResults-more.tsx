import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import SecondaryBox from '../Box/SecondaryBox';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import Spinner from '../common/Spinner';
import { useNavigate } from 'react-router-dom';
import axios, { USERID } from '../../api/apiController';

interface SearchResultsProps {
  results: PerfumeDetail[] | null;
  isButton: boolean;
  addUrl: string;
}

/**
 * @param results : API 호출 결과 데이터
 * @param isButton : 등록 버튼 있는 지 없는 지 여부
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isButton,
  addUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    console.log(results);
  }, [results]);

  const handleClick = (perfumeId: number) => {
    navigate(`/perfume-detail/${perfumeId}`);
  };

  const handleAddPerfume = (perfumeId: number) => {
    axios
      .post(addUrl, { perfumeId: perfumeId, userId: USERID })
      .then((res) => console.log(res.data));
    navigate(`/my-drawer`);
  };

  return (
    <>
      {!loading && results?.length ? (
        <PerfumeList>
          {results.map((feed) => (
            <div key={feed.perfumeId}>
              <PerfumeBox>
                <PerfumeInfo onClick={() => handleClick(feed.perfumeId)}>
                  <ImgBox>
                    <img src={feed.picture}></img>
                  </ImgBox>
                  <TextInfo>
                    <PerfumeBrand>{feed.brandName}</PerfumeBrand>
                    <PerfumeName>
                      {feed.name.length > 9
                        ? feed.name.slice(0, 9) + '..'
                        : feed.name}
                    </PerfumeName>
                    <PerfumeScent>
                      {feed.accord.slice(0, 3).map((scent, idx) => (
                        <ScentBox key={idx} color={scent.rgb} />
                      ))}
                    </PerfumeScent>
                  </TextInfo>
                </PerfumeInfo>
                <ButtonFrame>
                  {isButton && (
                    <Button onClick={() => handleAddPerfume(feed.perfumeId)}>
                      추가하기
                    </Button>
                  )}
                </ButtonFrame>
              </PerfumeBox>
              <MarginFrame margin="10px 0" />
            </div>
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

const PerfumeScent = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -12px;
  gap: 4px;
`;

const ScentBox = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const PerfumeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 14px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 2px;
`;

const PerfumeBox = styled(SecondaryBox)`
  padding: 15px;
  flex-direction: column;
  width: 140px;
  height: 185px;
  flex: 1 0 calc(50% - 20px);
  overflow: hidden;
`;

const PerfumeInfo = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
}
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 15px 12px;
`;
const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 16.2px;
  font-weight: 600;
`;

const ImgBox = styled.div`
  width: 90%;
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
