import { styled } from 'styled-components';
import { Perfume } from '../../pages/DrawerPage/MyDrawerPage';

export interface DrawerFrameProps {
  perfumeList: Perfume[];
}

export const DrawerFrame: React.FC<DrawerFrameProps> = ({ perfumeList }) => {
  return (
    <>
      <RowFrame>
        {perfumeList.map((perfume, index) => (
          <PerfumeContainer key={index}>
            <PerfumeImg src={perfume.img} />
            <PerfumeInfo>
              <PerfumeName>{perfume.name}</PerfumeName>
              <PerfumeBrand>{perfume.brand}</PerfumeBrand>
            </PerfumeInfo>
          </PerfumeContainer>
        ))}
      </RowFrame>
      <Image src="src/assets/img/drawer.png"></Image>
    </>
  );
};
const RowFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PerfumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px -10px;
  position: relative;
`;

const PerfumeImg = styled.img`
  width: 80px;
  object-fit: cover;
`;

const PerfumeInfo = styled.div`
  position: absolute;
  bottom: -70px;
  left: 15px;
  padding: 10px 2px;
  text-align: center;
`;

const PerfumeName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const PerfumeBrand = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: var(--primary-color);
`;

const Image = styled.img`
  width: 320px;
`;
