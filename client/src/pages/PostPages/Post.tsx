import { styled } from 'styled-components';
import { PostButton, CancleButton } from '../../components/Button/Button.tsx';
import CustomizedSwitches from '../../components/Switch/Switch.tsx';
import PerfumeBox from '../../components/Box/AddPerfume.tsx';
import ContextBox from '../../components/Box/AddContext.tsx';
import Rating from '../../components/Rating/Rating.tsx';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';
import { Main } from '../../style';

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
    <Main>
      <PerfumeBody>
        <FlexDiv>
          <MiddleAlign>글 작성하기</MiddleAlign>
          <CloseSvg />
        </FlexDiv>
        <PerfumeBox />
        <CustomizedSwitches></CustomizedSwitches>
      </PerfumeBody>

      <PostBody>
        <LeftAlign>내용을 입력해주세요.</LeftAlign>
        <ContextBox />
        <LeftAlign>평점</LeftAlign>
        <LeftAlign>
          로파피에
          <Rating></Rating>
        </LeftAlign>
      </PostBody>

      <PostButton onClick={postAlert}>글 등록하기</PostButton>
      <CancleButton onClick={cancleAlert}>취소</CancleButton>
    </Main>
  );
}

export default Post;
