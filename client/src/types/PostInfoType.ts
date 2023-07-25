export interface Perfume {
  rate: number;
  name: string;
  brand: string;
  img: string;
}

export interface PostInfo {
  profileImg: string;
  writer: string;
  createdAt: string;
  favScent: string[];
  nofavScent: string[];
  isFollow: boolean;
  likeCount: number;
  isLike: boolean;
  isScrap: boolean;
  content: string;
  commentCount: number;
}

export interface Comment {
  profileImg: string;
  writer: string;
  createdAt: string;
  content: string;
}

export interface Post {
  perfumes: Perfume[];
  postInfo: PostInfo;
  comments: Comment[];
}
