import React, { useState } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import FilteringBtn from '../../components/Button/FilteringBtn';
import { styled } from 'styled-components';
import FilterBox from '../../components/Search/FilterBox';
import { CenterFrame, ConfirmButton, Main } from '../../style';
import SearchResults from '../../components/Search/SearchResults';
import SortToggle, { SortOption } from '../../components/Search/SortToggle';

export interface PerfumeResult {
  brand: string;
  name: string;
}

interface Filter {
  brand?: string[];
  gender?: string;
  scent?: string[];
}

const SearchTabPage: React.FC = () => {
  //필터링 창 꺼졌는지 켜졌는지 현 상태
  const [modalOpen, setModalOpen] = useState(false);

  //현재 검색할 단어
  const [searchKeyword, setSearchKeyword] = useState('');

  //
  const [filter, setFilter] = useState<Filter>({});

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
    if (!isSearch) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword('');
    }
    setSearchResults([]);
  };

  /**
   * @summary 필터링 모달을 끄고 키고
   */
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  /**
   *
   * @param filter 현재 적용된 필터 정보 - interface Filter로 관리
   */
  const handleApplyFilters = (filter: Filter) => {
    setModalOpen(false); // 모달 닫기
    setFilter(filter);
    console.log(
      `나 적용된 필터! 💫: ${JSON.stringify(filter)} filter 갯수는 : ${
        Object.entries(filter).length
      } 개!
      }`,
    );
    calcFilteringNum(filter);
    setSearchResults([]); // 검색 결과
  };

  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.Popularity,
  );

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  /**
   * @param filter : 필터링된 조건 목록
   * @returns : 필터링 건 조건들의 수
   */
  const calcFilteringNum = (filter: Filter) => {
    let cnt = 0;
    Object.entries(filter).map((category) => {
      cnt += category[1].length;
    });
    return cnt;
  };

  return (
    <Main>
      <TopButton>
        {/* 필터링 버튼 */}
        <FilteringBtn
          onToggleModal={handleModal}
          filteringNum={calcFilteringNum(filter)}
        />
      </TopButton>

      {!modalOpen && (
        <>
          <SearchBar
            onSearch={handleSearch}
            placeholder="검색어를 입력해주세요"
            fetchURL="https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
          />

          {searchKeyword.length === 0 && (
            <>
              {/*sorting*/}
              <SortArea>
                <SortToggle onSortChange={handleSortChange} />
              </SortArea>

              {/* 검색 결과 */}
              <SearchResults results={searchResults} isButton={false} />
            </>
          )}
        </>
      )}

      {/* 필터링 모달 */}
      {modalOpen && (
        <>
          <FilterBox onApplyFilters={handleApplyFilters} filterNow={filter} />
          {/* 모달 닫기 버튼 */}
          <CenterFrame>
            <ConfirmButton
              onClick={handleModal}
              color={'secondary'}
              background={'secondary'}
            >
              취소
            </ConfirmButton>
          </CenterFrame>
        </>
      )}
    </Main>
  );
};

export default SearchTabPage;

const TopButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
  margin-top: 25px;
`;

const SortArea = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 15px 20px 0;
`;
