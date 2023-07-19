import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-items-carousel';
import PerfumeReviewBox from './PerfumeReviewBox.tsx';

interface Perfume {
  rate: number;
  brand: string;
  name: string;
  img: string;
}

interface PerfumeReviewCarouselProps {
  perfumes: Perfume[];
}

const Button = styled.button`
  background: none;
  border: none;
  color: var(--gray-color);
  font-size: 25px;
  cursor: pointer;
`;

const PerfumeReviewCarousel: React.FC<PerfumeReviewCarouselProps> = ({
  perfumes,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <Carousel
      // 캐러셀 설정
      requestToChangeActive={setActiveItemIndex}
      activeItemIndex={activeItemIndex}
      numberOfCards={1}
      leftChevron={<Button>{'<'}</Button>}
      rightChevron={<Button>{'>'}</Button>}
      chevronWidth={30}
    >
      {perfumes.map((perfume, index) => (
        <PerfumeReviewBox
          key={index}
          rate={perfume.rate}
          brand={perfume.brand}
          name={perfume.name}
          img={perfume.img}
        />
      ))}
    </Carousel>
  );
};

export default PerfumeReviewCarousel;
