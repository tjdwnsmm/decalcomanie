import { styled } from 'styled-components';

const perfumeInfo = {
  brand: '딥디크',
  name: '로파피에',
  scent: ['미모사', '베르가못', '머스크'],
  img: 'src/assets/img/perfume1.png',
};
const RecommendPerfume = () => {
  return (
    <PerfumeInfoBox>
      <Image>
        <img src={perfumeInfo.img}></img>
      </Image>
      <InfoBox>
        <Brand>{perfumeInfo.brand}</Brand>
        <Info>
          <PerfumeName>{perfumeInfo.name}</PerfumeName>
          <PerfumeScent>
            {perfumeInfo.scent.map((scent, idx) => (
              <span key={idx}>
                {scent}
                {idx === perfumeInfo.scent.length - 1 ? '' : ', '}
              </span>
            ))}
          </PerfumeScent>
        </Info>
      </InfoBox>
    </PerfumeInfoBox>
  );
};

export default RecommendPerfume;

const PerfumeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 70px;
  margin-top: 11px;
`;

const Brand = styled.div`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 251px;
  align-items: center;
`;

const PerfumeName = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const PerfumeScent = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

const Image = styled.div`
  width: 251px;
  height: 251px;
  border-radius: 10px;
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 39px auto 0;
  img {
    width: 130px;
  }
`;
