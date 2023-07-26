// import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';


const PageName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const CancleBtn = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 5;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0px 120px;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 5px;
  background-color: var(--white-color);
  border-radius: 40px;
  box-shadow: 2px 4px 4px rgba(0,0,0, 0.2);
`;

const ProfileUpdate = () => {
  const handleCancel = () => {
    window.location.href = '/mypage';
  };

  return (
    <Main>
      <PageName>회원 정보 수정</PageName>
      <CancleBtn onClick={handleCancel}><CloseSvg/></CancleBtn>
      <MarginFrame margin="15px"/>
      <Profile>
        <ProfileImg src="src/assets/img/profile-img.png" alt="프로필 사진" />
        <ButtonBox><img src="src/assets/img/pencil-float.png" width="26" height="26"/></ButtonBox>
      </Profile>
    </Main>
  );
};

export default ProfileUpdate;
