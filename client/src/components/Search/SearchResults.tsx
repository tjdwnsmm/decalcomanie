import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import SecondaryBox from '../Box/SecondaryBox';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import Spinner from '../common/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/apiController';
import { ReactComponent as StarSvg } from '../../assets/icon/fill-star.svg';

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
  const [addLoading, setAddloading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    //console.log(results);
  }, [results]);

  const navigate = useNavigate();
  const handleClick = (perfumeId: number) => {
    navigate(`/perfume-detail/${perfumeId}`);
  };

  const location = useLocation();

  const handleAddPerfume = (perfumeId: number) => {
    if (location.state && location.state.nowLocation === 'post') {
      const existingData = localStorage.getItem('postPerfume');
      if (existingData) {
        try {
          const parsedData = JSON.parse(existingData);

          const existingPerfume = parsedData.find(
            (item: any) => item.perfumeId === perfumeId,
          );

          if (existingPerfume) {
            alert('이미 추가된 향수입니다.');
          } else if (parsedData.length >= 5) {
            alert('더 이상 향수를 추가할 수 없습니다 (최대 5개)');
            navigate('/post');
          } else {
            parsedData.push({ perfumeId: perfumeId, rate: 0 });
            localStorage.setItem('postPerfume', JSON.stringify(parsedData));
            navigate(`/post`, { state: { perfumeId: perfumeId } });
          }
        } catch (error) {
          console.error('Error parsing existing data:', error);
        }
      } else {
        const newData = [{ perfumeId: perfumeId, rate: 0 }];
        localStorage.setItem('postPerfume', JSON.stringify(newData));
        navigate(`/post`, { state: { perfumeId: perfumeId } });
      }
    } else {
      axios.get('/user/perfume').then((res) => {
        const data = res.data;
        if (data && data.length > 0) {
          const existingPerfume = data.find(
            (item: any) => item.perfumeId === perfumeId,
          );

          if (existingPerfume) {
            alert('이미 추가된 향수입니다');
            navigate('/my-drawer');
          } else {
            setAddloading(true);
            axios.post(addUrl, { perfumeId: perfumeId }).then((res) => {
              //console.log('Data added!', res.data);
              setAddloading(false);
              navigate(`/my-drawer`);
            });
          }
        } else {
          setAddloading(true);
          axios.post(addUrl, { perfumeId: perfumeId }).then((res) => {
            //console.log('Data added!', res.data);
            setAddloading(false);
            navigate(`/my-drawer`);
          });
        }
      });
    }
  };

  return (
    <>
      {!addLoading && !loading && results?.length ? (
        <PerfumeList>
          <MarginFrame margin="-4px 0" />
          {results.map((feed) => (
            <div key={feed.perfumeId}>
              <PerfumeBox>
                <PerfumeInfo onClick={() => handleClick(feed.perfumeId)}>
                  <TextInfo>
                    <PerfumeRate>
                      <StarSvg />
                      {feed.rate ? feed.rate : 0}
                    </PerfumeRate>
                    <PerfumeBrand>{feed.brandName}</PerfumeBrand>
                    <PerfumeName>
                      {feed.name.length > 12
                        ? feed.name.slice(0, 12) + '...'
                        : feed.name}
                    </PerfumeName>
                    <PerfumeScent>
                      {feed.accord.slice(0, 3).map((scent, idx) => (
                        <span key={idx}>
                          {scent.name}
                          {idx === 2 ? '' : ', '}
                        </span>
                      ))}
                    </PerfumeScent>
                  </TextInfo>
                  <ImgBox>
                    <img src={feed.picture}></img>
                  </ImgBox>
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
          <Spinner info="향수정보를 로딩중입니다" />
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

const PerfumeRate = styled.div`
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 3px;
  // color: var(--primary-color);
  margin-bottom: 10px;
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
  margin-top: 28px;
  color: var(--black-color);
  font-size: 14px;
  font-weight: 600;
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
