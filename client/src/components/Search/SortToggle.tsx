import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

export enum SortOption {
  Popularity = 'popularity',
  Grade = 'grade',
}

interface SortToggleProps {
  onSortChange: (sortOption: SortOption) => void;
}

const SortToggle: React.FC<SortToggleProps> = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState(SortOption.Popularity);

  useEffect(() => {
    if (!localStorage.getItem('sort')) {
      setSortOption(SortOption.Popularity);
    } else {
      //console.log('redirect - ', localStorage.getItem('sort'));
      if (localStorage.getItem('sort') == '2') {
        setSortOption(SortOption.Grade);
      }
    }
  }, []);
  const handleToggle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let newSortOption = event.target.value as SortOption;
    //console.log('handle', newSortOption);
    setSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <Select value={sortOption} onChange={handleToggle}>
      <option value="popularity">인기순</option>
      <option value="grade">평점순</option>
    </Select>
  );
};

export default SortToggle;
const Select = styled.select`
  border: none;
  outline: none;
  padding: 3px 5px;
  font-size: 13px;
  font-weight: 600;
  background: var(--background-color);
  color: var(--primary-color);
`;
