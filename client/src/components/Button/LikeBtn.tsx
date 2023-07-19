import { styled } from 'styled-components';
import { useState } from 'react';
import { ReactComponent as UnLikeSvg } from '../../assets/icon/empty-heart.svg';
import { ReactComponent as LikeSvg } from '../../assets/icon/fill-heart.svg';

interface LikeBtnProps {
  count: number;
}

/** @param {number} count : 좋아요 수 */
export const LikeBtn = ({ count }: LikeBtnProps) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Button onClick={handleLikeClick}>
        {liked ? <LikeSvg /> : <UnLikeSvg />}
        {count}
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
