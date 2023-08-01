import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ScentDto } from '../../../types/PerfumeInfoType';
import PieChartComponent from './Chart';

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
    <>
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
    </>
  );
};

export default ScentBall;

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

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
