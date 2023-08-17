import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar, { dataByUrlProps } from './SearchBar';
import { CenterFrame, ConfirmButton, MarginFrame } from '../../style';
import { ReactComponent as CancelSvg } from '../../assets/icon/input-cancel.svg';
import axios from '../../api/apiController';

interface FilterBoxProps {
  onApplyFilters: (filter: Filter) => void;
  filterNow: Filter;
}

interface Filter {
  brand?: string[];
  brandId?: number[];
  gender?: number[];
  scent?: string[];
  scentId?: number[];
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
  const [brandInfo, setBrandInfo] = useState<dataByUrlProps[]>([]);
  const [scentInfo, setScentInfo] = useState<dataByUrlProps[]>([]);

  const BRAND_URL = `/perfume/search/brand`;
  const SCENT_URL = `/perfume/search/scent`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(BRAND_URL);
        const scentResponse = await axios.get(SCENT_URL);

        const brandDataArray = brandResponse.data.map(
          (data: dataByUrlProps) => data,
        );
        const scentDataArray = scentResponse.data.map(
          (data: dataByUrlProps) => data,
        );

        setBrandInfo(brandDataArray);
        setScentInfo(scentDataArray);
      } catch (error) {
        console.error('오류:', error);
      }
    };

    fetchData();
  }, []);

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

  const getId = (type: string, searchKeyword: string): number => {
    //console.log(brandInfo, scentInfo);
    let id: number | undefined = 0;

    switch (type) {
      case 'brand':
        const brand = brandInfo.find((brand) => brand.name === searchKeyword);
        if (brand) {
          id = brand.brandId;
        }
        break;
      case 'scent':
        const scent = scentInfo.find((scent) => scent.name === searchKeyword);
        if (scent) {
          id = scent.scentId;
        }
        break;
    }
    if (id === undefined) {
      return 0;
    }
    return id;
  };

  const handleBrandSearch = (keyword: string, isSearch: boolean) => {
    const nowId = getId('brand', keyword);
    //console.log(`nowID = ${nowId}`);
    if (isSearch) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        brand: prevFilter.brand ? [...prevFilter.brand, keyword] : [keyword],
        brandId: prevFilter.brandId ? [...prevFilter.brandId, nowId] : [nowId],
      }));
      setBrandInput('');
    } else {
      setBrandInput(keyword);
    }
  };
  const handleScentSearch = (keyword: string, isSearch: boolean) => {
    // //console.log(`💨Filter-Scent > ${keyword} and ${isSearch}`);
    const nowId = getId('scent', keyword);
    //console.log(`nowID = ${nowId}`);
    if (isSearch) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        scent: prevFilter.scent ? [...prevFilter.scent, keyword] : [keyword],
        scentId: prevFilter.scentId ? [...prevFilter.scentId, nowId] : [nowId],
      }));
      setScentInput('');
    } else {
      setScentInput(keyword);
    }
  };

  const handleGenderChange = (value: number) => {
    setFilter((prevFilter) => {
      const genderArr = prevFilter.gender || [];
      if (genderArr.includes(value)) {
        // Deselect if already selected
        return {
          ...prevFilter,
          gender: genderArr.filter((gender) => gender !== value),
        };
      } else {
        return {
          ...prevFilter,
          gender: [...genderArr, value],
        };
      }
    });
  };

  const handleRemoveBrandSearch = (idx: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      brand: prevFilter.brand?.filter((item, index) => index !== idx),
      brandId: prevFilter.brandId?.filter((item, index) => index !== idx),
    }));
  };
  const handleRemoveScentSearch = (idx: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      scent: prevFilter.scent?.filter((item, index) => index !== idx),
      scentId: prevFilter.scentId?.filter((item, index) => index !== idx),
    }));
  };

  return (
    <FilterContainer>
      {/* 브랜드 필터링 */}
      <FilterTitle>브랜드</FilterTitle>
      <SearchBar
        onSearch={handleBrandSearch}
        placeholder="브랜드 명을 입력해주세요"
        fetchURL={BRAND_URL}
      />

      <RecentBtnList>
        {filter.brand?.map((brand, idx) => (
          <RecentBtn key={idx}>
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

          <CheckboxContainer>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                value={0}
                checked={filter.gender?.includes(0) || false}
                onChange={(e) => handleGenderChange(Number(e.target.value))}
              />
              <label htmlFor="check_btn">
                <span>남성</span>
              </label>
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                value={1}
                checked={filter.gender?.includes(1) || false}
                onChange={(e) => handleGenderChange(Number(e.target.value))}
              />
              <label htmlFor="check_btn">
                <span>여성</span>
              </label>
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                value={2}
                checked={filter.gender?.includes(2) || false}
                onChange={(e) => handleGenderChange(Number(e.target.value))}
              />
              <label htmlFor="check_btn">
                <span>남녀공용</span>
              </label>
            </CheckboxLabel>
          </CheckboxContainer>

          <MarginFrame margin="15px 0 0" />

          {/* 향 계열 필터링 */}
          <FilterTitle>향 계열</FilterTitle>
          <SearchBar
            onSearch={handleScentSearch}
            placeholder="선호하시는 향 계열을 입력해주세요"
            fetchURL={SCENT_URL}
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
const CheckboxContainer = styled.div`
  margin: 15px 0 10px 20px;
  display: flex;
`;

const CheckboxLabel = styled.label`
  margin-right: 15px;
  display: flex;
  align-items: center;
  label {
    margin-left: 1px;
  }
`;

const CheckboxInput = styled.input`
  color: var(--primary-color);
  width: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  margin: 8px 0;
  flex-wrap: wrap;
  flex-direction: column;
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
