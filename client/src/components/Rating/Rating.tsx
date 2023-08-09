import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

interface PerfumeRatingBoxProps {
  name: string;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  width: 300px;
`;

const StyledRating = MUstyled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-color)',
  },
});

function PerfumeRatingBox({ name }: PerfumeRatingBoxProps) {
  return <>{name}</>;
}

export default function AddRating({
  perfumeList,
}: {
  perfumeList: PerfumeDetail;
}) {
  const [value, setValue] = useState<number | null>(0); // 별점 값 저장을 위한 상태

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null,
  ) => {
    setValue(newValue); // 변경된 별점 값을 상태에 저장
    localStorage.setItem('rating', newValue);
    console.log(localStorage.getItem('rating'));
  };

  return (
    <>
      <Stack spacing={0}>
        <StyledDiv>
          <PerfumeRatingBox name={perfumeList.name} />
          <StyledRating
            name="half-rating"
            value={value}
            precision={0.5}
            onChange={handleRatingChange} // 별점 변경 이벤트 핸들러
          />
        </StyledDiv>
      </Stack>
    </>
  );
}
