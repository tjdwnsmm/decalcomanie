import React, { ChangeEvent, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as ProfileImg } from '../../assets/img/profile-img.svg';
import ProfileEffect from './ProfileEffect';

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: var(--primary-color);
  background-image: ${({ imageUrl }: { imageUrl: string }) =>
    imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  box-shadow: 5px 5px 5px var(--gray-color);
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
  margin-bottom: 20px;
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
    -7.5px 5px 0 0 rgba(251, 169, 146, 0.9), 7.5px 5px 0 0 rgba(251, 169, 146, 0.9);
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
    5px 0px 0 0 rgba(248, 84, 245, 0.911),
    0 -10px 0 0 rgba(248, 84, 245, 0.911);
  animation: ${rotateAnimation} 10s alternate linear infinite;
`;

export default function ProfileImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Root>
      <LoaderContainer>
        <LoaderInner />
        <LoaderInner2 />
        <LoaderInner3 />
        <ImageDiv>
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {imageUrl ? (
            <Image imageUrl={imageUrl} />
          ) : (
            <Image>
              <ProfileImg />
            </Image>
          )}
        </ImageDiv>
      </LoaderContainer>
    </Root>
  );
}
