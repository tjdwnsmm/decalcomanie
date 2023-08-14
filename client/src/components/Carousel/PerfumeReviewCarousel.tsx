import React, { useState } from 'react';
import Carousel from 'react-items-carousel';
import PerfumeReviewBox from '../Perfume/PerfumeReviewBox';
import { NextSvg } from '../Box/AddCarousel';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { PerfumeInfos } from '../../types/PostInfoType';

interface PerfumeReviewCarouselProps {
  rates: number[];
  perfumes: PerfumeInfos[];
}

const PerfumeReviewCarousel: React.FC<PerfumeReviewCarouselProps> = ({
  rates,
  perfumes,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <Carousel
      // 캐러셀 설정
      requestToChangeActive={setActiveItemIndex}
      activeItemIndex={activeItemIndex}
      numberOfCards={1}
      leftChevron={<PrevSvg />}
      rightChevron={<NextSvg />}
      chevronWidth={30}
    >
      {perfumes?.map((perfume, index) => (
        <PerfumeReviewBox
          key={perfume.perfumeId}
          rate={rates[index]}
          brand={perfume.brandName}
          name={perfume.name}
          img={perfume.picture}
        />
      ))}
    </Carousel>
  );
};

export default PerfumeReviewCarousel;
