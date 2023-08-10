import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import CustomizedSwitches from '../../components/Switch/Switch';
import ContextBox from '../../components/Box/AddContext';
import AddRating from '../../components/Rating/Rating';
import { AddCarousel, NonAddCarousel } from '../../components/Box/AddCarousel';
import { ConfirmButton, Main, MarginFrame } from '../../style/index';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

interface DataType {
  perfumeId: [number];
  content: string;
  rate: [number];
}

export default function Post() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [perfumeList, setPerfumeList] = useState<PerfumeDetail[]>([]);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const perfumeId = localStorage.getItem('getPerfumeId');
    if (perfumeId !== null) {
      axios
        .get(`/perfume/detail/${perfumeId}`)
        .then((res) => {
          setPerfumeList(res.data);
        })
        .catch((error) => {
          console.error('API 호출 에러 : ', error);
        });
    }
    localStorage.removeItem('getPerfumeId');
    localStorage.removeItem('rating');
  }, []);

  // 글 내용 변경 콜백 함수
  const handleChange = (value: string) => {
    setContent(value);
  };

  const ratingFromLocalStorage = localStorage.getItem('rating');
  const rateValue = ratingFromLocalStorage
    ? parseFloat(ratingFromLocalStorage)
    : 0;

  const requestData: DataType = {
    perfumeId: [perfumeList.perfumeId],
    content,
    rate: [rateValue],
  };

  // 글 등록하기 버튼을 클릭했을 때 호출되는 함수
  const handlePostClick = async () => {
    console.log('Request Data : ', requestData);
    try {
      const response = await axios.post('/sns/create/', requestData);

      console.log('API 응답:', response.data);

      // 작성 글 상세 페이지로 이동
      navigate(`/post-detail/${response.data.articleId}`);
    } catch (error) {
      console.error('API 요청 전송 에러:', error);
    }
  };

  const handleChange = (value: string) => {
    setNewContent(value);
  };

  return (
    <Main>
      <PostTitle>
        <TitleAlign>글 작성하기</TitleAlign>
      </PostTitle>
      <div>
        {isChecked ? (
          <AddCarousel perfumeList={perfumeList} />
        ) : (
          <NonAddCarousel />
        )}
        {perfumeList.length !== 0 ? (
          <CustomizedSwitches
            isChecked={!isChecked}
            // setIsChecked={setIsChecked}
          />
        ) : (
          <CustomizedSwitches
            isChecked={!isChecked}
            setIsChecked={setIsChecked}
          />
        )}
      </div>

      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox newContent={content} handleChange={handleChange}/>
        {isChecked && perfumeList.length !== 0 && (
          <MarginFrame margin="15px 0">
            <LeftTitleAlign>평점</LeftTitleAlign>
            <MarginFrame margin="10px 0 40px">
              <AddRating perfumeList={perfumeList} />
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;
`;
