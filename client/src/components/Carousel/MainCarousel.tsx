import React, { useState } from 'react';
import { styled } from 'styled-components';
import Carousel from 'react-items-carousel';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { PerfumeDetail } from '../../types/PerfumeInfoType.ts';
import MainPerfumeInfo from '../Main/MainPerfumeInfo.tsx';
import { NextSvg } from '../Box/AddCarousel.tsx';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';
import { useNavigate } from 'react-router-dom';

interface MainCarouselProps {
  perfumes: PerfumeDetail[];
}

const MainCarousel: React.FC<MainCarouselProps> = ({ perfumes }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const navigate = useNavigate();
  const handlePerfumeInfo = (perfumeId: number) => {
    navigate(`/perfume-detail/${perfumeId}`);
  };
  return (
    <CarouselWrapper>
      <Carousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        leftChevron={<PrevSvg />}
        rightChevron={<NextSvg />}
        chevronWidth={60}
        infiniteLoop={true}
        disableSwipe={false}
      >
        {perfumes.map((perfume, index) => (
          <div key={index}>
            <MainPerfumeInfo perfumeInfo={perfume} />
            <RecommendButton
              onClick={() => {
                handlePerfumeInfo(perfume.perfumeId);
              }}
            >
              향수 정보 보러가기
              <ArrowSvg />
            </RecommendButton>
          </div>
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};

export default MainCarousel;

const CarouselWrapper = styled.div`
  position: relative;

  .dvxQVR {
    top: -35px;
  }
`;

const RecommendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 235px;
  height: 16px;
  margin: 15px auto;
  border-radius: 5px;
  background: var(--primary-color);
  color: var(--white-color);
  padding: 9px 13px;
  font-size: 13px;
  font-weight: 500;
`;
