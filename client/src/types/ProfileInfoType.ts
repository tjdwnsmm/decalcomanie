export interface FollowInfo {
  profileImg: string;
  writer: string;
  favScent: string[];
  isFollow: boolean;
}

export interface ProfileUpdateInfo {
  nickname: string,
  favorite: string[];
  hate: string[];
  img: string;
}
