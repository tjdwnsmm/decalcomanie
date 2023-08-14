import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Bar } from '../../assets/img/bar.svg';
import { user } from '../../types/PostInfoType';
import getLoggedInUserNickname from '../../api/loggedInUserNickname';

interface TextProp {
  size?: string;
  fontWeight?: string;
  color?: string;
}

interface StatProp {
  following: number;
  post: number;
  follower: number;
}

const data: StatProp = {
  following: 123123,
  post: 123123123,
  follower: 123123123123,
};

const BoxText = styled.div<TextProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

const StatsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 330px;
  height: 70px;
  border-radius: 20px;
  background-color: var(--white-color);
`;

const CountBox = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const formatNumber = (number: number): string => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

export default function ProfileStats() {
  const navigate = useNavigate();

  const handleClick = (initialActiveTab: 'follower' | 'following') => {
    // 임시) mypage 완성되면 mypage에서 userDto props로 넘겨줘서 해당 userNickname 사용
    const temporaryUser: user = {
      // 임시로 필요한 데이터만 작성
      nickname: '2948493336',
      userId: 'b18262f7-f7a6-455a-91ea-c74cd42b09b4',
      age: 20,
      gender: 0,
      deletedAt: '',
      picture: '',
    };
    const urlEndpoint =
      getLoggedInUserNickname() === temporaryUser.nickname
        ? '/my-follow'
        : `/${temporaryUser.userId}`;
    navigate(`/follow-list${urlEndpoint}?initialActiveTab=${initialActiveTab}`);
  };

  return (
    <StatsDiv>
      <StatsBox>
        <CountBox onClick={() => handleClick('follower')}>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(data.follower)}
          </BoxText>
          <BoxText size="9.5pt">Follower</BoxText>
        </CountBox>
        <Bar />
        <div>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(data.post)}
          </BoxText>
          <BoxText size="9.5pt">Post</BoxText>
        </div>
        <Bar />
        <CountBox onClick={() => handleClick('following')}>
          <BoxText size="13pt" color="var(--primary-color)" fontWeight="700">
            {formatNumber(data.following)}
          </BoxText>
          <BoxText size="9.5pt">Following</BoxText>
        </CountBox>
      </StatsBox>
    </StatsDiv>
  );
}
