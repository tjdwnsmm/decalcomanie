import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { CenterFrame, Main, MarginFrame } from '../../style';
import { DrawerAddBtn } from '../../components/Drawer/DrawerAddBtn';
import { DrawerCarousel } from '../../components/Drawer/DrawerCarousel';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';
import { useNavigate } from 'react-router-dom';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import Spinner from '../../components/common/Spinner';
import axios, { USERID } from '../../api/apiController';

export interface Perfume {
  name: string;
  brand: string;
  img: string;
}

export const MyDrawerPage = () => {
  const [perfumeList, setPerfumeList] = useState<PerfumeDetail[] | null>(null);

  useEffect(() => {
    axios.get(`/user/perfume`).then((res) => {
      setPerfumeList(res.data);
      console.log(res.data);
    });
  }, []);

  const handleRemoveMyPerfume = (idx: number) => {
    setPerfumeList((prevPerfume) => {
      if (prevPerfume) {
        return prevPerfume.filter((item, index) => index !== idx);
      }
      return prevPerfume;
    });
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  const handleSearchPerfume = async () => {
    navigate('/search-myperfume');
  };

  if (!perfumeList) {
    return (
      <MarginFrame margin="120px auto 0">
        <Spinner />
      </MarginFrame>
    );
  }

  return (
    <Main>
      <CloseFrame onClick={handleClose}>
        <CloseSvg />
      </CloseFrame>
      {perfumeList.length === 0 ? (
        <>
          <MarginFrame margin="240px 10px" />
          <CenterFrame direction="column">
            <DrawerText size="25px" fontWeight="700">
              아직 향수가 없어요 😥
            </DrawerText>
            <MarginFrame margin="8px 0 0" />
            <DrawerText size="18px" color="var(--gray-color)" fontWeight="600">
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
              <DrawerText size="25px" fontWeight="700">
                이런 향수들을 좋아하시는군요 ?
              </DrawerText>
              <MarginFrame margin="8px 0 0" />
              <DrawerText
                size="16px"
                color="var(--gray-color)"
                fontWeight="500"
              >
                서랍에 담긴 향수를 기반으로 추천해드릴게요.
              </DrawerText>

              <DrawerCarousel
                perfumeList={perfumeList}
                handlePerfume={handleRemoveMyPerfume}
                stairNum={0}
              />

              <MarginFrame margin="20px 0" />
              <Button onClick={handleSearchPerfume}>
                <DrawerAddBtn buttonTxt="내 향수 추가하기" />
              </Button>
            </CenterFrame>
          </MarginFrame>
        </>
      )}
    </Main>
  );
};

interface TextProp {
  size?: string;
  fontWeight?: string;
  color?: string;
}

const Button = styled.div``;
const DrawerText = styled.div<TextProp>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const CloseFrame = styled.div`
  margin: 25px 30px;
  display: flex;
  flex-direction: row-reverse;
`;
