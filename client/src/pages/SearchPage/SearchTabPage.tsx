import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import FilteringBtn from '../../components/Button/FilteringBtn';
import { styled } from 'styled-components';
import FilterBox from '../../components/Search/FilterBox';
import { CenterFrame, ConfirmButton, Main, MarginFrame } from '../../style';
import SearchResults from '../../components/Search/SearchResults';
import SortToggle, { SortOption } from '../../components/Search/SortToggle';
import BottomNav from '../../components/common/BottomNav';
import axios from '../../api/apiController';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import Spinner from '../../components/common/Spinner';

export interface Filter {
  brandName?: string[];
  gender?: string[];
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
  const [searchResults, setSearchResults] = useState<PerfumeDetail[] | null>(
    null,
  );
  const [originSearchResults, setOriginSearchResults] = useState<
    PerfumeDetail[] | null
  >(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    console.log(`스크롤 위치 : ${scrollPosition}`);
    // localStorage.setItem('scrollPosition', scrollPosition.toString());
  };

  useEffect(() => {
    const storedScrollPosition = localStorage.getItem('scrollPosition');
    if (storedScrollPosition) {
      const scrollY = parseInt(storedScrollPosition);
      scrollToStoredPosition(scrollY);
    }

    // console.log(`스크롤 위치 : ${scrollPosition}`);
    // localStorage.setItem('scrollPosition', scrollPosition.toString());
    window.addEventListener('scroll', handleScroll);

    return () => {
      const scrollY = window.scrollY;
      localStorage.setItem('scrollPosition', scrollY.toString());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const scrollToStoredPosition = (scrollY: number) => {
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('searchResults');

    if (storedData) {
      setSearchResults(JSON.parse(storedData));
      setOriginSearchResults(JSON.parse(storedData));
    } else {
      axios
        .post('/perfume/search', {
          keyword: '',
          brand: [],
          gender: [],
          scent: [],
        })
        .then((res) => {
          setSearchResults(res.data);
          setOriginSearchResults(res.data);
          localStorage.setItem('searchResults', JSON.stringify(res.data));
        });
    }
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
        brand: [],
        gender: [],
        scent: [],
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  /**
   * @summary 필터링 모달을 끄고 키고
   */
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  //![수정] filter.scent 부분 문자열로 넘겨주는게 아니라 향 id 로 넘겨줘야됨!!
  const filterSearch = async (filter: Filter) => {
    try {
      const response = await axios.post('/perfume/search', {
        keyword: searchKeyword,
        brand: filter.brandName ? filter.brandName : [],
        gender: filter.gender ? [filter.gender] : [],
        scent: filter.scent ? filter.scent : [],
      });
      console.log(response);
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
    console.log(
      `나 적용된 필터! 💫: ${JSON.stringify(filter)} filter 갯수는 : ${
        Object.entries(filter).length
      } 개!
      }`,
    );
    calcFilteringNum(filter);
    setSearchResults(await filterSearch(filter)); // 검색 결과
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
            dataList={originSearchResults}
          />

          {searchKeyword.length === 0 && (
            <>
              {/*sorting*/}
              <SortArea>
                <SortToggle onSortChange={handleSortChange} />
              </SortArea>

              {/* 검색 결과 */}

              {searchResults ? (
                <SearchResults
                  results={searchResults}
                  isButton={false}
                  addUrl=""
                />
              ) : (
                <MarginFrame margin="120px auto">
                  <Spinner />
                </MarginFrame>
              )}
            </>
          )}
          <BottomNav />
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
