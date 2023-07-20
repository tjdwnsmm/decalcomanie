import { styled } from 'styled-components';
import { PostButton, CancleButton } from '../../components/Button/Button.tsx';
import CustomizedSwitches from '../../components/Switch/Switch.tsx';
import PerfumeBox from '../../components/Box/AddPerfume.tsx';
import ContextBox from '../../components/Box/AddContext.tsx';
import Rating from '../../components/Rating/Rating.tsx';
import AddCarousel from '../../components/Box/AddCarousel.tsx';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';

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
];

const PerfumeBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PostBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const MiddleAlign = styled.div`
  width: 340px;
  font-weight: bold;
  text-align: center;
`;

const LeftAlign = styled.div`
  display: flex;
  align-items: center;
  width: 340px;
  font-weight: bold;
  text-align: left;
`;

function Post() {
  // test alert
  const postAlert = () => {
    alert('글을 등록하시겠습니까?');
  };

  const cancleAlert = () => {
    alert('취소하시겠습니까?');
  };

  return (
    <>
      <AddCarousel perfumes={perfumes} />
      <CustomizedSwitches></CustomizedSwitches>

      <PostBody>
        <LeftAlign>내용을 입력해주세요.</LeftAlign>
        <ContextBox />
        <LeftAlign>평점</LeftAlign>
        <LeftAlign>
          미르토 디 파나레아
          <Rating></Rating>
        </LeftAlign>
        <LeftAlign>
          오 드 퍼퓸 도손
          <Rating></Rating>
        </LeftAlign>
      </PostBody>

      <PostButton onClick={postAlert}>글 등록하기</PostButton>
      <CancleButton onClick={cancleAlert}>취소</CancleButton>
    </>
  );
}

export default Post;
