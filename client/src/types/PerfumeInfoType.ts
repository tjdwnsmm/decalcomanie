//향수 상세 정보 DTO API
export interface PerfumeDetail {
  id: string;
  brand: string;
  korName: string;
  engName: string;
  picture: string;
  accord: ScentDto[];
  noteList: NoteListDto[];
  pick: number;
  rate: number;
}

export interface ScentDto {
  scentId: number;
  name: string;
  rgb: string;
}

export interface NoteListDto {
  noteListId: number;
  noteId: number;
  perfumeId: number;
  type: string;
}
