import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from '../../api/apiController';
import { ScentDto } from '../../types/PerfumeInfoType';

interface ImageProps {
  imageUrl: string | null;
}

interface Props {
  userImage: string | null;
  likes: ScentDto[];
}

interface LoaderInnerProps {
  rgb: string | null;
}

export default function ProfileImage({ userImage, likes }: Props) {
  const [inner1Rgb, setInner1Rgb] = useState<string | null>(null);
  const [inner2Rgb, setInner2Rgb] = useState<string | null>(null);
  const [inner3Rgb, setInner3Rgb] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('/perfume/search/scent')
      .then((response) => {
        const matchingRgbValues: string[] = [];
        likes.forEach((like) => {
          const matchingScent = response.data.find(
            (scent: { name: string }) => scent.name === like.name,
          );
          if (matchingScent) {
            matchingRgbValues.push(matchingScent.rgb);
          }
        });

        if (matchingRgbValues.length > 0) {
          setInner1Rgb(matchingRgbValues[0]);
          setInner2Rgb(matchingRgbValues[1]);
          setInner3Rgb(matchingRgbValues[2]);
        } else {
          setInner1Rgb(null);
          setInner2Rgb(null);
          setInner3Rgb(null);
        }
      })
      .catch((error) => {
        console.error('API 호출 에러:', error);
      });
  }, [likes]);

  return (
    <Root>
      <LoaderContainer>
        {/* 시각화 Loader 3개 */}
        <LoaderInner1 rgb={inner1Rgb} />
        <LoaderInner2 rgb={inner2Rgb} />
        <LoaderInner3 rgb={inner3Rgb} />

        {/* 프로필 이미지 */}
        <ImageDiv>
          <Image imageUrl={userImage} />
        </ImageDiv>
      </LoaderContainer>
    </Root>
  );
}

const Image = styled.div<ImageProps>`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  z-index: 0;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 115px;
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
    transform: scale(1) rotate(720deg);
  }
`;

const rotateOtherAnimation = keyframes`
  50% {
    transform: scale(1) rotate(-360deg);
  }
  100% {
    transform: scale(1) rotate(-720deg);
  }
`;

const LoaderInner1 = styled.span<LoaderInnerProps>`
  position: absolute;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: 0 -10px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    -10.5px 5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    7.5px 5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateAnimation} 5s alternate linear infinite;
`;

const LoaderInner2 = styled(LoaderInner1)<LoaderInnerProps>`
  box-shadow: 7.5px -5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    -10.5px -5px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    5px 0px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateOtherAnimation} 5s alternate linear infinite;
`;

const LoaderInner3 = styled(LoaderInner1)<LoaderInnerProps>`
  box-shadow: 5px 0px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    10px 0px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'},
    0 -10px 0 0 ${(props) => props.rgb || 'rgba(0, 0, 0, 0)'};
  animation: ${rotateAnimation} 5s alternate linear infinite;
`;
