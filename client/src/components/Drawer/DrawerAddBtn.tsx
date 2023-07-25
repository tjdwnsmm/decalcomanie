import { styled } from 'styled-components';
import { ConfirmButton } from '../../style';
import { ReactComponent as SearchSvg } from '../../assets/icon/search.svg';

interface DrawerAddBtnProps {
  buttonTxt: string;
}

export const DrawerAddBtn = (button: DrawerAddBtnProps) => {
  return (
    <ConfirmButton color="primary" background="primary">
      <ButtonFrame>
        <SearchSvg2 />
        {button.buttonTxt}
      </ButtonFrame>
    </ConfirmButton>
  );
};

const SearchSvg2 = styled(SearchSvg)`
  fill: var(--primary-color);
  path {
    stroke: var(--white-color);
  }
`;

const ButtonFrame = styled.div`
  gap: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
