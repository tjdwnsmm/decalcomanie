import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import { styled } from 'styled-components';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import SearchResults from '../../components/Search/SearchResults-more';
import SortToggle, { SortOption } from '../../components/Search/SortToggle';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import Spinner from '../../components/common/Spinner';
import useIntersect from '../../hooks/useIntersect';
import { useFetchDatas } from '../../components/Search/useFetchData';
import { AutoSearch } from '../../types/SearchType';
import FilterSection from '../../components/Search/FilterSection';
import { useNavigate } from 'react-router-dom';

export interface Filter {
  brandName?: string[];
  brandId?: number[];
  gender?: number[];
  scent?: string[];
  scentId?: number[];
}
const SEARCH_RESULT_TIMEOUT = 5000; // 5 seconds

const SearchTabPage: React.FC = () => {
  const navigate = useNavigate();
  //필터링 창 꺼졌는지 켜졌는지 현 상태
  const [modalOpen, setModalOpen] = useState(false);

  //현재 검색할 단어
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  //
  const [filter, setFilter] = useState<Filter>({});

  //검색 결과 창
  const [searchResults, setSearchResults] = useState<PerfumeDetail[] | null>(
    null,
  );

  //자동완성용 useState
  const [originSearchResults, setOriginSearchResults] = useState<
    AutoSearch[] | null
  >(null);

  //정렬 useState
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.Popularity,
  );
  const [sortChange, setSortChange] = useState(false);

  //필터나 검색어를 이용한 검색
  const [newSearch, setNewSearch] = useState(false);

  const [lastPick, setLastPick] = useState(-1);
  const [lastRate, setLastRate] = useState(-1);
  const [lastPerfumeId, setLastPerfumeId] = useState(-1);
  const [lastSearch, setLastSearch] = useState(false);

  // const [datas, setDatas] = useState<PerfumeDetail[]>([]);
  useEffect(() => {
    // 이전 검색 기록을 sessionStorage에서 가져와서 우선적으로 사용
    const storedSearchResults = sessionStorage.getItem('searchResults');
    if (storedSearchResults) {
      setLastSearch(true);
      setSearchResults(JSON.parse(storedSearchResults));
    }

    // sessionStorage에서 filter를 불러오기
    const storedFilter = sessionStorage.getItem('filter');
    const parsedFilter = storedFilter ? JSON.parse(storedFilter) : {};
    setFilter(parsedFilter);

    if (calcFilteringNum(parsedFilter) === 0) {
      setNewSearch(false);
      setLastSearch(false);
    }

    if (!localStorage.getItem('sort')) {
      setSortOption(SortOption.Popularity);
    } else {
      //console.log('redirect - ', localStorage.getItem('sort'));
      if (localStorage.getItem('sort') == '2') {
        setSortOption(SortOption.Grade);
      }
    }
  }, []);

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchDatas({
      filter,
      searchKeyword,
      newSearch,
      lastPick,
      lastPerfumeId,
      lastRate,
    });

  const datas = useMemo(() => (data ? data : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      // setDatas([]);
      await fetchNextPage();
      // //console.log('✅ 이전까지 받아온 데이터!', datas);
      // setDatas((prevDatas) => [...prevDatas, ...datas]);
      setLastPerfumeId(datas[datas.length - 1].perfumeId);
      setLastPick(datas[datas.length - 1].pick);
      setLastRate(datas[datas.length - 1].rate);
    }
  });

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    //console.log('here');
    localStorage.setItem(
      'sort',
      newSortOption === SortOption.Popularity ? '1' : '2',
    );
    location.reload();

    setSortChange(true);
  };

  useEffect(() => {
    axios.get('/perfume/search/names').then((res) => {
      const fullNames = res.data;
      setOriginSearchResults(fullNames);
    });
  }, []);

  useEffect(() => {
    if (newSearch && (!searchResults || searchResults.length === 0)) {
      const timeoutId = setTimeout(() => {
        setShowNoResultsMessage((prevShowNoResultsMessage) => {
          if (
            prevShowNoResultsMessage ||
            !searchResults ||
            searchResults.length === 0
          ) {
            return true;
          }
          return prevShowNoResultsMessage;
        });
      }, SEARCH_RESULT_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchResults]);

  const handleBack = () => {
    location.reload();
  };

  /**
   * @summary 검색 결과를 가져오는 로직을 구현 - 예시로 검색 결과를 빈 배열로 설정
   */
  const handleSearch = async (keyword: string, isSearch: boolean) => {
    //console.log(`💨 ${keyword} and ${isSearch}`);
    if (!isSearch) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword('');
      setSearchResults([]);
      try {
        setNewSearch(true);
        setSearchResults([]);
        const data = await searchPerfume(keyword);
        setSearchResults(data.searchedPerfumes);
        // sessionStorage.setItem(
        //   'searchResults',
        //   JSON.stringify(data.searchedPerfumes),
        // );
        //console.log(data);
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
        brand: [],
        gender: [],
        scent: [],
        dataSize: 200,
        orderType: sortOption === SortOption.Popularity ? 1 : 2,
      });
      //console.log(response.data.searchedPerfumes);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const filterSearch = async (filter: Filter) => {
    //console.log(filter);
    try {
      const response = await axios.post('/perfume/search', {
        keyword: searchKeyword,
        brand: filter.brandId ? filter.brandId : [],
        gender: filter.gender ? filter.gender : [],
        scent: filter.scentId ? filter.scentId : [],
        dataSize: 200,
        orderType: sortOption === SortOption.Popularity ? 1 : 2,
      });
      //console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  /**
   *
   * @param filter 현재 적용된 필터 정보 - interface Filter로 관리
   */
  const handleApplyFilters = async (filter: Filter) => {
    setModalOpen(false); // 모달 닫기
    setFilter(filter);
    sessionStorage.setItem('filter', JSON.stringify(filter));
    //console.log(
    //   `나 적용된 필터! 💫: ${JSON.stringify(
    //     filter,
    //   )} filter 갯수는 : ${calcFilteringNum(filter)} 개!
    //   }`,
    // );
    setSearchResults(null);
    if (calcFilteringNum(filter) === 0) {
      setNewSearch(false);
      setLastSearch(false);
    } else {
      setNewSearch(true);
    }
    const filterDatas = await filterSearch(filter);
    setSearchResults(filterDatas.searchedPerfumes); // 검색 결과
    sessionStorage.setItem(
      'searchResults',
      JSON.stringify(filterDatas.searchedPerfumes),
    );
  };

  /**
   * @param filter : 필터링된 조건 목록
   * @returns : 필터링 건 조건들의 수
   */
  const calcFilteringNum = (filter: Filter) => {
    let cnt = 0;
    Object.entries(filter).map(([key, value]) => {
      if (key !== 'brandId' && key !== 'scentId') {
        cnt += value?.length || 0;
      }
    });
    return cnt;
  };

  if (showNoResultsMessage) {
    return (
      <>
        <ErrorTxt>검색 결과가 없습니다 😥</ErrorTxt>
        <MarginFrame margin="15px 25px 0">
          <CenterFrame>
            <ConfirmButton
              color="primary"
              background="primary"
              onClick={handleBack}
            >
              검색화면으로 돌아가기
            </ConfirmButton>
          </CenterFrame>
        </MarginFrame>
      </>
    );
  }

  return (
    <Main>
      <FilterSection
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        filter={filter}
        handleApplyFilters={handleApplyFilters}
        calcFilteringNum={calcFilteringNum}
      />

      {!modalOpen && (
        <>
          <SearchBar
            onSearch={handleSearch}
            placeholder="검색어를 입력해주세요"
            dataList={originSearchResults}
          />

          {searchKeyword.length === 0 && (
            <>
              {/*sorting*/}
              <SortArea>
                <SortToggle onSortChange={handleSortChange} />
              </SortArea>

              {/* 검색 결과 */}

              {newSearch ? (
                <>
                  {searchResults && searchResults.length > 0 ? (
                    <>
                      <SearchResults
                        results={searchResults}
                        isButton={false}
                        addUrl=""
                      />
                      <MarginFrame margin="100px auto" />
                    </>
                  ) : (
                    <MarginFrame margin="120px auto">
                      <Spinner />
                    </MarginFrame>
                  )}
                </>
              ) : lastSearch ? (
                searchResults && searchResults.length > 0 ? (
                  <>
                    <SearchResults
                      results={searchResults}
                      isButton={false}
                      addUrl=""
                    />
                    <MarginFrame margin="100px auto" />
                  </>
                ) : (
                  <MarginFrame margin="120px auto">
                    <Spinner />
                  </MarginFrame>
                )
              ) : (
                <>
                  {datas.length > 0 ? (
                    <>
                      <SearchResults
                        results={datas}
                        isButton={false}
                        addUrl=""
                      />
                      {!isFetching && isLoading && <Spinner />}
                      <MarginFrame margin="100px auto" />
                      <Target ref={ref} />
                    </>
                  ) : (
                    <MarginFrame margin="120px auto">
                      <Spinner />
                    </MarginFrame>
                  )}
                </>
              )}
            </>
          )}
          <BottomNav />
        </>
      )}
    </Main>
  );
};

export default SearchTabPage;
const Target = styled.div`
  height: 3px;
`;

const SortArea = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 15px 20px 0;
`;
const ErrorTxt = styled.div`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-top: 270px;
`;
