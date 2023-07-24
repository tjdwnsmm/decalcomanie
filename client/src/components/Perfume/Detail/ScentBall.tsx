import { styled } from 'styled-components';

interface ScentBallProps {
  first: string;
  second: string;
  third: string;
}

const ScentBall = ({ first, second, third }: ScentBallProps) => {
  return (
    <>
      <Orb first={first} second={second} third={third}></Orb>
    </>
  );
};

export default ScentBall;

//#fff, violet, #0ff ,
const Orb = styled.div<ScentBallProps>`
  animation: spin 4s linear infinite;
  width: 250px;
  height: 250px;
  margin: auto;
  margin-top: 40px;
  border-radius: 50%;
  box-shadow: inset 0 0 50px ${(props) => props.first},
    inset 20px 0 60px ${(props) => props.second},
    inset -20px 0 60px ${(props) => props.third},
    inset 20px 0 100px ${(props) => props.first},
    inset -20px 0 100px ${(props) => props.second},
    0 0 50px ${(props) => props.first},
    -10px 0 20px ${(props) => props.first},
    10px 0 20px ${(props) => props.first};

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`;
