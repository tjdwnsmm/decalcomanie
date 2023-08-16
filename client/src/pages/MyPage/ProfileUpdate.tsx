import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Main, MarginFrame, ConfirmButton, CenterFrame } from '../../style';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';
import NewNickname from '../../components/Profile/NicknameModi';
import ScentModi from '../../components/Profile/ScentModi';
import { scentDto, userInfoDto } from '../../types/PostInfoType';
import axios from '../../api/apiController';
import ProfileImgModi from '../../components/Profile/ProfileImgModi';
import WithdrawModal from '../../components/Profile/WithdrawModal';

const PageName = styled.div`
  background-color: var(--background-color);
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const CancleBtn = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
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
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const UserInfoName = styled.div`
  padding: 0px 0px 2px 8px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const FixedPostButton = styled(ConfirmButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  cursor: pointer;
`;

const WithdrawButton = styled.div`
  color: var(--error-color);
  font-size: 13px;
  // text-decoration: underline;
  // text-underline-offset: 6px;
  background-color: var(--background-color);
  cursor: pointer;
`;

const CenterBackground = styled(CenterFrame)`
  background-color: var(--background-color);
  padding: 35px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<userInfoDto>();
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [nickName, setNickName] = useState('');
  const [isCheck, setIsCheck] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favoriteScent, setFavoriteScent] = useState<scentDto[]>([]);
  const [hateScent, setHateScent] = useState<scentDto[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/info');
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.user.picture) {
        setProfileImg(userData.user.picture);
      } else {
        setProfileImg('/assets/avatar/peeps-avatar-alpha-1.png');
      }
      setNickName(userData.user.nickname);
      setFavoriteScent(userData.favorities);
      setHateScent(userData.hates);
    }
  }, [userData]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleOpenWithdrawModal = () => {
    setWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setWithdrawModalOpen(false);
  };

  const handleUpdateProfile = async () => {
    if (!isCheck) {
      window.alert('중복검사를 실행해주세요.');
      return;
    }
    if (!isAvailable) {
      window.alert('사용할 수 없는 닉네임입니다.');
      return;
    }
    if (window.confirm('프로필을 변경하시겠습니까?')) {
      const favorite = favoriteScent.map((scent) => scent.scentId);
      const hate = hateScent.map((scent) => scent.scentId);
      const updatedProfileData = {
        nickname: nickName,
        favorite,
        hate,
        picture: profileImg,
      };
      try {
        const response = await axios.put('/user/update', updatedProfileData);
        localStorage.setItem('nickname', nickName);
        navigate('/mypage');
        console.log('프로필 업데이트 성공:', response.data);
      } catch (error) {
        console.error('프로필 업데이트 실패:', error);
      }
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Main>
      <MarginFrame margin="58px">
        <PageName>회원 정보 수정</PageName>
        <CancleBtn onClick={handleCancel}>
          <CloseSvg />
        </CancleBtn>
      </MarginFrame>
      <Profile>
        <ProfileImg src={profileImg} alt="프로필 사진" />
        <ImgModiBox onClick={handleOpenModal}>
          <img src="/assets/img/pencil-float.png" width="26" height="26" />
        </ImgModiBox>
      </Profile>
      <MarginFrame margin="30px 40px">
        <UserInfoName>닉네임</UserInfoName>
        <NewNickname
          nickname={userData?.user.nickname ? userData.user.nickname : ''}
          setNicknameChange={setNickName}
          onCheckStatusChange={(newIsCheck, newIsAvailable) => {
            setIsCheck(newIsCheck);
            setIsAvailable(newIsAvailable);
          }}
        />
      </MarginFrame>
      <MarginFrame margin="30px 40px">
        <UserInfoName>좋아요 😊</UserInfoName>
        <ScentModi
          targetList={favoriteScent}
          setTargetList={setFavoriteScent}
          fav="좋아하는"
          anotherList={hateScent}
        />
      </MarginFrame>
      <MarginFrame margin="30px 40px">
        <UserInfoName>싫어요 🙁</UserInfoName>
        <ScentModi
          targetList={hateScent}
          setTargetList={setHateScent}
          fav="싫어하는"
          anotherList={favoriteScent}
        />
      </MarginFrame>
      <MarginFrame
        margin="20px 0 76px"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <WithdrawButton onClick={handleOpenWithdrawModal}>
          회원 탈퇴하기
        </WithdrawButton>
      </MarginFrame>
      <CenterBackground>
        <FixedPostButton
          background="primary"
          color="primary"
          fontWeight="700"
          onClick={handleUpdateProfile}
        >
          수정하기
        </FixedPostButton>
      </CenterBackground>

      {modalOpen && (
        <ProfileImgModi
          handleImg={setProfileImg}
          closeModal={handleCloseModal}
        />
      )}

      {withdrawModalOpen && (
        <WithdrawModal
          // handleImg={setProfileImg}
          closeModal={handleCloseWithdrawModal}
        />
      )}
    </Main>
  );
};

export default ProfileUpdate;
