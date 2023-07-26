import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import { Main } from '../../style';
import SearchResults from '../../components/Search/SearchResults';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import axios from '../../api/apiController';

const SearchMyPerfume: React.FC = () => {
  //현재 검색할 단어
  const [searchKeyword, setSearchKeyword] = useState('');

  //검색 결과 창
  const [searchResults, setSearchResults] = useState<PerfumeDetail[]>([]);

  const [originSearchResults, setOriginSearchResults] = useState<
    PerfumeDetail[] | null
  >(null);

  useEffect(() => {
    axios.post('/perfume/search').then((res) => {
      setSearchResults(res.data);
      setOriginSearchResults(res.data);
    });
  }, []);

  /**
   * @summary 검색 결과를 가져오는 로직을 구현 - 예시로 검색 결과를 빈 배열로 설정
   */
  const handleSearch = async (keyword: string, isSearch: boolean) => {
    console.log(`💨 ${keyword} and ${isSearch}`);
    if (!isSearch) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword('');
      setSearchResults([]);
      try {
        console.log(`진짜 데이터 검색 : ${searchResults}`);
        const data = await searchPerfume(keyword);
        setSearchResults(data);
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      }
    }
  };

  const searchPerfume = async (keyword: string) => {
    try {
      const response = await axios.post('/perfume/search', {
        keyword: keyword,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <Main>
      <SearchBar
        onSearch={handleSearch}
        placeholder="검색어를 입력해주세요"
        dataList={originSearchResults}
      />
      {searchKeyword.length === 0 && (
        <SearchResults results={searchResults} isButton={true} />
      )}
    </Main>
  );
};

export default SearchMyPerfume;
