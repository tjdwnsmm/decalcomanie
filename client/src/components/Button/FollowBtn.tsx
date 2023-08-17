import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../api/apiController';

interface FollowBtnProps {
  to: string;
  isFollow: boolean;
}

const Button = styled.div<{ isFollowing?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 21px;
  background-color: ${(props) =>
    props.isFollowing ? 'var(--white-color)' : 'var(--primary-color)'};
  color: ${(props) =>
    props.isFollowing ? 'var(--primary-color)' : 'var(--white-color)'};
  border: 1px solid;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  margin: 3px;
  border-radius: 10px;
  cursor: pointer;
`;

const FollowBtn = ({ to, isFollow }: FollowBtnProps) => {
  const [followed, setFollowed] = useState(isFollow);

  useEffect(() => {
    setFollowed(isFollow);
  }, [isFollow]);

  const handleFollowClick = async () => {
    try {
      await sendFollowStatus('/user/follow');
      setFollowed(!followed);
    } catch (error) {
      console.error('에러: ', error);
    }
  };

  const sendFollowStatus = async (url: string) => {
    try {
      const requestData = { to };
      const response = await axios.post(url, requestData);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error, url);
      return [];
    }
  };

  return (
    <>
      <Button isFollowing={followed} onClick={handleFollowClick}>
        {followed ? '팔로잉' : '팔로우'}
      </Button>
    </>
  );
};

export default FollowBtn;
