import { styled } from 'styled-components';
import { ConfirmButton } from '../../style';
import { ReactComponent as SearchSvg } from '../../assets/icon/search.svg';
import { useNavigate } from 'react-router-dom';

interface DrawerAddBtnProps {
  buttonTxt: string;
}

export const DrawerAddBtn = (button: DrawerAddBtnProps) => {
  const navigate = useNavigate();

  const handleSearchPerfume = () => {
    navigate('/search-myperfume');
  };
  return (
    <ConfirmButton
      color="primary"
      background="primary"
      onClick={handleSearchPerfume}
    >
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
