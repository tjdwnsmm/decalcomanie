import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-items-carousel';
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
  width: 387.5px;
  height: 150px;
  border: 1.25px dashed var(--primary-color);
`;

const NotEmptyBox = styled.div`
  display: flex;
  justify-content: center;
  width: 360px;
  height: 150px;
  border: 1.25px dashed var(--primary-color);
  box-shadow: 5px 5px 5px var(--gray-color);
  margin: 5px 5px;
  border-radius: 10px;
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
  width: 180px;
  height: 150px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  opacity: 80%;
`;
// ---------------------------------------------
const PerfumeReviewBoxContainer = styled.div`
  display: flex;
  background: var(--white-color);
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
  width: 360px;
  height: 150px;
  border: 1.25px solid var(--primary-color);
  box-shadow: 5px 5px 5px var(--gray-color);
  margin: 5px 5px;
  border-radius: 10px;
`;

const TextInfoContainer = styled.div`
  padding: 0px 10px;
  width: 60px;
`;

const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 10px;
  width: 100px;
`;

const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 12px;
  font-weight: bold;
  width: 100px;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

function PerfumeReviewBox({ brand, name, img }) {
  return (
    <PerfumeReviewBoxContainer>
      <TextInfoContainer>
        <PerfumeBrand>{brand}</PerfumeBrand>
        <PerfumeName>{name}</PerfumeName>
      </TextInfoContainer>
      <ImgBox>
        <img src={img} />
      </ImgBox>
    </PerfumeReviewBoxContainer>
  );
}

export default function AddCarousel({ perfumes }: PerfumeReviewCarouselProps) {
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
          chevronWidth={15}
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
          <NotEmptyBox>
            <TextArea>
              향수를 추가해주세요
              <StyledAddButtonSvg
                onClick={() => {
                  navigate('/search-myperfume');
                }}
              />
            </TextArea>
          </NotEmptyBox>
        </Carousel>
      )}
    </>
  );
};

