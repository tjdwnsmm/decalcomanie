import { Main } from '../../style';
import FloatingWriteBtn from '../../components/Button/FloatingWriteBtn';
import { FeedProps } from '../../types/FeedInfoType';
import PerfumeInfoBox from '../../components/Perfume/PerfumeInfoBox';
import { styled } from 'styled-components';
import FeedPageOnly from '../../components/Feed/FeedPageOnly';

//API 호출 전 임시데이터
const feeds: FeedProps[] = [
  {
    perfumeInfo: {
      name: '탐다오',
      brand: '딥디크',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임1',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도개인적으로도 너무 마음에 들고 회 ...',
    favScent: ['우디', '플로럴', '시트러스'],
    nofavScent: ['머스크', '코코넛', '스파이시'],
  },
  {
    perfumeInfo: {
      name: '탐다오',
      brand: '딥디크',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임2',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도개인적으로도 너무 마음에 들고 회 ...',
    favScent: ['우디', '플로럴', '시트러스'],
    nofavScent: ['머스크', '코코넛'],
  },
  {
    perfumeInfo: {
      name: '탐다오',
      brand: '딥디크',
      scent: '미모사, 베르가못, 머스크',
      img: 'src/assets/img/perfume1.png',
    },
    writer: '닉네임3',
    profileImg: 'src/assets/img/profile-user.png',
    like: 1069,
    comment: 35,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도개인적으로도 너무 마음에 들고 회 ...',
    favScent: ['우디', '플로럴', '시트러스'],
    nofavScent: ['머스크', '코코넛'],
  },
];

export const PerfumeFeed = () => {
  return (
    <Main>
      <PerfumeFeedBox>
        <PerfumeInfoBox
          brand={feeds[0].perfumeInfo.brand}
          name={feeds[0].perfumeInfo.name}
          scent={feeds[0].perfumeInfo.scent}
          img={feeds[0].perfumeInfo.img}
        />
      </PerfumeFeedBox>

      <FeedBody>
        {feeds.map((feed, idx) => (
          <FeedPageOnly key={idx} feed={feed} />
        ))}
      </FeedBody>
      <FloatingWriteBtn />
    </Main>
  );
};

const PerfumeFeedBox = styled.div`
  margin-top: 22px;
  padding: 0 18px;
`;
const FeedBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
