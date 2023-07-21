import { DrawerFrame, DrawerFrameProps } from './DrawerFrame';
import { MarginFrame } from '../../style';
import { styled } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Perfume } from '../../pages/DrawerPage/MyDrawerPage';

export const DrawerCarousel: React.FC<DrawerFrameProps> = ({
  perfumeList,
  handlePerfume,
}) => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const chunkSize = 6;
  const chunks: Perfume[][] = [];
  for (let i = 0; i < perfumeList.length; i += chunkSize) {
    chunks.push(perfumeList.slice(i, i + chunkSize));
  }

  return (
    <Container>
      <Slider {...settings}>
        {chunks.map((chunk, index) => (
          <div key={index}>
            <MarginFrame margin="40px 0 0" />
            <DrawerFrame
              perfumeList={chunk.slice(0, 3)}
              handlePerfume={handlePerfume}
              stairNum={2 * index}
            />

            {chunk.length > 3 && (
              <>
                <MarginFrame margin="70px 0 0" />
                <DrawerFrame
                  perfumeList={chunk.slice(3, 6)}
                  handlePerfume={handlePerfume}
                  stairNum={2 * index + 1}
                />
              </>
            )}
          </div>
        ))}
      </Slider>
    </Container>
  );
};
const Container = styled.div`
  width: 320px;
  .slick-list {
    height: 480px;
  }
  .slick-dots {
    .slick-active {
      button::before {
        color: var(--primary-color);
      }
    }
    button::before {
      color: var(--gray-color);
    }
  }
  .slick-prev::before,
  .slick-next::before {
    color: var(--gray-color);
  }
`;
