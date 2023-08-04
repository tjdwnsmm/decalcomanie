import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as HomeSvg } from '../../assets/icon/home.svg';
import { ReactComponent as FeedSvg } from '../../assets/icon/message.svg';
import { ReactComponent as SearchSvg } from '../../assets/icon/find_in_page.svg';
import { ReactComponent as MyPageSvg } from '../../assets/icon/shape.svg';

type NavItemProps = {
  active: boolean;
  onClick: () => void;
};

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveNav(getActiveNav());
  }, []);

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    switch (nav) {
      case 'home':
        navigate('/');
        break;
      case 'feed':
        navigate('/main-feed');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
    }
  };

  const navRoutes: Record<string, string> = {
    home: '/',
    feed: '/main-feed',
    search: '/search',
    mypage: '/mypage',
  };

  const isNavActive = (nav: string) => location.pathname === navRoutes[nav];

  const getActiveNav = (): string | null => {
    for (const nav in navRoutes) {
      if (isNavActive(nav)) {
        return nav;
      }
    }
    return null;
  };

  return (
    <BottomBar>
      <NavItem
        onClick={() => handleNavClick('home')}
        active={activeNav === 'home'}
      >
        <HomeSvg />
      </NavItem>
      <NavItem
        onClick={() => handleNavClick('feed')}
        active={activeNav === 'feed'}
      >
        <FeedSvg />
      </NavItem>
      <NavItem
        onClick={() => handleNavClick('search')}
        active={activeNav === 'search'}
      >
        <SearchSvg />
      </NavItem>
      <NavItem
        onClick={() => handleNavClick('mypage')}
        active={activeNav === 'mypage'}
      >
        <MyPageSvg />
      </NavItem>
    </BottomBar>
  );
};

export default BottomNav;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  background-color: var(--white-color);
  box-shadow: 1px 5px 8px 0px rgba(0, 0, 0, 0.15);
`;

const NavItem = styled.div<NavItemProps>`
  svg {
    cursor: pointer;
    g path {
      fill: ${(props) =>
        props.active ? 'var(--primary-color)' : 'var(--gray-color)'};
      stroke: none;
    }
  }
`;
