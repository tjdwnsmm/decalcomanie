import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../../api/apiController';
import CustomizedSwitches from '../../components/Switch/Switch';
import ContextBox from '../../components/Box/AddContext';
import AddRating from '../../components/Rating/Rating';
import { AddCarousel, NonAddCarousel } from '../../components/Box/AddCarousel';
import { ConfirmButton, Main, MarginFrame } from '../../style/index';
import { PerfumeInfos } from '../../types/PostInfoType';

interface RequestData {
  perfumeId: number[];
  content: string;
  rate: number[];
}

interface localProps {
  perfumeId: number;
  rate: number;
}

export default function Post() {
  const navigate = useNavigate();
  //공병 체크 여부
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [perfumeList, setPerfumeList] = useState<PerfumeInfos[]>([]);
  const [content, setContent] = useState<string>('');

  const handleEmptyChecked = () => {
    setPerfumeList([]);
    localStorage.removeItem('postPerfume');
    console.log('empty!!');
  };

  useEffect(() => {
    const localPerfume = localStorage.getItem('postPerfume');
    if (localPerfume) {
      const parsedList: localProps[] = JSON.parse(localPerfume);

      const fetchData = async (fetchList: localProps[]) => {
        const fetchPromises = fetchList.map((perfume) =>
          axios.get(`/perfume/detail/${perfume.perfumeId}`),
        );

        try {
          const responses = await Promise.all(fetchPromises);
          const updatedList = responses.map((res, index) => {
            const data = res.data;
            data.rate = fetchList[index].rate;
            return data;
          });
          setPerfumeList(updatedList);
        } catch (error) {
          console.error('API 호출 에러 : ', error);
        }
      };

      if (parsedList.length > 5) {
        alert('향수는 최대 5개까지만 등록이 가능합니다!');
        fetchData(parsedList.slice(0, 5));
      } else {
        fetchData(parsedList);
      }
    }
  }, []);

  // 글 내용 변경 콜백 함수
  const handleChange = (value: string) => {
    setContent(value);
  };

  // 글 등록하기 버튼을 클릭했을 때 호출되는 함수
  const handlePostClick = async () => {
    try {
      const localPerfume = localStorage.getItem('postPerfume');
      const parsedList: localProps[] = localPerfume
        ? JSON.parse(localPerfume)
        : [];

      const requestData: RequestData = {
        perfumeId: parsedList.map((perfume) => perfume.perfumeId),
        content,
        rate: parsedList.map((perfume) => perfume.rate),
      };

      const response = await axios.post('/sns/create/', requestData);
      console.log('Request Data : ', requestData);
      console.log('API 응답:', response.data);

      // 작성 글 상세 페이지로 이동
      navigate(`/post-detail/${response.data.articleId}`);
    } catch (error) {
      console.error('API 요청 전송 에러:', error);
    }
    localStorage.removeItem('postPerfume');
  };

  const handleOutPost = () => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      localStorage.removeItem('postPerfume');
      navigate('/main-feed');
    }
  };

  return (
    <Main>
      <PostTitle>
        <TitleAlign>글 작성하기</TitleAlign>
      </PostTitle>

      {/* 향수 임베디드 부분 */}
      <div>
        {!isChecked ? (
          //checked 안되어있으면 임베디드 불가능하게
          <AddCarousel
            perfumeList={perfumeList}
            setPerfumeList={setPerfumeList}
          />
        ) : (
          //checked 되어있으면 공병
          <NonAddCarousel />
        )}
        <CustomizedSwitches
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleEmpty={handleEmptyChecked}
        />
      </div>

      {/* 내용 입력 부분*/}
      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox newContent={content} handleChange={handleChange} />
        {/* 공병 체크가 안되어있고 리스트에 하나 이상 있을때 평점에 추가 */}
        {!isChecked && perfumeList.length !== 0 && (
          <MarginFrame margin="15px 0">
            <LeftTitleAlign>평점</LeftTitleAlign>
            <MarginFrame margin="15px 0 40px 5px">
              <AddRating perfumes={perfumeList} />
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
        <ConfirmButton onClick={handleOutPost}>취소</ConfirmButton>
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
  font-weight: 600;
  font-size: 20px;
  text-align: center;
`;

const LeftTitleAlign = styled(TitleAlign)`
  text-align: left;
  font-size: 17px;
  margin: 10px 0 5px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 10px;
`;
