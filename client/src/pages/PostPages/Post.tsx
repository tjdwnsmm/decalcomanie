import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import CustomizedSwitches from '../../components/Switch/Switch.js';
import ContextBox from '../../components/Box/AddContext.js';
import AddRating from '../../components/Rating/Rating.js';
import {
  AddCarousel,
  NonAddCarousel,
} from '../../components/Box/AddCarousel.js';
import { ConfirmButton, Main, MarginFrame } from '../../style/index.js';

interface PerfumesProps {
  perfumeId: [number];
  content: string;
  rate: [number];
  userId: string;
}

const perfumes: PerfumesProps[] = [
  {
    perfumeId: [12],
    content: 'test content',
    rate: [4.5],
    userId: '07161c43-bc03-44f6-95c1-a56d440a23bf',
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
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const [perfumeId, setPerfumeId] = useState<number[]>([]);
  const [content, setContent] = useState<string>('');
  const [rate, setRate] = useState<number[]>([]);
  const userId = '07161c43-bc03-44f6-95c1-a56d440a23bf';

  // 글 내용 변경 콜백 함수
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // 글 등록하기 버튼을 클릭했을 때 호출되는 함수
  const handlePostClick = async () => {
    try {
      const requestData = {
        // 향수 임베디드 전 테스트 용도
        perfumeId: perfumes[0].perfumeId,
        content,
        // 향수 임베디드 전 테스트 용도
        rate: perfumes[0].rate,
        userId,
      };

      const response = await axios.post('/sns/create/', requestData, {});

      console.log('API 응답:', response.data);
      // 작성 글 상세 페이지로 이동
      navigate(`/post-detail/${response.data.articleId}`);
    } catch (error) {
      console.error('API 요청 전송 에러:', error);
    }
  };

  return (
    <Main>
      <PostTitle>
        <TitleAlign>글 작성하기</TitleAlign>
      </PostTitle>
      <div>
        {isChecked ? <AddCarousel perfumes={perfumes} /> : <NonAddCarousel />}
        {perfumes.length === 0 ? (
          <CustomizedSwitches
            isChecked={!isChecked}
            setIsChecked={setIsChecked}
          />
        ) : (
          <CustomizedSwitches isChecked={!isChecked} setIsChecked={!isChecked}/>
        )}
      </div>

      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox onContentChange={handleContentChange} />
        {isChecked && perfumes.length !== 0 && (
          <MarginFrame margin="15px 0">
            <LeftTitleAlign>평점</LeftTitleAlign>
            <MarginFrame margin="10px 0 40px">
              <AddRating perfumes={perfumes} />
            </MarginFrame>
          </MarginFrame>
        )}
      </PostBody>
      <Buttons>
        <ConfirmButton
          color="primary"
          background="primary"
          onClick={handlePostClick}
        >
          글 등록하기
        </ConfirmButton>
        <ConfirmButton>취소</ConfirmButton>
      </Buttons>
    </Main>
  );
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;
`;
