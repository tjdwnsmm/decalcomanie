export interface articleDto {
  createdAt: string;
  updatedAt: string;
  articleId: number;
  userId: string;
  content: string;
  heart: number;
  comment: number;
}

export interface user {
  userId: string;
  accessToken: string;
  nickname: string;
  deletedAt: string | null;
  age: number;
  gender: number;
  refreshToken: string;
  picture: string | null;
}

export interface scent {
  scentId: number;
  weight: number;
  name: string;
  rgb: string;
}

export interface userInfoDto {
  user: user;
  favorities: scent[];
  hates: scent[];
  following: boolean;
}

export interface commentDto {
  createdAt: string;
  updatedAt: string;
  commentId: number;
  articleId: number;
  userId: string;
  content: string;
}

export interface commmentUsers {
  user: user;
  favorities: scent[];
  hates: scent[];
  following: boolean;
}

export interface perfumeInfos {
  perfumeId: number;
  name: string;
  nameOrg: string;
  brandName: string;
  brandId: number;
  picture: string;
  rate: number;
}

export interface gradeDto {
  userId: string;
  perfumeId: number;
  rate: number;
}

export interface PostDetailData {
  articleDto: articleDto;
  userInfoDto: userInfoDto;
  comments: commentDto[];
  commmentUsers: commmentUsers[]
  perfumeInfos: perfumeInfos[];
  gradeDto: gradeDto[];
  hearted: boolean;
  bookmarked: boolean;
  followed: boolean;
}
