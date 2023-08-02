// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import MainPerfumeInfo from '../Main/MainPerfumeInfo';
import { ReactComponent as ArrowSvg } from '../../assets/icon/nextArrow.svg';

interface MainCarouselProps {
  perfumes: PerfumeDetail[];
}
const MainSwiper = ({ perfumes }: MainCarouselProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const navigate = useNavigate();
  const handlePerfumeInfo = (perfumeId: number) => {
    navigate(`/perfume-detail/${perfumeId}`);
  };

  return (
    <SwiperContainer>
      <Swiper slidesPerView={3} spaceBetween={20}>
        {perfumes.map((perfume, index) => (
          <SwiperSlide key={index}>
            <div
              className="each-slide"
              onClick={() => {
                handlePerfumeInfo(perfume.perfumeId);
              }}
            >
              <MainPerfumeInfo perfumeInfo={perfume} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
  margin: 30px;
  .swiper {
    width: 100%;
  }

  .each-slide {
    margin: 0;
  }
  .swiper-slide {
    width: fit-content;
  }
  .swiper-wrapper {
    display: -webkit-inline-box;
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

export default MainSwiper;
