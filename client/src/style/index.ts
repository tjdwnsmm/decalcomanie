import { styled } from 'styled-components';

export const Main = styled.div`
  height: 100dvh;
  // height: calc(var(--vh, 1vh) * 100);
  overflow-y: scroll;
  overflow-x: clip;
`;
// js
export function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

interface ButtonProps {
  background?: 'primary' | 'secondary';
  color?: 'primary' | 'secondary';
  fontWeight?: string | '400';
}

export const ConfirmButton = styled.button<ButtonProps>`
  width: 340px;
  height: 45px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) =>
    props.background === 'primary'
      ? 'var(--primary-color)'
      : 'var(--white-color)'};
  color: ${(props) =>
    props.color === 'primary' ? 'var(--white-color)' : 'var(--black-color)'};
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight};
  cursor: pointer;
`;
interface CenterProps {
  direction?: string;
}
export const CenterFrame = styled.div<CenterProps>`
  display: flex;
  justify-content: center;
  flex-direction: ${(props) => props.direction};
  align-items: center;
`;

interface MarginProps {
  margin?: string;
}

export const MarginFrame = styled.div<MarginProps>`
  margin: ${(props) => props.margin};
`;
