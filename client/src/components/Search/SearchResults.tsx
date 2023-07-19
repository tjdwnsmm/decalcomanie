import React from 'react';
import { PerfumeResult } from '../../pages/SearchPage/SearchTabPage';
import { FeedProps } from '../../types/FeedInfoType';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import SecondaryBox from '../Box/SecondaryBox';

interface SearchResultsProps {
  results: PerfumeResult[];
  isButton: boolean;
}

//API 호출 전 임시데이터
const feeds: FeedProps[] = [
  {
    perfumeInfo: {
      name: '탐다오',
      brand: '딥디크',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
  {
    perfumeInfo: {
      name: '미르토 디 파나레아',
      brand: '아쿠아 디 파르마',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
  {
    perfumeInfo: {
      name: '집시 워터',
      brand: '바이레도',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 ...',
  },
];

/**
 * @param results : API 호출 결과 데이터
 * @param isButton : 등록 버튼 있는 지 없는 지 여부
 */
const SearchResults: React.FC<SearchResultsProps> = ({ results, isButton }) => {
  return (
    <>
      <PerfumeList>
        <MarginFrame margin="-4px 0" />
        {feeds.map((feed) => (
          <>
            <PerfumeBox>
              <PerfumeInfo>
                <TextInfo>
                  <PerfumeBrand>{feed.perfumeInfo.brand}</PerfumeBrand>
                  <PerfumeName>{feed.perfumeInfo.name}</PerfumeName>
                  <PerfumeScent>{feed.perfumeInfo.scent}</PerfumeScent>
                </TextInfo>
                <ImgBox>
                  <img src={feed.perfumeInfo.img}></img>
                </ImgBox>
              </PerfumeInfo>
              <ButtonFrame>
                {isButton && <Button>내 서랍에 담기</Button>}
              </ButtonFrame>
            </PerfumeBox>
            <MarginFrame margin="10px 0" />
          </>
        ))}
      </PerfumeList>
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
  padding: 25px 0px;
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

const ButtonFrame = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Button = styled.button`
  border: none;
  padding: 8px 8px;
  width: 300px;
  font-weight: 600;
  font-size: 14px;
  color: var(--primary-color);
  background: var(--white-color);
  border-radius: 5px;
  margin: 15px 25px -10px;

  &:hover {
    background: var(--primary-color);
    color: var(--white-color);
  }
`;

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
