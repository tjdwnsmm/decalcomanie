import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/apiController';
import PerfumeReviewCarousel from '../../components/Carousel/PerfumeReviewCarousel';
import PostInfoBox from '../../components/Post/PostInfoBox';
import CommentBox from '../../components/Post/CommentBox';
import CommentInputForm from '../../components/Post/CommentInputForm';
import { PostDetailData } from '../../types/PostInfoType';
import { Main } from '../../style';
import { ReactComponent as LeftArrow } from '../../assets/icon/left-arrow.svg';

const CommentListBox = styled.div`
  margin-bottom: 80px;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin: 24px 18px 16px;
  cursor: pointer;
`;

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [postDetailData, setPostDetailData] = useState<PostDetailData | null>(
    null,
  );
  const navigate = useNavigate();

  const handleLeftArrowClick = () => {
    navigate('/main-feed');
  };

  useEffect(() => {
    const fetchPostDetailData = async () => {
      try {
        const response = await axios.get(`/sns/search/${id}`);
        setPostDetailData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchPostDetailData();
  }, [id]);

  // 게시글 없을 때(임시)
  if (!postDetailData) {
    return false;
  }

  return (
    <Main>
      <Button onClick={handleLeftArrowClick}>
        <LeftArrow />
      </Button>
      <PerfumeReviewCarousel
        rates={postDetailData.rates}
        perfumes={postDetailData.perfumeInfos}
      />
      <PostInfoBox postInfo={postDetailData} />
      <CommentListBox>
        {postDetailData.comments.map((comment, idx) => (
          <CommentBox
            key={idx}
            comment={comment}
            commentUser={postDetailData.commmentUsers[idx]}
          />
        ))}
      </CommentListBox>
      <CommentInputForm articleId={postDetailData.articleDto.articleId} />
    </Main>
  );
};

export default PostDetail;
