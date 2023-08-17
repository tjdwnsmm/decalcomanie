import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import SearchResults from '../../components/Search/SearchResults';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import axios from '../../api/apiController';
import { AutoSearch } from '../../types/SearchType';
import { useFetchDatas } from '../../components/Search/useFetchData';
import useIntersect from '../../hooks/useIntersect';
import { styled } from 'styled-components';
import Spinner from '../../components/common/Spinner';

const SEARCH_RESULT_TIMEOUT = 5000; // 5 seconds

const SearchMyPerfume: React.FC = () => {
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  //현재 검색할 단어
  const [searchKeyword, setSearchKeyword] = useState('');

  //검색 결과 창
  const [searchResults, setSearchResults] = useState<PerfumeDetail[]>([]);

  //자동완성 검색 결과
  const [originSearchResults, setOriginSearchResults] = useState<
    AutoSearch[] | null
  >(null);

  //필터나 검색어를 이용한 검색
  const [newSearch, setNewSearch] = useState(false);
  const [lastPick, setLastPick] = useState(-1);
  const [lastRate, setLastRate] = useState(-1);
  const [lastPerfumeId, setLastPerfumeId] = useState(-1);

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useFetchDatas({
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
      fetchNextPage();
      //console.log('✅ 이전까지 받아온 데이터!', datas);
      // datas = [];
      setLastPerfumeId(datas[datas.length - 1].perfumeId);
      setLastPick(datas[datas.length - 1].pick);
      setLastRate(datas[datas.length - 1].rate);
    }
  });

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
        const data = await searchPerfume(keyword);
        setSearchResults(data.searchedPerfumes);
        setNewSearch(true);
        //console.log(`진짜 데이터 검색 : ${searchResults}`);
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
        lastPick: null,
        lastPerfumeId: null,
        orderType: 1,
      });
      // //console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
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
      <SearchBar
        onSearch={handleSearch}
        placeholder="검색어를 입력해주세요"
        dataList={originSearchResults}
      />
      {searchKeyword.length === 0 &&
        (newSearch ? (
          searchResults?.length > 0 ? (
            <SearchResults
              results={searchResults}
              isButton={true}
              addUrl="/user/perfume/manage"
            />
          ) : (
            <MarginFrame margin="120px auto">
              <Spinner />
            </MarginFrame>
          )
        ) : datas.length > 0 ? (
          <>
            <SearchResults
              results={datas}
              isButton={true}
              addUrl="/user/perfume/manage"
            />
            {/* {!isFetching && isLoading && <Spinner />} */}
            <MarginFrame margin="100px auto" />
            <Target ref={ref} />
          </>
        ) : (
          <MarginFrame margin="120px auto">
            <Spinner />
          </MarginFrame>
        ))}
      {/* <FloatingTopBtn /> */}
    </Main>
  );
};

const Target = styled.div`
  height: 3px;
`;

const ErrorTxt = styled.div`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin-top: 270px;
`;
export default SearchMyPerfume;
