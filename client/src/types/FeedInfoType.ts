//API 인터페이스

import { PerfumeDetail } from './PerfumeInfoType';

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
}

export interface EachFeedInfo {
  perfumeDtos: PerfumeDetail;
  articleDtos: ArticleDetail;
}
