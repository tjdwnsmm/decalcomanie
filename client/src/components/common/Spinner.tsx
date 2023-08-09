import { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { CenterFrame } from '../../style';

const Spinner: FC = () => {
  return (
    <>
      <SpinnerContainer>
        <Svg
          className="pl"
          viewBox="0 0 64 64"
          width="35px"
          height="35px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="grad-mask">
              <rect x="0" y="0" width="64" height="64" fill="url(#grad)" />
            </mask>
          </defs>
          <circle
            className="pl__ring"
            cx="32"
            cy="32"
            r="12"
            fill="none"
            //
            stroke="var(--secondary-color)"
            strokeWidth="12"
            strokeDasharray="169.65 169.65"
            strokeDashoffset="-127.24"
            strokeLinecap="round"
            transform="rotate(135)"
          />
          <g fill="var(--secondary-color)">
            <circle
              className="pl__ball1"
              cx="32"
              cy="45"
              r="6"
              transform="rotate(14)"
            />
            <circle
              className="pl__ball2"
              cx="32"
              cy="48"
              r="3"
              transform="rotate(-21)"
            />
          </g>
          <g mask="url(#grad-mask)">
            <circle
              className="pl__ring"
              cx="32"
              cy="32"
              r="22"
              fill="none"
              stroke="var(--primary-color)"
              strokeWidth="10"
              strokeDasharray="169.65 169.65"
              strokeDashoffset="-127.24"
              strokeLinecap="round"
              transform="rotate(135)"
            />
            <g fill="var(--primary-color)">
              <circle
                className="pl__ball1"
                cx="32"
                cy="45"
                r="4"
                transform="rotate(14)"
              />
              <circle
                className="pl__ball2"
                cx="32"
                cy="48"
                r="2"
                transform="rotate(-21)"
              />
            </g>
          </g>
        </Svg>
      </SpinnerContainer>
      <CenterFrameLoading>Loading ...</CenterFrameLoading>
    </>
  );
};

export default Spinner;

const CenterFrameLoading = styled(CenterFrame)`
  color: var(--primary-color);
  font-weight: 500;
`;

const spin = keyframes`
  from {
		animation-timing-function: ease-in-out;
		stroke-dashoffset: -122.52;
		transform: rotate(135deg);
	}
	15% {
		animation-timing-function: ease-in;
		stroke-dashoffset: -122.52;
		transform: rotate(90deg);
	}
	35% {
		animation-timing-function: ease-out;
		stroke-dashoffset: -65.34;
		transform: rotate(297.5deg);
	}
	55% {
		animation-timing-function: ease-in-out;
		stroke-dashoffset: -122.52;
		transform: rotate(505deg);
	}
	70% {
		animation-timing-function: ease-in-out;
		stroke-dashoffset: -122.52;
		transform: rotate(490deg);
	}
	85%,
	to {
		stroke-dashoffset: -122.52;
		transform: rotate(497.5deg);
	}
`;

const ball1 = keyframes`
  from {
		transform: rotate(14deg);
	}
	20% {
		transform: rotate(-7deg);
	}
	60% {
		transform: rotate(399deg);
	}
	75% {
		transform: rotate(361deg);
	}
	90%,
	to {
		transform: rotate(374deg);
	}
`;

const ball2 = keyframes`
  from {
		transform: rotate(-21deg);
	}
	25% {
		transform: rotate(-47deg);
	}
	60% {
		transform: rotate(364deg);
	}
	75% {
		transform: rotate(326deg);
	}
	90%,
	to {
		transform: rotate(339deg);
	}
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  display: block;
  width: 6em;
  height: 6em;

  .pl__ring,
  .pl__ball1,
  .pl__ball2 {
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    transform-origin: 32px 32px;
  }

  .pl__ring {
    animation-name: ${spin};
  }

  .pl__ball1 {
    animation-name: ${ball1};
  }

  .pl__ball2 {
    animation-name: ${ball2};
  }
`;
