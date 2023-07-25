import React from 'react';
import styled from 'styled-components';
import { FollowInfo } from '../../types/FollowInfoType';
import { FollowBtn } from '../Button/FollowBtn';

interface FollowBoxProps {
  followList: FollowInfo[];
  follow: FollowInfo;
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

const FollowInfoBox = styled.div<FollowBoxProps>`
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

const FollowBox = ({ followList }: FollowBoxProps) => (
  <FollowListContainer>
    {followList.map((follow, idx) => (
      <FollowInfoBox key={idx}>
        <ProfileImg src={follow.profileImg} alt="프로필" />
        <InfoBox>
          <FollowNickname>{follow.writer}</FollowNickname>
          <FavScentList>
            {follow.favScent.map((scent, index) => (
              <Scent key={index}>
                {scent}
              </Scent>
            ))}
          </FavScentList>
        </InfoBox>
        <FollowBtn isFollow={follow.isFollow} />
      </FollowInfoBox>
    ))}
  </FollowListContainer>
);

export default FollowBox;
