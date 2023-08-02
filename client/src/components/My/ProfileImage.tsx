import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as ProfileImg } from '../../assets/img/profile-img.svg';

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: var(--primary-color);
  background-image: ${({ imageUrl }: { imageUrl: string }) =>
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

const LoaderInner = styled.span`
  position: absolute;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: 0 -10px 0 0 rgba(251, 169, 146, 0.9),
    -7.5px 5px 0 0 rgba(251, 169, 146, 0.9),
    7.5px 5px 0 0 rgba(251, 169, 146, 0.9);
  animation: ${rotateAnimation} 10s alternate linear infinite;
`;

const LoaderInner2 = styled(LoaderInner)`
  box-shadow: 7.5px -5px 0 0 rgba(253, 250, 87, 0.913),
    -7.5px -5px 0 0 rgba(253, 250, 87, 0.913),
    5px 0px 0 0 rgba(253, 250, 87, 0.913);
  animation: ${rotateOtherAnimation} 10s alternate linear infinite;
`;

const LoaderInner3 = styled(LoaderInner)`
  box-shadow: 5px 0px 0 0 rgba(248, 84, 245, 0.911),
    5px 0px 0 0 rgba(248, 84, 245, 0.911), 0 -10px 0 0 rgba(248, 84, 245, 0.911);
  animation: ${rotateAnimation} 10s alternate linear infinite;
`;

export default function ProfileImage() {
  return (
    <Root>
      <LoaderContainer>
        <LoaderInner />
        <LoaderInner2 />
        <LoaderInner3 />
        <ImageDiv>
          <Image>
            <ProfileImg />
          </Image>
        </ImageDiv>
      </LoaderContainer>
    </Root>
  );
}
