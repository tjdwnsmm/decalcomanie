import { styled } from 'styled-components';
import { ReactComponent as AddButtonSvg } from '../../assets/img/add-button.svg';

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  width: 340px;
  height: 150px;
  border: 1.5px dashed var(--primary-color);
  box-shadow: 5px 5px 5px var(--gray-color);
`;

const StyledAddButtonSvg = styled(AddButtonSvg)`
  margin-top: 15px;
  &:hover {
    cursor: pointer;
  }
`;

// test
const addPerfume = () => {
  alert('향수 검색으로 이동');
};

const TextArea = styled.span`
  color: var(--primary-color);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function PerfumeBox() {
  return (
    <>
      <EmptyBox>
        <TextArea>
          향수를 추가해주세요
          <StyledAddButtonSvg onClick={addPerfume} />
        </TextArea>
      </EmptyBox>
    </>
  );
}
