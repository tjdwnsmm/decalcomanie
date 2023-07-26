// import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Main, MarginFrame } from '../../style';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';
import NewNickname from '../../components/Profile/NicknameModi';
import { ProfileUpdateInfo } from '../../types/ProfileInfoType';

// 임시데이터
const user: ProfileUpdateInfo = {
  nickname: '김수민',
  favorite: [
    '플로럴',
    '시트러스',
  ],
  hate: [
    '머스크',
    '스파이시',
  ],
  img: 'src/assets/img/profile-img.png',
};

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
  position: relative;
  padding: 15px 120px;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ImgModiBox = styled.div`
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

const UserInfoName = styled.div`
  padding-left: 5px;
  font-size: 16px;
  font-weight: 700;
`;

const ProfileUpdate = () => {
  const handleCancel = () => {
    window.location.href = '/mypage';
  };

  return (
    <Main>
      <PageName>회원 정보 수정</PageName>
      <CancleBtn onClick={handleCancel}><CloseSvg/></CancleBtn>
      <Profile>
        <ProfileImg src={user.img} alt="프로필 사진" />
        <ImgModiBox><img src="src/assets/img/pencil-float.png" width="26" height="26"/></ImgModiBox>
      </Profile>
      <MarginFrame margin="20px 40px">
        <UserInfoName>
          닉네임
        </UserInfoName>
        <NewNickname nickname={user.nickname}/>
      </MarginFrame>
    </Main>
  );
};

export default ProfileUpdate;
