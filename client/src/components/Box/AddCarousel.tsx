import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Carousel from 'react-items-carousel';
import { ReactComponent as AddButtonSvg } from '../../assets/img/add-button.svg';
import { ReactComponent as PrevSvg } from '../../assets/icon/prevBack.svg';
import { CenterFrame } from '../../style';
import { PerfumeInfos } from '../../types/PostInfoType';
import PerfumePostBox from '../Post/PerfumePostBox';

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
            <PerfumePostBox
              key={perfume.perfumeId}
              perfume={perfume}
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
