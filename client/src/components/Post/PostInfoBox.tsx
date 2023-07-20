import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types/PostInfoType';
import { FollowBtn } from '../Button/FollowBtn';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';

/**
@summary
PostInfoBoxContainer : 게시글 컴포넌트
WriterInfoBox : 작성자 관련 정보 및 팔로우 버튼
- ProfileImg : 프로필 이미지
- InfoBox: 닉네임/작성날짜/작성자 선호,비선호 향
  - InfoBoxRow: 하나의 행에 넣기 위해,,
- FollowBtn : 팔로우 버튼
ContentBox : 게시물 내용
ButtonBox : 좋아요/스크랩
*/

const PostInfoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;

const WriterInfoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 15px 0px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

const InfoBoxRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 2px 0px;
`;

const Writer = styled.div`
  color: var(--black-color);
  font-size: 14px;
  font-weight: 700;
`;

const CreatedAt = styled.div`
  color: var(--gray-color);
  font-size: 10px;
  font-weight: 400;
  margin-left: 10px;
`;

const FavScent = styled.div`
  display: flex;
  color: var(--primary-color);
  font-size: 10px;
  font-weight: 500;
`;

const NoFavScent = styled.div`
  display: flex;
  color: var(--gray-color);
  font-size: 10px;
  font-weight: 500;
  margin-left: 10px;
`;

const Content = styled.div`
  color: var(--black-color);
  margin: 0px 4px 0px 48px;
  font-size: 14px;
  font-weight: light;
  white-space: pre-line;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  gap: 12px;
`;

const CommentCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  border-top: 1px solid var(--gray-color);
  padding-top: 15px;
`;

interface PostInfoBoxProps {
  postInfo: PostInfo;
}

const PostInfoBox = ({ postInfo }: PostInfoBoxProps) => {
  const {
    profileImg,
    writer,
    createdAt,
    favScent,
    nofavScent,
    isFollow,
    likeCount,
    // isLike,
    // isScrap,
    content,
    commentCount,
  } = postInfo;

  return (
    <PostInfoBoxContainer>
      <WriterInfoBox>
        <ProfileImg src={profileImg} alt="프로필 사진" />
        <InfoBox> 
          <InfoBoxRow>
            <Writer>{writer}</Writer>
            <CreatedAt>{createdAt}</CreatedAt>
          </InfoBoxRow>
          <InfoBoxRow>
            <FavScent>{favScent?.map((fav) => `#${fav}  `)}</FavScent>
            <NoFavScent>{nofavScent?.map((fav) => `#${fav}  `)}</NoFavScent>
          </InfoBoxRow>
        </InfoBox>
        <FollowBtn isFollow={isFollow} />
      </WriterInfoBox>
      <Content>{content}</Content>
      <IconBox>
        <LikeBtn count={likeCount}/>
        <ScrapBtn />
      </IconBox>
      
      {/* 댓글 개수부분을 Comment 관련 파일에서 count해서 출력 ? */}
      <CommentCount>
        {commentCount === 0 ? '댓글이 없습니다.' : `${commentCount}개의 댓글`}
      </CommentCount>
    </PostInfoBoxContainer>
  );
};

export default PostInfoBox;