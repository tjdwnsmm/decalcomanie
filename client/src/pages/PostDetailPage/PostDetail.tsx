import { styled } from 'styled-components';
import PerfumeCarousel from '../../components/Carousel/PerfumeCarousel';
import PostInfoBox from '../../components/Post/PostInfoBox.tsx';
import CommentBox from '../../components/Post/CommentBox.tsx';
import CommentInputForm from '../../components/Post/CommentInputForm.tsx';
import { Post } from '../../types/PostInfoType.ts';
import { Main } from '../../style';
import { useParams } from 'react-router-dom';

// 임시
const post: Post = {
  perfumes: [
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
  ],
  postInfo: {
    profileImg: 'src/assets/img/profile-user.png',
    writer: '김싸피',
    createdAt: '2023-07-12T12:34:56.789+09:00',
    favScent: ['우디', '플로럴', '시트러스'],
    // 선호, 비선호향 길어질 때 어떻게 되는지 테스트
    nofavScent: ['머스크', '코코넛'],
    // nofavScent: ['머스크', '코코넛', '스파이시'],
    isFollow: false,
    likeCount: 86,
    isLike: true,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 \n\n아쿠아디파르마 처음 입문으로 미르토를 사용했는데 확실히 호불호 없을듯한느낌이고 살짝 남자 스킨향이 초반에 나는데 전혀 거부감없습니다. 그리고 남자보다 여자분들의 반응이 더 좋았던것같아요 너무 좋았고 잘사용하고있습니다.',
    commentCount: 3,
  },
  comments: [
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '혀니',
      createdAt: '2023-07-20T12:34:56.789+09:00',
      content: '향이 예쁘고 병이 향긋해요',
    },
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '복이',
      createdAt: '2023-07-23T06:25:10.789+09:00',
      content: '테스트용 두번째 댓글',
    },
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '쭈리',
      createdAt: '2023-07-23T23:00:56.789+09:00',
      content:
        '댓글이 길어서 한 줄이 넘어가면 어떻게 되는지 테스트를 해보겠어요 뭔가 프로필이 같이 내려가는거 같은데 약간 큰일인거 같기도 하고 허허 바꿔야되네',
    },
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '복이',
      createdAt: '2023-07-24T09:34:56.789+09:00',
      content: '작성시간 테스트 댓글',
    },
  ],
};

const CommentListBox = styled.div`
  margin-bottom: 80px;
`;

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Main>
      <PerfumeCarousel perfumes={post.perfumes} />
      <PostInfoBox postInfo={post.postInfo} />
      <CommentListBox>
        {post.comments.map((comment, idx) => (
          <CommentBox key={idx} comment={comment} />
        ))}
      </CommentListBox>
      <CommentInputForm />
    </Main>
  );
};

export default PostDetail;
