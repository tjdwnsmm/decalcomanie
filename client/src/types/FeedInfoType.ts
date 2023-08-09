//API 인터페이스

import { PerfumeDetail } from './PerfumeInfoType';
import { ProfileUpdateInfo } from './ProfileInfoType';

export interface FeedDetail {
  perfumeDtos: PerfumeDetail[];
  articleDtos: ArticleDetail[];
}

export interface ArticleDetail {
  createdAt: string;
  updatedAt: string;
  articleId: number;
  userId: string;
  content: string;
  heart: number;
  comment: number;
  picked: boolean;
  isScrap: boolean;
}

export interface EachFeedInfo {
  perfumeDtos: PerfumeDetail;
  articleDtos: ArticleDetail;
  bookmarked: boolean;
  followed: boolean;
  hearted: boolean;
  userInfoDto: ProfileUpdateInfo;
}
