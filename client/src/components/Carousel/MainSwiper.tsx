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
    <>
      <Info>
        <div className="title">김수민님을 위한 추천</div>
        <div className="subtitle">
          서랍에 담은 향수들에 기반한 맞춤 추천 결과입니다
        </div>
      </Info>
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
    </>
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
const Info = styled.div`
  margin: 40px 30px;
  .title {
    font-weight: 700;
    font-size: 23px;
  }
  .subtitle {
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  span {
    color: var(--primary-color);
  }
`;

export default MainSwiper;
