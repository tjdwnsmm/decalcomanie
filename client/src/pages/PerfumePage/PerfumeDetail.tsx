import React from 'react';
import { Main } from '../../style';
import { styled } from 'styled-components';
import { LikeBtn } from '../../components/Button/LikeBtn';
import { RateBtn } from '../../components/Button/RateBtn';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

const perfumeEx: PerfumeDetail = {
  id: '1',
  brand: '아쿠아 디 파르마',
  korName: '미르토 디 파나레아',
  engName: '미르토 디 파나레아',
  picture: 'src/assets/img/perfume1.png',
  accord: [
    { scentId: 1, name: '우디', rgb: 'browmn' },
    { scentId: 2, name: '플로럴', rgb: 'pink' },
    { scentId: 2, name: '플로럴', rgb: 'pink' },
  ],
  noteList: [{ noteListId: 1, noteId: 1, perfumeId: 1, type: '머틀' }],
  pick: 1059,
  rate: 4.5,
};
const PerfumeDetail = () => {
  return (
    <Main>
      <PerfumeInfo>
        <LeftSection>
          <PerfumeIcon>
            <LikeBtn count={perfumeEx.pick}></LikeBtn>
            <RateBtn count={perfumeEx.rate} />
          </PerfumeIcon>
          <Brand>{perfumeEx.brand}</Brand>
          <PerfumeName>{perfumeEx.korName}</PerfumeName>

          <ScentList>
            {perfumeEx.accord.map((scent) => (
              <AccordBox>{scent.name}</AccordBox>
            ))}
          </ScentList>
        </LeftSection>
        <PerfumeImg>
          <img src="src/assets/img/perfume1.png" />
        </PerfumeImg>
      </PerfumeInfo>
    </Main>
  );
};

export default PerfumeDetail;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const PerfumeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const PerfumeIcon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 7px;
`;

const PerfumeImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 178px;
  border-radius: 10px;
  background-color: var(--white-color);
  object-fit: cover;
  img{
    width: 100px;
  }}
  
`;

const Brand = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 4px;
`;
const PerfumeName = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ScentList = styled.div`
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
  padding: 2px 8px;
  height: 24px;
  letter-spacing: 0.8px;
  margin: 5px 5px 0 0;
`;
