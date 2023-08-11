import React from 'react';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import { CenterFrame } from '../../style';
import { PerfumeInfos } from '../../types/PostInfoType';

interface ReviewBoxProps {
  perfume: PerfumeInfos;
  id: number;
  setPerfumeList?: React.Dispatch<React.SetStateAction<PerfumeInfos[]>>;
}

interface localProps {
  perfumeId: number;
  rate: number;
}

const handleDeletePerfume = (
  id: number,
  setPerfumeList: React.Dispatch<React.SetStateAction<PerfumeInfos[]>>,
): PerfumeInfos[] => {
  const postPerfumeList = JSON.parse(
    localStorage.getItem('postPerfume') || '[]',
  );

  const filterList = postPerfumeList.filter(
    (perfume: localProps) => perfume.perfumeId !== id,
  );

  if (filterList.length === 0) {
    localStorage.removeItem('postPerfume');
  } else {
    localStorage.setItem('postPerfume', JSON.stringify(filterList));
  }

  const perfumeList = localStorage.getItem('postPerfume');
  if (perfumeList) {
    const parsedList: localProps[] = JSON.parse(perfumeList);
    const fetchData = async () => {
      const fetchPromises = parsedList.map((perfume) =>
        axios.get(`/perfume/detail/${perfume.perfumeId}`),
      );

      try {
        const responses = await Promise.all(fetchPromises);
        const updatedList = responses.map((res, index) => {
          const data = res.data;
          data.rate = parsedList[index].rate;
          return data;
        });

        setPerfumeList(updatedList); // Set the updated list here
      } catch (error) {
        console.error('API 호출 에러 : ', error);
      }
    };

    fetchData();
  }

  return filterList;
};

function PerfumePostBox({ perfume, id, setPerfumeList }: ReviewBoxProps) {
  return (
    <CenterFrame>
      <PerfumeReviewBoxContainer>
        <TextInfoContainer>
          <PerfumeBrand>{perfume.brandName}</PerfumeBrand>
          <PerfumeName>{perfume.name}</PerfumeName>
          {setPerfumeList ? (
            <DeleteBtn
              onClick={() => {
                const updatedList = handleDeletePerfume(id, setPerfumeList);
                setPerfumeList(updatedList);
              }}
            >
              삭제하기 🗑
            </DeleteBtn>
          ) : (
            <></>
          )}
        </TextInfoContainer>
        <ImgBox>
          <img src={perfume.picture} />
        </ImgBox>
      </PerfumeReviewBoxContainer>
    </CenterFrame>
  );
}

export default PerfumePostBox;

const DeleteBtn = styled.div`
  color: var(--error-color);
  margin-top: 30px;
  font-weight: 700;
  font-size: 13px;
`;

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
