import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import { ReactComponent as InputCancelSvg } from '../../assets/icon/input-cancel.svg';
import { ReactComponent as SearchSvg } from '../../assets/icon/search.svg';
import Spinner from '../common/Spinner';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import axios from '../../api/apiController';
import { AutoSearch } from '../../types/SearchType';

interface SearchBoxProps {
  onSearch: (keyword: string, booleanCheck: boolean) => void;
  placeholder: string;
  dataList?: AutoSearch[] | null;
  fetchURL?: string;
}

export interface dataByUrlProps {
  name: string;
  nameOrg: string;
  brandId?: number;
  scentId?: number;
}

/**
 *
 * @param onSearch : 검색
 * @param placeholder : 검색 input바의 placeholder
 * @param dataList : 향수 이름 목록
 * @param fetchUrl : url 로부터 api 호출로 data 넘기는 경우
 */
const SearchBar: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder,
  dataList,
  fetchURL,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [dataByURL, setDataByURL] = useState<dataByUrlProps[]>([]);

  useEffect(() => {
    if (fetchURL) {
      axios.get(fetchURL).then((res) => {
        const dataArray = res.data.map((data: dataByUrlProps) => data);
        setDataByURL(dataArray);
      });
    }
    // console.log('받아온 데이터 - ', dataByURL);
  }, []);

  /**
   * @param event : 입력값이 바뀔때마다
   */
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword, false);
  };
  /**
   * @summary : 받아온 데이터를 입력 값을 포함하는 여부로 filtering (8개까지)
   */
  const updateData = async () => {
    setIsFetching(true);

    //이 부분은 데이터 이름으로 바로 검색 가능한 경우 ex. 브랜드, 성별
    if (fetchURL) {
      const filteredResults = dataByURL
        .filter(
          (list: dataByUrlProps) =>
            list.nameOrg.toLowerCase().includes(keyword.toLowerCase()) ||
            list.name.includes(keyword),
        )
        .map((data: dataByUrlProps) => data.name)
        .slice(0, 8);
      console.log(filteredResults);
      setSearchResults(filteredResults);
      setIsFetching(false);
    }

    // 향수 전체 이름으로 검색할 떄 사용
    if (dataList) {
      const filteredResults = dataList
        .filter(
          (list: AutoSearch) =>
            list.nameOrg.toLowerCase().includes(keyword.toLowerCase()) ||
            list.name.includes(keyword),
        )
        .map((perfume: AutoSearch) => perfume.name)
        .slice(0, 8);
      setSearchResults(filteredResults);
      setIsFetching(false);
      //filtering 된 결과값은 따로 저장
    }
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
    setIsSearch(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log(e);
    //향수 이름 검색에 ENTER 지원
    if (e.key === 'Enter' && dataList) {
      setKeyword('');
      onSearch(keyword, true);
      setIsSearch(false);
    }
  };

  return (
    <>
      <SearchBox>
        <SearchSvg />
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          placeholder={placeholder}
          onKeyDown={handleKeyPress}
        />
        {keyword && (
          <ExitBox onClick={clearKeyword}>
            <InputCancelSvg />
          </ExitBox>
        )}
      </SearchBox>

      {isFetching && keyword ? (
        <Spinner />
      ) : searchResults.length > 0 && keyword && !isSearch ? (
        <AutoSearchContainer>
          <AutoSearchWrap>
            {searchResults.map((search, idx) => (
              <AutoSearchData
                key={idx}
                onClick={() => {
                  setKeyword('');
                  onSearch(search, true);
                  setIsSearch(false);
                }}
              >
                <a href="#">
                  {search.length > 20 ? search.slice(0, 20) + '...' : search}
                </a>
              </AutoSearchData>
            ))}
          </AutoSearchWrap>
        </AutoSearchContainer>
      ) : (
        searchResults.length === 0 &&
        keyword &&
        !isSearch && (
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
