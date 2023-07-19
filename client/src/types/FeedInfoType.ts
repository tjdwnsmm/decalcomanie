//API 인터페이스

export interface PerfumeInfo {
  name: string;
  brand: string;
  scent: string;
  img: string;
}

export interface FeedProps {
  perfumeInfo: PerfumeInfo;
  writer: string;
  profileImg: string;
  like: number;
  comment: number;
  isScrap: boolean;
  content: string;
  favScent?: string[];
  nofavScent?: string[];
}
