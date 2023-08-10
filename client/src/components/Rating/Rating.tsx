import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { PerfumeInfos } from '../../types/PostInfoType';

interface PerfumeRatingBoxProps {
  name: string;
  rate: number;
  onChange: (newRate: number) => void;
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

function PerfumeRatingBox({ name, rate, onChange }: PerfumeRatingBoxProps) {
  return (
    <>
      {name}
      <StyledRating
        name={`rating-${name}`}
        value={rate}
        precision={0.5}
        onChange={(event: React.ChangeEvent<{}>, newRate: number | null) => {
          if (newRate !== null) {
            onChange(newRate);
          }
        }}
      />
    </>
  );
}

interface Props {
  perfumes: PerfumeInfos[];
}

export default function AddRating({ perfumes }: Props) {
  const [rateData, setRateData] = useState<
    { perfumeId: number; rate: number }[]
  >(JSON.parse(localStorage.getItem('postPerfume') || '[]'));

  useEffect(() => {
    localStorage.setItem('postPerfume', JSON.stringify(rateData));
  }, [rateData]);

  const handleRatingChange = (perfumeId: number, newRate: number) => {
    const updatedRateData = rateData.map((item) =>
      item.perfumeId === perfumeId ? { ...item, rate: newRate } : item,
    );
    setRateData(updatedRateData);
  };

  return (
    <Stack spacing={1.1}>
      {perfumes.map((perfume: PerfumeInfos, index: number) => {
        const rateInfo = rateData.find(
          (item) => item.perfumeId === perfume.perfumeId,
        );
        return (
          <StyledDiv key={index}>
            <PerfumeRatingBox
              name={perfume.name}
              rate={rateInfo ? rateInfo.rate : 0}
              onChange={(newRate) =>
                handleRatingChange(perfume.perfumeId, newRate)
              }
            />
          </StyledDiv>
        );
      })}
    </Stack>
  );
}
