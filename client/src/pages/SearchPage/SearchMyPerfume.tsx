import React, { useState } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import { Main } from '../../style';
import SearchResults from '../../components/Search/SearchResults';

export interface PerfumeResult {
  brand: string;
  name: string;
}

const SearchMyPerfume: React.FC = () => {
  //현재 검색할 단어
  const [searchKeyword, setSearchKeyword] = useState('');

  //검색 결과 창
  const [searchResults, setSearchResults] = useState<PerfumeResult[]>([]);

  /**
   *
   * @param event 살시간으로 입력받는 단어를 검색어로 설정
   */
  const handleSearchKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchKeyword(event.target.value); // 검색할 단어
  };

  /**
   * @summary 검색 결과를 가져오는 로직을 구현 - 예시로 검색 결과를 빈 배열로 설정
   */
  const handleSearch = (keyword: string, isSearch: boolean) => {
    console.log(`💨 ${keyword} and ${isSearch}`);
    setSearchResults([]);
  };

  return (
    <Main>
      <SearchBar
        onSearch={handleSearch}
        placeholder="검색어를 입력해주세요"
        fetchURL="https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
      />
      {/* 검색 결과 */}
      <SearchResults results={searchResults} isButton={true} />
    </Main>
  );
};

export default SearchMyPerfume;
