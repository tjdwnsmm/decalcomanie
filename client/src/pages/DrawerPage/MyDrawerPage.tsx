import { useState } from 'react';
import { styled } from 'styled-components';
import { CenterFrame, Main, MarginFrame } from '../../style';
import { DrawerAddBtn } from '../../components/Drawer/DrawerAddBtn';
import { DrawerCarousel } from '../../components/Drawer/DrawerCarousel';

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

export const MyDrawerPage = () => {
  const [perfumeList, setPerfumeList] = useState<Perfume[]>([
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
    examplePerfume,
  ]);

  return (
    <Main>
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
          <MarginFrame margin="50px 10px" />
          <CenterFrame direction="column">
            <DrawerText size="25px" fontweight="700">
              이런 향수들을 좋아하시는군요 ?
            </DrawerText>
            <MarginFrame margin="8px 0 0" />
            <DrawerText size="18px" color="var(--gray-color)" fontweight="600">
              서랍에 담긴 향수를 기반으로 추천해드릴게요.
            </DrawerText>

            <DrawerCarousel perfumeList={perfumeList} />

            <MarginFrame margin="50px 0 0" />
            <DrawerAddBtn buttonTxt="내 향수 추가하기" />
          </CenterFrame>
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
