import { styled } from 'styled-components';
import { FloatingButton } from './FloatingWriteBtn';
import { ReactComponent as TopSvg } from '../../assets/icon/top.svg';
import { useState, useEffect } from 'react';

const FloatingTopBtn = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  const scrollToTop = () => {
    console.log('clock');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <FloatingTopButton onClick={scrollToTop}>
        <TopSvg />
      </FloatingTopButton>
    </>
  );
};

export default FloatingTopBtn;

const FloatingTopButton = styled(FloatingButton)`
  width: 50px;
  height: 50px;
  svg {
    width: 32px;
  }
`;
