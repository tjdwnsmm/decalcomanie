import { styled } from 'styled-components';
import { ReactComponent as CancelSvg } from '../../assets/icon/input-cancel.svg';
import { useState } from 'react';
import { ConfirmAlert } from '../Alert/ConfirmAlert';
import { PerfumeDetail } from '../../types/PerfumeInfoType';

export interface DrawerFrameProps {
  perfumeList: PerfumeDetail[];
  handlePerfume: (idx: number) => void;
  stairNum: number;
}

export const DrawerFrame: React.FC<DrawerFrameProps> = ({
  perfumeList,
  handlePerfume,
  stairNum,
}) => {
  const [open, setOpen] = useState(false);
  const [clickIdx, setClickIdx] = useState(-1);
  const [perfumeIdx, setPerfumeIdx] = useState(-1);

  const handleClickOpen = (index: number, perfumeId: number) => {
    setOpen(true);
    setClickIdx(index);
    setPerfumeIdx(perfumeId);
  };

  return (
    <>
      <ConfirmAlert
        open={open}
        setOpen={setOpen}
        handlePerfume={handlePerfume}
        perfumeId={perfumeIdx}
        deleteIdx={stairNum * 3 + clickIdx}
      />
      <RowFrame>
        {perfumeList.map((perfume, index) => (
          <PerfumeContainer key={index}>
            <CancelSvg2
              onClick={() => {
                handleClickOpen(index, perfume.perfumeId);
              }}
            />
            <PerfumeImg src={perfume.picture} />
            <PerfumeInfo>
              <PerfumeName>
                {perfume.nameOrg.length > 12
                  ? perfume.nameOrg.slice(0, 12) + '..'
                  : perfume.nameOrg}
              </PerfumeName>
              <PerfumeBrand>{perfume.brandName}</PerfumeBrand>
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
  align-items: flex-end;
  gap: 10px;
`;

const PerfumeImg = styled.img`
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const PerfumeInfo = styled.div`
  width: 150px;
  position: absolute;
  bottom: -70px;
  left: -35px;
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

const CancelSvg2 = styled(CancelSvg)`
  g path {
    fill: var(--gray-color);
  }
`;
