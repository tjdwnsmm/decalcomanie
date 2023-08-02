import React, { useState } from 'react';
import styled from 'styled-components';
import { ScentDto } from '../../../types/PerfumeInfoType';
import PieChartComponent from './Chart';
import { CenterFrame } from '../../../style';
import { ReactComponent as InfoSvg } from '../../../assets/icon/info.svg';

interface ScentBallProps {
  first: string;
  second: string;
  third: string;
  accords?: ScentDto[];
}

const ScentBall: React.FC<ScentBallProps> = ({
  first,
  second,
  third,
  accords,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScentInfo = (accords: ScentDto[] | undefined) => {
    if (accords) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const data =
    accords?.map((item) => ({
      id: item.scentId.toString(),
      name: item.name,
      value: item.weight,
      color: item.rgb,
    })) || [];

  return (
    <BallFrame>
      <Orb
        first={first}
        second={second}
        third={third}
        onClick={() => handleScentInfo(accords)}
      ></Orb>
      {isModalOpen && accords && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent>
            <PieChartComponent data={data} />
          </ModalContent>
        </ModalOverlay>
      )}
      <AddInfo>
        <InfoBox onClick={() => handleScentInfo(accords)}>
          <InfoSvg />
        </InfoBox>
      </AddInfo>
    </BallFrame>
  );
};

export default ScentBall;

const BallFrame = styled.div``;

const AddInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const Orb = styled.div<ScentBallProps>`
  animation: spin 4s linear infinite;
  width: 110px;
  height: 110px;
  margin-top: 40px;
  border-radius: 50%;
  box-shadow: inset 0 0 25px ${(props) => props.first},
    inset 10px 0 40px ${(props) => props.second},
    inset -10px 0 40px ${(props) => props.third},
    inset 10px 0 50px ${(props) => props.first},
    inset -15px 0 50px ${(props) => props.second},
    0 0 25px ${(props) => props.first},
    -15px 0 15px ${(props) => props.first},
    15px 0 15px ${(props) => props.first};

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
`;

const InfoBox = styled.div`
  position: relative;
  top: -25px;
  left: 88px;
  background-color: var(--white-color);
  padding: 4px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  svg {
    width: 20px;
    height: 20px;
  }
`;
