import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ProfileImg } from '../../assets/img/profile-img.svg';

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: var(--primary-color);
  background-image: ${({ imageUrl }: { imageUrl: string }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  box-shadow: 5px 5px 5px var(--gray-color);
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  );
}
