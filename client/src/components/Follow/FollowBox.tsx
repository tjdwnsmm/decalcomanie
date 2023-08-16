import React from 'react';
import styled from 'styled-components';
import { FollowInfo } from '../../types/ProfileInfoType';
import FollowBtn from '../Button/FollowBtn';
import { useNavigate } from 'react-router-dom';

interface FollowBoxProps {
  followList: FollowInfo[];
  follow?: FollowInfo;
  setFollowingList: React.Dispatch<React.SetStateAction<FollowInfo[]>>;
  isMe: boolean | undefined;
}

/**
@summary
FollowListContainer : 팔로우 목록 전체
FollowInfoBox : 팔로워 1명의 정보
  - ProfileImg : 프로필 이미지
  - InfoBox: 닉네임/작성자 선호
  - FollowBtn
*/

const FollowListContainer = styled.div`
  padding: 0px 25px;
`;

const FollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 10px;
  gap: 3px;
`;

const FollowNickname = styled.div`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 5px;
`;

const FavScentList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 7px;
`;

const Scent = styled.div`
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  padding: 5px 10px;
  border-radius: 7px;
`;

const FollowBox = ({ followList, setFollowingList, isMe }: FollowBoxProps) => {
  const navigate = useNavigate();

  const updateFollowing = (followInfo: FollowInfo) => {
    setFollowingList((prevList) => {
      const isAlreadyFollowing = prevList.some(
        (item) => item.userId === followInfo.userId,
      );

      if (isAlreadyFollowing) {
        return prevList.filter((item) => item.userId !== followInfo.userId);
      } else {
        return [...prevList, followInfo];
      }
    });
  };

  const handleOtherProfile = (id: string) => {
    navigate(`/profile-page/${id}`);
  };

  return (
    <FollowListContainer>
      {followList.map((follow) => (
        <FollowInfoBox key={follow.userId}>
          {/* picture default 논의 후 수정 */}
          <ProfileImg
            src={
              follow.picture
                ? follow.picture
                : '/assets/avatar/peeps-avatar-alpha-9.png'
            }
          />
          <InfoBox
            onClick={() => {
              handleOtherProfile(follow.userId);
            }}
          >
            <FollowNickname>{follow.nickname}</FollowNickname>
            <FavScentList>
              {follow.favorite.map((scent, index) => (
                <Scent key={index}>{scent.name}</Scent>
              ))}
            </FavScentList>
          </InfoBox>
          {follow.followingButtonActivate && (
            <div onClick={isMe ? () => updateFollowing(follow) : undefined}>
              <FollowBtn to={follow.userId} isFollow={follow.following} />
            </div>
          )}
        </FollowInfoBox>
      ))}
    </FollowListContainer>
  );
};

export default FollowBox;
