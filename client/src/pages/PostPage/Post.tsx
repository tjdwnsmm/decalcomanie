import { styled } from 'styled-components';
import { PostButton, CancleButton } from '../../components/Button/Button.tsx';
import CustomizedSwitches from '../../components/Switch/Switch.tsx';
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
];

const PostBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleAlign = styled.div`
  width: 340px;
  font-weight: bold;
  font-size: 16pt;
  text-align: center;
  margin-top: 10px;
`;

const LeftTitleAlign = styled(TitleAlign)`
  text-align: left;
  font-size: 14pt;
  margin-bottom: 5px;
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
      <PostBody>
        <TitleAlign>글 작성하기</TitleAlign>
      </PostBody>
      <div>
        <AddCarousel perfumes={perfumes} />
        <CustomizedSwitches></CustomizedSwitches>
      </div>

      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox />
        <LeftTitleAlign>
          평점
          <AddRating perfumes={perfumes} />
        </LeftTitleAlign>
        <PostButton onClick={postAlert}>글 등록하기</PostButton>
        <CancleButton onClick={cancleAlert}>취소</CancleButton>
      </PostBody>
    </Main>
  );
}
