import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { ReactComponent as CancelSvg } from '../../assets/icon/input-cancel.svg';
import { ReactComponent as ErrorSvg } from '../../assets/icon/error.svg';
import { scentDto } from '../../types/PostInfoType';
import axios from '../../api/apiController';

interface ScentModiProps {
  scentList: scentDto[];
  setScentList: (scents: scentDto[]) => void;
  fav: string;
}

const ScentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0px 2px;
`;

const ScentItem = styled.div`
  background-color: var(--primary-color);
  color: var(--white-color);
  padding: 6px 12px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const AddScent = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--gray-color);
`;

const ScentInput = styled.input`
  width: auto;
  flex-grow: 1;
  background-color: var(--background-color);
  font-size: 15px;
  font-weight: 400;
  color: var(--black-color);
  border: none;
  outline: none;
  padding: 4px 8px;

  &::placeholder {
    color: var(--primary-color);
  }
`;

const MaxScentMessage = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--error-color);
  font-size: 13px;
  margin: 6px;
  gap: 5px;
`;

const CancelSvgColor = styled(CancelSvg)`
  g path {
    fill: var(--white-color);
  }
`;

const SearchResultList = styled.div`
  position: absolute;
  z-index: 1;
  width: 280px;
  max-height: 120px;
  overflow: auto;
  border: 1px solid var(--gray-color);
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 4px 8px;
  background-color: var(--background-color);
`;

const SearchResultItem = styled.div`
  background-color: var(--background-color);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s;
  font-size: 15px;
  font-weight: 400;

  &:hover {
    background-color: var(--secondary-color);
    font-weight: 600;
  }
`;

function ScentModi({ scentList, setScentList, fav }: ScentModiProps) {
  const [showMaxScentMessage, setShowMaxScentMessage] = useState(false);
  const [searchResults, setSearchResults] = useState<scentDto[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDeleteScent = (index: number) => {
    const updatedScents = scentList.filter((_, idx) => idx !== index);
    setScentList(updatedScents);
  };

  const handleAddScent = (selectedScent: scentDto) => {
    if (selectedScent.name.trim() !== '') {
      setSearchKeyword('');
      setSearchResults([]);
      setScentList([...scentList, selectedScent]);
    }
  };

  function isEnglish(str: string) {
    const englishRegex = /^[a-zA-Z]*$/;
    return englishRegex.test(str);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() !== '') {
      if (scentList.length < 3) {
        setShowMaxScentMessage(false);
        axios.get('/perfume/search/scent')
          .then((res) => {
            const dataArray = res.data.map((data: scentDto) => data);
            let matchingScents: scentDto[];

            if (isEnglish(keyword)) {
              matchingScents = dataArray.filter((scent: scentDto) => (
                scent.nameOrg.includes(keyword)
              ));
            } else {
              matchingScents = dataArray.filter((scent: scentDto) => (
                scent.name.includes(keyword)
              ));
            }
            setSearchResults(matchingScents);
          })
          .catch((error) => {
            console.error(error);
            setSearchResults([]);
          });
      } else {
        setShowMaxScentMessage(true);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setSearchResults([]);
  };

  return (
    <MarginFrame margin="8px 6px">
      { (scentList.length > 0) && <ScentList>
        {scentList.map((scent, idx) => (
          <ScentItem key={idx}>
            {scent.name}
            <CancelSvgColor onClick={() => handleDeleteScent(idx)} />
          </ScentItem>
        ))}
      </ScentList>}
      <AddScent>
        <ScentInput
          placeholder={`${fav} 향 계열을 입력해주세요.`}
          value={searchKeyword}
          onChange={handleInputChange}
        />
        { searchKeyword && <CancelSvg style={{ paddingRight: '4px' }} onClick={handleClearSearch}/>}
      </AddScent>
      { (searchResults.length > 0) && (
        <SearchResultList>
          {searchResults.map((result, idx) => (
            <SearchResultItem key={idx} onClick={() => handleAddScent(result)}>
              {isEnglish(searchKeyword) ? `${result.nameOrg} (${result.name})` : result.name}
            </SearchResultItem>
          ))}
        </SearchResultList>
      )}
      {showMaxScentMessage && searchKeyword && (
        <MaxScentMessage>
          <ErrorSvg/>
          향 계열은 최대 3개까지만 추가할 수 있습니다.
        </MaxScentMessage>
      )}
    </MarginFrame>
  );
}

export default ScentModi;
