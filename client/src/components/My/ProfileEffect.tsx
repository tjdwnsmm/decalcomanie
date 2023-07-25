import React from 'react';
import styled, { keyframes } from 'styled-components';

const Root = styled.div`
  --size: 140px;
  --speed: 5s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -9999;
`;

const LoaderContainer = styled.div`
  width: var(--size);
  height: var(--size);
  position: relative;
`;

const rotateAnimation = keyframes`
  50% {
    transform: scale(1.4) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
`;

const rotateOtherAnimation = keyframes`
  50% {
    transform: scale(1.5) rotate(-360deg);
  }
  100% {
    transform: scale(1) rotate(-720deg);
  }
`;

const LoaderInner = styled.span`
  position: absolute;
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  box-shadow: 
    0 -10px 0 0 rgba(0, 77, 64, .6),
    -7.5px 5px 0 0 rgba(0, 121, 107, .6),
    7.5px 5px 0 0 rgba(0, 150, 136, .6);
  animation: ${rotateAnimation} var(--speed) linear infinite;
`;

const LoaderInner2 = styled(LoaderInner)`
  box-shadow: 
    7.5px -5px 0 0 rgba(49, 27, 146, .6),
    -7.5px -5px 0 0 rgba(81, 45, 168, .6),
    0 10px 0 0 rgba(103, 58, 183, .6);
  animation: ${rotateOtherAnimation} var(--speed) linear infinite;
`;

export default function Loader() {
  return (
    <Root>
      <LoaderContainer>
        <LoaderInner />
        <LoaderInner2 />
      </LoaderContainer>
    </Root>
  );
}
