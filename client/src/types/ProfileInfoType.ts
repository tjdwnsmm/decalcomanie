export interface FollowInfo {
  userId: string;
  picture: string;
  nickname: string;
  favorite: string[];
  isFollowing: boolean;
}

export interface ProfileUpdateInfo {
  user: userInfo;
  favorities: string[];
  hates: string[];
  img: string;
}

export interface userInfo {
  userId: string;
  accessToken: string;
  nickname: string;
  picture: string;
  age: number;
  gender: number;
}
