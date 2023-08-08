import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/apiController';
import PerfumeReviewCarousel from '../../components/Carousel/PerfumeReviewCarousel';
import PostInfoBox from '../../components/Post/PostInfoBox';
import CommentBox from '../../components/Post/CommentBox';
import CommentInputForm from '../../components/Post/CommentInputForm';
import { PostDetailData } from '../../types/PostInfoType';
import { Main } from '../../style';

const CommentListBox = styled.div`
  margin-bottom: 80px;
`;

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [postDetailData, setPostDetailData] = useState<PostDetailData | null>(null);

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
      <PerfumeReviewCarousel
        grades={postDetailData.gradeDto}
        perfumes={postDetailData.perfumeInfos}
      />
      <PostInfoBox postInfo={postDetailData} />
      <CommentListBox>
        {postDetailData.comments.map((comment, idx) => (
          <CommentBox key={idx} comment={comment} commentUser={postDetailData.commmentUsers[idx]} />
        ))}
      </CommentListBox>
      <CommentInputForm articleId={postDetailData.articleDto.articleId}/>
    </Main>
  );
};

export default PostDetail;
