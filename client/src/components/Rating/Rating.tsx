import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled as MUstyled } from '@mui/material/styles';
import { styled } from 'styled-components';
import Carousel from 'react-items-carousel';

interface Perfume {
  name: string;
}

interface PerfumeRatingBoxProps {
  name: string;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRating = MUstyled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-color)',
  },
});

const Button = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  opacity: 80%;
`;

function PerfumeRatingBox({ name }: PerfumeRatingBoxProps) {
  return <>{name}</>;
}

export default function AddRating({ perfumes }: { perfumes: Perfume[] }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <>
      <Carousel
        // 캐러셀 설정
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        leftChevron={<Button>{'<'}</Button>}
        rightChevron={<Button>{'>'}</Button>}
        chevronWidth={15}
        showSlither={false}
        outsideChevron={false}
      >
        {perfumes.map((perfume, index) => (
          <StyledDiv>
            <PerfumeRatingBox key={index} name={perfume.name} />
            <StyledRating name="half-rating" defaultValue={0} precision={1} />
          </StyledDiv>
        ))}
      </Carousel>
    </>
  );
};