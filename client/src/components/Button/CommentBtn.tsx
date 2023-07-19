import { styled } from 'styled-components';
import { ReactComponent as CommentSvg } from '../../assets/icon/comment.svg';

interface CommentBtnProps {
  count: number;
}

/** @param {number} count : 댓글 수 */
export const CommentBtn = ({ count }: CommentBtnProps) => (
  <>
    <Button>
      <CommentSvg />
      {count}
    </Button>
  </>
);

export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
`;
