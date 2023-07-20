import { styled } from 'styled-components';
import { useState } from 'react';

export const FollowBtn = ({ isFollow }: FollowBtnProps) => {
  const [followed, setFollowed] = useState(isFollow);

  const handleFollowClick = () => {
    setFollowed(!followed);
  };

  return (
    <>
      <Button isFollowing={followed} onClick={handleFollowClick}>
        {followed ? '팔로잉' : '팔로우'}
      </Button>
    </>
  );
};

const Button = styled.div<{ isFollowing?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 21px;
  background-color: ${(props) =>
    props.isFollowing ? 'var(--white-color)' : 'var(--primary-color)'};
  color: ${(props) => (props.isFollowing ? 'var(--primary-color)' : 'var(--white-color)')};
  border: 1px solid;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 8px;
  margin: 3px;
  border-radius: 10px;
  cursor: pointer;
`;
