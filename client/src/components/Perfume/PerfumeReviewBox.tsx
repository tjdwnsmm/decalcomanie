import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as EmptyStarSvg } from '../../assets/icon/empty-star.svg';
import { ReactComponent as FillStarSvg } from '../../assets/icon/fill-star.svg';

interface PerfumeReviewInfo {
  rate: number;
  brand: string;
  name: string;
  img: string;
  perfumeId: number;
}

const PerfumeReviewBoxContainer = styled.div`
  display: flex;
  background: var(--white-color);
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
`;

const StarRatingContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const PerfumeBrand = styled.div`
  color: var(--black-color);
  font-size: 13px;
  font-weight: 600;
  padding: 5px 0px;
`;

const PerfumeName = styled.div`
  color: var(--black-color);
  font-size: 22px;
  font-weight: 700;
`;

const ImgBox = styled(Link)`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

function PerfumeReviewBox({ rate, brand, name, img, perfumeId }: PerfumeReviewInfo) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<FillStarSvg key={i} />);
      } else {
        stars.push(<EmptyStarSvg key={i} />);
      }
    }

    return stars;
  };

  return (
    <PerfumeReviewBoxContainer>
      <TextInfoContainer>
        <StarRatingContainer>{renderStars()}</StarRatingContainer>
        <PerfumeBrand>{brand}</PerfumeBrand>
        <PerfumeName>{name}</PerfumeName>
      </TextInfoContainer>
      <ImgBox to={`/perfume-detail/${perfumeId}`}>
        <img src={img} />
      </ImgBox>
    </PerfumeReviewBoxContainer>
  );
}

export default PerfumeReviewBox;
