export interface FollowInfo {
  userId: string;
  picture: string;
  nickname: string;
  favorite: string[];
  isFollowing: boolean;
}

export interface userInfo {
  userId: string;
  accessToken: string;
  nickname: string;
}

export interface ProfileUpdateInfo {
  user: userInfo;
  favorite: string[];
  hate: string[];
  img: string;
}
