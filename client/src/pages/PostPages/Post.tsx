import { styled } from 'styled-components';
import { PostButton, CancleButton } from '../../components/Button/Button.js';
import CustomizedSwitches from '../../components/Switch/Switch.js';
import ContextBox from '../../components/Box/AddContext.js';
import AddRating from '../../components/Rating/Rating.js';
import AddCarousel from '../../components/Box/AddCarousel.js';
import { ConfirmButton, Main, MarginFrame } from '../../style/index.js';
import { ReactComponent as CancelSvg } from '../../assets/img/close.svg';
import { useNavigate } from 'react-router-dom';

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

const PostTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0 0 25px;
`;

const TitleAlign = styled.div`
  width: 80%;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding-left: 10px;
`;

const LeftTitleAlign = styled(TitleAlign)`
  text-align: left;
  font-size: 17px;
  margin: 10px 0 5px;
  padding-left: 0;
`;

export default function Post() {
  const navigate = useNavigate();

  // test alert
  const postAlert = () => {
    alert('글을 등록하시겠습니까?');
  };

  const cancleAlert = () => {
    alert('취소하시겠습니까?');
    navigate('/main-feed');
  };

  return (
    <Main>
      <PostTitle>
        <TitleAlign>글 작성하기</TitleAlign>
        <CancelSvg onClick={() => cancleAlert()} />
      </PostTitle>
      <div>
        <AddCarousel perfumes={perfumes} />
        <CustomizedSwitches></CustomizedSwitches>
      </div>

      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox />
        {perfumes.length !== 0 && (
          <MarginFrame margin="15px 0">
            <LeftTitleAlign>평점</LeftTitleAlign>
            <MarginFrame margin="10px 0 40px">
              <AddRating perfumes={perfumes} />
            </MarginFrame>
          </MarginFrame>
        )}
      </PostBody>
      <Buttons>
        <ConfirmButton color="primary" background="primary" onClick={postAlert}>
          글 등록하기
        </ConfirmButton>
        <ConfirmButton onClick={cancleAlert}>취소</ConfirmButton>
      </Buttons>
    </Main>
  );
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  gap: 10px;
  padding-bottom: 10px;
`;
