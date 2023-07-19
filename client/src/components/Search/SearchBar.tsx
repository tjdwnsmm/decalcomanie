import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import { ReactComponent as InputCancelSvg } from '../../assets/icon/input-cancel.svg';
import { ReactComponent as SearchSvg } from '../../assets/icon/search.svg';

// API로 받아오는 MovieData (현재 랜덤 API 이용)
interface MovieData {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}

interface Movie {
  includes(data: string): boolean;
  city: string;
}

interface SearchBoxProps {
  onSearch: (keyword: string, booleanCheck: boolean) => void;
  placeholder: string;
  fetchURL: string;
}

/**
 *
 * @param onSearch : 검색
 * @param placeholder : 검색 input바의 placeholder
 * @param fetchURL : 호출 보낼 API url
 */
const SearchBar: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder,
  fetchURL,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);

  /**
   * @param event : 입력값이 바뀔때마다
   */
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword, false);
  };

  /**
   * @summary : API 를 통해 데이터 받아옴
   */
  const fetchData = async () => {
    const res = await fetch(fetchURL);
    const data = await res.json();
    return data.slice(0, 100);
  };

  /**
   * @summary : 받아온 데이터를 입력 값을 포함하는 여부로 filtering (8개까지)
   */
  const updateData = async () => {
    const res = await fetchData();
    const filteredResults = res
      .filter((list: Movie) => list.city.includes(keyword))
      .slice(0, 8);
    setSearchResults(filteredResults);
    //filtering 된 결과값은 따로 저장
  };

  // 키워드가 변경되면 api를 호출
  const debouncedKeyword = useDebounce(keyword);
  useEffect(() => {
    //컴포넌트가 랜더링 될때마다 수행
    if (debouncedKeyword) {
      updateData();
    }
  }, [debouncedKeyword]);

  /**
   * @summary 검색어 입력 - 전체 삭제
   */
  const clearKeyword = () => {
    setKeyword('');
    onSearch('', false);
  };

  return (
    <>
      <SearchBox>
        <SearchSvg />
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          placeholder={placeholder}
        />
        {keyword && (
          <ExitBox onClick={clearKeyword}>
            <InputCancelSvg />
          </ExitBox>
        )}
      </SearchBox>

      {searchResults.length > 0 && keyword ? (
        <AutoSearchContainer>
          <AutoSearchWrap>
            {searchResults.map((search, idx) => (
              <AutoSearchData
                key={idx}
                onClick={() => {
                  setKeyword('');
                  onSearch(search.city, true);
                }}
              >
                <a href="#">{search.city}</a>
              </AutoSearchData>
            ))}
          </AutoSearchWrap>
        </AutoSearchContainer>
      ) : (
        searchResults.length === 0 &&
        keyword && (
          <AutoSearchContainer>
            <AutoSearchWrap>
              <AutoSearchData>
                <a>검색된 결과가 없습니다.</a>
              </AutoSearchData>
            </AutoSearchWrap>
          </AutoSearchContainer>
        )
      )}
    </>
  );
};

export default SearchBar;

const SearchBox = styled.div`
  margin: 8px 20px;
  padding: 0 18px;
  display: flex;
  width: 80%;
  height: 48px;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  border-radius: 5px;
  background-color: var(--white-color);
`;

const SearchInput = styled.input`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  font-weight: 400;
  line-height: 150%;
  &::placeholder {
    letter-spacing: -0.014px;
    color: var(--gray-color);
  }
  &:focus {
    outline: none;
  }
`;

const ExitBox = styled.div`
  display: flex;
  align-items: center;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
`;

const AutoSearchWrap = styled.ul`
  list-style: none;
  padding: 0 40px;
  margin: auto;
`;

const AutoSearchData = styled.li`
  height: 52px;
  width: 80%;
  font-size: 16px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.016px;
  z-index: 4;
  &:hover {
    cursor: pointer;
  }

  a {
    line-height: 52px;
    text-decoration: none;
    color: var(--black-color);
    font-weight: normal;
  }
`;
