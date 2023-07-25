import { css, keyframes, styled } from 'styled-components';

interface InfoProps {
  longevity: number;
  sillage: number;
}

const MoreInfo = ({ longevity, sillage }: InfoProps) => {
  return (
    <Info>
      <EachInfo>
        <MoreDetail>
          <MoreTitle>지속력</MoreTitle>
          <Score>{longevity} / 5. 0</Score>
        </MoreDetail>
        <ProgressBar>
          <Progress score={longevity} total={5}>
            <Bar></Bar>
          </Progress>
        </ProgressBar>
      </EachInfo>
      <EachInfo>
        <MoreDetail>
          <MoreTitle>잔향감</MoreTitle>
          <Score>{sillage} / 4. 0</Score>
        </MoreDetail>
        <ProgressBar>
          <Progress score={sillage} total={4}>
            <Bar></Bar>
          </Progress>
        </ProgressBar>
      </EachInfo>
    </Info>
  );
};

export default MoreInfo;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  margin: 0px;
  width: 350px;
  background: var(--white-color);
  border-radius: 30px;
`;

interface ProgressProps {
  total: number;
  score: number;
}

const Progress = styled.div<ProgressProps>`
  padding: 2px;
  border-radius: 30px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  width: ${(props) => (props.score / props.total) * 100}%;
  background-color: var(--primary-color);
  ${({ score, total }) => css`
    animation: ${progressAnimation(score, total)} 3s;
  `};
`;
const progressAnimation = (score: number, total: number) => keyframes`
  0% {
    width: 5%;
    background-color: var(--primary-color);
  }
  100% {
    width: ${(score / total) * 100}%;
    background-color: var(--primary-color);
  }
`;

const Bar = styled.div`
  height: 14px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  transition: 0.4s linear;
  transition-property: width, background-color;
`;

const EachInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 10px;
`;
const MoreTitle = styled.div`
  font-weight: 700;
  color: var(--primary-color);
  font-size: 18px;
  margin-left: 3px;
`;
const MoreDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const Score = styled.span`
  margin-right: 20px;
  color: var(--primary-color);
  font-weight: 500;
`;
