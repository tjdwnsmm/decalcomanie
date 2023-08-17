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
  nickname: string;
  deletedAt: string | null;
  age: number;
  gender: number;
  picture: string | null;
}

export interface scentDto {
  scentId: number;
  weight: number;
  nameOrg: string;
  name: string;
  rgb: string;
}

export interface userInfoDto {
  user: user;
  favorities: scentDto[];
  hates: scentDto[];
  following: boolean;
  me: boolean;
  withdrawal: boolean;
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
  favorities: scentDto[];
  hates: scentDto[];
  following: boolean;
  me: boolean;
  withdrawal: boolean;
}

export interface PerfumeInfos {
  perfumeId: number;
  name: string;
  nameOrg: string;
  brandName: string;
  brandNameOrg: string;
  brandId: number;
  picture: string;
  rate: number;
}

// export interface gradeDto {
//   userId: string;
//   perfumeId: number;
//   rate: number;
// }

export interface PostDetailData {
  articleDto: articleDto;
  userInfoDto: userInfoDto;
  comments: commentDto[];
  commmentUsers: commmentUsers[];
  perfumeInfos: PerfumeInfos[];
  rates: number[];
  hearted: boolean;
  bookmarked: boolean;
  followed: boolean;
}
