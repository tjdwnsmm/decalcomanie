import { useState } from 'react';
import { styled } from 'styled-components';
import { CenterFrame, Main, MarginFrame } from '../../style';
import { DrawerAddBtn } from '../../components/Drawer/DrawerAddBtn';
import { DrawerCarousel } from '../../components/Drawer/DrawerCarousel';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';
import { useNavigate } from 'react-router-dom';

export interface Perfume {
  name: string;
  brand: string;
  img: string;
}

const examplePerfume: Perfume = {
  name: '어나더13',
  brand: '르라보',
  img: 'src/assets/img/perfume1.png',
};

const examplePerfume2: Perfume = {
  name: '아쿠아디파르마',
  brand: '르라보',
  img: 'src/assets/img/perfume_aqua.png',
};

export const MyDrawerPage = () => {
  const [perfumeList, setPerfumeList] = useState<Perfume[]>([
    examplePerfume,
    examplePerfume2,
    examplePerfume,
    examplePerfume2,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume2,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume2,
    examplePerfume2,
    examplePerfume,
  ]);

  const handleRemoveMyPerfume = (idx: number) => {
    console.log(idx);
    setPerfumeList((prevPerfume) =>
      prevPerfume.filter((item, index) => index !== idx),
    );
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Main>
      <CloseFrame onClick={handleClick}>
        <CloseSvg />
      </CloseFrame>
      {perfumeList.length === 0 ? (
        <>
          <MarginFrame margin="240px 10px" />
          <CenterFrame direction="column">
            <DrawerText size="25px" fontweight="700">
              아직 향수가 없어요 😥
            </DrawerText>
            <MarginFrame margin="8px 0 0" />
            <DrawerText size="18px" color="var(--gray-color)" fontweight="600">
              가지고 있는 향수를 서랍에 담아보세요.
            </DrawerText>
            <MarginFrame margin="50px 0 0" />
            <DrawerAddBtn buttonTxt="내 향수 찾으러 가기" />
          </CenterFrame>
        </>
      ) : (
        <>
          <MarginFrame margin="30px 10px">
            <CenterFrame direction="column">
              <DrawerText size="25px" fontweight="700">
                이런 향수들을 좋아하시는군요 ?
              </DrawerText>
              <MarginFrame margin="8px 0 0" />
              <DrawerText
                size="16px"
                color="var(--gray-color)"
                fontweight="500"
              >
                서랍에 담긴 향수를 기반으로 추천해드릴게요.
              </DrawerText>

              <DrawerCarousel
                perfumeList={perfumeList}
                handlePerfume={handleRemoveMyPerfume}
                stairNum={0}
              />

              <MarginFrame margin="20px 0" />
              <DrawerAddBtn buttonTxt="내 향수 추가하기" />
            </CenterFrame>
          </MarginFrame>
        </>
      )}
    </Main>
  );
};

interface TextProp {
  size?: string;
  fontweight?: string;
  color?: string;
}
const DrawerText = styled.div<TextProp>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontweight};
  color: ${(props) => props.color};
`;

const CloseFrame = styled.div`
  margin: 25px 30px;
  display: flex;
  flex-direction: row-reverse;
`;
