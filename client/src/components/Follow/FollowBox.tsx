import React from 'react';
import styled from 'styled-components';
import { FollowInfo } from '../../types/FollowInfoType';
import { FollowBtn } from '../Button/FollowBtn';

interface FollowBoxProps {
  followList: FollowInfo[];
  follow: FollowInfo;
}

const FollowListContainer = styled.div`
  padding: 15px 25px;
`;

const FollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 5px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const WriterName = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
`;

const FavoriteScent = styled.div`
  background-color: var(--secondary-color);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin: 5px;
  padding: 5px;
`;

const FollowBox = ({ followList }: FollowBoxProps) => {
  return (
    <FollowListContainer>
      {followList.map((follow, idx) => (
        <FollowInfoBox key={idx} follow={follow}>
          <ProfileImg src={follow.profileImg} alt="프로필" />
          <WriterName>{follow.writer}</WriterName>
          {follow.favScent.map((scent, index) => (
            <FavoriteScent key={index} scent={scent}>
              {scent}
            </FavoriteScent>
          ))}
          {/* <FollowBtn isFollow={isFollow} /> */}
        </FollowInfoBox>
      ))}
    </FollowListContainer>
  );
};

export default FollowBox;
