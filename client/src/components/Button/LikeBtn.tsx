import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { ReactComponent as UnLikeSvg } from '../../assets/icon/empty-heart.svg';
import { ReactComponent as LikeSvg } from '../../assets/icon/fill-heart.svg';
import axios from '../../api/apiController';

interface LikeBtnProps {
  count: number;
  picked: boolean;
  likeUrl: string;
  dislikeUrl: string;
  articleId?: number;
  perfumeId?: number;
  userId: string;
}

/** @param {number} count : 좋아요 수 */
export const LikeBtn = ({
  count,
  picked,
  likeUrl,
  dislikeUrl,
  articleId,
  perfumeId,
  userId,
}: LikeBtnProps) => {
  const [liked, setLiked] = useState(false);
  const [nowCount, setCount] = useState(0);

  useEffect(() => {
    setLiked(picked);
  }, [picked]);

  useEffect(() => {
    setCount(count);
  }, [count]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await sendLikeStatus(dislikeUrl);
        setCount(nowCount - 1);
      } else {
        await sendLikeStatus(likeUrl);
        setCount(nowCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error sending like status:', error);
    }
  };

  // Function to send the like status to the API
  const sendLikeStatus = async (url: string) => {
    try {
      const requestData = url.includes('sns')
        ? { articleId: articleId, userId: userId }
        : { perfumeId: perfumeId, userId: userId };

      const response = await axios.post(url, requestData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <>
      <Button onClick={handleLikeClick}>
        {liked ? <LikeSvg /> : <UnLikeSvg />}
        {nowCount}
      </Button>
    </>
  );
};

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
`;
