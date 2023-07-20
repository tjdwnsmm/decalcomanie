import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-items-carousel';
import PerfumeReviewBox from '../Perfume/PerfumeReviewBox.tsx';
import { ReactComponent as AddButtonSvg } from '../../assets/img/add-button.svg';

interface Perfume {
  brand: string;
  name: string;
  img: string;
}

interface PerfumeReviewCarouselProps {
  perfumes: Perfume[];
}
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 1.5px dashed var(--primary-color);
  box-shadow: 5px 5px 5px var(--gray-color);
`;

const StyledAddButtonSvg = styled(AddButtonSvg)`
  margin-top: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const TextArea = styled.span`
  color: var(--primary-color);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--gray-color);
  font-size: 25px;
  cursor: pointer;
`;

const AddCarousel = ({ perfumes }: PerfumeReviewCarouselProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      {perfumes.length === 0 ? (
        <EmptyBox>
          <TextArea>
            향수를 추가해주세요
            <StyledAddButtonSvg
              onClick={() => {
                navigate('/search');
              }}
            />
          </TextArea>
        </EmptyBox>
      ) : (
        <Carousel
          // 캐러셀 설정
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={1}
          leftChevron={<Button>{'<'}</Button>}
          rightChevron={<Button>{'>'}</Button>}
          chevronWidth={30}
          gutter={10}
          showSlither={false}
          outsideChevron={false}
        >
          {perfumes.map((perfume, index) => (
            <PerfumeReviewBox
              key={index}
              brand={perfume.brand}
              name={perfume.name}
              img={perfume.img}
            />
          ))}
          <EmptyBox>
            <TextArea>
              향수를 추가해주세요
              <StyledAddButtonSvg
                onClick={() => {
                  navigate('/search-myperfume');
                }}
              />
            </TextArea>
          </EmptyBox>
        </Carousel>
      )}
    </>
  );
};

export default AddCarousel;

// export default function Carousel() {
//   const [numOfCards, setNumOfCards] = useState(0);
//   const [activeItemIndex, setActiveItemIndex] = useState(0);
//   return (
//       <ItemsCarousel
//         requestToChangeActive={0}
//         activeItemIndex={activeItemIndex}
//         numberOfCards={1}
//         gutter={10}
//         showSlither={false}
//         leftChevron={<Button>{'<'}</Button>}
//         rightChevron={<Button>{'>'}</Button>}
//         outsideChevron={false}
//       >
//         <div style={{ width: 150, height: 151, background: '#EEE' }}>First card</div>
//         <div style={{ width: 150, height: 151, background: '#EEE' }}>First card</div>
//         <div style={{ width: 150, height: 151, background: '#EEE' }}>First card</div>
//         <div style={{ width: 150, height: 151, background: '#EEE' }}>First card</div>
//       </ItemsCarousel>
//   );
// }
