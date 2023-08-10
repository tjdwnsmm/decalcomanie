import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-items-carousel';
import { ReactComponent as AddButtonSvg } from '../../assets/img/add-button.svg';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { CenterFrame } from '../../style';
import { PerfumeDetail } from '../../types/PerfumeInfoType';
import { PerfumeInfos } from '../../types/PostInfoType';

interface ReviewBoxProps {
  brand: string;
  name: string;
  img: string;
  id: number;
  setPerfumeList: React.Dispatch<React.SetStateAction<PerfumeInfos[]>>;
}

interface localProps {
  perfumeId: number;
  rate: number;
}

const handleDeletePerfume = (id: number) => {
  const postPerfumeList = JSON.parse(
    localStorage.getItem('postPerfume') || '[]',
  );

  const updatedList = postPerfumeList.filter(
    (perfume: localProps) => perfume.perfumeId !== id,
  );

  if (updatedList.length === 0) {
    localStorage.removeItem('postPerfume');
  } else {
    localStorage.setItem('postPerfume', JSON.stringify(updatedList));
  }
  return updatedList;
};

function PerfumeReviewBox({
  brand,
  name,
  img,
  id,
  setPerfumeList,
}: ReviewBoxProps) {
  return (
    <CenterFrame>
      <PerfumeReviewBoxContainer>
        <TextInfoContainer>
          <PerfumeBrand>{brand}</PerfumeBrand>
          <PerfumeName>{name}</PerfumeName>
          <DeleteBtn
            onClick={() => {
              setPerfumeList(handleDeletePerfume(id));
            }}
          >
            삭제하기 🗑
          </DeleteBtn>
        </TextInfoContainer>
        <ImgBox>
          <img src={img} />
        </ImgBox>
      </PerfumeReviewBoxContainer>
    </CenterFrame>
  );
}
interface Props {
  perfumeList: PerfumeInfos[];
  setPerfumeList: React.Dispatch<React.SetStateAction<PerfumeInfos[]>>;
}

export function AddCarousel({ perfumeList, setPerfumeList }: Props) {
  const navigate = useNavigate();
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <CarouselBox>
      {perfumeList.length === 0 ? (
        //아직 임베디드된 향수가 없는 경우
        <CenterFrame>
          <EmptyBox>
            <TextArea>
              향수를 추가해주세요
              <ClickableAddButtonSvg
                onClick={() => {
                  navigate('/search-myperfume', {
                    state: { nowLocation: 'post' },
                  });
                }}
              />
            </TextArea>
          </EmptyBox>
        </CenterFrame>
      ) : (
        //아닌 경우 향수들 정보 불러오고 마지막 장에 추가페이지
        <Carousel
          // 캐러셀 설정
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={1}
          leftChevron={<PrevSvg />}
          rightChevron={<NextSvg />}
          chevronWidth={40}
          showSlither={false}
          outsideChevron={false}
        >
          {perfumeList.map((perfume) => (
            <PerfumeReviewBox
              brand={perfume.brandName}
              name={perfume.name}
              img={perfume.picture}
              id={perfume.perfumeId}
              setPerfumeList={setPerfumeList}
            />
          ))}

          <CenterFrame>
            <EmptyBox>
              <TextArea>
                향수를 추가해주세요
                <ClickableAddButtonSvg
                  onClick={() => {
                    navigate('/search-myperfume', {
                      state: { nowLocation: 'post' },
                    });
                  }}
                />
              </TextArea>
            </EmptyBox>
          </CenterFrame>
        </Carousel>
      )}
    </CarouselBox>
  );
}

export function NonAddCarousel() {
  return (
    <CarouselBox>
      <Carousel
        // 캐러셀 설정
        numberOfCards={1}
        leftChevron={<PrevSvg />}
        rightChevron={<NextSvg />}
        chevronWidth={40}
        showSlither={false}
        outsideChevron={false}
      >
        <CenterFrame>
          <NonEmptyBox>
            <TextArea>
              향수를 추가해주세요
              <StyledAddButtonSvg />
            </TextArea>
          </NonEmptyBox>
        </CenterFrame>
      </Carousel>
    </CarouselBox>
  );
}

const DeleteBtn = styled.div`
  color: var(--error-color);
  margin-top: 30px;
  font-weight: 700;
  font-size: 13px;
`;

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

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  padding: 0 20px;
  height: 140px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

const NonEmptyBox = styled(EmptyBox)`
  background-color: var(--gray-color);
  opacity: 55%;
`;

const StyledAddButtonSvg = styled(AddButtonSvg)`
  margin-top: 15px;
`;

const ClickableAddButtonSvg = styled(StyledAddButtonSvg)`
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

// ---------------------------------------------
const PerfumeReviewBoxContainer = styled.div`
  display: flex;
  background: var(--white-color);
  justify-content: space-between;
  align-items: center;
  padding: 0px 55px;
  width: 340px;
  height: 140px;
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
  justify-content: center;
`;
