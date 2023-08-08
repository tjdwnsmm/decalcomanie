import React, { useState } from 'react';
import Carousel from 'react-items-carousel';
import PerfumeReviewBox from '../Perfume/PerfumeReviewBox';
import { NextSvg } from '../Box/AddCarousel';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { gradeDto, perfumeInfos } from '../../types/PostInfoType';

interface PerfumeReviewCarouselProps {
  grades: gradeDto[];
  perfumes: perfumeInfos[];
}

const PerfumeReviewCarousel: React.FC<PerfumeReviewCarouselProps> = ({
  grades,
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
          rate={grades[index].rate}
          brand={perfume.brandName}
          name={perfume.nameOrg}
          img={perfume.picture}
        />
      ))}
    </Carousel>
  );
};

export default PerfumeReviewCarousel;
