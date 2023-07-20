import React from 'react';
import PerfumeReviewCarousel from '../../components/Carousel/PerfumeCarousel';

const perfumes = [
  {
    rate: 4,
    brand: '아쿠아 디 파르마',
    name: '미르토 디 파나레아',
    img: 'src/assets/img/perfume_aqua.png',
  },
  {
    rate: 5,
    brand: '딥디크',
    name: '오 드 퍼퓸 도손',
    img: 'src/assets/img/perfume_doson.png',
  },
];

const PostDetail = () => {
  return (
    <>
      <PerfumeReviewCarousel perfumes={perfumes} />
    </>
  );
};

export default PostDetail;
