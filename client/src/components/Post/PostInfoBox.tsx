import React from 'react';
import styled from 'styled-components';
import { PostDetailData } from '../../types/PostInfoType';
import FollowBtn from '../Button/FollowBtn';
import PostModalBtn from '../Button/PostModalBtn';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import getLoggedInUserNickname from '../../api/loggedInUserNickname';

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
  justify-content: space-between;
  flex-direction: row;
  margin: 20px 2px 10px;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px 10px;
`;

const InfoBoxRow = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  margin: 3px 0px;
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

const Scent = styled.div`
  display: flex;
  color: ${(props) =>
    props.color === 'fav' ? 'var(--primary-color)' : 'var(--gray-color)'};
  font-size: 10px;
  font-weight: 500;
  margin-right: 5px;
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
  postInfo: PostDetailData;
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
  const { articleDto, bookmarked, userInfoDto, hearted, followed } = postInfo;

  const hasScent =
    userInfoDto.favorities?.length > 0 || userInfoDto.hates?.length > 0;
  const isMyPost = getLoggedInUserNickname() === userInfoDto.user.nickname;

  return (
    <PostInfoBoxContainer>
      <WriterInfoBox>
        <div style={{ display: 'flex' }}>
          <ProfileImg
            src={userInfoDto.user.picture ? userInfoDto.user.picture : ''}
          />
          <InfoBox>
            <InfoBoxRow>
              <Writer>{userInfoDto.user.nickname}</Writer>
              <CreatedAt>{formatDateTime(articleDto.createdAt)}</CreatedAt>
            </InfoBoxRow>
            {hasScent && (
              <InfoBoxRow>
                {userInfoDto.favorities?.map((scent) => (
                  <Scent color="fav">#{scent.name}</Scent>
                ))}
                {userInfoDto.hates?.map((scent) => (
                  <Scent color="hate">#{scent.name}</Scent>
                ))}
              </InfoBoxRow>
            )}
          </InfoBox>
        </div>
        <div style={{ height: '42px', display: 'flex', alignItems: 'center' }}>
          {!isMyPost && (
            <FollowBtn to={articleDto.userId} isFollow={followed} />
          )}
          {isMyPost && <PostModalBtn articleId={articleDto.articleId} />}
        </div>
      </WriterInfoBox>
      <ContentBox>{articleDto.content}</ContentBox>
      <IconBox>
        <LikeBtn
          picked={hearted}
          count={articleDto.heart}
          likeUrl="/sns/like"
          dislikeUrl="/sns/dislike"
          articleId={articleDto.articleId}
        />
        <ScrapBtn articleId={articleDto.articleId} isScrap={bookmarked} />
      </IconBox>
      <CommentCount>
        {articleDto.comment === 0
          ? '댓글이 없습니다.'
          : `${articleDto.comment}개의 댓글`}
      </CommentCount>
    </PostInfoBoxContainer>
  );
};

export default PostInfoBox;
