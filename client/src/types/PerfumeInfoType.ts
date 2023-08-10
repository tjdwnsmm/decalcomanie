//향수 상세 정보 DTO API
export interface PerfumeDetail {
  perfumeId: number;
  brandId: number;
  brandName: string;
  name: string;
  nameOrg: string;
  picture: string;
  gender: number;
  accord: ScentDto[];
  note: NoteListDto[];
  pick: number; // 찜 수
  rate: number | null; // 평점
  longevity: number; // 지속력 (5점만점)
  sillage: number; // 잔향감 (4점만점)
  picked: boolean; //
  spring: number;
  summer: number;
  fall: number;
  winter: number;
  day: number;
  night: number;
  // occasion: OccationInfo[];
}

export interface OccationInfo {
  occasion: string;
  weight: number;
}

export interface ScentDto {
  scentId: number;
  name: string;
  rgb: string;
  weight: number;
}

/**
 * @noteListId : 사용자는 건드리지 않는 부분
 * @noteId :note 넘버
 * @noteName : note 이름
 * @type : Top, Middle, Base
 */
export interface NoteListDto {
  noteListId: number;
  noteId: number;
  perfumeId: number;
  type: string;
  noteName: string;
}
