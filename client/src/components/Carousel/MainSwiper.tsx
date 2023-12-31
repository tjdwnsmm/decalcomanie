import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import MainPerfumeInfo from '../Main/MainPerfumeInfo';

interface MainCarouselProps {
  perfumes: PerfumeDetail[];
}
const MainSwiper = ({ perfumes }: MainCarouselProps) => {
  const navigate = useNavigate();
  const handlePerfumeInfo = (perfumeId: number) => {
    navigate(`/perfume-detail/${perfumeId}`);
  };

  return (
    <>
      <SwiperContainer>
        <Swiper slidesPerView={'auto'} spaceBetween={-35}>
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
    </>
  );
};

const SwiperContainer = styled.div`
  margin: 0 0 0 30px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  .swiper {
    width: 100%;
  }

  .each-slide {
    margin: 0;
    cursor: pointer;
  }
  .swiper-slide {
    width: fit-content;
  }
  .swiper-wrapper {
    display: -webkit-inline-box;
  }
`;

export default MainSwiper;
