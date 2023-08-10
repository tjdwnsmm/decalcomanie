import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/apiController';
import CustomizedSwitches from '../../components/Switch/Switch';
import ContextBox from '../../components/Box/AddContext';
import AddRating from '../../components/Rating/Rating';
import { AddCarousel } from '../../components/Box/AddCarousel';
import { ConfirmButton, Main, MarginFrame } from '../../style/index';
import { ReactComponent as CancelSvg } from '../../assets/img/close.svg';
import { PostDetailData } from '../../types/PostInfoType';

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

export default function PostUpdate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postDetailData, setPostDetailData] = useState<PostDetailData | null>(
    null,
  );
  const [newContent, setNewContent] = useState<string>('');

  useEffect(() => {
    const fetchPostDetailData = async () => {
      try {
        const response = await axios.get(`/sns/search/${id}`);
        setPostDetailData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetailData();
  }, [id]);

  useEffect(() => {
    if (postDetailData) {
      setNewContent(postDetailData.articleDto.content);
    }
  }, [postDetailData]);

  const handleChange = (value: string) => {
    setNewContent(value);
  };

  const postAlert = async () => {
    try {
      const requestData = {
        articleId: id,
        content: newContent,
        // 임시데이터) 글 작성 모두 구현 되면 평점 변경 사항 반영해서 put 요청
        perfumeId: [12],
        rate: [5],
      };
      const response = await axios.put('/sns/update', requestData);
      console.log(response.data);
      navigate(`/post-detail/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const cancleAlert = () => {
    alert('취소하시겠습니까?');
    navigate(`/post-detail/${id}`);
  };

  if (!postDetailData) {
    navigate('/main-feed');
    return false;
  }

  return (
    <Main>
      <PostTitle>
        <TitleAlign>글 수정하기</TitleAlign>
        <CancelSvg onClick={() => cancleAlert()} />
      </PostTitle>
      <div>
        <AddCarousel perfumeList={postDetailData.perfumeInfos[0]} />
        {/* <CustomizedSwitches></CustomizedSwitches> */}
      </div>

      <PostBody>
        <LeftTitleAlign>내용을 입력해주세요.</LeftTitleAlign>
        <ContextBox newContent={newContent} handleChange={handleChange} />
        {postDetailData.perfumeInfos.length !== 0 && (
          <MarginFrame margin="15px 0">
            <LeftTitleAlign>평점</LeftTitleAlign>
            <MarginFrame margin="10px 0 40px">
              <AddRating
                perfumes={postDetailData.perfumeInfos}
                rates={postDetailData.rates}
              />
            </MarginFrame>
          </MarginFrame>
        )}
      </PostBody>
      <Buttons>
        <ConfirmButton color="primary" background="primary" onClick={postAlert}>
          수정하기
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
