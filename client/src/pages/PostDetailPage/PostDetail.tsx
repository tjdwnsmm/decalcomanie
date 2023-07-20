import React from 'react';
import PerfumeCarousel from '../../components/Carousel/PerfumeCarousel';
import CommentBox from '../../components/Post/CommentBox.tsx';
import CommentInputForm from '../../components/Post/CommentInputForm.tsx';
import { Post } from '../../types/PostInfoType.ts';

// const perfumes = [
//   {
//     rate: 4,
//     brand: '아쿠아 디 파르마',
//     name: '미르토 디 파나레아',
//     img: 'src/assets/img/perfume_aqua.png',
//   },
//   {
//     rate: 5,
//     brand: '딥디크',
//     name: '오 드 퍼퓸 도손',
//     img: 'src/assets/img/perfume_doson.png',
//   },
// ];

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
    writer: '닉네임',
    createdAt: '2023. 07. 12.',
    favScent: ['우디', '플로럴', '시트러스'],
    nofavScent: ['머스크', '코코넛'],
    isFollow: false,
    likeCount: 86,
    isLike: false,
    isScrap: false,
    content:
      '개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 개인적으로도 너무 마음에 들고 회사 직원들 그리고 주변 지인들도 모두가 좋아할 정도로 호불호 없고 깨끗하면서도 아쿠아디파르마 처음 입문으로 미르토를 사용했는데 확실히 호불호 없을듯한느낌이고 살짝 남자 스킨향이 초반에 나는데 전혀 거부감없습니다. 그리고 남자보다 여자분들의 반응이 더 좋았던것같아요 너무 좋았고 잘사용하고있습니다.',
    commentCount: 3,
  },
  comments: [
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '닉네임1',
      createdAt: '2023. 07. 12.',
      content: '닉네임1의 첫번째 댓글 123456789',
    },
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '닉네임2',
      createdAt: '2023. 07. 12.',
      content: '테스트용 두번째 댓글',
    },
    {
      profileImg: 'src/assets/img/profile-user.png',
      writer: '닉네임3',
      createdAt: '2023. 07. 12.',
      content: '댓글3 댓글3 댓글3 댓글3 댓글3 댓글3 댓글3 댓글3',
    },
  ],
};

const PostDetail = () => {
  return (
    <>
      <PerfumeCarousel perfumes={post.perfumes} />
      {post.comments.map((comment, idx) => 
        <CommentBox key={idx} comment={comment} />
      )}
      <CommentInputForm />
    </>
  );
};

export default PostDetail;
