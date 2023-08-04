import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../types/PostInfoType';
import FollowBtn from '../Button/FollowBtn';
import { PostModalBtn } from '../Button/PostModalBtn';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import { USERID } from '../../api/apiController';

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
  margin: 8px 25px 8px 20px;
`;

const WriterInfoBox = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  margin: 20px 0px 10px;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0px 8px;
`;

const InfoBoxRow = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  margin-top: 3px;
`;

const Writer = styled.div`
  color: var(--black-color);
  font-size: 14px;
  font-weight: 700;
`;

const CreatedAt = styled.div`
  color: var(--gray-color);
  font-size: 11px;
  font-weight: 400;
  margin-left: 10px;
`;

const FavScent = styled.div`
  display: flex;
  color: var(--primary-color);
  font-size: 10px;
  font-weight: 500;
  margin-right: 10px;
`;

const NoFavScent = styled.div`
  display: flex;
  color: var(--gray-color);
  font-size: 10px;
  font-weight: 500;
  margin-top: 2px;
`;

const ContentBox = styled.div`
  color: var(--black-color);
  margin: 5px;
  padding-left: 40px;
  font-size: 13px;
  font-weight: 400;
  white-space: pre-wrap;
  line-height: 20px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 12px;
  border-bottom: 1.2px solid var(--gray-color);
`;

const CommentCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin: 25px 5px 5px;
`;

interface PostInfoBoxProps {
  postInfo: PostInfo;
}

const formatDateTime = (datetimeStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const datetime = new Date(datetimeStr);
  return datetime.toLocaleDateString('ko-KR', options);
};

const PostInfoBox = ({ postInfo }: PostInfoBoxProps) => {
  const {
    articleId,
    profileImg,
    writer,
    createdAt,
    favScent,
    nofavScent,
    isFollow,
    likeCount,
    isLike,
    isScrap,
    content,
    commentCount,
  } = postInfo;

  // isWriter: 글 작성자와 request.user의 일치 여부를 나타내는 로직 구현
  // 같을 경우 팔로우 버튼이 아닌 글 수정/삭제 모달을 띄우기 위해
  // 현재는 임시로 설정
  // const isWriter = true;
  const isWriter = false;

  return (
    <PostInfoBoxContainer>
      <WriterInfoBox>
        <ProfileImg src={profileImg} alt="프로필 사진" />
        <InfoBox>
          <InfoBoxRow>
            <Writer>{writer}</Writer>
            <CreatedAt>{formatDateTime(createdAt)}</CreatedAt>
          </InfoBoxRow>
          <InfoBoxRow>
            <FavScent>{favScent?.map((fav) => `#${fav}  `)}</FavScent>
            <NoFavScent>{nofavScent?.map((fav) => `#${fav}  `)}</NoFavScent>
          </InfoBoxRow>
        </InfoBox>
        {!isWriter && (
          <FollowBtn
            // 글 상세 api 연결하면서 수정 필
            from={USERID}
            to={USERID}
            isFollow={isFollow}
          />
        )}
        {isWriter && <PostModalBtn />}
      </WriterInfoBox>
      <ContentBox>{content}</ContentBox>
      <IconBox>
        <LikeBtn
          picked={isLike}
          count={likeCount}
          likeUrl="/sns/like"
          dislikeUrl="/sns/dislike"
          articleId={articleId}
        />
        <ScrapBtn articleId={articleId} isScrap={isScrap} />
      </IconBox>
      {/* 댓글 개수부분을 Comment 관련 파일에서 count해서 출력 ? */}
      <CommentCount>
        {commentCount === 0 ? '댓글이 없습니다.' : `${commentCount}개의 댓글`}
      </CommentCount>
    </PostInfoBoxContainer>
  );
};

export default PostInfoBox;
