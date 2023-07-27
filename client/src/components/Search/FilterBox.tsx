import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { CenterFrame, ConfirmButton, MarginFrame } from '../../style';
import { ReactComponent as CancelSvg } from '../../assets/icon/input-cancel.svg';
interface FilterBoxProps {
  onApplyFilters: (filter: Filter) => void;
  filterNow: Filter;
}

interface Filter {
  brand?: string[];
  gender?: string[];
  scent?: string[];
}

/**
 * @param onApplyFilters : handleApplyFilters
 *                       - 현재 적용된 필터 정보 저장
 * @summary : 필터 적용 컴포넌트
 */
const FilterBox: React.FC<FilterBoxProps> = ({ onApplyFilters, filterNow }) => {
  //현재 필터된 정보들
  const [filter, setFilter] = useState<Filter>(filterNow);
  const [brandInput, setBrandInput] = useState('');
  const [scentInput, setScentInput] = useState('');
  /**
   *@summary filter 정보가 바뀔때마다 업데이트
   * @param filterName 필터명 : ex) 브랜드, 성별, 향 계열 등등
   * @param value  필터 : ex) 딥디크, 남, 여 등등
   */
  const handleFilterChange = (filterName: string, value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
    }));
  };

  /**
   * @summary 필터 최종 등록
   */
  const handleApplyFilters = () => {
    onApplyFilters(filter);
  };

  const handleBrandSearch = (keyword: string, isSearch: boolean) => {
    // console.log(`💨Filter-Brand > ${keyword} and ${isSearch}`);
    if (isSearch) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        brand: prevFilter.brand ? [...prevFilter.brand, keyword] : [keyword],
      }));
      setBrandInput('');
    } else {
      setBrandInput(keyword);
    }
  };
  const handleScentSearch = (keyword: string, isSearch: boolean) => {
    // console.log(`💨Filter-Scent > ${keyword} and ${isSearch}`);
    if (isSearch) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        scent: prevFilter.scent ? [...prevFilter.scent, keyword] : [keyword],
      }));
      setScentInput('');
    } else {
      setScentInput(keyword);
    }
  };

  const handleRemoveBrandSearch = (idx: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      brand: prevFilter.brand?.filter((item, index) => index !== idx),
    }));
  };
  const handleRemoveScentSearch = (idx: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      scent: prevFilter.scent?.filter((item, index) => index !== idx),
    }));
  };

  return (
    <FilterContainer>
      {/* 브랜드 필터링 */}
      <FilterTitle>브랜드</FilterTitle>
      <SearchBar
        onSearch={handleBrandSearch}
        placeholder="브랜드 명을 입력해주세요"
        fetchURL="/perfume/search/brand"
      />

      <RecentBtnList>
        {filter.brand?.map((brand, idx) => (
          <RecentBtn>
            {brand}
            <CancelSvg
              onClick={() => {
                handleRemoveBrandSearch(idx);
              }}
            />
          </RecentBtn>
        ))}
      </RecentBtnList>

      {brandInput.length == 0 && (
        <>
          {/* 성별 필터링 */}
          <MarginFrame margin="15px 0 0" />
          <FilterTitle>성별</FilterTitle>
          <Select
            value={filter.gender || ''}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">미선택</option>
            <option value="0">남성</option>
            <option value="1">여성</option>
            <option value="2">남녀공용</option>
          </Select>

          <MarginFrame margin="15px 0 0" />

          {/* 향 계열 필터링 */}
          <FilterTitle>향 계열</FilterTitle>
          <SearchBar
            onSearch={handleScentSearch}
            placeholder="선호하시는 향 계열을 입력해주세요"
            fetchURL="/perfume/search/scent"
          />
          <RecentBtnList>
            {filter.scent?.map((scent, idx) => (
              <RecentBtn>
                {scent}
                <CancelSvg
                  onClick={() => {
                    handleRemoveScentSearch(idx);
                  }}
                />
              </RecentBtn>
            ))}
          </RecentBtnList>
        </>
      )}

      {/* 필터링 검색 버튼 */}
      <MarginFrame margin={'30px 0 0'} />
      <CenterFrame>
        <ConfirmButton
          onClick={handleApplyFilters}
          color={'primary'}
          background={'primary'}
        >
          필터 적용하기
        </ConfirmButton>
      </CenterFrame>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  margin: 8px 0;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Select = styled.select`
  border-radius: 5px;
  font-size: 14px;
  border: none;
  outline: none;
  margin: 8px 20px;
  padding: 0 18px;
  display: flex;
  height: 48px;
  & option {
    color: var(--primary-color);
  }
`;

const FilterTitle = styled.div`
  font-weight: 600;
  color: var(--primary-color);
  margin: 10px 0 5px 20px;
`;

const RecentBtn = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 21px;
  color: var(--white-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  padding: 4px 8px;
  gap: 6px;
  border-radius: 4px;
  background: var(--primary-color);
  svg path {
    fill: var(--white-color);
  }
`;

const RecentBtnList = styled.div`
  display: flex;
  margin-left: 20px;
  width: 80%;
  flex-wrap: wrap;
  gap: 5px;
`;

export default FilterBox;
