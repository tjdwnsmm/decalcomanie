import React from 'react';
import FilteringBtn from '../../components/Button/FilteringBtn';
import FilterBox from '../../components/Search/FilterBox';
import { CenterFrame, ConfirmButton } from '../../style';
import { Filter } from '../../pages/SearchPage/SearchTabPage';
import { styled } from 'styled-components';

interface FilterSectionProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filter: Filter;
  handleApplyFilters: (filter: Filter) => void;
  calcFilteringNum: (filter: Filter) => number;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  modalOpen,
  setModalOpen,
  filter,
  handleApplyFilters,
  calcFilteringNum,
}) => {
  return (
    <>
      <TopButton>
        {/* Filtering Button */}
        <FilteringBtn
          onToggleModal={() => setModalOpen(!modalOpen)}
          filteringNum={calcFilteringNum(filter)}
        />
      </TopButton>

      {modalOpen && (
        <>
          <FilterBox onApplyFilters={handleApplyFilters} filterNow={filter} />
          {/* Modal Close Button */}
          <CenterFrame>
            <ConfirmButton
              onClick={() => setModalOpen(false)}
              color={'secondary'}
              background={'secondary'}
            >
              취소
            </ConfirmButton>
          </CenterFrame>
        </>
      )}
    </>
  );
};

export default FilterSection;

const TopButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
  margin-top: 25px;
`;
