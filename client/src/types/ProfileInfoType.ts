export interface FollowInfo {
  userId: string;
  picture: string;
  nickname: string;
  favorite: string[];
  isFollowing: boolean;
}

export interface ProfileUpdateInfo {
  nickname: string,
  favorite: string[];
  hate: string[];
  img: string;
}
