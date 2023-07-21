import { styled } from 'styled-components';
import { PostButton, CancleButton } from '../../components/Button/Button.tsx';
import CustomizedSwitches from '../../components/Switch/Switch.tsx';
import PerfumeBox from '../../components/Box/AddPerfume.tsx';
import ContextBox from '../../components/Box/AddContext.tsx';
import AddRating from '../../components/Rating/Rating.tsx';
import AddCarousel from '../../components/Box/AddCarousel.tsx';
import { Main } from '../../style/index.ts';

const perfumes = [
  {
    brand: '아쿠아 디 파르마',
    name: '미르토 디 파나레아',
    img: 'src/assets/img/perfume_aqua.png',
  },
  {
    brand: '딥디크',
    name: '오 드 퍼퓸 도손',
    img: 'src/assets/img/perfume_doson.png',
  },
  {
    brand: '아쿠아 디 파르마',
    name: '미르토 디 파나레아',
    img: 'src/assets/img/perfume_aqua.png',
  },
  {
    brand: '딥디크',
    name: '오 드 퍼퓸 도손',
    img: 'src/assets/img/perfume_doson.png',
  },
  {
    brand: '아쿠아 디 파르마',
    name: '미르토 디 파나레아',
    img: 'src/assets/img/perfume_aqua.png',
  },
  {
    brand: '딥디크',
    name: '오 드 퍼퓸 도손',
    img: 'src/assets/img/perfume_doson.png',
  },
];

const PostBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LeftAlign = styled.div`
  width: 340px;
  font-weight: bold;
  text-align: left;
`;

const TitleAlign = styled(LeftAlign)`
  font-size: 14pt;
`;

export default function Post() {
  // test alert
  const postAlert = () => {
    alert('글을 등록하시겠습니까?');
  };

  const cancleAlert = () => {
    alert('취소하시겠습니까?');
  };

  return (
    <Main>
      <AddCarousel perfumes={perfumes} />
      <CustomizedSwitches></CustomizedSwitches>

      <PostBody>
        <TitleAlign>내용을 입력해주세요.</TitleAlign>
        <ContextBox />
        <TitleAlign>평점</TitleAlign>
        <LeftAlign>
        <AddRating perfumes={perfumes} />
        </LeftAlign>
      </PostBody>

      <PostButton onClick={postAlert}>글 등록하기</PostButton>
      <CancleButton onClick={cancleAlert}>취소</CancleButton>
    </Main>
  );
}
