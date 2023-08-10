import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { perfumeInfos } from '../../types/PostInfoType';

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

interface Props {
  perfumes: perfumeInfos[];
  rates?: number[];
}

export default function AddRating({ perfumes, rates }: Props) {
  const [value, setValue] = useState<number | null>(null); // 별점 값 저장을 위한 상태

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null,
  ) => {
    setValue(newValue); // 변경된 별점 값을 상태에 저장
    localStorage.setItem('rating', JSON.stringify(newValue));
    const storedValue: string | null = localStorage.getItem('rating');
    // number 형태로 type 변환
    const nowValue: number = parseFloat(storedValue ? storedValue : '0');
    console.log(nowValue);
  };

  return (
    <Stack spacing={0}>
      <StyledDiv>
        <PerfumeRatingBox name={perfumes[0].name} />
        <StyledRating
          name="half-rating"
          value={value}
          precision={0.5}
          onChange={handleRatingChange} // 별점 변경 이벤트 핸들러
        />
      </StyledDiv>
    </Stack>
  );
}
