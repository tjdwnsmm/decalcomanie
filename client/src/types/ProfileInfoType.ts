export interface FollowInfo {
  profileImg: string;
  writer: string;
  favScent: string[];
  isFollow: boolean;
}

export interface ProfileUpdateInfo {
  user: userInfo;
  favorite: string[];
  hate: string[];
  img: string;
}

export interface userInfo {
  userId: string;
  accessToken: string;
  nickname: string;
}
