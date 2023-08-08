import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-items-carousel';
import { ReactComponent as AddButtonSvg } from '../../assets/img/add-button.svg';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { CenterFrame } from '../../style';
import { perfumeInfos } from '../../types/PostInfoType';

interface PerfumeReviewCarouselProps {
  perfumes: perfumeInfos[];
}

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 140px;
  background-color: var(--white-color);
`;

const NotEmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 140px;
  border: 1.25px dashed var(--primary-color);
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
  height: 140px;
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
  gap: 70px;
  align-items: center;
  padding: 0px 0px;
  width: 340px;
  height: 140px;
  // border: 1.25px solid var(--primary-color);

  border-radius: 10px;
`;

const TextInfoContainer = styled.div`
  padding: 0px 10px;
  width: 60px;
`;

const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 11px;
  width: 120px;
  margin-bottom: 5px;
`;

const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 18px;
  font-weight: bold;
  width: max-content;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

interface ReviewBoxProps {
  brand: string;
  name: string;
  img: string;
}

function PerfumeReviewBox({ brand, name, img }: ReviewBoxProps) {
  return (
    <CenterFrame>
      <PerfumeReviewBoxContainer>
        <TextInfoContainer>
          <PerfumeBrand>{brand}</PerfumeBrand>
          <PerfumeName>{name}</PerfumeName>
        </TextInfoContainer>
        <ImgBox>
          <img src={img} />
        </ImgBox>
      </PerfumeReviewBoxContainer>
    </CenterFrame>
  );
}

export default function AddCarousel({ perfumes }: PerfumeReviewCarouselProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <CarouselBox>
      {perfumes.length === 0 ? (
        <CenterFrame>
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
        </CenterFrame>
      ) : (
        <Carousel
          // 캐러셀 설정
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={1}
          leftChevron={<PrevSvg />}
          rightChevron={<NextSvg />}
          chevronWidth={80}
          showSlither={false}
          outsideChevron={false}
        >
          {perfumes.map((perfume, index) => (
            <PerfumeReviewBox
              key={index}
              brand={perfume.brandName}
              name={perfume.nameOrg}
              img={perfume.picture}
            />
          ))}
          <CenterFrame>
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
          </CenterFrame>
        </Carousel>
      )}
    </CarouselBox>
  );
}

export const NextSvg = styled(PrevSvg)`
  transform: rotate(180deg);
`;

const CarouselBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 35px 5px 12px;

  .grBOFc {
    align-items: center;
  }
`;
