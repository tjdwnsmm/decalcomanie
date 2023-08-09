import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../api/apiController';
import { EachFeedInfo } from '../../types/FeedInfoType';
import { LikeBtn } from '../Button/LikeBtn';
import { ScrapBtn } from '../Button/ScrapBtn';
import { CommentBtn } from '../Button/CommentBtn';
import { useNavigate } from 'react-router-dom';

interface FeedComponentProps {
  feed: EachFeedInfo;
  handleFollow: (userId: string, follow: boolean) => void;
}

/**
@summary
FeedBox : 향수 피드 페이지에서의 하나의 피드 구분
InfoBox : 피드 작성 정보 부분 내용
  - ProfileBox : 닉네임과 프로필 이미지, 좋아하는/싫어하는 향 계열
  - Scrap : 스크랩 버튼
ContentBox : 피드 게시물 내용
IconBox : 좋아요 아이콘, 좋아요 수, 댓글 수, 댓글 아이콘
*/

const FeedPageOnly = ({ feed, handleFollow }: FeedComponentProps) => {
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(feed.followed);

  useEffect(() => {
    setFollowed(feed.followed);
  }, [feed]);

  const handleDetail = (articleId: number) => {
    navigate(`/post-detail/${articleId}`);
  };

  const removeHtmlTags = (inputString: string) => {
    return inputString.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const handleFollowClick = (userId: string) => {
    axios.post('/user/follow', { to: userId }).then((res) => {
      console.log(res.data);
      handleFollow(feed.userInfoDto.user.userId, !followed);
      setFollowed(!followed);
    });
  };

  return (
    <>
      <FeedBox>
        <InfoBox>
          <ProfileBox>
            <LeftProfile>
              <img
                src={
                  feed.userInfoDto.user.picture
                    ? feed.userInfoDto.user.picture
                    : '../../src/assets/img/profile-img.png'
                }
              />
              <ProfileInfoBox>
                <ProfileNickname>
                  {feed.userInfoDto.user.nickname}
                  <Follow
                    onClick={() => {
                      handleFollowClick(feed.userInfoDto.user.userId);
                    }}
                  >
                    {followed ? (
                      <div className="following">팔로잉</div>
                    ) : (
                      '팔로우'
                    )}
                  </Follow>
                </ProfileNickname>
                <Scent>
                  {feed.userInfoDto.favorities.length === 0 &&
                  feed.userInfoDto.hates.length === 0 ? (
                    <NoFavScent>
                      선호/비선호 향을 등록하지 않은 사용자입니다.
                    </NoFavScent>
                  ) : (
                    <>
                      <FavScent>
                        {feed.userInfoDto.favorities?.map((fav) => `#${fav}  `)}
                      </FavScent>
                      <NoFavScent>
                        {feed.userInfoDto.hates?.map((fav) => `#${fav}  `)}
                      </NoFavScent>
                    </>
                  )}
                </Scent>
              </ProfileInfoBox>
            </LeftProfile>
            <ScrapBtn
              isScrap={feed.bookmarked}
              articleId={feed.articleDtos.articleId}
            />
          </ProfileBox>
        </InfoBox>

        <ContentBox onClick={() => handleDetail(feed.articleDtos.articleId)}>
          {removeHtmlTags(
            feed.articleDtos.content.length > 100
              ? feed.articleDtos.content.slice(0, 100) + '...'
              : feed.articleDtos.content,
          )}
        </ContentBox>
        <IconBox>
          <LikeBtn
            picked={feed.hearted}
            count={feed.articleDtos.heart}
            likeUrl="/sns/like"
            dislikeUrl="/sns/dislike"
            articleId={feed.articleDtos.articleId}
          />
          <CommentBtn count={feed.articleDtos.comment} />
        </IconBox>
      </FeedBox>
    </>
  );
};

export default FeedPageOnly;

const LeftProfile = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 300px;
`;

const Follow = styled.div`
  margin-left: 10px;
  color: var(--primary-color);

  .following {
    color: var(--dark-gray-color);
  }
`;

const ProfileNickname = styled.div`
  display: flex;
  gap: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  img {
    width: 40px;
  }
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Scent = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;
const FavScent = styled.div`
  display: flex;
  color: var(--primary-color);
  font-size: 10px;
  font-weight: 400;
  gap: 3px;
`;
const NoFavScent = styled.div`
  display: flex;
  color: var(--gray-color);
  font-size: 10px;
  font-weight: 400;
  gap: 3px;
`;
const IconBox = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 10px;
`;

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  background-color: var(--white-color);
  width: 310px;
  margin-top: 13px;
  border-radius: 5px;
`;

const ContentBox = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  margin: 20px 10px 0px;
`;
