import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MarginFrame } from '../../style';
import { ReactComponent as CancelSvg } from '../../assets/icon/input-cancel.svg';
import { scent } from '../../types/PostInfoType';
import axios from '../../api/apiController';

interface ScentModiProps {
  scents: scent[];
  fav: string;
  onAddScent: (scent: scent) => void;
}

const ScentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
  font-size: 12px;
  color: var(--error-color);
  margin-top: 4px;
`;

function ScentModi({ scents, fav, onAddScent }: ScentModiProps) {
  const [scentList, setScentList] = useState(scents);
  const [newScent, setNewScent] = useState('');
  const [showMaxScentMessage, setShowMaxScentMessage] = useState(false);
  const [searchResults, setSearchResults] = useState<scent[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDeleteScent = (index: number) => {
    const updatedScents = scentList.filter((_, idx) => idx !== index);
    setScentList(updatedScents);
  };

  const handleAddScent = (selectedScent: scent) => {
    if (scentList.length >= 3) {
      setShowMaxScentMessage(true);
      return;
    }

    setShowMaxScentMessage(false);

    if (selectedScent.name.trim() !== '') {
      setSearchKeyword('');
      setSearchResults([]);
      setScentList([...scentList, selectedScent.name]);
      setNewScent('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() !== '') {
      axios.get('/perfume/search/scent')
        .then((res) => {
          const dataArray = res.data.map((data: scent) => data);
          const matchingScents = dataArray.filter((scent: scent) =>
            scent.name.includes(keyword));
          setSearchResults(matchingScents);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        });
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
      { searchKeyword && (
        <SearchResultList>
          {searchResults.map((result, idx) => (
            <SearchResultItem key={idx} onClick={() => handleAddScent(result)}>
              {result.name}
            </SearchResultItem>
          ))}
        </SearchResultList>
      )}
      {showMaxScentMessage && (
        <MaxScentMessage>
          향 계열은 최대 3개까지만 추가할 수 있습니다.
        </MaxScentMessage>
      )}
    </MarginFrame>
  );
}

export default ScentModi;

const CancelSvgColor = styled(CancelSvg)`
  g path {
    fill: var(--white-color);
  }
`;

const SearchResultList = styled.div`
  position: absolute;
  z-index: 1;
  width: 280px;
  height: 150px;
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
