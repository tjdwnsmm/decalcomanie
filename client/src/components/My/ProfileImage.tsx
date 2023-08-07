import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from '../../api/apiController';
import { ReactComponent as ProfileImg } from '../../assets/img/profile-img.svg';

interface ImageProps {
  imageUrl: string;
}

interface Res {
  res: {
    favorite: string[];
  };
}

const testRes: Res = {
  res: {
    favorite: ['우디', '플로럴', '시트러스'],
  },
};

const Image = styled.div<ImageProps>`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: var(--primary-color);
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  z-index: 0;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Root = styled.div`
  --size: 140px;
  --speed: 5s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const LoaderContainer = styled.div`
  width: var(--size);
  height: var(--size);
  position: relative;
`;

const rotateAnimation = keyframes`
  50% {
    transform: scale(1) rotate(360deg);
  }
  100% {
    transform: scale(1.1) rotate(720deg);
  }
`;

const rotateOtherAnimation = keyframes`
  50% {
    transform: scale(1) rotate(-360deg);
  }
  100% {
    transform: scale(1.1) rotate(-720deg);
  }
`;

interface LoaderInnerProps {
  rgb?: string;
  size: string;
}

const LoaderInner1 = styled.span<LoaderInnerProps>`
  position: absolute;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: 0 -10px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    -7.5px 5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    7.5px 5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateAnimation} 10s alternate linear infinite;
`;

const LoaderInner2 = styled(LoaderInner1)`
  box-shadow: 7.5px -5px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    -7.5px -5px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    5px 0px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateOtherAnimation} 10s alternate linear infinite;
`;

const LoaderInner3 = styled(LoaderInner1)`
  box-shadow: 5px 0px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    5px 0px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    0 -10px 0 0  ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateAnimation} 10s alternate linear infinite;
`;

export default function ProfileImage() {
  const [inner1Rgb, setInner1Rgb] = useState('');
  const [inner2Rgb, setInner2Rgb] = useState('');
  const [inner3Rgb, setInner3Rgb] = useState('');

  axios.get('/perfume/search/scent').then((response) => {
    testRes.res.favorite.forEach((favoriteScent) => {
      const matchingScent = response.data.find((scent) => scent.name === favoriteScent);
      if (matchingScent) {
        const rgbValue = matchingScent.rgb;
        if (favoriteScent === testRes.res.favorite[0]) {
          setInner1Rgb(rgbValue);
        } else if (favoriteScent === testRes.res.favorite[1]) {
          setInner2Rgb(rgbValue);
        } else if (favoriteScent === testRes.res.favorite[2]) {
          setInner3Rgb(rgbValue);
        }
      }
    });
  });

  return (
    <Root>
      <LoaderContainer>
        <LoaderInner1 rgb={inner1Rgb} />
        <LoaderInner2 rgb={inner2Rgb} />
        <LoaderInner3 rgb={inner3Rgb} />
        <ImageDiv>
          <Image imageUrl="">
            {/* 개인 프로필 이미지 들어와야 하는 부분 */}
            <ProfileImg />
          </Image>
        </ImageDiv>
      </LoaderContainer>
    </Root>
  );
}
